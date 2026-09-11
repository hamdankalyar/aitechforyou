import { firstGitSections } from "./git-first-article";
import { gitConfigSections } from "./git-config-article";

export type ArticleBlock =
  | { type: "timeline" }
  | { type: "save-commit-comparison" }
  | { type: "config-playground" }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "details"; title: string; paragraphs: string[]; code?: string; commands?: { command: string; explanation: string; output?: string }[] }
  | { type: "callout"; title: string; text: string }
  | { type: "figure"; caption: string }
  | { type: "command"; command: string; explanation: string; output?: string }
  | { type: "quiz"; question: string; answers: { text: string; explanation: string; correct: boolean }[] }
  | { type: "recap"; items: string[] };

export type ArticleSection = {
  id?: string;
  heading: string;
  paragraphs: string[];
  code?: string;
  blocks?: ArticleBlock[];
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
  series?: {
    title: string;
    order: number;
    practiceTime: string;
    nextTitle: string;
    nextDescription: string;
    exercise: { id: string; label: string };
    illustration: "snapshots" | "config";
  };
  sources?: { title: string; url: string }[];
  sections: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: "git-is-a-time-machine",
    title: "Git is a time machine, not a save button",
    excerpt:
      "See the difference between saving a file now and recording a version you can return to later.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "4 min read",
    featured: true,
    accent: "coral",
    number: "01",
    series: { title: "Git, made visible", order: 1, practiceTime: "1 min to explore", nextTitle: "From edited file to first commit", nextDescription: "Now that saved moments make sense, we’ll create a project history and record the first one ourselves.", exercise: { id: "try-the-timeline", label: "Try the example" }, illustration: "snapshots" },
    sections: firstGitSections,
    sources: [
      { title: "The Git book · What Git records", url: "https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F" },
      { title: "Git reference · Recording a commit", url: "https://git-scm.com/docs/git-commit" },
    ],
  },
  {
    slug: "git-config-identity-and-overrides",
    title: "Set up Git so it knows who you are",
    excerpt: "One person, different projects. Give your commits an identity—and see which setting wins when Git finds more than one.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "8 min read",
    accent: "coral",
    number: "05",
    series: {
      title: "Git, made visible", order: 4, practiceTime: "2 min to explore",
      nextTitle: "Teach Git what to ignore",
      nextDescription: "Next, we’ll decide which project files belong in Git’s history and which ones should stay out.",
      exercise: { id: "try-the-settings", label: "Try the settings" }, illustration: "config",
    },
    sections: gitConfigSections,
    sources: [
      { title: "The Git book · First-time setup", url: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup" },
      { title: "The Git book · Customizing configuration", url: "https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration" },
      { title: "Git reference · Configuration, scopes, and files", url: "https://git-scm.com/docs/git-config" },
      { title: "Git reference · Commit identity variables", url: "https://git-scm.com/docs/git#Documentation/git.txt-GIT_AUTHOR_NAME" },
      { title: "Git reference · Worktree-specific configuration", url: "https://git-scm.com/docs/git-worktree#_configuration_file" },
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
