// Run with Node 22.18+: node scripts/check-git-config-reference.mjs
// Execute the published commands against isolated configuration and a disposable repository.
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gitConfigReferenceSections } from "../lib/git-config-reference.ts";

const directory = mkdtempSync(join(tmpdir(), "git-config-reference-"));
const env = {
  ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_CONFIG_GLOBAL: join(directory, "global-config"),
  XDG_CONFIG_HOME: directory,
};
const options = { cwd: directory, env, encoding: "utf8" };
const git = (...args) => execFileSync("git", args, options).trim();
const status = (...args) => spawnSync("git", args, options).status;
try {
  writeFileSync(env.GIT_CONFIG_GLOBAL, "");
  git("init", "--initial-branch=existing");
  assert.equal(status("config", "get", "user.name"), 1);
  assert.equal(status("config", "get", "user.email"), 1);
  for (const section of gitConfigReferenceSections) {
    // Seed only the initial read example; subsequent sections execute in their published order.
    if (section.id === "check-identity") {
      git("config", "set", "--global", "user.name", "Your Name");
      git("config", "set", "--global", "user.email", "you@example.com");
    }
    for (const example of section.commands) {
      if (example.command.startsWith("git config unset --local --value=")) {
        assert.equal(status("config", "unset", "--local", "tutorial.reader"), 5);
        assert.equal(status("config", "set", "--local", "tutorial.reader", "Alex"), 5);
        assert.equal(git("config", "get", "--local", "--all", "tutorial.reader"), "Maya\nSam");
      }
      const output = example.command.split("\n").map(line => execFileSync("sh", ["-c", line], options).trim()).filter(Boolean).join("\n");
      if (example.output) assert.equal(output, example.output, section.id);
      if (example.command.startsWith("git config unset --local --value=")) {
        assert.equal(git("config", "get", "--local", "--all", "tutorial.reader"), "Sam");
      }
    }
    if (section.id === "project-override") {
      assert.equal(git("config", "get", "user.name"), "Your Name");
      assert.equal(git("config", "get", "--global", "user.email"), "you@example.com");
    }
    if (section.id === "inspect-settings") {
      assert.match(git("config", "get", "--show-origin", "--show-scope", "user.email"), /local\s+file:.git\/config\s+you@company.example/);
    }
    if (section.id === "unset") {
      assert.equal(git("config", "get", "user.email"), "you@example.com");
      assert.equal(status("config", "get", "--local", "user.email"), 1);
    }
    if (section.id === "multiple-values") assert.equal(status("config", "get", "--local", "tutorial.reader"), 1);
    if (section.id === "remove-section") assert.equal(status("config", "get", "--local", "tutorial.topic"), 1);
  }
  assert.equal(git("config", "get", "user.name"), "Your Name", "Temporary override is not persisted");
  assert.equal(git("symbolic-ref", "--short", "HEAD"), "existing", "Default branch setting does not rename existing branches");
  mkdirSync(join(directory, "new-repo"));
  git("init", "new-repo");
  assert.equal(git("-C", "new-repo", "symbolic-ref", "--short", "HEAD"), "main");
  console.log("Git Config reference commands passed: identity, scopes, origins, removal, duplicate values, temporary overrides, and branch defaults.");
} finally {
  rmSync(directory, { recursive: true, force: true });
}
