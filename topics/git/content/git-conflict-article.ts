import type { ArticleSection } from "@/lib/articles";

export const gitConflictSections: ArticleSection[] = [
  {
    id: "git-stopped", heading: "Git stopped. That is the feature.",
    paragraphs: [
      "You run git merge sci-fi and instead of Merge made by… you get CONFLICT. Your file now contains strange lines of angle brackets. Did the merge break something?",
      "No. Git merged every line it could and stopped at the lines it cannot decide. Nothing has been committed. You are in the middle of a merge, and Git is waiting for one thing: your answer.",
      "This guide continues the reading-list project from the merge guide. You should know that a merge compares both branches with the fork point, and that a merge commit has two parents.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "What is Git asking when it says CONFLICT, and how do you answer without losing either side?" }],
  },
  {
    id: "why-git-cannot-decide", heading: "A conflict is two answers to one question.",
    paragraphs: [
      "Git compares each branch with the fork point, B. main added Piranesi right after The Hobbit. sci-fi added Foundation in exactly the same place. Two different changes to the same spot: Git has no rule that says which comes first, or whether both belong.",
      "When the two branches change different parts of the file, as in the previous guide, Git combines them without asking. Only the same lines, or lines right next to each other, produce a conflict. Everything else in the file is already merged.",
      "So a conflict is not an error and not a broken file. It is a precise question: for these lines, what should the final text be?",
    ],
    blocks: [{ type: "table", caption: "Three versions in every conflict", columns: ["Version", "Where it comes from", "In this example"], rows: [
      ["Base", "The fork point, commit B", "Dune, The Hobbit"],
      ["Ours", "The branch you are on: main, at D. Git labels it HEAD", "…plus Piranesi"],
      ["Theirs", "The branch you are merging in: sci-fi, at C", "…plus Foundation"],
    ] }],
  },
  {
    id: "read-the-markers", heading: "Read the markers as a question.",
    paragraphs: [
      "Git writes both answers into the file, one after the other, fenced by three marker lines. Everything outside the markers is already merged and needs no attention.",
      "To answer, replace the whole block, markers included, with the text you want: one side, the other, both in either order, or something new. The markers are only text; your editor will not stop you from leaving them in, and neither will Git.",
    ],
    code: "# Reading list\n- Dune\n- The Hobbit\n<<<<<<< HEAD\n- Piranesi\n=======\n- Foundation\n>>>>>>> sci-fi",
    blocks: [{ type: "bullets", items: [
      { label: "<<<<<<< HEAD", text: "Starts your side. The lines that follow are what main has here." },
      { label: "=======", text: "Divides the two sides." },
      { label: ">>>>>>> sci-fi", text: "Ends their side. The lines above it are what sci-fi has here." },
    ] }],
  },
  {
    id: "try-the-conflict", heading: "Answer the question, then finish or abort.",
    paragraphs: [
      "The example starts the moment the merge stops. Read the base, ours, and theirs panels, then choose what the final lines should be. Stage the file, and finish the merge. Then start over and abort instead.",
      "Try finishing before staging to see the refusal. Try leaving the markers in, check for them, then finish anyway to see that Git records exactly what you staged.",
    ],
    blocks: [{ type: "conflict-playground" }],
  },
  {
    id: "finish-or-abort", heading: "Two ways out, both safe.",
    paragraphs: [
      "**Abort** with git merge --abort. Git puts main, the index, and your file back the way they were before the merge. Nothing is lost, because both branches still have their own commits.",
      "**Finish** in three steps. Edit the file to the final text. Run git add on it: that is how you tell Git the conflict in this file is resolved; Git does not read the content to decide. Then run git merge --continue, which records a merge commit with two parents, exactly like a merge without a conflict.",
      "Until that last step, nothing is recorded. You can edit again, stage again, or abort at any point. If several files conflict, resolve and stage each one; git status lists what is still unmerged.",
    ],
  },
  {
    id: "try-it-locally", heading: "Cause a conflict, abort it, then answer it.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-conflict folder in your home folder. If that name already exists, choose an unused name in both commands. Your commit IDs will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-conflict\ncd git-conflict\ngit init --initial-branch=main", explanation: "Create a practice repository and stay on its starting branch, main." },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Replace the sample identity with your own. These settings apply only to this practice repository." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Record A and B on main." },
      { type: "command", command: 'git switch -c sci-fi\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"', explanation: "On sci-fi, append Foundation after The Hobbit." },
      { type: "command", command: 'git switch main\nprintf "%s\\n" "- Piranesi" >> reading-list.md\ngit commit -am "Add Piranesi"', explanation: "On main, append Piranesi in the same place. Same spot, different text: the ingredients of a conflict." },
      { type: "command", command: "git merge sci-fi", explanation: "Git merges what it can and stops. No commit was made; you are in the middle of a merge until you finish or abort it.", output: "Auto-merging reading-list.md\nCONFLICT (content): Merge conflict in reading-list.md\nAutomatic merge failed; fix conflicts and then commit the result." },
      { type: "command", command: "git status --short\ncat reading-list.md", explanation: "UU means unmerged on both sides. The file holds both versions between the markers.", output: "UU reading-list.md\n# Reading list\n- Dune\n- The Hobbit\n<<<<<<< HEAD\n- Piranesi\n=======\n- Foundation\n>>>>>>> sci-fi" },
      { type: "command", command: "git merge --abort\ngit status --short\ncat reading-list.md", explanation: "Abort first, to see that it is safe. Status prints nothing, the markers are gone, and main is back on Piranesi. sci-fi still has Foundation.", output: "# Reading list\n- Dune\n- The Hobbit\n- Piranesi" },
      { type: "command", command: "git merge sci-fi", explanation: "Run the same merge again. Same conflict, same markers. This time we answer it.", output: "Auto-merging reading-list.md\nCONFLICT (content): Merge conflict in reading-list.md\nAutomatic merge failed; fix conflicts and then commit the result." },
      { type: "details", title: "Look at the three versions Git is holding", paragraphs: [
        "During a conflict the index holds three copies of the file: stage 1 is the base, stage 2 is your side, and stage 3 is theirs. git show can print any of them, and git log --merge lists the commits on each side that touched the file.",
        "git restore --theirs replaces the working file with sci-fi’s whole version; --ours gives main’s. That answers the question by discarding the other side’s change to this file, so use it only when that is what you want. Here it would drop Piranesi, so we write the combined version in the next step.",
      ], commands: [
        { command: "git log --merge --oneline", explanation: "The commits on each side that changed the conflicted file.", output: "2be6222 Add Piranesi\n39fd449 Add Foundation" },
        { command: "git show :3:reading-list.md", explanation: "sci-fi’s whole version. :1: is the base and :2: is main’s.", output: "# Reading list\n- Dune\n- The Hobbit\n- Foundation" },
        { command: "git restore --theirs -- reading-list.md\ncat reading-list.md\ngit status --short", explanation: "The markers are gone and the file is sci-fi’s version, but status is still UU: only git add marks a file resolved. The next step overwrites this choice.", output: "# Reading list\n- Dune\n- The Hobbit\n- Foundation\nUU reading-list.md" },
      ] },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n- The Hobbit\\n- Piranesi\\n- Foundation\\n" > reading-list.md\ngit diff --check', explanation: "Write the final version: both books, no markers. You could instead open the file in your editor, delete the three marker lines, and save. git diff --check prints nothing when no marker is left; otherwise it lists each line that still has one." },
      { type: "command", command: "git add reading-list.md\ngit status --short", explanation: "Staging tells Git the conflict in this file is resolved. Status now shows an ordinary staged modification.", output: "M  reading-list.md" },
      { type: "command", command: "git merge --continue", explanation: "Finish the merge. Your editor opens with Git’s prepared message, Merge branch 'sci-fi'; save and close it to record the commit. To skip the editor, run git commit --no-edit instead.", output: "[main 1f82d65] Merge branch 'sci-fi'" },
      { type: "command", command: "git log --oneline --parents --max-count=1\ncat reading-list.md", explanation: "A merge commit with two parents, exactly like a merge without a conflict. The only difference is that you wrote the final lines.", output: "1f82d65 2be6222 39fd449 Merge branch 'sci-fi'\n# Reading list\n- Dune\n- The Hobbit\n- Piranesi\n- Foundation" },
    ],
  },
  {
    id: "mistakes-git-will-not-catch", heading: "Mistakes Git will not catch for you.",
    paragraphs: [
      "Git checks that you staged the file, not what is in it. Three habits keep the common mistakes out of your history.",
    ],
    blocks: [
      { type: "bullets", items: [
        { label: "Leftover markers", text: "A file with <<<<<<< inside stages and commits without complaint. Run git diff --check before git add; it names every line that still holds a marker." },
        { label: "A whole side taken blindly", text: "git restore --ours or --theirs discards the other side’s change to that file. Read both sides first; the answer is often both." },
        { label: "Finishing before staging", text: "git merge --continue refuses with Committing is not possible because you have unmerged files. Stage each resolved file, then finish." },
      ] },
      { type: "details", title: "Show the base between the markers", paragraphs: [
        "With the zdiff3 conflict style, Git adds a third section, starting with |||||||, that shows what the fork point had. Seeing the base makes it easier to tell what each side changed. Here the base section is empty, because both sides added lines where there was nothing.",
        "Set it once for every repository, or pass it for one merge with git -c merge.conflictStyle=zdiff3 merge sci-fi.",
      ], code: "git config set --global merge.conflictStyle zdiff3\n\n<<<<<<< HEAD\n- Piranesi\n||||||| 1c97820\n=======\n- Foundation\n>>>>>>> sci-fi" },
    ],
  },
  {
    id: "check-yourself", heading: "Predict the status.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "During a merge, git status --short shows UU reading-list.md. You open the file, delete the markers, keep both lines, and save. You run git status --short again. What does it show?", answers: [
      { text: "Still UU. Git does not know you are done until you git add the file.", correct: true, explanation: "Yes. Saving changes the working file only. git add marks the conflict resolved, and only then does the first column change to M." },
      { text: "M  reading-list.md, because saving a clean file marks it resolved.", correct: false, explanation: "Git never reads the file to decide. The M appears after git add, whatever the content." },
      { text: "Nothing. The merge finished when you saved.", correct: false, explanation: "A merge finishes only when git merge --continue or git commit records the merge commit. Until then you are still merging." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with the conflict resolved and both books recorded. The next guide adds a second copy of the project: a remote."],
    blocks: [{ type: "recap", items: [
      "CONFLICT means Git needs your answer for specific lines. Everything else is already merged, and nothing is committed yet.",
      "Read <<<<<<< HEAD as your side, ======= as the divider, and >>>>>>> sci-fi as theirs. Replace the whole block with the final text.",
      "git add marks a file resolved, git merge --continue records the merge, and git merge --abort returns to before the merge. Git does not look for leftover markers; git diff --check does.",
    ] }],
  },
];
