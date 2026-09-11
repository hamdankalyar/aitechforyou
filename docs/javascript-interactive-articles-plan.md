# JavaScript notes → website articles

Planning date: September 11, 2026.

**Status: planning complete; implementation has not started.** This document is the ongoing JavaScript roadmap. The first implementation delivery is the Web → JavaScript topic change together with article JS-01. Continue one article at a time, incorporating new reference notes as they arrive.

## 1. Intended result

Replace the website's **Web** topic with **JavaScript**, alongside Git and AI. Turn the author's notes into clear, practical articles with small interactive examples where they help explain behavior.

Working series title: **JavaScript, made visible.**

Audience: readers beginning JavaScript who want to understand what their code actually does. Explain the minimum syntax before using it; require no React, TypeScript, package installation, or framework knowledge in the learning material.

This is an expanding publication, not a fixed course that must be finished before publishing. The seven initial articles below cover the supplied notes; future articles enter through the intake process in section 8. Unwritten topics remain in this document rather than appearing as empty website pages.

This task produces the plan only. Article writing, website changes, and publishing are subsequent deliveries. The existing [Git plan](git-interactive-articles-plan.md) remains a separate roadmap; its current next guide is “Teach Git what to ignore.”

## 2. Reference audit and complete coverage

Current sources live in `references/javascript/` and `references/git/`. The Git plan still mentions an older Downloads location; use the repository's reference folder for subsequent work.

All seven JavaScript HTML files were read, including nested questions and inline comments. There are five substantive note pages and two navigation/index pages. There are no local JavaScript image assets in the current export. Export hierarchy does not determine article hierarchy: the page called “Variables” is primarily about primitive data types.

The measurement note links to a [CodePen example](https://codepen.io/hamdan-kalyar17/pen/PwWBEOq). Its contents could not be retrieved during planning. Inspect it during JS-07 if accessible; the local note is sufficient to plan that article, and publication must not depend on an external embed.

### Source ledger

Paths below are relative to `references/javascript/`. Preserve original export names and IDs so later exports can be compared reliably.

| ID | Exact source path | Destination and treatment |
| --- | --- | --- |
| S01 | `Javascript 3a474eaee48c80c6a980f961fbbb47b6.html` | Root index; informs navigation, not a standalone article |
| S02 | `Javascript/Variables 3c874eaee48c802da519de58967c2e1d.html` | JS-01 types/bindings; JS-02 strings; JS-03 missing values/coercion; JS-04 numbers/BigInt; Symbol introduction links to JS-05 |
| S03 | `Javascript/Variables/Text inside Symbol() is optional 3c874eaee48c806b99aaffb35e29e753.html` | JS-05: identity, descriptions, and retaining the original key |
| S04 | `Javascript/Variables/Questions 3c974eaee48c8049bc20f1e188bb5723.html` | JS-05: two libraries sharing an object, collisions, and why checking existing string names is insufficient |
| S05 | `Javascript/Error Handling 3c874eaee48c80028d4df031f1d75c8b.html` | JS-06: execution order, thrown errors, cleanup, and error properties |
| S06 | `Javascript/Things to know 3c874eaee48c80ba9e30c37b066c4d0e.html` | Browser API grouping; not a standalone “Things to know” article |
| S07 | `Javascript/Things to know/window getBoundingClientRect() 3a474eaee48c8021866ed2c6c9b1e0f2.html` | JS-07: element measurements and viewport coordinates; correct the exported title |

The author's inline reminders about immutability and studying the `null` examples belong in JS-01 and JS-03. Remove author timestamps, duplicated headings, export navigation, and comment markup from published prose while retaining those learning questions.

### Material that must be authored to connect the notes

- JS-01 needs a short introduction to running an example, declarations, assignment, and `console.log`; the notes do not provide a complete variables lesson.
- JS-04 needs the practical distinction between numeric measurement and large integer identifiers.
- JS-05 needs a compact object-and-property introduction before computed Symbol keys. Do not make readers wait for a future objects course.
- JS-06 needs enough block and execution-order context to follow the example. Promises and asynchronous error handling are later material.
- JS-07 needs a minimal HTML element, selecting it, and a definition of the viewport. DOM APIs are browser-provided capabilities, distinct from the language itself.

Record these as authored bridge material in delivery notes. Do not imply that missing fundamentals already exist in the reference export.

## 3. Replace Web with JavaScript

### What exists today

The site uses Next.js 16.3.4, React 19.3.0, and TypeScript. Articles are registered in `lib/articles.ts`; longer content is already separated into topic-specific files. There is no need to introduce a CMS or switch authoring formats for this work.

| Existing location | Current behavior | Planned change |
| --- | --- | --- |
| `lib/articles.ts` | Topic union and topic registry contain `Web`; one Web article exists | Replace the topic with `JavaScript`, retain the lime accent, and register completed JavaScript articles |
| `app/page.tsx` | Topic cards use the registry; ticker says “Web development” | Cards update from the registry; change the ticker label to “JavaScript” |
| `app/articles/page.tsx` | Filters hard-code Git/AI/Web; description mentions web development | Generate filter names from the existing topic registry, update metadata, and normalize filter matching and active state consistently |
| `app/topics/page.tsx` | Names and counts derive from article/topic data | Verify JavaScript link and published count; no new hub is needed |
| `app/articles/[slug]/page.tsx` | Shared article route, metadata, contents, exercise anchor, and series navigation | Reuse the route; provide suitable JavaScript hero treatment and correct series end behavior |
| `components/articles/article-block.tsx` | Tables, code-related blocks, details, quizzes, and recaps already exist | Reuse suitable blocks; add only the interaction required by the current article |
| `app/articles/article-learning.css` | Shared reading styles with some Git/AI-specific styling | Add scoped JavaScript accent/interaction rules only where needed |
| `app/sitemap.ts` | Article URLs derive from the article registry | Verify published JavaScript URLs appear and retired Web content disappears |

The header/footer contain no Web-specific navigation. Keep the existing Git “Start learning” destination and Git lesson hub intact. The homepage's latest section currently uses array positions, not date sorting: choose article placement deliberately and verify the first JavaScript article is discoverable without replacing the Git feature.

### Public names and URLs

- Topic label: **JavaScript**, with this capitalization everywhere.
- Topic description: **Values, behavior, and browser APIs explained through examples you can try.**
- Topic landing destination: `/articles?topic=JavaScript`.
- Article route: `/articles/<descriptive-slug>`, using the existing route.
- Internal topic class: `topic-javascript`, already derived by the article page from the topic name.
- Keep the lime topic color, existing fonts, paper/ink theme, article cards, and responsive reading layout.

Handle `/articles?topic=Web` as a legacy topic link and redirect it to `/articles?topic=JavaScript`. Normalize case first so old lowercase links behave consistently. Use the existing server page's query handling for this small case; no routing middleware or general redirect service is needed. Preserve awaited `searchParams`, following the installed framework docs. Verify the redirect reaches a 200 page without looping.

### Existing Web article: explicit retirement policy

`/articles/internet-request-journey` currently contains a short DNS/HTTP/rendering overview. It is not one of the supplied JavaScript notes and should not simply receive a JavaScript label.

Default implementation decision: retire it from the active article registry when the replacement launches. This removes its card, topic count, static article entry, and sitemap entry; the existing missing-article behavior returns 404 for its old URL. Preserve its content in repository history. Do not redirect this article URL to an unrelated JavaScript lesson. If retained browser-background content becomes a requirement later, restore and deliberately revise it as a separate editorial task.

Launch the topic change with JS-01 so JavaScript has real content from its first appearance. There is no need to ship an empty category while the first article is being written.

## 4. Initial article roadmap

IDs are stable editorial identifiers. Titles may improve before publication; published slugs should remain stable. Estimated reading lengths are targets, to be recalculated after writing. All entries are currently **planned**, not published.

| ID / sequence | Working title and proposed slug | Reader outcome | Notes / prerequisites | Focused example |
| --- | --- | --- | --- | --- |
| JS-01 / 1 | **A variable names a value** — `javascript-variables-and-values` | Distinguish a name, its value, and its type; understand reassignment versus changing a primitive | S02 plus beginner bridge; no prerequisites | Step through a named string value, reassignment with `let`, and a separate `const` example; show value/type/output |
| JS-02 / 2 | **Strings: find text without changing it** — `javascript-strings-and-search` | Predict indexing, search results, case sensitivity, and returned strings | S02; JS-01 | Change a text/search pair; compare `indexOf` with `includes`; show the original beside a case-converted result |
| JS-03 / 3 | **Missing values: null, undefined, and NaN** — `javascript-null-undefined-and-nan` | Distinguish missing-value conventions, strict comparison, and numeric conversion results | S02 and inline question; JS-01 | Select fixed expressions from the notes; predict and reveal value, type, and explanation |
| JS-04 / 4 | **Numbers and BigInt: when an integer stops being safe** — `javascript-number-and-bigint` | Recognize safe-integer limits and choose an integer representation intentionally | S02 plus authored examples; JS-01 | Compare fixed integer cases at the safe boundary using Number and BigInt; reveal a mixed-arithmetic error |
| JS-05 / 5 | **Why Symbols exist when strings already work** — `javascript-symbols-and-property-keys` | Explain key collisions, unique identities, and optional descriptions | S02–S04; JS-01 and an inline object/property primer | Two imaginary libraries write metadata using strings or separate Symbols; inspect which properties survive |
| JS-06 / 6 | **What happens when JavaScript throws an error?** — `javascript-try-catch-finally` | Trace `try`, `throw`, `catch`, and `finally`; read an error's name/message | S05; JS-01, with small syntax explanations | Step through the supplied example with/without a throw; output accumulates in execution order |
| JS-07 / 7 | **Where is this element in the viewport?** — `javascript-getboundingclientrect` | Read an element's rectangle and distinguish viewport from document coordinates | S06–S07; JS-01 plus an inline HTML/DOM primer | Measure a real element, scroll and resize, then compare labeled edges and dimensions |

### Article boundaries and completion evidence

**JS-01 — variables and values, 6–8 minutes.** Introduce `const`, `let`, literals, and `typeof` through one small example. Give a compact overview of the seven primitive types and briefly distinguish objects. Explain the naming/value distinction without promising a literal engine memory layout. Keep hoisting, scope chains, closures, and a full `var` comparison outside this first article. Done when readers can predict a reassignment and explain why an unchanged original string remains unchanged.

**JS-02 — strings, 6–8 minutes.** Cover every string operation in S02: indexing, `length`, `indexOf`, `includes`, `startsWith`, concatenation, lower/upper case, and `Array.from`. Group them by question rather than writing one micro-article per method. Keep Unicode caveats in an optional section and explain that indexes/length are UTF-16 code units; `Array.from` iterates code points, not necessarily complete visible characters. Verify start-position, missing-match, case, empty-search, and original-value cases.

**JS-03 — missing values, 6–8 minutes.** Explain each `null`/`undefined` expression in the source rather than copying an unexplained output table. Include `typeof null`, strict versus loose equality in the supplied comparison, `1 + null`, `1 + undefined`, and `Number.isNaN`. Keep the full coercion specification and equality matrix out of the main path. Verify each displayed result in the runtime.

**JS-04 — numbers, 5–7 minutes.** Begin with familiar whole/decimal numbers and introduce `Number.MAX_SAFE_INTEGER` through a concrete comparison. Show BigInt literals and valid arithmetic alongside one intentionally invalid mixed operation. If later accepting reader input, retain integer input as text until validation and conversion; do not round it through Number first. Verify boundary and mixed-operation examples. Defer financial arithmetic libraries and numeric-formatting surveys.

**JS-05 — Symbols, 7–9 minutes.** Preserve the author's question about choosing an unused string. Explain property access, separate Symbol identities with matching descriptions, omitted descriptions, and access using the original key. Include a short distinction for `Symbol.for` and explain that Symbol properties are not private secrets. Verify overwrite behavior, independent keys, same-description inequality, missing lookup, and shared-key behavior. Avoid an advanced tour of every well-known Symbol.

**JS-06 — errors, 6–8 minutes.** Keep “Starting…”, the throw, skipped “Finished”, catch output, and cleanup visible in the trace. Explain that throwing transfers control; `throw` can throw a value, while `new Error` constructs an Error object. Label stack output as illustrative rather than promising identical formatting. Note the boundary around later asynchronous callbacks; do not quietly imply that surrounding synchronous `try` catches them. Verify normal, thrown, caught, and cleanup paths. Promise rejection handling waits for an async article.

**JS-07 — DOM measurements, 6–8 minutes.** Correct the API owner, then cover all six properties listed in the note. Use a real element and actual browser measurements. Explain padding/border inclusion and distinguish page-scroll effects on coordinates from resizing effects on size. Show document coordinates as an optional extension for the simple untransformed example. Check actual page scroll, resize, reset, fractional values, and nested-scroll behavior if a nested scroller is used. Avoid building a drag-and-drop editor or positioning library.

### Future notes: reserve categories, not empty lessons

Likely future families are functions/scope, objects/arrays, conditions/loops, DOM/events, and promises/async. They have no substantive notes in this export. Add article briefs when new notes arrive or a current article requires a small prerequisite bridge. Do not commit to a large invented syllabus or publish “coming soon” cards for these families.

## 5. Accuracy corrections before publication

The following issues were checked against the linked documentation during planning. Runnable checks of the finished article examples are still required during implementation.

| Source issue | Editorial rule | Reference |
| --- | --- | --- |
| S02 says `indexOf` returns `1` when missing, while its code correctly shows `-1` | Correct the sentence to `-1`; explicitly distinguish a match at index `0` from no match | [MDN: indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) |
| S02 describes strings as single/double-quoted characters and adds immutability in comments | Include backtick literals briefly; explain immutable primitive values, reassignment, and UTF-16 indexing without equating code units to visible characters | [MDN: data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) |
| Missing values invite confusion about `typeof null` and NaN | Preserve the historical `typeof null` result without classifying null as an object; distinguish NaN as a Number value and explain the supplied conversions | [MDN: data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) |
| BigInt is described only as storing integers larger than Number's safe limit | It can represent small integers too; explain safe integer precision and unsupported mixed Number/BigInt arithmetic | [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) |
| Symbol descriptions can look like property names or privacy guarantees | Descriptions do not establish identity; `Symbol.for` has registry semantics; Symbol-keyed properties remain discoverable | [MDN: Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) |
| S05 says `finally` “always runs” without boundaries | Explain ordinary execution through the construct, and warn against return/throw in finally masking the earlier completion; avoid universal promises about process termination | [MDN: try…catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) |
| S07 is titled `window.getBoundingClientRect()` and says values change on scroll generally | Use `element.getBoundingClientRect()`; distinguish viewport-relative position from dimensions, and avoid claiming every property changes on every scroll | [MDN: element rectangle](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) |

Research narrower edge cases when their article is written. Preserve runnable examples in the article's sources/checks so later revisions can be verified again.

## 6. Repeatable article format and technical approach

### Reading pattern

1. Open with the author's actual question or a recognizable unexpected result.
2. State one concrete reader outcome and prerequisites.
3. Explain the idea with a small example before adding terminology.
4. Show code, expected output, and why that output occurs.
5. Offer one purposeful interaction or prediction question.
6. Explain a common mistake; put optional depth in expandable details.
7. Finish with a compact recap, relevant documentation, and available follow-up reading.

Reuse the current guide's short bullet explanations, desktop/mobile contents, code presentation, quizzes, sources, and series footer. Essential explanations must be in initial HTML, with a static transcript for each interactive example. Practice time is separate from reading time. Do not make quiz completion a requirement for reading further.

Use visible input labels, keyboard-operable controls, clear reset behavior, and text explanations of state. Check narrow screens, both themes, reduced motion, print, and no-script reading. For measurements, announce results on an intentional “Measure” action rather than flooding a screen reader on every scroll.

### Reuse with care

- `ArticleSection.code` already supports basic snippets. Start there instead of adding a code editor or syntax-highlighting dependency.
- Existing `table`, `callout`, `details`, `quiz`, and `recap` blocks cover most material. The current `figure` block is hard-wired to Git snapshots; it is not a generic diagram renderer.
- The details code block currently has the accessible label “Configuration file example.” Make that label neutral or overridable when first reusing it for JavaScript.
- The series hero fallback currently shows Git-style saved moments. Add a small JavaScript values illustration for JS-01 instead of inheriting that fallback. Subsequent articles can use plain topic artwork until a more specific illustration earns its place.
- Add `.topic-javascript` styling where the shared guide currently defaults to coral, especially series dots and callouts. Do not restyle Git or AI.
- Keep the article body server-rendered; client components own only stateful examples and browser measurements. Do not pass actual Symbols across the server/client boundary: create demonstration values within the client example and use plain text for published code/output.
- Use native controls and predefined operations. Never execute exported HTML/scripts, arbitrary reader input, `eval`, or `new Function` in the site page. A free-form code runner is outside the initial need.
- Keep content files per article, following existing `lib/*-article.ts` patterns. Add a shared helper only after an actual second use needs it.

The installed guides reviewed for this plan are `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, `node_modules/next/dist/docs/01-app/02-guides/redirecting.md`, and `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/redirects.md`. Read the relevant installed framework guide again before implementation if the dependency version or planned API changes.

### Series ordering as the collection grows

Use the existing `series.title` and `series.order`; keep initial delivery contiguous so current previous/next lookup works. Article IDs such as JS-05 identify the editorial record and are not the public slug or global card number.

When a future article is inserted, update adjacent navigation and keep numeric order contiguous without changing published URLs. If articles later need independent tracks, create another series only when that distinction improves navigation. If publishing out of order becomes necessary, change next/previous selection to the nearest published order in the same series and verify it; the current lookup requires exactly order ±1.

The current footer always offers a next guide, even when none exists. For JS-07, show a series completion/browse state unless a concrete next article has been planned. Make planned-next metadata optional only when implementing that need, preserving existing Git/AI behavior. Do not invent an eighth title just to fill required fields.

## 7. JS-01: first delivery brief

**Title:** A variable names a value.

**Promise:** By the end, you can look at a simple variable declaration, identify its value and type, and explain what changes when you assign a new value.

**Sources:** S02, including the immutability comment, plus authored beginner explanations. Links to later guides remain non-clickable planned mentions until those guides exist.

| Beat | Writing | Example or action |
| --- | --- | --- |
| 1. Read one line | Explain `let name = "Ali"` without assuming syntax knowledge | Label declaration, name, assignment, and string value |
| 2. Inspect it | Explain `console.log(name)` and `typeof name`; give a short browser-console alternative | Show `Ali` and `string` as separate output lines |
| 3. Reassign | Assign `"Sara"` to the same name | Next step updates the value; prior output stays in the transcript |
| 4. Compare const | Explain a separate `const` declaration and attempted reassignment | Fixed example reveals an error rather than a new value |
| 5. Return a new string | Apply a case-conversion method without assigning its result back | Original and returned values appear separately |
| 6. Place it in context | Overview of all seven primitives, with deeper subjects deferred | Compact value/type table; explain the null exception beside it |
| 7. Predict and recap | Ask whether the original binding changed after the method call | Existing knowledge-check block and three takeaway points |

Interaction scope: one named-string example, a short step sequence, a separate fixed const comparison, one prediction question, and reset. Use native buttons; reader-entered code is unnecessary. Keep a written transcript showing every state and distinguish the teaching diagram from literal memory addresses.

Likely first-delivery changes: `lib/articles.ts`, a new `lib/javascript-variables-article.ts`, `app/page.tsx`, `app/articles/page.tsx`, the shared article route/styles, the block renderer, and one small variables example under `components/articles/`. Reuse the repository's assertion-script pattern for the example and route checks. Do not create all seven article modules or interactions in advance.

JS-01 and topic migration are complete when:

- Git/AI/JavaScript appear consistently in homepage topics, ticker, topic page, archive filters, and article metadata.
- The first JavaScript article opens directly and from its topic; its count is one when it is the only published JavaScript article.
- Legacy Web topic links redirect correctly; the retired Web article returns the intended missing-page response and is absent from the sitemap.
- Every displayed value/error in JS-01 matches an executed JavaScript example, and reset restores the complete initial state.
- The article's exercise anchor, contents, static fallback, quiz, and next-guide state work.
- Git and AI article navigation, content, and counts retain their intended behavior.
- Type checking, production build, focused checks, and visual/keyboard checks pass.

## 8. Ongoing intake: how new notes become articles

Run this workflow whenever the author adds or updates files in `references/javascript/`. Recurring content does not require a scheduled background job; intake happens when the next batch is supplied or article work is requested.

### Intake → mapping → writing → verification → delivery

1. **Inspect the new batch.** List added/changed exports and read their actual content, including children and inline comments. Compare against the source ledger; exported IDs help identify renamed notes. Do not treat a renamed duplicate as a new topic.
2. **Classify each note.** It either corrects a published article, expands a planned article, becomes a section/Q&A, warrants a new standalone article, or waits for prerequisites. Record the decision here.
3. **Prioritize.** Correct wrong published behavior first. Then finish an in-progress article, fill a prerequisite gap, and continue the earliest ready roadmap entry. An explicitly requested topic takes priority; give it the minimum prerequisite explanation it needs.
4. **Write a brief before building.** Capture source IDs, reader outcome, prerequisites, full outline, example states/outputs, correctness questions, proposed slug, and exclusions. Reuse the JS-01 brief structure.
5. **Write and implement one complete article.** Convert shorthand into original connected explanations; preserve useful questions and examples. Do not dump HTML exports into JSX or publish every nested note separately.
6. **Verify and deliver.** Run the focused checks, inspect the page, and record the route and findings. Mark local implementation separately from actual deployment. Do not claim an article is live merely because it exists in a local build.
7. **Update this plan.** Link the finished article, advance the next action, account for every new note, and record any deferred details. Incorporate author feedback in the relevant article before duplicating its pattern elsewhere.

### Choosing an update versus a new article

| Incoming material | Action |
| --- | --- |
| Another question about Symbol descriptions or avoiding string collisions | Extend JS-05; preserve its URL |
| A correction to a copied output or inaccurate explanation | Correct the existing article and its runnable check before creating new material |
| More examples of `indexOf` | Add only examples that teach a distinct case to JS-02 |
| Promise rejection and `async`/`await` notes | Create a new brief with its own outcome and prerequisites; link back to JS-06 |
| Several short notes that answer the same reader question | Consolidate them into one article |
| A navigation page, duplicate export, or conversational fragment | Record/merge it; do not publish a standalone page |
| A full topic with missing foundations | Add a short prerequisite explanation or queue the prerequisite; keep the new article planned until readable on its own |

### Status meanings

`Planned` → `Drafting` → `Implemented` → `Verified` → `Published`.

- **Planned:** mapped sources and outcome exist.
- **Drafting:** writing and example design are in progress.
- **Implemented:** the article renders locally; checks may remain.
- **Verified:** writing, behavior, navigation, and required checks pass locally.
- **Published:** deployment has been confirmed at the public URL.

An article may also be **Needs correction**. Record the specific issue and resume from that point; do not erase earlier delivery evidence.

### Per-delivery record template

Copy into the delivery log below when work starts:

```text
Article ID / title:
Status:
Stable slug / local route:
Source IDs and new source paths:
Reference batch/date reviewed:
Authored bridge material:
Main outcome and prerequisites:
Corrections / documentation checked:
Example scenarios and expected outputs:
Checks run and results:
Visual, keyboard, and static-fallback checks:
Publication date / confirmed public URL (only after deployment):
Deferred details / author feedback:
Next action:
```

This document is the editorial backlog. The article registry is the website's published-content input. Do not build a second JSON manifest, database, importer, or editorial dashboard just to duplicate these two roles.

## 9. Verification and delivery phases

### Phase A — topic replacement and JS-01

Implement the migration and first article together. Reuse the established article system, add the one necessary example, and verify legacy links and counts. Deliver the completed page for feedback.

### Phase B — finish the supplied value notes

Build JS-02 through JS-05 individually. The Symbols notes should become one substantial explanation, not multiple near-duplicate pages. Update reciprocal links and series order after each delivery.

### Phase C — errors and browser behavior

Build JS-06, then JS-07. Use JavaScript execution checks for errors and real-browser checks for geometry. Finish the initial source ledger with no unexplained unmapped notes.

### Phase D — continuous additions

Repeat section 8 for each batch. A dedicated `/learn/javascript` hub becomes useful only when articles actually need multiple tracks, search, or reference navigation beyond the existing topic archive. Add it then, with links to published content. Do not copy the Git lesson/reference system prematurely.

### Checks appropriate to each delivery

- Run `npm run typecheck` and `npm run build` after implementation.
- Follow the existing `scripts/check-*.mjs` pattern using Node's built-in assertions. Leave one focused runnable check for new non-trivial behavior, with expected results independent of the interaction implementation.
- Test language examples using actual JavaScript operations, including intentional failures. Do not merely assert that a displayed string matches the same hard-coded source string.
- Test DOM geometry in a real browser; use tolerances for fractional coordinates and check relationships rather than machine-specific pixel snapshots.
- Check the new article route, topic filter, counts, sitemap, unique slug/section IDs, exercise anchor, and adjacent series links. Test mixed-case filters and unknown-topic empty state when updating filter handling.
- When shared rendering changes, run relevant existing Git/AI checks once and inspect a representative page from each topic. Do not repeatedly rerun unrelated suites after everything passes.
- Inspect desktop and narrow-phone layouts in both themes, keyboard interactions, code/table overflow, reset behavior, readable static content, and reduced motion.
- Record the runtime/browser used for behavioral checks and distinguish verified facts from proposed behavior in this plan.

Before editing shared files, inspect the working tree and preserve unrelated changes. At planning time, `lib/articles.ts` already has a user change removing an AI article, and `references/` is untracked. Neither was modified by this planning task; later work must not restore the removed article or accidentally stage unrelated files.

## 10. Current checkpoint and next action

- [x] Read all seven JavaScript exports and map all of them.
- [x] Review the existing Git roadmap and actual website implementation.
- [x] Identify topic migration locations and the existing Web article policy.
- [x] Record source corrections and documentation links.
- [x] Plan seven initial articles and a concrete first delivery.
- [x] Define repeatable intake, verification, status, and delivery records.
- [ ] Implement Web → JavaScript with JS-01.
- [ ] Deliver and verify JS-02 through JS-05, one at a time.
- [ ] Deliver and verify JS-06 and JS-07.
- [ ] Continue mapping future reference batches as they arrive.

**Next action:** implement the JavaScript topic replacement and “A variable names a value” using section 7. A later request to continue JavaScript should resume the earliest unfinished action here unless the author names another article. Continue Git from its own plan.

### Delivery log

September 11, 2026 — Planning document created. No application files changed, no articles implemented, and no deployment performed. Source mappings and referenced implementation paths were checked; application build/tests are deferred to the implementation phase because this delivery is documentation only.
