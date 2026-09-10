export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  code?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  topic: "Git" | "AI" | "Web";
  date: string;
  readTime: string;
  featured?: boolean;
  accent: "coral" | "blue" | "lime";
  number: string;
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "git-is-a-time-machine",
    title: "Git is a time machine, not a save button",
    excerpt:
      "A visual mental model for commits, branches, and the small graph living inside every Git project.",
    topic: "Git",
    date: "Sep 8, 2026",
    readTime: "6 min read",
    featured: true,
    accent: "coral",
    number: "01",
    sections: [
      {
        heading: "Start with the right picture",
        paragraphs: [
          "Most Git confusion begins with one misleading idea: that a commit is simply a saved version of a folder. A commit is better understood as a named moment in the history of your project.",
          "Each new commit points back to the moment before it. Put those moments together and you get a timeline—a graph that Git can travel, compare, and rearrange.",
        ],
      },
      {
        heading: "A branch is a movable label",
        paragraphs: [
          "A branch is not a separate folder and it is not a complete copy of your code. It is a lightweight label pointing at one commit. When you commit again, the label moves forward.",
        ],
        code: "A ← B ← C  main\n        ↖ D  feature",
      },
      {
        heading: "The useful question",
        paragraphs: [
          "Instead of asking ‘Which files are in my branch?’, ask ‘Which commit does my branch point to?’ That small change in language makes checkout, merge, and rebase much easier to reason about.",
        ],
      },
    ],
  },
  {
    slug: "ai-agents-without-the-hype",
    title: "AI agents, without the hype",
    excerpt:
      "What makes an agent different from a chatbot—and when a simple script is still the smarter choice.",
    topic: "AI",
    date: "Sep 4, 2026",
    readTime: "8 min read",
    accent: "blue",
    number: "02",
    sections: [
      {
        heading: "A loop with choices",
        paragraphs: [
          "An AI agent is a system that can observe a situation, choose an action, use a tool, and inspect the result. The important part is not the chat interface. It is the feedback loop.",
          "A chatbot usually returns an answer. An agent can take several steps toward an outcome, changing its next move based on what happened before.",
        ],
      },
      {
        heading: "Where agents help",
        paragraphs: [
          "Agents are useful when a task has uncertainty: investigating a bug, researching across sources, or deciding which tool to use. Predictable tasks are often safer, faster, and cheaper as ordinary software.",
        ],
      },
      {
        heading: "A practical test",
        paragraphs: [
          "Ask whether the job needs judgment between steps. If every step is already known, build a workflow. If the system must adapt after seeing each result, an agent may be a good fit.",
        ],
      },
    ],
  },
  {
    slug: "internet-request-journey",
    title: "What happens after you press Enter?",
    excerpt:
      "Follow one web request from your keyboard to a server and all the way back to painted pixels.",
    topic: "Web",
    date: "Aug 29, 2026",
    readTime: "7 min read",
    accent: "lime",
    number: "03",
    sections: [
      {
        heading: "A name becomes an address",
        paragraphs: [
          "Your browser cannot send a request to a domain name alone. It first asks DNS for the numerical IP address of the server responsible for that name.",
        ],
      },
      {
        heading: "The conversation begins",
        paragraphs: [
          "The browser establishes a secure connection and sends an HTTP request. The server reads it, runs the necessary application logic, and returns a response containing HTML, data, or another resource.",
        ],
      },
      {
        heading: "From text to pixels",
        paragraphs: [
          "The browser parses HTML into a document tree, combines it with CSS rules, calculates layout, and paints the result. JavaScript can then change that page and begin new requests.",
        ],
      },
    ],
  },
  {
    slug: "merge-versus-rebase",
    title: "Merge vs. rebase: choose by the story",
    excerpt:
      "Both combine work. The difference is the history they leave for the next person to understand.",
    topic: "Git",
    date: "Aug 21, 2026",
    readTime: "5 min read",
    accent: "coral",
    number: "04",
    sections: [
      {
        heading: "Two valid histories",
        paragraphs: [
          "Merge preserves the true shape of parallel work and creates a commit joining the histories. Rebase replays your commits on a new starting point, producing a straighter timeline.",
        ],
      },
      {
        heading: "Choose for the reader",
        paragraphs: [
          "Use merge when the branch structure carries useful context. Use rebase when a clean sequence makes the change easier to review. Avoid rebasing shared history because it replaces commits other people may already use.",
        ],
      },
    ],
  },
];

export const topics = [
  {
    name: "Git",
    description: "Version control explained through timelines, stories, and real mistakes.",
    index: "01",
    className: "coral",
  },
  {
    name: "AI",
    description: "Models, agents, and tools—understood from first principles.",
    index: "02",
    className: "blue",
  },
  {
    name: "Web",
    description: "The invisible systems that turn code into experiences.",
    index: "03",
    className: "lime",
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
