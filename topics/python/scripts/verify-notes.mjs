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
  let expected = note.blocks.flatMap(block => block.table ? block.table.flat() : [block.text]).join("\n");
  // Preserve the source snapshot while allowing the corrected tuple heading.
  if (article.slug === "python-tuples") expected = expected.replace("tuple (constant array/list)", "tuple (immutable sequence)");
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
      case "flashcards":
        assert.ok(["python-basic-setup", "python-libraries", "python-list", "python-list-comprehensions", "python-tuples", "python-sets"].includes(article.slug), "Only the updated Python lessons add flashcards");
        if (article.slug === "python-basic-setup") {
          assert.deepEqual(block.cards.map(card => card.question), ["What is a virtual environment?", "Why use a virtual environment?"], "Setup deck contains only the definition and benefits cards");
        } else if (article.slug === "python-libraries") {
          const libraries = ["ipykernel", "NumPy", "pandas", "Matplotlib", "Seaborn", "Flask", "memory_profiler", "Streamlit"];
          assert.deepEqual(block.cards.map(card => card.question), libraries.map(name => `What is ${name} used for?`), "One flashcard per library in lesson order");
        } else if (article.slug === "python-list-comprehensions") {
          assert.deepEqual(block.cards.map(card => card.question), ["What is a list comprehension?", "What is the syntax of a list comprehension?", "What is one example of a list comprehension?"], "Comprehension deck contains exactly the three requested cards");
          assert.equal(block.cards[1].answer, "[expression for item in collection]", "Syntax matches the lesson");
          assert.equal(block.cards[2].code, '[len(name) for name in ["Ali", "Sara"]]', "Example calculates name lengths");
        } else if (article.slug === "python-tuples") {
          assert.deepEqual(block.cards.map(card => card.question), ["What is a tuple?", "How do you create an empty tuple?", "What is the time complexity of searching a tuple?", "Does a tuple preserve order?", "Is a tuple mutable?", "Can a tuple be sorted in place?"], "Tuple deck mirrors the six list concepts");
          assert.equal(block.cards[1].answer, "() or tuple()", "Empty tuple creation stays concise");
        } else if (article.slug === "python-sets") {
          assert.deepEqual(block.cards.map(card => card.question), ["What is a set?", "How do you create an empty set?", "What is the time complexity of checking set membership?", "Does a set preserve insertion order?", "Is a set mutable?", "Can a set be sorted in place?", "What kind of items can a set contain?", "What does set union do?", "What does set intersection do?", "What does set difference do?"], "Set deck covers core properties and set operations");
          assert.equal(block.cards[1].answer, "set() ({} creates an empty dictionary).", "Empty sets are distinct from dictionaries");
        } else {
          assert.deepEqual(block.cards.map(card => card.question), ["What is a list?", "How do you create an empty list?", "What is the time complexity of searching a list?", "Does a list preserve order?", "Is a list mutable?", "Can a list be sorted in place?"], "List deck covers the six requested concepts");
          assert.match(block.cards[0].answer, /\(like an array in JavaScript\)/u, "List definition includes the JavaScript comparison");
          assert.equal(block.cards[1].answer, "[] or list()", "List creation stays concise");
        }
        assert.equal(new Set(block.cards.map(card => card.question)).size, block.cards.length, "Flashcard questions are unique");
        for (const card of block.cards) {
          assert.ok(card.question.trim() && card.answer.trim(), "Every flashcard has a question and answer");
          if (card.code && article.slug !== "python-list-comprehensions") assert.ok(codes.includes(card.code), "Flashcard commands match the lesson");
        }
        break;
      default:
        assert.fail(`${note.title}: unexpected extra block ${block.type}`);
    }
  }
  let sourceSections = article.sections;
  if (article.slug === "python-list-comprehensions") {
    assert.deepEqual(sourceSections[0], {
      heading: "Syntax",
      paragraphs: [
        { text: "", code: "[expression for item in collection]" },
        "**Expression** calculates the value to put in the new list.",
        "**Item** is the variable holding the current element.",
        "**Collection** supplies the elements to loop through."
      ]
    }, "List comprehension syntax and definitions precede the original notes");
    sourceSections = sourceSections.slice(1);
  }
  for (const section of sourceSections) {
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
  if (article.slug === "python-basic-setup") {
    // Basic Setup now explains virtual environments and corrects the original creation command.
    assert.deepEqual(article.sections.map(section => section.heading), ["Why use a virtual environment?", "Set up the environment", "Practice with flashcards"]);
    assert.equal(article.sections.flatMap(section => section.blocks ?? []).filter(block => block.type === "flashcards").length, 1, "Setup has one flashcard deck");
    assert.deepEqual(codes, ["python3 -m venv venv", "source venv/bin/activate", "python -m pip install -r requirements.txt"]);
    for (const section of article.sections) {
      for (const paragraph of section.paragraphs) {
        const points = typeof paragraph === "string" ? [paragraph] : [paragraph.text, ...(paragraph.bullets ?? [])];
        for (const point of points) assert.match(point, /^\*\*[^*]+\*\* /u, "Setup bullets start with a bold term");
      }
    }
  } else {
    assert.equal(normalize(rendered.join("\n")), normalize(expected), `${note.title}: original content, without additions or omissions`);
    for (const code of codes) assert.ok(codeLines(expected).includes(codeLines(code)), `${note.title}: original code lines and indentation`);
  }
  assert.deepEqual(tables.map(table => table.map(row => row.map(normalize))), note.blocks.filter(block => block.table).map(block => block.table.map(row => row.map(normalize))), `${note.title}: original table cells`);
  assert.equal(new Date(article.date).getTime(), new Date(note.date[0]).getTime(), `${note.title}: original date`);
  assert.equal(article.number, String(index + 1).padStart(2, "0"));
  assert.equal(article.topic, "Python");
  assert.equal(article.excerpt, "", `${note.title}: no added summary`);
  assert.equal(article.readTime, "", `${note.title}: no invented reading time`);
  assert.ok(!article.series && !article.sources && !article.shortLesson, `${note.title}: no extra lessons or sources`);
  assert.deepEqual(note.images, [], `${note.title}: source images accounted for`);
}

assert.deepEqual(articles.find(article => article.title === "OOP").sections, [], "Empty OOP page stays empty");
assert.equal(articleBySlug.get("python-libraries").sections.flatMap(section => section.blocks ?? []).filter(block => block.type === "flashcards").length, 1, "Libraries has one flashcard deck");
assert.equal(articleBySlug.get("python-list").sections.flatMap(section => section.blocks ?? []).filter(block => block.type === "flashcards").length, 1, "List has one flashcard deck");
assert.equal(articleBySlug.get("python-tuples").sections.flatMap(section => section.blocks ?? []).filter(block => block.type === "flashcards").length, 1, "Tuples has one flashcard deck");
assert.equal(articleBySlug.get("python-sets").sections.flatMap(section => section.blocks ?? []).filter(block => block.type === "flashcards").length, 1, "Sets has one flashcard deck");
assert.equal(articleBySlug.get("python-list-comprehensions").sections.flatMap(section => section.blocks ?? []).filter(block => block.type === "flashcards").length, 1, "List comprehensions has one flashcard deck");
console.log("All 29 Python pages verified, including flashcards, list comprehension syntax, and preserved source notes outside revised Basic Setup.");
