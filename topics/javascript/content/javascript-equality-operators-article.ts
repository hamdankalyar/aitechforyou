import type { ArticleSection } from "@/lib/articles";

export const javascriptEqualityOperatorsSections: ArticleSection[] = [
  {
    id: "loose-equality", heading: "The equality operator: ==",
    paragraphs: [
      { text: "**A comparison operator** asks a question about two values:", bullets: [
        "**Operands** are the values on either side.",
        "**The answer** is a boolean: true or false.",
      ] },
      { text: "**== checks loose equality:**", bullets: [
        "**Type coercion** means automatically converting a value to another type for an operation.",
        "**The operand types** decide which conversion rule applies.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 == 5** is true. The numbers match.",
        "**5 == 6** is false. The numbers differ.",
        "**5 == \"5\"** is true. JavaScript converts the string (text) \"5\" to the number 5 for this comparison.",
      ] },
    ],
    code: 'console.log(5 == 5); // true\nconsole.log(5 == 6); // false\nconsole.log(5 == "5"); // true',
  },
  {
    id: "strict-equality", heading: "The strict equality operator: ===",
    paragraphs: [
      { text: "**=== compares without type coercion.** Notice the three equals signs:", bullets: [
        "**Different types** always give false.",
        "**Ordinary numbers or strings of the same type** must also have matching values.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 === 5** is true. Both operands are the same number.",
        "**5 === \"5\"** is false. A number and a string have different types.",
        "**\"5\" === \"5\"** is true. Both operands are the same string.",
        "**5 === 6** is false. The types match, but the values differ.",
      ] },
      "**Comparing different types is allowed.** It returns false without throwing an error or changing either value.",
      "**Prefer ===** for equality checks without automatic conversion.",
    ],
    code: 'console.log(5 === 5); // true\nconsole.log(5 === "5"); // false\nconsole.log("5" === "5"); // true\nconsole.log(5 === 6); // false',
  },
  {
    id: "loose-inequality", heading: "The inequality operator: !=",
    paragraphs: [
      { text: "**!= is the opposite of ==:**", bullets: [
        "**Use the same conversion rules** as loose equality.",
        "**Equal after those rules?** Return false.",
        "**Not equal after those rules?** Return true.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 != 5** is false. The numbers match.",
        "**5 != 6** is true. The numbers differ.",
        "**5 != \"5\"** is false. The string converts to 5, so the operands count as equal.",
      ] },
    ],
    code: 'console.log(5 != 5); // false\nconsole.log(5 != 6); // true\nconsole.log(5 != "5"); // false',
  },
  {
    id: "strict-inequality", heading: "The strict inequality operator: !==",
    paragraphs: [
      { text: "**!== is the opposite of ===:**", bullets: [
        "**No type coercion** happens.",
        "**Strictly equal?** Return false.",
        "**Not strictly equal?** Return true.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 !== 5** is false. Both operands are the same number.",
        "**5 !== \"5\"** is true. The types differ.",
        "**5 !== 6** is true. The values differ.",
      ] },
    ],
    code: 'console.log(5 !== 5); // false\nconsole.log(5 !== "5"); // true\nconsole.log(5 !== 6); // true',
  },
  {
    id: "surprising-comparisons", heading: "A few comparisons to watch for",
    paragraphs: [
      { text: "**false becomes 0** in a loose comparison with a number:", bullets: [
        "**0 == false** is true because of conversion.",
        "**0 === false** is false because the types differ.",
      ] },
      { text: "**null and undefined** are a special loose-equality pair:", bullets: [
        "**null == undefined** is true.",
        "**null === undefined** is false. Strict equality keeps them distinct.",
      ] },
      { text: "**NaN means Not-a-Number.** It is a special number value for an invalid numeric result:", bullets: [
        "**NaN == NaN** is false.",
        "**NaN === NaN** is also false.",
        "**NaN !== NaN** is true because it reverses the strict equality result.",
      ] },
    ],
    code: 'console.log(0 == false); // true\nconsole.log(0 === false); // false\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false\nconsole.log(NaN == NaN); // false\nconsole.log(NaN === NaN); // false\nconsole.log(NaN !== NaN); // true',
  },
  {
    id: "compare-the-operators", heading: "The four operators together",
    paragraphs: [
      { text: "**Choose the comparison you need:**", bullets: [
        "**=== and !==** compare without automatic conversion.",
        "**== and !=** use loose-equality conversion rules.",
      ] },
      { text: "**One equals sign has a different job:**", bullets: [
        "**=** assigns a value, as in let score = 5.",
        "**== and ===** compare values for equality.",
      ] },
    ],
    blocks: [{ type: "table", caption: "Comparing the number 5 and the string \"5\"", columns: ["Operator", "Question", "Example", "Result"], rows: [
      ["==", "Equal under loose-equality rules?", '5 == "5"', "true"],
      ["===", "Equal without conversion?", '5 === "5"', "false"],
      ["!=", "Not equal under loose-equality rules?", '5 != "5"', "false"],
      ["!==", "Not equal without conversion?", '5 !== "5"', "true"],
    ] }],
  },
  {
    id: "try-it-yourself", heading: "Run it yourself",
    paragraphs: [
      { text: "**Start with a number and a string:**", bullets: [
        "**Run the code** and read the four answers.",
        "**Remove the quotes** around \"5\" in typedScore to make it a number.",
        "**Predict which answers change,** then run again.",
      ] },
    ],
    code: 'const score = 5;\nconst typedScore = "5";\nconsole.log(score == typedScore); // true\nconsole.log(score === typedScore); // false\nconsole.log(score != typedScore); // false\nconsole.log(score !== typedScore); // true',
    blocks: [{ type: "quiz", question: 'What does 5 !== "5" return?', answers: [
      { text: "true", correct: true, explanation: "Correct. Strict inequality returns true because the number and the string have different types." },
      { text: "false", correct: false, explanation: "That is the result of 5 != \"5\". The strict operator !== does not convert the string." },
      { text: "TypeError", correct: false, explanation: "Comparing a number with a string is allowed. Strict inequality returns a boolean." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "== and != use loose-equality conversion rules.",
      "=== and !== compare without type coercion.",
      "!= is the opposite of ==. !== is the opposite of ===.",
      "NaN is not equal to itself with either equality operator.",
    ] }],
  },
];
