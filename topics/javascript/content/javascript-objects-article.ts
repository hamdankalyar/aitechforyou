import type { ArticleSection } from "@/lib/articles";

export const javascriptObjectsSections: ArticleSection[] = [
  {
    id: "what-an-object-is", heading: "Keep related values together",
    paragraphs: [
      {
        text: "**An object** groups related values together.",
        bullets: [
          "**Purpose:** keep information about the same thing in one place.",
          "**This example:** collect the name, popularity, release year, and creator of JavaScript.",
        ],
        code: 'const javascript = {\n  name: "JavaScript",\n  isPopular: true,\n  releaseYear: 1995,\n  creator: "Brendan Eich"\n};\n\nconsole.log(javascript); // {"name":"JavaScript","isPopular":true,"releaseYear":1995,"creator":"Brendan Eich"}',
      },
      {
        text: "**Object literal syntax** creates an object using { and }.",
        bullets: [
          "**{ and }** are called curly brackets or curly braces.",
          "**{}** creates an empty object when nothing is written between the braces.",
        ],
        code: 'const language = {};\n\nconsole.log(language); // {}',
      },
      {
        text: "**A key-value pair** is called a property.",
        bullets: [
          "**name** is the key, also called the property name.",
          "**\"JavaScript\"** is the property value.",
          "**The colon (:)** separates the key from its value.",
          "**The comma (,)** separates one property from the next.",
        ],
        code: 'const language = {\n  name: "JavaScript",  // property: key = name, value = "JavaScript"\n  releaseYear: 1995    // property: key = releaseYear, value = 1995\n};\n\nconsole.log(language.name);        // JavaScript\nconsole.log(language.releaseYear); // 1995',
      },
      {
        text: "**JavaScript values** are primitives or objects.",
        bullets: [
          "**null** is a primitive value.",
          "**typeof null** gives \"object\" because of an old JavaScript behavior.",
        ],
        code: 'const value = null;\n\nconsole.log(typeof value);   // object: an old JavaScript behavior\nconsole.log(value === null); // true: null is still a primitive',
      },
    ],
  },
  {
    id: "read-and-use-properties", heading: "Read and use properties",
    paragraphs: [
      {
        text: "**Dot notation** reads a named property.",
        bullets: ["**javascript.name** gives the value of the name property."],
        code: 'const javascript = { name: "JavaScript" };\n\nconsole.log(javascript.name); // JavaScript',
      },
      {
        text: "**Bracket notation** reads a property from text or a variable.",
        bullets: ["**A variable inside brackets** lets you choose which property to read."],
        code: 'const javascript = { name: "JavaScript", releaseYear: 1995 };\nconst propertyName = "name";\n\nconsole.log(javascript["releaseYear"]); // 1995\nconsole.log(javascript[propertyName]);  // JavaScript',
      },
      {
        text: "**Property values** work like other values.",
        bullets: [
          "**A string property** can use a string method.",
          "**A number property** can be used in a calculation.",
        ],
        code: 'const javascript = { name: "JavaScript", releaseYear: 1995 };\n\nconsole.log(javascript.name.includes("Script")); // true\nconsole.log(2026 - javascript.releaseYear);       // 31',
      },
      {
        text: "**A missing property** gives undefined.",
        bullets: ["**Reading it** does not cause an error."],
        code: 'const javascript = { name: "JavaScript" };\n\nconsole.log(javascript.version); // undefined',
      },
    ],
  },
  {
    id: "change-properties", heading: "Change properties",
    paragraphs: [
      {
        text: "**Assignment** changes an existing property.",
        bullets: ["**const** still allows the object's properties to change."],
        code: 'const profile = { name: "Ali" };\nprofile.name = "Sara";\n\nconsole.log(profile.name); // Sara',
      },
    ],
  },
  {
    id: "add-properties", heading: "Add properties",
    paragraphs: [
      {
        text: "**Assignment** adds a missing property.",
        bullets: ["**profile.age** is created when it receives a value."],
        code: 'const profile = { name: "Ali" };\nprofile.age = 20;\n\nconsole.log(profile.age); // 20',
      },
    ],
  },
  {
    id: "delete-properties", heading: "Delete properties",
    paragraphs: [
      {
        text: "**delete** removes a property.",
        bullets: ["**profile.age** gives undefined after it is deleted in this example."],
        code: 'const profile = { name: "Ali", age: 20 };\ndelete profile.age;\n\nconsole.log(profile.age); // undefined',
      },
    ],
  },
  {
    id: "freeze-properties", heading: "Freeze properties",
    paragraphs: [
      {
        text: "**Object.freeze(object)** prevents later changes to the object's own properties.",
        bullets: ["**Strict mode:** trying to change a frozen property causes a TypeError."],
        code: '"use strict";\nconst profile = { name: "Sara" };\nObject.freeze(profile);\nconsole.log(profile.name); // Sara\n\nprofile.name = "Hamza"; // TypeError: a frozen property cannot change',
      },
    ],
  },
  {
    id: "methods-and-this", heading: "Methods and this",
    paragraphs: [
      {
        text: "**A method** is a function stored in a property.",
        bullets: ["**Parentheses ()** after the method name run it."],
        code: 'const dog = {\n  speak: function () {\n    console.log("Woof"); // Woof\n  }\n};\n\ndog.speak();',
      },
      {
        text: "**this** refers to the object used for the call.",
        bullets: ["**this.name** reads person.name inside person.speak()."],
        code: 'const person = {\n  name: "Anjana",\n  speak: function () {\n    console.log("Hi, my name is", this.name); // Hi, my name is Anjana\n  }\n};\n\nperson.speak();',
      },
    ],
  },
  {
    id: "nested-values", heading: "Objects and arrays can be nested",
    paragraphs: [
      {
        text: "**A nested object** is an object inside another object.",
        bullets: ["**Another dot** lets you read a property inside the nested object."],
        code: 'const menu = {\n  lunch: { dessert: "tiramisu" }\n};\n\nconsole.log(menu.lunch.dessert); // tiramisu',
      },
      {
        text: "**Objects and arrays** can store each other.",
        bullets: [
          "**albums** holds an array inside an object.",
          "**members** holds an object inside an array.",
          "**Arrays** get their own lesson next.",
        ],
        code: 'const spiceGirls = {\n  albums: ["Spice", "Spiceworld"],\n  members: [{ name: "Emma", nickname: "Baby" }]\n};\n\nconsole.log(spiceGirls.albums[0]);           // Spice\nconsole.log(spiceGirls.members[0].nickname); // Baby',
      },
    ],
  },
  {
    id: "built-in-objects", heading: "Built-in objects",
    paragraphs: [
      {
        text: "**console and Math** are built-in objects.",
        bullets: [
          "**console.log()** is a method that prints values.",
          "**Math.abs()** is a method that returns a number's absolute value.",
          "**Math.PI** is a property that holds the value of pi.",
        ],
        code: 'console.log(Math.PI);      // 3.141592653589793\nconsole.log(Math.abs(-5)); // 5',
      },
      {
        text: "**document** is a browser object.",
        bullets: ["**This example's document** represents the page inside its browser sandbox."],
        code: 'document.title = "Objects";\n\nconsole.log(document.title); // Objects',
      },
      {
        text: "**Strings** are primitive values, not objects.",
        bullets: [
          "**JavaScript** automatically wraps them in temporary String objects when you access properties or methods.",
          "**The original string** remains a primitive value.",
        ],
        code: 'const hello = "hello";\nconsole.log(hello.length); // 5\nconst yello = hello.toUpperCase();\nconsole.log(yello); // HELLO',
      },
    ],
  },
  {
    id: "quick-check", heading: "Quick check",
    paragraphs: [
      {
        text: "**Read the operations in order.**",
        bullets: [
          "**book.pages** starts at 412.",
          "**Assignment** changes book.pages to 500.",
          "**book.describe()** then reads the updated value through this.pages.",
        ],
        code: 'const book = {\n  title: "Dune",\n  pages: 412,\n  describe: function () {\n    console.log(this.title, this.pages); // Dune 500\n  }\n};\nbook.pages = 500;\nbook.describe();',
      },
    ],
    blocks: [{ type: "quiz", question: "What does book.describe() print?", answers: [
      { text: "Dune 500", correct: true, explanation: "Correct. book.pages changes to 500 before the method reads it through this.pages." },
      { text: "Dune 412", correct: false, explanation: "412 was the first value, but book.pages changes to 500 before describe() runs." },
      { text: "undefined 500", correct: false, explanation: "this refers to book during book.describe(), so this.title gives Dune." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      { text: "**Objects** group related values under property names." },
      {
        text: "**Property access** reads values from an object.",
        bullets: [
          "**Dot notation** reads a known property.",
          "**Bracket notation** can use text or a variable.",
        ],
      },
      {
        text: "**Properties** can be changed, added, or deleted.",
        bullets: ["**Object.freeze()** prevents changes to the object's own properties."],
      },
      {
        text: "**A method** is a function stored in a property.",
        bullets: ["**this** can read other properties from the object used for the call."],
      },
    ],
  },
];
