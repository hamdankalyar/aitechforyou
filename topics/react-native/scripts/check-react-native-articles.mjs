// Run: node topics/react-native/scripts/check-react-native-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { stripTypeScriptTypes } from "node:module";
import { runInNewContext } from "node:vm";
import { reactNativeProjectSetupSections } from "../content/react-native-project-setup-article.ts";
import { reactNativeExpoGoSections } from "../content/react-native-expo-go-article.ts";
import { reactNativeFrameworksOverviewSections } from "../content/react-native-frameworks-overview-article.ts";
import { reactNativeLintingFormattingSections } from "../content/react-native-linting-formatting-article.ts";
import { reactNativeViewTextStylingSections } from "../content/react-native-view-text-styling-article.ts";
import { reactNativePressableTouchableAlertSections } from "../content/react-native-pressable-touchable-alert-article.ts";
import { reactNativeReusableComponentsPropsSections } from "../content/react-native-reusable-components-props-article.ts";
import { reactNativeTextInputShoppingListSections } from "../content/react-native-text-input-shopping-list-article.ts";
import { reactNativeScrollViewFlatListSections } from "../content/react-native-scrollview-flatlist-article.ts";
import { reactNativeAsyncStorageSections } from "../content/react-native-async-storage-article.ts";
import { reactNativeHapticsSections } from "../content/react-native-haptics-article.ts";
import { reactNativeNotificationPermissionsSections } from "../content/react-native-notification-permissions-article.ts";

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

const inputSections = reactNativeTextInputShoppingListSections;
assert.equal(new Set(inputSections.map(section => section.id)).size, inputSections.length, "TextInput section ids are unique");
for (const section of inputSections) {
  for (const paragraph of section.paragraphs) {
    const bullets = typeof paragraph === "string" ? [paragraph] : [paragraph.text, ...(paragraph.bullets ?? [])];
    for (const bullet of bullets) {
      assert.match(bullet, /^\*\*[^*]+\*\*/, "every TextInput bullet starts with a bold term");
      assert.doesNotMatch(bullet, /\b(course|workshop|instructor)\b/i, "TextInput bullets avoid excluded terms");
    }
  }
}
const submitCode = inputSections.find(section => section.id === "updating-state-on-submission")
  .paragraphs.find(paragraph => paragraph.block?.command.startsWith("const handleSubmit")).block.command;
for (const value of ["", "Sugar"]) {
  const original = [{ id: "1", name: "Coffee" }, { id: "2", name: "Tea" }, { id: "3", name: "Milk" }];
  let updated;
  let cleared;
  runInNewContext(`${submitCode}\nhandleSubmit();`, {
    value, shoppingList: original,
    setShoppingList: list => { updated = list; },
    setValue: text => { cleared = text; },
  });
  assert.deepEqual(updated?.map(item => item.name).join(","), value ? "Sugar,Coffee,Tea,Milk" : undefined);
  assert.equal(cleared, value ? "" : undefined, "only a successful submission clears the input");
  assert.equal(original.length, 3, "submission preserves the existing array");
  if (value) assert.equal(new Date(updated[0].id).toISOString(), updated[0].id, "the id is an ISO timestamp");
}

const listSections = reactNativeScrollViewFlatListSections;
assert.equal(new Set(listSections.map(section => section.id)).size, listSections.length, "scrollable list section ids are unique");
for (const section of listSections) {
  for (const paragraph of section.paragraphs) {
    const bullets = typeof paragraph === "string" ? [paragraph] : [paragraph.text, ...(paragraph.bullets ?? [])];
    for (const bullet of bullets) {
      assert.match(bullet, /^\*\*[^*]+\*\*/, "every scrollable list bullet starts with a bold term");
      assert.doesNotMatch(bullet, /\b(course|workshop|instructor)\b/i, "scrollable list bullets avoid excluded terms");
    }
  }
}
const testDataCode = listSections.find(section => section.id === "large-list-rendering")
  .paragraphs.find(paragraph => paragraph.block?.command.startsWith("const testData")).block.command;
const testData = runInNewContext(`${testDataCode}\ntestData;`);
assert.equal(testData.length, 1000, "the large list example creates 1,000 items");
assert.equal(new Set(testData.map(item => item.id)).size, 1000, "each test item has a unique id");
assert.ok(testData.every((item, index) => item.id === index && item.name === index), "the example uses indices rather than null values");

const listQuestions = listSections.find(section => section.id === "interview-questions").blocks;
const deleteExample = listQuestions.find(question => question.code?.startsWith("const handleDelete"));
const toggleExample = listQuestions.find(question => question.code?.startsWith("const handleToggleComplete"));
const exampleList = [{ id: "1", name: "Coffee" }, { id: "2", name: "Tea", completedAtTimestamp: 123 }];
for (const [example, action, expected] of [
  [deleteExample, 'handleDelete("1")', [{ id: "2", name: "Tea", completedAtTimestamp: 123 }]],
  [toggleExample, 'handleToggleComplete("1")', [{ id: "1", name: "Coffee", completedAtTimestamp: 456 }, exampleList[1]]],
  [toggleExample, 'handleToggleComplete("2")', [exampleList[0], { id: "2", name: "Tea" }]],
  [toggleExample, 'handleToggleComplete("missing")', exampleList],
]) {
  let updated;
  const original = JSON.stringify(exampleList);
  runInNewContext(`${example.code}\n${action};`, {
    shoppingList: exampleList,
    setShoppingList: list => { updated = list; },
    Date: { now: () => 456 },
  });
  assert.deepEqual(JSON.parse(JSON.stringify(updated)), expected, action);
  assert.equal(JSON.stringify(exampleList), original, "delete and toggle examples preserve the original items");
}

const storageSections = reactNativeAsyncStorageSections;
assert.equal(new Set(storageSections.map(section => section.id)).size, storageSections.length, "storage section ids are unique");
for (const section of storageSections) {
  for (const paragraph of section.paragraphs) {
    const bullets = typeof paragraph === "string" ? [paragraph] : [paragraph.text, ...(paragraph.bullets ?? [])];
    for (const bullet of bullets) {
      assert.match(bullet, /^\*\*[^*]+\*\*/, "every storage bullet starts with a bold term");
      assert.doesNotMatch(bullet, /\b(course|workshop|instructor)\b/i, "storage bullets avoid excluded terms");
    }
  }
}
const storageCode = storageSections.flatMap(section => section.paragraphs)
  .flatMap(paragraph => paragraph.block?.command.startsWith("export async") ? [paragraph.block.command] : []);
const storedValues = new Map();
const storageUtilities = runInNewContext(`${stripTypeScriptTypes(storageCode.join("\n")).replace(/^export /gm, "")}\n({ saveToStorage, getFromStorage });`, {
  AsyncStorage: {
    async setItem(key, value) {
      if (key === "write-error") throw new Error("Storage unavailable");
      storedValues.set(key, value);
    },
    async getItem(key) {
      if (key === "read-error") throw new Error("Storage unavailable");
      return storedValues.get(key) ?? null;
    },
  },
});
await storageUtilities.saveToStorage("shopping-list", exampleList);
assert.equal(storedValues.get("shopping-list"), JSON.stringify(exampleList), "the saving example stores a JSON string");
assert.deepEqual(JSON.parse(JSON.stringify(await storageUtilities.getFromStorage("shopping-list"))), exampleList, "the reading example restores items and completion status");
storedValues.set("invalid-json", "{");
for (const key of ["missing", "invalid-json", "read-error"]) {
  assert.equal(await storageUtilities.getFromStorage(key), null, `${key} returns null`);
}
await assert.doesNotReject(() => storageUtilities.saveToStorage("write-error", exampleList), "the saving example catches storage errors");

const hapticsSections = reactNativeHapticsSections;
assert.equal(new Set(hapticsSections.map(section => section.id)).size, hapticsSections.length, "haptics section ids are unique");
const hapticsReview = hapticsSections.at(-1);
assert.equal(hapticsReview.id, "review-questions", "haptics review questions are the final section");
assert.equal(hapticsReview.heading, "Review questions");
assert.equal(hapticsReview.blocks.length, 5, "haptics has five supplied questions");
assert.equal(new Set(hapticsReview.blocks.map(block => block.title)).size, 5, "haptics questions are unique");
for (const block of hapticsReview.blocks) {
  assert.equal(block.type, "details", "each haptics question is expandable");
  assert.ok(block.paragraphs.every(bullet => /^\*\*[^*]+\*\*/.test(bullet)), "every haptics answer bullet starts with a bold term");
}
for (const section of hapticsSections) {
  for (const paragraph of section.paragraphs) {
    const bullets = typeof paragraph === "string" ? [paragraph] : [paragraph.text, ...(paragraph.bullets ?? [])];
    for (const bullet of bullets) {
      assert.match(bullet, /^\*\*[^*]+\*\*/, "every haptics bullet starts with a bold term");
      assert.doesNotMatch(bullet, /\b(course|workshop|instructor)\b/i, "haptics bullets avoid excluded terms");
    }
  }
}
const hapticsToggleCode = hapticsSections.find(section => section.id === "previous-completion-state")
  .paragraphs.find(paragraph => paragraph.block).block.command;
for (const [item, expected] of [[{}, "success"], [{ completedAtTimestamp: 123 }, "medium"]]) {
  const calls = [];
  runInNewContext(hapticsToggleCode, {
    item,
    Haptics: {
      ImpactFeedbackStyle: { Medium: "medium" },
      NotificationFeedbackType: { Success: "success" },
      impactAsync: style => calls.push(["impact", style]),
      notificationAsync: type => calls.push(["notification", type]),
    },
  });
  assert.deepEqual(calls, [[expected === "medium" ? "impact" : "notification", expected]], "the previous completion state selects one feedback preset");
}

const notificationSections = reactNativeNotificationPermissionsSections;
assert.equal(new Set(notificationSections.map(section => section.id)).size, notificationSections.length, "notification permission section ids are unique");
for (const section of notificationSections) {
  for (const paragraph of section.paragraphs) {
    const bullets = typeof paragraph === "string" ? [paragraph] : [paragraph.text, ...(paragraph.bullets ?? [])];
    for (const bullet of bullets) {
      assert.match(bullet, /^\*\*[^*]+\*\*/, "every notification permission bullet starts with a bold term");
      assert.doesNotMatch(bullet, /\b(course|workshop|instructor)\b/i, "notification permission bullets avoid excluded terms");
    }
  }
}

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
  const inputArticle = await page("/articles/react-native-text-input-shopping-list");
  const listArticle = await page("/articles/react-native-scrollview-flatlist");
  const storageArticle = await page("/articles/react-native-async-storage");
  const hapticsArticle = await page("/articles/react-native-haptics");
  const notificationArticle = await page("/articles/react-native-notification-permissions");
  for (const section of notificationSections) {
    assert.ok(notificationArticle.includes(`<section id="${section.id}">`), `the notification permission article renders ${section.id}`);
  }
  for (const section of hapticsSections) {
    assert.ok(hapticsArticle.includes(`<section id="${section.id}">`), `the haptics article renders ${section.id}`);
  }
  assert.equal(hapticsArticle.match(/>Copy<\/button>/g)?.length, 4, "every haptics example has a copy button");
  const renderedHapticsReview = hapticsArticle.match(/<section id="review-questions">([\s\S]*?)<\/section>/)?.[1];
  assert.equal(renderedHapticsReview?.match(/<details class="learning-details"><summary>/g)?.length, 5, "all five haptics answers render closed by default");
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
  const schedulingArticle = await page("/articles/react-native-scheduling-notifications");
  assert.match(schedulingArticle, /Scheduling notifications and protecting API keys/);
  assert.match(schedulingArticle, /Notifications\.scheduleNotificationAsync/);
  assert.match(schedulingArticle, /<section id="server-held-api-keys">/);
  const schedulingReview = schedulingArticle.match(/<section id="review-questions">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(schedulingReview, "the scheduling review section renders");
  assert.equal(schedulingArticle.match(/<section id="review-questions">/g)?.length, 1, "the scheduling article has one review section");
  assert.equal(schedulingReview.match(/<details class="learning-details"><summary>/g)?.length, 4, "four distinct scheduling questions render closed by default");
  assert.doesNotMatch(schedulingReview, /svgClick|paste here/, "pasted interface artifacts are removed");
  assert.match(course, /href="\/articles\/react-native-scheduling-notifications"/);
  assert.match(sitemap, /\/articles\/react-native-scheduling-notifications/);
  assert.match(course, /href="\/articles\/react-native-haptics"/);
  assert.match(sitemap, /\/articles\/react-native-haptics/);
  assert.match(course, /href="\/articles\/react-native-notification-permissions"/);
  assert.match(sitemap, /\/articles\/react-native-notification-permissions/);

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
  assert.match(inputArticle, /TextInput and component state/);
  assert.match(inputArticle, /onChangeText=\{setValue\}/);
  assert.match(inputArticle, /onSubmitEditing=\{handleSubmit\}/);
  assert.match(inputArticle, /same millisecond/);
  assert.equal(inputArticle.match(/>Copy<\/button>/g)?.length, 12, "every TextInput example has a copy button");
  for (const section of listSections) {
    assert.ok(listArticle.includes(`<section id="${section.id}">`), `the scrollable list article renders ${section.id}`);
  }
  assert.match(listArticle, /ListHeaderComponent=\{&lt;TextInput \/&gt;\}/);
  assert.match(listArticle, /remounting on each value change/);
  assert.equal(listArticle.match(/>Copy<\/button>/g)?.length, 9, "every scrollable list example has a copy button");
  for (const section of storageSections) {
    assert.ok(storageArticle.includes(`<section id="${section.id}">`), `the storage article renders ${section.id}`);
  }
  assert.match(storageArticle, /npx expo install @react-native-async-storage\/async-storage/);
  assert.equal(storageArticle.match(/>Copy<\/button>/g)?.length, 7, "every storage example has a copy button");
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
  assert.match(course, /href="\/articles\/react-native-text-input-shopping-list"/);
  assert.match(course, /href="\/articles\/react-native-scrollview-flatlist"/);
  assert.match(course, /href="\/articles\/react-native-async-storage"/);
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
  assert.match(sitemap, /\/articles\/react-native-text-input-shopping-list/);
  assert.match(sitemap, /\/articles\/react-native-scrollview-flatlist/);
  assert.match(sitemap, /\/articles\/react-native-async-storage/);
}

console.log("React Native project setup, Expo Go, framework, linting, component, TextInput, scrollable list, storage, haptics, and notification permission lessons pass.");
