import type { ArticleSection } from "@/lib/articles";

export const javascriptClosureSections: ArticleSection[] = [
  {
    id: "closure-introduction", heading: "Closure",
    paragraphs: [
      "**Closure** is the combination of a function and its access to variables in the scope where it was created.",
    ],
  },
  {
    id: "why-closure-matters", heading: "Where closure helps",
    paragraphs: [
      { text: "**once** keeps a flag recording whether the wrapped function has run.", bullets: [
        "**A setup function** can run only on the first call to its wrapper.",
      ] },
      { text: "**Memoization** keeps a cache of results for earlier inputs.", bullets: [
        "**An expensive calculation** can reuse its cached result for the same input.",
      ] },
      { text: "**The module pattern** exposes functions that access private variables.", bullets: [
        "**A private counter** can be updated through an exposed increment function.",
      ] },
      { text: "**An iterator** can keep its current list position in a closure.", bullets: [
        "**Each call** can return the next item without restarting at the beginning.",
      ] },
      { text: "**Partial application** saves some arguments before the remaining arguments are supplied.", bullets: [
        "**A multiply-by-two function** can capture 2 before receiving the number to multiply.",
      ] },
      { text: "**An asynchronous callback** can access captured variables after a network request finishes.", bullets: [
        "**The lecture's video-app example** runs a callback when the requested videos arrive.",
        "**That callback** retains access to the surrounding variables it needs to process the videos.",
      ] },
    ],
  },
  {
    id: "trace-the-code", heading: "Functions with memories",
    paragraphs: [
      "**Each function call** creates a new execution context.",
      { text: "**Local memory** holds the parameters and local variables for that call.", bullets: [
        "**Variable environment** is another name for this store of variables.",
        "**State** means the data's current values.",
      ] },
      "**A finished call** leaves the call stack.",
      "**Unreachable local data** becomes eligible for automatic memory cleanup.",
      "**Closure** can keep captured variables accessible after the outer call finishes.",
      "**Later calls** can read or update those same captured variables.",
      "**This persistent data** can hold a cache of previous results.",
      "**The walkthrough** starts by returning a function from another function.",
    ],
    blocks: [
      { type: "execution-context-trace", example: "closure" },
      { type: "bullets", items: [
        { label: "createFunction()", text: "Returns the multiplyBy2 function from a single call." },
        { label: "generatedFunc", text: "Stores a reference to that returned function." },
        { label: "generatedFunc(3)", text: "Calls the saved multiplyBy2 function directly." },
        { label: "result", text: "Receives 6 from that call." },
        { label: "Calling generatedFunc()", text: "Does not call createFunction() again to find or call the inner function." },
      ] },
      { type: "details", title: "What happens when a function is returned from another function and assigned to a variable in JavaScript?", paragraphs: [
        "**The variable** stores a reference to the returned function.",
        "**The returned function** can be called directly without calling the outer function again.",
        "**The outer execution context** leaves the call stack when the outer function finishes.",
        "**The returned function** remains available in memory.",
      ] },
      { type: "details", title: "In the createFunction example above, what is stored in generatedFunc?", paragraphs: [
        "**generatedFunc** stores a reference to the multiplyBy2 function returned by createFunction().",
        "**generatedFunc()** calls that saved function directly.",
        "**createFunction()** does not need to run again for that call.",
      ] },
      { type: "details", title: "When generatedFunc(3) is called, does JavaScript go back to createFunction to execute the code?", paragraphs: [
        "**No**, JavaScript does not call createFunction() again.",
        "**The earlier createFunction() call** ran once to return the inner function.",
        "**generatedFunc** holds the returned function reference.",
        "**generatedFunc(3)** executes that saved function directly.",
      ] },
      { type: "details", title: "What is the purpose of using local memory inside a function's execution context?", paragraphs: [
        "**Local memory** stores variables and functions within that function's scope.",
        "**Local names** avoid adding those names to global memory.",
        "**Different functions** can reuse local variable names without overwriting global variables.",
        "**Each function** acts like a small program with its own local data.",
      ] },
      { type: "details", title: "What happens to a function's execution context and local memory after it finishes and returns a value?", paragraphs: [
        "**The execution context** is removed from the call stack.",
        "**Unreferenced local data** becomes eligible for memory cleanup.",
        "**The returned value** is passed back to the caller.",
        "**An assignment** stores that returned value in the specified variable.",
      ] },
    ],
  },
  {
    id: "call-inside-outer", heading: "Call a function where it was defined",
    paragraphs: [
      "**outer()** creates counter with the value 0.",
      "**add1** is defined inside outer.",
      "**add1()** is also called inside outer in this example.",
      "**counter++** increases the existing counter by 1.",
      "**The lookup** checks add1's local memory before its surrounding scope.",
      "**The call stack** tracks which execution context is running.",
      "**The definition location** determines the surrounding scope used for variable lookup.",
    ],
    blocks: [
      { type: "execution-context-trace", example: "closure-inside" },
      { type: "details", title: "Run the inside-call example", paragraphs: [
        "**console.log** is added to expose counter after add1 finishes.",
        "**The printed 1** comes from outer's local memory.",
      ], code: "function outer() {\n  let counter = 0;\n  function add1() { counter++; }\n  add1();\n  console.log(counter); // 1\n}\nouter();" },
    ],
  },
  {
    id: "call-after-return", heading: "Call a function after outer returns",
    paragraphs: [
      "**return add1** sends the function reference to global code.",
      "**newFunc** stores that returned function.",
      "**outer()** finishes before either newFunc call begins.",
      "**Closure** keeps add1's access to the original counter variable.",
      "**The first newFunc() call** changes counter from 0 to 1.",
      "**The second newFunc() call** changes the same counter from 1 to 2.",
      "**The live scope panel** stays visible after outer leaves the call stack.",
      "**add1** returns undefined because it has no return statement.",
    ],
    blocks: [
      { type: "execution-context-trace", example: "closure-returned" },
      { type: "details", title: "Why can't global code read counter?", paragraphs: [
        "**counter** belongs to the scope created by the outer call.",
        "**newFunc** can access counter through closure.",
        "**Global code** cannot read that local counter directly.",
        "**ReferenceError** is the intentional error at the end of this example.",
      ], code: "function outer() {\n  let counter = 0;\n  function add1() { counter++; }\n  return add1;\n}\nconst newFunc = outer();\nnewFunc();\nconsole.log(counter); // ReferenceError: counter is not defined" },
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** to see two calls update the same captured counter.",
      "**console.log** is added inside add1 to display each update.",
      "**Change counter's starting value** from 0 to 10.",
      "**Run again** to see the new sequence start at 11.",
      "**Reset** restores the original example.",
    ],
    code: "function outer() {\n  let counter = 0;\n  function add1() {\n    counter++;\n    console.log(counter); // 1, then 2\n  }\n  return add1;\n}\nconst newFunc = outer();\nnewFunc();\nnewFunc();",
    blocks: [{ type: "quiz", question: "Where does newFunc find counter after outer() returns?", answers: [
      { text: "In the captured scope where add1 was defined.", correct: true, explanation: "Closure keeps access to the original counter variable." },
      { text: "In add1's new local memory.", correct: false, explanation: "add1 declares no local counter variable." },
      { text: "In global memory.", correct: false, explanation: "Returning add1 does not turn counter into a global variable." },
      { text: "In an outer() call still on the stack.", correct: false, explanation: "outer() has already finished and left the call stack." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Closure** preserves a function's access to its surrounding variables.",
      "**Captured variables** can outlive the outer function's call.",
      "**Repeated inner calls** can update the same captured data.",
      "**The definition location** determines the surrounding scope used for variable lookup.",
    ],
  },
  {
    id: "review-questions", heading: "Review questions",
    paragraphs: [],
    blocks: [
      { type: "details", title: "What happens to a function's local memory (variable environment) when the function finishes executing?", paragraphs: [
        "**Unreferenced local memory** can be cleaned up after the function finishes.",
        "**The return value** is passed back to the caller.",
        "**Each new call** creates a new execution context.",
        "**Fresh local memory** starts without the previous call's local values.",
      ] },
      { type: "details", title: "What are two practical utility functions that are enabled by closure?", paragraphs: [
        "**once** limits the wrapped function to one execution.",
        "**memoize** saves the results of expensive calculations.",
        "**Repeated inputs** reuse the saved result instead of repeating the calculation.",
      ] },
      { type: "details", title: "How does closure relate to asynchronous callbacks in JavaScript?", paragraphs: [
        "**Closure** preserves a callback's access to surrounding data when it runs later.",
        "**Fetching a list of videos** is an example of a network request.",
        "**The callback** can access the data it needs when the request finishes.",
      ] },
      { type: "details", title: "What is the variable environment (or state) in a function execution context?", paragraphs: [
        "**The variable environment** is the live store of local data during a function call.",
        "**This store** holds the variables available within that execution context.",
        "**State** refers to the data's current values.",
      ] },
      { type: "details", title: "What design patterns and features in JavaScript depend on closure?", paragraphs: [
        "**Module-related examples** include the module pattern and JavaScript's built-in modules.",
        "**Iterators** can use closure to return successive items from an array.",
        "**Partial application** uses closure in functional programming.",
        "**Asynchronous callbacks** use closure to keep access to surrounding data.",
      ] },
    ],
  },
];
