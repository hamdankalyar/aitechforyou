import type { ArticleSection } from "@/lib/articles";

export const gitPushSections: ArticleSection[] = [
  {
    id: "the-other-direction", heading: "Fetch brought their work in. Push sends yours out.",
    paragraphs: [
      "Your title commit D exists only on your laptop. Sam cannot see it, and neither can anyone else, until you push. Push sends your commits to a remote and moves its branch to match yours.",
      "Three things make push confusing at first: it needs to know where to send the branch, it refuses whenever moving the remote branch would drop someone else’s commit, and pull, the command everyone tells you to run next, is two commands in one.",
      "This guide continues the reading-list project with Sam. You should know what origin and origin/main are, what fetch moves, and how a merge can fast-forward or record a merge commit.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "What does push need to know, why does it sometimes refuse, and what does pull actually do?" }],
  },
  {
    id: "a-shared-meeting-point", heading: "The server is a repository with no working tree.",
    paragraphs: [
      "In the previous guide, origin was Sam’s own repository. That works for fetching, but not for pushing: a repository with files checked out refuses a push to its current branch, because the push would change the branch under Sam’s feet without updating Sam’s files.",
      "So teams share a **bare** repository: history and branches, no working tree, nobody editing files in it. Everyone pushes to it and fetches from it. That is exactly what a hosting service keeps for you; here it is a folder called server.git.",
      "A project that started on your laptop connects to such a server with git remote add origin, followed by the address. From then on, origin means the server.",
    ],
    blocks: [{ type: "details", title: "What a push into a checked-out branch looks like", paragraphs: [
      "Git prints a long explanation and rejects the push. The advice to change receive.denyCurrentBranch is for special setups; the ordinary answer is a bare repository.",
    ], code: "remote: error: refusing to update checked out branch: refs/heads/main\nremote: error: By default, updating the current branch in a non-bare repository\nremote: is denied, because it will make the index and work tree inconsistent\nremote: with what you pushed, and will require 'git reset --hard' to match\nremote: the work tree to HEAD.\n ! [remote rejected] main -> main (branch is currently checked out)" }],
  },
  {
    id: "the-upstream-connection", heading: "Upstream: the branch your branch talks to.",
    paragraphs: [
      "An **upstream** is a note on your branch that says which remote branch it corresponds to. When main’s upstream is origin/main, git push, git pull, and git status all know what to compare with, and you can run them without arguments.",
      "Clone sets the upstream for you: the branch you get after cloning already tracks origin’s branch of the same name. A branch you created locally has none, so the first push names the destination and records it: git push -u origin main. -u is short for --set-upstream.",
      "git branch -vv shows the upstream in brackets. Under the hood it is two configuration entries, branch.main.remote and branch.main.merge, which is why a rejected first push sets nothing: there was no successful connection to record.",
    ],
    blocks: [
      { type: "table", caption: "The same commands without and with an upstream", columns: ["Command", "No upstream", "Upstream set"], rows: [
        ["git push", "fatal: The current branch main has no upstream branch", "Sends main to origin’s main"],
        ["git pull", "There is no tracking information for the current branch", "Fetches, then integrates origin/main"],
        ["git status", "Says only On branch main", "Says up to date, ahead, behind, or diverged"],
      ] },
      { type: "details", title: "Two assumptions behind a bare git push", paragraphs: [
        "Git’s default push behaviour, push.default set to simple, pushes the current branch to a branch of the same name on the upstream’s remote. If you set an upstream with a different name, plain git push refuses rather than guess. Keep local and remote names the same and you will never meet that message.",
        "If typing -u once per new branch bothers you, git config set --global push.autoSetupRemote true makes the first plain push of an untracked branch set the upstream itself.",
      ] },
    ],
  },
  {
    id: "push-only-moves-forward", heading: "Push is refused when it would drop someone’s commit.",
    paragraphs: [
      "The server accepts a push only when its branch can move forward to your commit, the same fast-forward rule as a merge. If Sam pushed C and you try to push D, the server’s main cannot reach D without leaving C behind, so it answers ! [rejected] main -> main (fetch first).",
      "Nothing is sent, and nothing on your laptop changes; push never fetches. The fix is to bring C into your history, with fetch and merge or with pull, and push again. Then the server’s main moves forward onto your merge commit, and both histories are kept.",
      "The wording depends on what your repository already knows. Before you have fetched C, Git says fetch first, because the remote contains work you do not have locally. After a fetch, the same refusal says non-fast-forward: the tip of your branch is behind its remote counterpart. The fix is the same either way.",
      "There is a way to force the server’s branch to move anyway. It drops commits for everyone who had them, so this series leaves it for the last guide, where the consequences are shown before the command.",
    ],
  },
  {
    id: "pull-is-two-steps", heading: "pull is fetch, then one of three things.",
    paragraphs: [
      "git pull runs git fetch, then tries to integrate origin/main into main. The fetch always happens: even when the second step refuses, origin/main has already moved, which you can see in status.",
      "When you have no commits of your own since the fork point, the second step is a fast-forward and nothing else needs deciding. When both sides moved, plain git pull refuses and asks you to choose, because Git will not pick a history shape for you.",
      "--ff-only refuses in that case too, which makes it the safe habit: it never creates a merge you did not ask for. --no-rebase merges, recording a merge commit as in the merge guide. --rebase replays your commits on top of theirs; the rebase guide later in the series explains what that means.",
    ],
    blocks: [
      { type: "table", caption: "Three answers to the divergence question", columns: ["Command", "When both sides moved", "When only origin moved"], rows: [
        ["git pull", "Refuses: Need to specify how to reconcile divergent branches", "Fast-forward"],
        ["git pull --ff-only", "Refuses: Not possible to fast-forward", "Fast-forward"],
        ["git pull --no-rebase", "Records a merge commit", "Fast-forward"],
      ] },
      { type: "details", title: "Make the safe answer the default", paragraphs: [
        "With pull.ff set to only, plain git pull behaves like --ff-only everywhere. When you do want a merge, say so on the command line with --no-rebase; the option wins over the setting for that one pull.",
      ], code: "git config set --global pull.ff only" },
    ],
  },
  {
    id: "try-the-push", heading: "Connect your laptop to the server.",
    paragraphs: [
      "Try git push first and read the refusal. Then push with -u and watch the server, origin/main, and the upstream note all change at once. Let Sam push, commit yourself, and push again to see the rejection.",
      "Then pull. Run the plain form to see it stop after fetching, --ff-only to see it refuse, and --no-rebase to merge. Push once more, and the server accepts.",
    ],
    blocks: [{ type: "push-playground" }],
  },
  {
    id: "try-it-locally", heading: "A server, your laptop, and Sam.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-push folder in your home folder. Inside it, server.git is the shared repository, laptop is yours, and teammate is Sam’s. Your commit IDs and paths will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-push\ncd git-push\ngit init --bare --initial-branch=main server.git", explanation: "The shared repository. --bare means no working tree: it only receives and serves commits, like the repository a hosting service keeps for you.", output: "Initialized empty Git repository in /Users/maya/git-push/server.git/" },
      { type: "command", command: 'git init --initial-branch=main laptop\ncd laptop\ngit config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Your project starts on your laptop, as most projects do. Replace the sample identity with your own." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"', explanation: "Record A and B locally." },
      { type: "command", command: "git remote add origin ~/git-push/server.git\ngit remote -v", explanation: "Connect the project to the server under the nickname origin. Your shell expands ~ to your home folder; on a hosting service this address would be a URL.", output: "origin\t/Users/maya/git-push/server.git (fetch)\norigin\t/Users/maya/git-push/server.git (push)" },
      { type: "command", command: "git push", explanation: "Refused. main was created locally, so it has no upstream and plain push does not know where to send it. Git prints the command to use instead.", output: "fatal: The current branch main has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream origin main\n\nTo have this happen automatically for branches without a tracking\nupstream, see 'push.autoSetupRemote' in 'git help config'." },
      { type: "command", command: "git push -u origin main", explanation: "Send A and B, create main on the server, and record origin/main as the upstream of your main.", output: "To /Users/maya/git-push/server.git\n * [new branch]      main -> main\nbranch 'main' set up to track 'origin/main'." },
      { type: "command", command: "git branch -vv\ngit status --short --branch", explanation: "The upstream shows in brackets, and status can compare again. From now on push, pull, and status need no arguments.", output: "* main 2a79574 [origin/main] Add The Hobbit\n## main...origin/main" },
      { type: "command", command: 'cd ..\ngit clone server.git teammate\ncd teammate\ngit config set --local user.name "Sam Okafor"\ngit config set --local user.email "sam@example.com"', explanation: "Sam clones the server. Clone sets the upstream, so Sam never needs -u.", output: "Cloning into 'teammate'...\ndone." },
      { type: "command", command: 'printf "%s\\n" "- Foundation" >> reading-list.md\ngit commit -am "Add Foundation"\ngit push\ncd ../laptop', explanation: "Sam records C and pushes: the server’s main moves from B to C. Then back to your laptop.", output: "To /Users/maya/git-push/server.git\n   2a79574..0802009  main -> main" },
      { type: "command", command: 'printf "# Reading list for 2026\\n- Dune\\n- The Hobbit\\n" > reading-list.md\ngit commit -am "Update the title"\ngit push', explanation: "Your D and Sam’s C both grow from B. The server refuses, because moving its main to D would drop C. Nothing was sent, and origin/main did not move.", output: "To /Users/maya/git-push/server.git\n ! [rejected]        main -> main (fetch first)\nerror: failed to push some refs to '/Users/maya/git-push/server.git'\nhint: Updates were rejected because the remote contains work that you do not\nhint: have locally. This is usually caused by another repository pushing to\nhint: the same ref. If you want to integrate the remote changes, use\nhint: 'git pull' before pushing again.\nhint: See the 'Note about fast-forwards' in 'git push --help' for details." },
      { type: "command", command: "git pull", explanation: "The first step ran: the From line shows origin/main moving to C. The second step needs a decision, so Git stops and lists the three choices.", output: "From /Users/maya/git-push/server\n   2a79574..0802009  main       -> origin/main\nhint: You have divergent branches and need to specify how to reconcile them.\nhint: You can do so by running one of the following commands sometime before\nhint: your next pull:\nhint:\nhint:   git config pull.rebase false  # merge\nhint:   git config pull.rebase true   # rebase\nhint:   git config pull.ff only       # fast-forward only\nhint:\nhint: You can replace \"git config\" with \"git config --global\" to set a default\nhint: preference for all repositories. You can also pass --rebase, --no-rebase,\nhint: or --ff-only on the command line to override the configured default per\nhint: invocation.\nfatal: Need to specify how to reconcile divergent branches." },
      { type: "command", command: "git pull --ff-only", explanation: "The safe form refuses as well: a fast-forward is impossible while you have D. Nothing new to fetch this time, so no From line.", output: "hint: Diverging branches can't be fast-forwarded, you need to either:\nhint:\nhint: \tgit merge --no-ff\nhint:\nhint: or:\nhint:\nhint: \tgit rebase\nhint:\nhint: Disable this message with \"git config set advice.diverging false\"\nfatal: Not possible to fast-forward, aborting." },
      { type: "command", command: "git pull --no-rebase\ngit log --oneline --decorate --graph --all", explanation: "Merge, then. This is the merge guide’s merge commit; only the message names where the other side came from. origin/HEAD appeared with the first fetch: it notes which branch the server treats as its default.", output: "Auto-merging reading-list.md\nMerge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\n*   021d9fc (HEAD -> main) Merge branch 'main' of /Users/maya/git-push/server\n|\\\n| * 211c0eb (origin/main, origin/HEAD) Add Foundation\n* | 9e092bc Update the title\n|/\n* ed5e139 Add The Hobbit\n* bb5c008 Start the reading list" },
      { type: "command", command: "git push\ngit status --short --branch", explanation: "Your main now contains the server’s C, so the server can move forward. Both labels meet on the merge commit, and Sam can fetch your title.", output: "To /Users/maya/git-push/server.git\n   211c0eb..021d9fc  main -> main\n## main...origin/main" },
      { type: "details", title: "Sam catches up, then you fast-forward", paragraphs: [
        "Sam’s pull is a fast-forward, because Sam has no local commits since C. Sam then records and pushes a second book.",
        "Your pull is a fast-forward too: --ff-only succeeds whenever you have nothing new of your own, and a plain pull afterwards has nothing to do.",
      ], commands: [
        { command: 'cd ../teammate\ngit pull --ff-only\nprintf "%s\\n" "- Neuromancer" >> reading-list.md\ngit commit -am "Add Neuromancer"\ngit push\ncd ../laptop', explanation: "Sam fast-forwards onto your merge commit, then pushes F.", output: "To /Users/maya/git-push/server.git\n   021d9fc..5c329d1  main -> main" },
        { command: "git pull --ff-only\ngit pull", explanation: "Fetch, then a fast-forward. The second pull finds nothing new.", output: "From /Users/maya/git-push/server\n   021d9fc..5c329d1  main       -> origin/main\nUpdating 021d9fc..5c329d1\nFast-forward\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\nAlready up to date." },
      ] },
    ],
  },
  {
    id: "check-yourself", heading: "Predict what was sent.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "git push answers ! [rejected] main -> main (fetch first). What happened?", answers: [
      { text: "The server’s main has a commit you do not have. Nothing was sent; integrate it, then push again.", correct: true, explanation: "Yes. The server only moves its branch forward. Fetch and merge, or pull, and the next push is a fast-forward for the server." },
      { text: "Git pushed your commits but also wants you to fetch afterwards.", correct: false, explanation: "A rejected push sends nothing. Your commits are still only on your laptop." },
      { text: "Your commit is broken and must be redone.", correct: false, explanation: "The commit is fine. The message is about the server’s history, not your commit’s contents." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with a server, two clones, and every commit shared. The next guide handles a repository you cannot push to at all."],
    blocks: [{ type: "recap", items: [
      "push sends your commits and moves the server’s branch forward. If the server has commits you lack, it refuses and nothing changes anywhere.",
      "An upstream links main to origin/main so push, pull, and status work without arguments. -u sets it on the first push; clone sets it for you.",
      "pull is fetch plus one integration step. When both sides moved, choose: --ff-only to refuse, --no-rebase to merge, --rebase later in the series.",
    ] }],
  },
];
