# AI Tech For You

Interactive, visual lessons on Git, JavaScript, React Native, and AI, published at [aitechforyou.com](https://aitechforyou.com).

Every guide starts with a mental model, connects it to something familiar, and then lets you try the idea in the browser: a Git commit playground, runnable JavaScript boxes, knowledge checks, and small labs. Built with Next.js 16, React 19, and TypeScript. No database, no CMS: articles are plain TypeScript files in this repo.

## Contents

- **Git, made visible** – detailed guides (snapshots, first commit, status/diff/log, config) plus eight short hands-on lessons and command references (config, commit, inspect, ignore, branch, merge, conflicts, remotes) under `/learn/git`.
- **JavaScript, made visible** – a six-lesson beginner course with a live code runner (introduction, `console.log`, `let`/`var`/`const`, primitive types, strings, `Symbol`).
- **React Native, made visible** – a growing mobile development course organized around components, styling, navigation, state, device APIs, and performance.
- **AI systems, made visible** – generative vs. agentic AI, with more agent guides planned.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Useful checks before you push:

```bash
npm run typecheck
npm run build
```

Content checks for a topic (JavaScript shown; each topic has its own script in `topics/<topic>/scripts/`):

```bash
node topics/javascript/scripts/check-javascript-articles.mjs
```

## Project layout

```
app/            Routes only (Next.js App Router), sitemap, robots, manifest, OG images
components/     Shared UI: header, footer, article card, article blocks
lib/articles.ts Article registry, topic list, shared types
lib/seo.tsx     Site constants, JSON-LD helpers
topics/         One folder per subject: content (.ts), interactive components, checks, CSS
docs/           Roadmaps and planning notes for each series
references/     Original study notes the articles are written from (HTML exports)
```

Read [`topics/README.md`](topics/README.md) for the topic folder convention.

## Contributing

Contributions are welcome: fixing a typo, clarifying an explanation, adding a lesson, or improving an interactive example.

### Ground rules

1. **Read the topic README first.** JavaScript articles must follow [`topics/javascript/README.md`](topics/javascript/README.md). Git and AI follow the roadmaps in `docs/`.
2. **One idea per article.** Explain the minimum syntax before using it. Assume a beginner who can edit a file and open a terminal.
3. **Cite sources.** Every article has a `sources` list. Link official docs (git-scm.com, MDN) rather than blog posts.
4. **Interactive examples must be checked against the real tool.** If a Git playground shows output, run the same commands in a real repo and match them.
5. **Keep commit messages clean.** Use Conventional Commits (`feat(git): add ignore guide`, `fix(js): correct typeof null explanation`). Describe the change, not the tooling used to make it.

### Add or edit an article

1. Write the sections in `topics/<topic>/content/<slug>-article.ts` as an `ArticleSection[]` (see any existing file for the shape: headings, paragraphs, optional `code`, and typed `blocks` such as `callout`, `command`, `table`, `quiz`, `recap`).
2. Register it in `lib/articles.ts` with a unique `slug`, `title`, `excerpt`, `topic`, `date`, `readTime`, and `series` metadata if it belongs to a course.
3. Run `npm run typecheck` and the topic check script.
4. Open the page at `/articles/<slug>` and read it once as a beginner would.

The archive, topic counts, sitemap, Open Graph image, and structured data update automatically from the registry.

### Add an interactive block

Topic-specific components live in `topics/<topic>/components/`. Add a new variant to the `ArticleBlock` union in `lib/articles.ts`, render it in `components/articles/article-block.tsx`, and keep the component client-only and dependency-free.

### Pull requests

- Branch from `main`, keep one article or one fix per PR.
- Include a screenshot for visual changes.
- `npm run build` must pass.

### Reporting problems

Open an issue with the page URL and what was confusing or wrong. Unclear explanations count as bugs here.

## Deploy

Any Next.js host works. On Vercel, import the repository, keep the detected settings, and attach the domain. The canonical URL and sitemap are set in `lib/seo.tsx`; change `site.url` there if you deploy to another domain.
