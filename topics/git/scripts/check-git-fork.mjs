// Run: node topics/git/scripts/check-git-fork.mjs
import assert from "node:assert/strict";
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { forkCommits, forkSteps } from "../content/git-fork-lab.ts";
import { gitForkSections } from "../content/git-fork-article.ts";

const makeEnv = dir => ({ ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), HOME: dir, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C", GIT_EDITOR: "true", GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "commit.gpgsign", GIT_CONFIG_VALUE_0: "false" });
const normalize = text => text.replace(/\b[0-9a-f]{7}\b/g, "HASH").split("\n").map(line => line.trimEnd()).join("\n").trimEnd();
const idOf = Object.fromEntries(Object.entries(forkCommits).map(([id, message]) => [message, id]));

function shell(cwd, env, command) {
  try { return { failed: false, output: execSync(`{\n${command}\n} 2>&1`, { cwd, env, encoding: "utf8", shell: "/bin/sh" }) }; }
  catch (error) { return { failed: true, output: error.stdout }; }
}

// 1. The storyboard's label maps against three real repositories, step by step.
{
  const dir = mkdtempSync(join(tmpdir(), "git-fork-check-"));
  const env = makeEnv(dir);
  const ok = (cwd, command) => { const result = shell(cwd, env, command); assert.equal(result.failed, false, `${command}\n${result.output}`); return result.output; };
  const upstream = join(dir, "sam", "reading-list.git");
  const fork = join(dir, "maya", "reading-list.git");
  const samLaptop = join(dir, "sam-laptop");
  const laptop = join(dir, "laptop");
  const labels = (repo, patterns) => Object.fromEntries(ok(dir, `git -C ${repo} for-each-ref --format='%(refname) %(subject)' ${patterns}`).trim().split("\n").filter(line => line && !/\/HEAD /.test(line)).map(line => { const [ref, ...rest] = line.split(" "); return [ref.replace(/^refs\/(heads|remotes)\//, ""), idOf[rest.join(" ")] ?? "?"]; }));
  const exists = path => !shell(dir, env, `test -d ${path}`).failed;
  function verify(index) {
    const step = forkSteps[index];
    const label = `step ${index + 1} (${step.title})`;
    assert.deepEqual(labels(upstream, "refs/heads"), step.upstream, `${label}: upstream labels`);
    assert.deepEqual(exists(fork) ? labels(fork, "refs/heads") : null, step.fork, `${label}: fork labels`);
    assert.deepEqual(exists(laptop) ? labels(laptop, "refs/heads refs/remotes") : null, step.laptop, `${label}: laptop labels`);
    if (step.head) assert.equal(ok(laptop, "git branch --show-current").trim(), step.head, `${label}: checked-out branch`);
  }
  try {
    ok(dir, "mkdir sam maya && git init --bare --initial-branch=main --template= sam/reading-list.git && git clone --template= sam/reading-list.git sam-laptop");
    ok(samLaptop, "git config set --local user.name 'Sam Okafor' && git config set --local user.email sam@example.com");
    writeFileSync(join(samLaptop, "reading-list.md"), "# Reading list\n- Dune\n"); ok(samLaptop, "git add reading-list.md && git commit -m 'Start the reading list'");
    writeFileSync(join(samLaptop, "reading-list.md"), "# Reading list\n- Dune\n- The Hobbit\n"); ok(samLaptop, "git commit -am 'Add The Hobbit' && git push");
    verify(0);
    ok(dir, "git clone --bare --template= sam/reading-list.git maya/reading-list.git"); verify(1);
    ok(dir, "git clone --template= maya/reading-list.git laptop"); ok(laptop, "git config set --local user.name 'Maya Chen' && git config set --local user.email maya@example.com"); verify(2);
    ok(laptop, `git remote add upstream ${upstream} && git fetch upstream`); verify(3);
    ok(laptop, "git switch -c add-piranesi"); writeFileSync(join(laptop, "reading-list.md"), "# Reading list\n- Dune\n- The Hobbit\n- Piranesi\n"); ok(laptop, "git commit -am 'Add Piranesi'"); verify(4);
    ok(laptop, "git push -u origin add-piranesi"); verify(5);
    verify(6);
    ok(samLaptop, `git fetch ${fork} add-piranesi && git merge --no-ff -m 'Merge pull request #1 from maya/add-piranesi' FETCH_HEAD && git push`); verify(7);
    assert.equal(ok(dir, `git -C ${upstream} rev-list --parents --max-count=1 main`).trim().split(" ").length, 3, "the merge commit has two parents");
    ok(laptop, "git fetch upstream && git switch main && git merge --ff-only upstream/main"); verify(8);
    ok(laptop, "git push origin main"); verify(9);
    ok(laptop, "git branch -d add-piranesi && git push origin --delete add-piranesi"); verify(10);
    assert.equal(forkSteps.length, 11, "every step verified");
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// 2. The article's walkthrough as one shell session, so cd between the repositories carries over; each documented output must end the real output.
const dir = mkdtempSync(join(tmpdir(), "git-fork-article-"));
try {
  const env = makeEnv(dir);
  const blocks = gitForkSections.flatMap(section => (section.blocks ?? []).flatMap(block => block.type === "command" ? [block] : block.type === "details" ? block.commands ?? [] : []));
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
console.log("Every storyboard step matches real repositories for the original, the fork, and the laptop; the article's walkthrough reproduces its documented outputs.");
