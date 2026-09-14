import type { ArticleSection } from "@/lib/articles";

export const javascriptFunctionsSections: ArticleSection[] = [
  {
    id: "declare-and-call", heading: "Create and call a function",
    paragraphs: [
      "**Functions** are reusable blocks of code that perform a task.",
      { text: "**A declaration** creates a function.", bullets: [
        "**function** is the keyword that creates the function.",
        "**sayHello** is the function's name.",
        "**Parentheses ()** hold input names.",
        "**Empty parentheses** mean no inputs are needed here.",
        "**The body** is the code inside the braces { }.",
      ] },
      {
        text: "**sayHello()** calls the function to run its body.",
        code: 'function sayHello() {\n  console.log("Hello!"); // Hello!\n}\nsayHello();',
      },
      "**Calling again** repeats the task.",
      "**Hoisting** lets you call a function declaration before its line in the same part of the code.",
    ],
  },
  {
    id: "parameters-and-arguments", heading: "Pass inputs",
    paragraphs: [
      "**Parameters** are input names in the declaration: x and y below.",
      "**Arguments** are values in the call: 2 and 3.",
      "**Input order** determines which argument fills each parameter.",
      {
        text: "**Commas** separate the inputs to add.",
        code: 'function add(x, y) {\n  console.log(x + y); // 5, then NaN, then 5\n}\nadd(2, 3); // 5\nadd(2); // NaN\nadd(2, 3, 4); // 5',
      },
      { text: "**Missing arguments** leave ordinary parameters undefined.", bullets: [
        "**2 + undefined** produces NaN (Not a Number).",
      ] },
      { text: "**Extra arguments** are allowed.", bullets: [
        "**add** only uses the first two arguments here.",
      ] },
      { text: "**Parameter names** follow variable naming rules.", bullets: [
        "**A quoted value** used as a parameter name causes SyntaxError.",
        "**A name starting with a digit** also causes SyntaxError.",
      ] },
    ],
  },
  {
    id: "return-values", heading: "Return a result",
    paragraphs: [
      {
        text: "**return** sends a value back to the caller.",
        code: 'function half(x) {\n  return x / 2;\n}\nconst result = half(8);\nconsole.log(result); // 4',
      },
      "**The caller** can store or use the returned value.",
      "**Code after an executed return** does not run because the call has ended.",
      "**console.log()** only prints a value.",
      {
        text: "**No returned value** means the caller receives undefined.",
        code: 'function sayHello(name) {\n  console.log("Hi, " + name); // Hi, Marc\n}\nconst result = sayHello("Marc");\nconsole.log(result); // undefined',
      },
      "**return;** also ends the call with undefined.",
      "**return** belongs inside a function.",
    ],
  },
  {
    id: "parameter-names", heading: "Parameters stay inside the function",
    paragraphs: [
      "**number** is a parameter of showNumber.",
      "**Inside the function's braces** is where this parameter can be used.",
      {
        text: "**showNumber(8)** gives number the value 8.",
        code: 'function showNumber(number) {\n  console.log(number); // 8\n}\nshowNumber(8);\nconsole.log(number); // ReferenceError: number is not defined',
      },
      "**The first console.log** prints the parameter's value inside the function.",
      { text: "**The last line** is outside the function.", bullets: [
        "**number** does not exist there.",
        "**ReferenceError** is the expected error for reading that missing name.",
      ] },
    ],
  },
  {
    id: "function-expression", heading: "Function expression",
    paragraphs: [
      "**A function expression** creates a function as a value.",
      {
        text: "**const** stores the function in greet.",
        code: 'const greet = function(name) {\n  console.log("Hello, " + name + "!"); // Hello, Ali!\n};\ngreet("Ali");',
      },
      "**name** is the function's parameter.",
      '**greet("Ali")** calls the stored function with "Ali" as its argument.',
      "**Object properties** can also hold function expressions.",
      { text: "**Call greet after the assignment.**", bullets: [
        '**Calling greet("Ali") before const** causes ReferenceError because greet has no assigned value yet.',
      ] },
      { text: "**Anonymous** means no name is written after function, as in this example.", bullets: [
        "**Named function expressions** have an explicit name after function.",
      ] },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Change square(3) to square(5).**",
      "**Predict the result** before pressing Run.",
      "**Replace return x * x; with console.log(x * x);** inside the function.",
      "**Compare the output** with the previous run.",
      "**Reset** restores the example.",
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
      { text: "**Declare** to create a function.", bullets: [
        "**Call it with parentheses** to run it.",
      ] },
      { text: "**Parameters** name inputs inside the function.", bullets: [
        "**Arguments** supply their values.",
      ] },
      "**Function expressions** can be stored in variables.",
      { text: "**return** gives the caller a result.", bullets: [
        "**Printing alone** leaves the returned value undefined.",
      ] },
    ],
  },
];
