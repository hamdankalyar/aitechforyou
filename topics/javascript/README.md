# JavaScript lessons: rules

Read this before writing or editing any JavaScript article. Each article teaches one thing.

The course lives at `/courses/javascript`, with separate sections for Basic, Advanced, Functions, Interviews, Performance, and OOP. Set each JavaScript article's `category` in `lib/articles.ts` to one of these names. The first five articles are Basic; Symbol is Advanced. Keep the reading order in `series.order`, but do not show numbers in article titles or cards. Sections without published articles show an empty state.

## The course

| Slug | Teaches |
|---|---|
| `javascript-introduction` | What JavaScript is, first line, how to read the code boxes |
| `javascript-console-log` | Printing text, numbers, several values, comments, first error |
| `javascript-var-let-const` | Variables and the three keywords |
| `javascript-primitive-types` | typeof and the seven primitives |
| `javascript-strings` | Length, index, search, join, change case, immutability |
| `javascript-symbol` | Unique values and symbol keys |
| `javascript-operator-precedence` | Arithmetic priority, left-to-right grouping, parentheses |
| `javascript-equality-operators` | Loose and strict equality and inequality, type coercion |
| `javascript-conditions-ternary` | Conditions, AND/OR/NOT, and ternary values |
| `javascript-objects` | Object literals, properties, methods, this, and nested values |
| `javascript-arrays` | Lists, indexes, searches, changes, and common array methods |
| `javascript-immutable-vs-mutable` | Primitive immutability, shared references, reassignment, const, and immutable updates |
| `javascript-functions` | Declarations, calls, parameters, arguments, local names, and return values |

New articles continue the reading order (objects, arrays, functions, comparisons, error handling). Set `series.order` to the next value, and use only the topic as the article title.

## Beginner first

- Assume the reader has never written code. Explain every word before using it: method, object, array, keyword.
- One new idea per section. One lesson per topic. Never combine two topics into one article.
- Use a concept only after its lesson. If a snippet must use something from a later lesson (typeof in lesson 3, arrays in lesson 5), say in one sentence that it is covered later.
- Plain words. "Change" not "mutate", "list" not "array" until arrays are taught, "text" alongside "string" the first time.
- Every lesson ends with a Quick check quiz or a Run it yourself box, then a Remember recap.

## Where things go

- Content: `topics/javascript/content/<slug>-article.ts` exporting `ArticleSection[]`. Register it in `lib/articles.ts` with `topic: "JavaScript"` and `accent: "yellow"`.
- Interactive components: `topics/javascript/components/`. Shared blocks (table, quiz, details, callout, recap) already exist in `components/articles/article-block.tsx`; reuse them.
- Styles: `topics/javascript/javascript-learning.css`, scoped under `.topic-javascript`.
- Verification: `topics/javascript/scripts/check-javascript-articles.mjs` covers every JavaScript article. Add the new sections file to its `articles` map and add expected output for each snippet. It executes every snippet with `node:vm` and asserts the exact console output and any intended error.
- Source notes: `references/javascript/`. Ground the content in the author's notes; add explanation only where the notes leave a gap.
- Browser-only snippets: mark their expected output with `browserOnly: true` in the check script and verify their console output with the article's Run button in a real browser. The Node checker reports these separately because it has no document.

## Code

- Every `code` field is a live editor. The page renders it with `CodeRunner` (Run, Reset, console). Never write a static code block on a JavaScript article.
- Each snippet must run on its own from a fresh sandbox. No snippet depends on a variable declared in an earlier snippet.
- Put the expected result in a trailing comment on the line that prints it: `console.log(score); // 10`.
- Snippets may end in an intentional error (`TypeError`, `ReferenceError`) to show real behaviour. Say so in the comment and in the check script.
- Keep snippets short: 3 to 10 lines. One idea per snippet.
- Only `console.log` output counts. Do not rely on return values that the console would show.

## Scope

- 4 to 8 short sections per lesson, 3 to 5 minutes of reading.

## Coverage

- Do not leave a concept half taught. If the lesson is about `var`, `let`, and `const`, each gets its own section with a runnable example, plus a comparison table.
- For each keyword or feature, show: what it does, what it forbids, what error it throws, and one surprise (scope leak, hoisting, immutability).
- End with a "Remember" recap of 3 to 4 lines. Add a "Run it yourself" section when the article introduces new syntax.
- Add at least one quiz. Exactly one answer is correct; every wrong answer gets an explanation.

## Bullets

- Learning articles are bullet-first: `paragraphs` renders as a list, one idea per bullet.
- For related examples or steps, use `{ text: "**Main point.**", bullets: ["**Detail.** ..."] }` in `paragraphs`. Keep sub-bullets to one level and one idea per line.
- To place a runnable example directly under one teaching point, use `{ text: "**Main point.** ...", code: "..." }` in `paragraphs`.
- Bold the thing the bullet is about, at the start: `"**let** is the keyword that declares..."`, `"**var is hoisted.** The name exists..."`. Only bold is supported (`**text**`); nothing else is parsed.
- Every bullet adds a fact. Cut bullets that restate the heading or the previous bullet.

## Prose (humanizer)

- No arrows (`→`), em dashes, or en dashes in prose. Use a period, comma, colon, or parentheses. Table cells too: `"No (TypeError)"`, not `"No — TypeError"`.
- No "not X but Y" unless the reader really holds belief X. Say the point directly.
- No staged openers ("Let's dive in", "Here's the thing") and no one-line closers that repeat the point.
- No triads by habit. Three items only when there are three things.
- Straight quotes in prose. Curly apostrophes inside words (`variable’s`) are fine.
- Short sentences. Split semicolon-joined clauses.
- Plain words: is, has, means. Avoid "crucial", "key", "robust", "leverage", "showcase".

## Before finishing

1. `npm run typecheck`
2. `node topics/javascript/scripts/check-javascript-articles.mjs http://localhost:3000`
3. Open the page, press Run on every box, confirm output matches the comments.
