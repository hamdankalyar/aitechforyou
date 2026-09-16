import type { ArticleSection } from "@/lib/articles";

export const javascriptSpreadRestSections: ArticleSection[] = [
  {
    id: "what-spread-is", heading: "What spread is",
    paragraphs: [
      "**Spread** is written as three dots: ...",
      "**It is another neat trick for iterating over arrays.**",
      "**It takes all the items in an array** and spreads them around, one by one.",
      "**The dots go right before the array name**, as in ...numbers.",
      "**It works on any iterable**, such as an array or a string.",
      {
        text: "**Example:** the same array, with and without the dots.",
        code: "const numbers = [1, 2, 3];\nconsole.log([...numbers, 4, 5]); // [1,2,3,4,5]\nconsole.log([numbers, 4, 5]); // [[1,2,3],4,5]",
      },
      "**...numbers** puts 1, 2, and 3 into the new array one by one.",
      "**Without the dots**, the whole array becomes one item inside the new array.",
    ],
  },
  {
    id: "combine-arrays", heading: "Put one array inside another",
    paragraphs: [
      "**Spread lets us put all the items from one array** inside another array.",
      {
        text: "**Example:** two arrays joined into a third.",
        code: 'const oldBurns = ["square", "wack"];\nconst newBurns = ["basic", "dusty", "sus"];\nconst burnBook = [...oldBurns, ...newBurns];\nconsole.log(burnBook); // ["square","wack","basic","dusty","sus"]\nconsole.log(oldBurns.concat(newBurns)); // ["square","wack","basic","dusty","sus"]',
      },
      "**[...oldBurns, ...newBurns]** is equivalent to oldBurns.concat(newBurns), from the arrays lesson.",
      "**burnBook is a new array.** oldBurns and newBurns do not change.",
      {
        text: "**Example:** a copy of an array.",
        code: 'const oldBurns = ["square", "wack"];\nconst copy = [...oldBurns];\ncopy.push("basic");\nconsole.log(oldBurns); // ["square","wack"]\nconsole.log(copy); // ["square","wack","basic"]',
      },
      "**[...oldBurns]** builds a separate array with the same items.",
      "**Pushing onto the copy** leaves oldBurns alone, unlike a shared reference from the mutability lesson.",
    ],
  },
  {
    id: "spread-arguments", heading: "Pass items as arguments",
    paragraphs: [
      "**Spread also passes all the items from an array** as arguments to a function or method.",
      {
        text: "**Example:** add three skills at once, then print them.",
        code: 'const skills = ["HTML", "CSS", "JS"];\nconst newSkills = ["React", "TypeScript", "Node"];\nskills.push(...newSkills);\nconsole.log(...skills); // HTML CSS JS React TypeScript Node\nconsole.log(skills); // ["HTML","CSS","JS","React","TypeScript","Node"]',
      },
      '**skills.push(...newSkills)** is the same as skills.push("React", "TypeScript", "Node").',
      "**Without the dots**, push would add the whole newSkills array as one item.",
      "**console.log(...skills)** prints each skill as a separate argument, so there are no brackets or commas.",
    ],
  },
  {
    id: "spread-objects", heading: "Spread an object",
    paragraphs: [
      "**Spread also works on objects.** It copies each property into a new object.",
      {
        text: "**Example:** a new object built from an existing one.",
        code: 'const person = { name: "John", age: 30 };\nconst resident = { ...person, city: "New York" };\nconsole.log(resident); // {"name":"John","age":30,"city":"New York"}\nconsole.log(person); // {"name":"John","age":30}\nconsole.log({ ...person, age: 31 }); // {"name":"John","age":31}',
      },
      '**{ ...person, city: "New York" }** copies name and age, then adds city.',
      "**person does not change.** resident is a separate object.",
      "**A property written after the spread** replaces the copied one, so age becomes 31 in the last line.",
    ],
  },
  {
    id: "rest-parameter", heading: "Rest parameter",
    paragraphs: [
      "**Rest** uses the same three dots, but in a function's parameter list.",
      "**It collects many arguments into one array.**",
      "**The function then accepts any number of arguments**, even when the number is unknown.",
      {
        text: "**Example:** a function that adds up any number of values.",
        code: "function sum(...numbers) {\n  let total = 0;\n  for (let number of numbers) {\n    total += number;\n  }\n  return total;\n}\nconsole.log(sum(1, 2, 3)); // 6\nconsole.log(sum(10, 20)); // 30",
      },
      "**...numbers** means: put every argument into an array named numbers.",
      "**numbers is a real array**, so for...of from the loops lesson works on it.",
      "**Named parameters come first.** The rest parameter must be last.",
      "**It collects the remaining arguments** that were not given to the named parameters.",
      {
        text: "**Example:** one named parameter, then the rest.",
        code: 'function logDetails(name, ...details) {\n  console.log(`Name: ${name}`); // Name: John\n  console.log("Details:", details); // Details: [30,"New York"]\n}\nlogDetails("John", 30, "New York");',
      },
      "**name** takes the first argument, John.",
      "**details** takes everything after it as an array: 30 and New York.",
    ],
  },
  {
    id: "spread-vs-rest", heading: "Spread or rest?",
    paragraphs: [
      "**Same three dots, opposite jobs.**",
      "**Spread** spreads an iterable into individual items. Use it to expand or distribute items.",
      "**Rest** collects many items into one array. Use it to gather arguments.",
      { text: "**Where the dots are** tells you which one it is.", bullets: [
        "**In an array, an object, or a function call:** spread.",
        "**In a function's parameter list:** rest.",
      ] },
      "**Both appear below.** The parameter list gathers, the call spreads.",
    ],
    code: "function sum(...numbers) { // rest: collect the arguments\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\nconst scores = [5, 10, 15];\nconsole.log(sum(...scores)); // 30, spread: expand the array",
    blocks: [
      { type: "table", caption: "Spread and rest compared", columns: ["", "Spread", "Rest"], rows: [
        ["Where it appears", "Array literal, object literal, function call", "Function parameter list"],
        ["What it does", "Spreads one array into separate items", "Collects separate arguments into one array"],
        ["Example", "[...numbers, 4, 5]", "function sum(...numbers)"],
      ] },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read both lines.",
      "**Remove the dots from ...second** and run again. Count the items.",
      "**Add a function** count(...items) that returns items.length, then print count(...all).",
      "**Reset** restores the example.",
    ],
    code: "const first = [1, 2];\nconst second = [3, 4];\nconst all = [...first, ...second];\nconsole.log(all); // [1,2,3,4]\nconsole.log(Math.max(...all)); // 4",
    blocks: [{ type: "quiz", question: "What does function f(...args) do with its arguments?", answers: [
      { text: "Collects them into an array named args", correct: true, explanation: "Three dots in a parameter list are the rest parameter. It gathers every argument into one array." },
      { text: "Spreads them into separate values", correct: false, explanation: "Spreading happens in a call or an array, such as f(...list). In a parameter list the dots collect." },
      { text: "Takes only the first argument", correct: false, explanation: "A plain parameter takes one argument. The rest parameter takes all of them." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Spread (...)** takes all the items of an array or object and lays them out one by one.",
      "**Use spread** to combine arrays, copy them, or pass items as arguments.",
      "**Rest (...)** in a parameter list collects any number of arguments into one array.",
      "**Spread expands, rest gathers.**",
    ],
  },
];
