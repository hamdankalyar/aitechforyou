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
      "**The blackboard** follows the same model as Principles of JavaScript.",
      "**Next step** moves the highlighted code and memory together.",
      "**The call stack** tracks the currently running context.",
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
];
