import type { ArticleSection } from "@/lib/articles";

export const javascriptPrimitivesSections: ArticleSection[] = [
  {
    id: "every-value-has-a-type", heading: "Every value has a type",
    paragraphs: [
      "**A type is the kind of value.** \"Ali\" is text. 25 is a number. true is a yes-or-no answer.",
      "**typeof tells you the type.** Write typeof before a value, and JavaScript answers with a word.",
      "**The answer is text.** typeof 25 gives \"number\", so console.log prints number.",
    ],
    code: 'console.log(typeof "Ali"); // string\nconsole.log(typeof 25);    // number\nconsole.log(typeof true);  // boolean',
  },
  {
    id: "string-number-boolean", heading: "string, number, and boolean",
    paragraphs: [
      "**string** is text inside quotes. \"25\" is a string, even though it looks like a number. The quotes make it text.",
      "**number** is a whole number or a decimal. 20 and 10.5 are both numbers.",
      "**boolean** is either true or false, with no quotes. It answers a yes-or-no question.",
    ],
    code: 'console.log(typeof "25");  // string: the quotes make it text\nconsole.log(typeof 10.5);  // number\nconsole.log(typeof false); // boolean\n\nconsole.log(25 + 25);      // 50: numbers add\nconsole.log("25" + "25");  // 2525: strings join',
  },
  {
    id: "undefined-and-null", heading: "undefined and null",
    paragraphs: [
      "**undefined means no value yet.** A variable created without = holds undefined.",
      "**null means empty on purpose.** You write null yourself to say \"there is nothing here\".",
      "**typeof null says object.** This is an old bug in JavaScript that was never fixed. null is still a primitive.",
    ],
    code: 'let answer;\nconsole.log(answer);        // undefined\nconsole.log(typeof answer); // undefined\n\nlet winner = null;\nconsole.log(winner);        // null\nconsole.log(typeof winner); // object: an old bug, not a real object',
    blocks: [{ type: "callout", title: "Are null and undefined the same?", text: "No. They mean different things, and null === undefined is false. The lesson on comparisons will explain the === sign." }],
  },
  {
    id: "bigint-and-symbol", heading: "bigint and symbol",
    paragraphs: [
      "**bigint** is for whole numbers too large for the normal number type. Add n to the end of the number.",
      "**symbol** is a value that is always unique. Lesson 6 is all about it.",
      "**You will rarely need either one at the start.** They are here so the list of seven is complete.",
    ],
    code: 'console.log(typeof 12345678901234567890n); // bigint\nconsole.log(typeof Symbol("id"));           // symbol',
  },
  {
    id: "the-seven", heading: "All seven together",
    paragraphs: [
      "**These seven are called primitive types.** A primitive is a single, simple value.",
      "**Everything else is an object.** Lists, dates, and functions are objects. They come later in the course.",
    ],
    blocks: [
      { type: "table", caption: "The seven primitive types", columns: ["Type", "Example", "What it is"], rows: [
        ["string", '"Ali"', "Text inside quotes."],
        ["number", "25 or 10.5", "A whole number or a decimal."],
        ["boolean", "true or false", "A yes-or-no value."],
        ["undefined", "let answer;", "No value has been given yet."],
        ["null", "null", "Empty on purpose."],
        ["bigint", "12345678901234567890n", "A very large whole number."],
        ["symbol", 'Symbol("id")', "A value that is always unique."],
      ] },
    ],
  },
  {
    id: "quick-check", heading: "Quick check",
    paragraphs: [],
    code: 'let count = "10";\nconsole.log(typeof count);',
    blocks: [{ type: "quiz", question: "What does this print?", answers: [
      { text: "string", correct: true, explanation: "Correct. \"10\" is inside quotes, so it is text. The quotes decide the type, not what is between them." },
      { text: "number", correct: false, explanation: "10 without quotes would be a number. With quotes, it is a string." },
      { text: "undefined", correct: false, explanation: "count has a value, so it is not undefined. The value is the string \"10\"." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "typeof tells you the kind of a value.",
      "The seven primitives: string, number, boolean, undefined, null, bigint, symbol.",
      "Quotes make a string. undefined means no value yet. null means empty on purpose.",
    ] }],
  },
];
