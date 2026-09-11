import type { ArticleSection } from "@/lib/articles";

export const gitForkSections: ArticleSection[] = [
  {
    id: "no-write-access", heading: "You want to contribute, but you cannot push there.",
    paragraphs: [
      "Sam’s reading list lives on a hosting service under Sam’s account. You found a book it should have. You can clone the repository, but a push is refused: it is not yours to write to.",
      "This is the normal situation for almost every open project. The answer has a fixed shape: copy the repository under your own account, push your change there, and ask Sam to merge it. The copy is a **fork**; the ask is a **pull request**.",
      "This guide continues the reading-list project. You should know what a remote and a remote-tracking branch are, how to push a branch with -u, and how a merge records two parents.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "How does a change travel from your laptop into a repository you cannot push to, and what has to happen afterwards so every copy agrees?" }],
  },
  {
    id: "four-places", heading: "Four places, one change.",
    paragraphs: [
      "A fork is nothing new to Git. It is a clone that lives on the service instead of on your computer, and the service records where it came from. Git itself only ever sees repositories and remotes.",
      "Your laptop clone therefore talks to two remotes. By convention, origin is your fork, the place you push to, and upstream is the original, the place the project lives. You add the second one yourself.",
    ],
    blocks: [{ type: "table", caption: "Where the change passes through", columns: ["Place", "Where it is", "Who can push to it"], rows: [
      ["Original · upstream", "On the service, under Sam’s account", "Sam"],
      ["Fork · origin", "On the service, under your account", "You"],
      ["Clone · laptop", "Your computer", "You, locally"],
      ["Pull request", "On the service, attached to the original", "Nobody; it points at a branch of your fork"],
    ] }],
  },
  {
    id: "a-pull-request-is-a-pointer", heading: "A pull request is a request, not a copy of commits.",
    paragraphs: [
      "A pull request says: please merge branch add-piranesi of my fork into branch main of yours. The service stores that sentence, shows the commits and the difference, and hosts the conversation. It does not move any commit.",
      "Because it points at your branch, pushing more commits to that branch updates the request. Review comments become new commits on the same branch; you never open a second request for the same change.",
      "The difference the service shows is the three-dot kind: what your branch changed since it left Sam’s main, not the difference between the two branch tips. When Sam presses Merge, the service records a merge commit on Sam’s main whose second parent is your commit, with a message such as Merge pull request #1 from maya/add-piranesi.",
      "After that merge, the change is in Sam’s repository only. Your fork’s main and your laptop’s main still point where they did; bringing them up to date is your job.",
    ],
  },
  {
    id: "try-the-journey", heading: "Follow the change through all four places.",
    paragraphs: [
      "Step forward and watch which labels appear or move at each step. Notice how long the fork and the laptop stay behind after Sam merges, and which command finally moves each one.",
    ],
    blocks: [{ type: "fork-playground" }],
  },
  {
    id: "keep-your-fork-current", heading: "Your fork does not update itself.",
    paragraphs: [
      "The service copied Sam’s repository once. Sam’s later commits reach your fork only when you push them there. Before starting each new branch, fetch upstream, fast-forward your main onto upstream/main, and push main to origin. Services offer a Sync button that does the same.",
      "Start every change from a fresh main and on its own branch. A branch that started from an old main can still be merged, but its pull request shows more difference and is more likely to conflict.",
      "When a request is merged, delete its branch locally and on the fork. The commits stay reachable through the merge commit, so nothing is lost; only the label goes.",
    ],
  },
  {
    id: "try-it-locally", heading: "A service in a folder: Sam, your fork, and your laptop.",
    paragraphs: [
      "Use Terminal on macOS or Linux, or Git Bash on Windows. These commands were checked with Git 2.50.1. Use Git 2.46 or newer for the configuration syntax. Run each line separately, pressing Enter, and continue only when it succeeds.",
      "Create a fresh git-fork folder in your home folder. Inside it, two folders stand for two accounts on a hosting service: sam holds the original, maya holds your fork. Both hosted repositories are bare. Your commit IDs and paths will differ from the ones shown.",
    ],
    blocks: [
      { type: "command", command: "cd ~\nmkdir git-fork\ncd git-fork\nmkdir sam maya\ngit init --bare --initial-branch=main sam/reading-list.git", explanation: "Sam’s original repository on the service.", output: "Initialized empty Git repository in /Users/maya/git-fork/sam/reading-list.git/" },
      { type: "command", command: 'git clone sam/reading-list.git sam-laptop\ncd sam-laptop\ngit config set --local user.name "Sam Okafor"\ngit config set --local user.email "sam@example.com"', explanation: "Sam’s working copy. The warning is expected: the hosted repository is still empty.", output: "Cloning into 'sam-laptop'...\nwarning: You appear to have cloned an empty repository.\ndone." },
      { type: "command", command: 'printf "# Reading list\\n- Dune\\n" > reading-list.md\ngit add reading-list.md\ngit commit -m "Start the reading list"\nprintf "%s\\n" "- The Hobbit" >> reading-list.md\ngit commit -am "Add The Hobbit"\ngit push\ncd ..', explanation: "Sam records A and B and publishes them. Clone set the upstream, so plain push works.", output: "To /Users/maya/git-fork/sam/reading-list.git\n * [new branch]      main -> main" },
      { type: "command", command: "git clone --bare sam/reading-list.git maya/reading-list.git", explanation: "This is the Fork button: a server-side copy of Sam’s repository under your account. Bare like the original, and yours to push to.", output: "Cloning into bare repository 'maya/reading-list.git'...\ndone." },
      { type: "command", command: 'git clone maya/reading-list.git laptop\ncd laptop\ngit config set --local user.name "Maya Chen"\ngit config set --local user.email "maya@example.com"', explanation: "Clone your fork, not Sam’s repository. From here on, origin means your fork. Replace the sample identity with your own.", output: "Cloning into 'laptop'...\ndone." },
      { type: "command", command: "git remote add upstream ~/git-fork/sam/reading-list.git\ngit remote -v", explanation: "Add Sam’s repository as a second remote named upstream. Your shell expands ~ to your home folder; on a service both addresses would be URLs.", output: "origin\t/Users/maya/git-fork/maya/reading-list.git (fetch)\norigin\t/Users/maya/git-fork/maya/reading-list.git (push)\nupstream\t/Users/maya/git-fork/sam/reading-list.git (fetch)\nupstream\t/Users/maya/git-fork/sam/reading-list.git (push)" },
      { type: "command", command: "git fetch upstream\ngit branch --all", explanation: "Fetch gives you upstream/main, your record of Sam’s main, next to origin/main, your record of your fork’s main.", output: "From /Users/maya/git-fork/sam/reading-list\n * [new branch]      main       -> upstream/main\n* main\n  remotes/origin/HEAD -> origin/main\n  remotes/origin/main\n  remotes/upstream/HEAD -> upstream/main\n  remotes/upstream/main" },
      { type: "command", command: 'git switch -c add-piranesi\nprintf "%s\\n" "- Piranesi" >> reading-list.md\ngit commit -am "Add Piranesi"', explanation: "Work on a branch named after the change, never on main. The pull request will point at this branch." },
      { type: "command", command: "git push -u origin add-piranesi", explanation: "Publish the branch to your fork. Nothing goes to Sam’s repository.", output: "To /Users/maya/git-fork/maya/reading-list.git\n * [new branch]      add-piranesi -> add-piranesi\nbranch 'add-piranesi' set up to track 'origin/add-piranesi'." },
      { type: "command", command: "git log --oneline upstream/main..add-piranesi\ngit diff upstream/main...add-piranesi", explanation: "What the pull request page will show: the commits your branch adds beyond Sam’s main, and the difference since the branch left it. Three dots in diff mean compare from the fork point, not from Sam’s latest commit.", output: "5e83c6f Add Piranesi\ndiff --git a/reading-list.md b/reading-list.md\nindex de2acd6..8622ee3 100644\n--- a/reading-list.md\n+++ b/reading-list.md\n@@ -1,3 +1,4 @@\n # Reading list\n - Dune\n - The Hobbit\n+- Piranesi" },
      { type: "callout", title: "On the service: open the pull request", text: "Choose New pull request, pick sam:main as the base and maya:add-piranesi as the branch to compare, describe the change, and create it. Git has no command for this step; the request lives on the service, pointing at your branch." },
      { type: "command", command: 'cd ../sam-laptop\ngit fetch ~/git-fork/maya/reading-list.git add-piranesi\ngit merge --no-ff -m "Merge pull request #1 from maya/add-piranesi" FETCH_HEAD\ngit push\ncd ../laptop', explanation: "Play Sam and press Merge by hand. Fetching with an address and a branch name puts that branch’s commit in a temporary pointer, FETCH_HEAD. Sam merges it with the message the service would write and pushes to the original.", output: "From /Users/maya/git-fork/maya/reading-list\n * branch            add-piranesi -> FETCH_HEAD\nMerge made by the 'ort' strategy.\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)\nTo /Users/maya/git-fork/sam/reading-list.git\n   991bb68..fdeee37  main -> main" },
      { type: "command", command: "git fetch upstream\ngit switch main\ngit merge --ff-only upstream/main", explanation: "Back on your laptop, main knows nothing about the merge yet. Fetch Sam’s main, switch to main, and fast-forward onto it. The status line after switching compares with origin/main, your fork, which is equally behind.", output: "From /Users/maya/git-fork/sam/reading-list\n   991bb68..fdeee37  main       -> upstream/main\nSwitched to branch 'main'\nYour branch is up to date with 'origin/main'.\nUpdating 991bb68..fdeee37\nFast-forward\n reading-list.md | 1 +\n 1 file changed, 1 insertion(+)" },
      { type: "command", command: "git push\ngit log --oneline --decorate --graph --all", explanation: "Push main to your fork so it matches Sam’s. All three main labels now sit on the merge commit.", output: "To /Users/maya/git-fork/maya/reading-list.git\n   991bb68..fdeee37  main -> main\n*   fdeee37 (HEAD -> main, upstream/main, upstream/HEAD, origin/main, origin/HEAD) Merge pull request #1 from maya/add-piranesi\n|\\\n| * 5e83c6f (origin/add-piranesi, add-piranesi) Add Piranesi\n|/\n* 991bb68 Add The Hobbit\n* 4d90955 Start the reading list" },
      { type: "command", command: "git branch -d add-piranesi\ngit push origin --delete add-piranesi", explanation: "Delete the branch locally and on the fork. -d agrees because the branch is merged into its upstream, origin/add-piranesi; the commit lives on as the merge commit’s second parent.", output: "Deleted branch add-piranesi (was 5e83c6f).\nTo /Users/maya/git-fork/maya/reading-list.git\n - [deleted]         add-piranesi" },
      { type: "details", title: "What a refused push to the original looks like", paragraphs: [
        "On a hosting service, pushing to a repository you cannot write to fails before anything is sent. The exact wording depends on the service and on whether you connect over HTTPS or SSH; this is the shape of it.",
      ], code: "remote: Permission to sam/reading-list.git denied to maya.\nfatal: unable to access 'https://github.com/sam/reading-list.git/': The requested URL returned error: 403" },
    ],
  },
  {
    id: "check-yourself", heading: "Predict where the change is.",
    paragraphs: ["Decide before you reveal the answer."],
    blocks: [{ type: "quiz", question: "Sam merged your pull request. On your laptop you run git log on main. Is the merged change there?", answers: [
      { text: "No. The merge happened in Sam’s repository. Your main and your fork’s main still point where they did; fetch upstream and fast-forward.", correct: true, explanation: "Yes. A merge on the service moves Sam’s main only. upstream/main catches up when you fetch, main when you merge it, and the fork when you push." },
      { text: "Yes. Merging a pull request updates every copy of the repository.", correct: false, explanation: "Nothing reaches your laptop without a fetch. Git never pushes into your repositories from outside." },
      { text: "Only after you delete the branch.", correct: false, explanation: "Deleting the branch removes a label. It does not move main anywhere." },
    ] }],
  },
  {
    id: "keep-it-with-you", heading: "Three things to carry.",
    paragraphs: ["Your practice folder ends with a merged pull request and three main labels that agree. The next part of the series turns back to your own laptop: pausing, undoing, and recovering work."],
    blocks: [{ type: "recap", items: [
      "A fork is a clone on the service under your account. Clone the fork, add the original as upstream, and push branches to origin.",
      "A pull request points at a branch of your fork and asks for a merge into the original. More commits on that branch update the request; the merge happens in the original only.",
      "After the merge, sync: fetch upstream, fast-forward main, push main to your fork, delete the branch. Do the same sync before every new branch.",
    ] }],
  },
];
