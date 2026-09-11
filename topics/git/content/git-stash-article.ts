import type { ArticleSection } from "@/lib/articles";

const applied = 'On branch main\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   reading-list.md\n\nno changes added to commit (use "git add" and/or "git commit -a")';

export const gitStashSections: ArticleSection[] = [
  {
    id: "something-else-comes-up", heading: "You are halfway through a change, and something else comes up.",
    paragraphs: [
      "You are adding Piranesi to the reading list, with a note you have not finished. Sam messages: the list title is wrong on main, can you fix it now? A quick commit, nothing to do with your half-done line.",
      "You could commit the unfinished work and tidy it up later, or copy the file somewhere and put it back by hand. Git has a place for exactly this: a **stash**, a shelf beside the project where a change waits without becoming a commit.",
      "This guide continues the reading-list project on your own laptop. You should know the three versions of a file (working, staged, recorded), how a commit records a snapshot, and how to read conflict markers.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "How do you set a half-done change aside, get a clean working tree, and bring the change back later, even after main has moved on?" }],
  },
  {
    id: "what-goes-on-the-shelf", heading: "A stash entry is a snapshot Git made for you.",
    paragraphs: [
      "git stash push records two things, your working file and your staging area, each as a commit that no branch points at. Then it resets both to the last commit, so your working tree is clean. The entry sits on a list, newest first, under the name **stash@{0}**.",
      "Only tracked files take part. An untracked file stays where it is, and git stash answers No local changes to save if that is all you have. Add **--include-untracked**, or -u, to shelve untracked files too; ignored files need --all.",
      "When the entry comes back, staged changes return as unstaged edits unless you ask for --index. A new file you had staged comes back staged, because that is the only way Git can hand it back.",
    ],
    blocks: [{ type: "table", caption: "What git stash push takes and what it leaves", columns: ["Your change", "Plain git stash", "With --include-untracked"], rows: [
      ["Tracked file, edited", "Shelved", "Shelved"],
      ["Tracked file, staged", "Shelved; comes back unstaged unless --index", "Shelved; comes back unstaged unless --index"],
      ["Untracked file", "Left in place", "Shelved"],
      ["Ignored file", "Left in place", "Left in place; --all shelves it"],
    ] }],
  },
  {
    id: "newest-first", heading: "Newest first: stash@{0} is whichever entry arrived last.",
    paragraphs: [
      "Each entry carries a message. Without -m, Git writes WIP on main followed by the commit you were on; with -m \"Add Piranesi\" it writes On main: Add Piranesi. Name every entry. A list of three WIPs from last week is a list of mysteries.",
      "The numbers are positions, not names. Shelving a new change pushes every existing entry down by one, so the entry you called stash@{1} yesterday may be stash@{2} today. Read git stash list before you pick a number, and use git stash show, or show -p for the full patch, to check what an entry holds.",
      "Any command that takes an entry accepts the short form: git stash apply 1 means stash@{1}. The entry also remembers which branch you were on, but you can apply it on any branch.",
    ],
    blocks: [{ type: "bullets", items: [
      { label: "git stash push -m \"…\"", text: "Shelve the change and name the entry. Plain git stash does the same with an automatic WIP message." },
      { label: "git stash list", text: "Every entry, newest first, with its position and message." },
      { label: "git stash show 1", text: "Which files the entry changes and by how much. Add -p to read the patch." },
    ] }],
  },
  {
    id: "apply-or-pop", heading: "Apply keeps the entry. Pop removes it, but only after a clean apply.",
    paragraphs: [
      "**git stash apply** merges the entry into your current working tree and leaves the entry on the shelf. Use it when you may want the change again, on another branch or after an experiment, and drop the entry yourself when you are done with it.",
      "**git stash pop** is apply followed by drop. The drop happens only if the apply succeeded without a conflict. That is the whole difference, and it is why a conflicting pop leaves the entry where it was.",
      "Either one refuses to start if your working tree already has changes to the same files, with the message a merge would give: Your local changes to the following files would be overwritten. Commit or shelve those first.",
    ],
    blocks: [{ type: "table", caption: "apply and pop", columns: ["Outcome", "git stash apply", "git stash pop"], rows: [
      ["The change comes back", "Yes, as unstaged edits", "Yes, as unstaged edits"],
      ["Entry after a clean apply", "Kept", "Dropped"],
      ["Entry after a conflict", "Kept", "Kept"],
      ["Typical use", "Try a change in more than one place", "Take a change back once and be done"],
    ] }],
  },
  {
    id: "try-the-shelf", heading: "Shelve two changes, bring them back, and watch one conflict.",
    paragraphs: [
      "Step through the storyboard. The three panels show your working file, the last commit, and the shelf. Notice when an entry leaves the shelf and when it stays.",
    ],
    blocks: [{ type: "stash-playground" }],
  },
  {
    id: "when-pop-conflicts", heading: "A conflicting pop is a merge that stopped.",
    paragraphs: [
      "The entry was recorded against one commit. If main changed the same lines since, applying is a three-way merge, and it can conflict like any other. The markers read **Updated upstream** for what main has and **Stashed changes** for what the entry has.",
      "Handle it as you would after git merge: edit the file to the answer, then git add it. Staging is the signal that the conflict is resolved. There is no stash --continue, and nothing is in progress: the working tree is simply yours again, with a staged change you can commit when you are ready.",
      "Then look at git stash list. The entry is still there, because pop never reached its drop step. Remove it with git stash drop once your file holds everything you wanted. Leaving it costs nothing but confusion later.",
    ],
    blocks: [{ type: "details", title: "Two other ways out of a conflicting pop", paragraphs: [
      "**Undo the attempt.** git restore --source=HEAD --staged --worktree reading-list.md puts the file back as the last commit recorded it, markers gone, unmerged state cleared. Plain git restore refuses while the path is unmerged. The entry is untouched, so nothing is lost.",
      "**Give the entry its own branch.** git stash branch piranesi-notes 0 creates a branch at the commit the entry was recorded on, applies the entry there, where it always applies cleanly, and drops it. Merge that branch when you are ready.",
      "**Dropped by mistake?** drop removes the entry, not the commits behind it right away. Getting one back is possible and is a job for the reflog guide later in this series.",
    ] }],
  },
  {
    id: "try-it-locally", heading: "Do it for real: one file, two entries, one conflict.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-stash folder in your home folder with a two-commit reading list. Your commit IDs, and the long IDs after Dropped, will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-stash\ncd git-stash\ngit init --initial-branch=main", explanation: "A practice repository of its own.", output: "Initialized empty Git repository in /Users/maya/git-stash/.git/" },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"\nprintf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Two commits, A and B. Replace the sample identity with your own.", output: "[main 4ee030c] Add The Hobbit\n 1 file changed, 1 insertion(+)" },
      { type: "command", command: 'printf "%s\\n" "- Piranesi" >> reading-list.md\ngit status --short', explanation: "The half-done change: edited, not staged.", output: " M reading-list.md" },
      { type: "command", command: 'git stash push -m "Add Piranesi"\ngit status --short', explanation: "Shelved and named. Status prints nothing afterwards: the working tree matches B again.", output: "Saved working directory and index state On main: Add Piranesi" },
      { type: "command", command: 'printf "%s\\n" "- Foundation" >> reading-list.md\ngit stash push -m "Add Foundation"\ngit stash list', explanation: "A second entry pushes the first down to position 1.", output: "Saved working directory and index state On main: Add Foundation\nstash@{0}: On main: Add Foundation\nstash@{1}: On main: Add Piranesi" },
      { type: "command", command: 'printf "# Books to read\\n- Dune\\n- The Hobbit\\n" > reading-list.md\ngit commit -am "Fix the title"', explanation: "Sam’s fix, as an ordinary commit on a clean main. main is at C; both entries still describe a change against B.", output: "[main 22cb301] Fix the title\n 1 file changed, 1 insertion(+), 1 deletion(-)" },
      { type: "command", command: "git stash show 1\ngit stash show -p 1", explanation: "Peek at the older entry before taking it. The patch is against B, the commit it was recorded on: the title still reads Reading list there.", output: " reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\ndiff --git a/reading-list.md b/reading-list.md\nindex de2acd6..8622ee3 100644\n--- a/reading-list.md\n+++ b/reading-list.md\n@@ -1,3 +1,4 @@\n # Reading list\n - Dune\n - The Hobbit\n+- Piranesi" },
      { type: "command", command: "git stash apply 1\ngit stash list", explanation: "apply merges the entry into your file. The title fix and the new line are far apart, so it is clean. The change is back as an unstaged edit, and both entries are still listed.", output: `Auto-merging reading-list.md\n${applied}\nstash@{0}: On main: Add Foundation\nstash@{1}: On main: Add Piranesi` },
      { type: "command", command: 'git commit -am "Add Piranesi"\ngit stash drop 1\ngit stash list', explanation: "Record D, then drop the entry you no longer need. apply never drops anything for you.", output: "[main c39b345] Add Piranesi\n 1 file changed, 1 insertion(+)\nDropped refs/stash@{1} (5fcc4e0acd10bee65bb6bcaf76c79ff9c6551d4f)\nstash@{0}: On main: Add Foundation" },
      { type: "command", command: "git stash pop", explanation: "Add Foundation adds a line after The Hobbit; since B, main added Piranesi in the same place. Git stops with markers and keeps the entry. The command ends with an error status, which is expected here.", output: 'Auto-merging reading-list.md\nCONFLICT (content): Merge conflict in reading-list.md\nOn branch main\nUnmerged paths:\n  (use "git restore --staged <file>..." to unstage)\n  (use "git add <file>..." to mark resolution)\n\tboth modified:   reading-list.md\n\nno changes added to commit (use "git add" and/or "git commit -a")\nThe stash entry is kept in case you need it again.' },
      { type: "command", command: "git status --short\ncat reading-list.md", explanation: "UU: unmerged. Updated upstream is main’s side; Stashed changes is the entry’s.", output: "UU reading-list.md\n# Books to read\n- Dune\n- The Hobbit\n<<<<<<< Updated upstream\n- Piranesi\n=======\n- Foundation\n>>>>>>> Stashed changes" },
      { type: "command", command: 'printf "# Books to read\\n- Dune\\n- The Hobbit\\n- Piranesi\\n- Foundation\\n" > reading-list.md\ngit add reading-list.md\ngit status --short\ngit stash list', explanation: "Write the answer and stage it. The conflict is over, the change is staged, and the entry is still on the shelf.", output: "M  reading-list.md\nstash@{0}: On main: Add Foundation" },
      { type: "command", command: 'git stash drop\ngit commit -m "Add Foundation"', explanation: "Drop the entry yourself, then commit when you are ready. Nothing was in progress; this is an ordinary commit.", output: "Dropped refs/stash@{0} (fc1956ab1437fe9b34ba1dc76802696d695d133e)\n[main 6bcca2c] Add Foundation\n 1 file changed, 1 insertion(+)" },
      { type: "command", command: 'printf "Ask Sam about book club\\n" > notes.txt\ngit stash\ngit status --short', explanation: "An untracked file is invisible to plain git stash: nothing is shelved, and the file is still there.", output: "No local changes to save\n?? notes.txt" },
      { type: "command", command: 'git stash push --include-untracked -m "Book club note"\ngit status --short\ngit stash pop', explanation: "With --include-untracked the note is shelved too, and status prints nothing while it is away. This pop is clean, so it drops the entry itself. Already up to date refers to tracked files: the entry had none.", output: 'Saved working directory and index state On main: Book club note\nAlready up to date.\nOn branch main\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n\tnotes.txt\n\nnothing added to commit but untracked files present (use "git add" to track)\nDropped refs/stash@{0} (09eaef6bb812acc8cd84a8d736fd786e2cc5ed9b)' },
    ],
  },
  {
    id: "check-yourself", heading: "Predict what is on the shelf.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "You ran git stash pop, Git reported CONFLICT, you fixed the file and ran git add. What is on the shelf now?", answers: [
      { text: "The same entry. pop drops only after a clean apply, so drop it yourself once your file holds what you wanted.", correct: true, explanation: "Yes. Staging resolved the conflict, but nothing told Git the entry was finished. git stash list shows it until git stash drop." },
      { text: "Nothing. pop always removes the entry it applied.", correct: false, explanation: "Only when the apply is clean. A conflict stops pop before its drop step." },
      { text: "Nothing, once you commit the staged file.", correct: false, explanation: "A commit records your file; it does not touch the stash list. The entry stays until you drop it." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with a clean tree and an empty shelf. The next guide stays on your laptop and asks a harder question: when something is wrong, which undo do you reach for?"],
    blocks: [{ type: "recap", items: [
      "git stash push -m records your working file and staging area as an entry and gives you a clean tree. Tracked files only, unless you add --include-untracked.",
      "Entries are listed newest first, and their numbers shift. Name them, read the list, and show one before you take it.",
      "apply keeps the entry; pop drops it only after a clean apply. A conflicting pop keeps its entry: resolve, git add, then git stash drop yourself.",
    ] }],
  },
];
