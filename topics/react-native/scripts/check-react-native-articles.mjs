// Run: node topics/react-native/scripts/check-react-native-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { reactNativeProjectSetupSections } from "../content/react-native-project-setup-article.ts";

const sections = reactNativeProjectSetupSections;
const ids = sections.map(section => section.id);
const lesson = JSON.stringify(sections);

assert.equal(new Set(ids).size, ids.length, "section ids are unique");
assert.ok(sections.every(section => section.paragraphs.every(paragraph => typeof paragraph !== "string" || /^\*\*[^*]+\*\*/.test(paragraph))), "every lesson bullet starts with a bold term");
assert.ok(ids.includes("create-the-project"), "the project creation exercise exists");
for (const detail of ["Yarn Classic 1.22", "node_modules", "iOS", "Android", "Plug'n'Play", "hoisted node linker", "npx", "blank TypeScript"]) {
  assert.ok(lesson.includes(detail), `the lesson explains ${detail}`);
}
assert.ok(sections.some(section => section.blocks?.some(block => block.type === "package-manager-architecture")), "the dependency architecture diagram is present");

if (process.argv[2]) {
  const base = process.argv[2];
  async function page(path) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    return response.text();
  }

  const article = await page("/articles/react-native-project-setup");
  const course = await page("/courses/react-native");
  const courses = await page("/courses");
  const sitemap = await page("/sitemap.xml");

  assert.match(article, /topic-react-native/);
  assert.match(article, /architecture-path-grid/);
  assert.match(article, /Why Yarn Classic works here/);
  assert.match(article, /Why Plug.*Play can be a problem/);
  assert.match(article, /yarn create expo-app taskly -t/);
  assert.match(article, /href="\/courses\/react-native#basics"/);
  assert.match(course, /href="\/articles\/react-native-project-setup"/);
  assert.match(courses, /href="\/courses\/react-native"/);
  for (const section of ["basics", "components", "styling", "navigation", "state", "device", "performance"]) assert.ok(course.includes(`href="#${section}"`));
  assert.match(sitemap, /\/courses\/react-native/);
  assert.match(sitemap, /\/articles\/react-native-project-setup/);
}

console.log("React Native project setup lesson and course links pass.");
