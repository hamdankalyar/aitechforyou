import type { ArticleSection } from "@/lib/articles";

export const javascriptIntroductionSections: ArticleSection[] = [
  {
    id: "what-javascript-is", heading: "What JavaScript is",
    paragraphs: [
      "**JavaScript is a programming language.** A programming language is a way to write instructions that a computer can follow.",
      "**It runs inside every web browser.** Chrome, Safari, Firefox, and Edge all understand it. You do not need to install anything.",
      "**It makes web pages do things.** When you click a button and something happens, that is usually JavaScript.",
      "**It also runs outside the browser.** A tool called Node lets JavaScript run on servers. This course stays in the browser.",
    ],
  },
  {
    id: "your-first-line", heading: "Your first line of JavaScript",
    paragraphs: [
      "**Press Run** on the box below. The console under it shows the result.",
      "**console.log(...)** prints whatever is inside the parentheses. The next lesson explains it fully.",
      "**\"Hello\"** is text. Text in JavaScript always sits between quotes.",
      "**Change the text** between the quotes and press Run again. The console shows your new text.",
    ],
    code: 'console.log("Hello");',
  },
  {
    id: "a-program-is-a-list", heading: "A program is a list of instructions",
    paragraphs: [
      "**A program is a list of lines.** JavaScript reads them from top to bottom, one at a time.",
      "**Each line is an instruction.** The three lines below print three things, in order.",
      "**The order matters.** Swap two lines and press Run. The output swaps too.",
    ],
    code: 'console.log("First");\nconsole.log("Second");\nconsole.log("Third");',
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "JavaScript is the language web browsers understand.",
      "A program is a list of instructions read from top to bottom.",
      "console.log prints a value. Text goes inside quotes.",
    ] }],
  },
];
