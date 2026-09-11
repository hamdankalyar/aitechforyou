import type { Article } from "@/lib/articles";
import { gitConfigReference, gitConfigReferenceSections } from "@/topics/git/content/git-config-reference";
import { gitChangeLesson, gitCommitLesson, gitHistoryLesson, gitInstallLesson, gitRememberLesson, gitStageLesson, type GitLessonSummary } from "@/topics/git/content/git-short-lessons";

export const gitSetupLesson = gitConfigReference;
export const gitInitLesson: GitLessonSummary = { title: "Create your first Git repository", href: "/learn/git/init", description: "Make a practice folder, initialize Git, and check that your repository is ready.", time: "3 min read + practice", keywords: "git init initialize initialise repository repo create start new empty project folder mkdir cd git status initial branch main .git" };

export const gitLessons: GitLessonSummary[] = [
  gitRememberLesson,
  gitInstallLesson,
  gitSetupLesson,
  gitInitLesson,
  gitStageLesson,
  gitCommitLesson,
  gitChangeLesson,
  gitHistoryLesson,
];

export const publishedGitLessons = gitLessons;

export const gitConfigGuide = "/articles/git-config-identity-and-overrides";

const guideKeywords: Record<string, string> = {
  "git-status-diff-and-log": "git status diff log inspect inspection empty diff no output staged unstaged index working tree HEAD compare comparison patch hunk MM history",
  "from-edited-file-to-first-commit": "git staging stage staged area index working tree directory commit snapshot edited changes tracked untracked git add first commit",
  "git-is-a-time-machine": "save saving vs snapshot snapshots commit version history remembers",
  "branches-are-labels-that-move": "git branch branches switch checkout create new branch HEAD label pointer rename delete -d -D diverge fork graph log --graph --all sci-fi",
  "teach-git-what-to-ignore": "gitignore ignore ignored untracked tracked rm cached .env secrets node_modules pattern glob negate exclude check-ignore excludesFile info exclude folder",
  "git-config-identity-and-overrides": "git config user.name user.email global local identity settings setup configure configuration set name email wrong project email override overrides origin scope unset",
  "merge-versus-rebase": "git merge rebase branch branches history combine",
};

export function getGitResources(articles: Article[]) {
  return [
    { ...gitConfigReference, kind: "Reference", content: gitConfigReferenceSections.flatMap(section => [section.heading, ...section.commands.map(command => command.command)]).join(" ") },
    ...gitLessons.filter(lesson => lesson.href !== gitConfigReference.href).map(lesson => ({ ...lesson, kind: "Lesson", content: "" })),
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
    const phraseBonus = ` ${normalize(`${resource.title} ${resource.keywords}`)} `.includes(` ${terms.join(" ")} `) ? 8 : 0;
    return { resource, score: terms.every(term => text.split(" ").includes(term)) ? terms.reduce((score, term) => score + (title.split(" ").includes(term) ? 4 : 1), phraseBonus + (resource.kind === "Reference" ? 4 : 0)) : 0 };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score).map(result => result.resource);
}
