// Run: node topics/git/scripts/check-git-ignore.mjs
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { explainIgnore, ignorePaths, ignoreRules, initiallyTracked, simulateStatus } from "../content/git-ignore-lab.ts";

const dir = mkdtempSync(join(tmpdir(), "git-ignore-check-"));
const env = { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))), GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: join(dir, "unused-global"), LC_ALL: "C" };
const git = (...args) => execFileSync("git", ["-c", "commit.gpgsign=false", "-c", "color.ui=false", ...args], { cwd: dir, env, encoding: "utf8" });
const checkIgnore = path => { try { return git("check-ignore", "-v", path); } catch (error) { if (error.status === 1) return error.stdout; throw error; } };

function verify(envTracked) {
  for (let mask = 0; mask < 1 << ignoreRules.length; mask++) {
    const rules = ignoreRules.filter((_, index) => mask & (1 << index)).map(rule => rule.pattern);
    writeFileSync(join(dir, ".gitignore"), rules.map(rule => rule + "\n").join(""));
    const results = ignorePaths.map(path => explainIgnore(path, path === ".env" ? envTracked : initiallyTracked.includes(path), rules));
    for (const result of results) {
      const expected = result.line ? `.gitignore:${result.line}:${rules[result.line - 1]}\t${result.path}\n` : "";
      assert.equal(checkIgnore(result.path), expected, `rules [${rules}] env tracked ${envTracked}: ${result.path}`);
    }
    const status = git("status", "--short", "--ignored", "--untracked-files=all").split("\n").filter(line => line && !line.endsWith(".gitignore")).map(line => line + "\n").join("");
    assert.equal(status, simulateStatus(results), `rules [${rules}] env tracked ${envTracked}: status`);
  }
}

try {
  git("init", "--initial-branch=main", "--template=");
  git("config", "set", "--local", "user.name", "Maya Chen");
  git("config", "set", "--local", "user.email", "maya@example.com");
  writeFileSync(join(dir, "reading-list.md"), "# Reading list\n- Dune\n");
  writeFileSync(join(dir, ".env"), "API_KEY=practice-only\n");
  writeFileSync(join(dir, ".gitignore"), "");
  git("add", "reading-list.md", ".env", ".gitignore");
  git("commit", "-m", "Start the reading list");
  mkdirSync(join(dir, "logs"));
  mkdirSync(join(dir, "notes"));
  for (const path of ignorePaths.filter(path => !initiallyTracked.includes(path))) writeFileSync(join(dir, path), "practice\n");
  verify(true);
  git("rm", "--cached", ".env");
  git("commit", "-m", "Stop tracking .env");
  assert.equal(git("show", "HEAD~1:.env"), "API_KEY=practice-only\n", "History still holds the untracked file");
  verify(false);
  writeFileSync(join(dir, ".gitignore"), "*.log\n!important.log\nnotes/*\n!notes/keep.md\n.env\n");
  assert.equal(checkIgnore("notes/keep.md"), ".gitignore:4:!notes/keep.md\tnotes/keep.md\n", "notes/* lets the negation work");
} finally { rmSync(dir, { recursive: true, force: true }); }
console.log("Ignore results match real Git for every rule combination, before and after untracking .env.");
