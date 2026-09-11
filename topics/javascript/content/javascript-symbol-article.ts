import type { ArticleSection } from "@/lib/articles";

export const javascriptSymbolSections: ArticleSection[] = [
  {
    id: "what-a-symbol-is", heading: "What a symbol is",
    paragraphs: [
      "**A symbol creates a unique value.** No other value, and no other symbol, is ever equal to it.",
      "**Symbol(\"id\") creates one.** Call Symbol like console.log: the name, then parentheses.",
      "**It is commonly used as a unique object property key.** An object stores values under names, called keys. Objects get their own lesson later; this lesson only needs the idea.",
      "**Printing a symbol shows Symbol(id).** Its type is symbol, the seventh primitive type.",
    ],
    code: 'const id = Symbol("id");\nconsole.log(id);        // Symbol(id)\nconsole.log(typeof id); // symbol',
  },
  {
    id: "text-inside-symbol-is-optional", heading: "The text inside Symbol() is optional",
    paragraphs: [
      "**The text you pass to Symbol() is a description.** In Symbol(\"id\"), \"id\" is only a label.",
      "**The label helps you, not JavaScript.** It shows up when you print the symbol, so you can tell which one you are looking at while debugging or logging.",
      "**Read the label with .description.** id.description gives \"id\".",
      "**You can create a symbol with no description.** Symbol() with nothing inside works. It prints as Symbol() and its description is undefined.",
    ],
    code: 'const id = Symbol("id");\nconsole.log(id);             // Symbol(id)\nconsole.log(id.description); // id\n\nconst first = Symbol();\nconst second = Symbol();\nconsole.log(first);              // Symbol()\nconsole.log(second);             // Symbol()\nconsole.log(first.description);  // undefined: no label was given',
  },
  {
    id: "every-symbol-is-unique", heading: "Every symbol is unique",
    paragraphs: [
      "**Same description, still different.** Symbol(\"id\") and another Symbol(\"id\") are two separate values. Comparing them with === gives false.",
      "**No description, still different.** Two plain Symbol() calls are also not equal.",
      "**The description does not decide identity.** Each call to Symbol() makes a brand new value, whatever text you pass.",
      "**All of these are valid:** Symbol(), Symbol(\"id\"), Symbol(\"user metadata\"). Use a description when it helps you read the output.",
    ],
    code: 'const first = Symbol("id");\nconst second = Symbol("id");\nconsole.log(first === second); // false: same label, different symbols\n\nconst third = Symbol();\nconst fourth = Symbol();\nconsole.log(third === fourth); // false: no label, still different\n\nconst symbol1 = Symbol();\nconst symbol2 = Symbol("id");\nconst symbol3 = Symbol("user metadata");\nconsole.log(symbol1, symbol2, symbol3); // Symbol() Symbol(id) Symbol(user metadata)',
  },
  {
    id: "what-the-description-does", heading: "What the description does, and does not do",
    paragraphs: [
      "**It is useful for** debugging, logging, and making the symbol's purpose understandable.",
      "**It does not make two symbols equal.** You saw that above.",
      "**It does not act as the actual property key.** The symbol is the key. The text \"id\" is only its label.",
      "**It does not let you reach the value through the text.** user[\"id\"] looks for a key that is the text \"id\". That is not the symbol, so the result is undefined.",
      "**Square brackets around the key** tell JavaScript to use the value inside them as the key. { [id]: 123 } stores 123 under the symbol id. user[id] reads it back.",
    ],
    code: 'const id = Symbol("id");\nconst user = {\n  [id]: 123\n};\n\nconsole.log(user[id]);           // 123: the symbol is the key\nconsole.log(user["id"]);         // undefined: the text is not the key\nconsole.log(user[Symbol("id")]); // undefined: a new symbol is a different key',
    blocks: [{ type: "callout", title: "Which one is the key?", text: "The original id symbol is the actual key. The string \"id\" is only its optional description." }],
  },
  {
    id: "why-not-just-strings", heading: "If we can choose different strings, why do symbols exist?",
    paragraphs: [
      "**Imagine two completely separate libraries.** A library is code written by someone else that you add to your project. Both libraries add information to the same user object.",
      "**Library A picks the text key \"databaseMetadata\"** and stores its data under it.",
      "**Library B knows nothing about Library A.** By coincidence, it picks the same text: \"databaseMetadata\". It stores its own data under it.",
      "**Library B has overwritten Library A's data.** user.databaseMetadata now holds \"Analytics information\". The database information is gone.",
      "**\"Then Library B should choose a different name.\"** Exactly. But that means the two developers must coordinate, or somehow know which names everybody else is using.",
    ],
    code: '// Library A does:\nconst user = {};\nconst keyA = "databaseMetadata";\nuser[keyA] = "Database information";\n\n// Library B, not knowing about A, coincidentally does:\nconst keyB = "databaseMetadata";\nuser[keyB] = "Analytics information";\n\nconsole.log(user.databaseMetadata); // Analytics information: Library A\'s data was overwritten',
  },
  {
    id: "symbols-remove-that-problem", heading: "Symbols remove that problem",
    paragraphs: [
      "**Library A creates its own symbol** with the description \"databaseMetadata\" and uses it as the key.",
      "**Library B creates its own symbol** with the very same description.",
      "**Both developers chose the same description, but the keys are different and unique.** Each Symbol() call made a new value.",
      "**Nothing gets overwritten.** user[keyA] still holds \"Database information\". user[keyB] holds \"Analytics information\". keyA === keyB is false.",
    ],
    code: 'const user = {};\n\n// Library A:\nconst keyA = Symbol("databaseMetadata");\nuser[keyA] = "Database information";\n\n// Library B:\nconst keyB = Symbol("databaseMetadata");\nuser[keyB] = "Analytics information";\n\nconsole.log(user[keyA]);     // Database information\nconsole.log(user[keyB]);     // Analytics information\nconsole.log(keyA === keyB);  // false: nothing was overwritten',
  },
  {
    id: "two-ways-of-thinking", heading: "Two ways of thinking",
    paragraphs: [
      "**With strings you think:** \"I hope nobody else chooses the same property name.\"",
      "**With symbols you think:** \"I don't care what property name anyone else chooses. My key is guaranteed to be unique.\"",
      "**That is the real benefit of Symbol.** You can safely add properties to objects without worrying about colliding with properties added by other code.",
    ],
  },
  {
    id: "question-checking-names", heading: "Question: why not check the existing names first?",
    paragraphs: [
      "**The question.** If we can create a unique key by checking the existing property names and choosing an unused string, why do we need symbols?",
      "**Yes, that works today.** You check the names, pick one that is free, and store your value.",
      "**But other code could later use that same string** and overwrite your value. Your check only protects the moment you ran it.",
      "**Each call to Symbol() creates a unique value, even when the descriptions match.** Using it as a key avoids collisions with keys created elsewhere, without checking existing names or coordinating with other developers.",
      "**Strings require you to manage uniqueness. Symbol() provides it automatically.**",
    ],
  },
  {
    id: "quick-check", heading: "Quick check",
    paragraphs: [],
    code: 'const a = Symbol("key");\nconst b = Symbol("key");\nconsole.log(a === b);',
    blocks: [{ type: "quiz", question: "What does this print?", answers: [
      { text: "false", correct: true, explanation: "Correct. Every call to Symbol() creates a new, unique value. The matching description does not make them equal." },
      { text: "true", correct: false, explanation: "The descriptions match, but the symbols are two different values. Only a === a is true." },
      { text: "An error", correct: false, explanation: "Comparing two symbols is allowed. The answer is simply false." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "Symbol() creates a value that is always unique. The text inside is an optional description.",
      "The description is a label for debugging and logging. It does not make symbols equal, and it is not the key.",
      "Use a symbol as an object key so your property can never collide with a key chosen by other code.",
    ] }],
  },
];
