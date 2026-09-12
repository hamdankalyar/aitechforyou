import type { ArticleSection } from "@/lib/articles";

export const javascriptOperatorPrecedenceSections: ArticleSection[] = [
  {
    id: "which-calculation-first", heading: "Which calculation happens first?",
    paragraphs: [
      { text: "**An operator** is a sign that performs an action on values. With numbers:", bullets: [
        "**+** adds.",
        "**-** subtracts.",
        "**The * sign** multiplies.",
        "**/** divides.",
      ] },
      { text: "**An expression** evaluates (also called resolves) to a value.", bullets: [
        "**It asks JavaScript for a value.**",
        "**A variable name:** myAssignedVariable gets the variable's value.",
        "**A calculation:** 6 + 4 evaluates to 10.",
        "**A page lookup:** document.getElementById(\"board\") evaluates to the matching page element.",
      ] },
      { text: "**A statement** tells JavaScript to do something.", bullets: [
        "**Declare and assign a variable:** let ten = 6 + 4;",
        "**Assign a new value:** myDeclaredVariable = \"new value\";",
        "**Store a page element:** let board = document.getElementById(\"board\");",
      ] },
      { text: "**Precedence** means which operator takes priority. Without extra parentheses:", bullets: [
        "**First:** multiply and divide.",
        "**Then:** add and subtract.",
      ] },
    ],
    code: 'console.log(4 + 1 * 2); // 6\nconsole.log(10 - 6 / 2); // 7\nconsole.log(4 + 2); // 6',
    blocks: [{ type: "table", caption: "Order for the arithmetic in this lesson", columns: ["Priority", "Signs", "What to do"], rows: [
      ["First", "( )", "Work out the grouped calculation using these same rules."],
      ["Next", "* and /", "Multiply and divide from left to right."],
      ["Last", "+ and -", "Add and subtract from left to right."],
    ] }],
  },
  {
    id: "same-priority", heading: "Equal priority means left to right",
    paragraphs: [
      { text: "**DMAS is a reminder,** but division does not always come before multiplication:", bullets: [
        "**Multiplication and division** share one priority level.",
        "**Addition and subtraction** share another priority level.",
        "**At either level,** work from left to right.",
      ] },
      { text: "**12 / 3 * 2** groups as (12 / 3) * 2:", bullets: [
        "**12 / 3** gives 4.",
        "**4 * 2** gives 8.",
      ] },
      { text: "**10 - 3 + 2** groups as (10 - 3) + 2:", bullets: [
        "**10 - 3** gives 7.",
        "**7 + 2** gives 9.",
        "**Adding 3 + 2 first** would change the answer to 5.",
      ] },
    ],
    code: 'console.log(12 / 3 * 2); // 8\nconsole.log(12 / (3 * 2)); // 2\nconsole.log(10 - 3 + 2); // 9\nconsole.log(10 - (3 + 2)); // 5',
  },
  {
    id: "worked-example", heading: "Work through 4 + 1 * 2 * 4 + 2",
    paragraphs: [
      { text: "**Multiply first:** group 1 * 2 * 4 as (1 * 2) * 4.", bullets: [
        "**1 * 2** gives 2.",
        "**2 * 4** gives 8.",
      ] },
      { text: "**Add next:** the calculation is now 4 + 8 + 2.", bullets: [
        "**4 + 8** gives 12.",
        "**12 + 2** gives 14.",
      ] },
      "**Each line below** shows a stage and prints the same final answer: 14.",
    ],
    code: 'console.log(4 + 1 * 2 * 4 + 2); // 14\nconsole.log(4 + (1 * 2) * 4 + 2); // 14\nconsole.log(4 + 8 + 2); // 14\nconsole.log(12 + 2); // 14',
  },
  {
    id: "use-parentheses", heading: "Parentheses can change the answer",
    paragraphs: [
      { text: "**Grouping parentheses** tell JavaScript which part to calculate together. In (4 + 1) * 2 * 4 + 2:", bullets: [
        "**Start with (4 + 1):** that gives 5.",
        "**Multiply 5 * 2 * 4:** that gives 40.",
        "**Add the last 2:** the answer is 42.",
      ] },
      { text: "**Use round parentheses for arithmetic groups:**", bullets: [
        "**( )** groups a calculation.",
        "**[ ] and { }** have other jobs in JavaScript, covered in later lessons.",
      ] },
      { text: "**In console.log((4 + 1) * 2):**", bullets: [
        "**The outer parentheses** hold what you want to print.",
        "**The inner parentheses** group 4 + 1 before multiplication.",
      ] },
    ],
    code: 'console.log(4 + 1 * 2 * 4 + 2); // 14\nconsole.log((4 + 1) * 2 * 4 + 2); // 42\nconsole.log((4 + 1) * 2 * (4 + 2)); // 60',
  },
  {
    id: "try-it-yourself", heading: "Run it yourself",
    paragraphs: [
      { text: "**Try changing the grouping:**", bullets: [
        "**Predict** the result of each line.",
        "**Press Run** to check your answers.",
        "**Change the parentheses** and run again to see what changes.",
      ] },
    ],
    code: 'console.log(8 - 2 * 3); // 2\nconsole.log((8 - 2) * 3); // 18\nconsole.log(8 / 2 * 2); // 8',
    blocks: [{ type: "quiz", question: "What does 4 + 1 * 2 * 4 + 2 produce?", answers: [
      { text: "14", correct: true, explanation: "Correct. Multiply 1 * 2 * 4 to get 8, then add 4 + 8 + 2." },
      { text: "42", correct: false, explanation: "42 comes from (4 + 1) * 2 * 4 + 2. Without those parentheses, multiplication takes priority." },
      { text: "60", correct: false, explanation: "60 comes from (4 + 1) * 2 * (4 + 2). The original expression does not group either addition." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "Multiply and divide before adding and subtracting.",
      "At either priority level, work from left to right.",
      "Round parentheses group a calculation.",
      "4 + 1 * 2 * 4 + 2 gives 14.",
    ] }],
  },
];
