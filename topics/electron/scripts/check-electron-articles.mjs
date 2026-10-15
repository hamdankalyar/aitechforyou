// Run: node topics/electron/scripts/check-electron-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Script, createContext, runInContext } from "node:vm";
import { electronIntroductionSections } from "../content/electron-introduction-article.ts";
import { electronProcessModelSections } from "../content/electron-process-model-article.ts";
import { appLifecycleCode, electronSmallestAppSections } from "../content/electron-smallest-app-article.ts";
import { lifecycle, platforms } from "../content/electron-lifecycle-lab.ts";
import { startupSteps } from "../content/electron-startup-lab.ts";

const lectures = { "electron-introduction": electronIntroductionSections, "electron-process-model": electronProcessModelSections, "electron-smallest-app": electronSmallestAppSections };
const registry = readFileSync(new URL("../../../lib/articles.ts", import.meta.url), "utf8").replaceAll("\r\n", "\n");
const boldStart = /^\*\*[^*]+\*\*/;

for (const [slug, sections] of Object.entries(lectures)) {
  const ids = sections.map(section => section.id);
  assert.equal(new Set(ids).size, ids.length, `${slug}: section ids are unique`);
  assert.ok(registry.includes(`slug: "${slug}"`), `${slug}: registered in lib/articles.ts`);
  const entry = registry.slice(registry.indexOf(`slug: "${slug}"`)).split("\n  },\n")[0];
  assert.match(entry, /topic: "Electron"/, `${slug}: topic is Electron`);
  assert.ok(sections.every(section => !section.code), `${slug}: section code uses a command block`);
  const exercise = entry.match(/exercise: \{ id: "([^"]+)"/)?.[1];
  assert.ok(ids.includes(exercise), `${slug}: the hero exercise links to a real section`);

  // Writing rules from AGENTS.md: every bullet starts with a bold term.
  for (const section of sections) for (const paragraph of section.paragraphs) {
    const text = typeof paragraph === "string" ? paragraph : paragraph.text;
    assert.match(text, boldStart, `${slug}#${section.id}: "${text}" starts with a bold term`);
    for (const bullet of typeof paragraph === "string" ? [] : paragraph.bullets ?? []) assert.match(bullet, boldStart, `${slug}#${section.id}: "${bullet}" starts with a bold term`);
    // Consistent UI: code goes in the dark command block, never the plain paragraph code box.
    assert.ok(typeof paragraph === "string" || !paragraph.code, `${slug}#${section.id}: "${text}" uses a command block for code`);
  }

  // Code blocks labelled as a file must at least parse: .js compiles, .json parses.
  const commands = sections.flatMap(section => [...(section.blocks ?? []), ...section.paragraphs.flatMap(paragraph => typeof paragraph === "string" || !paragraph.block ? [] : [paragraph.block])]).filter(block => block.type === "command");
  for (const block of commands) {
    if (block.label?.endsWith(".js")) assert.doesNotThrow(() => new Script(block.command), `${slug}: ${block.label} parses`);
    if (block.label?.endsWith(".json")) assert.doesNotThrow(() => JSON.parse(block.command), `${slug}: ${block.label} parses`);
    for (const line of block.highlightLines ?? []) assert.ok(line <= block.command.split("\n").length, `${slug}: ${block.label} highlights a real line`);
  }

  // Flashcards: optional, one block in a "flashcards" section right before the quiz, every card complete and unique.
  const flashcards = sections.flatMap(section => (section.blocks ?? []).filter(block => block.type === "flashcards").map(block => ({ section, block })));
  assert.ok(flashcards.length <= 1, `${slug}: at most one flashcards block`);
  for (const { section, block } of flashcards) {
    assert.equal(section.id, "flashcards", `${slug}: flashcards live in the flashcards section`);
    assert.equal(sections.at(-2), section, `${slug}: flashcards come right before the quiz`);
    assert.ok(block.cards.length >= 3, `${slug}: at least three flashcards`);
    assert.equal(new Set(block.cards.map(card => card.question)).size, block.cards.length, `${slug}: flashcard questions are unique`);
    for (const card of block.cards) assert.ok(card.question.trim().endsWith("?") && card.answer.trim(), `${slug}: "${card.question}" has a question and an answer`);
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

// Lecture 2 covers the process model from the workshop.
const processModel = JSON.stringify(electronProcessModelSections);
for (const detail of ["main process", "renderer process", "preload script", "IPC", "inter-process communication", "allow list", "Least access", "Electron 12", "fs.writeFile", "Squirrel", "server"]) {
  assert.ok(processModel.includes(detail), `the process model lecture explains ${detail}`);
}

// Lecture 3 tours the four files of the smallest app.
const smallestApp = JSON.stringify(electronSmallestAppSections);
for (const detail of ["Electron Fiddle", "Electron Forge", "package.json", "main.js", "preload.js", "renderer.js", "index.html", "BrowserWindow", "webPreferences", "window-all-closed", "activate", "darwin", "win32", "process.versions", "Content-Security-Policy"]) {
  assert.ok(smallestApp.includes(detail), `the smallest app lecture explains ${detail}`);
}

// The lifecycle simulation must match the lecture's real main.js code, run against a mock of Electron's app events.
function runLectureCode(platform, actions) {
  let handlers = {};
  let running = false;
  let nextId = 1;
  const windows = [];
  const boot = () => {
    handlers = {};
    let ready;
    const app = { whenReady: () => ({ then: callback => { ready = callback; } }), on: (name, callback) => { (handlers[name] ??= []).push(callback); }, quit: () => { running = false; } };
    const createWindow = () => windows.push(nextId++);
    runInContext(appLifecycleCode, createContext({ app, createWindow, BrowserWindow: { getAllWindows: () => windows }, process: { platform } }));
    running = true;
    ready();
  };
  const emit = name => (handlers[name] ?? []).forEach(handler => handler());
  for (const action of actions) {
    if (action === "start" && !running) { nextId = 1; boot(); }
    if (action === "open" && running) windows.push(nextId++);
    if (action === "close" && running && windows.length) { windows.pop(); if (!windows.length) emit("window-all-closed"); }
    if (action === "dock" && running && platform === "darwin") emit("activate");
  }
  return { running, windows: [...windows] };
}
const allActions = ["start", "open", "close", "dock"];
const sequences = [[]];
for (let length = 0; length < 6; length++) for (const sequence of sequences.filter(item => item.length === length)) for (const action of allActions) sequences.push([...sequence, action]);
for (const { id } of platforms) for (const sequence of sequences) {
  const simulated = lifecycle(id, sequence);
  const real = runLectureCode(id, sequence);
  assert.deepEqual({ running: simulated.running, windows: simulated.windows }, real, `${id}: ${sequence.join(" → ") || "nothing"}`);
}

// The startup storyboard runs the four files in order, and versions appear only after DOMContentLoaded.
assert.deepEqual([...new Set(startupSteps.map(step => step.file))], ["package.json", "main.js", "preload.js", "index.html", "renderer.js"], "startup visits every file in order");
assert.ok(startupSteps.slice(0, -1).every(step => !step.page.join(" ").match(/\d+\.\d+/)), "version numbers stay empty until the last step");
assert.match(startupSteps.at(-1).page.join(" "), /Node\.js \d/, "the last step fills in the versions");

const base = process.argv[2];
if (base) {
  for (const path of ["/courses/electron", ...Object.keys(lectures).map(slug => `/articles/${slug}`)]) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    const html = (await response.text()).replaceAll("<!-- -->", "");
    if (path === "/courses/electron") for (const slug of Object.keys(lectures)) assert.match(html, new RegExp(`href="/articles/${slug}"`));
    else { assert.match(html, /Lecture quiz/); assert.match(html, /Question 1 of \d+/); if (lectures[path.split("/").pop()].some(section => section.id === "flashcards")) assert.match(html, /Card 1 of \d+/); }
  }
}

console.log(`Electron lectures pass: ${Object.keys(lectures).length} lectures, writing rules, quiz answers${base ? ", and rendered pages" : ""}.`);
