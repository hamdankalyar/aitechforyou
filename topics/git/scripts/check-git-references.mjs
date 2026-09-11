// Run with Node 22.18+: node topics/git/scripts/check-git-references.mjs [slug] [--print]
// Execute every published reference command in order inside a disposable home directory and compare outputs.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { gitReferences } from "../content/git-references.ts";

const only = process.argv.slice(2).find(argument => !argument.startsWith("--"));
const print = process.argv.includes("--print");
// Example output uses placeholder IDs and paths; compare after normalizing both sides the same way.
const normalize = (text, home) => text.replaceAll(home, "/Users/you").replace(/\b[0-9a-f]{7,40}\b/g, "HASH").replace(/^Date: .*$/gm, "Date: …").replace(/[ \t]+$/gm, "").trim() || "No output";

for (const reference of gitReferences.filter(reference => reference.slug !== "configure" && (!only || reference.slug === only))) {
  const home = realpathSync(mkdtempSync(join(tmpdir(), `git-${reference.slug}-`)));
  const env = {
    ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
    HOME: home,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: join(home, "global-config"),
    XDG_CONFIG_HOME: home,
    GIT_EDITOR: "true",
    LC_ALL: "C",
  };
  writeFileSync(env.GIT_CONFIG_GLOBAL, "");
  const examples = reference.sections.flatMap(section => section.commands.map(example => ({ ...example, section: section.id })));
  const script = "exec 2>&1\n" + examples.map((example, index) => `printf '@@@%s\\n' ${index}\n${example.command}\nprintf '@@@status %s\\n' $?\n`).join("");
  try {
    const result = spawnSync("sh", ["-s"], { cwd: home, env, input: script, encoding: "utf8" });
    assert.equal(result.status, 0, result.stdout);
    const chunks = result.stdout.split(/^@@@(\d+)\n/m).slice(1);
    for (let index = 0; index < examples.length; index++) {
      const example = examples[index];
      assert.equal(chunks[index * 2], String(index));
      const [, body, status] = chunks[index * 2 + 1].match(/^([\s\S]*?)@@@status (\d+)\n?$/);
      const actual = normalize(body, home);
      const expected = normalize(example.output, home);
      const label = `${reference.slug} › ${example.section} › ${example.command.split("\n")[0]}`;
      if (print) { console.log(`\n### ${label} (exit ${status})\n${body.replace(home, "/Users/you").trimEnd()}`); continue; }
      assert.equal(Number(status), example.status ?? 0, `${label} exit status`);
      if (expected.includes("…")) for (const line of expected.split("\n").filter(line => !line.includes("…"))) assert.ok(actual.includes(line), `${label}\nmissing: ${line}\nactual:\n${actual}`);
      else assert.equal(actual, expected, label);
    }
    if (!print) console.log(`${reference.title} reference commands passed (${examples.length} examples).`);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
}
