// Run: node topics/git/scripts/check-git-commit-lab.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { firstReadingList, editedReadingList, getCommitLabState } from "../content/git-commit-lab.ts";

for (const restaged of [false, true]) {
  const dir = mkdtempSync(join(tmpdir(), "git-commit-example-"));
  const env = { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C" };
  const options = { cwd: dir, env, encoding: "utf8" };
  const git = (...args) => execFileSync("git", ["-c", "commit.gpgsign=false", ...args], options);
  function verify(step) {
    const expected = getCommitLabState(step, restaged);
    assert.equal(readFileSync(join(dir, "reading-list.md"), "utf8"), expected.working);
    for (const [ref, text] of [[":reading-list.md", expected.staged], ["HEAD:reading-list.md", expected.committed]]) {
      const result = spawnSync("git", ["show", ref], options);
      if (text === null) assert.notEqual(result.status, 0, `step ${step}: ${ref} must not exist`);
      else { assert.equal(result.status, 0); assert.equal(result.stdout, text, `step ${step}: ${ref}`); }
    }
  }
  try {
    git("init", "--initial-branch=main", "--template=");
    git("config", "set", "--local", "user.name", "Maya Chen");
    git("config", "set", "--local", "user.email", "maya@example.com");
    writeFileSync(join(dir, "reading-list.md"), firstReadingList);
    verify(0);
    assert.equal(git("status", "--short"), "?? reading-list.md\n");
    git("add", "reading-list.md");
    verify(1);
    assert.equal(git("status", "--short"), "A  reading-list.md\n");
    writeFileSync(join(dir, "reading-list.md"), editedReadingList);
    assert.equal(git("status", "--short"), "AM reading-list.md\n");
    assert.doesNotMatch(git("diff", "--staged"), /The Hobbit/);
    assert.match(git("diff"), /\+- The Hobbit/);
    if (restaged) git("add", "reading-list.md");
    verify(2);
    git("commit", "-m", "Start the reading list");
    verify(3);
    assert.equal(git("status", "--short"), restaged ? "" : " M reading-list.md\n");
    assert.equal(git("diff", "--staged"), "", "Index still matches the new commit");
    if (!restaged) {
      git("add", "reading-list.md");
      git("commit", "-m", "Add The Hobbit");
      assert.equal(git("show", "HEAD:reading-list.md"), editedReadingList);
      assert.equal(git("status", "--short"), "");
      assert.equal(git("show", "HEAD~1:reading-list.md"), firstReadingList);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
console.log("Both simulation paths match real Git, including index contents, status, diffs, and the second commit.");
