import type { ArticleSection } from "@/lib/articles";

export const javascriptLoopObjectsSections: ArticleSection[] = [
  {
    id: "objects-are-not-iterable", heading: "for...of does not work on an object",
    paragraphs: [
      "**for...of cannot work on an object directly**, because an object is not iterable.",
      "**TypeError** is what you get when you try.",
      {
        text: "**car** is an object, so the loop fails.",
        code: 'const car = { speed: 100, color: "red" };\nfor (const value of car) {\n  console.log(value);\n} // TypeError: car is not iterable',
      },
      {
        text: "**colors** is an array, so the same loop works.",
        code: 'const colors = ["red", "orange", "yellow"];\nfor (const color of colors) {\n  console.log(color); // red, orange, yellow\n}',
      },
      "**Built-in methods** turn an object into an array that for...of can loop over.",
    ],
  },
  {
    id: "object-keys", heading: "Object.keys()",
    paragraphs: [
      "**Object.keys()** receives an object as its parameter.",
      "**This object** is the one you want to loop over.",
      "**It returns an array of strings.** Each string is a property key of the object.",
    ],
    code: 'const car2 = {\n  speed: 200,\n  color: "red"\n};\nconsole.log(Object.keys(car2)); // ["speed","color"]',
  },
  {
    id: "object-values", heading: "Object.values()",
    paragraphs: [
      "**Object.values()** returns the values of the keys in an array.",
      "**The order** matches the order of the keys.",
    ],
    code: 'const car3 = {\n  speed: 300,\n  color: "yellow"\n};\nconsole.log(Object.values(car3)); // [300,"yellow"]',
  },
  {
    id: "object-entries", heading: "Object.entries()",
    paragraphs: [
      "**Object.entries()** returns an array listing both the keys and the values.",
      "**Each item** is a small array: the key first, then its value.",
    ],
    code: 'const car4 = {\n  speed: 400,\n  color: "magenta"\n};\nconsole.log(Object.entries(car4)); // [["speed",400],["color","magenta"]]',
  },
  {
    id: "loop-through-an-object", heading: "How to loop over an object",
    paragraphs: [
      "**Object.keys(clothingItem)** gives an array of keys, so for...of can loop over it.",
      "**key** holds one key per iteration: price, then color, and so on.",
      "**clothingItem[key]** is the trickiest part of this syntax.",
      "**Brackets** read the property whose name is stored in key, as in the objects lesson.",
      "**Dot notation** would not work here, because key is a variable, not a fixed name.",
    ],
    code: 'const clothingItem = {\n  price: 50,\n  color: "beige",\n  material: "cotton",\n  season: "autumn"\n};\nfor (const key of Object.keys(clothingItem)) {\n  console.log(key, ":", clothingItem[key]); // price : 50, color : beige, material : cotton, season : autumn\n}',
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the three lines.",
      "**Change Object.keys to Object.values** and print only the value.",
      "**Try Object.entries** and print each pair.",
      "**Remove Object.keys** and loop over laptop directly to see the TypeError.",
      "**Reset** restores the example.",
    ],
    code: 'const laptop = { brand: "Dell", ram: 16, ssd: true };\nfor (const key of Object.keys(laptop)) {\n  console.log(key + ": " + laptop[key]); // brand: Dell, ram: 16, ssd: true\n}',
    blocks: [{ type: "quiz", question: 'What does Object.keys({ speed: 200, color: "red" }) return?', answers: [
      { text: '["speed", "color"]', correct: true, explanation: "Object.keys() returns the property names as an array of strings." },
      { text: '[200, "red"]', correct: false, explanation: "The values come from Object.values()." },
      { text: '[["speed", 200], ["color", "red"]]', correct: false, explanation: "Key and value pairs come from Object.entries()." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**An object is not iterable**, so for...of on it throws a TypeError.",
      "**Object.keys()** gives the keys, **Object.values()** gives the values, and **Object.entries()** gives key and value pairs. All three return arrays.",
      "**Loop over the keys** with for...of, then read each value with object[key].",
    ],
  },
];
