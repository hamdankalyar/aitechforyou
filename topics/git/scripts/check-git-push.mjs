// Run: node topics/git/scripts/check-git-push.mjs
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { firstParentChain, initialPushState, pull, pullCommands, push, samPushes, statusLine, youCommit } from "../content/git-push-lab.ts";
import { gitPushSections } from "../content/git-push-article.ts";

const makeEnv = dir => ({ ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), HOME: dir, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C", GIT_EDITOR: "true", GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "commit.gpgsign", GIT_CONFIG_VALUE_0: "false" });
const contents = lines => lines.join("\n") + "\n";
// Commit IDs, hash ranges, and repository paths differ between the page and a real run.
const normalize = text => text.replace(/\b[0-9a-f]{7}\b/g, "HASH").replace(/\b[A-Z]\.\.[A-Z]\b/g, "HASH..HASH").replace(/\/[^\s']*\/(server(\.git)?|teammate)\b/g, "PATH").split("\n").map(line => line.trimEnd()).join("\n").trimEnd();

function shell(cwd, env, command) {
  try { return { failed: false, output: execSync(`{\n${command}\n} 2>&1`, { cwd, env, encoding: "utf8", shell: "/bin/sh" }) }; }
  catch (error) { return { failed: true, output: error.stdout }; }
}

// 1. The page simulation against a bare server, your laptop, and Sam's clone, for several action sequences.
const sequences = [
  ["pull:plain", "push", "push-u", "push", "sam", "commit", "push", "pull:plain", "pull:ff-only", "pull:no-rebase", "push", "sam", "pull:ff-only", "pull:plain"],
  ["push-u", "sam", "pull:plain", "commit", "push", "push"],
  ["commit", "push-u", "sam", "sam", "pull:no-rebase", "push", "pull:ff-only"],
  ["push-u", "sam", "commit", "pull:ff-only", "pull:no-rebase", "sam", "pull:plain", "push"],
];
for (const sequence of sequences) {
  const dir = mkdtempSync(join(tmpdir(), "git-push-check-"));
  const env = makeEnv(dir);
  const laptop = join(dir, "laptop");
  const teammate = join(dir, "teammate");
  const ok = (cwd, command) => { const result = shell(cwd, env, command); assert.equal(result.failed, false, `${command}\n${result.output}`); return result.output; };
  let state = initialPushState;
  function verify(step) {
    const label = `${sequence.join(" ")} after ${step}`;
    // Merge messages made by pull name the server's real path.
    assert.equal(normalize(ok(laptop, "git log --format=%s --first-parent main")), normalize(contents(firstParentChain(state, state.main).reverse().map(commit => commit.message))), `${label}: main history`);
    const originExists = !shell(laptop, env, "git rev-parse -q --verify origin/main").failed;
    assert.equal(originExists, state.origin !== null, `${label}: origin/main exists`);
    if (state.origin) assert.equal(normalize(ok(laptop, "git log --format=%s --first-parent origin/main")), normalize(contents(firstParentChain(state, state.origin).reverse().map(commit => commit.message))), `${label}: origin/main history`);
    const serverExists = !shell(dir, env, "git -C server.git rev-parse -q --verify main").failed;
    assert.equal(serverExists, state.server !== null, `${label}: server main exists`);
    if (state.server) assert.equal(normalize(ok(dir, "git -C server.git log --format=%s --first-parent main")), normalize(contents(firstParentChain(state, state.server).reverse().map(commit => commit.message))), `${label}: server history`);
    assert.equal(readFileSync(join(laptop, "reading-list.md"), "utf8"), contents(firstParentChain(state, state.main).at(-1).lines), `${label}: your file`);
    assert.equal(/\[origin\/main[:\]]/.test(ok(laptop, "git branch -vv")), state.upstream, `${label}: upstream`);
    const status = statusLine(state);
    assert.equal(ok(laptop, "git status --short --branch"), status.short + "\n", `${label}: short status`);
    assert.ok(ok(laptop, "git status").startsWith(`On branch main\n${status.long ? status.long + "\n" : ""}`), `${label}: long status\n${ok(laptop, "git status")}`);
  }
  try {
    ok(dir, "git init --bare --initial-branch=main --template= server.git");
    ok(dir, "git init --initial-branch=main --template= laptop");
    ok(laptop, "git config set --local user.name 'Maya Chen' && git config set --local user.email maya@example.com");
    writeFileSync(join(laptop, "reading-list.md"), "# Reading list\n- Dune\n"); ok(laptop, "git add reading-list.md && git commit -m 'Start the reading list'");
    writeFileSync(join(laptop, "reading-list.md"), "# Reading list\n- Dune\n- The Hobbit\n"); ok(laptop, "git commit -am 'Add The Hobbit'");
    ok(laptop, `git remote add origin ${join(dir, "server.git")}`);
    verify("setup");
    for (const step of sequence) {
      if (step === "push" || step === "push-u") {
        const { state: next, output } = push(state, step === "push-u");
        assert.equal(normalize(shell(laptop, env, step === "push-u" ? "git push -u origin main" : "git push").output), normalize(output), `${sequence.join(" ")}: ${step} output`);
        state = next;
      }
      if (step.startsWith("pull:")) {
        const mode = step.slice(5);
        const { state: next, output } = pull(state, mode);
        assert.equal(normalize(shell(laptop, env, pullCommands[mode]).output), normalize(output), `${sequence.join(" ")}: ${step} output`);
        state = next;
      }
      if (step === "sam") {
        const next = samPushes(state);
        if (next !== state) {
          if (!existsSync(teammate)) { ok(dir, "git clone --template= server.git teammate"); ok(teammate, "git config set --local user.name 'Sam Okafor' && git config set --local user.email sam@example.com"); }
          ok(teammate, "git pull --ff-only");
          writeFileSync(join(teammate, "reading-list.md"), contents(firstParentChain(next, next.server).at(-1).lines));
          ok(teammate, `git commit -am '${next.commits.at(-1).message}' && git push`);
        }
        state = next;
      }
      if (step === "commit") {
        const next = youCommit(state);
        if (next !== state) { writeFileSync(join(laptop, "reading-list.md"), contents(firstParentChain(next, next.main).at(-1).lines)); ok(laptop, "git commit -am 'Update the title'"); }
        state = next;
      }
      verify(step);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// 2. The article's walkthrough as one shell session, so cd between the repositories carries over; each documented output must end the real output.
const dir = mkdtempSync(join(tmpdir(), "git-push-article-"));
try {
  const env = makeEnv(dir);
  const blocks = gitPushSections.flatMap(section => (section.blocks ?? []).flatMap(block => block.type === "command" ? [block] : block.type === "details" ? block.commands ?? [] : []));
  assert.ok(blocks.length > 10, "article command blocks found");
  const script = blocks.map((block, index) => `printf '@@BLOCK %s\\n' ${index}\n{\n${block.command}\n} 2>&1\nprintf '@@EXIT %s\\n' $?`).join("\n");
  const raw = execSync(script, { cwd: dir, env, encoding: "utf8", shell: "/bin/sh" }).replaceAll(realpathSync(dir), "/Users/maya").replaceAll(dir, "/Users/maya");
  const parts = raw.split(/^@@BLOCK \d+\n/m).slice(1);
  assert.equal(parts.length, blocks.length, "one output per block");
  blocks.forEach((block, index) => {
    const [, output, exit] = parts[index].match(/^([\s\S]*)@@EXIT (\d+)\n$/);
    if (exit !== "0") assert.match(block.output ?? "", /fatal|rejected/, `${block.command}: exit ${exit} without a documented refusal\n${output}`);
    if (block.output) assert.ok(normalize(output).endsWith(normalize(block.output)), `${block.command}\n--- expected tail ---\n${block.output}\n--- actual ---\n${output}`);
    else assert.equal(normalize(output).replace(/^(Initialized empty Git repository.*|Switched to.*|Cloning into.*|done\.|\[[^\]]+\] .*| \d+ files? changed.*| create mode .*)$/gm, "").trim(), "", `${block.command}: expected nothing beyond init, clone, and commit chatter\n${output}`);
  });
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("Push, pull, upstream, server and record histories, files, and status match real Git for every sequence; the article's walkthrough reproduces its documented outputs.");
