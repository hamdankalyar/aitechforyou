import type { ArticleSection } from "@/lib/articles";

export const javascriptFunctionsSections: ArticleSection[] = [
  {
    id: "declare-and-call", heading: "Create and call a function",
    paragraphs: [
      "**Functions** are reusable blocks of code that perform a task.",
      { text: "**A declaration** creates a function.", bullets: [
        "**function** is the keyword. sayHello is the function's name.",
        "**Parentheses ()** hold input names. Empty parentheses mean no inputs are needed here.",
        "**The body** is the code inside the braces { }.",
      ] },
      {
        text: "**sayHello()** calls the function and runs its body. Call it again to repeat the task.",
        code: 'function sayHello() {\n  console.log("Hello!"); // Hello!\n}\nsayHello();',
      },
      "**Function declarations** can also be called before their declaration in the same part of the code. This is called hoisting.",
    ],
  },
  {
    id: "parameters-and-arguments", heading: "Pass inputs",
    paragraphs: [
      "**Parameters** are input names in the declaration: x and y below.",
      "**Arguments** are values in the call: 2 and 3. They fill the parameters in order.",
      {
        text: "**Commas** separate inputs. This function prints their sum.",
        code: 'function add(x, y) {\n  console.log(x + y); // 5, then NaN, then 5\n}\nadd(2, 3); // 5\nadd(2); // NaN\nadd(2, 3, 4); // 5',
      },
      "**Missing arguments** leave ordinary parameters undefined. Here, 2 + undefined produces NaN (Not a Number).",
      "**Extra arguments** are allowed. This function only uses the first two.",
      "**Parameter names** follow variable naming rules. A quoted value or a name starting with a digit causes SyntaxError.",
    ],
  },
  {
    id: "return-values", heading: "Return a result",
    paragraphs: [
      {
        text: "**return** sends a value back to the caller, which can store or use it.",
        code: 'function half(x) {\n  return x / 2;\n}\nconst result = half(8);\nconsole.log(result); // 4',
      },
      "**return ends the call.** Code after an executed return does not run.",
      {
        text: "**console.log()** only prints. Without a returned value, the caller receives undefined.",
        code: 'function sayHello(name) {\n  console.log("Hi, " + name); // Hi, Marc\n}\nconst result = sayHello("Marc");\nconsole.log(result); // undefined',
      },
      "**return;** also ends the call with undefined. Use return inside a function.",
    ],
  },
  {
    id: "parameter-names", heading: "Keep names local",
    paragraphs: [
      "**Local names** are parameters and variables declared inside a function. They are available only within that function's scope (where a name can be used).",
      {
        text: "**Reassigning x** changes the local parameter. Reading x outside this function intentionally causes ReferenceError.",
        code: 'function half(x) {\n  x = x / 2;\n  return x;\n}\nconst number = 8;\nconsole.log(half(number)); // 4\nconsole.log(number); // 8\nconsole.log(x); // ReferenceError: x is not defined',
      },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Change square(3) to square(5)** and predict the result before pressing Run.",
      "**Replace return x * x; with console.log(x * x);** and compare the output. Reset restores the example.",
    ],
    code: 'function square(x) {\n  return x * x;\n}\nconst result = square(3);\nconsole.log(result); // 9',
    blocks: [{ type: "quiz", question: "If square only prints the answer, what value does result receive?", answers: [
      { text: "undefined", correct: true, explanation: "Without a returned value, the call gives the caller undefined." },
      { text: "9", correct: false, explanation: "9 is printed, but console.log does not return it to the caller." },
      { text: "null", correct: false, explanation: "The function would need return null to give the caller null." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Declare** to create a function. Call it with parentheses to run it.",
      "**Parameters** name inputs. Arguments supply their values.",
      "**Local names** stay inside the function.",
      "**return** gives the caller a result. Printing alone leaves it undefined.",
    ],
  },
];
