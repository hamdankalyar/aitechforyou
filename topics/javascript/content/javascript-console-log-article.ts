import type { ArticleSection } from "@/lib/articles";

export const javascriptConsoleLogSections: ArticleSection[] = [
  {
    id: "what-console-log-does", heading: "What console.log does",
    paragraphs: [
      "**The console is a message area.** Every browser has one, hidden inside its developer tools. In this course, it is the box under each example.",
      "**console.log prints a message to the console.** It is the simplest way to see what your code is doing.",
      "**Write the value inside the parentheses.** console.log(\"Hi\") prints Hi.",
      "**It does not change your page.** It only shows information to you, the programmer.",
    ],
    code: 'console.log("Hi"); // Hi',
  },
  {
    id: "print-text", heading: "Print text",
    paragraphs: [
      "**Text must be inside quotes.** Double quotes \"like this\" or single quotes 'like this' both work.",
      "**The quotes are not printed.** They only tell JavaScript where the text starts and ends.",
      "**Spaces inside the quotes are kept.** Spaces outside the quotes do not matter.",
    ],
    code: 'console.log("Welcome to JavaScript"); // Welcome to JavaScript\nconsole.log(\'Single quotes work too\'); // Single quotes work too',
  },
  {
    id: "print-numbers", heading: "Print numbers and math",
    paragraphs: [
      "**Numbers do not need quotes.** console.log(42) prints 42.",
      "**JavaScript can do the math first.** console.log(2 + 3) prints 5, because 2 + 3 is worked out before printing.",
      "**Quotes turn math into text.** console.log(\"2 + 3\") prints 2 + 3, exactly as written. Inside quotes, nothing is calculated.",
    ],
    code: 'console.log(42);      // 42\nconsole.log(2 + 3);   // 5\nconsole.log("2 + 3"); // 2 + 3',
  },
  {
    id: "print-several-things", heading: "Print several things at once",
    paragraphs: [
      "**Separate values with commas.** console.log prints each one, with a space between them.",
      "**Mix text and numbers freely.** This is handy for labelling a number.",
    ],
    code: 'console.log("Age:", 20);          // Age: 20\nconsole.log("Sum:", 2 + 3, "done"); // Sum: 5 done',
  },
  {
    id: "comments", heading: "Comments",
    paragraphs: [
      "**Two slashes start a comment.** Everything after // on that line is ignored by JavaScript.",
      "**Comments are notes for people.** Use them to explain what a line does, or to show the expected output.",
      "**A comment can sit on its own line or at the end of a line.** Both are common.",
    ],
    code: '// Print a greeting\nconsole.log("Hello"); // Hello\n// console.log("This line does not run");',
  },
  {
    id: "mistake-missing-quote", heading: "Mistake 1: a missing quote",
    paragraphs: [
      "**Every opening quote needs a closing quote.** Without it, JavaScript keeps reading, looking for the end of the text.",
      "**The error is a SyntaxError.** Syntax means the rules for writing code. The line breaks a rule, so nothing runs.",
      "**Press Run to see the error.** Then add the missing quote after the word closes and run again.",
    ],
    code: 'console.log("This quote never closes); // SyntaxError',
  },
  {
    id: "mistake-missing-parenthesis", heading: "Mistake 2: a missing parenthesis",
    paragraphs: [
      "**Every ( needs a ).** console.log opens a parenthesis, so the line must close it.",
      "**This is also a SyntaxError.** The message says a ) is missing after the argument list. The argument is what you put inside the parentheses.",
      "**Press Run to see the error.** Then add the ) before the semicolon and run again.",
    ],
    code: 'console.log("Missing parenthesis"; // SyntaxError',
  },
  {
    id: "mistake-misspelled-name", heading: "Mistake 3: a misspelled name",
    paragraphs: [
      "**JavaScript only knows exact names.** consol is not console, and Console is not console either.",
      "**This is a ReferenceError.** JavaScript looked for something called consol and could not find it.",
      "**Press Run to see the error.** Then fix the spelling and run again.",
    ],
    code: 'consol.log("Spelling matters"); // ReferenceError',
    blocks: [{ type: "callout", title: "Errors are normal", text: "Every programmer sees errors every day. Read the message, find the line it names, fix it, run again." }],
  },
  {
    id: "try-it-yourself", heading: "Run it yourself",
    paragraphs: [
      "**Print your name**, then your age, then both on one line.",
      "**Expected output** looks like: Ali, then 20, then Ali is 20.",
    ],
    code: 'console.log("Ali");\nconsole.log(20);\nconsole.log("Ali", "is", 20);',
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "console.log(value) prints the value to the console.",
      "Text goes in quotes. Numbers do not. Math outside quotes is calculated first.",
      "Commas print several values on one line. // starts a comment.",
    ] }],
  },
];
