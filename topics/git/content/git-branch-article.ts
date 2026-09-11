import type { ArticleSection } from "@/lib/articles";

export const gitBranchSections: ArticleSection[] = [
  {
    id: "not-a-copy", heading: "A branch is a label, not a copy of your project.",
    paragraphs: [
      "You have heard that branches are cheap and that you should make one for every change. You run git branch sci-fi and look in your folder. Nothing changed. Where is the branch?",
      "In a small file inside .git. A branch is a name that stores one commit ID. Creating one writes that ID down; it does not copy files, and it does not create a commit.",
      "This guide continues the reading-list project. Dune and The Hobbit are recorded in two commits, A and B. You should know how to commit and read git log. Nothing here needs a terminal until the walkthrough.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "If a branch is only a name, what actually moves when you commit, and what changes when you switch?" }],
  },
  {
    id: "head-and-labels", heading: "HEAD says which label moves.",
    paragraphs: [
      "Your repository starts with one branch, main. Its label sits on commit B, the latest snapshot. HEAD is Git’s note of where you are: normally it names a branch, and that branch names a commit.",
      "When you commit, Git creates the new snapshot with the current commit as its parent, then moves the branch HEAD names onto the new commit. No other label moves. That is the whole trick.",
      "git branch sci-fi creates a second label on B. Both labels now name the same commit. Nothing is different until you switch and commit.",
    ],
    blocks: [{ type: "table", caption: "Three words this guide uses", columns: ["Word", "What it is", "In the example"], rows: [
      ["Commit", "A recorded snapshot with a link to its parent", "A, B, C, D"],
      ["Branch", "A name that stores one commit ID and moves when you commit on it", "main, sci-fi"],
      ["HEAD", "The branch you are on: the label that will move next", "HEAD -> main"],
    ] }],
  },
  {
    id: "where-lines-split", heading: "Two labels, two directions.",
    paragraphs: [
      "Switch to sci-fi and commit Foundation. Commit C has parent B, and only sci-fi moves to C. main still says B. Switch back to main and commit Piranesi: commit D also has parent B, and only main moves.",
      "Now the history forks at B. Neither branch is ahead of the other; they went different ways from the same point. git log --graph draws it, and the fork point is simply the newest commit both labels can reach.",
      "Read the arrows from child to parent. C and D were created in that order, but neither knows about the other; each points back to B. The order you made commits is not the shape of the history.",
    ],
  },
  {
    id: "try-the-branches", heading: "Move the labels yourself.",
    paragraphs: [
      "Start on main at commit B. Create sci-fi, switch to it, and commit. Watch which label moves and what your file shows. Then switch back to main and commit again to fork the history.",
      "Try a second run: create sci-fi and commit without switching first. The commit lands on main, because HEAD never moved.",
    ],
    blocks: [{ type: "branch-playground" }],
  },
  {
    id: "switching-changes-files", heading: "Switching rewrites your working file.",
    paragraphs: [
      "When you switch, Git replaces the files in your folder with the snapshot of the target commit. Foundation appears when you are on sci-fi and disappears on main. Nothing is lost; each version is recorded on its branch.",
      "Uncommitted edits travel with you when they do not collide with the target. If a switch would overwrite an edited file, Git refuses and asks you to commit or stash first. The stash guide covers the shelf; for now, commit before you switch.",
    ],
    blocks: [{ type: "command", command: "git switch sci-fi", explanation: "Refused when your uncommitted edit touches a file that differs between the two branches. Nothing changed; commit first, then switch.", output: "error: Your local changes to the following files would be overwritten by checkout:\n\treading-list.md\nPlease commit your changes or stash them before you switch branches.\nAborting" }],
  },
  {
    id: "try-it-locally", heading: "Fork a history in a fresh folder.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-branches folder in your home folder. If that name already exists, choose an unused name in both commands. Your commit IDs will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-branches\ncd git-branches\ngit init --initial-branch=main", explanation: "Create a practice repository and stay on its starting branch, main." },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Replace the sample identity with your own. These settings apply only to this practice repository." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Record A and B. The -a option stages every tracked file that changed before committing; it never adds a new file." },
      { type: "command", command: "git branch\ncat .git/HEAD", explanation: "One branch, and HEAD names it. The star marks the branch you are on.", output: "* main\nref: refs/heads/main" },
      { type: "command", command: 'git branch sci-fi\ngit switch sci-fi\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"', explanation: "Create the label, move HEAD onto it, then commit. git switch -c sci-fi does the first two steps at once." },
      { type: "command", command: "git log --oneline --decorate --graph --all", explanation: "Still one straight line. HEAD -> sci-fi is on the newest commit; main stayed behind on B.", output: "* 7ab4c95 (HEAD -> sci-fi) Add Foundation\n* b8a41ab (main) Add The Hobbit\n* e290cb0 Start the reading list" },
      { type: "command", command: "git switch main\ncat reading-list.md", explanation: "Foundation is gone from the file, not from Git.", output: "Switched to branch 'main'\n# Reading list\n- Dune\n- The Hobbit" },
      { type: "command", command: 'printf "%s\\n" "- Piranesi" >> reading-list.md\ngit commit -am "Add Piranesi"\ngit log --oneline --decorate --graph --all', explanation: "Now the drawing forks at B. Without --all, git log follows only the branch you are on.", output: "* ea648aa (HEAD -> main) Add Piranesi\n| * 7ab4c95 (sci-fi) Add Foundation\n|/\n* b8a41ab Add The Hobbit\n* e290cb0 Start the reading list" },
    ],
  },
  {
    id: "rename-and-delete", heading: "Rename and delete are label operations too.",
    paragraphs: [
      "Renaming a branch changes the name and nothing else; the commits keep their IDs. Deleting a branch removes the label. The commits stay in the repository for a while, but nothing points at them any more, and Git may eventually discard them.",
      "git branch -d refuses when the branch has commits that its upstream branch cannot reach, or, when no upstream is set, that the current branch cannot reach. It also refuses to delete the branch you are on. The capital -D forces the deletion; use it when you are sure the work is not needed.",
    ],
    blocks: [
      { type: "command", command: "git branch -m sci-fi science-fiction\ngit branch", explanation: "Same label, new name. Foundation still has the same ID.", output: "* main\n  science-fiction" },
      { type: "command", command: "git branch -d science-fiction", explanation: "Refused: Foundation is reachable only from this label, so deleting it would strand the commit.", output: "error: the branch 'science-fiction' is not fully merged\nhint: If you are sure you want to delete it, run 'git branch -D science-fiction'" },
      { type: "command", command: "git branch -D science-fiction", explanation: "The label is gone. Git prints the commit it pointed at; the recovery guide shows how to bring such a commit back while it still exists.", output: "Deleted branch science-fiction (was 7ab4c95)." },
    ],
  },
  {
    id: "check-yourself", heading: "Predict where the commit lands.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "You are on main at commit B. You run git branch fix, edit the file, and commit. Where is the new commit?", answers: [
      { text: "On main. fix was created on B and never moved, because HEAD still named main.", correct: true, explanation: "Yes. git branch only writes a label. Until you switch, HEAD names main, so main is the label that moves." },
      { text: "On fix, because the newest branch receives new commits.", correct: false, explanation: "Creating a branch does not move HEAD. Only git switch, or git switch -c, changes which label will move." },
      { text: "On both, because they pointed at the same commit.", correct: false, explanation: "Labels that share a commit are still separate names. Committing moves exactly one: the one HEAD names." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with main on Piranesi and the sci-fi label deleted. The next guide starts fresh and brings two branches back together."],
    blocks: [{ type: "recap", items: [
      "A branch is a name storing one commit ID. Creating one copies nothing and commits nothing.",
      "Committing moves only the branch HEAD names. Switching moves HEAD and rewrites your files to that snapshot.",
      "Rename changes the name; delete removes the label. -d refuses to strand commits only that label can reach.",
    ] }],
  },
];
