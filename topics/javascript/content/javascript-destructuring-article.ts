import type { ArticleSection } from "@/lib/articles";

export const javascriptDestructuringSections: ArticleSection[] = [
  {
    id: "object-destructuring", heading: "Get values from an object",
    paragraphs: [
      "**Destructuring** is a shortcut for taking values out of an object or an array.",
      "**Object destructuring** uses curly braces around the property names you want.",
      "**The new variables** receive the matching values from the object.",
      { text: "**This example** takes name and age from person.", code: 'const person = { name: "John", age: 30 };\nconst { name, age } = person;\n\nconsole.log(name); // John\nconsole.log(age);  // 30' },
    ],
  },
  {
    id: "array-destructuring", heading: "Get values from an array",
    paragraphs: [
      "**Array destructuring** uses square brackets around new variable names.",
      "**The first variable** receives the first array item.",
      "**The next variables** receive the next array items in order.",
      { text: "**This example** puts each number into its own variable.", code: "const numbers = [1, 2, 3];\nconst [a, b, c] = numbers;\n\nconsole.log(a); // 1\nconsole.log(b); // 2\nconsole.log(c); // 3" },
    ],
  },
  {
    id: "matching-names", heading: "Use the exact property name",
    paragraphs: [
      "**Object destructuring** looks for a property with the same name.",
      "**Math.PI** has uppercase letters, so the destructuring name must also be PI.",
      "**A missing property** gives undefined.",
      { text: "**This example** finds PI and misses lowercase pi.", code: "const { PI, pi } = Math;\n\nconsole.log(PI === Math.PI); // true\nconsole.log(pi); // undefined" },
    ],
  },
  {
    id: "separate-number", heading: "A destructured number is separate",
    paragraphs: [
      "**PI** starts with the same number as Math.PI.",
      "**Changing PI** does not change Math.PI.",
      "**This works because numbers are separate values.**",
      { text: "**This example** changes only the PI variable.", code: "let { PI } = Math;\nconsole.log(PI === Math.PI); // true\n\nPI = 1;\nconsole.log(PI === Math.PI); // false" },
    ],
  },
  {
    id: "skip-array-items", heading: "Skip array items",
    paragraphs: [
      "**A blank space between commas** skips one array item.",
      "**The third variable position** receives the third array item in this example.",
      { text: "**Two commas** skip Sporty and Scary.", code: 'const spices = ["Sporty", "Scary", "Ginger", "Mel B"];\nconst [, , ginger] = spices;\n\nconsole.log(ginger); // Ginger' },
    ],
  },
  {
    id: "collect-the-rest", heading: "Collect the remaining items",
    paragraphs: [
      "**Three dots (...)** collect the remaining array items into a new array.",
      "**The rest variable** must be the last name inside the square brackets.",
      { text: "**babySpice** takes the first item and adultSpices takes the rest.", code: 'const spices = ["Sporty", "Scary", "Ginger", "Mel B"];\nconst [babySpice, ...adultSpices] = spices;\n\nconsole.log(babySpice);   // Sporty\nconsole.log(adultSpices); // ["Scary","Ginger","Mel B"]' },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the two values.",
      "**Change name** inside the curly braces to a property that does not exist.",
      "**Reset** restores the example.",
    ],
    code: 'const book = { title: "Dune", year: 1965 };\nconst { title, year } = book;\n\nconsole.log(title); // Dune\nconsole.log(year);  // 1965',
    blocks: [{ type: "quiz", question: `What does const [first, second] = ["a", "b"]; create?`, answers: [
      { text: "first is \"a\" and second is \"b\"", correct: true, explanation: "Array destructuring takes items in order." },
      { text: "first is the whole array", correct: false, explanation: "Square brackets take individual items from the array." },
      { text: "first is \"b\" and second is \"a\"", correct: false, explanation: "The first variable receives the first item." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Object destructuring** takes values by property name.",
      "**Array destructuring** takes values by item position.",
      "**Matching names** matter when destructuring an object.",
      "**Three dots** collect remaining array items into a new array.",
    ],
  },
];
