import type { ArticleSection } from "@/lib/articles";

export const javascriptDeclarationsSections: ArticleSection[] = [
  {
    id: "what-a-variable-is", heading: "What a variable is",
    paragraphs: [
      "**A variable is a name for a value.** Think of a labelled box. The label is the name, and the box holds the value.",
      "**Three keywords create a variable:** let, const, and var. The keyword goes first, then the name, then = and the value.",
      "**Use the name to get the value back.** console.log(age) prints whatever is in the box.",
    ],
    code: 'let age = 20;\nconsole.log(age); // 20',
  },
  {
    id: "meet-let", heading: "let: a box you can refill",
    paragraphs: [
      "**let creates a variable whose value can change.**",
      "**Change it with = alone.** You write let only once, when you create the variable.",
      "**The old value is replaced.** After age = 21, the box holds 21.",
    ],
    code: 'let age = 20;\nconsole.log(age); // 20\n\nage = 21;         // refill the box\nconsole.log(age); // 21',
  },
  {
    id: "meet-const", heading: "const: a box you fill once",
    paragraphs: [
      "**const creates a variable whose value stays the same.** const is short for constant.",
      "**You must fill it when you create it.** const siteName; without a value is an error.",
      "**After that, the value is locked.** You can read it as often as you like.",
    ],
    code: 'const siteName = "My notebook";\nconsole.log(siteName); // My notebook\nconsole.log(siteName); // My notebook, as many times as you want',
  },
  {
    id: "meet-var", heading: "var: the old box",
    paragraphs: [
      "**var is the original keyword** from the first version of JavaScript in 1995.",
      "**It works like let** in simple cases: create the variable, change it later.",
      "**But it has looser rules** that let mistakes slip through. The differences below show them.",
    ],
    code: 'var count = 1;\nconsole.log(count); // 1\n\ncount = 2;\nconsole.log(count); // 2',
  },
  {
    id: "where-to-use-which", heading: "Where to use which",
    paragraphs: [
      "**Use const for values that never change:** a site name, a maximum, a price per item.",
      "**Use let for values that will change:** a score, a counter, the current user's answer.",
      "**Do not use var in new code.** You only need to recognise it when you read older code.",
      "**When unsure, start with const.** If you later need to change the value, JavaScript will tell you with an error, and you switch to let.",
    ],
    code: 'const siteName = "My notebook"; // never changes: const\nconst maxPlayers = 4;           // never changes: const\n\nlet score = 0;                  // will change: let\nscore = score + 10;\nscore = score + 5;\n\nconsole.log(siteName, maxPlayers, score); // My notebook 4 15',
  },
  {
    id: "difference-changing", heading: "Difference 1: can the value change?",
    paragraphs: [
      "**let: yes.** Assign a new value with =.",
      "**var: yes.** Same as let.",
      "**const: no.** Assigning a new value throws a TypeError, and the code stops there.",
    ],
    code: 'let a = 1;\na = 2;\nconsole.log("let:", a);   // let: 2\n\nvar b = 1;\nb = 2;\nconsole.log("var:", b);   // var: 2\n\nconst c = 1;\nc = 2;                    // TypeError: Assignment to constant variable.\nconsole.log("const:", c); // never runs',
  },
  {
    id: "difference-redeclaring", heading: "Difference 2: can you create the same name twice?",
    paragraphs: [
      "**var: yes, silently.** Writing var count twice is allowed. The second one quietly replaces the first.",
      "**let and const: no.** Writing let count twice is a SyntaxError. JavaScript refuses to run the code at all.",
      "**Why it matters.** With var, a typo can overwrite a variable you still needed, and nothing warns you.",
    ],
    code: 'var count = 1;\nvar count = 2;      // allowed with var\nconsole.log(count); // 2',
    blocks: [{ type: "details", title: "Try the same thing with let", paragraphs: ["**Press Run.** The whole snippet is refused with a SyntaxError, because count is declared twice."], code: "let count = 1;\nlet count = 2; // SyntaxError: Identifier 'count' has already been declared\nconsole.log(count);" }],
  },
  {
    id: "difference-braces", heading: "Difference 3: does it stay inside { }?",
    paragraphs: [
      "**Curly braces { } group lines together.** if and for use them. You will meet them properly later; for now, they are a fence around some lines.",
      "**let and const stay inside the fence.** After the closing }, the variable is gone.",
      "**var jumps the fence.** A var created inside { } is still there afterwards.",
      "**typeof reports undefined for a name that does not exist.** The next lesson covers typeof.",
    ],
    code: 'if (true) {\n  var leaked = "still here";\n  let hidden = "gone after the }";\n}\n\nconsole.log(leaked);        // still here\nconsole.log(typeof hidden); // undefined: hidden does not exist out here',
  },
  {
    id: "difference-before-its-line", heading: "Difference 4: can you use it before its line?",
    paragraphs: [
      "**var: yes, but the value is undefined.** JavaScript knows the name from the start, but not the value.",
      "**let and const: no.** Using the name before its line throws a ReferenceError.",
      "**The error is the helpful one.** With var, a wrong order silently gives undefined. With let, you find out at once.",
    ],
    code: 'console.log(early); // undefined: the name exists, the value does not yet\nvar early = "now it has a value";\nconsole.log(early); // now it has a value',
    blocks: [{ type: "details", title: "Try the same thing with let", paragraphs: ["**Press Run.** The first line throws a ReferenceError, because late is not ready yet."], code: 'console.log(late); // ReferenceError: Cannot access \'late\' before initialization\nlet late = "too late";' }],
  },
  {
    id: "all-differences", heading: "All differences in one table",
    paragraphs: [],
    blocks: [
      { type: "table", caption: "let, const, and var compared", columns: ["", "let", "const", "var"], rows: [
        ["Can the value change?", "Yes", "No (TypeError)", "Yes"],
        ["Must have a value at creation?", "No", "Yes", "No"],
        ["Same name twice?", "No (SyntaxError)", "No (SyntaxError)", "Yes, silently"],
        ["Stays inside { }?", "Yes", "Yes", "No"],
        ["Use before its line?", "No (ReferenceError)", "No (ReferenceError)", "Yes, gives undefined"],
        ["Use in new code?", "When the value changes", "By default", "No"],
      ] },
    ],
  },
  {
    id: "try-the-values", heading: "Try let and const",
    paragraphs: ["**Click Next step** to watch the value and output change. Switch to const to compare."],
    blocks: [{ type: "variables-playground" }],
  },
  {
    id: "quick-check", heading: "Quick check",
    paragraphs: [],
    code: 'const city = "Lahore";\ncity = "Karachi";\nconsole.log(city);',
    blocks: [{ type: "quiz", question: "What happens when this code runs?", answers: [
      { text: "A TypeError, because const cannot be changed", correct: true, explanation: "Correct. const locks city to Lahore. The second line throws a TypeError and the code stops before console.log." },
      { text: "It prints Karachi", correct: false, explanation: "That would happen with let. With const, changing the value throws a TypeError." },
      { text: "It prints Lahore", correct: false, explanation: "The code never reaches console.log. The second line throws a TypeError first." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "const for values that never change. let for values that do. var only in old code.",
      "const cannot be reassigned. let and const cannot be declared twice or used before their line.",
      "var jumps { } fences and hides mistakes. That is why let and const were added.",
    ] }],
  },
];
