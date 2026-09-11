# AI Tech For You

A content-first learning publication for [aitechforyou.com](https://aitechforyou.com), built with Next.js.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add or edit an article

All article content is stored in `lib/articles.ts`. Add a new object to the `articles` array with a unique `slug`, then follow the existing section structure. The article archive, topic counts, filters, metadata, and article route will update automatically.

The interactive Git articles keep their section content in `lib/git-first-article.ts` and `lib/git-config-article.ts`, referenced from the article registry. Sections can add optional typed blocks for figures, callouts, commands, tables, expandable details, interactive examples, knowledge checks, or a recap. Existing paragraph/code sections continue to work. Interactive controls live in `components/articles/`; article-specific styling lives in `app/articles/article-learning.css`.

Series metadata supplies each article's exercise link and illustration. Previous/next links resolve against available articles in series order; the next planned topic remains clearly labeled until its article exists.

The topic sequence and delivery checkpoints are in `docs/git-interactive-articles-plan.md`. Planned lessons are not published as empty article pages.

## Useful checks

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

## Deploy

The project is ready for any Next.js host. On Vercel, import the repository, keep the detected Next.js settings, and connect `aitechforyou.com` in the project&apos;s Domains settings.
