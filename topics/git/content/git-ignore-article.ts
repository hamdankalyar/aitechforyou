import type { ArticleSection } from "@/lib/articles";

export const gitIgnoreSections: ArticleSection[] = [
  {
    id: "the-rule-that-did-nothing", heading: "You wrote the rule. Git still lists the file.",
    paragraphs: [
      "Your project has a .env file holding a practice API key. You add .env to .gitignore, edit the key, and run git status. There it is: modified. Did Git ignore your ignore file?",
      "No. The rule is fine. The file was committed before the rule existed, and ignore rules only speak about files Git is not yet tracking.",
      "This guide continues the reading-list project. You should know how to stage, commit, and read status. Nothing here needs a terminal until the walkthrough near the end.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "Why does a correct .gitignore rule sometimes change nothing, and how do you predict which paths a rule matches?" }],
  },
  {
    id: "three-kinds-of-paths", heading: "Every path is tracked, untracked, or ignored.",
    paragraphs: [
      "Git sorts the paths in your folder into three groups. A **tracked** file is in the index: it was staged or committed at some point. An **untracked** file exists on disk, but Git has never recorded it. An **ignored** file is untracked and matches an ignore rule, so status stops mentioning it.",
      "Ignore rules move paths between the last two groups only. They never touch the first group. That is the whole answer to the opening question: .env was tracked, so the rule had nothing to say about it.",
      "Ignored does not mean deleted or hidden from you. The file is still in your folder. It is left out of status, and out of git add when you add a folder or a pattern. Naming an ignored file directly still refuses unless you force it.",
    ],
    blocks: [{ type: "table", caption: "Where each kind of path shows up", columns: ["Kind", "In git status", "What .gitignore does to it"], rows: [
      ["Tracked", "Listed only when its contents changed", "Nothing. Rules never apply."],
      ["Untracked", "Listed as ?? in the short form", "A matching rule makes it ignored."],
      ["Ignored", "Hidden unless you pass --ignored, then !!", "A later ! rule can make it untracked again."],
    ] }],
  },
  {
    id: "read-a-pattern", heading: "Read a pattern the way Git reads it.",
    paragraphs: [
      "Git reads .gitignore from top to bottom and keeps the last rule that matches a path. A rule beginning with ! re-includes a path an earlier rule excluded. Lines starting with # are comments; blank lines do nothing.",
      "A pattern with no slash, such as *.log, matches a name at any depth: debug.log and logs/build.log both match. The star stands for any characters except a slash.",
      "A trailing slash, such as notes/, matches only a folder of that name. A slash anywhere else, such as notes/keep.md or /build, anchors the pattern to the folder that holds the .gitignore file.",
      "One rule has no exception. Once a folder is excluded, Git does not look inside it, so !notes/keep.md cannot rescue a file while notes/ is excluded. To keep one file, exclude the folder’s contents with notes/* and then re-include the file.",
    ],
    blocks: [{ type: "table", caption: "The five rules used in this guide", columns: ["Pattern", "Matches", "Does not match"], rows: [
      ["*.log", "debug.log, logs/build.log", "important.logs, log.txt"],
      ["!important.log", "Re-includes important.log after *.log", "Nothing on its own; it only undoes an earlier match"],
      ["notes/", "The notes folder and everything under it", "A file named notes"],
      ["!notes/keep.md", "notes/keep.md, when its folder is not excluded", "Anything while notes/ is excluded above it"],
      [".env", ".env in any folder", ".env.example"],
    ] }],
  },
  {
    id: "try-the-rules", heading: "Switch rules on and off, then read the reason.",
    paragraphs: [
      "The example project has seven paths. Two of them, reading-list.md and .env, are already tracked. Turn each rule on or off and watch Git’s view of every path change, with a reason for each result.",
      "Try turning off notes/ to see !notes/keep.md finally work. Then turn every rule off and back on. Finally, stop tracking .env and watch the .env rule start to matter.",
    ],
    blocks: [{ type: "ignore-playground" }],
  },
  {
    id: "try-it-locally", heading: "Build the same folder on your computer.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-ignore folder in your home folder. If that name already exists, choose an unused name in both commands. The first commit records reading-list.md and a practice .env on purpose, so you can see the tracked-file problem for yourself. The key is fake; never commit a real one.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-ignore\ncd git-ignore\ngit init --initial-branch=main", explanation: "Create a practice repository and stay on its starting branch, main." },
      { type: "command", command: 'git config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Replace the sample identity with your own. These settings apply only to this practice repository." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\nprintf "API_KEY=practice-only\\n" > .env\ngit add reading-list.md .env\ngit commit -m "Start the reading list"', explanation: "Record both files. Committing .env is the mistake this guide fixes. printf writes text; > creates or replaces the file." },
      { type: "command", command: "mkdir logs notes\ntouch debug.log important.log logs/build.log notes/draft.md notes/keep.md\ngit status --short", explanation: "Create the untracked paths. touch makes empty files. Status lists each new file, and collapses a folder whose contents are all untracked.", output: "?? debug.log\n?? important.log\n?? logs/\n?? notes/" },
      { type: "command", command: 'printf "%s\\n" "*.log" "!important.log" "notes/" "!notes/keep.md" ".env" > .gitignore\ngit status --short', explanation: "Write the five rules, one per line. Only important.log and the new .gitignore itself remain untracked.", output: "?? .gitignore\n?? important.log" },
      { type: "command", command: "git check-ignore -v debug.log logs/build.log notes/keep.md", explanation: "Ask which rule decided each path. Each line names the ignore file, the line number, the pattern, and the path.", output: ".gitignore:1:*.log\tdebug.log\n.gitignore:1:*.log\tlogs/build.log\n.gitignore:3:notes/\tnotes/keep.md" },
    ],
  },
  {
    id: "stop-tracking-a-file", heading: "Untrack the secret, then let the rule work.",
    paragraphs: [
      "Edit .env and run status: it still appears as modified, because it is tracked. The fix is to remove it from the index while keeping the file on disk. git rm --cached does exactly that.",
      "After the commit, .env is an untracked file that matches a rule, so it disappears from status. It is still in your folder, and it is still in every earlier commit. Removing a file from tracking does not remove it from history. If the key were real, you would change the key.",
    ],
    blocks: [
      { type: "command", command: 'printf "API_KEY=changed\\n" > .env\ngit status --short', explanation: "The rule exists, but the tracked file still reports its change.", output: " M .env\n?? .gitignore\n?? important.log" },
      { type: "command", command: 'git rm --cached .env\ngit add .gitignore\ngit commit -m "Stop tracking .env"\ngit status --short', explanation: "Stage the removal from the index, record the rules, and commit. Now only important.log is untracked, and .env is still on disk.", output: "?? important.log" },
      { type: "command", command: "git show HEAD~1:.env", explanation: "The previous commit still contains the file. History does not forget.", output: "API_KEY=practice-only" },
      { type: "details", title: "Keep one file inside an excluded folder", paragraphs: [
        "notes/ excludes the folder itself, so Git never enters it and !notes/keep.md is never consulted. Replace the folder rule with notes/*, which excludes the folder’s contents one by one; then the negation can re-include keep.md.",
        "Status collapses the folder to notes/ because keep.md is now the only untracked path inside it. Run git check-ignore -v notes/keep.md to see the ! rule named as the deciding line.",
      ], commands: [
        { command: 'printf "%s\\n" "*.log" "!important.log" "notes/*" "!notes/keep.md" ".env" > .gitignore\ngit status --short', explanation: "The changed .gitignore is a tracked modification now. notes/ reappears because keep.md is untracked again.", output: " M .gitignore\n?? important.log\n?? notes/" },
      ] },
    ],
  },
  {
    id: "where-rules-live", heading: "Rules can live in three places.",
    paragraphs: ["Most projects commit one .gitignore at the top level so every collaborator shares the same rules. Two other locations cover the cases a shared file should not."],
    blocks: [{ type: "bullets", items: [
      { label: ".gitignore in any folder", text: "A nested .gitignore applies to its own folder and everything below it. When two files both match a path, the deeper file wins." },
      { label: ".git/info/exclude", text: "Personal rules for this one repository. It is not committed, so teammates never see it. Good for a scratch file only you create." },
      { label: "A global ignore file", text: "Rules for every repository on your computer, such as .DS_Store or editor folders. Point Git at it with git config set --global core.excludesFile ~/.gitignore_global." },
    ] }],
  },
  {
    id: "check-yourself", heading: "Predict the status.",
    paragraphs: ["Both paths below are untracked. Decide what Git prints before you reveal the answer."],
    blocks: [{ type: "quiz", question: "Your .gitignore contains build/ and, below it, !build/report.txt. What does git status show for build/report.txt?", answers: [
      { text: "Nothing. The folder is excluded, so Git never looks inside it.", correct: true, explanation: "Yes. Once build/ matches the folder, Git stops there. The later ! rule is never consulted. Use build/* if you want to keep one file inside." },
      { text: "?? build/report.txt, because the later ! rule wins.", correct: false, explanation: "Last match wins only among rules Git gets to evaluate. An excluded folder ends the search for everything inside it." },
      { text: "!! build/report.txt, because status always lists ignored files.", correct: false, explanation: "Status hides ignored paths unless you pass --ignored. The file is ignored, but it is not printed." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three rules to carry.",
    paragraphs: ["Write the rule before the first commit whenever you can. When you are too late, untrack the file, commit, and then let the rule do its work. Your practice folder ends with important.log untracked on purpose."],
    blocks: [{ type: "recap", items: [
      "Ignore rules apply only to untracked paths. A tracked file needs git rm --cached before a rule can hide it, and it stays in earlier commits.",
      "Git keeps the last matching rule. No slash means any folder; a trailing slash means folder only; ! re-includes.",
      "An excluded folder is never entered. To keep one file inside, exclude folder/* and re-include the file.",
    ] }],
  },
];
