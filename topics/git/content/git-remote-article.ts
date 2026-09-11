import type { ArticleSection } from "@/lib/articles";

export const gitRemoteSections: ArticleSection[] = [
  {
    id: "both-are-telling-the-truth", heading: "Sam pushed. Status says up to date. Both are right.",
    paragraphs: [
      "Sam says the reading list has a new book. You run git status and it says Your branch is up to date with 'origin/main'. Nothing arrived. Who is wrong?",
      "Nobody. Status is comparing your main with origin/main, and origin/main is not Sam’s repository. It is your own record of where Sam’s main was the last time you asked. You have not asked since.",
      "This guide continues the reading-list project with a second person, Sam. You should know that a branch is a label, that a merge can fast-forward, and what git log --decorate shows. Nothing here needs a network: Sam’s repository will be a folder on your computer.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "What does origin/main point at, what does git fetch change, and what does it leave alone?" }],
  },
  {
    id: "a-remote-is-a-repository", heading: "A remote is another repository with a nickname.",
    paragraphs: [
      "When you clone, Git copies the other repository’s history into a new repository of your own and remembers where it came from under the name origin. origin is only a nickname for an address: a folder path here, a URL on a hosting service later.",
      "Clone also creates your branch main, pointing at the same commit as theirs, and one extra label: origin/main. That label is a **remote-tracking branch**. It records where main was in origin the last time your repository talked to it.",
      "You cannot commit on origin/main. It moves only when Git talks to origin: fetch now, push in the next guide. Sam’s main moves when Sam commits. Your main moves when you commit. Three labels, three owners.",
    ],
    blocks: [{ type: "table", caption: "Three labels that all say main", columns: ["Label", "Lives in", "Moves when"], rows: [
      ["main", "Your repository", "You commit on it"],
      ["origin/main", "Your repository, read-only", "You fetch or push"],
      ["main in origin", "Sam’s repository", "Sam commits on it"],
    ] }],
  },
  {
    id: "fetch-updates-your-record", heading: "fetch updates your record, and nothing else.",
    paragraphs: [
      "git fetch contacts origin, downloads the commits you do not have yet, and moves origin/main to where Sam’s main is now. That is the whole command. It does not touch your main, your index, or your files.",
      "After a fetch you can look before you act. git log main..origin/main lists the commits they have that you do not. git show origin/main:reading-list.md prints their version of the file without changing yours.",
      "To bring their work into main, merge origin/main like any other branch. When you have not committed since the fork point, that is a fast-forward. git pull is fetch followed by merge; the next guide covers it, together with the upstream connection that lets you type it without arguments.",
    ],
    blocks: [{ type: "callout", title: "fetch takes a remote, not a branch", text: "git fetch origin fetches every branch of origin, and plain git fetch means the same for a cloned repository. git fetch main fails with 'main' does not appear to be a git repository, because main is a branch, not a remote. To fetch one branch, name both: git fetch origin main." }],
  },
  {
    id: "try-the-fetch", heading: "Let Sam move, then fetch.",
    paragraphs: [
      "Press Sam commits and read your status: still up to date, because your record has not changed. Fetch, and watch origin/main move while main and your file stay put. Then merge.",
      "Start over and commit yourself before fetching. Status says ahead. Let Sam commit and fetch again: the two labels have diverged, and the merge records a commit with two parents.",
    ],
    blocks: [{ type: "remote-playground" }],
  },
  {
    id: "read-the-status-sentence", heading: "Read the sentence about origin/main.",
    paragraphs: [
      "Every one of these sentences compares main with origin/main, your record. None of them knows what happened in Sam’s repository since your last fetch. git status --short --branch says the same thing in one line, such as ## main...origin/main [behind 1].",
    ],
    blocks: [{ type: "table", caption: "What status can say about origin/main", columns: ["Status says", "It means", "You can"], rows: [
      ["up to date with 'origin/main'", "main and your record point at the same commit", "Fetch, if you want fresh news"],
      ["behind 'origin/main' by 1 commit, and can be fast-forwarded", "Your record has commits main lacks, and you have none of your own since the fork point", "Merge origin/main: a fast-forward"],
      ["ahead of 'origin/main' by 1 commit", "You committed and your record has not moved; the commit exists only here", "Push, in the next guide"],
      ["have diverged, and have 1 and 1 different commits each", "Both moved since the fork point", "Merge origin/main: a merge commit, or a conflict if the same lines changed"],
    ] }],
  },
  {
    id: "try-it-locally", heading: "Two repositories in one folder.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-remotes folder in your home folder. Inside it, teammate stands for Sam’s repository and laptop for yours. Both are ordinary folders; Git does not care that the remote is on the same disk. Your commit IDs and paths will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-remotes\ncd git-remotes\ngit init --initial-branch=main teammate\ncd teammate", explanation: "Create Sam’s repository. A folder name after git init creates that folder for you." },
      { type: "command", command: 'git config set --local user.name "Sam Okafor"\ngit config set --local user.email "sam@example.com"', explanation: "Sam’s identity, for Sam’s repository only." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Sam records A and B." },
      { type: "command", command: "cd ..\ngit clone teammate laptop\ncd laptop", explanation: "Back in git-remotes, clone Sam’s repository into laptop. Git copies the history and remembers where it came from.", output: "Cloning into 'laptop'...\ndone." },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Your identity, in your clone. Replace the sample values with your own." },
      { type: "command", command: "git remote -v", explanation: "origin is a nickname for Sam’s folder. Yours shows your own home folder.", output: "origin\t/Users/maya/git-remotes/teammate (fetch)\norigin\t/Users/maya/git-remotes/teammate (push)" },
      { type: "command", command: "git branch --all\ngit log --oneline --decorate", explanation: "Your main and your record origin/main both sit on B. origin/HEAD notes which branch origin treats as its default; you can ignore it.", output: "* main\n  remotes/origin/HEAD -> origin/main\n  remotes/origin/main\n2a79574 (HEAD -> main, origin/main, origin/HEAD) Add The Hobbit\n8888650 Start the reading list" },
      { type: "command", command: 'cd ../teammate\nprintf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"\ncd ../laptop', explanation: "Play Sam: record C in Sam’s repository, then come back to yours." },
      { type: "command", command: "git status", explanation: "Still up to date. Status compares main with your record, and your record has not changed.", output: "On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean" },
      { type: "command", command: "git fetch", explanation: "Now Git asks. One line per label that moved: origin’s main went from B to C, so your origin/main follows.", output: "From /Users/maya/git-remotes/teammate\n   2a79574..0802009  main       -> origin/main" },
      { type: "command", command: "git status\ncat reading-list.md", explanation: "The sentence changed; the file did not. fetch moved your record and nothing else.", output: "On branch main\nYour branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.\n  (use \"git pull\" to update your local branch)\n\nnothing to commit, working tree clean\n# Reading list\n- Dune\n- The Hobbit" },
      { type: "command", command: "git log --oneline main..origin/main\ngit show origin/main:reading-list.md", explanation: "Look before you act: the commits they have that you do not, and their version of the file.", output: "0802009 Add Foundation\n# Reading list\n- Dune\n- The Hobbit\n- Foundation" },
      { type: "command", command: "git merge origin/main\ngit status --short --branch", explanation: "You had no commits of your own since B, so this is a fast-forward. main and origin/main meet on C, and the compact status shows no bracket.", output: "Updating 2a79574..0802009\nFast-forward\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\n## main...origin/main" },
      { type: "command", command: 'printf "# Reading list for 2026\\n- Dune\\n- The Hobbit\\n- Foundation\\n" > reading-list.md\ngit commit -am "Update the title"\ngit status --short --branch', explanation: "Your commit D exists only in your repository. origin/main stays on C until you push, which the next guide covers.", output: "## main...origin/main [ahead 1]" },
      { type: "details", title: "See the two labels diverge", paragraphs: [
        "Sam commits again while your D is still local. After the fetch, status reports both directions at once. Merging origin/main then records a merge commit, because both branches moved since the fork point.",
        "Ahead by two afterwards: your title commit and the merge commit. Both exist only in your repository.",
      ], commands: [
        { command: 'cd ../teammate\nprintf "%s\\n" "- Neuromancer" >> reading-list.md\ngit commit -am "Add Neuromancer"\ncd ../laptop\ngit fetch\ngit status --short --branch', explanation: "Sam’s second commit, fetched into your record.", output: "From /Users/maya/git-remotes/teammate\n   0802009..d887928  main       -> origin/main\n## main...origin/main [ahead 1, behind 1]" },
        { command: "git log --oneline --decorate --graph --all", explanation: "Your D and Sam’s Neuromancer commit both grow from C.", output: "* 5f3de35 (HEAD -> main) Update the title\n| * d887928 (origin/main, origin/HEAD) Add Neuromancer\n|/\n* 0802009 Add Foundation\n* 2a79574 Add The Hobbit\n* 8888650 Start the reading list" },
        { command: "git merge --no-edit origin/main\ngit status --short --branch", explanation: "A merge commit with parents D and Sam’s commit. --no-edit keeps Git’s message, Merge remote-tracking branch 'origin/main'.", output: "Auto-merging reading-list.md\nMerge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\n## main...origin/main [ahead 2]" },
      ] },
    ],
  },
  {
    id: "check-yourself", heading: "Predict the status.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "Sam committed in origin an hour ago. You have not run git fetch since. git status says Your branch is up to date with 'origin/main'. What is true?", answers: [
      { text: "origin/main has not moved because you have not fetched. Status compares main with your record, not with Sam’s repository.", correct: true, explanation: "Yes. origin/main is a note in your repository. Until fetch updates it, status has no way to know that origin changed." },
      { text: "Git checked origin when you ran status and found nothing new.", correct: false, explanation: "status never contacts a remote. Only fetch, pull, and push talk to origin." },
      { text: "Sam’s commit was lost.", correct: false, explanation: "It is safe in Sam’s repository. Fetch, and it appears under origin/main." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with two commits that exist only in laptop. The next guide sends them to origin and sets up the connection that makes push and pull work without arguments."],
    blocks: [{ type: "recap", items: [
      "origin is a nickname for another repository. origin/main is your record of where its main was at your last fetch, not a live view.",
      "git fetch moves that record and downloads the commits. main and your files stay exactly as they were until you merge.",
      "Status compares main with origin/main: up to date, behind, ahead, or diverged. None of those sentences knows what happened in origin since you last fetched.",
    ] }],
  },
];
