import type { ArticleSection } from "@/lib/articles";

export const javascriptGeneralizingFunctionsSections: ArticleSection[] = [
  {
    id: "function-definitions", heading: "Two definitions",
    paragraphs: [
      "**Callback** is a function passed to another function to be called there.",
      "**Higher order function** is a function that accepts another function as an argument or returns a function.",
    ],
  },
  {
    id: "repeated-functions", heading: "Why reuse functions?",
    paragraphs: [
      "**Functions** let us reuse repeated work without duplicating code.",
      "**DRY** means Don't Repeat Yourself.",
    ],
  },
  {
    id: "trace-the-code", heading: "Copy and change an array",
    paragraphs: [
      "**copyArrayAndMultiplyBy2** creates a new array of doubled values.",
    ],
    blocks: [{ type: "execution-context-trace", example: "copy-array" }],
  },
  {
    id: "repeated-array-work", heading: "The same loop, different work",
    paragraphs: [
      {
        text: "**Multiplying by 2** produces [2, 4, 6].",
        code: "function copyArrayAndMultiplyBy2(array) {\n  const output = [];\n  for (let i = 0; i < array.length; i++) {\n    output.push(array[i] * 2);\n  }\n  return output;\n}\nconst myArray = [1, 2, 3];\nconst result = copyArrayAndMultiplyBy2(myArray);\nconsole.log(result); // [2, 4, 6]",
      },
      {
        text: "**Dividing by 2** produces [0.5, 1, 1.5].",
        code: "function copyArrayAndDivideBy2(array) {\n  const output = [];\n  for (let i = 0; i < array.length; i++) {\n    output.push(array[i] / 2);\n  }\n  return output;\n}\nconsole.log(copyArrayAndDivideBy2([1, 2, 3])); // [0.5, 1, 1.5]",
      },
      {
        text: "**Adding 3** produces [4, 5, 6].",
        code: "function copyArrayAndAdd3(array) {\n  const output = [];\n  for (let i = 0; i < array.length; i++) {\n    output.push(array[i] + 3);\n  }\n  return output;\n}\nconsole.log(copyArrayAndAdd3([1, 2, 3])); // [4, 5, 6]",
      },
      "**The repeated structure** creates an output array and loops through the input.",
      "**The operation on each element** is the only part that changes.",
      "**DRY** suggests keeping that shared structure in one function.",
    ],
  },
  {
    id: "trace-the-callback", heading: "Pass the work as a function",
    paragraphs: [
      "**copyArrayAndManipulate** keeps the shared loop in one higher order function.",
      "**multiplyBy2** is the callback passed as the second argument.",
      "**instructions** refers to that callback inside the higher order function.",
      "**instructions(array[i])** calls the callback for the current element.",
      "**Each callback call** creates its own execution context.",
      "**The returned value** is then pushed into output.",
    ],
    code: "function copyArrayAndManipulate(array, instructions) {\n  const output = [];\n  for (let i = 0; i < array.length; i++) output.push(instructions(array[i]));\n  return output;\n}\nfunction multiplyBy2(input) { return input * 2; }\nconst result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);\nconsole.log(result); // [2, 4, 6]",
    blocks: [{ type: "execution-context-trace", example: "callback-array" }],
  },
  {
    id: "first-class-functions", heading: "Functions are values",
    paragraphs: [
      "**A function** is a value you can store and pass around.",
      "**multiplyBy2** refers to the function itself.",
      "**multiplyBy2(3)** runs the function with input 3.",
      {
        text: "**Storing a function** gives you another name for the same function.",
        bullets: ["**double(3)** calls multiplyBy2 with input 3."],
        code: "function multiplyBy2(input) { return input * 2; }\nconst double = multiplyBy2;\nconsole.log(double(3)); // 6",
      },
      {
        text: "**Object properties** can hold functions too.",
        bullets: ["**A method** is a function used as a property of an object."],
        code: "function multiplyBy2(input) { return input * 2; }\nconst operations = { double: multiplyBy2 };\nconsole.log(operations.double(3)); // 6",
      },
      {
        text: "**Arguments** can pass functions into other functions.",
        bullets: [
          "**copyArrayAndManipulate** receives multiplyBy2 through its instructions parameter.",
          "**instructions(1)** then runs multiplyBy2 with input 1.",
        ],
      },
      {
        text: "**Return values** can be functions.",
        bullets: [
          "**getOperation()** returns multiplyBy2 without running it.",
          "**double** stores the returned function.",
          "**double(3)** runs that function with input 3.",
        ],
        code: "function multiplyBy2(input) { return input * 2; }\nfunction getOperation() {\n  return multiplyBy2;\n}\nconst double = getOperation();\nconsole.log(double(3)); // 6",
      },
      "**First-class functions** is the term for treating functions as values this way.",
    ],
  },
  {
    id: "arrow-function-styles", heading: "Arrow functions and map",
    paragraphs: [
      '**input => input * 2** means "take input and return twice its value".',
      "**map** runs that function for each number.",
      "**[1, 2, 3]** produces the new array [2, 4, 6].",
    ],
    blocks: [{ type: "execution-context-trace", example: "arrow-map" }],
  },
  {
    id: "more-array-methods", heading: "Extension: Latest JavaScript features",
    paragraphs: [],
    code: "const arr1 = [1, 2, 3];\nconst arr2 = [1, 2, 3];\narr1.reverse(); // arr1 is [3, 2, 1]\narr1.splice(1, 1, 6); // arr1 is [3, 6, 1]\narr1.sort(); // arr1 is [1, 3, 6]\nconst reversed = arr2.toReversed();\nconst spliced = arr2.toSpliced(1, 1, 6);\nconst sorted = arr2.toSorted();\nconsole.log(arr1); // [1, 3, 6]\nconsole.log(arr2, reversed, spliced, sorted); // [1, 2, 3] [3, 2, 1] [1, 6, 3] [1, 2, 3]",
  },
  {
    id: "more-useful-array-methods", heading: "More useful array methods",
    paragraphs: [],
    code: "const deepArr = [1, 2, [1, 2], 2];\nconst flattened = deepArr.flat();\nconsole.log(flattened); // [1, 2, 1, 2, 2]\nconst last2 = flattened.findLastIndex(x => x === 2);\nconsole.log(last2); // 4\nfunction oddOrEven(num) { return num % 2 === 0 ? \"even\" : \"odd\"; }\nconst grouped = Object.groupBy(flattened, oddOrEven);\nconsole.log(grouped.even); // [2, 2, 2]\nconsole.log(grouped.odd); // [1, 1]",
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**First-class functions** can be stored, passed, and returned as values.",
      "**Higher order functions** accept or return functions.",
      "**Callbacks** supply the work another function calls.",
      "**DRY** keeps shared code in one reusable function.",
    ],
  },
  {
    id: "review-questions", heading: "Review questions",
    paragraphs: [],
    blocks: [
      { type: "details", title: 'What does it mean that functions are "first-class objects" in JavaScript?', paragraphs: [
        "**Functions** are objects with the additional ability to be called.",
        "**Invoked** and run are other words for called.",
        "**Functions** can be treated like other objects.",
        "**Functions** can coexist with other objects.",
        "**Variables** can hold functions.",
        "**Object properties** can hold functions.",
        "**Function inputs** can be functions.",
        "**Function outputs** can be functions.",
      ] },
      { type: "details", title: "What is a higher-order function?", paragraphs: [
        "**A higher-order function** can accept another function as an input.",
        "**A higher-order function** can also return another function as an output.",
        "**Higher-order functions** are ordinary functions.",
        "**Special keywords** are not needed to declare them.",
      ] },
      { type: "details", title: "What is a callback function?", paragraphs: [
        "**A callback** is a function passed into another function as an input.",
        "**Other names** include handler, transformation function, argument function, and lambda function.",
        "**The name callback** can suggest that the function runs later.",
        "**Callbacks** can run directly inside the function receiving them.",
      ] },
      { type: "details", title: "What JavaScript feature results from returning a function as an output value from another function?", paragraphs: [
        "**Closure** is the feature associated with returning a function from another function.",
        "**Closure** is described as one of JavaScript's most obscure features.",
      ] },
      { type: "details", title: "What is the difference between declarative and imperative code style?", paragraphs: [
        "**Imperative code** describes how to do something step by step.",
        "**Picking each element** is an example of an imperative step.",
        "**Changing each element** is another imperative step.",
        "**Using push** is another imperative step.",
        "**Declarative code** describes what you want to happen in a more readable way.",
        "**Imperative code underneath** performs the steps behind declarative code.",
      ] },
      { type: "details", title: "Which function is higher order, and which is the callback?", paragraphs: [
        "**copyArrayAndManipulate** is higher order because it accepts a function.",
        "**multiplyBy2** is the callback supplied as an argument.",
        "**Higher order** describes how a function uses other functions.",
        "**No special keyword** is needed to declare a higher order function.",
        "**This callback** runs directly inside the loop.",
        "**Synchronous** means each callback call finishes before the loop continues.",
        "**A callback** does not have to run later.",
        "**Asynchronous callbacks** can run later and are covered in another lesson.",
      ] },
      { type: "details", title: "Why are callbacks and higher order functions useful?", paragraphs: [
        "**DRY** keeps the shared loop in one place.",
        "**Changing the callback** changes the operation on each element.",
        "**Imperative code** describes the steps needed to do the work.",
        "**The loop body** is imperative because it picks and changes each element.",
        "**Declarative code** describes the result you want.",
        "**copyArrayAndManipulate([1, 2, 3], multiplyBy2)** expresses the chosen transformation at the call site.",
        "**The shared implementation** still performs the individual steps.",
        "**Callbacks** also help handle work that finishes later in asynchronous JavaScript.",
      ] },
      { type: "details", title: "In a higher-order function that processes an array, what is the purpose of using a parameter like 'instructions' instead of hardcoding specific operations?", paragraphs: [
        "**instructions** is a placeholder for the operation on each element.",
        "**The specific functionality** is passed in when the function is called.",
        "**The same function** can perform different operations without changing its shared code.",
        "**multiplyBy2, add3, or divideBy2** can supply the operation.",
      ] },
      { type: "details", title: "What happens when a function label like 'multiplyBy2' is passed as an argument to another function in JavaScript?", paragraphs: [
        "**multiplyBy2** passes a reference to the function itself.",
        "**instructions** is the receiving parameter name for that function reference.",
      ] },
      { type: "details", title: "What happens to execution contexts when instructions(1) calls multiplyBy2?", paragraphs: [
        "**The multiplyBy2 call** creates a new execution context.",
        "**The new context** is added to the call stack.",
        "**Local memory** contains input = 1.",
        "**1 * 2** evaluates to 2.",
        "**The function** returns 2.",
        "**The execution context** is then popped off the call stack.",
      ] },
      { type: "details", title: "What is the purpose of parentheses when invoking a function that has been passed as a parameter?", paragraphs: [
        "**Parentheses** tell JavaScript to execute the function.",
        "**instructions(1)** runs the function with input 1.",
        "**instructions without parentheses** refers to the function without executing it.",
      ] },
      { type: "details", title: "In arrow function syntax, when can you omit the parentheses around the parameter?", paragraphs: [
        "**One simple parameter** allows the surrounding parentheses to be omitted.",
        "**Multiple parameters** require parentheses.",
        "**No parameters** also require parentheses.",
      ] },
      { type: "details", title: "What is an anonymous function in JavaScript?", paragraphs: [
        "**An anonymous function** is used without being given a name.",
        "**The function code** is provided directly where it is needed.",
        "**Passing a function as an argument** is one example of this use.",
      ] },
      { type: "details", title: "What distinctive behavior do arrow functions have regarding the 'this' keyword compared to traditional function declarations?", paragraphs: [
        "**Arrow functions** do not have their own this value.",
        "**The surrounding scope** supplies the this value where the arrow function is defined.",
        "**Lexical this binding** is the name for this behavior.",
        "**Nested arrow functions** can preserve the outer scope's this value.",
      ] },
      { type: "details", title: "What is the built-in array method that takes data and applies a function to every element without changing the underlying data?", paragraphs: [
        "**map()** is the built-in array method.",
        "**The callback** transforms each array element.",
        "**The returned array** contains the transformed values.",
        "**map() itself** leaves the original array unchanged.",
        "**[1, 2, 3].map(input => input * 2)** returns [2, 4, 6].",
      ] },
      { type: "details", title: "What is the most concise arrow function syntax for a function with a single parameter that returns a single expression?", paragraphs: [
        "**The parameter's parentheses** can be omitted.",
        "**The body's curly braces** can be omitted.",
        "**The return keyword** can be omitted.",
        "**input => input * 2** is an example of this syntax.",
        "**Implicit return** returns the expression's result automatically.",
      ] },
    ],
  },
];
