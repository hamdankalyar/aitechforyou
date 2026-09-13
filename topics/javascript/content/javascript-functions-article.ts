import type { ArticleSection } from "@/lib/articles";

export const javascriptFunctionsSections: ArticleSection[] = [
  {
    id: "declare-and-call", heading: "Declare and call a function",
    paragraphs: [
      "**Functions** are reusable blocks of code that perform a task. They are also values in JavaScript, with the special ability to be called.",
      "**Declaring** a function creates it. Its body runs when you call the function.",
      {
        text: "**Calling** a function runs its code. half(2) returns 1, which is stored in one.",
        code: 'function half(x) {\n  return x / 2;\n}\nconst one = half(2);\nconsole.log(one); // 1',
      },
      { text: "**The declaration** gives the function a name, input, and body.", bullets: [
        "**function** is the keyword used to create this function.",
        "**half** is its name. Use a meaningful name that describes the task.",
        "**x** names the input. The parentheses hold input names.",
        "**The body** is the code inside the braces { }.",
        "**return x / 2** divides the input by 2 and sends the result back to the caller.",
      ] },
      {
        text: "**Function declarations are hoisted.** You can call this declaration before its line in the same scope. Scope means the part of your code where a name is available.",
        code: 'console.log(half(8)); // 4\nfunction half(x) {\n  return x / 2;\n}',
      },
    ],
  },
  {
    id: "parameters-and-arguments", heading: "Parameters and arguments",
    paragraphs: [
      "**Parameters** are the named inputs in a function declaration.",
      "**Arguments** are the actual values supplied when calling it.",
      {
        text: "**Multiple inputs** are separated with commas. Arguments fill parameters in order: x receives 2 and y receives 3.",
        code: 'function add(x, y) {\n  return x + y;\n}\nconsole.log(add(2, 3)); // 5',
      },
      {
        text: "**Three parameters** work the same way. The call gives x the value 4, y the value 5, and z the value 6.",
        code: 'function add3(x, y, z) {\n  console.log("My parameters are named x, y, z"); // My parameters are named x, y, z\n  console.log("I received the arguments", x, y, z); // I received the arguments 4 5 6\n  return x + y + z;\n}\nconst sum = add3(4, 5, 6);\nconsole.log(sum); // 15',
      },
      "**No parameters** are needed when a function can work without supplied inputs. Empty parentheses call it without arguments.",
      "**Math.random()** is a built-in function that returns a random number from 0 up to, but excluding, 1.",
      {
        text: "**getRandomNumber()** needs no inputs. The comparison checks the returned number's range, so the printed result is always true.",
        code: 'function getRandomNumber() {\n  return Math.random();\n}\nconst random = getRandomNumber();\nconsole.log(random >= 0 && random < 1); // true',
      },
    ],
  },
  {
    id: "parameter-names", heading: "Parameter names and local variables",
    paragraphs: [
      { text: "**Parameter names** follow variable naming rules.", bullets: [
        "**Letters, digits, _ and $** are allowed, but a name cannot start with a digit.",
        "**Spaces and punctuation such as !** are not allowed in a name.",
        "**Reserved words** such as return cannot be used as parameter names.",
        "**Literal values** such as a quoted string or a number cannot replace parameter names.",
      ] },
      {
        text: "**A quoted value** is not a parameter name. This example intentionally fails with SyntaxError before any code runs.",
        code: 'function doesThisWork("literally a value") { // SyntaxError: invalid parameter\n  return true;\n}',
      },
      {
        text: "**An invalid identifier** also causes SyntaxError. This name starts with a digit and contains !.",
        code: 'function howAboutThis(1weirdVariable!) { // SyntaxError: invalid name\n  return true;\n}',
      },
      {
        text: "**Parameters behave like local variables.** Reassigning x changes the local parameter; it does not reassign number in the caller.",
        code: 'function half(x) {\n  x = x / 2;\n  return x;\n}\nconst number = 8;\nconsole.log(half(number)); // 4\nconsole.log(number); // 8',
      },
      {
        text: "**Local names** belong to the function. Reading its parameter outside the function throws ReferenceError when no outer variable has that name.",
        code: 'function half(x) {\n  return x / 2;\n}\nconsole.log(half(2)); // 1\nconsole.log(x); // ReferenceError: x is not defined',
      },
    ],
  },
  {
    id: "missing-and-extra-arguments", heading: "Missing and extra arguments",
    paragraphs: [
      "**Argument counts** do not have to match parameter counts in JavaScript.",
      {
        text: "**A missing argument** leaves the corresponding ordinary parameter with the value undefined.",
        code: 'function add3(x, y, z) {\n  console.log(z); // undefined\n  return x + y + z;\n}\nconsole.log(add3(1, 2)); // NaN',
      },
      { text: "**The calculation** uses the values it actually receives.", bullets: [
        "**x** receives 1.",
        "**y** receives 2.",
        "**z** receives no argument, so it is undefined.",
        "**1 + 2** produces 3.",
        "**3 + undefined** produces NaN, meaning Not a Number.",
      ] },
      "**The outcome depends on your code.** Missing arguments do not automatically throw an error, but operations on them can fail or produce an unexpected result.",
      {
        text: '**Extra arguments** are allowed. This function never reads "unexpected", so it still returns a random number in the same range.',
        code: 'function getRandomNumber() {\n  return Math.random();\n}\nconst random = getRandomNumber("unexpected");\nconsole.log(random >= 0 && random < 1); // true',
      },
    ],
  },
  {
    id: "return-values", heading: "Return values",
    paragraphs: [
      "**return** specifies the function's output. The caller can store that value or use it immediately.",
      {
        text: "**square(3)** returns 3 multiplied by 3. The variable nine stores the result, 9.",
        code: 'function square(x) {\n  return x * x;\n}\nconst nine = square(3);\nconsole.log(nine); // 9\nconsole.log(square(4)); // 16',
      },
      {
        text: "**return ends the current call.** Code after an executed return does not run.",
        code: 'function square(x) {\n  return x * x;\n  console.log("Finished"); // Never runs\n}\nconsole.log(square(3)); // 9',
      },
      "**return belongs inside a function.** A return statement at the top level of an ordinary script causes SyntaxError.",
    ],
  },
  {
    id: "printing-without-returning", heading: "Printing without returning",
    paragraphs: [
      "**console.log()** displays a value in the console. return sends a value back to the caller.",
      {
        text: "**No executed return** means an ordinary function returns undefined. sayHello prints the greeting, but hm receives undefined.",
        code: 'function sayHello(name) {\n  console.log("Oh hi, " + name + "!"); // Oh hi, Marc!\n}\nconst hm = sayHello("Marc");\nconsole.log(hm); // undefined',
      },
      {
        text: "**Bare return;** also stops the call and returns undefined.",
        code: 'function stopHere() {\n  return;\n  console.log("Finished"); // Never runs\n}\nconsole.log(stopHere()); // undefined',
      },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself and quick check",
    paragraphs: [
      "**Run the complete example** to compare inputs, missing arguments, extra arguments, and returned values in one place.",
      "**Invalid declarations** are comments here so the rest of the example can run. The earlier boxes demonstrate their errors separately.",
      { text: "**Try these changes** one at a time. Reset restores the original code.", bullets: [
        "**Change half(2) to half(10)** and predict the output before running. The result becomes 5.",
        "**Give add3(1, 2) a third argument of 3** to replace NaN with 6.",
        "**Print random directly** to see the generated number instead of checking its range.",
      ] },
    ],
    code: `function half(x) {
  return x / 2;
}
function add(x, y) {
  return x + y;
}
function add3(x, y, z) {
  return x + y + z;
}
function getRandomNumber() {
  return Math.random();
}
function square(x) {
  return x * x;
  console.log("Unreachable"); // Never runs
}
function sayHello(name) {
  console.log("Oh hi, " + name + "!"); // Oh hi, Marc!
}

const one = half(2);
console.log(one); // 1
console.log(add(2, 3)); // 5
const sum = add3(4, 5, 6);
console.log(sum); // 15
console.log(add3(1, 2)); // NaN: z is undefined
const random = getRandomNumber();
console.log(random >= 0 && random < 1); // true
const extra = getRandomNumber("unexpected");
console.log(extra >= 0 && extra < 1); // true
const nine = square(3);
console.log(nine); // 9
const hm = sayHello("Marc");
console.log(hm); // undefined

// Uncomment either declaration to get a SyntaxError.
// function doesThisWork("literally a value") { return true; }
// function howAboutThis(1weirdVariable!) { return true; }`,
    blocks: [{ type: "quiz", question: "What value does hm receive from sayHello(\"Marc\")?", answers: [
      { text: "undefined", correct: true, explanation: "No return is executed in sayHello, so its returned value is undefined." },
      { text: '"Oh hi, Marc!"', correct: false, explanation: "The greeting is printed by console.log. The function does not return that text." },
      { text: "null", correct: false, explanation: "null is a value you can return explicitly. JavaScript uses undefined when this function finishes without return." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Declare** a function to create it. Call it to run its body.",
      "**Parameters** are input names. Arguments are the supplied values, matched in order.",
      "**Missing arguments** become undefined for ordinary parameters. Extra arguments are allowed, and the function decides what to use.",
      "**return** sends back a value and ends the call. Without it, an ordinary function returns undefined even if it prints something.",
    ],
  },
];
