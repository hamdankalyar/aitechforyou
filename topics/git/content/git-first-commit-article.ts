import type { ArticleSection } from "./articles";

export const firstCommitSections: ArticleSection[] = [
  {
    id: "which-version",
    heading: "You saved it. Did you stage it?",
    paragraphs: [
      "Imagine a reading list with one book: Dune. You ask Git to prepare it for a commit. A minute later, you remember The Hobbit, add another line, and save the file. Then you commit. Does the recorded version contain one book or two?",
      "That small question explains why Git has a staging area. Saving, staging, and committing do different jobs. Once you can tell them apart, Git’s messages start to describe something you can picture.",
      "We’ll follow one file from a new project to its first recorded version. Explore the example without installing anything, or follow the terminal walkthrough afterward. No branch diagrams or Git internals are needed.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "If I stage my file, edit it again, and then commit, which version does Git record?" }],
  },
  {
    id: "meet-the-three-places",
    heading: "One project. Three views of its contents.",
    paragraphs: [
      "Start with the file you can open in your editor. Git calls the project files you work on the working tree, also called the working directory. Pressing Save updates a file here. This is your current work, including ideas you may not be ready to record.",
      "The staging area is where you prepare the next project snapshot. A snapshot means the project contents at one moment. Staging a file selects its contents as they are now. The file stays in your folder; you are not moving it into a second folder you must manage.",
      "A commit records that prepared snapshot in the repository’s history, together with information such as a message and identity. The repository is the Git storage associated with your project. In the ordinary setup used here, Git manages it in the hidden .git folder.",
      "You may also see the word index. That is Git’s name for the staging area. Think of it as the proposed next snapshot, rather than a shopping basket that becomes empty after checkout.",
    ],
    blocks: [{ type: "table", caption: "The same file can have different contents in each view", columns: ["View", "Question it answers", "What updates it here"], rows: [["Working tree", "What is in my file now?", "Edit and save"], ["Staging area / index", "What have I prepared to record?", "git add reading-list.md"], ["Latest commit", "What did Git record last time?", 'git commit -m "message"']] }],
  },
  {
    id: "why-stage",
    heading: "Choose a moment worth recording.",
    paragraphs: [
      "Suppose you fix a spelling mistake in a README while halfway through changing a feature. You might want one commit that clearly says “Fix the setup instructions,” without also recording the unfinished feature. Staging lets you choose the contents that belong to that moment.",
      "For this guide, we select one whole file with git add reading-list.md. The command prepares that file’s current contents. It does not promise to include every later edit you make to the same file. The filename identifies what to read now; it is not a live subscription to future saves.",
      "That is also why git add is useful more than once. For a new file, it begins tracking the file. For a file Git already tracks, it updates the version prepared for the next commit.",
    ],
  },
  {
    id: "try-the-commit",
    heading: "Stage one book. Save another. Predict the commit.",
    paragraphs: [
      "Our practice repository begins with no commits. The reading-list file already contains Dune. The three panels show its current contents, its prepared contents, and its latest recorded contents.",
      "First, move through the example without staging a second time. At the end, compare the current file with the recorded version. Then go Back, choose the extra git add step, and commit again in the simulation. Notice exactly when the result changes.",
    ],
    blocks: [{ type: "commit-playground" }],
  },
  {
    id: "read-the-result",
    heading: "The second edit did not disappear.",
    paragraphs: [
      "Without a second staging step, the first commit records Dune. The Hobbit remains in the working file. Git did not lose it, erase it, or secretly include it. You have recorded one version while continuing to hold a newer version on your computer.",
      "If you stage again before committing, the proposed snapshot includes both books. The commit then records both. The difference comes from what you prepared, not how recently you pressed Save.",
      "After committing, the index still contains the prepared snapshot. What disappears is the difference between the index and the new commit. Git can report no staged changes even though the index still describes all the tracked files. With only Dune committed, there is still a difference between the working file and the index: The Hobbit.",
    ],
    blocks: [{ type: "callout", title: "For the commands in this guide", text: "A normal git commit -m records the prepared snapshot. Options such as -a or explicit file paths can change how contents are selected; leave those shortcuts aside while learning this workflow." }],
  },
  {
    id: "prepare-a-real-project",
    heading: "Try the same story on your computer.",
    paragraphs: [
      "Use a macOS or Linux terminal, or Git Bash on Windows. The examples were checked with Git 2.50.1; use Git 2.50 or newer for the set/get configuration syntax. Run git --version if you need to check. The short setup and repository lessons are available from the Git hub if you want a slower introduction.",
      "Start in your home folder and create a fresh directory for this experiment. If git-first-commit already exists, choose an unused name in both lines that mention it. Run each line separately and continue only if it succeeds.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-first-commit\ncd git-first-commit\ngit init --initial-branch=main", explanation: "Create a practice folder, enter it, and initialize Git. main names the starting branch: the line of work we will stay on throughout this example.", output: "Initialized empty Git repository in /Users/maya/git-first-commit/.git/" },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Replace these sample details with your own. --local sets the identity just for this practice repository; it leaves your other projects’ defaults alone. Successful commands normally print nothing." },
      { type: "callout", title: "An empty history is expected", text: "git init prepares the repository. It does not make a commit or upload the project. Your name and email identify future commits; they are not a GitHub login." },
    ],
  },
  {
    id: "make-and-stage-a-file",
    heading: "Make a file, then prepare its first version.",
    paragraphs: [
      "In your editor, create reading-list.md inside the new git-first-commit folder. Save it with the two lines shown below. The .md ending means Markdown, a plain-text format; # marks a heading and - begins a list item.",
    ],
    code: "# Reading list\n- Dune",
    blocks: [
      { type: "command", command: "git status --short", explanation: "Ask for the compact status. The two question marks mean Git sees a new, untracked file.", output: "?? reading-list.md" },
      { type: "command", command: "git add reading-list.md\ngit status --short", explanation: "Stage the file’s current contents, then inspect the result. A in the first column means a new file is prepared for the next commit.", output: "A  reading-list.md" },
      { type: "callout", title: "What untracked means", text: "An untracked file is not in the index or the current commit. Git can report its presence, but a normal commit will not include it until you stage it." },
    ],
  },
  {
    id: "edit-after-staging",
    heading: "Change the file after staging it.",
    paragraphs: [
      "Return to your editor. Add The Hobbit as a third line and save the file. Do not run git add again yet. Your current file should now look like this:",
    ],
    code: "# Reading list\n- Dune\n- The Hobbit",
    blocks: [
      { type: "command", command: "git status --short", explanation: "The two columns report two different comparisons. The file can be staged and also have a later unstaged edit.", output: "AM reading-list.md" },
      { type: "table", caption: "Reading AM in this example", columns: ["Column", "Letter", "Meaning"], rows: [["First", "A", "A new file is prepared for a commit."], ["Second", "M", "The working file differs from the index."]] },
      { type: "command", command: "git diff --staged\ngit diff", explanation: "Preview both differences. --staged shows the prepared change: the heading and Dune. Plain diff shows the later working-file change: The Hobbit. These commands only inspect. Press q if a scrolling viewer opens." },
    ],
  },
  {
    id: "record-and-check",
    heading: "Record the prepared version. Then inspect it.",
    paragraphs: [
      "Keep the second edit unstaged for this experiment. The message should describe the version you are actually recording. A useful message makes sense to someone reading the history later; “Start the reading list” fits the Dune-only version.",
    ],
    blocks: [
      { type: "command", command: 'git commit -m "Start the reading list"', explanation: "Record the staged snapshot. -m supplies the message directly, so Git does not open a message editor. The output includes a commit identifier; yours will differ from anyone else’s." },
      { type: "command", command: "git show HEAD:reading-list.md", explanation: "Read this file from the commit you just made. Here, HEAD refers to your current commit; the colon selects a path inside its snapshot. This does not replace the file in your editor.", output: "# Reading list\n- Dune" },
      { type: "command", command: "git status --short", explanation: "The first column is now blank: nothing new is staged. M in the second column says your working file still differs from the recorded version and index.", output: " M reading-list.md" },
      { type: "callout", title: "Open the file in your editor too", text: "The Hobbit is still there. You have just proved that a commit can record the prepared version while leaving a newer working file intact." },
    ],
  },
  {
    id: "record-the-next-change",
    heading: "Give the later edit its own moment.",
    paragraphs: [
      "When you are ready to record The Hobbit, stage the updated file and make a second commit. You do not need to reinitialize the repository. The history grows through another deliberate record.",
    ],
    blocks: [
      { type: "command", command: 'git add reading-list.md\ngit commit -m "Add The Hobbit"\ngit show HEAD:reading-list.md', explanation: "Prepare the newer contents, record them, then inspect the latest saved file. The example output below is from the final show command.", output: "# Reading list\n- Dune\n- The Hobbit" },
      { type: "command", command: "git status --short", explanation: "In this otherwise empty practice project, there should now be no output: no untracked files, no staged differences, and no unstaged differences." },
      { type: "details", title: "Does every commit contain only the files I just added?", paragraphs: ["No. The index describes a whole proposed project snapshot. In an existing project, unchanged tracked files remain part of it. Updating one file’s entry does not remove the others. A commit records the resulting snapshot, and Git can show its differences from an earlier snapshot.", "Our one-file example keeps that distinction easy to see. The next inspection guide will use status, diff, and log to answer different questions about a larger project."] },
    ],
  },
  {
    id: "avoid-the-shortcuts",
    heading: "A small habit prevents a large surprise.",
    paragraphs: [
      "Before each commit, ask two questions: what did I prepare, and what is still only in my current files? Inspect the staged difference, then choose a message that matches it. If the intended edit is missing, save the file and stage it again.",
      "Start with explicit filenames. git add . considers paths under the current directory, so it can prepare unrelated work too. It is useful when that whole selection is intentional, but it is not a requirement for making a commit.",
      "If Git says there is nothing to commit, that is a description, not an invitation to change random settings. You may already have recorded the change, forgotten to save your editor, or have changes that are not staged. Read status before deciding what to do next.",
    ],
    blocks: [{ type: "quiz", question: "You staged Dune, saved The Hobbit afterward, and ran git commit -m without staging again. Where is The Hobbit?", answers: [
      { text: "In the current file, but not in the new commit.", correct: true, explanation: "Yes. The index still described the Dune version when you committed. The newer line remains in your working file. Stage it when you want a later commit to include it." },
      { text: "In the commit, because I saved before committing.", correct: false, explanation: "Saving updates the working file. It does not refresh the staged version. The extra git add step is what would include The Hobbit in this commit." },
      { text: "Gone, because committing replaced my file.", correct: false, explanation: "This normal commit records the index; it does not overwrite your working file. The Hobbit remains available for your next change." },
    ] }],
  },
  {
    id: "take-the-model-with-you",
    heading: "Edit freely. Record deliberately.",
    paragraphs: ["You now have a complete local workflow: initialize once, edit and save, prepare the intended contents, inspect them, and record a commit. Those actions are separate so you can decide what belongs in each moment."],
    blocks: [{ type: "recap", items: ["Your working tree holds the files you are editing. Saving changes those files.", "git add updates the proposed snapshot with the selected file’s contents at that time.", "A normal git commit records the prepared snapshot. Later unstaged edits stay in your working files."] }],
  },
];
