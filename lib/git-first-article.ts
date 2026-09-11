import type { ArticleSection } from "./articles";

export const firstGitSections: ArticleSection[] = [
  {
    id: "the-familiar-problem",
    heading: "It worked yesterday.",
    paragraphs: [
      "You edit a file. Save it. Edit it again. Somewhere along the way, you remove something you wanted to keep. The version in your editor is the latest one—but it is no longer the version you want.",
      "You could keep folders called project-final, project-final-2, and project-actually-final. Or you could give your project a history: a series of moments you can name, inspect, and compare.",
      "That is the idea we will explore. Our entire project is a reading list. No terminal setup needed yet. By the end, you will be able to point at a commit and explain what it saved.",
    ],
    blocks: [{ type: "callout", title: "One question to keep in mind", text: "If I change my file today, what happens to the version I committed yesterday?" }],
  },
  {
    id: "a-snapshot",
    heading: "A moment you can come back to.",
    paragraphs: [
      "Think of a snapshot as the recorded state of your project’s tracked files. A commit refers to that snapshot and adds context: who recorded it, a message explaining it, and links to its parent commits.",
      "The snapshot comes from the staging area—the project state you have prepared for your next commit. Saving a file in your editor changes the working file; staging prepares its contents; committing records the prepared state. We will practice that full sequence in a later article.",
      "For now, picture three commits in our reading-list project. A starts the list with Dune. B adds The Hobbit. C replaces Dune with A Wizard of Earthsea. Each moment still has its own version of the list.",
    ],
    blocks: [{ type: "figure", caption: "We made these commits in order: A, B, then C. Each snapshot remains available as the list evolves." }],
  },
  {
    id: "try-the-timeline",
    heading: "Go on. Visit an earlier moment.",
    paragraphs: [
      "Select a commit to read its saved file. Then compare it with its parent to see what changed. A, B, and C are friendly labels for this example; real commits have hash identifiers.",
      "Now add Piranesi to the current file. Visit A, B, and C again. Their contents stay the same, even though your working file has changed. Browsing a snapshot here only changes the preview; it does not switch branches or restore your files.",
    ],
    blocks: [{ type: "timeline" }],
  },
  {
    id: "connected-history",
    heading: "The moments are connected.",
    paragraphs: [
      "In this simple history, C points back to B, and B points back to A. Those are parent links. A is our first commit, so it has no parent. Following these links lets Git walk through the story of the project.",
      "The label main points to C. It is a branch name: a convenient name for a commit at the tip of a line of work. HEAD usually points to the branch you are on. In our example, HEAD points to main, which points to C.",
      "Selecting B in our preview does not move either label. If you later record a new commit on main, that branch label advances to the new commit. Earlier commit objects keep their contents. Branches and other shapes of history will get their own article.",
    ],
    blocks: [{ type: "callout", title: "A snapshot and a difference answer different questions", text: "A snapshot answers “What was in the project?” A difference answers “What changed between these two states?” Git can compare snapshots to show you a difference." }],
  },
  {
    id: "inspect-for-real",
    heading: "Meet the real commands.",
    paragraphs: [
      "Already have a Git repository with commits? You can inspect it with these commands from its folder. They read history without changing your working files. If you are brand new to Git, you can skip this part until we set up your first repository.",
    ],
    blocks: [
      { type: "command", command: "git log --oneline -3", explanation: "Show up to three recent commits, newest first. Your hashes and messages will differ.", output: "c8f2a91 Replace Dune with Earthsea\nb7e1d40 Add The Hobbit\na6d0c32 Start the reading list" },
      { type: "command", command: "git show HEAD:reading-list.md", explanation: "Print this file as recorded in the current commit. Use a tracked path that exists in your own repository.", output: "# Reading list\n- A Wizard of Earthsea\n- The Hobbit" },
      { type: "command", command: "git show HEAD~1:reading-list.md", explanation: "Look at the same path in the current commit’s first parent. This needs a parent commit containing the file.", output: "# Reading list\n- Dune\n- The Hobbit" },
    ],
  },
  {
    id: "check-your-picture",
    heading: "Does the picture click?",
    paragraphs: ["You committed your reading list yesterday. Today you add a book and save the file in your editor, without making another commit."],
    blocks: [{ type: "quiz", question: "What happens to yesterday’s committed snapshot?", answers: [
      { text: "It updates to include the new book.", correct: false, explanation: "Saving updates your working file. It does not update an existing commit. The new book is only in your working file so far." },
      { text: "It stays exactly as it was.", correct: true, explanation: "Exactly. You changed your working file, while yesterday’s commit still refers to its original snapshot. A later commit can record the new version." },
      { text: "Git creates another commit automatically.", correct: false, explanation: "Git does not automatically commit when you save a file. You prepare the state you want and explicitly record a commit." },
    ] }],
  },
  {
    id: "take-it-with-you",
    heading: "Three ideas to take with you.",
    paragraphs: ["Next time Git feels confusing, separate the file you are editing from the snapshot you are inspecting. Then ask which commit your branch points to. Those questions will keep helping as the commands get more interesting."],
    blocks: [{ type: "recap", items: [
      "Your working files are where you make changes.",
      "A commit refers to a recorded snapshot prepared through staging.",
      "Parent links connect commits; a branch name marks a tip in that history.",
    ] }],
  },
];
