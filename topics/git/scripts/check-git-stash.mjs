// Run: node topics/git/scripts/check-git-stash.mjs
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { stashCommits, stashSteps } from "../content/git-stash-lab.ts";
import { gitStashSections } from "../content/git-stash-article.ts";

const makeEnv = dir => ({ ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), HOME: dir, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), XDG_CONFIG_HOME: dir, LC_ALL: "C", GIT_EDITOR: "true", GIT_CONFIG_COUNT: "1", GIT_CONFIG_KEY_0: "commit.gpgsign", GIT_CONFIG_VALUE_0: "false" });
const normalize = text => text.replace(/\b[0-9a-f]{7,40}\b/g, "HASH").split("\n").map(line => line.trimEnd()).join("\n").trimEnd();

function shell(cwd, env, command) {
  try { return { exit: 0, output: execSync(`{\n${command}\n} 2>&1`, { cwd, env, encoding: "utf8", shell: "/bin/sh" }) }; }
  catch (error) { return { exit: error.status, output: error.stdout }; }
}

// 1. The storyboard: every step's command runs for real, and the output, working file, HEAD, shelf, and status must match the step.
{
  const dir = mkdtempSync(join(tmpdir(), "git-stash-check-"));
  const env = makeEnv(dir);
  const ok = command => { const result = shell(dir, env, command); assert.equal(result.exit, 0, `${command}\n${result.output}`); return result.output; };
  const file = lines => lines.join("\n") + "\n";
  try {
    ok("git init --initial-branch=main --template= && git config set --local user.name 'Maya Chen' && git config set --local user.email maya@example.com");
    writeFileSync(join(dir, "reading-list.md"), "# Reading list\n- Dune\n"); ok("git add reading-list.md && git commit -m 'Start the reading list'");
    writeFileSync(join(dir, "reading-list.md"), file(stashCommits.B.lines)); ok("git commit -am 'Add The Hobbit'");
    writeFileSync(join(dir, "reading-list.md"), file(stashSteps[0].file));
    stashSteps.forEach((step, index) => {
      const label = `step ${index + 1} (${step.title})`;
      const result = shell(dir, env, step.command);
      assert.equal(result.exit, step.conflict ? 1 : 0, `${label}: exit ${result.exit}\n${result.output}`);
      assert.equal(normalize(result.output), normalize(step.output), `${label}: output`);
      assert.equal(readFileSync(join(dir, "reading-list.md"), "utf8"), file(step.file), `${label}: working file`);
      assert.equal(ok("git show HEAD:reading-list.md"), file(stashCommits[step.head].lines), `${label}: HEAD contents`);
      assert.equal(ok("git log --format=%s --max-count=1").trim(), stashCommits[step.head].message, `${label}: HEAD message`);
      assert.equal(ok("git stash list").trimEnd(), step.stashes.join("\n"), `${label}: shelf`);
      assert.equal(ok("git status --short").trimEnd(), step.status, `${label}: status`);
    });
    assert.equal(stashSteps.length, 10, "every step verified");
  } finally { rmSync(dir, { recursive: true, force: true }); }
}

// 2. The article's walkthrough as one shell session; each documented output must end the real output, and only the conflicting pop may fail.
const dir = mkdtempSync(join(tmpdir(), "git-stash-article-"));
try {
  const env = makeEnv(dir);
  const blocks = gitStashSections.flatMap(section => (section.blocks ?? []).flatMap(block => block.type === "command" ? [block] : block.type === "details" ? block.commands ?? [] : []));
  assert.ok(blocks.length > 10, "article command blocks found");
  const script = blocks.map((block, index) => `printf '@@BLOCK %s\\n' ${index}\n{\n${block.command}\n} 2>&1\nprintf '@@EXIT %s\\n' $?`).join("\n");
  const raw = execSync(script, { cwd: dir, env, encoding: "utf8", shell: "/bin/sh" }).replaceAll(realpathSync(dir), "/Users/maya").replaceAll(dir, "/Users/maya");
  const parts = raw.split(/^@@BLOCK \d+\n/m).slice(1);
  assert.equal(parts.length, blocks.length, "one output per block");
  blocks.forEach((block, index) => {
    const [, output, exit] = parts[index].match(/^([\s\S]*)@@EXIT (\d+)\n$/);
    assert.ok(block.output, `${block.command}: every block documents its output`);
    assert.equal(exit, block.output.includes("CONFLICT") ? "1" : "0", `${block.command}: exit ${exit}\n${output}`);
    assert.ok(normalize(output).endsWith(normalize(block.output)), `${block.command}\n--- expected tail ---\n${block.output}\n--- actual ---\n${output}`);
  });
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("Every storyboard step matches a real repository's output, file, HEAD, shelf, and status; the article's walkthrough reproduces its documented outputs.");
