// Run: node topics/python/scripts/verify-notes.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pythonBasicsArticles } from "../content/python-fm-basics.ts";
import { pythonAdvancedArticles } from "../content/python-fm-advanced.ts";

const source = JSON.parse(readFileSync(new URL("../../../references/python/python-fm-source.json", import.meta.url), "utf8"));
const articles = [...pythonBasicsArticles, ...pythonAdvancedArticles];
const normalize = text => text.replace(/\s+/gu, " ").trim();
const prose = text => text.replace(/\*\*(\S(?:.*?\S)?)\*\*/g, "$1");
const codeLines = text => text.replaceAll("\u00a0", " ").split("\n").map(line => line.trimEnd()).filter(line => line.trim()).join("\n");

assert.equal(source.length, 29);
assert.deepEqual(articles.map(article => article.title), source.map(note => note.title), "Original page titles and order");
assert.equal(new Set(articles.map(article => article.slug)).size, 29, "Unique article routes");
const articleBySlug = new Map(articles.map(article => [article.slug, article]));

for (const [index, article] of articles.entries()) {
  const note = source[index];
  const parent = articleBySlug.get(article.parentSlug);
  assert.equal(parent?.title ?? null, note.parentTitle, `${note.title}: original parent page`);
  assert.equal(article.parentSlug, note.parentTitle === null ? undefined : articles.find(candidate => candidate.title === note.parentTitle)?.slug, `${note.title}: parent route`);
  if (parent) assert.ok(articles.indexOf(parent) < index, `${note.title}: parent precedes child`);
  const ancestors = new Set([article.slug]);
  for (let ancestor = parent; ancestor; ancestor = articleBySlug.get(ancestor.parentSlug)) {
    assert.ok(!ancestors.has(ancestor.slug), `${note.title}: no hierarchy cycles`);
    ancestors.add(ancestor.slug);
  }
  const expected = note.blocks.flatMap(block => block.table ? block.table.flat() : [block.text]).join("\n");
  const rendered = [];
  const codes = [];
  const tables = [];
  function addBlock(block) {
    switch (block.type) {
      case "table":
        rendered.push(block.caption, ...block.columns, ...block.rows.flat());
        tables.push([block.columns, ...block.rows]);
        break;
      case "command":
        rendered.push(block.command, block.explanation ?? "", block.output ?? "");
        codes.push(block.command);
        break;
      case "link":
        assert.equal(block.href, block.text, `${note.title}: original reference URL`);
        rendered.push(block.text);
        break;
      default:
        assert.fail(`${note.title}: unexpected extra block ${block.type}`);
    }
  }
  for (const section of article.sections) {
    rendered.push(prose(section.heading));
    for (const paragraph of section.paragraphs) {
      if (typeof paragraph === "string") rendered.push(prose(paragraph));
      else {
        rendered.push(prose(paragraph.text));
        if (paragraph.block) addBlock(paragraph.block);
        if (paragraph.bullets) rendered.push(...paragraph.bullets.map(prose));
        if (paragraph.code) { rendered.push(paragraph.code); codes.push(paragraph.code); }
        assert.ok(!paragraph.info, `${note.title}: no added explanations`);
      }
    }
    if (section.code) { rendered.push(section.code); codes.push(section.code); }
    section.blocks?.forEach(addBlock);
  }
  assert.equal(normalize(rendered.join("\n")), normalize(expected), `${note.title}: original content, without additions or omissions`);
  assert.deepEqual(tables.map(table => table.map(row => row.map(normalize))), note.blocks.filter(block => block.table).map(block => block.table.map(row => row.map(normalize))), `${note.title}: original table cells`);
  for (const code of codes) assert.ok(codeLines(expected).includes(codeLines(code)), `${note.title}: original code lines and indentation`);
  assert.equal(new Date(article.date).getTime(), new Date(note.date[0]).getTime(), `${note.title}: original date`);
  assert.equal(article.number, String(index + 1).padStart(2, "0"));
  assert.equal(article.topic, "Python");
  assert.equal(article.excerpt, "", `${note.title}: no added summary`);
  assert.equal(article.readTime, "", `${note.title}: no invented reading time`);
  assert.ok(!article.series && !article.sources && !article.shortLesson, `${note.title}: no extra lessons or sources`);
  assert.deepEqual(note.images, [], `${note.title}: source images accounted for`);
}

assert.deepEqual(articles.find(article => article.title === "OOP").sections, [], "Empty OOP page stays empty");
console.log("All 29 Python FM pages preserve titles, hierarchy, order, dates, text, tables, and code indentation.");
