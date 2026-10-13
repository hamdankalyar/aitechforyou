// Run: node topics/electron/scripts/check-electron-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { electronIntroductionSections } from "../content/electron-introduction-article.ts";

const lectures = { "electron-introduction": electronIntroductionSections };
const registry = readFileSync(new URL("../../../lib/articles.ts", import.meta.url), "utf8").replaceAll("\r\n", "\n");
const boldStart = /^\*\*[^*]+\*\*/;

for (const [slug, sections] of Object.entries(lectures)) {
  const ids = sections.map(section => section.id);
  assert.equal(new Set(ids).size, ids.length, `${slug}: section ids are unique`);
  assert.ok(registry.includes(`slug: "${slug}"`), `${slug}: registered in lib/articles.ts`);
  const entry = registry.slice(registry.indexOf(`slug: "${slug}"`)).split("\n  },\n")[0];
  assert.match(entry, /topic: "Electron"/, `${slug}: topic is Electron`);
  const exercise = entry.match(/exercise: \{ id: "([^"]+)"/)?.[1];
  assert.ok(ids.includes(exercise), `${slug}: the hero exercise links to a real section`);

  // Writing rules from AGENTS.md: every bullet starts with a bold term.
  for (const section of sections) for (const paragraph of section.paragraphs) {
    const text = typeof paragraph === "string" ? paragraph : paragraph.text;
    assert.match(text, boldStart, `${slug}#${section.id}: "${text}" starts with a bold term`);
    for (const bullet of typeof paragraph === "string" ? [] : paragraph.bullets ?? []) assert.match(bullet, boldStart, `${slug}#${section.id}: "${bullet}" starts with a bold term`);
  }

  // Quiz mode: the last section holds exactly one quiz, and every question has one right answer.
  const quizzes = sections.flatMap(section => (section.blocks ?? []).filter(block => block.type === "quiz-mode").map(block => ({ section, block })));
  assert.equal(quizzes.length, 1, `${slug}: has one quiz-mode block`);
  const [{ section, block }] = quizzes;
  assert.equal(section.id, "lecture-quiz", `${slug}: the quiz lives in the lecture-quiz section`);
  assert.equal(sections.at(-1), section, `${slug}: the quiz is the last section`);
  assert.ok(block.questions.length >= 5, `${slug}: the quiz has at least five questions`);
  for (const question of block.questions) {
    assert.ok(question.answers.length >= 3, `${question.question}: at least three answers`);
    assert.equal(question.answers.filter(answer => answer.correct).length, 1, `${question.question}: exactly one correct answer`);
    assert.equal(new Set(question.answers.map(answer => answer.text)).size, question.answers.length, `${question.question}: answers are unique`);
    for (const answer of question.answers) assert.ok(answer.explanation.trim(), `${question.question} / ${answer.text}: has an explanation`);
  }
  const positions = new Set(block.questions.map(question => question.answers.findIndex(answer => answer.correct)));
  assert.ok(positions.size > 1, `${slug}: the correct answer is not always in the same position`);
}

// Lecture 1 covers the ideas from the opening of the workshop.
const intro = JSON.stringify(electronIntroductionSections);
for (const detail of ["Chromium", "Node.js", "renderer process", "main process", "context bridge", "Native modules", "Firesale", "Not Done (Yet)", "Clipmaster", "system tray", "Electron Forge", "npm run package"]) {
  assert.ok(intro.includes(detail), `the introduction explains ${detail}`);
}

const base = process.argv[2];
if (base) {
  for (const path of ["/courses/electron", "/articles/electron-introduction"]) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = (await response.text()).replaceAll("<!-- -->", "");
    if (path === "/courses/electron") assert.match(html, /href="\/articles\/electron-introduction"/);
    else { assert.match(html, /Lecture quiz/); assert.match(html, /Question 1 of 10/); assert.match(html, /Context bridge/); }
  }
}

console.log(`Electron lectures pass: ${Object.keys(lectures).length} lecture, writing rules, quiz answers${base ? ", and rendered pages" : ""}.`);
