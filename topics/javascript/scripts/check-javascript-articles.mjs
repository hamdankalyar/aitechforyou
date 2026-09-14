// Run: node topics/javascript/scripts/check-javascript-articles.mjs [local base URL]
import assert from "node:assert/strict";
import { createContext, runInContext } from "node:vm";
import { variablesExamples } from "../content/javascript-variables-lab.ts";
import { javascriptIntroductionSections } from "../content/javascript-introduction-article.ts";
import { javascriptConsoleLogSections } from "../content/javascript-console-log-article.ts";
import { javascriptDeclarationsSections } from "../content/javascript-declarations-article.ts";
import { javascriptPrimitivesSections } from "../content/javascript-primitives-article.ts";
import { javascriptStringsSections } from "../content/javascript-strings-article.ts";
import { javascriptSymbolSections } from "../content/javascript-symbol-article.ts";
import { javascriptOperatorPrecedenceSections } from "../content/javascript-operator-precedence-article.ts";
import { javascriptEqualityOperatorsSections } from "../content/javascript-equality-operators-article.ts";
import { javascriptConditionsTernarySections } from "../content/javascript-conditions-ternary-article.ts";
import { javascriptObjectsSections } from "../content/javascript-objects-article.ts";
import { javascriptArraysSections } from "../content/javascript-arrays-article.ts";
import { javascriptImmutableMutableSections } from "../content/javascript-immutable-vs-mutable-article.ts";
import { javascriptFunctionsSections } from "../content/javascript-functions-article.ts";

const articles = {
  "javascript-introduction": javascriptIntroductionSections,
  "javascript-console-log": javascriptConsoleLogSections,
  "javascript-var-let-const": javascriptDeclarationsSections,
  "javascript-primitive-types": javascriptPrimitivesSections,
  "javascript-strings": javascriptStringsSections,
  "javascript-symbol": javascriptSymbolSections,
  "javascript-operator-precedence": javascriptOperatorPrecedenceSections,
  "javascript-equality-operators": javascriptEqualityOperatorsSections,
  "javascript-conditions-ternary": javascriptConditionsTernarySections,
  "javascript-objects": javascriptObjectsSections,
  "javascript-arrays": javascriptArraysSections,
  "javascript-immutable-vs-mutable": javascriptImmutableMutableSections,
  "javascript-functions": javascriptFunctionsSections,
};
const allSections = Object.values(articles).flat();

// Execute only the trusted examples authored in this repository.
function execute(code) {
  const output = [];
  const context = createContext({ console: { log: (...values) => output.push(values.map(String).join(" ")) } });
  let error = null;
  try { runInContext(code, context, { timeout: 1000 }); } catch (caught) { error = caught.name; }
  return { context, output, error };
}
for (const states of Object.values(variablesExamples)) {
  for (const state of states) {
    const result = execute(state.code);
    assert.deepEqual(result.output, state.output, state.title);
    assert.equal(result.error, state.error, state.title);
    assert.equal(runInContext("viewerName", result.context), state.value, state.title);
    assert.equal(runInContext("typeof viewerName", result.context), "string");
  }
}
// Expected console output per article and section id. `error` names an intended thrown error.
const expected = {
  "javascript-functions": {
    "declare-and-call": { examples: [{ output: ["Hello!"] }] },
    "parameters-and-arguments": { examples: [{ output: ["5", "NaN", "5"] }] },
    "parameter-names": { examples: [
      { output: ["8"], error: "ReferenceError" },
    ] },
    "return-values": { examples: [{ output: ["4"] }, { output: ["Hi, Marc", "undefined"] }] },
    "function-expression": { examples: [{ output: ["Hello, Ali!"] }] },
    "quick-check": { output: ["9"] },
  },
  "javascript-immutable-vs-mutable": {
    "primitive-values": { examples: [
      { output: ["hello"] },
      { output: ["Halina", "Halina"] },
    ] },
    "mutable-items": { examples: [
      { output: ["Ali"] },
      { output: ["1,5,3"] },
      { output: ["1,2,3,4,5,6", "1,2,3,4"] },
    ] },
    "reassignment": { examples: [{ output: ["world"] }] },
    "shared-reference": { examples: [{ output: ["Ha", "Ha"] }] },
    "variable-reassignment": { examples: [
      { output: ["3", "1,2"] },
      { output: ["hello"], error: "TypeError" },
    ] },
    "const-reference-types": { examples: [{ output: ["10,2,3,4,5"], error: "TypeError" }] },
  },
  "javascript-objects": {
    "what-an-object-is": { examples: [
      { output: ["[object Object]"] },
      { output: ["[object Object]"] },
      { output: ["JavaScript", "1995"] },
      { output: ["object", "true"] },
    ] },
    "read-and-use-properties": { examples: [
      { output: ["JavaScript"] },
      { output: ["1995", "JavaScript"] },
      { output: ["true", "31"] },
      { output: ["undefined"] },
    ] },
    "change-properties": { examples: [
      { output: ["Sara"] },
    ] },
    "add-properties": { examples: [
      { output: ["20"] },
    ] },
    "delete-properties": { examples: [
      { output: ["undefined"] },
    ] },
    "freeze-properties": { examples: [
      { output: ["Sara"], error: "TypeError" },
    ] },
    "methods-and-this": { examples: [
      { output: ["Woof"] },
      { output: ["Hi, my name is Anjana"] },
    ] },
    "nested-values": { examples: [
      { output: ["tiramisu"] },
      { output: ["Spice", "Baby"] },
    ] },
    "built-in-objects": { examples: [
      { output: ["3.141592653589793", "5"] },
      { output: ["Objects"], browserOnly: true },
      { output: ["5", "HELLO"] },
    ] },
    "quick-check": { examples: [{ output: ["Dune 500"] }] },
  },
  "javascript-arrays": {
    "what-an-array-is": { output: ["", "pop,6,false", "echo,echo,echo"] },
    "length-and-indexes": { output: ["3", "plethora", "array", "undefined"] },
    "find-an-item": { output: ["2", "-1", "true", "false"] },
    "change-an-item": { output: ["variety"], error: "TypeError" },
    "add-and-remove-items": { output: ["plethora,variety,multitude", "cornucopia"] },
    "useful-array-methods": { output: ["a,b,c,d", "lions & tigers & bears oh my!", "1,2,3,4,5,6"] },
    "quick-check": { output: ["10,20,40", "30"] },
  },
  "javascript-conditions-ternary": {
    "if-and-else": { output: ["Passed"] },
    "truthy-and-falsy": { output: ["2 runs", "3 runs"] },
    "logical-and": { output: ["false", "0", "Welcome"] },
    "logical-or": { output: ["true", "Guest"] },
    "logical-not": { output: ["true", "true", "false"] },
    "ternary": { output: ["Passed"] },
    "try-it-yourself": { output: ["true", "Show lesson"] },
  },
  "javascript-operator-precedence": {
    "which-calculation-first": { output: ["6", "7", "6"] },
    "same-priority": { output: ["8", "2", "9", "5"] },
    "worked-example": { output: ["14", "14", "14", "14"] },
    "use-parentheses": { output: ["14", "42", "60"] },
    "try-it-yourself": { output: ["2", "18", "8"] },
  },
  "javascript-equality-operators": {
    "loose-equality": { output: ["true", "false", "true"] },
    "strict-equality": { output: ["true", "false", "true", "false"] },
    "loose-inequality": { output: ["false", "true", "false"] },
    "strict-inequality": { output: ["false", "true", "true"] },
    "surprising-comparisons": { output: ["true", "false", "true", "false", "false", "false", "true", "NaN", "false", "true"] },
    "try-it-yourself": { output: ["true", "false", "false", "true"] },
  },
  "javascript-introduction": {
    "your-first-line": { output: ["Hello"] },
    "a-program-is-a-list": { output: ["First", "Second", "Third"] },
  },
  "javascript-console-log": {
    "what-console-log-does": { output: ["Hi"] },
    "print-text": { output: ["Welcome to JavaScript", "Single quotes work too"] },
    "print-numbers": { output: ["42", "5", "2 + 3"] },
    "print-several-things": { output: ["Age: 20", "Sum: 5 done"] },
    "comments": { output: ["Hello"] },
    "mistake-missing-quote": { output: [], error: "SyntaxError" },
    "mistake-missing-parenthesis": { output: [], error: "SyntaxError" },
    "mistake-misspelled-name": { output: [], error: "ReferenceError" },
    "try-it-yourself": { output: ["Ali", "20", "Ali is 20"] },
  },
  "javascript-var-let-const": {
    "what-a-variable-is": { output: ["20"] },
    "meet-let": { output: ["20", "21"] },
    "meet-const": { output: ["My notebook", "My notebook"] },
    "meet-var": { output: ["1", "2"] },
    "where-to-use-which": { output: ["My notebook 4 15"] },
    "difference-changing": { output: ["let: 2", "var: 2"], error: "TypeError" },
    "difference-redeclaring": { output: ["2"] },
    "difference-braces": { output: ["still here", "undefined"] },
    "difference-before-its-line": { output: ["undefined", "now it has a value"] },
    "quick-check": { output: [], error: "TypeError" },
  },
  "javascript-primitive-types": {
    "every-value-has-a-type": { output: ["string", "number", "boolean"] },
    "string-number-boolean": { output: ["string", "number", "boolean", "50", "2525"] },
    "undefined-and-null": { output: ["undefined", "undefined", "null", "object"] },
    "bigint-and-symbol": { output: ["bigint", "symbol"] },
    "quick-check": { output: ["string"] },
  },
  "javascript-strings": {
    "what-a-string-is": { output: ["Ali", "false"] },
    "length-and-letters": { output: ["3", "A", "l", "5"] },
    "find-text": { output: ["1", "-1", "true", "false", "true", "3"] },
    "join-strings": { output: ["ALOHA!", "HelloAli", "Hello Ali"] },
    "change-case": { output: ["SARA", "Sara", "SARA", "aloha"] },
    "split-into-letters": { output: ["A,l,i"] },
    "quick-check": { output: ["Lahore"] },
  },
  "javascript-symbol": {
    "what-a-symbol-is": { output: ["Symbol(id)", "symbol"] },
    "text-inside-symbol-is-optional": { output: ["Symbol(id)", "id", "Symbol()", "Symbol()", "undefined"] },
    "every-symbol-is-unique": { output: ["false", "false", "Symbol() Symbol(id) Symbol(user metadata)"] },
    "what-the-description-does": { output: ["123", "undefined", "undefined"] },
    "why-not-just-strings": { output: ["Analytics information"] },
    "symbols-remove-that-problem": { output: ["Database information", "Analytics information", "false"] },
    "quick-check": { output: ["false"] },
  },
};
const expectedDetails = {
  "Try the same thing with let": [{ output: [], error: "SyntaxError" }, { output: [], error: "ReferenceError" }],
};
const seenDetails = {};
for (const [articleSlug, sections] of Object.entries(articles)) {
  assert.equal(new Set(sections.map(section => section.id)).size, sections.length, articleSlug);
  for (const section of sections) {
    if (section.code) {
      const want = expected[articleSlug]?.[section.id];
      assert.ok(want, `missing expectation for ${articleSlug} ${section.id}`);
      if (want.browserOnly) {
        console.log(`Browser check required: /articles/${articleSlug}#${section.id}. Expected console: ${JSON.stringify(want.output)}`);
      } else {
        const result = execute(section.code);
        assert.equal(result.error, want.error ?? null, `${articleSlug} ${section.id}`);
        assert.deepEqual(result.output, want.output, `${articleSlug} ${section.id}`);
      }
    }
    const paragraphCodes = section.paragraphs.flatMap(paragraph => typeof paragraph === "string" || !paragraph.code ? [] : [paragraph.code]);
    for (const [index, code] of paragraphCodes.entries()) {
      const want = expected[articleSlug]?.[section.id]?.examples?.[index];
      assert.ok(want, `missing expectation for ${articleSlug} ${section.id} example ${index + 1}`);
      if (want.browserOnly) {
        console.log(`Browser check required: /articles/${articleSlug}#${section.id} example ${index + 1}. Expected console: ${JSON.stringify(want.output)}`);
      } else {
        const result = execute(code);
        assert.equal(result.error, want.error ?? null, `${articleSlug} ${section.id} example ${index + 1}`);
        assert.deepEqual(result.output, want.output, `${articleSlug} ${section.id} example ${index + 1}`);
      }
    }
    if (paragraphCodes.length) assert.equal(expected[articleSlug]?.[section.id]?.examples?.length, paragraphCodes.length, `${articleSlug} ${section.id} example count`);
    for (const block of section.blocks ?? []) {
      if (block.type === "details" && block.code) {
        const wants = expectedDetails[block.title];
        assert.ok(wants, `missing expectation for ${block.title}`);
        const want = wants[seenDetails[block.title] ?? 0];
        seenDetails[block.title] = (seenDetails[block.title] ?? 0) + 1;
        assert.ok(want, `missing expectation for repeat of ${block.title}`);
        const result = execute(block.code);
        assert.equal(result.error, want.error ?? null, block.title);
        assert.deepEqual(result.output, want.output, block.title);
      }
      if (block.type === "quiz") assert.equal(block.answers.filter(answer => answer.correct).length, 1);
    }
  }
}
const typeTable = allSections.flatMap(section => section.blocks ?? []).find(block => block.type === "table" && block.caption === "The seven primitive types");
assert.deepEqual(typeTable.rows.map(row => row[0]), ["string", "number", "boolean", "undefined", "null", "bigint", "symbol"]);
assert.equal(typeof null, "object");
assert.equal(typeof BigInt("12345678901234567890"), "bigint");
console.log(`All five interaction states and every Node-compatible snippet across the ${Object.keys(articles).length} JavaScript lessons match JavaScript execution.`);

if (process.argv[2]) {
  const base = process.argv[2];
  const slug = "javascript-introduction";
  async function page(path) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, path);
    return response.text();
  }
  for (const [articleSlug, sections] of Object.entries(articles)) {
    const guide = await page(`/articles/${articleSlug}`);
    assert.match(guide, /topic-javascript/);
    assert.match(guide, /variables-hero-art/);
    assert.match(guide, /code-runner-editor/);
    for (const section of sections) assert.ok(guide.includes(`id="${section.id}"`), `${articleSlug} ${section.id}`);
    assert.equal(new Set(sections.map(section => section.id)).size, sections.length, articleSlug);
  }
  const slugs = Object.keys(articles);
  const referenceLesson = await page("/articles/javascript-immutable-vs-mutable");
  assert.equal((referenceLesson.match(/class="reference-memory" role="img"/g) ?? []).length, 1, "the supplied object reference diagram renders");
  assert.equal((referenceLesson.match(/class="primitive-memory" role="img"/g) ?? []).length, 1, "the supplied primitive value diagram renders");
  for (const label of ["staff2", "staff", "Strengthened", "43", "reading", "swimming", "student2", "student1", "Halina"]) {
    assert.ok(referenceLesson.includes(label), `source diagram label: ${label}`);
  }
  for (let index = 0; index < slugs.length - 1; index += 1) {
    assert.match(await page(`/articles/${slugs[index]}`), new RegExp(`href="/articles/${slugs[index + 1]}"`), `${slugs[index]} links to the next lesson`);
  }
  assert.match(await page(`/articles/${slug}`), /What JavaScript is/);
  assert.match(await page("/articles/javascript-var-let-const"), /Read both examples without interacting/);
  assert.match(await page(`/articles/${Object.keys(articles).at(-1)}`), /In preparation/);
  assert.match(await page("/articles/javascript-operator-precedence"), /<li><strong>An operator<\/strong>[^<]+<ul><li><strong>\+<\/strong> adds\.<\/li>/, "operator signs render as nested list items");
  assert.match(await page("/articles/javascript-equality-operators"), /<li><strong>A comparison operator<\/strong>[^<]+<ul><li><strong>Operands<\/strong>/, "comparison details render as nested list items");
  const home = await page("/");
  assert.ok(home.includes(`/articles/${slug}`));
  assert.match(home, /href="\/learn\/git"/);
  assert.doesNotMatch(home, />Web development</);
  for (const query of ["JavaScript", "javascript", "JAVASCRIPT", "JavaScript&topic=Git"]) {
    const archive = await page(`/articles?topic=${query}`);
    assert.ok(archive.includes(`/articles/${slug}`));
    assert.match(archive, /aria-label="JavaScript sections"/);
    assert.doesNotMatch(archive, /href="\/articles\/git-is-a-time-machine"/);
  }
  assert.match(await page("/articles?topic=unknown"), /No articles match this course yet/);
  for (const query of ["Web", "web", "WEB"]) {
    const response = await fetch(new URL(`/articles?topic=${query}`, base), { redirect: "manual" });
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "/articles?topic=JavaScript");
  }
  assert.equal((await fetch(new URL("/articles/internet-request-journey", base))).status, 404);
  assert.equal((await fetch(new URL("/articles/javascript-variables-and-values", base))).status, 404);
  const removedInterviewSlug = "javascript-equality-truthiness-interview-questions";
  assert.equal((await fetch(new URL(`/articles/${removedInterviewSlug}`, base))).status, 404);
  const oldTopics = await fetch(new URL("/topics", base), { redirect: "manual" });
  assert.equal(oldTopics.status, 308);
  assert.equal(oldTopics.headers.get("location"), "/courses");
  const courses = await page("/courses");
  assert.match(courses, /Choose your course/);
  assert.match(courses, /href="\/courses\/javascript"/);
  assert.match(courses, new RegExp(`${slugs.length}<!-- --> <!-- -->articles`));
  assert.doesNotMatch(home + courses, />Topics<|href="\/topics"/);
  const course = await page("/courses/javascript");
  assert.doesNotMatch(course, /Lesson [0-9]+:|<div class="card-topline"><span>JavaScript<\/span><span>/);
  const groupedSlugs = [];
  for (const category of ["Basic", "Advanced", "Functions", "Interviews", "Performance", "OOP"]) {
    const id = category.toLowerCase();
    assert.ok(course.includes(`href="#${id}"`));
    const section = course.match(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)</section>`))?.[1];
    assert.ok(section, `${category} section exists`);
    const listed = [...section.matchAll(/<h3><a href="\/articles\/([^"]+)"/g)].map(match => match[1]);
    const expected = category === "Basic" ? slugs.filter(slug => !["javascript-symbol", "javascript-functions"].includes(slug)) : category === "Advanced" ? ["javascript-symbol"] : category === "Functions" ? ["javascript-functions"] : [];
    assert.deepEqual(listed, expected, `${category} articles are separate and in lesson order`);
    if (!listed.length) assert.match(section, /No articles yet/);
    for (const articleSlug of listed) {
      const articlePage = await page(`/articles/${articleSlug}`);
      assert.ok(articlePage.includes(`href="/courses/javascript#${id}"`));
      assert.doesNotMatch(articlePage, /Lesson [0-9]+:/);
    }
    groupedSlugs.push(...listed);
  }
  assert.deepEqual(groupedSlugs.sort(), [...slugs].sort(), "every JavaScript article appears exactly once");
  const articleNavigation = await page("/articles/javascript-operator-precedence");
  assert.match(articleNavigation, /aria-label="JavaScript course navigation"/);
  assert.match(articleNavigation, /class="series-nav-card series-previous" href="\/articles\/javascript-symbol"/);
  assert.match(articleNavigation, /class="series-nav-card series-course" href="\/courses\/javascript#basic"/);
  assert.match(articleNavigation, /class="series-nav-card series-next" href="\/articles\/javascript-equality-operators"/);
  const sitemap = await page("/sitemap.xml");
  for (const html of [home, course, sitemap, await page("/articles?topic=JavaScript"), await page("/articles/javascript-conditions-ternary")]) {
    assert.ok(!html.includes(removedInterviewSlug), "removed interview article is not linked or indexed");
  }
  assert.ok(sitemap.includes(`/articles/${slug}`));
  assert.ok(!sitemap.includes("internet-request-journey"));
  assert.ok(sitemap.includes("/courses/javascript"));
  assert.ok(!sitemap.includes("/topics"));
  assert.match(await page("/articles/git-is-a-time-machine"), /href="\/learn\/git\?view=guides"/);
  assert.match(await page("/articles/generative-ai-vs-agentic-ai"), /topic-ai/);
  console.log("Courses, JavaScript categories, case handling, legacy URLs, series links, and sitemap pass.");
}
