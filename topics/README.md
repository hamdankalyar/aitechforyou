# Topics

One folder per technology. Everything specific to a topic lives here; routes stay under `app/` because Next.js needs them there.

```
topics/
  ai/          Generative and agentic AI guides
  git/         Git guides, short lessons, config reference, interactive labs
  javascript/  JavaScript guides, runnable code boxes, variable playground
  react-native/ React Native guides and mobile app lessons
```

Each topic folder uses the same layout:

- `content/` – article sections, lessons, lab state, reference data (`.ts`)
- `components/` – interactive React components used only by that topic
- `scripts/` – Node verification scripts (`node topics/<topic>/scripts/<name>.mjs`)
- `<topic>-learning.css` – styles scoped to that topic, when needed

Shared pieces stay outside:

- `lib/articles.ts` – article registry, topic list, shared types
- `components/articles/` – blocks every topic uses (`article-block`, `command-block`, `knowledge-check`)
- `app/articles/article-learning.css` – shared learning-article styles

To add a topic: create `topics/<name>/content` and `components`, register articles in `lib/articles.ts`, and import the topic stylesheet from `app/articles/[slug]/page.tsx`.
