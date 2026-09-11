// Run against a local server: node scripts/check-ai-guide.mjs [base URL]
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3001";
async function page(path) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response.text();
}

const guide = await page("/articles/generative-ai-vs-agentic-ai");
for (const text of ["Generative AI vs. Agentic AI", "Generate", "Retrieve", "Act", "Adapt", "RAG is not memory", "Goal → plan → act → observe → adapt → repeat or stop"]) assert.match(guide, new RegExp(text));
assert.match(guide, /AI<!-- --> Guide/);
for (const id of ["compare-the-levels", "generative-ai", "rag-ai", "tool-ai", "agentic-ai", "choose-the-level", "recap"]) assert.match(guide, new RegExp(`id="${id}"`));
assert.match(guide, /href="\/articles\?topic=AI"/);
assert.match(guide, /class="learning-bullets"/);
assert.doesNotMatch(guide, /Where this level reaches its limit/);
assert.doesNotMatch(guide, />Git<!-- --> Guide</);

const aiArchive = await page("/articles?topic=AI");
assert.match(aiArchive, /href="\/articles\/generative-ai-vs-agentic-ai"/);
assert.match(aiArchive, /Read <!-- -->guide/);

const gitGuide = await page("/articles/git-is-a-time-machine");
assert.match(gitGuide, /Git<!-- --> Guide/);
assert.match(gitGuide, /href="\/learn\/git\?view=guides"/);

console.log("AI guide content, navigation, archive listing, and Git guide labels are correct.");
