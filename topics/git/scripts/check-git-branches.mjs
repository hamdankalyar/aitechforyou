// Run: node topics/git/scripts/check-git-branches.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { ancestors, commit, createBranch, featureBranch, fileLines, initialBranchState, nextBook, switchBranch } from "../content/git-branch-lab.ts";

const sequences = [
  ["create", "switch", "commit", "switch", "commit"],
  ["create", "commit", "switch", "commit"],
  ["commit", "commit", "commit", "create", "switch", "commit", "commit", "commit"],
  ["switch", "commit", "create", "switch", "switch", "commit"],
];

for (const sequence of sequences) {
  const dir = mkdtempSync(join(tmpdir(), "git-branches-check-"));
  const env = { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C" };
  const git = (...args) => execFileSync("git", ["-c", "commit.gpgsign=false", "-c", "color.ui=false", ...args], { cwd: dir, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const file = join(dir, "reading-list.md");
  const contents = lines => lines.join("\n") + "\n";
  let state = initialBranchState;
  function verify(step) {
    for (const [name, id] of Object.entries(state.branches)) {
      assert.equal(git("log", "--format=%s", name), ancestors(state, id).map(item => item.message).join("\n") + "\n", `${sequence} after ${step}: history of ${name}`);
      assert.equal(git("show", `${name}:reading-list.md`), contents(fileLines(state, name)), `${sequence} after ${step}: file on ${name}`);
    }
    assert.equal(git("branch", "--format=%(refname:short)").trim().split("\n").sort().join(), Object.keys(state.branches).sort().join(), `${sequence} after ${step}: branch list`);
    assert.equal(git("branch", "--show-current").trim(), state.head, `${sequence} after ${step}: HEAD`);
    assert.equal(readFileSync(file, "utf8"), contents(fileLines(state)), `${sequence} after ${step}: working file`);
  }
  try {
    git("init", "--initial-branch=main", "--template=");
    git("config", "set", "--local", "user.name", "Maya Chen");
    git("config", "set", "--local", "user.email", "maya@example.com");
    writeFileSync(file, "# Reading list\n- Dune\n");
    git("add", "reading-list.md");
    git("commit", "-m", "Start the reading list");
    writeFileSync(file, "# Reading list\n- Dune\n- The Hobbit\n");
    git("commit", "-am", "Add The Hobbit");
    verify("start");
    for (const step of sequence) {
      const before = state;
      if (step === "create") { state = createBranch(state, featureBranch); if (state !== before) git("branch", featureBranch); }
      if (step === "switch") { const target = state.head === "main" ? featureBranch : "main"; state = switchBranch(state, target); if (state !== before) git("switch", target); }
      if (step === "commit") { const book = nextBook(state); state = commit(state); if (state !== before) { writeFileSync(file, contents(fileLines(state))); git("commit", "-am", `Add ${book}`); } }
      verify(step);
    }
    if (sequence === sequences[0]) {
      assert.throws(() => git("branch", "-d", featureBranch), error => /not fully merged/.test(error.stderr), "-d refuses to drop commits only sci-fi reaches");
      assert.throws(() => git("branch", "-d", "main"), error => /cannot delete branch 'main'/.test(error.stderr), "cannot delete the current branch");
      writeFileSync(file, contents([...fileLines(state), "- Circe"]));
      assert.throws(() => git("switch", featureBranch), error => /would be overwritten by checkout/.test(error.stderr), "switch refuses to overwrite an edited file");
      git("checkout", "--", "reading-list.md");
      git("branch", "-m", featureBranch, "science-fiction");
      assert.match(git("branch", "-D", "science-fiction"), /^Deleted branch science-fiction \(was [0-9a-f]+\)\.\n$/);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
console.log("Branch labels, HEAD, histories, and working files match real Git for every action sequence, plus rename, delete, and switch refusals.");
