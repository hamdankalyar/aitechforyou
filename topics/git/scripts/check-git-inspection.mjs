// Run: node topics/git/scripts/check-git-inspection.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { inspectReadingList, inspectionLines } from "../content/git-inspection-lab.ts";

for (const actions of [[], ["stage"], ["commit"], ["stage", "commit"], ["commit", "stage", "commit"]]) {
  const dir = mkdtempSync(join(tmpdir(), "git-inspection-check-"));
  const env = { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C" };
  const git = (...args) => execFileSync("git", ["-c", "commit.gpgsign=false", "-c", "color.ui=false", ...args], { cwd: dir, env, encoding: "utf8" });
  const file = join(dir, "reading-list.md");
  const contents = count => inspectionLines.slice(0, count).join("\n") + "\n";
  let recorded = 2;
  let staged = 3;
  function verify() {
    assert.equal(git("show", "HEAD:reading-list.md"), contents(recorded));
    assert.equal(git("show", ":reading-list.md"), contents(staged));
    assert.equal(readFileSync(file, "utf8"), contents(4));
    assert.equal(git("status", "--short"), inspectReadingList(recorded, staged, 0));
    for (const [question, args] of [[1, []], [2, ["--staged"]], [3, ["HEAD"]]]) {
      const patch = git("diff", ...args, "--", "reading-list.md");
      const lines = patch.split("\n").filter(line => /^[ +\-]/.test(line) && !/^(---|\+\+\+)/.test(line));
      assert.equal(lines.length ? lines.join("\n") + "\n" : "", inspectReadingList(recorded, staged, question), `${actions}: view ${question}`);
    }
  }
  try {
    git("init", "--initial-branch=main", "--template=");
    git("config", "set", "--local", "user.name", "Maya Chen");
    git("config", "set", "--local", "user.email", "maya@example.com");
    writeFileSync(file, contents(2));
    git("add", "reading-list.md");
    git("commit", "-m", "Start the reading list");
    writeFileSync(file, contents(3));
    git("add", "reading-list.md");
    writeFileSync(file, contents(4));
    verify();
    for (const action of actions) {
      if (action === "stage") { git("add", "reading-list.md"); staged = 4; }
      else { git("commit", "-m", staged === 3 ? "Add The Hobbit" : "Add remaining books"); recorded = staged; }
      verify();
    }
    if (actions.join() === "commit") {
      assert.equal(git("log", "--format=%s", "--max-count=2"), "Add The Hobbit\nStart the reading list\n");
      assert.match(git("diff", "HEAD~1", "HEAD", "--", "reading-list.md"), /\+- The Hobbit/);
      assert.doesNotMatch(git("diff", "HEAD~1", "HEAD", "--", "reading-list.md"), /Piranesi/);
    }
    if (!actions.length) {
      writeFileSync(file, contents(2));
      assert.equal(git("diff", "HEAD"), "", "Net comparison can be empty while the index differs");
      assert.match(git("diff", "--staged"), /\+- The Hobbit/);
      assert.match(git("diff"), /-- The Hobbit/);
      writeFileSync(join(dir, "notes.txt"), "Untracked note\n");
      assert.match(git("status", "--short"), /\?\? notes.txt/);
      assert.doesNotMatch(git("diff", "HEAD"), /Untracked note/);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
console.log("Inspection outputs match real Git for both action orders, empty diffs, untracked files, and recorded history.");
