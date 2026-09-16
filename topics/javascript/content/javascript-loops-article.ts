import type { ArticleSection } from "@/lib/articles";

export const javascriptLoopsSections: ArticleSection[] = [
  {
    id: "what-a-loop-is", heading: "What a loop is",
    paragraphs: [
      "**A loop** runs the same chunk of code many times.",
      "**Iteration** is the name for running the same code again and again.",
      "**The body** is the code between the braces. It runs once per iteration.",
      "**rep** goes from 0 to 9, so the body runs 10 times.",
      "**The last line** is outside the loop, so it runs once, after the loop ends.",
    ],
    code: 'for (let rep = 0; rep < 10; rep += 1) {\n  console.log("now doing rep", rep); // now doing rep 0, then 1, up to now doing rep 9\n}\nconsole.log("do you even lift bro"); // do you even lift bro',
  },
  {
    id: "three-parts", heading: "The three parts of a for loop",
    paragraphs: [
      "**for** is the keyword that starts a counting loop.",
      { text: "**Three parts** go inside the parentheses, separated by semicolons.", bullets: [
        "**Declare and initialize a loop counter.** let count = 0 creates the counter with a starting value.",
        "**Give a condition for the loop to keep running.** count <= 100 is checked before every iteration.",
        "**Describe how to change the counter each time.** count += 10 runs after every iteration. Usually the counter is incremented.",
      ] },
      "**count += 10** is short for count = count + 10.",
      "**The loop stops** as soon as the condition is false.",
    ],
    code: "for (let count = 0; count <= 100; count += 10) {\n  console.log(count); // 0, 10, 20, up to 100\n}",
  },
  {
    id: "while-loops", heading: "while loops",
    paragraphs: [
      "**while** repeats a chunk of code while a condition is true.",
      "**Only the condition** goes inside the parentheses. There is no counter and no step.",
      "**The condition is checked before every iteration.** The loop stops as soon as it is false.",
      {
        text: "**Math.random()** gives a random number between 0 and 1. push makes the array longer, so length reaches 5 and the loop stops.",
        code: "let fiveRandomNumbers = [];\nwhile (fiveRandomNumbers.length < 5) {\n  fiveRandomNumbers.push(Math.random());\n}\nconsole.log(fiveRandomNumbers.length); // 5",
      },
      "**Something in the body must change the condition.** Otherwise the loop never ends.",
      "**while (true)** never stops, because true is never false. Do not use it unless you want to see your computer burn.",
      {
        text: "**A counter** you change inside the body is the usual shape. Remove tries += 1 and the loop never ends.",
        code: 'let tries = 0;\nwhile (tries < 3) {\n  console.log("try", tries); // try 0, try 1, try 2\n  tries += 1;\n}',
      },
    ],
  },
  {
    id: "for-of", heading: "for...of loops over items in a collection",
    paragraphs: [
      "**for...of** loops over the items in a collection more easily.",
      "**A collection** here is an array, from the arrays lesson.",
      "**The counting loop** needs an index i and numbers[i] to reach each item.",
      "**i++** is short for i = i + 1.",
      "**for...of** gives each item directly. n holds one item per iteration.",
      "**Both loops** below print the same three numbers.",
    ],
    code: "const numbers = [1, 2, 3];\n\nfor (let i = 0; i < numbers.length; i++) {\n  console.log(numbers[i]); // 1, 2, 3\n}\n\nfor (let n of numbers) {\n  console.log(n); // 1, 2, 3\n}",
  },
  {
    id: "iterables", heading: "Strings and arrays are iterables",
    paragraphs: [
      "**An iterable** is a value that for...of can walk through one item at a time.",
      "**Strings and arrays are iterables.**",
      {
        text: "**A string** gives one character per iteration.",
        code: 'for (let char of "ALOHA") {\n  console.log(char); // A, L, O, H, A\n}',
      },
      {
        text: "**An array** gives one item per iteration. typeof shows the type of each item.",
        code: 'for (let item of ["pop", 6, "squish"]) {\n  console.log(typeof item); // string, number, string\n}',
      },
      "**An object is not an iterable.** The next lesson shows how to loop over one.",
    ],
  },
  {
    id: "foreach", heading: "forEach",
    paragraphs: [
      "**forEach** is an array method.",
      "**It runs a function once for each item** in the array.",
      "**The function receives the current item** as its first parameter.",
      {
        text: "**element** holds a, then b, then c. The array itself does not change.",
        code: 'const array1 = ["a", "b", "c"];\narray1.forEach(element => console.log(element + "s")); // as, bs, cs\nconsole.log(array1); // ["a","b","c"]',
      },
      {
        text: "**A second parameter** receives the index of the item. index goes 0, 1, 2, 3 while value goes 1, 2, 3, 4.",
        code: 'const numbers = [1, 2, 3, 4];\nnumbers.forEach((value, index) => {\n  console.log("Index " + index + ": " + value); // Index 0: 1, Index 1: 2, Index 2: 3, Index 3: 4\n});',
      },
      {
        text: "**A third parameter** receives the whole array. It is the same array on every iteration.",
        code: 'const letters = ["x", "y"];\nletters.forEach((value, index, array) => {\n  console.log(value, index, array); // x 0 ["x","y"], then y 1 ["x","y"]\n});',
      },
      "**forEach cannot stop early.** It always visits the last item.",
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the three lines.",
      "**Change i < fruits.length to i < 2** and run again.",
      "**Rewrite the loop with for...of** so it prints only the names.",
      "**Rewrite it with while.** Declare let i = 0 above the loop and put i++ inside the body.",
      "**Reset** restores the example.",
    ],
    code: 'const fruits = ["apple", "mango", "kiwi"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(i, fruits[i]); // 0 apple, 1 mango, 2 kiwi\n}',
    blocks: [{ type: "quiz", question: "How many times does the body run in for (let rep = 0; rep < 10; rep += 1)?", answers: [
      { text: "10", correct: true, explanation: "rep takes the values 0 to 9. That is 10 iterations." },
      { text: "11", correct: false, explanation: "When rep reaches 10, rep < 10 is false, so the body does not run again." },
      { text: "9", correct: false, explanation: "rep = 0 is the first iteration. Counting from 0 to 9 gives 10 runs." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**A loop** runs the same code many times. This is called iteration.",
      "**for (start; condition; change)** counts with a loop counter.",
      "**while (condition)** repeats until the condition turns false, so the body must change it.",
      "**for...of** gives each item of an iterable, such as a string or an array.",
      "**forEach** runs a function for each array item and cannot stop early.",
    ],
  },
];
