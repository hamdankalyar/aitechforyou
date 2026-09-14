import type { ArticleSection } from "@/lib/articles";

export const javascriptArrowFunctionsSections: ArticleSection[] = [
  {
    id: "what-an-arrow-function-is", heading: "The fat arrow",
    paragraphs: [
      "**=>** is called the fat arrow.",
      "**An arrow function** is a function written with => instead of the function keyword.",
      "**Parameters** go before the arrow.",
      "**The expression** after the arrow is returned automatically, with no return keyword.",
      {
        text: "**const** stores the arrow function under a name, because it is a value.",
        code: "const add = (x, y) => x + y;\nconsole.log(add(2, 3)); // 5",
      },
      {
        text: "**The same function** as a declaration needs braces and return.",
        code: "function add(x, y) {\n  return x + y;\n}\nconsole.log(add(2, 3)); // 5",
      },
    ],
  },
  {
    id: "one-parameter", heading: "One parameter",
    paragraphs: [
      {
        text: "**Parentheses are optional** with exactly one parameter.",
        code: "const square = x => x * x;\nconsole.log(square(5)); // 25",
      },
      "**(x) => x * x** is the same function with parentheses.",
      {
        text: "**Empty parentheses** are required with no parameter.",
        code: 'const greet = () => "Hello!";\nconsole.log(greet()); // Hello!',
      },
    ],
  },
  {
    id: "multiple-parameters", heading: "Multiple parameters",
    paragraphs: [
      {
        text: "**Parentheses are required** with two or more parameters.",
        code: 'const fullName = (firstName, lastName) => firstName + " " + lastName;\nconsole.log(fullName("Ada", "Lovelace")); // Ada Lovelace',
      },
      {
        text: "**Dropping them** causes SyntaxError before any line runs.",
        code: 'const fullName = firstName, lastName => firstName + " " + lastName; // SyntaxError\nconsole.log(fullName("Ada", "Lovelace"));',
      },
    ],
  },
  {
    id: "block-body", heading: "A body with several steps",
    paragraphs: [
      "**Curly braces** after the arrow hold several statements.",
      {
        text: "**return** is required inside braces to send a value back.",
        code: "const addAndLog = (x, y) => {\n  let sum = x + y;\n  console.log(\"The sum is\", sum); // The sum is 5\n  return sum;\n};\nconsole.log(addAndLog(2, 3)); // 5",
      },
      {
        text: "**Braces without return** give the caller undefined.",
        code: "const addQuiet = (x, y) => {\n  x + y;\n};\nconsole.log(addQuiet(2, 3)); // undefined",
      },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Write three arrow functions** in the editor, then press Run.",
      "**divide** takes two numbers and returns the first divided by the second.",
      "**whisper** takes an uppercase string and prints it in lowercase with toLowerCase().",
      "**shorterThan** takes two arrays and returns whether the first length is less than the second.",
      "**Reset** restores the finished version.",
    ],
    code: 'const divide = (x, y) => x / y;\nconsole.log(divide(10, 2)); // 5\n\nconst whisper = text => console.log(text.toLowerCase()); // hello there\nwhisper("HELLO THERE");\n\nconst shorterThan = (first, second) => first.length < second.length;\nconsole.log(shorterThan([1, 2], [1, 2, 3])); // true',
    blocks: [{ type: "quiz", question: "What does const double = x => { x * 2; }; return when called with double(4)?", answers: [
      { text: "undefined", correct: true, explanation: "Braces create a normal body, and a normal body needs return to send a value back." },
      { text: "8", correct: false, explanation: "8 would be returned only without the braces, or with return x * 2; inside them." },
      { text: "SyntaxError", correct: false, explanation: "The code is valid. One parameter without parentheses is allowed." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**=>** creates a function without the function keyword.",
      "**One expression** after the arrow is returned automatically.",
      "**Parentheses** are optional for one parameter and required for zero or several.",
      "**Braces** need an explicit return.",
    ],
  },
];
