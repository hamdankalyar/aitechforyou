// Run: node topics/git/scripts/check-git-merge.mjs
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, execSync } from "node:child_process";
import { deleteOutput, mergeCommands, mergeLab, mergeOutcome } from "../content/git-merge-lab.ts";
import { gitMergeSections } from "../content/git-merge-article.ts";

const baseEnv = dir => ({ ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C" });
const normalize = text => text.replace(/\b[0-9a-f]{7}\b/g, "HASH").split("\n").map(line => line.trimEnd()).join("\n").trimEnd();

// 1. The page simulation against real Git for every situation and command.
for (const mainAdvanced of [false, true]) for (const mode of Object.keys(mergeCommands)) {
  const dir = mkdtempSync(join(tmpdir(), "git-merge-check-"));
  const env = baseEnv(dir);
  const git = (...args) => execFileSync("git", ["-c", "commit.gpgsign=false", "-c", "color.ui=false", ...args], { cwd: dir, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const file = join(dir, "reading-list.md");
  const label = `main advanced ${mainAdvanced}, ${mergeCommands[mode]}`;
  try {
    git("init", "--initial-branch=main", "--template=");
    git("config", "set", "--local", "user.name", "Maya Chen");
    git("config", "set", "--local", "user.email", "maya@example.com");
    writeFileSync(file, "# Reading list\n- Dune\n"); git("add", "reading-list.md"); git("commit", "-m", "Start the reading list");
    writeFileSync(file, "# Reading list\n- Dune\n- The Hobbit\n"); git("commit", "-am", "Add The Hobbit");
    git("switch", "-c", "sci-fi");
    writeFileSync(file, "# Reading list\n- Dune\n- The Hobbit\n- Foundation\n"); git("commit", "-am", "Add Foundation");
    git("switch", "main");
    if (mainAdvanced) { writeFileSync(file, "# Reading list for 2026\n- Dune\n- The Hobbit\n"); git("commit", "-am", "Update the title"); }
    const sciFi = git("rev-parse", "sci-fi");
    const mainBefore = git("rev-parse", "main");
    const outcome = mergeOutcome(mainAdvanced, mode);
    const flags = mergeCommands[mode].split(" ").slice(2, -1);
    let actual;
    try { actual = git("merge", "--no-edit", ...flags, "sci-fi"); } catch (error) { actual = null; assert.match(error.stderr, /fatal: Not possible to fast-forward, aborting\.\n$/, label); }
    assert.equal(actual !== null, outcome.merged, `${label}: merged`);
    if (actual) assert.equal(actual.replace(/^Updating [0-9a-f]+\.\.[0-9a-f]+$/m, "Updating B..C"), outcome.output + "\n", `${label}: output`);
    else assert.equal(git("rev-parse", "main"), mainBefore, `${label}: refusal changed nothing`);
    const lab = mergeLab(mainAdvanced, mode, outcome.merged, false);
    assert.equal(git("log", "--format=%s", "--first-parent", "main"), [...lab.mainLane].reverse().map(commit => commit.message).join("\n") + "\n", `${label}: first-parent history`);
    assert.equal(git("show", "main:reading-list.md"), lab.file.join("\n") + "\n", `${label}: file on main`);
    assert.equal(git("rev-list", "--parents", "--max-count=1", "main").trim().split(" ").length - 1, lab.commits.find(commit => commit.id === lab.branches.main).parents.length, `${label}: parent count`);
    assert.equal(git("rev-parse", "sci-fi"), sciFi, `${label}: sci-fi label never moves`);
    if (outcome.fastForward) assert.equal(git("rev-parse", "main"), sciFi, `${label}: fast-forward lands on C`);
    let deleted;
    try { deleted = git("branch", "-d", "sci-fi"); } catch (error) { deleted = null; assert.match(error.stderr, /not fully merged/, label); assert.match(deleteOutput(false), /not fully merged/); }
    assert.equal(deleted !== null, outcome.merged, `${label}: delete allowed only after a merge`);
    if (deleted) assert.equal(deleted.replace(/\(was [0-9a-f]+\)/, "(was C)"), deleteOutput(true) + "\n", `${label}: delete output`);
    assert.deepEqual(git("branch", "--format=%(refname:short)").trim().split("\n").sort(), Object.keys(mergeLab(mainAdvanced, mode, outcome.merged, true).branches).sort(), `${label}: branch list after delete`);
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// 2. The article's own command blocks, run through the shell in order; each documented output must end the real output.
const dir = mkdtempSync(join(tmpdir(), "git-merge-article-"));
const env = { ...baseEnv(dir), GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "commit.gpgsign", GIT_CONFIG_VALUE_0: "false" };
try {
  const blocks = gitMergeSections.flatMap(section => (section.blocks ?? []).flatMap(block => block.type === "command" ? [block] : block.type === "details" ? block.commands ?? [] : []));
  assert.ok(blocks.length > 10, "article command blocks found");
  for (const block of blocks) {
    const command = block.command.startsWith("cd ~") ? "git init --initial-branch=main" : block.command;
    let actual;
    try { actual = execSync(`{\n${command}\n} 2>&1`, { cwd: dir, env, encoding: "utf8", shell: "/bin/sh" }); } catch (error) { actual = error.stdout; assert.match(block.output ?? "", /fatal/, `${block.command}: only the documented refusal may fail`); }
    if (block.output) assert.ok(normalize(actual).endsWith(normalize(block.output)), `${block.command}\n--- expected tail ---\n${block.output}\n--- actual ---\n${actual}`);
  }
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("Merge shapes, outputs, parents, labels, and deletions match real Git; every command block in the article reproduces its documented output.");
