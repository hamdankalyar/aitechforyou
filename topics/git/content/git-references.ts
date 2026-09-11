import type { GitLessonSummary } from "@/topics/git/content/git-short-lessons";
import { gitConfigReference, gitConfigReferenceSections } from "./git-config-reference.ts";

export type GitReferenceCommand = { command: string; explanation: string; output: string; status?: number };
export type GitReferenceSection = { id: string; heading: string; description?: string; commands: GitReferenceCommand[]; note?: string };
export type GitReference = GitLessonSummary & {
  slug: string;
  intro: string;
  sections: GitReferenceSection[];
  guide: { href: string; title: string; text: string; label: string };
  docs: { label: string; href: string }[];
  next?: { label: string; href: string };
};

const setup = (folder: string) => ({
  id: "practice-repository",
  heading: "Set up a practice repository",
  description: "Every example below runs inside this disposable repository. Skip this section to use your own project.",
  commands: [
    { command: `cd ~\nmkdir ${folder}\ncd ${folder}\ngit init --initial-branch=main`, explanation: "Create the folder in your home directory and initialize Git with a main branch.", output: `Initialized empty Git repository in /Users/you/${folder}/.git/` },
    { command: 'git config set --local user.name "Your Name"\ngit config set --local user.email "you@example.com"', explanation: "Give commits an identity in this repository only. Skip if your global identity is already set.", output: "No output" },
  ],
});
const firstCommit = { command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"', explanation: "Create a file, stage it, and record the first commit.", output: "[main (root-commit) 3f2a9c1] Start the reading list\n 1 file changed, 2 insertions(+)\n create mode 100644 reading-list.md" };
const secondCommit = { command: 'printf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Append a line and commit it. -a stages every modified tracked file first.", output: "[main 8d1e5b2] Add The Hobbit\n 1 file changed, 1 insertion(+)" };

export const gitCommitReference: GitReference = {
  slug: "commit",
  title: "Git Add & Commit",
  href: "/learn/git/commit",
  description: "Stage files, record commits, unstage, discard changes, and fix the last commit message.",
  time: "Command reference",
  keywords: "git add commit stage staging staged unstage restore discard amend message -m -a -am record snapshot index working tree",
  intro: "Choose what goes into the next commit, record it, and adjust the staging area when you change your mind.",
  sections: [
    setup("git-commit-reference"),
    {
      id: "stage",
      heading: "Stage a file",
      commands: [
        { command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit status --short', explanation: "Create a file, then ask what Git sees. ?? means untracked.", output: "?? reading-list.md" },
        { command: "git add reading-list.md\ngit status --short", explanation: "Stage the file. A in the first column means it is added and ready to commit.", output: "A  reading-list.md" },
      ],
      note: "git add copies the file’s current contents into the staging area. Edits made after staging are not included until you add again.",
    },
    {
      id: "commit",
      heading: "Record a commit",
      commands: [{ command: 'git commit -m "Start the reading list"', explanation: "Record the staged contents with a message. Your commit ID will differ.", output: "[main (root-commit) 3f2a9c1] Start the reading list\n 1 file changed, 2 insertions(+)\n create mode 100644 reading-list.md" }],
      note: "Without -m, Git opens your editor for the message. Save and close it to finish the commit.",
    },
    {
      id: "commit-a-change",
      heading: "Stage and commit a change",
      commands: [
        { command: 'printf "%s\\n" "- The Hobbit" >> reading-list.md\ngit status --short', explanation: "Append a line. M in the second column means modified but not staged.", output: " M reading-list.md" },
        { command: 'git add reading-list.md\ngit commit -m "Add The Hobbit"', explanation: "Stage the change and record it.", output: "[main 8d1e5b2] Add The Hobbit\n 1 file changed, 1 insertion(+)" },
      ],
    },
    {
      id: "commit-all",
      heading: "Commit every modified tracked file",
      commands: [{ command: 'printf "%s\\n" "- Piranesi" >> reading-list.md\ngit commit -am "Add Piranesi"', explanation: "Stage all modified tracked files and commit in one step.", output: "[main c4a7f90] Add Piranesi\n 1 file changed, 1 insertion(+)" }],
      note: "-a never stages new files. Untracked files still need git add.",
    },
    {
      id: "unstage",
      heading: "Unstage a file",
      commands: [{ command: 'printf "%s\\n" "- Foundation" >> reading-list.md\ngit add reading-list.md\ngit restore --staged reading-list.md\ngit status --short', explanation: "Stage a change, then move it back out of the staging area.", output: " M reading-list.md" }],
      note: "Unstaging leaves the file on disk exactly as it is. Only the prepared version changes.",
    },
    {
      id: "discard",
      heading: "Discard an unstaged change",
      commands: [{ command: "git restore reading-list.md\ngit status --short", explanation: "Replace the working file with the staged version. Status is empty because nothing differs.", output: "No output" }],
      note: "This cannot be undone. The discarded edit was never recorded anywhere.",
    },
    {
      id: "amend",
      heading: "Fix the last commit message",
      commands: [{ command: 'git commit --amend -m "Add Piranesi to the list"\ngit log --oneline --max-count=2', explanation: "Replace the most recent commit with one that has a new message.", output: "[main e9b2d41] Add Piranesi to the list\n Date: …\n 1 file changed, 1 insertion(+)\ne9b2d41 Add Piranesi to the list\n8d1e5b2 Add The Hobbit" }],
      note: "Amend creates a new commit with a new ID. Anything staged is included too. Avoid amending commits you have already pushed.",
    },
    {
      id: "recorded-contents",
      heading: "See what a commit recorded",
      commands: [{ command: "git show HEAD:reading-list.md", explanation: "Print the file as it exists in the latest commit.", output: "# Reading list\n- Dune\n- The Hobbit\n- Piranesi" }],
    },
  ],
  guide: { href: "/articles/from-edited-file-to-first-commit", title: "What does a commit actually contain?", text: "Follow one file from an edit through staging to a recorded commit, with a visual example.", label: "Read the first-commit guide →" },
  docs: [{ label: "git add", href: "https://git-scm.com/docs/git-add" }, { label: "git commit", href: "https://git-scm.com/docs/git-commit" }, { label: "git restore", href: "https://git-scm.com/docs/git-restore" }],
};

export const gitInspectReference: GitReference = {
  slug: "inspect",
  title: "Git Status, Diff & Log",
  href: "/learn/git/inspect",
  description: "Check the working state, compare versions, read history, and print a recorded file.",
  time: "Command reference",
  keywords: "git status diff log show inspect inspection short --short --staged --cached HEAD compare history oneline graph decorate parents stat what changed",
  intro: "Three questions: what has changed, what exactly changed, and what has been recorded.",
  sections: [
    { ...setup("git-inspect-reference"), commands: [...setup("git-inspect-reference").commands, firstCommit] },
    {
      id: "status",
      heading: "Check the current state",
      commands: [
        { command: 'printf "%s\\n" "- The Hobbit" >> reading-list.md\ngit add reading-list.md\nprintf "%s\\n" "- Piranesi" >> reading-list.md\ngit status --short', explanation: "Stage one change, make another, then read the two columns: staged on the left, unstaged on the right.", output: "MM reading-list.md" },
        { command: "git status", explanation: "The long form explains each group and suggests commands.", output: 'On branch main\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n\tmodified:   reading-list.md\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   reading-list.md' },
      ],
      note: "Common short codes: ?? untracked, A added, M modified, D deleted, UU unmerged. A space means no change in that column.",
    },
    {
      id: "diff",
      heading: "Compare versions",
      commands: [
        { command: "git diff", explanation: "Working file against the staging area: what you have not staged yet.", output: "diff --git a/reading-list.md b/reading-list.md\nindex de2acd6..8622ee3 100644\n--- a/reading-list.md\n+++ b/reading-list.md\n@@ -1,3 +1,4 @@\n # Reading list\n - Dune\n - The Hobbit\n+- Piranesi" },
        { command: "git diff --staged", explanation: "Staging area against the last commit: what the next commit would record.", output: "diff --git a/reading-list.md b/reading-list.md\nindex fdfc2a1..de2acd6 100644\n--- a/reading-list.md\n+++ b/reading-list.md\n@@ -1,2 +1,3 @@\n # Reading list\n - Dune\n+- The Hobbit" },
        { command: "git diff HEAD", explanation: "Working file against the last commit: both changes together.", output: "diff --git a/reading-list.md b/reading-list.md\nindex fdfc2a1..8622ee3 100644\n--- a/reading-list.md\n+++ b/reading-list.md\n@@ -1,2 +1,4 @@\n # Reading list\n - Dune\n+- The Hobbit\n+- Piranesi" },
        { command: "git diff --stat HEAD", explanation: "Summarize which files changed and by how much.", output: " reading-list.md | 2 ++\n 1 file changed, 2 insertions(+)" },
      ],
      note: "Add -- path to limit any diff to one file or folder. An empty diff means the two versions match.",
    },
    {
      id: "log",
      heading: "Read the history",
      commands: [
        { command: 'git add reading-list.md\ngit commit -m "Add The Hobbit and Piranesi"\ngit log --oneline', explanation: "Commit the pending work, then list commits, newest first.", output: "[main 8d1e5b2] Add The Hobbit and Piranesi\n 1 file changed, 2 insertions(+)\n8d1e5b2 Add The Hobbit and Piranesi\n3f2a9c1 Start the reading list" },
        { command: "git log --oneline --decorate --graph", explanation: "Show branch labels and the shape of the history.", output: "* 8d1e5b2 (HEAD -> main) Add The Hobbit and Piranesi\n* 3f2a9c1 Start the reading list" },
        { command: "git log --oneline --parents --max-count=1", explanation: "Print the latest commit followed by its parent ID.", output: "8d1e5b2 3f2a9c1 Add The Hobbit and Piranesi" },
      ],
      note: "Plain git log prints the author, date, and full message for each commit. Press q to leave the pager.",
    },
    {
      id: "show",
      heading: "Inspect a commit",
      commands: [
        { command: "git show --oneline --stat HEAD", explanation: "Summarize the latest commit: which files changed and by how much.", output: "8d1e5b2 Add The Hobbit and Piranesi\n reading-list.md | 2 ++\n 1 file changed, 2 insertions(+)" },
        { command: "git show HEAD:reading-list.md", explanation: "Print a file exactly as the latest commit recorded it.", output: "# Reading list\n- Dune\n- The Hobbit\n- Piranesi" },
        { command: "git diff HEAD~1 HEAD -- reading-list.md", explanation: "Compare a file between the previous commit and the latest one.", output: "diff --git a/reading-list.md b/reading-list.md\nindex fdfc2a1..8622ee3 100644\n--- a/reading-list.md\n+++ b/reading-list.md\n@@ -1,2 +1,4 @@\n # Reading list\n - Dune\n+- The Hobbit\n+- Piranesi" },
      ],
      note: "HEAD is the current commit. HEAD~1 is its first parent, HEAD~2 the parent before that.",
    },
  ],
  guide: { href: "/articles/git-status-diff-and-log", title: "Which version is each command comparing?", text: "See status, diff, and log answer different questions about the same file, with a visual example.", label: "Read the inspection guide →" },
  docs: [{ label: "git status", href: "https://git-scm.com/docs/git-status" }, { label: "git diff", href: "https://git-scm.com/docs/git-diff" }, { label: "git log", href: "https://git-scm.com/docs/git-log" }, { label: "git show", href: "https://git-scm.com/docs/git-show" }],
};

export const gitIgnoreReference: GitReference = {
  slug: "ignore",
  title: "Git Ignore",
  href: "/learn/git/ignore",
  description: "Write ignore rules, keep exceptions, find which rule matched, and stop tracking a file.",
  time: "Command reference",
  keywords: "gitignore ignore ignored untracked pattern glob negate ! exception folder directory check-ignore rm --cached stop tracking .env secrets node_modules global excludesFile",
  intro: "Ignore rules keep untracked files out of git status and git add. They never affect files Git already tracks.",
  sections: [
    { ...setup("git-ignore-reference"), commands: [...setup("git-ignore-reference").commands, firstCommit] },
    {
      id: "ignore-patterns",
      heading: "Ignore files by pattern",
      commands: [{ command: 'mkdir logs\ntouch debug.log logs/build.log notes.tmp\nprintf "%s\\n" "*.log" "*.tmp" > .gitignore\ngit status --short', explanation: "Create some files, then write two rules. Only the .gitignore file itself shows as untracked.", output: "?? .gitignore" }],
      note: "A pattern without a slash matches in every folder. Commit .gitignore so the rules travel with the project.",
    },
    {
      id: "keep-exception",
      heading: "Keep one file an earlier rule ignores",
      commands: [{ command: 'touch important.log\nprintf "%s\\n" "!important.log" >> .gitignore\ngit status --short', explanation: "A rule starting with ! re-includes a path. Later rules win.", output: "?? .gitignore\n?? important.log" }],
      note: "A file inside an ignored folder cannot be re-included. Ignore the folder’s contents with notes/* instead of notes/ if you need to keep one file.",
    },
    {
      id: "ignore-folder",
      heading: "Ignore a folder",
      commands: [{ command: 'mkdir build\ntouch build/app.js\nprintf "%s\\n" "build/" >> .gitignore\ngit status --short', explanation: "A trailing slash matches only folders. Nothing inside build appears.", output: "?? .gitignore\n?? important.log" }],
    },
    {
      id: "check-ignore",
      heading: "Find which rule matched",
      commands: [
        { command: "git check-ignore -v debug.log logs/build.log build/app.js", explanation: "Print the file, line, and pattern responsible for each ignored path.", output: ".gitignore:1:*.log\tdebug.log\n.gitignore:1:*.log\tlogs/build.log\n.gitignore:4:build/\tbuild/app.js" },
        { command: "git check-ignore -v important.log", explanation: "With -v, a matching negated pattern is reported too, so you can see why a path is kept.", output: ".gitignore:3:!important.log\timportant.log" },
      ],
    },
    {
      id: "list-ignored",
      heading: "List ignored files",
      commands: [{ command: "git status --short --ignored", explanation: "Show ignored paths with !! alongside the untracked ones.", output: "?? .gitignore\n?? important.log\n!! build/\n!! debug.log\n!! logs/\n!! notes.tmp" }],
    },
    {
      id: "stop-tracking",
      heading: "Stop tracking a file that is already committed",
      commands: [
        { command: 'printf "API_KEY=practice-only\\n" > .env\ngit add .env\ngit commit -m "Add settings"\nprintf "%s\\n" ".env" >> .gitignore\ngit status --short', explanation: "Commit a file by mistake, then add an ignore rule. The tracked file is unaffected.", output: "[main 09c16f7] Add settings\n 1 file changed, 1 insertion(+)\n create mode 100644 .env\n?? .gitignore\n?? important.log" },
        { command: 'git rm --cached .env\ngit add .gitignore\ngit commit -m "Stop tracking .env"\ngit status --short', explanation: "Remove the file from the index only, then commit. The file stays on disk and is now ignored.", output: "rm '.env'\n[main 0a53875] Stop tracking .env\n 2 files changed, 5 insertions(+), 1 deletion(-)\n delete mode 100644 .env\n create mode 100644 .gitignore\n?? important.log" },
      ],
      note: "Earlier commits still contain the file. Rotate any secret that was committed, even briefly.",
    },
    {
      id: "global-ignore",
      heading: "Ignore files in every repository",
      commands: [{ command: 'git config set --global core.excludesFile ~/.gitignore_global\nprintf "%s\\n" ".DS_Store" > ~/.gitignore_global\ntouch .DS_Store\ngit check-ignore -v .DS_Store', explanation: "Point Git at a personal ignore file for editor and operating-system clutter.", output: "/Users/you/.gitignore_global:1:.DS_Store\t.DS_Store" }],
      note: "Keep project rules in the project’s .gitignore. Use the global file only for files specific to your machine.",
    },
  ],
  guide: { href: "/articles/teach-git-what-to-ignore", title: "Why did my ! rule not work?", text: "See which paths a pattern matches, why folder rules block exceptions, and why tracked files need a different fix.", label: "Read the ignore guide →" },
  docs: [{ label: "gitignore", href: "https://git-scm.com/docs/gitignore" }, { label: "git check-ignore", href: "https://git-scm.com/docs/git-check-ignore" }, { label: "git rm", href: "https://git-scm.com/docs/git-rm" }],
};

export const gitBranchReference: GitReference = {
  slug: "branch",
  title: "Git Branch",
  href: "/learn/git/branch",
  description: "List, create, switch, rename, and delete branches, and see where HEAD points.",
  time: "Command reference",
  keywords: "git branch switch checkout create new branch -c list rename -m delete -d -D HEAD current show-current graph --all not fully merged",
  intro: "A branch is a label that stores one commit ID. These commands move, rename, and remove labels.",
  sections: [
    { ...setup("git-branch-reference"), commands: [...setup("git-branch-reference").commands, firstCommit, secondCommit] },
    {
      id: "list",
      heading: "List branches",
      commands: [
        { command: "git branch", explanation: "List local branches. The asterisk marks the one you are on.", output: "* main" },
        { command: "git branch --show-current", explanation: "Print only the current branch name.", output: "main" },
      ],
      note: "Add --all to include remote-tracking branches, or -v to see each branch’s latest commit.",
    },
    {
      id: "create-switch",
      heading: "Create a branch and switch to it",
      commands: [
        { command: "git switch -c sci-fi\ngit branch", explanation: "Create sci-fi at the current commit and move HEAD to it.", output: "Switched to a new branch 'sci-fi'\n  main\n* sci-fi" },
      ],
      note: "git branch sci-fi creates the label without switching. git switch sci-fi moves to an existing branch.",
    },
    {
      id: "commit-on-branch",
      heading: "Commit on the branch",
      commands: [{ command: 'printf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"\ngit log --oneline --decorate --graph --all', explanation: "Only the sci-fi label moves. main stays where it was.", output: "[sci-fi c4a7f90] Add Foundation\n 1 file changed, 1 insertion(+)\n* c4a7f90 (HEAD -> sci-fi) Add Foundation\n* 8d1e5b2 (main) Add The Hobbit\n* 3f2a9c1 Start the reading list" }],
    },
    {
      id: "switch-back",
      heading: "Switch back",
      commands: [{ command: "git switch main\ncat reading-list.md", explanation: "Move HEAD to main. The working file changes to match that commit.", output: "Switched to branch 'main'\n# Reading list\n- Dune\n- The Hobbit" }],
      note: "Git refuses to switch if it would overwrite uncommitted changes. Commit or stash them first.",
    },
    {
      id: "create-at-commit",
      heading: "Create a branch at an older commit",
      commands: [{ command: "git branch archive HEAD~1\ngit log --oneline --decorate --graph --all", explanation: "Start a label at the previous commit without switching to it.", output: "* c4a7f90 (sci-fi) Add Foundation\n* 8d1e5b2 (HEAD -> main) Add The Hobbit\n* 3f2a9c1 (archive) Start the reading list" }],
    },
    {
      id: "rename",
      heading: "Rename a branch",
      commands: [{ command: "git branch -m sci-fi science-fiction\ngit branch", explanation: "Rename the label. Commits are untouched.", output: "  archive\n* main\n  science-fiction" }],
      note: "To rename the branch you are on, give only the new name: git branch -m new-name.",
    },
    {
      id: "delete",
      heading: "Delete a branch",
      commands: [
        { command: "git branch -d archive", explanation: "Delete a branch whose commits are already reachable from the current branch.", output: "Deleted branch archive (was 3f2a9c1)." },
        { command: "git branch -d science-fiction", explanation: "Git refuses when the branch has commits that no other branch contains.", output: "error: the branch 'science-fiction' is not fully merged\nhint: If you are sure you want to delete it, run 'git branch -D science-fiction'\nhint: Disable this message with \"git config set advice.forceDeleteBranch false\"", status: 1 },
        { command: "git branch -D science-fiction", explanation: "Force the deletion. The Foundation commit is no longer on any branch.", output: "Deleted branch science-fiction (was c4a7f90)." },
      ],
      note: "A force-deleted commit is not erased immediately. git reflog can find its ID for a while if you need it back.",
    },
    {
      id: "head",
      heading: "See where HEAD points",
      commands: [{ command: "cat .git/HEAD", explanation: "HEAD normally names a branch. That branch moves when you commit.", output: "ref: refs/heads/main" }],
    },
  ],
  guide: { href: "/articles/branches-are-labels-that-move", title: "Which label moves when you commit?", text: "Create a branch, commit on it, and watch the labels move in a visual example.", label: "Read the branches guide →" },
  docs: [{ label: "git branch", href: "https://git-scm.com/docs/git-branch" }, { label: "git switch", href: "https://git-scm.com/docs/git-switch" }],
};

export const gitMergeReference: GitReference = {
  slug: "merge",
  title: "Git Merge",
  href: "/learn/git/merge",
  description: "Fast-forward a branch, record a merge commit, force one with --no-ff, and clean up merged branches.",
  time: "Command reference",
  keywords: "git merge fast-forward fast forward --ff-only --no-ff merge commit two parents combine branches ort auto-merging already up to date delete merged branch",
  intro: "Merging brings another branch’s commits into the current branch. Git either moves the label or records a commit with two parents.",
  sections: [
    { ...setup("git-merge-reference"), commands: [...setup("git-merge-reference").commands, firstCommit, secondCommit, { command: 'git switch -c sci-fi\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"', explanation: "Create a branch with one commit that main does not have.", output: "Switched to a new branch 'sci-fi'\n[sci-fi c4a7f90] Add Foundation\n 1 file changed, 1 insertion(+)" }] },
    {
      id: "fast-forward",
      heading: "Fast-forward a branch",
      commands: [
        { command: "git switch main\ngit merge sci-fi", explanation: "Merge into main. main has no new commits since sci-fi began, so Git just moves the label.", output: "Switched to branch 'main'\nUpdating 8d1e5b2..c4a7f90\nFast-forward\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
        { command: "git log --oneline --decorate --graph --all", explanation: "Both labels now point at the same commit. No merge commit exists.", output: "* c4a7f90 (HEAD -> main, sci-fi) Add Foundation\n* 8d1e5b2 Add The Hobbit\n* 3f2a9c1 Start the reading list" },
      ],
    },
    {
      id: "diverge",
      heading: "Make the branches diverge",
      commands: [{ command: 'git switch -c fantasy\nprintf "%s\\n" "- Earthsea" >> reading-list.md\ngit commit -am "Add Earthsea"\ngit switch main\nprintf "# Reading list for 2026\\n- Dune\\n- The Hobbit\\n- Foundation\\n" > reading-list.md\ngit commit -am "Update the title"', explanation: "Commit on a new branch, then commit on main too. Neither contains the other’s work.", output: "Switched to a new branch 'fantasy'\n[fantasy 7b3d2e8] Add Earthsea\n 1 file changed, 1 insertion(+)\nSwitched to branch 'main'\n[main d2e8b31] Update the title\n 1 file changed, 1 insertion(+), 1 deletion(-)" }],
    },
    {
      id: "ff-only",
      heading: "Refuse anything but a fast-forward",
      commands: [{ command: "git merge --ff-only fantasy", explanation: "Use this when you want to be sure no merge commit is created. Git refuses because the branches diverged.", output: "hint: Diverging branches can't be fast-forwarded, you need to either:\nhint:\nhint: \tgit merge --no-ff\nhint:\nhint: or:\nhint:\nhint: \tgit rebase\nhint:\nhint: Disable this message with \"git config set advice.diverging false\"\nfatal: Not possible to fast-forward, aborting.", status: 128 }],
    },
    {
      id: "merge-commit",
      heading: "Record a merge commit",
      commands: [
        { command: "git merge --no-edit fantasy", explanation: "Both branches changed different lines, so Git combines them and records a commit with two parents. --no-edit accepts the default message.", output: "Auto-merging reading-list.md\nMerge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
        { command: "git log --oneline --decorate --graph --all", explanation: "The history now forks and rejoins.", output: "*   9e4f6a7 (HEAD -> main) Merge branch 'fantasy'\n|\\  \n| * 7b3d2e8 (fantasy) Add Earthsea\n* | d2e8b31 Update the title\n|/  \n* c4a7f90 (sci-fi) Add Foundation\n* 8d1e5b2 Add The Hobbit\n* 3f2a9c1 Start the reading list" },
        { command: "git log --oneline --parents --max-count=1", explanation: "The merge commit lists two parent IDs: main’s previous commit first, then fantasy.", output: "9e4f6a7 d2e8b31 7b3d2e8 Merge branch 'fantasy'" },
      ],
      note: "Without --no-edit, your editor opens with the prepared message. Save and close it to finish.",
    },
    {
      id: "no-ff",
      heading: "Force a merge commit",
      commands: [{ command: 'git switch -c poetry\nprintf "%s\\n" "- Beowulf" >> reading-list.md\ngit commit -am "Add Beowulf"\ngit switch main\ngit merge --no-ff --no-edit poetry', explanation: "A fast-forward was possible, but --no-ff records a merge commit anyway so the branch stays visible in history.", output: "Switched to a new branch 'poetry'\n[poetry 5a9c1f4] Add Beowulf\n 1 file changed, 1 insertion(+)\nSwitched to branch 'main'\nMerge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" }],
    },
    {
      id: "delete-merged",
      heading: "Delete merged branches",
      commands: [
        { command: "git branch --merged", explanation: "List branches whose commits are all reachable from the current branch.", output: "  fantasy\n* main\n  poetry\n  sci-fi" },
        { command: "git branch -d sci-fi fantasy poetry", explanation: "Delete them. Their commits remain in main’s history.", output: "Deleted branch sci-fi (was c4a7f90).\nDeleted branch fantasy (was 7b3d2e8).\nDeleted branch poetry (was 5a9c1f4)." },
      ],
    },
    {
      id: "undo",
      heading: "Undo a merge you have not pushed",
      commands: [{ command: "git reset --hard ORIG_HEAD\ngit log --oneline --max-count=1", explanation: "Move main back to where it was before the last merge, here the poetry merge. This also discards uncommitted changes.", output: "HEAD is now at 9e4f6a7 Merge branch 'fantasy'\n9e4f6a7 Merge branch 'fantasy'" }],
      note: "Use this only for merges that exist on your machine alone. Rewriting shared history creates work for everyone else.",
    },
  ],
  guide: { href: "/articles/how-git-brings-two-branches-together", title: "When does Git need a merge commit?", text: "Try a fast-forward and a real merge side by side, and see which one adds a commit.", label: "Read the merge guide →" },
  docs: [{ label: "git merge", href: "https://git-scm.com/docs/git-merge" }, { label: "git branch", href: "https://git-scm.com/docs/git-branch" }, { label: "git reset", href: "https://git-scm.com/docs/git-reset" }],
};

export const gitConflictReference: GitReference = {
  slug: "conflicts",
  title: "Merge Conflicts",
  href: "/learn/git/conflicts",
  description: "Read a conflict, inspect both sides, abort, resolve by hand or take one side, and finish the merge.",
  time: "Command reference",
  keywords: "merge conflict conflicts CONFLICT markers resolve resolution unmerged UU abort continue ours theirs :2: :3: diff --check restore --ours --theirs zdiff3 conflictStyle",
  intro: "A conflict pauses the merge until you choose the final text. Nothing is lost while you decide.",
  sections: [
    { ...setup("git-conflict-reference"), commands: [...setup("git-conflict-reference").commands, firstCommit, secondCommit, { command: 'git switch -c sci-fi\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"\ngit switch main\nprintf "%s\\n" "- Piranesi" >> reading-list.md\ngit commit -am "Add Piranesi"', explanation: "Append a different line at the same place on each branch.", output: "Switched to a new branch 'sci-fi'\n[sci-fi c4a7f90] Add Foundation\n 1 file changed, 1 insertion(+)\nSwitched to branch 'main'\n[main e1c5d90] Add Piranesi\n 1 file changed, 1 insertion(+)" }] },
    {
      id: "start-merge",
      heading: "Start the merge",
      commands: [{ command: "git merge sci-fi", explanation: "Git stops because both branches changed the same lines.", output: "Auto-merging reading-list.md\nCONFLICT (content): Merge conflict in reading-list.md\nAutomatic merge failed; fix conflicts and then commit the result.", status: 1 }],
    },
    {
      id: "see-conflict",
      heading: "See what conflicted",
      commands: [
        { command: "git status --short", explanation: "UU marks a file that is unmerged on both sides.", output: "UU reading-list.md" },
        { command: "git diff --name-only --diff-filter=U", explanation: "List only the conflicted files. Useful when many files changed.", output: "reading-list.md" },
        { command: "cat reading-list.md", explanation: "Git wrote both versions into the file between markers. HEAD is your side; sci-fi is the branch being merged.", output: "# Reading list\n- Dune\n- The Hobbit\n<<<<<<< HEAD\n- Piranesi\n=======\n- Foundation\n>>>>>>> sci-fi" },
      ],
    },
    {
      id: "abort",
      heading: "Abort the merge",
      commands: [{ command: "git merge --abort\ngit status --short\ncat reading-list.md", explanation: "Return to the state before git merge. Status is clean and the file is back to main’s version.", output: "# Reading list\n- Dune\n- The Hobbit\n- Piranesi" }],
    },
    {
      id: "inspect-sides",
      heading: "Inspect both sides",
      commands: [
        { command: "git merge sci-fi", explanation: "Start the same merge again.", output: "Auto-merging reading-list.md\nCONFLICT (content): Merge conflict in reading-list.md\nAutomatic merge failed; fix conflicts and then commit the result.", status: 1 },
        { command: "git show :2:reading-list.md", explanation: "Print your side, stage 2, without the markers.", output: "# Reading list\n- Dune\n- The Hobbit\n- Piranesi" },
        { command: "git show :3:reading-list.md", explanation: "Print their side, stage 3.", output: "# Reading list\n- Dune\n- The Hobbit\n- Foundation" },
        { command: "git log --merge --oneline", explanation: "List the commits from each branch that touched the conflicted files.", output: "e1c5d90 Add Piranesi\nc4a7f90 Add Foundation" },
      ],
    },
    {
      id: "take-one-side",
      heading: "Take one side whole",
      commands: [
        { command: "git restore --theirs -- reading-list.md\ncat reading-list.md", explanation: "Replace the file with the sci-fi version. Use --ours for your version.", output: "# Reading list\n- Dune\n- The Hobbit\n- Foundation" },
        { command: "git restore --merge -- reading-list.md\ngit status --short", explanation: "Changed your mind? Recreate the conflict markers in the file.", output: "UU reading-list.md" },
      ],
      note: "Taking one side is quick but discards the other side’s change to that file. Check the result before staging.",
    },
    {
      id: "resolve",
      heading: "Resolve by hand",
      commands: [
        { command: 'printf "# Reading list\\n- Dune\\n- The Hobbit\\n- Piranesi\\n- Foundation\\n" > reading-list.md\ngit diff --check', explanation: "Write the final text in your editor, keeping both lines. diff --check prints nothing when no markers remain.", output: "No output" },
        { command: "git add reading-list.md\ngit status --short", explanation: "Staging the file tells Git the conflict is resolved.", output: "M  reading-list.md" },
      ],
    },
    {
      id: "finish",
      heading: "Finish the merge",
      commands: [
        { command: "git merge --continue", explanation: "Record the merge commit. Your editor opens with a prepared message; save and close it.", output: "[main 1f3c8a2] Merge branch 'sci-fi'" },
        { command: "git log --oneline --parents --max-count=1\ncat reading-list.md", explanation: "The new commit has two parents and the file contains your answer.", output: "1f3c8a2 e1c5d90 c4a7f90 Merge branch 'sci-fi'\n# Reading list\n- Dune\n- The Hobbit\n- Piranesi\n- Foundation" },
      ],
    },
    {
      id: "conflict-style",
      heading: "Show the original text in conflicts",
      commands: [{ command: "git config set --global merge.conflictStyle zdiff3", explanation: "Future conflict markers include a third block: the common ancestor’s text, so you can see what each side changed.", output: "No output" }],
    },
  ],
  guide: { href: "/articles/a-conflict-is-a-question-you-can-answer", title: "What is Git asking when it stops?", text: "Read the markers, choose the final text, and finish the merge in a visual example.", label: "Read the conflict guide →" },
  docs: [{ label: "git merge", href: "https://git-scm.com/docs/git-merge#_how_conflicts_are_presented" }, { label: "git restore", href: "https://git-scm.com/docs/git-restore" }, { label: "git diff --check", href: "https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---check" }],
};

export const gitRemoteReference: GitReference = {
  slug: "remotes",
  title: "Git Remote & Fetch",
  href: "/learn/git/remotes",
  description: "Clone a repository, list remotes, fetch, compare with origin/main, merge, and manage remote names.",
  time: "Command reference",
  keywords: "git remote fetch clone origin origin/main remote-tracking branch --all -v add remove rename set-url get-url behind ahead diverged up to date status --branch FETCH_HEAD",
  intro: "A remote is another repository with a nickname. Fetch updates your record of it; origin/main is that record.",
  sections: [
    {
      id: "practice-repository",
      heading: "Set up two practice repositories",
      description: "teammate stands in for a repository on a server. laptop is your clone. Both are folders on your computer; no network is needed.",
      commands: [
        { command: "cd ~\nmkdir git-remotes-reference\ncd git-remotes-reference\ngit init --initial-branch=main teammate\ncd teammate", explanation: "Create the teammate repository inside a new folder.", output: "Initialized empty Git repository in /Users/you/git-remotes-reference/teammate/.git/" },
        { command: 'git config set --local user.name "Sam Okafor"\ngit config set --local user.email "sam@example.com"\nprintf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Give the teammate an identity and two commits.", output: "[main (root-commit) 3f2a9c1] Start the reading list\n 1 file changed, 2 insertions(+)\n create mode 100644 reading-list.md\n[main 8d1e5b2] Add The Hobbit\n 1 file changed, 1 insertion(+)" },
      ],
    },
    {
      id: "clone",
      heading: "Clone a repository",
      commands: [
        { command: "cd ..\ngit clone teammate laptop\ncd laptop", explanation: "Copy the teammate repository into laptop. The source can be a folder path or a URL.", output: "Cloning into 'laptop'...\ndone." },
        { command: 'git config set --local user.name "Your Name"\ngit config set --local user.email "you@example.com"', explanation: "Set your own identity in the clone.", output: "No output" },
      ],
    },
    {
      id: "list-remotes",
      heading: "List remotes and remote-tracking branches",
      commands: [
        { command: "git remote -v", explanation: "Clone named the source origin. Each remote has a fetch and a push address.", output: "origin\t/Users/you/git-remotes-reference/teammate (fetch)\norigin\t/Users/you/git-remotes-reference/teammate (push)" },
        { command: "git branch --all\ngit log --oneline --decorate", explanation: "origin/main is your record of main in origin. Right after cloning it matches your main.", output: "* main\n  remotes/origin/HEAD -> origin/main\n  remotes/origin/main\n8d1e5b2 (HEAD -> main, origin/main, origin/HEAD) Add The Hobbit\n3f2a9c1 Start the reading list" },
      ],
    },
    {
      id: "fetch",
      heading: "Fetch new commits",
      commands: [
        { command: 'cd ../teammate\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"\ncd ../laptop\ngit status --short --branch', explanation: "The teammate commits. Your status still says up to date, because your record has not changed.", output: "[main c4a7f90] Add Foundation\n 1 file changed, 1 insertion(+)\n## main...origin/main" },
        { command: "git fetch", explanation: "Download the new commits and move origin/main. Your main and your files do not change.", output: "From /Users/you/git-remotes-reference/teammate\n   8d1e5b2..c4a7f90  main       -> origin/main" },
        { command: "git status --short --branch\ncat reading-list.md", explanation: "Now status compares main with the updated record. The file is still yours.", output: "## main...origin/main [behind 1]\n# Reading list\n- Dune\n- The Hobbit" },
      ],
      note: "git fetch origin main fetches one branch. Naming a branch alone, as in git fetch main, fails because main is not a remote.",
    },
    {
      id: "compare",
      heading: "Compare with origin/main",
      commands: [
        { command: "git log --oneline main..origin/main", explanation: "List the commits origin/main has that main does not.", output: "c4a7f90 Add Foundation" },
        { command: "git show origin/main:reading-list.md", explanation: "Print their version of a file without touching yours.", output: "# Reading list\n- Dune\n- The Hobbit\n- Foundation" },
        { command: "git diff main origin/main --stat", explanation: "Summarize what would change if you merged.", output: " reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
      ],
    },
    {
      id: "merge-fetched",
      heading: "Bring the fetched commits into main",
      commands: [{ command: "git merge origin/main\ngit status --short --branch", explanation: "Merge the remote-tracking branch like any other. Here it fast-forwards.", output: "Updating 8d1e5b2..c4a7f90\nFast-forward\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\n## main...origin/main" }],
      note: "git pull runs fetch and then merge in one step. Fetching first lets you look before you act.",
    },
    {
      id: "manage-remotes",
      heading: "Add, rename, and remove a remote",
      commands: [
        { command: "git remote add mirror ../teammate\ngit remote -v", explanation: "Register a second remote under a new name.", output: "mirror\t../teammate (fetch)\nmirror\t../teammate (push)\norigin\t/Users/you/git-remotes-reference/teammate (fetch)\norigin\t/Users/you/git-remotes-reference/teammate (push)" },
        { command: "git remote rename mirror backup\ngit remote", explanation: "Rename it. Remote-tracking branches are renamed too.", output: "backup\norigin" },
        { command: "git remote remove backup\ngit remote", explanation: "Remove it, along with its remote-tracking branches.", output: "origin" },
      ],
    },
    {
      id: "remote-url",
      heading: "Read or change a remote’s address",
      commands: [
        { command: "git remote get-url origin", explanation: "Print the address Git fetches from.", output: "/Users/you/git-remotes-reference/teammate" },
        { command: "git remote set-url origin ../teammate\ngit remote get-url origin", explanation: "Point origin at a different address, for example after a repository moves.", output: "../teammate" },
      ],
    },
  ],
  guide: { href: "/articles/your-branch-their-branch-and-origin-main", title: "What does origin/main really point at?", text: "Let a teammate commit, fetch, and watch which labels and files change in a visual example.", label: "Read the remotes guide →" },
  docs: [{ label: "git remote", href: "https://git-scm.com/docs/git-remote" }, { label: "git fetch", href: "https://git-scm.com/docs/git-fetch" }, { label: "git clone", href: "https://git-scm.com/docs/git-clone" }],
};

export const gitConfigReferenceEntry: GitReference = {
  ...gitConfigReference,
  slug: "configure",
  intro: "Read, write, and remove Git settings. Keys use the form section.key, such as user.email.",
  sections: gitConfigReferenceSections,
  guide: { href: "/articles/git-config-identity-and-overrides", title: "Why does one setting override another?", text: "Follow global defaults and project exceptions through a visual example.", label: "Read the configuration guide →" },
  docs: [{ label: "git config", href: "https://git-scm.com/docs/git-config" }],
  next: { label: "Create a repository →", href: "/learn/git/init" },
};

export const gitReferenceGroups: { label: string; references: GitReference[] }[] = [
  { label: "Setup & configuration", references: [gitConfigReferenceEntry] },
  { label: "Recording changes", references: [gitCommitReference, gitInspectReference, gitIgnoreReference] },
  { label: "Branches & merging", references: [gitBranchReference, gitMergeReference, gitConflictReference] },
  { label: "Remotes", references: [gitRemoteReference] },
];

export const gitReferences = gitReferenceGroups.flatMap(group => group.references);

export function getGitReference(slug: string) {
  return gitReferences.find(reference => reference.slug === slug);
}

export function nextGitReference(reference: GitReference) {
  if (reference.next) return reference.next;
  const following = gitReferences[gitReferences.indexOf(reference) + 1];
  return following ? { label: `${following.title} →`, href: following.href } : undefined;
}
