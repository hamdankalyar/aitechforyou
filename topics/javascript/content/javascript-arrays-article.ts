import type { ArticleSection } from "@/lib/articles";

export const javascriptArraysSections: ArticleSection[] = [
  {
    id: "what-an-array-is", heading: "Keep several values together",
    paragraphs: [
      "**An array is a list of values.** Square brackets create the list, and commas separate its items.",
      "**An array can be empty.** [] creates an array with no items.",
      "**Any JavaScript value can be an item.** Strings, numbers, booleans, objects, and even other arrays all work. Objects get their own lesson later.",
      "**Types can be mixed.** One array can hold different kinds of values at the same time.",
      "**Repeated values are allowed.** An array can hold the same value more than once.",
    ],
    code: 'const emptyArray = [];\nconst mixedArray = ["pop", 6, false];\nconst repeatedArray = ["echo", "echo", "echo"];\n\nconsole.log(emptyArray);    // []\nconsole.log(mixedArray);    // ["pop",6,false]\nconsole.log(repeatedArray); // ["echo","echo","echo"]',
  },
  {
    id: "length-and-indexes", heading: "Length and indexes",
    paragraphs: [
      "**.length counts the items.** The synonyms array has three items.",
      "**An index is an item’s position.** Square brackets pick the item at that position.",
      "**Counting starts at 0.** synonyms[0] is the first item. synonyms[1] is the second.",
      "**A missing index gives undefined.** Asking for synonyms[3] does not cause an error.",
    ],
    code: 'const synonyms = ["plethora", "array", "cornucopia"];\nconsole.log(synonyms.length); // 3\nconsole.log(synonyms[0]);     // plethora\nconsole.log(synonyms[1]);     // array\nconsole.log(synonyms[3]);     // undefined',
  },
  {
    id: "find-an-item", heading: "Find an item",
    paragraphs: [
      "**indexOf(value) gives the first matching index.** It gives -1 when the value is missing.",
      "**includes(value) gives true or false.** Use it when you only need to know whether the value is present.",
      "**Matches must be exact.** \"plethora\" and \"Plethora\" are different strings.",
    ],
    code: 'const synonyms = ["plethora", "array", "cornucopia"];\nconsole.log(synonyms.indexOf("cornucopia")); // 2\nconsole.log(synonyms.indexOf("variety"));   // -1\nconsole.log(synonyms.includes("plethora")); // true\nconsole.log(synonyms.includes("variety"));  // false',
  },
  {
    id: "change-an-item", heading: "Change an item",
    paragraphs: [
      "**An array’s items can change.** Assign a new value to one index.",
      "**A const array can still change inside.** const stops you from assigning a different array to the variable.",
      "**Assigning a new array to a const causes a TypeError.** The first item change still happens before the error.",
    ],
    code: 'const synonyms = ["plethora", "array", "cornucopia"];\nsynonyms[1] = "variety";\nconsole.log(synonyms[1]); // variety\n\nsynonyms = ["multitude"]; // TypeError: a const variable cannot be reassigned',
  },
  {
    id: "add-and-remove-items", heading: "Add and remove items",
    paragraphs: [
      "**pop() removes and returns the last item.** Store that returned value if you need it later.",
      "**push(value) adds an item to the end.** It changes the original array.",
      "**After these lines, synonyms has three items:** \"plethora\", \"variety\", and \"multitude\".",
      "**lastItem holds \"cornucopia\".** That is the item removed by pop().",
    ],
    code: 'let synonyms = ["plethora", "array", "cornucopia"];\nsynonyms[1] = "variety";\nconst lastItem = synonyms.pop();\nsynonyms.push("multitude");\n\nconsole.log(synonyms); // ["plethora","variety","multitude"]\nconsole.log(lastItem); // cornucopia',
  },
  {
    id: "useful-array-methods", heading: "Three useful array methods",
    paragraphs: [
      "**sort() puts these strings in order.** It changes the original array.",
      "**join(separator) combines the items into one string.** The separator goes between each pair of items.",
      "**concat(array) combines arrays into a new array.** The original arrays stay unchanged.",
      "**sort() compares values as strings by default.** Number sorting needs a comparison function, which comes in a later lesson.",
    ],
    code: 'const letters = ["c", "a", "d", "b"];\nletters.sort();\nconsole.log(letters); // ["a","b","c","d"]\nconsole.log(["lions", "tigers", "bears oh my!"].join(" & ")); // lions & tigers & bears oh my!\nconsole.log([1, 2, 3].concat([4, 5, 6])); // [1,2,3,4,5,6]',
  },
  {
    id: "quick-check", heading: "Quick check",
    paragraphs: [
      "**Read the operations in order.** First pop() removes 30. Then push(40) adds 40 at the end.",
      "**Run the code to check your answer.**",
    ],
    code: 'const numbers = [10, 20, 30];\nconst removed = numbers.pop();\nnumbers.push(40);\nconsole.log(numbers); // [10,20,40]\nconsole.log(removed); // 30',
    blocks: [{ type: "quiz", question: "What do numbers and removed hold at the end?", answers: [
      { text: "numbers is [10, 20, 40], removed is 30", correct: true, explanation: "Correct. pop() removes and returns 30. push(40) then adds 40 to the end." },
      { text: "numbers is [10, 20, 30, 40], removed is 30", correct: false, explanation: "pop() removes 30 before push() adds 40." },
      { text: "numbers is [10, 20], removed is 40", correct: false, explanation: "pop() returns the removed value, which is 30. push() adds 40 to numbers." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "Arrays keep several values in one list. They can be empty, mixed, or contain repeated values.",
      "length counts items. Indexes start at 0. indexOf gives a position, and includes gives true or false.",
      "Array items can change. push adds the last item, and pop removes and returns it.",
      "sort changes an array. join makes a string. concat makes a new array.",
    ] }],
  },
];
