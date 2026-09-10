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

## Useful checks

```bash
npm run typecheck
npm run build
npm audit --omit=dev
```

## Deploy

The project is ready for any Next.js host. On Vercel, import the repository, keep the detected Next.js settings, and connect `aitechforyou.com` in the project&apos;s Domains settings.
