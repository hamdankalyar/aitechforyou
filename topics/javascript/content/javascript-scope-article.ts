import type { ArticleSection } from "@/lib/articles";

export const javascriptScopeSections: ArticleSection[] = [
  {
    id: "what-scope-is", heading: "What scope is",
    paragraphs: [
      "**Scope** is the area of the program where a variable can be used.",
      "**Where** you declare a variable decides its scope.",
      {
        text: "**bankruptcy** is declared inside the function, so it can be used only inside the function.",
        code: "function declareBankruptcy() {\n  let bankruptcy = true;\n}\ndeclareBankruptcy();\nconsole.log(bankruptcy); // ReferenceError: bankruptcy is not defined",
      },
      "**ReferenceError** is what you get when you use a variable outside its scope.",
    ],
  },
  {
    id: "global-and-function-scope", heading: "Global scope and function scope",
    paragraphs: [
      "**Global scope** is everything outside a function.",
      "**Function scope** is everything inside a function's braces.",
      "**Every function** gets its own scope.",
      {
        text: "**Two variables named planet** exist here. One is global, one belongs to scopeOut.",
        code: 'let planet = "Jupiter";\nfunction scopeOut() {\n  let planet = "Mars";\n  console.log("Inner planet:", planet); // Inner planet: Mars\n}\nscopeOut();\nconsole.log("Outer planet:", planet); // Outer planet: Jupiter',
      },
      "**The inner planet** does not touch the global planet.",
    ],
  },
  {
    id: "inside-sees-outside", heading: "Inside can see outside, outside cannot see inside",
    paragraphs: [
      "**Code inside a function** can use global variables.",
      "**Code outside a function** cannot use that function's variables.",
      {
        text: "**globalVariable** works inside narrowerScope. **localVariable** fails outside it.",
        code: 'let globalVariable = "I live in global scope";\nfunction narrowerScope() {\n  console.log(globalVariable); // I live in global scope\n  let localVariable = "I live in the function scope";\n}\nnarrowerScope();\nconsole.log(localVariable); // ReferenceError: localVariable is not defined',
      },
    ],
  },
  {
    id: "changing-outer-variables", heading: "A function can change a global variable",
    paragraphs: [
      "**Assigning without let** changes the existing global variable.",
      {
        text: "**trap** changes feeling for the whole program.",
        code: 'let feeling = "free";\nfunction trap() {\n  feeling = "boxedIn";\n}\ntrap();\nconsole.log(feeling); // boxedIn',
      },
      "**Useful** when a function must update shared data.",
      "**Dangerous** when the caller does not expect the change.",
    ],
  },
  {
    id: "block-scope", heading: "Block scope: let and const",
    paragraphs: [
      "**A block** is any pair of braces, such as the body of if.",
      "**let and const** stay inside the block where they are declared.",
      {
        text: "**inner** cannot be used after the if block ends.",
        code: 'if (true) {\n  let inner = "block only";\n  console.log(inner); // block only\n}\nconsole.log(inner); // ReferenceError: inner is not defined',
      },
    ],
  },
  {
    id: "var-scope", heading: "var scope",
    paragraphs: [
      "**var** ignores blocks.",
      {
        text: "**leaked** is still usable after the if block ends.",
        code: 'if (true) {\n  var leaked = "block ignored";\n}\nconsole.log(leaked); // block ignored',
      },
      "**var** does respect function scope.",
      {
        text: "**total** stays inside count, like let would.",
        code: "function count() {\n  var total = 3;\n}\ncount();\nconsole.log(total); // ReferenceError: total is not defined",
      },
      "**Use let and const** in new code so blocks behave as expected.",
    ],
    blocks: [
      { type: "table", caption: "Where each keyword stays", columns: ["Declared with", "Inside a function", "Inside an if block"], rows: [
        ["let", "Stays inside", "Stays inside"],
        ["const", "Stays inside", "Stays inside"],
        ["var", "Stays inside", "Leaks out"],
      ] },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read both lines.",
      "**Add let** before score = 20 inside the function, then run again.",
      "**Change let to var** and run once more.",
      "**Reset** restores the example.",
    ],
    code: 'let score = 10;\nfunction play() {\n  score = 20;\n  console.log("Inside:", score); // Inside: 20\n}\nplay();\nconsole.log("Outside:", score); // Outside: 20',
    blocks: [{ type: "quiz", question: "After adding let before score = 20 inside play, what does the last line print?", answers: [
      { text: "Outside: 10", correct: true, explanation: "let creates a separate inner score. The global score keeps 10." },
      { text: "Outside: 20", correct: false, explanation: "20 reaches the global score only when the function assigns without let." },
      { text: "ReferenceError", correct: false, explanation: "The global score still exists, so reading it works." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Scope** is where a variable can be used.",
      "**Inside a function** you can read global variables. Outside, you cannot read the function's variables.",
      "**Assigning without let** changes the global variable.",
      "**let and const** stay inside blocks. **var** leaks out of blocks but stays inside functions.",
    ],
  },
];
