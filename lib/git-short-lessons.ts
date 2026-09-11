export type GitLessonSummary = {
  title: string;
  href: string;
  description: string;
  time: string;
  keywords: string;
};

type Command = { command: string; explanation: string; output?: string; label?: string };
type Section = { heading: string; paragraphs?: string[]; commands?: Command[]; items?: string[] };

export type ShortGitLesson = GitLessonSummary & {
  slug: string;
  outcome: string;
  before: string[];
  sections: Section[];
  completion: { title: string; text: string };
  deeper?: { title: string; text: string; href: string; label: string };
  sources?: { label: string; href: string }[];
};

export const gitRememberLesson: ShortGitLesson = {
  slug: "what-git-remembers",
  title: "What Git remembers",
  href: "/learn/git/what-git-remembers",
  description: "See the three versions that matter: your file now, the staged version, and the last committed version.",
  time: "3 min read",
  keywords: "git remembers save file working directory tree staging area staged commit snapshot recorded version beginner",
  outcome: "Build a simple picture of Git before you type your first command.",
  before: ["You do not need Git installed for this lesson. Imagine you are editing a file called reading-list.md."],
  sections: [
    {
      heading: "Your file now",
      paragraphs: ["When you edit and save a file, your editor updates the file on your computer. Git can notice that it changed, but saving alone does not create a Git version."],
    },
    {
      heading: "The version prepared next",
      paragraphs: ["Staging means choosing the exact file contents you want in your next recorded version. Think of the staging area as a review step: this is what I intend to record next.", "The file does not move to another folder. Git simply remembers the prepared contents."],
    },
    {
      heading: "The version already recorded",
      paragraphs: ["A commit records the staged contents as a named moment in the project’s history. Later edits create new differences; they do not rewrite an older commit."],
      items: ["Working file: what is on your computer now.", "Staged version: what the next commit would record.", "Last commit: the most recent version Git already recorded."],
    },
  ],
  completion: { title: "Saving today does not erase yesterday.", text: "You can explain that a saved edit changes the working file, while the old commit stays in history." },
  deeper: { title: "See Git as a time machine", text: "Explore snapshots and history with a visual explanation before you begin the hands-on path.", href: "/articles/git-is-a-time-machine", label: "Read the snapshot guide" },
};

export const gitInstallLesson: ShortGitLesson = {
  slug: "install",
  title: "Install Git and open a terminal",
  href: "/learn/git/install",
  description: "Install Git for your computer, open a terminal, and check that the git command works.",
  time: "3 min read + setup",
  keywords: "install download git windows mac macos linux terminal command line git bash version setup beginner",
  outcome: "Get a terminal ready to run Git commands on your computer.",
  before: ["Choose the instructions for your computer. Use the official Git downloads linked below."],
  sections: [
    {
      heading: "Install Git",
      paragraphs: ["Windows: install Git for Windows, then open Git Bash from the Start menu.", "macOS: open Terminal and run git --version. If macOS offers to install developer tools, accept it. You can also use the official macOS installer.", "Linux: use your distribution’s package instructions on the official Linux download page."],
    },
    {
      heading: "Check the installation",
      paragraphs: ["Type the command below and press Enter. Your version number may be different from the example."],
      commands: [{ command: "git --version", explanation: "Ask Git to print its installed version.", output: "git version 2.55.0" }],
    },
    {
      heading: "Know where commands run",
      paragraphs: ["The terminal always works inside a current folder. Later, you will move into a practice folder before asking Git about that project.", "The course uses the same commands in Git Bash on Windows and Terminal on macOS or Linux."],
    },
  ],
  completion: { title: "The terminal prints a Git version.", text: "If you see git version followed by a number, Git is installed and ready." },
  sources: [
    { label: "Official Git installation choices", href: "https://git-scm.com/install/" },
    { label: "Git for Windows", href: "https://git-scm.com/download/win" },
    { label: "Git for macOS", href: "https://git-scm.com/download/mac" },
    { label: "Git for Linux", href: "https://git-scm.com/download/linux" },
  ],
};

export const gitStageLesson: ShortGitLesson = {
  slug: "stage-a-file",
  title: "Check and stage a file",
  href: "/learn/git/stage-a-file",
  description: "Create one file, see how Git describes it, and prepare it for your first commit.",
  time: "4 min read + practice",
  keywords: "git status short untracked question marks git add stage staged staging area create file reading list",
  outcome: "Choose one file for the next commit and verify that Git has staged it.",
  before: ["Keep the git-practice repository from the previous lesson. Open that folder in a text editor and keep a terminal open inside it."],
  sections: [
    {
      heading: "Create one file",
      paragraphs: ["Create a file named reading-list.md, add the two lines below, and save it."],
      commands: [{ command: "# Reading list\n- Dune", explanation: "Put this text in reading-list.md. This is file content, so do not run it in the terminal.", label: "File content" }],
    },
    {
      heading: "See the untracked file",
      commands: [{ command: "git status --short", explanation: "Ask Git for a compact description of the files that changed.", output: "?? reading-list.md" }],
      paragraphs: ["The two question marks mean the file is untracked: Git sees it, but no commit has recorded it yet."],
    },
    {
      heading: "Stage the file",
      commands: [
        { command: "git add reading-list.md", explanation: "Prepare the file’s current contents for the next commit. No output means it worked." },
        { command: "git status --short", explanation: "Check the file again.", output: "A  reading-list.md" },
      ],
      paragraphs: ["A in the left column means the new file is staged. Nothing has been committed yet; Git is showing what the next commit will include."],
    },
  ],
  completion: { title: "Git shows A reading-list.md.", text: "The file is staged, so its current contents are ready for the first commit." },
  deeper: { title: "What exactly did staging save?", text: "Follow the same file through editing, staging, and committing with a visual lab.", href: "/articles/from-edited-file-to-first-commit", label: "Open the first-commit guide" },
};

export const gitCommitLesson: ShortGitLesson = {
  slug: "first-commit",
  title: "Make your first commit",
  href: "/learn/git/first-commit",
  description: "Review the staged file, record it with a clear message, and confirm the project is clean.",
  time: "4 min read + practice",
  keywords: "git diff staged cached commit message first commit git log oneline status clean snapshot record",
  outcome: "Record the staged reading list as the first version in your project’s history.",
  before: ["Your reading-list.md file should still be staged from the previous lesson. You also need the name and email set in lesson 03."],
  sections: [
    {
      heading: "Review what will be recorded",
      commands: [{ command: "git diff --staged -- reading-list.md", explanation: "Show the staged changes for this file. The lines beginning with + are being added." }],
      paragraphs: ["This is your last check before recording the version. Make sure you see the title and Dune."],
    },
    {
      heading: "Create the commit",
      commands: [{ command: 'git commit -m "Start the reading list"', explanation: "Record the staged version with a short message. Git will print a summary." }],
      paragraphs: ["The message explains the purpose of this recorded version. The commit now keeps the file contents, the message, your identity, and the time."],
    },
    {
      heading: "Check the result",
      commands: [
        { command: "git status --short", explanation: "Look for changes that have not been committed. No output is the expected result." },
        { command: "git log --oneline --max-count=1", explanation: "Show the newest commit in a compact form.", output: "a1b2c3d Start the reading list" },
      ],
      paragraphs: ["Your short commit ID will differ from the example. A blank status means your working file matches the newest commit."],
    },
  ],
  completion: { title: "Your first commit appears in the log.", text: "You see Start the reading list, and git status --short prints nothing." },
  deeper: { title: "Replay the whole first-commit journey", text: "Use the interactive guide to compare the working file, staging area, and recorded snapshot.", href: "/articles/from-edited-file-to-first-commit", label: "Explore the interactive guide" },
};

export const gitChangeLesson: ShortGitLesson = {
  slug: "commit-again",
  title: "Change, inspect, commit again",
  href: "/learn/git/commit-again",
  description: "Edit the recorded file, inspect the difference, and create a second commit.",
  time: "5 min read + practice",
  keywords: "edit modify file git status diff add staged second commit commit again inspect changes working tree",
  outcome: "Repeat the everyday edit, inspect, stage, and commit cycle once.",
  before: ["Continue inside git-practice after your first commit. Keep reading-list.md open in your editor."],
  sections: [
    {
      heading: "Change the file",
      paragraphs: ["Add a second item below Dune, then save the file."],
      commands: [{ command: "- The Hobbit", explanation: "Add this line to reading-list.md. This is file content, not a terminal command.", label: "Add to the file" }],
    },
    {
      heading: "Inspect the saved change",
      commands: [
        { command: "git status --short", explanation: "See the file that differs from the latest commit.", output: " M reading-list.md" },
        { command: "git diff -- reading-list.md", explanation: "Read the unstaged difference. Look for the new line beginning with +." },
      ],
      paragraphs: ["M means modified. The space before M tells you the edit is in the working file and has not been staged."],
    },
    {
      heading: "Stage and record it",
      commands: [
        { command: "git add reading-list.md\ngit diff --staged -- reading-list.md", explanation: "Stage the current file, then review the exact change prepared for the next commit." },
        { command: 'git commit -m "Add The Hobbit"', explanation: "Record the staged change as a second commit." },
        { command: "git log --oneline --max-count=2", explanation: "Show the two newest commits.", output: "d4e5f6a Add The Hobbit\na1b2c3d Start the reading list" },
      ],
      paragraphs: ["Your IDs will differ. The newest commit appears first, while the first commit remains underneath it."],
    },
  ],
  completion: { title: "The log shows two commits.", text: "You completed the core Git loop: edit, inspect, stage, and commit." },
};

export const gitHistoryLesson: ShortGitLesson = {
  slug: "read-history",
  title: "Read your project’s history",
  href: "/learn/git/read-history",
  description: "Read the commit list, inspect the latest recorded version, and compare it with the one before it.",
  time: "5 min read + practice",
  keywords: "git history log oneline show head previous commit diff inspect stat pager q commit id hash",
  outcome: "Use your two commits to answer what changed and what Git recorded.",
  before: ["Continue inside git-practice after recording Add The Hobbit. If a Git command opens a full-screen viewer, press q to return to the terminal."],
  sections: [
    {
      heading: "Read the commit list",
      commands: [{ command: "git log --oneline", explanation: "Show each commit as a short ID and message, newest first.", output: "d4e5f6a Add The Hobbit\na1b2c3d Start the reading list" }],
      paragraphs: ["The letters and numbers are shortened commit IDs. You can use an ID when you want to name one recorded moment."],
    },
    {
      heading: "Inspect the latest commit",
      commands: [
        { command: "git show --stat --oneline HEAD", explanation: "Show the newest commit’s message and a compact file summary." },
        { command: "git show HEAD:reading-list.md", explanation: "Print the exact reading-list.md contents recorded in the newest commit.", output: "# Reading list\n- Dune\n- The Hobbit" },
      ],
      paragraphs: ["HEAD is Git’s name for the commit you currently have checked out. Here, it means your newest commit."],
    },
    {
      heading: "Compare the two versions",
      commands: [{ command: "git diff HEAD~1 HEAD -- reading-list.md", explanation: "Compare the previous commit with the newest one. The added Hobbit line begins with +." }],
      paragraphs: ["HEAD~1 means one commit before HEAD. This comparison reads recorded history; it does not change your file."],
    },
  ],
  completion: { title: "You can answer what changed and when.", text: "You can find the newest commit, inspect its recorded file, and compare it with the previous version." },
  deeper: { title: "See why old versions stay safe", text: "Return to the visual snapshot guide now that you have made and inspected real commits.", href: "/articles/git-is-a-time-machine", label: "Explore Git’s time machine" },
};

export const shortGitLessons = [gitRememberLesson, gitInstallLesson, gitStageLesson, gitCommitLesson, gitChangeLesson, gitHistoryLesson];

export function getShortGitLesson(slug: string) {
  return shortGitLessons.find(lesson => lesson.slug === slug);
}
