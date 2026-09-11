import type { ArticleSection } from "./articles";

export const firstGitSections: ArticleSection[] = [
  {
    id: "the-familiar-problem",
    heading: "It worked yesterday.",
    paragraphs: [
      "You edit a file. Save it. Edit it again. Somewhere along the way, you remove something you wanted to keep. The version in your editor is the latest one—but it is no longer the version you want.",
      "You could keep folders called project-final, project-final-2, and project-actually-final. Git gives you a better option: let the project keep chosen versions in its own history.",
      "We will use one reading-list file to see how that works. You do not need a terminal or any Git experience yet.",
    ],
    blocks: [{ type: "callout", title: "One question to keep in mind", text: "If I change and save my file today, what happens to the version Git recorded yesterday?" }],
  },
  {
    id: "saving-and-recording",
    heading: "Saving and recording are different actions.",
    paragraphs: [
      "Pressing Save in your editor updates the file on your computer. It does not add a new moment to Git’s history.",
      "When the project reaches a useful point, you can ask Git to record that version. Git calls the recorded moment a commit. The project contents saved inside that moment are its snapshot.",
    ],
    blocks: [{ type: "save-commit-comparison" }],
  },
  {
    id: "try-the-timeline",
    heading: "Visit three saved moments.",
    paragraphs: [
      "Our reading list has three recorded moments. A begins with Dune. B also contains The Hobbit. In C, Dune is replaced by A Wizard of Earthsea.",
      "Choose A, B, or C to view the file Git recorded then. The other panel always shows the file on your computer now.",
    ],
    blocks: [{ type: "timeline" }],
  },
  {
    id: "the-past-stays-still",
    heading: "Your file changed. The past did not.",
    paragraphs: [
      "Add Piranesi in the example, then visit A, B, and C again. Piranesi appears only in the current file. The three recorded moments remain exactly as they were.",
      "A project’s history grows when you deliberately record another commit. Merely editing or saving the current file does not rewrite the commits already there.",
    ],
    blocks: [{ type: "callout", title: "The useful distinction", text: "Save changes the file you have now. Commit records a new moment you can inspect later." }],
  },
  {
    id: "check-your-picture",
    heading: "Where is the new book?",
    paragraphs: ["C is the latest recorded moment. You add Piranesi to the current file and press Save, but you have not asked Git to record another moment."],
    blocks: [{ type: "quiz", question: "Where does Piranesi exist right now?", answers: [
      { text: "Only in the current file on my computer.", correct: true, explanation: "Exactly. Saving changed the current file. Piranesi will not appear in Git’s history until you deliberately record a later commit." },
      { text: "Inside A, B, and C as well.", correct: false, explanation: "Recorded moments stay unchanged. A, B, and C still contain the versions Git recorded at those times." },
      { text: "Inside a new commit Git created automatically.", correct: false, explanation: "Saving a file does not create a commit. Recording a new moment is a separate action you choose to perform." },
    ] }],
  },
  {
    id: "take-it-with-you",
    heading: "Keep this picture with you.",
    paragraphs: ["Before learning any commands, remember that your current file and Git’s recorded history are two different things."],
    blocks: [{ type: "recap", items: [
      "Save updates the file on your computer.",
      "A commit is a recorded moment in the project’s history.",
      "Editing today does not rewrite the commits recorded earlier.",
    ] }],
  },
];
