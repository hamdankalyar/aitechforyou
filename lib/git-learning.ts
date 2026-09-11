import type { Article } from "./articles";

export const gitSetupLesson = { title: "Set your Git name and email", href: "/learn/git/configure" };
export const gitInitLesson = { title: "Create your first Git repository", href: "/learn/git/init" };

export const gitLessons: { title: string; href?: string }[] = [
  { title: "What Git remembers" },
  { title: "Install Git and open a terminal" },
  gitSetupLesson,
  gitInitLesson,
  { title: "Check and stage a file" },
  { title: "Make your first commit" },
  { title: "Change, inspect, commit again" },
  { title: "Read your project’s history" },
];

export const publishedGitLessons = gitLessons.filter(lesson => lesson.href);

export const gitConfigGuide = "/articles/git-config-identity-and-overrides";

const guideKeywords: Record<string, string> = {
  "from-edited-file-to-first-commit": "git staging stage staged area index working tree directory commit snapshot edited changes tracked untracked git add first commit",
  "git-is-a-time-machine": "save saving vs snapshot snapshots commit version history remembers",
  "git-config-identity-and-overrides": "git config user.name user.email global local identity settings setup configure configuration set name email wrong project email override overrides origin scope unset",
  "merge-versus-rebase": "git merge rebase branch branches history combine",
};

export function getGitResources(articles: Article[]) {
  return [
    {
      title: gitSetupLesson.title,
      href: gitSetupLesson.href,
      kind: "Lesson",
      description: "Save your default name and email, then check that Git has remembered them.",
      time: "3 min read + practice",
      keywords: "git config user.name user.email global setup configure configuration set get change name email identity beginner git --version",
      content: "",
    },
    {
      title: gitInitLesson.title,
      href: gitInitLesson.href,
      kind: "Lesson",
      description: "Make a practice folder, initialize Git, and check that your repository is ready.",
      time: "3 min read + practice",
      keywords: "git init initialize initialise repository repo create start new empty project folder mkdir cd git status initial branch main .git",
      content: "",
    },
    ...articles.filter(article => article.topic === "Git").map(article => ({
      title: article.title,
      href: `/articles/${article.slug}`,
      kind: "Guide",
      description: article.excerpt,
      time: article.readTime,
      keywords: guideKeywords[article.slug] ?? "",
      content: article.sections.flatMap(section => [
        section.heading, section.code ?? "",
        ...(section.blocks ?? []).flatMap(block => block.type === "command" ? [block.command] : block.type === "details" ? [block.title, block.code ?? "", ...(block.commands ?? []).map(command => command.command)] : []),
      ]).join(" "),
    })),
  ];
}

export function searchGitResources(resources: ReturnType<typeof getGitResources>, query: string) {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const terms = normalize(query).split(/\s+/).filter(term => term && !["how", "do", "i", "my", "the", "a", "an", "to", "in", "is", "and", "of"].includes(term));
  if (!terms.length) return query.trim() ? [] : resources;
  // ponytail: literal words and curated aliases suit this small catalog; revisit fuzzy search when real queries miss useful pages.
  return resources.map(resource => {
    const title = normalize(resource.title);
    const text = normalize(`${resource.title} ${resource.description} ${resource.keywords} ${resource.content}`);
    return { resource, score: terms.every(term => text.split(" ").includes(term)) ? terms.reduce((score, term) => score + (title.split(" ").includes(term) ? 4 : 1), 0) : 0 };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score).map(result => result.resource);
}
