import { javascriptIntroductionSections } from "@/topics/javascript/content/javascript-introduction-article";
import { javascriptConsoleLogSections } from "@/topics/javascript/content/javascript-console-log-article";
import { javascriptDeclarationsSections } from "@/topics/javascript/content/javascript-declarations-article";
import { javascriptPrimitivesSections } from "@/topics/javascript/content/javascript-primitives-article";
import { javascriptStringsSections } from "@/topics/javascript/content/javascript-strings-article";
import { javascriptSymbolSections } from "@/topics/javascript/content/javascript-symbol-article";
import { javascriptOperatorPrecedenceSections } from "@/topics/javascript/content/javascript-operator-precedence-article";
import { javascriptEqualityOperatorsSections } from "@/topics/javascript/content/javascript-equality-operators-article";
import { javascriptConditionsTernarySections } from "@/topics/javascript/content/javascript-conditions-ternary-article";
import { firstGitSections } from "@/topics/git/content/git-first-article";
import { gitConfigSections } from "@/topics/git/content/git-config-article";
import { gitInitLesson, gitSetupLesson } from "@/topics/git/content/git-learning";
import { gitBranchReference, gitConflictReference, gitIgnoreReference, gitInspectReference, gitMergeReference, gitRemoteReference } from "@/topics/git/content/git-references";
import { firstCommitSections } from "@/topics/git/content/git-first-commit-article";
import { gitInspectionSections } from "@/topics/git/content/git-inspection-article";
import { gitIgnoreSections } from "@/topics/git/content/git-ignore-article";
import { gitBranchSections } from "@/topics/git/content/git-branch-article";
import { gitMergeSections } from "@/topics/git/content/git-merge-article";
import { gitConflictSections } from "@/topics/git/content/git-conflict-article";
import { gitRemoteSections } from "@/topics/git/content/git-remote-article";
import { gitPushSections } from "@/topics/git/content/git-push-article";
import { gitForkSections } from "@/topics/git/content/git-fork-article";
import { gitStashSections } from "@/topics/git/content/git-stash-article";
import { aiGenerativeAgenticSections } from "@/topics/ai/content/ai-generative-agentic-guide";

export type ArticleBlock =
  | { type: "variables-playground" }
  | { type: "timeline" }
  | { type: "save-commit-comparison" }
  | { type: "config-playground" }
  | { type: "commit-playground" }
  | { type: "inspection-playground" }
  | { type: "ignore-playground" }
  | { type: "branch-playground" }
  | { type: "merge-playground" }
  | { type: "conflict-playground" }
  | { type: "remote-playground" }
  | { type: "push-playground" }
  | { type: "fork-playground" }
  | { type: "stash-playground" }
  | { type: "bullets"; items: { label: string; text: string }[] }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "details"; title: string; icon?: "info"; paragraphs: string[]; code?: string; commands?: { command: string; explanation: string; output?: string }[] }
  | { type: "callout"; title: string; text: string }
  | { type: "figure"; caption: string }
  | { type: "command"; command: string; explanation: string; output?: string }
  | { type: "quiz"; question: string; answers: { text: string; explanation: string; correct: boolean }[] }
  | { type: "recap"; items: string[] };

export type ArticleSection = {
  id?: string;
  heading: string;
  paragraphs: (string | { text: string; bullets: string[]; info?: Extract<ArticleBlock, { type: "details" }> })[];
  code?: string;
  blocks?: ArticleBlock[];
};

export const javascriptCategories = ["Basic", "Advanced", "Functions", "Interviews", "Performance", "OOP"] as const;

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
  accent: "coral" | "blue" | "lime" | "yellow";
  number: string;
  shortLesson?: { title: string; href: string };
  series?: {
    title: string;
    order: number;
    practiceTime: string;
    nextTitle: string;
    nextDescription: string;
    exercise: { id: string; label: string };
    illustration: "snapshots" | "config" | "staging" | "inspection" | "ignore" | "branches" | "merge" | "conflict" | "remotes" | "push" | "fork" | "stash" | "ai-evolution" | "values";
  };
  sources?: { title: string; url: string }[];
  sections: ArticleSection[];
} & (
  | { topic: "JavaScript"; category: (typeof javascriptCategories)[number] }
  | { topic: "Git" | "AI"; category?: never }
);

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
    slug: "javascript-introduction",
    title: "What JavaScript is",
    excerpt: "Meet the language of the web, run your first line, and learn how to read the code boxes in this course.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 11, 2026",
    readTime: "3 min read",
    accent: "yellow",
    number: "09",
    series: {
      title: "JavaScript, made visible", order: 1, practiceTime: "1 min to explore",
      nextTitle: "console.log",
      nextDescription: "Print text, numbers, and several things at once. The tool you will use in every lesson.",
      exercise: { id: "your-first-line", label: "Run your first line" }, illustration: "values",
    },
    sections: javascriptIntroductionSections,
    sources: [
      { title: "MDN · What is JavaScript?", url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript" },
    ],
  },
  {
    slug: "from-edited-file-to-first-commit",
    title: "From edited file to first commit",
    excerpt: "Your file, your staged version, your recorded moment. See exactly what Git remembers—and why the last thing you saved might not be in your commit.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "9 min read",
    accent: "coral",
    number: "06",
    shortLesson: gitInitLesson,
    series: {
      title: "Git, made visible", order: 2, practiceTime: "3 min to explore",
      nextTitle: "Read what Git is telling you",
      nextDescription: "Use status, diff, and log to ask different questions about your current work and recorded history.",
      exercise: { id: "try-the-commit", label: "Try staging and committing" }, illustration: "staging",
    },
    sections: firstCommitSections,
    sources: [
      { title: "Git book · Recording changes", url: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository" },
      { title: "Git reference · Staging contents", url: "https://git-scm.com/docs/git-add" },
      { title: "Git reference · Making a commit", url: "https://git-scm.com/docs/git-commit" },
      { title: "Git glossary · Working tree, index, and repository", url: "https://git-scm.com/docs/gitglossary" },
      { title: "Git reference · Status and its two columns", url: "https://git-scm.com/docs/git-status" },
      { title: "Git reference · Comparing contents", url: "https://git-scm.com/docs/git-diff" },
      { title: "Git reference · Inspecting a recorded file", url: "https://git-scm.com/docs/git-show" },
    ],
  },
  {
    slug: "git-status-diff-and-log",
    title: "Read what Git is telling you",
    excerpt: "Status locates changes. Diff compares versions. Log follows recorded history. Learn to ask the right question—and understand an empty answer.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "9 min read",
    accent: "coral",
    number: "07",
    shortLesson: gitInspectReference,
    series: {
      title: "Git, made visible", order: 3, practiceTime: "3 min to explore",
      nextTitle: "Set up Git so it knows who you are",
      nextDescription: "Now inspect another kind of Git state: the name and email settings attached to your work, and where their values come from.",
      exercise: { id: "try-the-inspector", label: "Try the comparisons" }, illustration: "inspection",
    },
    sections: gitInspectionSections,
    sources: [
      { title: "Git reference · Status and its two columns", url: "https://git-scm.com/docs/git-status" },
      { title: "Git reference · Choosing diff endpoints", url: "https://git-scm.com/docs/git-diff" },
      { title: "Git reference · Reading commit history", url: "https://git-scm.com/docs/git-log" },
      { title: "Git reference · Inspecting recorded objects", url: "https://git-scm.com/docs/git-show" },
    ],
  },
  {
    slug: "git-config-identity-and-overrides",
    shortLesson: gitSetupLesson,
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
    slug: "teach-git-what-to-ignore",
    title: "Teach Git what to ignore",
    excerpt: "Ignore rules decide what Git never starts tracking. See which paths a pattern matches, why a later ! rule sometimes fails, and why an already tracked file needs a different fix.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "8 min read",
    accent: "coral",
    number: "15",
    shortLesson: gitIgnoreReference,
    series: {
      title: "Git, made visible", order: 5, practiceTime: "2 min to explore",
      nextTitle: "Branches are labels that move",
      nextDescription: "Next, we’ll create a second line of work, commit on it, and watch only its label advance.",
      exercise: { id: "try-the-rules", label: "Try the rules" }, illustration: "ignore",
    },
    sections: gitIgnoreSections,
    sources: [
      { title: "Git reference · gitignore patterns", url: "https://git-scm.com/docs/gitignore" },
      { title: "The Git book · Ignoring files", url: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#_ignoring" },
      { title: "Git reference · Which rule matched", url: "https://git-scm.com/docs/git-check-ignore" },
      { title: "Git reference · Removing from the index only", url: "https://git-scm.com/docs/git-rm" },
      { title: "GitHub docs · Ignoring files", url: "https://docs.github.com/en/get-started/git-basics/ignoring-files" },
    ],
  },
  {
    slug: "branches-are-labels-that-move",
    title: "Branches are labels that move",
    excerpt: "A branch is a name that stores one commit ID. Create one, switch, and commit to see exactly which label moves, how a history forks, and what rename and delete really do.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "9 min read",
    accent: "coral",
    number: "16",
    shortLesson: gitBranchReference,
    series: {
      title: "Git, made visible", order: 6, practiceTime: "2 min to explore",
      nextTitle: "How Git brings two branches together",
      nextDescription: "Next, we’ll join sci-fi back into main and see when Git can simply move a label and when it must record a merge.",
      exercise: { id: "try-the-branches", label: "Move the labels" }, illustration: "branches",
    },
    sections: gitBranchSections,
    sources: [
      { title: "The Git book · Branches in a nutshell", url: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell" },
      { title: "Git reference · Creating, renaming, and deleting branches", url: "https://git-scm.com/docs/git-branch" },
      { title: "Git reference · Switching branches", url: "https://git-scm.com/docs/git-switch" },
      { title: "Git reference · Drawing history", url: "https://git-scm.com/docs/git-log" },
      { title: "Git glossary · HEAD and branch", url: "https://git-scm.com/docs/gitglossary" },
    ],
  },
  {
    slug: "how-git-brings-two-branches-together",
    title: "How Git brings two branches together",
    excerpt: "One command, two shapes. See when a merge only moves a label, when it records a commit with two parents, and how to insist on either.",
    topic: "Git",
    date: "Sep 11, 2026",
    readTime: "9 min read",
    accent: "coral",
    number: "17",
    shortLesson: gitMergeReference,
    series: {
      title: "Git, made visible", order: 7, practiceTime: "2 min to explore",
      nextTitle: "A conflict is a question you can answer",
      nextDescription: "Next, both branches change the same lines. We’ll read the conflict markers, choose the final text, and finish the merge by hand.",
      exercise: { id: "try-the-merge", label: "Try both merges" }, illustration: "merge",
    },
    sections: gitMergeSections,
    sources: [
      { title: "The Git book · Basic branching and merging", url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging" },
      { title: "Git reference · Merging, fast-forward, and --no-ff", url: "https://git-scm.com/docs/git-merge" },
      { title: "Git reference · Deleting a merged branch", url: "https://git-scm.com/docs/git-branch" },
      { title: "Git reference · Parents and first-parent history", url: "https://git-scm.com/docs/git-log" },
      { title: "Git glossary · Fast-forward and merge", url: "https://git-scm.com/docs/gitglossary" },
    ],
  },
  {
    slug: "a-conflict-is-a-question-you-can-answer",
    title: "A conflict is a question you can answer",
    excerpt: "When both branches change the same lines, Git stops and asks. Read the markers, choose the final text, stage it, and finish the merge—or abort and lose nothing.",
    topic: "Git",
    date: "Sep 12, 2026",
    readTime: "10 min read",
    accent: "coral",
    number: "18",
    shortLesson: gitConflictReference,
    series: {
      title: "Git, made visible", order: 8, practiceTime: "2 min to explore",
      nextTitle: "Your branch, their branch, and origin/main",
      nextDescription: "Next, a second copy of the project enters the picture. We’ll see what origin/main is, what fetch changes, and what it leaves alone.",
      exercise: { id: "try-the-conflict", label: "Answer the conflict" }, illustration: "conflict",
    },
    sections: gitConflictSections,
    sources: [
      { title: "The Git book · Basic merge conflicts", url: "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging#_basic_merge_conflicts" },
      { title: "Git reference · How conflicts are presented, --abort, --continue", url: "https://git-scm.com/docs/git-merge#_how_conflicts_are_presented" },
      { title: "Git reference · Status codes for unmerged paths", url: "https://git-scm.com/docs/git-status#_short_format" },
      { title: "Git reference · Leftover markers with diff --check", url: "https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---check" },
      { title: "Git reference · Restoring one side with --ours and --theirs", url: "https://git-scm.com/docs/git-restore" },
      { title: "Git reference · merge.conflictStyle", url: "https://git-scm.com/docs/git-config#Documentation/git-config.txt-mergeconflictStyle" },
    ],
  },
  {
    slug: "your-branch-their-branch-and-origin-main",
    title: "Your branch, their branch, and origin/main",
    excerpt: "Three labels called main, in two repositories. See what origin/main really points at, what git fetch moves, and why status can say up to date while a teammate has moved on.",
    topic: "Git",
    date: "Sep 12, 2026",
    readTime: "10 min read",
    accent: "coral",
    number: "19",
    shortLesson: gitRemoteReference,
    series: {
      title: "Git, made visible", order: 9, practiceTime: "2 min to explore",
      nextTitle: "Push, pull, and the upstream connection",
      nextDescription: "Next, we’ll send your commits to origin, set the upstream that lets push and pull work without arguments, and see what pull really does.",
      exercise: { id: "try-the-fetch", label: "Try a fetch" }, illustration: "remotes",
    },
    sections: gitRemoteSections,
    sources: [
      { title: "The Git book · Working with remotes", url: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes" },
      { title: "The Git book · Remote branches", url: "https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches" },
      { title: "Git reference · Fetching from a remote", url: "https://git-scm.com/docs/git-fetch" },
      { title: "Git reference · Cloning a repository", url: "https://git-scm.com/docs/git-clone" },
      { title: "Git reference · Naming remotes", url: "https://git-scm.com/docs/git-remote" },
      { title: "Git glossary · Remote-tracking branch", url: "https://git-scm.com/docs/gitglossary#def_remote_tracking_branch" },
    ],
  },
  {
    slug: "push-pull-and-the-upstream-connection",
    title: "Push, pull, and the upstream connection",
    excerpt: "Send your commits to a shared server, set the upstream that lets push and pull work without arguments, see why a push gets rejected, and choose how pull answers a divergence.",
    topic: "Git",
    date: "Sep 12, 2026",
    readTime: "11 min read",
    accent: "coral",
    number: "20",
    series: {
      title: "Git, made visible", order: 10, practiceTime: "3 min to explore",
      nextTitle: "From fork to pull request",
      nextDescription: "Next, a repository you cannot push to: fork it, clone your fork, branch, push there, and open a pull request against the original.",
      exercise: { id: "try-the-push", label: "Try a push" }, illustration: "push",
    },
    sections: gitPushSections,
    sources: [
      { title: "The Git book · Pushing to your remotes", url: "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes#_pushing_remotes" },
      { title: "The Git book · Tracking branches", url: "https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches#_tracking_branches" },
      { title: "Git reference · push, --set-upstream, and the note about fast-forwards", url: "https://git-scm.com/docs/git-push" },
      { title: "Git reference · pull and divergent branches", url: "https://git-scm.com/docs/git-pull" },
      { title: "Git reference · push.default, push.autoSetupRemote, pull.ff", url: "https://git-scm.com/docs/git-config" },
      { title: "Git reference · Bare repositories", url: "https://git-scm.com/docs/git-init#Documentation/git-init.txt---bare" },
    ],
  },
  {
    slug: "from-fork-to-pull-request",
    title: "From fork to pull request",
    excerpt: "Contribute to a repository you cannot push to: fork it, clone the fork, branch, push there, open a pull request, and bring the merged result back to every copy.",
    topic: "Git",
    date: "Sep 12, 2026",
    readTime: "10 min read",
    accent: "coral",
    number: "21",
    series: {
      title: "Git, made visible", order: 11, practiceTime: "2 min to explore",
      nextTitle: "Put unfinished work on a shelf",
      nextDescription: "Next, Part III begins on your own laptop: stash half-done work, switch away, and bring it back—apply or pop, and what happens when the shelf conflicts.",
      exercise: { id: "try-the-journey", label: "Follow the change" }, illustration: "fork",
    },
    sections: gitForkSections,
    sources: [
      { title: "GitHub docs · About forks", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks" },
      { title: "GitHub docs · Configuring a remote repository for a fork", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/configuring-a-remote-repository-for-a-fork" },
      { title: "GitHub docs · Creating a pull request from a fork", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork" },
      { title: "GitHub docs · Syncing a fork", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork" },
      { title: "The Git book · Contributing to a project on GitHub", url: "https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project" },
      { title: "Git reference · FETCH_HEAD and fetching one branch", url: "https://git-scm.com/docs/git-fetch" },
    ],
  },
  {
    slug: "put-unfinished-work-on-a-shelf",
    title: "Put unfinished work on a shelf",
    excerpt: "Set a half-done change aside to get a clean working tree, keep several shelved changes apart by name, choose apply or pop when you bring one back, and handle the pop that conflicts and keeps its entry.",
    topic: "Git",
    date: "Sep 12, 2026",
    readTime: "10 min read",
    accent: "coral",
    number: "22",
    series: {
      title: "Git, made visible", order: 12, practiceTime: "2 min to explore",
      nextTitle: "Undo the right thing",
      nextDescription: "Next, four ways to undo: restore a file, reset softly or hard, or revert a commit that is already shared. The same starting point each time, so you can compare what each one touches.",
      exercise: { id: "try-the-shelf", label: "Try the shelf" }, illustration: "stash",
    },
    sections: gitStashSections,
    sources: [
      { title: "Git reference · git stash", url: "https://git-scm.com/docs/git-stash" },
      { title: "The Git book · Stashing and Cleaning", url: "https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning" },
      { title: "Git reference · git restore and unmerged paths", url: "https://git-scm.com/docs/git-restore" },
    ],
  },
  {
    slug: "generative-ai-vs-agentic-ai",
    title: "Generative AI vs. Agentic AI",
    excerpt: "See how an AI system grows from generating an answer to retrieving knowledge, taking action, and adapting toward a goal.",
    topic: "AI",
    date: "Sep 11, 2026",
    readTime: "6 min read",
    accent: "blue",
    number: "08",
    series: {
      title: "AI systems, made visible", order: 1, practiceTime: "2 min to compare",
      nextTitle: "How an AI agent plans and uses tools",
      nextDescription: "Next, we’ll open the agent loop and see how planning, tool calls, observations, and stopping rules work together.",
      exercise: { id: "compare-the-levels", label: "Compare the four levels" }, illustration: "ai-evolution",
    },
    sections: aiGenerativeAgenticSections,
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
  {
    slug: "javascript-console-log",
    title: "console.log",
    excerpt: "Print text, numbers, and several values at once, write comments, and read your first error message.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 11, 2026",
    readTime: "4 min read",
    accent: "yellow",
    number: "10",
    series: {
      title: "JavaScript, made visible", order: 2, practiceTime: "1 min to explore",
      nextTitle: "let, var, and const",
      nextDescription: "Give a value a name, change it later, or lock it in place.",
      exercise: { id: "try-it-yourself", label: "Run the example" }, illustration: "values",
    },
    sections: javascriptConsoleLogSections,
    sources: [
      { title: "MDN · console.log()", url: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static" },
    ],
  },
  {
    slug: "javascript-var-let-const",
    title: "let, var, and const",
    excerpt: "A variable is a name for a value. Learn the three keywords that create one, and which to use.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 11, 2026",
    readTime: "5 min read",
    accent: "yellow",
    number: "11",
    series: {
      title: "JavaScript, made visible", order: 3, practiceTime: "2 min to explore",
      nextTitle: "The seven primitive types",
      nextDescription: "Every value has a type. Meet all seven and learn to check them with typeof.",
      exercise: { id: "try-the-values", label: "Try the variables" }, illustration: "values",
    },
    sections: javascriptDeclarationsSections,
    sources: [
      { title: "MDN · let", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" },
      { title: "MDN · const", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" },
      { title: "MDN · var", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var" },
    ],
  },
  {
    slug: "javascript-primitive-types",
    title: "The seven primitive types",
    excerpt: "Every value has a type. Check it with typeof and meet string, number, boolean, undefined, null, bigint, and symbol.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 11, 2026",
    readTime: "4 min read",
    accent: "yellow",
    number: "12",
    series: {
      title: "JavaScript, made visible", order: 4, practiceTime: "1 min to explore",
      nextTitle: "Strings",
      nextDescription: "Text in JavaScript: count characters, search inside, join, and change case.",
      exercise: { id: "quick-check", label: "Take the quick check" }, illustration: "values",
    },
    sections: javascriptPrimitivesSections,
    sources: [
      { title: "MDN · typeof", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof" },
      { title: "MDN · Primitive values", url: "https://developer.mozilla.org/en-US/docs/Glossary/Primitive" },
    ],
  },
  {
    slug: "javascript-strings",
    title: "Strings",
    excerpt: "Count characters, find text, join strings, and change case. See why a string never changes in place.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 11, 2026",
    readTime: "5 min read",
    accent: "yellow",
    number: "13",
    series: {
      title: "JavaScript, made visible", order: 5, practiceTime: "2 min to explore",
      nextTitle: "Symbol",
      nextDescription: "A value that is always unique, and why that is useful.",
      exercise: { id: "quick-check", label: "Take the quick check" }, illustration: "values",
    },
    sections: javascriptStringsSections,
    sources: [
      { title: "MDN · String", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" },
      { title: "MDN · indexOf()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf" },
      { title: "MDN · toUpperCase()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase" },
    ],
  },
  {
    slug: "javascript-symbol",
    title: "Symbol",
    excerpt: "A symbol is a value that is always unique. Learn the optional description, symbol keys, and why symbols exist when strings seem enough.",
    topic: "JavaScript",
    category: "Advanced",
    date: "Sep 11, 2026",
    readTime: "6 min read",
    accent: "yellow",
    number: "14",
    series: {
      title: "JavaScript, made visible", order: 6, practiceTime: "1 min to explore",
      nextTitle: "Operator precedence",
      nextDescription: "Work out which calculation happens first and how parentheses change the answer.",
      exercise: { id: "quick-check", label: "Take the quick check" }, illustration: "values",
    },
    sections: javascriptSymbolSections,
    sources: [
      { title: "MDN · Symbol", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" },
    ],
  },
  {
    slug: "javascript-operator-precedence",
    title: "Operator precedence",
    excerpt: "Learn which calculation happens first, how equal priorities work, and when parentheses change the answer.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 12, 2026",
    readTime: "3 min read",
    accent: "yellow",
    number: "23",
    series: {
      title: "JavaScript, made visible", order: 7, practiceTime: "1 min to explore",
      nextTitle: "Equality operators",
      nextDescription: "Compare values with ==, ===, !=, and !==, and see when JavaScript converts types.",
      exercise: { id: "try-it-yourself", label: "Try the calculations" }, illustration: "values",
    },
    sections: javascriptOperatorPrecedenceSections,
    sources: [
      { title: "MDN · Operator precedence", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence" },
    ],
  },
  {
    slug: "javascript-equality-operators",
    title: "Equality operators",
    excerpt: "Compare values with ==, ===, !=, and !==. Understand type coercion and why the number 5 differs from the string \"5\".",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 12, 2026",
    readTime: "5 min read",
    accent: "yellow",
    number: "24",
    series: {
      title: "JavaScript, made visible", order: 8, practiceTime: "1 min to explore",
      nextTitle: "Conditions and the ternary operator",
      nextDescription: "Choose what runs with conditions, AND, OR, NOT, and the ternary operator.",
      exercise: { id: "try-it-yourself", label: "Try the comparisons" }, illustration: "values",
    },
    sections: javascriptEqualityOperatorsSections,
    sources: [
      { title: "MDN · Equality (==)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality" },
      { title: "MDN · Strict equality (===)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality" },
      { title: "ECMAScript · Loose equality rules", url: "https://tc39.es/ecma262/multipage/abstract-operations.html#sec-islooselyequal" },
      { title: "MDN · isNaN()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN" },
    ],
  },
  {
    slug: "javascript-conditions-ternary",
    title: "Conditions and the ternary operator",
    excerpt: "Learn if/else, AND, OR, NOT, and the ternary operator with short examples.",
    topic: "JavaScript",
    category: "Basic",
    date: "Sep 12, 2026",
    readTime: "4 min read",
    accent: "yellow",
    number: "26",
    series: {
      title: "JavaScript, made visible", order: 9, practiceTime: "2 min to explore",
      nextTitle: "More JavaScript lessons",
      nextDescription: "More lessons are in preparation.",
      exercise: { id: "try-it-yourself", label: "Try the conditions" }, illustration: "values",
    },
    sections: javascriptConditionsTernarySections,
    sources: [
      { title: "MDN · if...else", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else" },
      { title: "MDN · Logical AND (&&)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND" },
      { title: "MDN · Logical OR (||)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR" },
      { title: "MDN · Logical NOT (!)", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT" },
      { title: "MDN · Conditional (ternary) operator", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator" },
    ],
  },
];

export const courses = [
  {
    name: "Git",
    href: "/learn/git",
    description: "Version control explained through timelines, stories, and real mistakes.",
    index: "01",
    className: "coral",
  },
  {
    name: "JavaScript",
    href: "/courses/javascript",
    description: "Values, behavior, and browser APIs explained through examples you can try.",
    index: "02",
    className: "yellow",
  },
  {
    name: "AI",
    href: "/articles?topic=AI",
    description: "Models, agents, and tools—understood from first principles.",
    index: "03",
    className: "blue",
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
