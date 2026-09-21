// Run: node topics/react-native/scripts/check-react-native-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { reactNativeProjectSetupSections } from "../content/react-native-project-setup-article.ts";
import { reactNativeExpoGoSections } from "../content/react-native-expo-go-article.ts";
import { reactNativeFrameworksOverviewSections } from "../content/react-native-frameworks-overview-article.ts";
import { reactNativeLintingFormattingSections } from "../content/react-native-linting-formatting-article.ts";

const sections = reactNativeProjectSetupSections;
const ids = sections.map(section => section.id);
const lesson = JSON.stringify(sections);
const expoIds = reactNativeExpoGoSections.map(section => section.id);
const expoLesson = JSON.stringify(reactNativeExpoGoSections);
const frameworkIds = reactNativeFrameworksOverviewSections.map(section => section.id);
const frameworkLesson = JSON.stringify(reactNativeFrameworksOverviewSections).toLowerCase();
const lintingIds = reactNativeLintingFormattingSections.map(section => section.id);
const lintingLesson = JSON.stringify(reactNativeLintingFormattingSections);
const lintingCommands = reactNativeLintingFormattingSections.flatMap(section => section.blocks ?? []).filter(block => block.type === "command");

assert.equal(new Set(ids).size, ids.length, "section ids are unique");
assert.ok(sections.every(section => section.paragraphs.every(paragraph => typeof paragraph !== "string" || /^\*\*[^*]+\*\*/.test(paragraph))), "every lesson bullet starts with a bold term");
assert.ok(ids.includes("create-the-project"), "the project creation exercise exists");
for (const detail of ["Yarn Classic 1.22", "node_modules", "iOS", "Android", "Plug'n'Play", "hoisted node linker", "npx", "blank TypeScript"]) {
  assert.ok(lesson.includes(detail), `the lesson explains ${detail}`);
}
assert.ok(sections.some(section => section.blocks?.some(block => block.type === "package-manager-architecture")), "the dependency architecture diagram is present");
assert.equal(new Set(expoIds).size, expoIds.length, "Expo Go section ids are unique");
assert.ok(reactNativeExpoGoSections.every(section => section.paragraphs.every(paragraph => /^\*\*[^*]+\*\*/.test(typeof paragraph === "string" ? paragraph : paragraph.text))), "every Expo Go lesson bullet starts with a bold term");
for (const detail of ["JavaScript side", "native app side", "npx expo start", "yarn start", "npm run start", "Expo Go", "Fast Refresh", "TypeScript", "same Wi-Fi network", "Ngrok", "npx expo start --tunnel"]) {
  assert.ok(expoLesson.includes(detail), `the Expo Go lesson explains ${detail}`);
}
assert.ok(reactNativeExpoGoSections.some(section => section.blocks?.some(block => block.type === "table")), "the two-part app architecture is shown");
assert.equal(new Set(frameworkIds).size, frameworkIds.length, "framework section ids are unique");
assert.ok(reactNativeFrameworksOverviewSections.every(section => section.paragraphs.every(paragraph => /^\*\*[^*]+\*\*/.test(typeof paragraph === "string" ? paragraph : paragraph.text))), "every framework lesson bullet starts with a bold term");
for (const detail of ["metro", "hermes", "jsi", "navigation", "push notifications", "react native directory", "expo go", "sandbox environment"]) {
  assert.ok(frameworkLesson.includes(detail), `the framework lesson explains ${detail}`);
}
assert.equal(new Set(lintingIds).size, lintingIds.length, "linting section ids are unique");
assert.ok(reactNativeLintingFormattingSections.every(section => section.paragraphs.every(paragraph => /^\*\*[^*]+\*\*/.test(typeof paragraph === "string" ? paragraph : paragraph.text))), "every linting lesson bullet starts with a bold term");
for (const detail of ["npx expo lint", "yarn add -D prettier eslint-config-prettier eslint-plugin-prettier", "npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier", "extends: ['expo', 'prettier']", "Prettier plugin", "double quotes", ".prettierrc.js", "yarn lint", "npm run lint", "yarn lint --fix", "VS Code"]) {
  assert.ok(lintingLesson.includes(detail), `the linting lesson explains ${detail}`);
}
assert.equal(lintingCommands.length, 7, "every linting command uses the shared copyable command block");
const reviewSection = reactNativeExpoGoSections.find(section => section.id === "review-questions");
assert.equal(reviewSection?.blocks?.filter(block => block.type === "details").length, 3, "the Expo Go lesson ends with three expandable review questions");

if (process.argv[2]) {
  const base = process.argv[2];
  async function page(path) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    return response.text();
  }

  const article = await page("/articles/react-native-project-setup");
  const expoArticle = await page("/articles/react-native-expo-go");
  const frameworkArticle = await page("/articles/react-native-frameworks-overview");
  const lintingArticle = await page("/articles/react-native-linting-formatting");
  const course = await page("/courses/react-native");
  const courses = await page("/courses");
  const sitemap = await page("/sitemap.xml");

  assert.match(article, /topic-react-native/);
  assert.match(article, /architecture-path-grid/);
  assert.match(article, /Why Yarn Classic works here/);
  assert.match(article, /Why Plug.*Play can be a problem/);
  assert.match(article, /yarn create expo-app taskly -t/);
  assert.match(article, /href="\/courses\/react-native#basics"/);
  assert.match(article, /href="\/articles\/react-native-expo-go"/);
  assert.match(expoArticle, /npx expo start/);
  assert.match(expoArticle, /Expo Go/);
  assert.match(expoArticle, /npx expo start --tunnel/);
  assert.match(frameworkArticle, /Expo is a React Native framework/);
  assert.match(frameworkArticle, /React Native Directory/);
  assert.match(lintingArticle, /npx expo lint/);
  assert.match(lintingArticle, /yarn lint --fix/);
  assert.match(lintingArticle, /This course.*keeps the default double quotes/);
  assert.equal(lintingArticle.match(/>Copy<\/button>/g)?.length, 7, "every rendered linting command has a copy button");
  assert.match(expoArticle, /What are the two main parts of a React Native app\?/);
  assert.match(expoArticle, /What is the workaround if you cannot connect to Expo Go on the same Wi-Fi network\?/);
  assert.match(expoArticle, /How do you access the debug menu in Expo Go on a physical device\?/);
  assert.match(course, /href="\/articles\/react-native-project-setup"/);
  assert.match(course, /href="\/articles\/react-native-expo-go"/);
  assert.match(course, /href="\/articles\/react-native-frameworks-overview"/);
  assert.match(course, /href="\/articles\/react-native-linting-formatting"/);
  assert.match(courses, /href="\/courses\/react-native"/);
  for (const section of ["basics", "components", "styling", "navigation", "state", "device", "performance"]) assert.ok(course.includes(`href="#${section}"`));
  assert.match(sitemap, /\/courses\/react-native/);
  assert.match(sitemap, /\/articles\/react-native-project-setup/);
  assert.match(sitemap, /\/articles\/react-native-expo-go/);
  assert.match(sitemap, /\/articles\/react-native-frameworks-overview/);
  assert.match(sitemap, /\/articles\/react-native-linting-formatting/);
}

console.log("React Native project setup, Expo Go, framework, and linting lessons pass.");
