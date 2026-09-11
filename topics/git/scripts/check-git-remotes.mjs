// Run: node topics/git/scripts/check-git-remotes.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { fetchOrigin, firstParentChain, initialRemoteState, mergeOrigin, statusLine, teammateCommits, youCommit } from "../content/git-remote-lab.ts";
import { gitRemoteSections } from "../content/git-remote-article.ts";

const makeEnv = dir => ({ ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), HOME: dir, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C", GIT_EDITOR: "true", GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "commit.gpgsign", GIT_CONFIG_VALUE_0: "false" });
const contents = lines => lines.join("\n") + "\n";
// Commit IDs, hash ranges, and the remote's path differ between the page and a real run.
const normalize = text => text.replace(/\b[0-9a-f]{7}\b/g, "HASH").replace(/\b[A-Z]\.\.[A-Z]\b/g, "HASH..HASH").replace(/^From \S+$/gm, "From PATH").split("\n").map(line => line.trimEnd()).join("\n").trimEnd();

function shell(cwd, env, command) {
  try { return { failed: false, output: execSync(`{\n${command}\n} 2>&1`, { cwd, env, encoding: "utf8", shell: "/bin/sh" }) }; }
  catch (error) { return { failed: true, output: error.stdout }; }
}

// 1. The page simulation against two real repositories for several action sequences.
const sequences = [
  ["teammate", "fetch", "merge", "commit"],
  ["commit", "teammate", "fetch", "merge"],
  ["teammate", "teammate", "fetch", "merge"],
  ["teammate", "fetch", "commit", "teammate", "fetch", "merge"],
  ["teammate", "fetch", "merge", "teammate", "fetch", "commit", "merge", "merge"],
  ["fetch", "merge", "commit", "fetch"],
];
for (const sequence of sequences) {
  const dir = mkdtempSync(join(tmpdir(), "git-remotes-check-"));
  const env = makeEnv(dir);
  const teammate = join(dir, "teammate");
  const laptop = join(dir, "laptop");
  const ok = (cwd, command) => { const result = shell(cwd, env, command); assert.equal(result.failed, false, `${command}\n${result.output}`); return result.output; };
  let state = initialRemoteState;
  function verify(step) {
    const label = `${sequence.join(" ")} after ${step}`;
    assert.equal(ok(laptop, "git log --format=%s --first-parent main"), contents(firstParentChain(state, state.main).reverse().map(commit => commit.message)), `${label}: main history`);
    assert.equal(ok(laptop, "git log --format=%s --first-parent origin/main"), contents(firstParentChain(state, state.origin).reverse().map(commit => commit.message)), `${label}: origin/main history`);
    assert.equal(ok(teammate, "git log --format=%s --first-parent main"), contents(firstParentChain(state, state.theirs).reverse().map(commit => commit.message)), `${label}: Sam's history`);
    assert.equal(readFileSync(join(laptop, "reading-list.md"), "utf8"), contents(firstParentChain(state, state.main).at(-1).lines), `${label}: your file`);
    const status = statusLine(state);
    assert.equal(ok(laptop, "git status --short --branch"), status.short + "\n", `${label}: short status`);
    assert.ok(ok(laptop, "git status").startsWith(`On branch main\n${status.long}\n`), `${label}: long status\n${ok(laptop, "git status")}`);
  }
  try {
    ok(dir, "git init --initial-branch=main --template= teammate");
    ok(teammate, "git config set --local user.name 'Sam Okafor' && git config set --local user.email sam@example.com");
    writeFileSync(join(teammate, "reading-list.md"), "# Reading list\n- Dune\n"); ok(teammate, "git add reading-list.md && git commit -m 'Start the reading list'");
    writeFileSync(join(teammate, "reading-list.md"), "# Reading list\n- Dune\n- The Hobbit\n"); ok(teammate, "git commit -am 'Add The Hobbit'");
    ok(dir, "git clone --template= teammate laptop");
    ok(laptop, "git config set --local user.name 'Maya Chen' && git config set --local user.email maya@example.com");
    verify("clone");
    for (const step of sequence) {
      if (step === "teammate") { const next = teammateCommits(state); if (next !== state) { writeFileSync(join(teammate, "reading-list.md"), contents(firstParentChain(next, next.theirs).at(-1).lines)); ok(teammate, `git commit -am '${next.commits.at(-1).message}'`); } state = next; }
      if (step === "commit") { const next = youCommit(state); if (next !== state) { writeFileSync(join(laptop, "reading-list.md"), contents(firstParentChain(next, next.main).at(-1).lines)); ok(laptop, "git commit -am 'Update the title'"); } state = next; }
      if (step === "fetch") { const { state: next, output } = fetchOrigin(state); assert.equal(normalize(ok(laptop, "git fetch")), normalize(output), `${sequence.join(" ")}: fetch output`); state = next; }
      if (step === "merge") { const { state: next, output } = mergeOrigin(state); assert.equal(normalize(ok(laptop, "git merge --no-edit origin/main")), normalize(output), `${sequence.join(" ")}: merge output`); state = next; }
      verify(step);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// 2. The article's walkthrough as one shell session, so cd between the two repositories carries over; each documented output must end the real output.
const dir = mkdtempSync(join(tmpdir(), "git-remotes-article-"));
try {
  const env = makeEnv(dir);
  const blocks = gitRemoteSections.flatMap(section => (section.blocks ?? []).flatMap(block => block.type === "command" ? [block] : block.type === "details" ? block.commands ?? [] : []));
  assert.ok(blocks.length > 10, "article command blocks found");
  const script = blocks.map((block, index) => `printf '@@BLOCK %s\\n' ${index}\n{\n${block.command}\n} 2>&1\nprintf '@@EXIT %s\\n' $?`).join("\n");
  const raw = execSync(script, { cwd: dir, env, encoding: "utf8", shell: "/bin/sh" }).replaceAll(realpathSync(dir), "/Users/maya").replaceAll(dir, "/Users/maya");
  const parts = raw.split(/^@@BLOCK \d+\n/m).slice(1);
  assert.equal(parts.length, blocks.length, "one output per block");
  blocks.forEach((block, index) => {
    const [, output, exit] = parts[index].match(/^([\s\S]*)@@EXIT (\d+)\n$/);
    assert.equal(exit, "0", `${block.command}: exit ${exit}\n${output}`);
    if (block.output) assert.ok(normalize(output).endsWith(normalize(block.output)), `${block.command}\n--- expected tail ---\n${block.output}\n--- actual ---\n${output}`);
    else assert.equal(normalize(output).replace(/^(Initialized empty Git repository.*|Switched to.*|Cloning into.*|done\.|\[[^\]]+\] .*| \d+ files? changed.*| create mode .*)$/gm, "").trim(), "", `${block.command}: expected nothing beyond init, clone, and commit chatter\n${output}`);
  });
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("origin/main, main, Sam's main, files, fetch and merge outputs, and status sentences match real Git; the article's walkthrough reproduces its documented outputs.");
