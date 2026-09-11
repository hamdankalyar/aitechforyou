import type { ArticleSection } from "@/lib/articles";

export const gitMergeSections: ArticleSection[] = [
  {
    id: "two-labels-one-list", heading: "Two labels went different ways. Now what?",
    paragraphs: [
      "Foundation is recorded on sci-fi. main may have moved on in the meantime. You want main to have Foundation too, without retyping anything and without losing what main did.",
      "That is a merge: from the branch that should receive the change, run git merge with the name of the branch to bring in. Git works out the rest, and the shape of the result depends on one question.",
      "This guide continues the reading-list project from the branches guide. You should know that a branch is a label on a commit, that HEAD names the branch you are on, and that committing moves only that label.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "Why does the same git merge sometimes create a commit and sometimes not, and what does the commit it creates contain?" }],
  },
  {
    id: "the-ancestor-question", heading: "Git asks first: is main simply behind?",
    paragraphs: [
      "Git starts by finding the newest commit both branches can reach, the fork point. In our history that is B. Then it compares each branch with that point.",
      "If main is still at B, main is simply behind sci-fi. Everything sci-fi has is already built on top of main’s commit, so Git moves the main label forward to C. Nothing new is recorded. Git calls this a **fast-forward**.",
      "If main has its own commit D, neither branch contains the other. Git builds a new snapshot that has both changes since B and records it as a **merge commit** whose parents are D and C. Both branches keep their history; main now points at the join.",
      "If both branches changed the same lines, Git cannot decide for you. It stops, marks the file, and asks. That is the next guide; the example here changes different lines on purpose.",
    ],
    blocks: [{ type: "table", caption: "Two shapes from one command", columns: ["Situation", "What Git does", "In history"], rows: [
      ["main is still at the fork point", "Moves the main label to sci-fi’s commit", "No new commit; one straight line"],
      ["main has its own new commit", "Combines both changes into a new snapshot", "A merge commit with two parents"],
      ["Both changed the same lines", "Stops and asks you to resolve the file", "Nothing recorded until you finish"],
    ] }],
  },
  {
    id: "what-a-merge-commit-holds", heading: "A merge commit is a normal commit with two parents.",
    paragraphs: [
      "Its snapshot is a whole file, like any commit: the new title from D and Foundation from C. Git did not pick a side. It took the changes each branch made since B and applied both.",
      "Its first parent is the commit main was on, D. Its second parent is the commit you merged in, C. Git’s default message is Merge branch 'sci-fi'. The common case has two parents; Git can record more when several branches are merged at once, which you will rarely need.",
      "The merged branch does not move. After the merge, sci-fi still points at C. Merging copies nothing and deletes nothing; it records how two lines of work came together and moves the label you were on.",
    ],
  },
  {
    id: "try-the-merge", heading: "Merge the same branch under two conditions.",
    paragraphs: [
      "Start with main at the fork point and merge: watch the label slide forward. Then move main on to its own commit and merge again: a new commit E appears with two parents. Compare the two graphs.",
      "Try --ff-only when main has moved, and --no-ff when it has not. Then delete sci-fi before and after a merge to see when Git lets a label go.",
    ],
    blocks: [{ type: "merge-playground" }],
  },
  {
    id: "try-it-locally", heading: "Run both merges in a fresh folder.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-merge folder in your home folder. If that name already exists, choose an unused name in both commands. Your commit IDs will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-merge\ncd git-merge\ngit init --initial-branch=main", explanation: "Create a practice repository and stay on its starting branch, main." },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Replace the sample identity with your own. These settings apply only to this practice repository." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Record A and B on main." },
      { type: "command", command: 'git switch -c sci-fi\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"', explanation: "Create sci-fi and switch to it in one step, then record Foundation there." },
      { type: "command", command: 'git switch main\nprintf "# Reading list for 2026\\n- Dune\\n- The Hobbit\\n" > reading-list.md\ngit commit -am "Update the title"', explanation: "Back on main, rewrite the file with a new first line. printf replaces the whole file, but Git compares lines, so this commit changes only the title." },
      { type: "command", command: "git log --oneline --decorate --graph --all", explanation: "The history forks at B. Neither branch contains the other.", output: "* 82f09c1 (HEAD -> main) Update the title\n| * 79f2b39 (sci-fi) Add Foundation\n|/\n* 453e519 Add The Hobbit\n* 4905cc4 Start the reading list" },
      { type: "command", command: "git merge --ff-only sci-fi", explanation: "Ask for a fast-forward only. Git refuses, after a hint suggesting a merge commit or a rebase: main has its own commit, so the label cannot simply slide forward. Nothing changed.", output: "fatal: Not possible to fast-forward, aborting." },
      { type: "command", command: "git merge --no-edit sci-fi", explanation: "Merge for real. --no-edit accepts Git’s default message; without it, Git opens your editor so you can adjust the message first. Auto-merging means both branches changed reading-list.md and Git combined the lines. ort is the name of Git’s default merge strategy; older versions print recursive.", output: "Auto-merging reading-list.md\nMerge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
      { type: "command", command: "cat reading-list.md", explanation: "The file has the new title and Foundation.", output: "# Reading list for 2026\n- Dune\n- The Hobbit\n- Foundation" },
      { type: "command", command: "git log --oneline --decorate --graph --all", explanation: "The merge commit joins both lines. sci-fi still points at Foundation.", output: "*   8ec6893 (HEAD -> main) Merge branch 'sci-fi'\n|\\\n| * 79f2b39 (sci-fi) Add Foundation\n* | 82f09c1 Update the title\n|/\n* 453e519 Add The Hobbit\n* 4905cc4 Start the reading list" },
      { type: "command", command: "git log --oneline --parents --max-count=1", explanation: "The merge commit lists two parents: the commit main was on, then the commit you merged in.", output: "8ec6893 82f09c1 79f2b39 Merge branch 'sci-fi'" },
      { type: "command", command: 'git switch -c fantasy\nprintf "%s\\n" "- Earthsea" >> reading-list.md\ngit commit -am "Add Earthsea"\ngit switch main\ngit merge fantasy', explanation: "A second branch with one commit, and main untouched in the meantime. This time Git fast-forwards: main moves to Earthsea and no commit is created. Updating shows the from and to IDs.", output: "Updating 8ec6893..a893ea5\nFast-forward\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
      { type: "command", command: "git log --oneline --decorate --graph --all", explanation: "main and fantasy share the top commit. Nothing in the graph marks the fast-forward; only the merge commit below records a join.", output: "* a893ea5 (HEAD -> main, fantasy) Add Earthsea\n*   8ec6893 Merge branch 'sci-fi'\n|\\\n| * 79f2b39 (sci-fi) Add Foundation\n* | 82f09c1 Update the title\n|/\n* 453e519 Add The Hobbit\n* 4905cc4 Start the reading list" },
      { type: "command", command: "git branch -d sci-fi fantasy", explanation: "Both branches are fully merged into main, so -d removes the labels. The commits stay; only the names go.", output: "Deleted branch sci-fi (was 79f2b39).\nDeleted branch fantasy (was a893ea5)." },
    ],
  },
  {
    id: "choose-the-shape", heading: "You can insist on one shape.",
    paragraphs: [
      "--ff-only says: move the label or do nothing. It is the safe choice when you only want to catch up and never want a surprise merge commit. The pull guide comes back to it.",
      "--no-ff says: record a merge commit even when a fast-forward is possible. Some teams prefer it because the merge commit marks where a piece of work began and ended; a fast-forward leaves no such mark.",
    ],
    blocks: [{ type: "details", title: "Record a merge commit even when a fast-forward is possible", paragraphs: [
      "The message is still Git’s default, Merge branch 'poetry'. Because only one branch changed the file, Git does not print Auto-merging.",
      "In the graph, the poetry commit sits on a short side line that joins back into main, exactly like sci-fi did, even though main never moved.",
    ], commands: [
      { command: 'git switch -c poetry\nprintf "%s\\n" "- Beowulf" >> reading-list.md\ngit commit -am "Add Beowulf"\ngit switch main\ngit merge --no-ff --no-edit poetry', explanation: "Same setup as fantasy, different flag: a merge commit with parents Earthsea and Beowulf.", output: "Merge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
    ] }],
  },
  {
    id: "check-yourself", heading: "Predict the shape.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "You are on main. main has not changed since you created fix, and fix has two new commits. You run git merge fix. What happens?", answers: [
      { text: "Git moves main to fix’s latest commit. No merge commit is created.", correct: true, explanation: "Yes. main’s commit is the fork point, so this is a fast-forward. History stays a straight line, and fix still points at the same commit." },
      { text: "Git creates a merge commit with two parents.", correct: false, explanation: "A merge commit appears only when both branches moved since the fork point, or when you ask for one with --no-ff." },
      { text: "Git copies fix’s commits onto main with new IDs.", correct: false, explanation: "That describes a rebase, which the series covers later. A fast-forward reuses the same commits; only the label moves." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with everything merged into main and the side labels deleted. The next guide makes both branches change the same lines, so Git has to stop and ask."],
    blocks: [{ type: "recap", items: [
      "Run git merge from the branch that should receive the change. It moves that label only; the merged branch stays where it was.",
      "If your branch is at the fork point, Git fast-forwards: the label moves and no commit is made. If both moved, Git records a merge commit with two parents.",
      "--ff-only refuses anything but a fast-forward; --no-ff records a merge commit anyway. Once a branch is merged, -d can delete its label.",
    ] }],
  },
];
