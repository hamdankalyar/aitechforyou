import type { ArticleSection } from "./articles";

export const gitInspectionSections: ArticleSection[] = [
  {
    id: "ask-the-right-question", heading: "An empty answer can still be correct.",
    paragraphs: [
      "You edit a file, stage it, and run git diff. Nothing appears. Did Git forget your work? No: you asked about changes that have not been staged. Your edit is already prepared, so it belongs in a different comparison.",
      "Git’s inspection commands become much easier to read when you start with the question, rather than the command. Status tells you where changes are. Diff shows what changed between two versions. Log takes you into recorded history.",
      "This guide continues the reading-list project from the first-commit guide. You should already know that saving updates your working file, staging prepares contents, and committing records the prepared version. You can explore everything on this page without running commands; a terminal walkthrough follows the example.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "How can the same file have staged changes, unstaged changes, and a perfectly valid empty diff?" }],
  },
  {
    id: "name-the-endpoints", heading: "Know which two versions you are reading.",
    paragraphs: [
      "Your working tree contains the files you can open and edit. The staging area, also called the index, describes the proposed next snapshot. Your latest commit contains the version already recorded.",
      "HEAD names your current commit. Throughout this example we stay on one branch, so HEAD is the latest commit on that line of work. You do not need to memorize branch diagrams yet; just read HEAD as the recorded version we started from.",
      "A diff compares two endpoints. It does not tell the whole story of how you got from one to the other. The arrows below mean compare from this version to that version; they do not move any files.",
    ],
    blocks: [{ type: "table", caption: "Choose the comparison that matches your question", columns: ["Question", "Command", "Compare from → to"], rows: [
      ["What edits are still unstaged?", "git diff", "Index → working tree"],
      ["What am I about to record?", "git diff --staged", "HEAD → index"],
      ["What is different in my files since the last commit?", "git diff HEAD", "HEAD → working tree"],
    ] }],
  },
  {
    id: "read-status", heading: "Status is a map of your current work.",
    paragraphs: [
      "Start with git status when you feel lost. Its normal output groups paths under descriptions such as Changes to be committed, Changes not staged for commit, and Untracked files. The same tracked file can appear in both change groups.",
      "For our example, Dune is committed. We add The Hobbit and stage it, then add Piranesi and save without staging again. The file is already tracked, so both differences are modifications.",
    ],
    blocks: [
      { type: "command", command: "git status --short", explanation: "The compact version puts two status columns before each path.", output: "MM reading-list.md" },
      { type: "table", caption: "Read the two columns separately", columns: ["Display", "First column: index vs HEAD", "Second column: file vs index"], rows: [
        ["MM", "Modified and staged", "Modified again after staging"],
        ["M followed by a space", "Modified and staged", "No later unstaged difference"],
        ["A space followed by M", "No staged difference", "An unstaged modification"],
        ["??", "Special case: an untracked path", "Not yet in the proposed snapshot"],
      ] },
      { type: "callout", title: "Two differences, one file", text: "MM does not mean Git has made duplicate files. It reports two comparisons of the same path. This reading applies to ordinary changes; merge conflicts use their own status codes, which the conflict guide will introduce." },
    ],
  },
  {
    id: "try-the-inspector", heading: "Ask the same project four questions.",
    paragraphs: [
      "The example begins after a commit, a staged edit, and a later saved edit. Select a question to see the corresponding command and its result. The three file panels remain visible so you can check the answer yourself.",
      "Try Stage current file while viewing plain diff. The output disappears because the compared versions now match. Switch to What would I commit? to find both prepared additions. Start over and try committing first instead: only The Hobbit is recorded, while Piranesi stays unstaged.",
    ],
    blocks: [{ type: "inspection-playground" }],
  },
  {
    id: "read-a-patch", heading: "Read the changed lines before the machinery.",
    paragraphs: [
      "A patch is Git’s textual description of a difference. In a normal text diff, lines beginning with + are added on the destination side, lines beginning with - are removed from the starting side, and a leading space marks unchanged context. Replacing a line usually appears as one removal and one addition.",
      "Our file is a Markdown list, so a book already begins with a hyphen. In the excerpt below, the very first character is Git’s marker. The next hyphen belongs to the file itself. Read +- Piranesi as: add the line whose contents are - Piranesi.",
    ],
    code: "@@ -1,3 +1,4 @@\n # Reading list\n - Dune\n - The Hobbit\n+- Piranesi",
    blocks: [{ type: "details", title: "What about the headers and @@ numbers?", paragraphs: [
      "The full output begins with paths and metadata. The --- and +++ lines identify the old and new sides; they are headers, not removed and added lines of your document. The a/ and b/ path prefixes distinguish sides and do not require folders named a and b.",
      "A group of nearby changed lines is called a hunk. Here, @@ -1,3 +1,4 @@ describes an old range starting at line 1 and spanning 3 lines, and a new range starting at line 1 and spanning 4 lines. The letters and numbers on an index header identify file contents, rather than the commit you are about to create.",
    ] }],
  },
  {
    id: "try-it-locally", heading: "Recreate the three versions in a fresh folder.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These examples were checked with Git 2.50.1. Use Git 2.50 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-inspection folder in your home folder. If that name already exists, choose an unused name in both commands. This independent exercise starts with Dune recorded so it exactly matches the interactive example.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-inspection\ncd git-inspection\ngit init --initial-branch=main", explanation: "Create a practice repository and stay on its starting branch, main." },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Replace the sample identity with your own. These settings apply only to this practice repository." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"', explanation: "In the fresh practice folder, write the initial file, stage it, and record Dune. printf writes text; > creates or replaces this file. The escaped n characters produce new lines." },
      { type: "command", command: 'printf "%s\\n" "- The Hobbit" >> reading-list.md\ngit add reading-list.md\nprintf "%s\\n" "- Piranesi" >> reading-list.md', explanation: "Append The Hobbit and stage it, then append Piranesi without staging again. >> appends instead of replacing the file. Nothing printing here is normal." },
    ],
  },
  {
    id: "inspect-before-committing", heading: "Check each answer before you commit.",
    paragraphs: [
      "Run these inspection commands inside git-inspection. They do not stage or commit anything. If a scrolling viewer opens, press q to return to your terminal. In these commands, -- separates options or revisions from the file path.",
    ],
    blocks: [
      { type: "command", command: "git status --short", explanation: "Expect MM: The Hobbit is staged; Piranesi is not.", output: "MM reading-list.md" },
      { type: "command", command: "git diff -- reading-list.md", explanation: "Expect only Piranesi as an added line. This compares your working file with the index." },
      { type: "command", command: "git diff --staged -- reading-list.md", explanation: "Expect only The Hobbit as an added line. This previews the change prepared for a normal commit." },
      { type: "command", command: "git diff HEAD -- reading-list.md", explanation: "Expect both books as added lines. This compares the current file with the recorded Dune version." },
      { type: "command", command: 'git commit -m "Add The Hobbit"\ngit status --short', explanation: "Commit without staging again. The final status has a blank first column and M in the second: Piranesi is still unstaged.", output: " M reading-list.md" },
    ],
  },
  {
    id: "read-recorded-history", heading: "Log tells the story you have actually recorded.",
    paragraphs: [
      "Your project now has two commits. Plain git log lists commit IDs, authors, dates, and messages. The --oneline form gives you a compact list with an abbreviated ID and the message’s first line. In this simple history, the newest commit comes first. Your IDs will differ from the illustrative ones below.",
      "Piranesi is still in your file, but it has no commit in the log. History describes recorded moments. It does not list every save, staged edit, or untracked file. By default, log follows history from HEAD; it is not a list of every commit on every possible branch.",
    ],
    blocks: [
      { type: "command", command: "git log --oneline --max-count=2", explanation: "Look for the messages from your two commits.", output: "d4e5f6a Add The Hobbit\na1b2c3d Start the reading list" },
      { type: "command", command: "git show HEAD:reading-list.md", explanation: "Read the file stored in the current commit. The output has no Piranesi, even though your editor still shows it.", output: "# Reading list\n- Dune\n- The Hobbit" },
      { type: "command", command: "git diff HEAD~1 HEAD -- reading-list.md", explanation: "HEAD~1 means the first parent of HEAD: the previous commit in this straight history. Comparing the two commits shows The Hobbit added. Unlike git diff HEAD~1 with only one revision, this command does not compare against your working file." },
      { type: "details", title: "A few useful history views for later", paragraphs: ["Use these when the basic log feels familiar. --decorate adds reference labels such as branch names; --graph draws how histories connect. --parents includes parent IDs. These become more useful in the branches and merge guides. An abbreviated ID must be long enough to identify a commit unambiguously; seven characters is not a universal guarantee."], commands: [
        { command: "git log --oneline --decorate --graph", explanation: "Show a compact history with labels and connection lines. Our current history is still a straight line." },
        { command: "git log --oneline --parents", explanation: "Show each commit followed by its parent IDs and message. A root commit has no parent; a merge can have multiple parents." },
      ] },
    ],
  },
  {
    id: "avoid-empty-diff-traps", heading: "No output means these sides match.",
    paragraphs: [
      "An empty plain diff means there is no difference to report between the working tree and index for the paths being compared. It does not prove there are no staged changes. Check staged diff before deciding that everything is committed.",
      "An untracked file can appear in status while being absent from these diff views. The ordinary commands here do not include its contents until Git starts tracking it. Ignored files are normally omitted from status too. Clean status is useful, but it does not mean every file on your computer is recorded or backed up online.",
      "Diff HEAD reports the net difference between two endpoints. Imagine staging an added line and then removing that line from your working file. The working file can match HEAD again, making diff HEAD empty, while staged diff still contains an addition and plain diff contains its removal. Ask about the index whenever you want to know what a commit would record.",
    ],
    blocks: [{ type: "quiz", question: "You stage all your edits. Plain git diff is empty, but git diff --staged shows additions. What does this mean?", answers: [
      { text: "The edits are prepared but have not been committed.", correct: true, explanation: "Yes. Your working file matches the index, while the index differs from HEAD. A normal commit will record the prepared version." },
      { text: "Git committed automatically when I staged.", correct: false, explanation: "git add prepares contents. It does not create a commit. The staged diff proves there is still a change waiting to be recorded." },
      { text: "The saved changes have disappeared.", correct: false, explanation: "The changes are still in the file and index. Plain diff is empty because those two versions match, not because Git lost the edit." },
    ] }],
  },
  {
    id: "keep-a-small-routine", heading: "Turn inspection into a small routine.",
    paragraphs: ["Start with status, inspect the unstaged difference, and preview the staged difference before committing. Use log when the question concerns recorded history. Your practice folder intentionally ends with Piranesi unstaged; you can stage and commit it later using the workflow you already know."],
    blocks: [{ type: "recap", items: ["Status locates changes. Its two columns can describe two differences in the same file.", "Diff answers a comparison question. Choose the endpoints before interpreting an empty result.", "Log follows recorded history. Saving or staging alone does not add an entry."] }],
  },
];
