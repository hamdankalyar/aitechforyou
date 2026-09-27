// Run: node topics/react-native/scripts/check-react-native-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { reactNativeProjectSetupSections } from "../content/react-native-project-setup-article.ts";
import { reactNativeExpoGoSections } from "../content/react-native-expo-go-article.ts";
import { reactNativeFrameworksOverviewSections } from "../content/react-native-frameworks-overview-article.ts";
import { reactNativeLintingFormattingSections } from "../content/react-native-linting-formatting-article.ts";
import { reactNativeViewTextStylingSections } from "../content/react-native-view-text-styling-article.ts";
import { reactNativePressableTouchableAlertSections } from "../content/react-native-pressable-touchable-alert-article.ts";
import { reactNativeReusableComponentsPropsSections } from "../content/react-native-reusable-components-props-article.ts";

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
const componentIds = reactNativeViewTextStylingSections.map(section => section.id);
const componentLesson = JSON.stringify(reactNativeViewTextStylingSections);
const buttonIds = reactNativePressableTouchableAlertSections.map(section => section.id);
const buttonLesson = JSON.stringify(reactNativePressableTouchableAlertSections);
const reusableComponentIds = reactNativeReusableComponentsPropsSections.map(section => section.id);
const reusableComponentLesson = JSON.stringify(reactNativeReusableComponentsPropsSections);

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
assert.equal(new Set(componentIds).size, componentIds.length, "component section ids are unique");
assert.ok(reactNativeViewTextStylingSections.every(section => section.paragraphs.every(paragraph => /^\*\*[^*]+\*\*/.test(typeof paragraph === "string" ? paragraph : paragraph.text))), "every component lesson bullet starts with a bold term");
for (const detail of ["View", "Text", "truthy and falsy", "double ampersand", "{true &&", "{false &&", "{0 &&", "Empty string", "{NaN &&", "array.length", "array.length > 0", "style prop", "paddingHorizontal", "paddingVertical", "display flex", "flexDirection", "display points", "pixel ratio", "theme.ts", "NativeWind", "StyleSheet.create"]) {
  assert.ok(componentLesson.includes(detail), `the component lesson explains ${detail}`);
}
assert.equal(new Set(buttonIds).size, buttonIds.length, "button component section ids are unique");
assert.ok(reactNativePressableTouchableAlertSections.every(section => section.paragraphs.every(paragraph => /^\*\*[^*]+\*\*/.test(typeof paragraph === "string" ? paragraph : paragraph.text))), "every button component lesson bullet starts with a bold term");
for (const detail of ["Button", "native-looking", "Pressable", "TouchableOpacity", "activeOpacity={0.8}", "flexDirection", "space-between", "alignItems", "letterSpacing", "onPress={handleDelete}", "Alert.alert", "destructive", "cancel", "platform-specific", "full-screen modal"]) {
  assert.ok(buttonLesson.includes(detail), `the button component lesson explains ${detail}`);
}
assert.equal(new Set(reusableComponentIds).size, reusableComponentIds.length, "reusable component section ids are unique");
assert.ok(reactNativeReusableComponentsPropsSections.every(section => section.paragraphs.every(paragraph => /^\*\*[^*]+\*\*/.test(typeof paragraph === "string" ? paragraph : paragraph.text))), "every reusable component lesson bullet starts with a bold term");
for (const detail of ["modular", "export function ShoppingListItem", "Props", "destructuring", "name: string", "name?: string", "In production, StyleSheet.create returns", "What it does in development", "absoluteFill"]) {
  assert.ok(reusableComponentLesson.includes(detail), `the reusable component lesson explains ${detail}`);
}
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
  const componentArticle = await page("/articles/react-native-view-text-styling");
  const buttonArticle = await page("/articles/react-native-pressable-touchable-alert");
  const reusableComponentArticle = await page("/articles/react-native-reusable-components-props");
  const routerArticle = await page("/articles/react-native-expo-router");
  const entrySection = routerArticle.match(/<section id="understand-app-entry">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(entrySection, "the app entry section renders");
  assert.match(entrySection, /<details class="learning-details"><summary>How the app starts<\/summary>/, "the explanation starts closed");
  for (const heading of ["Before adding Expo Router", "What does registerRootComponent do?", "After adding Expo Router", "When to use a custom index.js"]) {
    assert.ok(entrySection.includes(`<h3>${heading}</h3>`), `the dropdown includes ${heading}`);
  }
  assert.equal(entrySection.match(/>Copy<\/button>/g)?.length, 2, "both entry-point examples are copyable");
  assert.match(entrySection, /registerRootComponent\(App\)/, "the root registration diagram renders");
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
  assert.match(componentArticle, /View, Text, and built-in styles/);
  assert.match(componentArticle, /All text.*must always be rendered inside a Text component/is);
  assert.match(componentArticle, /StyleSheet\.create/);
  assert.equal(componentArticle.match(/>Copy<\/button>/g)?.length, 6, "every rendered React Native example has a copy button");
  assert.match(buttonArticle, /Pressable, TouchableOpacity, and Alert/);
  assert.match(buttonArticle, /activeOpacity=\{0\.8\}/);
  assert.match(buttonArticle, /Are you sure you want to delete this\?/);
  assert.match(reusableComponentArticle, /Reusable components, typed props, and StyleSheet utilities/);
  assert.match(reusableComponentArticle, /name\?: string/);
  assert.match(reusableComponentArticle, /In production, StyleSheet\.create returns/);
  assert.equal(reusableComponentArticle.match(/>Copy<\/button>/g)?.length, 7, "every reusable component example has a copy button");
  assert.equal(lintingArticle.match(/>Copy<\/button>/g)?.length, 7, "every rendered linting command has a copy button");
  assert.match(expoArticle, /What are the two main parts of a React Native app\?/);
  assert.match(expoArticle, /What is the workaround if you cannot connect to Expo Go on the same Wi-Fi network\?/);
  assert.match(expoArticle, /How do you access the debug menu in Expo Go on a physical device\?/);
  assert.match(course, /href="\/articles\/react-native-project-setup"/);
  assert.match(course, /href="\/articles\/react-native-expo-go"/);
  assert.match(course, /href="\/articles\/react-native-frameworks-overview"/);
  assert.match(course, /href="\/articles\/react-native-linting-formatting"/);
  assert.match(course, /href="\/articles\/react-native-view-text-styling"/);
  assert.match(course, /href="\/articles\/react-native-pressable-touchable-alert"/);
  assert.match(course, /href="\/articles\/react-native-reusable-components-props"/);
  assert.match(courses, /href="\/courses\/react-native"/);
  for (const section of ["basics", "components", "styling", "navigation", "state", "device", "performance"]) assert.ok(course.includes(`href="#${section}"`));
  assert.match(sitemap, /\/courses\/react-native/);
  assert.match(sitemap, /\/articles\/react-native-project-setup/);
  assert.match(sitemap, /\/articles\/react-native-expo-go/);
  assert.match(sitemap, /\/articles\/react-native-frameworks-overview/);
  assert.match(sitemap, /\/articles\/react-native-linting-formatting/);
  assert.match(sitemap, /\/articles\/react-native-view-text-styling/);
  assert.match(sitemap, /\/articles\/react-native-pressable-touchable-alert/);
  assert.match(sitemap, /\/articles\/react-native-reusable-components-props/);
}

console.log("React Native project setup, Expo Go, framework, linting, and component lessons pass.");
