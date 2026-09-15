import type { ArticleSection } from "@/lib/articles";

export const javascriptForInSections: ArticleSection[] = [
  {
    id: "what-for-in-does", heading: "What for...in does",
    paragraphs: [
      "**for...in** loops over the enumerable properties of an object.",
      "**Enumerable** means the property shows up when the object's properties are listed. Properties you write yourself are enumerable.",
      "**key** holds the property name on each iteration, not the value.",
      "**person[key]** reads the value.",
    ],
    code: 'const person = { name: "Alice", age: 25, city: "Wonderland" };\nfor (const key in person) {\n  console.log(key + ": " + person[key]); // name: Alice, age: 25, city: Wonderland\n}',
    blocks: [{ type: "callout", title: "for...in creates a fresh const each time", text: "Use let in a regular for loop because count++ reassigns the same counter." }],
  },
  {
    id: "inherited-properties", heading: "for...in also shows inherited properties",
    paragraphs: [
      "**An object can inherit properties** from another object, called its prototype.",
      "**Prototypes** are taught in the OOP section. Here you only need Object.create(car), which makes a new object that inherits from car.",
      {
        text: "**console.log(car1)** shows only the property defined on car1 itself. engine is inherited, so it is not displayed, but car1.engine still works.",
        code: 'const car = { engine: "working" };\nconst car1 = Object.create(car);\ncar1.speed = 100;\nconsole.log(car1); // {"speed":100}\nconsole.log(car1.engine); // working',
      },
      {
        text: "**for...in** lists speed and engine, because it also walks the inherited properties.",
        code: 'const car = { engine: "working" };\nconst car1 = Object.create(car);\ncar1.speed = 100;\nfor (const key in car1) {\n  console.log("for in", key); // for in speed, for in engine\n}\nfor (const prop of Object.keys(car1)) {\n  console.log("for of", prop); // for of speed\n}',
      },
      "**for...of with Object.keys()** shows only car1's own properties, not the prototype's.",
      "**for...in** shows all properties of car1 and car.",
    ],
  },
  {
    id: "which-loop", heading: "Which loop to use",
    paragraphs: [
      "**break** ends a loop at once. **continue** skips to the next iteration.",
      "**return** inside a function also ends the loop, because it ends the whole function.",
      "**for, for...of, and for...in** can all use break, continue, and return.",
      "**forEach** cannot be stopped early with any of them.",
      "**for...of** is for iterables such as arrays and strings. It does not work on objects.",
      "**forEach** is for applying a function to each array item.",
      "**for...in** is for object properties. Avoid it with arrays, because it can list inherited properties and non-number keys.",
    ],
    code: 'for (const n of [1, 2, 3, 4]) {\n  if (n === 3) break;\n  console.log(n); // 1, 2\n}',
    blocks: [
      { type: "table", caption: "Three loops compared", columns: ["Loop", "Works on", "Gives you", "Can stop early"], rows: [
        ["for...of", "Iterables: arrays, strings, and later maps and sets", "Each value", "Yes (break)"],
        ["forEach", "Arrays only", "Each value, its index, and the array", "No"],
        ["for...in", "Objects", "Each property key, including inherited ones", "Yes (break)"],
      ] },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the three lines.",
      "**Change for...in to for...of with Object.keys(extra)** and run again.",
      "**Add console.log(extra[key])** inside the loop.",
      "**Reset** restores the example.",
    ],
    code: 'const book = { title: "Dune", pages: 412 };\nconst extra = Object.create(book);\nextra.rating = 5;\nfor (const key in extra) {\n  console.log(key); // rating, title, pages\n}',
    blocks: [{ type: "quiz", question: "After switching to for (const key of Object.keys(extra)), what prints?", answers: [
      { text: "rating only", correct: true, explanation: "Object.keys() lists only the object's own properties." },
      { text: "rating, title, pages", correct: false, explanation: "That is for...in, which also walks the inherited properties." },
      { text: "TypeError", correct: false, explanation: "Object.keys() returns an array, and arrays are iterable." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**for...in** loops over an object's property keys.",
      "**It includes inherited properties.** Object.keys() gives only the object's own keys.",
      "**Pick the loop by the data:** for...of for iterables, forEach for arrays, for...in for objects.",
    ],
  },
];
