// Run: node topics/git/scripts/check-git-conflict.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { conflictLab, conflictSides, conflictedFile, continueRefusal, mergeConflictOutput, resolutions } from "../content/git-conflict-lab.ts";
import { gitConflictSections } from "../content/git-conflict-article.ts";

const makeEnv = dir => ({ ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C", GIT_EDITOR: "true", GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "commit.gpgsign", GIT_CONFIG_VALUE_0: "false" });
const normalize = text => text.replace(/\b[0-9a-f]{7}\b/g, "HASH").split("\n").map(line => line.trimEnd()).join("\n").trimEnd();
const contents = lines => lines.join("\n") + "\n";
const statusLine = status => status ? status + "\n" : "";

// Runs a shell snippet with stdout and stderr merged in order; a non-zero exit returns { failed, output }.
function shell(dir, command) {
  try { return { failed: false, output: execSync(`{\n${command}\n} 2>&1`, { cwd: dir, env: makeEnv(dir), encoding: "utf8", shell: "/bin/sh" }) }; }
  catch (error) { return { failed: true, output: error.stdout }; }
}

// 1. The page simulation against real Git for every answer, finished and aborted.
for (const resolution of resolutions) for (const ending of ["finish", "abort"]) {
  const dir = mkdtempSync(join(tmpdir(), "git-conflict-check-"));
  const sh = command => shell(dir, command);
  const ok = command => { const result = sh(command); assert.equal(result.failed, false, `${command}\n${result.output}`); return result.output; };
  const file = join(dir, "reading-list.md");
  const label = `${resolution.id} + ${ending}`;
  try {
    ok("git init --initial-branch=main --template= && git config set --local user.name 'Maya Chen' && git config set --local user.email maya@example.com");
    writeFileSync(file, contents(conflictSides[0].lines.slice(0, 2))); ok("git add reading-list.md && git commit -m 'Start the reading list'");
    writeFileSync(file, contents(conflictSides[0].lines)); ok("git commit -am 'Add The Hobbit'");
    ok("git switch -c sci-fi"); writeFileSync(file, contents(conflictSides[2].lines)); ok("git commit -am 'Add Foundation'");
    ok("git switch main"); writeFileSync(file, contents(conflictSides[1].lines)); ok("git commit -am 'Add Piranesi'");
    const before = ok("git rev-parse main");
    const merge = sh("git merge sci-fi");
    assert.equal(merge.failed, true, label);
    assert.equal(merge.output, mergeConflictOutput + "\n", `${label}: merge output`);
    let lab = conflictLab("conflict", null);
    assert.equal(readFileSync(file, "utf8"), contents(conflictedFile), `${label}: conflicted file`);
    assert.equal(ok("git status --short"), statusLine(lab.status), `${label}: status while conflicted`);
    assert.equal(sh("git diff --check").output, lab.check + "\n", `${label}: diff --check on markers`);
    const early = sh("git merge --continue");
    assert.equal(early.failed, true, label);
    assert.equal(early.output, continueRefusal + "\n", `${label}: continue before staging`);
    writeFileSync(file, contents(resolution.lines));
    lab = conflictLab("conflict", resolution.id);
    assert.equal(ok("git status --short"), statusLine(lab.status), `${label}: status after editing`);
    const check = sh("git diff --check");
    assert.equal(check.failed, lab.markersLeft, `${label}: diff --check exit`);
    assert.equal(check.output, lab.markersLeft ? lab.check + "\n" : "", `${label}: diff --check output`);
    ok("git add reading-list.md");
    lab = conflictLab("staged", resolution.id);
    assert.equal(ok("git status --short"), statusLine(lab.status), `${label}: status after staging`);
    if (ending === "abort") {
      ok("git merge --abort");
      lab = conflictLab("aborted", resolution.id);
      assert.equal(ok("git status --short"), "", `${label}: clean after abort`);
      assert.equal(readFileSync(file, "utf8"), contents(lab.file), `${label}: file after abort`);
      assert.equal(ok("git rev-parse main"), before, `${label}: main back on D`);
    } else {
      assert.match(ok("git merge --continue"), /^\[main [0-9a-f]+\] Merge branch 'sci-fi'\n$/, `${label}: continue output`);
      lab = conflictLab("committed", resolution.id);
      assert.equal(ok("git status --short"), "", `${label}: clean after commit`);
      assert.equal(ok("git show HEAD:reading-list.md"), contents(lab.file), `${label}: recorded file`);
      assert.equal(ok("git rev-list --parents --max-count=1 HEAD").trim().split(" ").length, 3, `${label}: two parents`);
      assert.equal(ok("git rev-parse HEAD^1"), before, `${label}: first parent is D`);
      assert.equal(ok("git rev-parse HEAD^2"), ok("git rev-parse sci-fi"), `${label}: second parent is C`);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// 2. The article's own command blocks, run through the shell in order; each documented output must end the real output.
const dir = mkdtempSync(join(tmpdir(), "git-conflict-article-"));
try {
  const blocks = gitConflictSections.flatMap(section => (section.blocks ?? []).flatMap(block => block.type === "command" ? [block] : block.type === "details" ? block.commands ?? [] : []));
  assert.ok(blocks.length > 10, "article command blocks found");
  for (const block of blocks) {
    const result = shell(dir, block.command.startsWith("cd ~") ? "git init --initial-branch=main" : block.command);
    if (result.failed) assert.match(block.output ?? "", /CONFLICT|fatal|error/, `${block.command}: only a documented failure may fail\n${result.output}`);
    if (block.output) assert.ok(normalize(result.output).endsWith(normalize(block.output)), `${block.command}\n--- expected tail ---\n${block.output}\n--- actual ---\n${result.output}`);
    else assert.equal(normalize(result.output).replace(/^(Initialized empty Git repository.*|Switched to.*|\[[^\]]+\] .*| \d+ files? changed.*| create mode .*)$/gm, "").trim(), "", `${block.command}: expected nothing beyond init, switch, and commit chatter\n${result.output}`);
  }
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("Conflict output, markers, status codes, diff --check, refusals, abort, and merge commits match real Git; every command block in the article reproduces its documented output.");
