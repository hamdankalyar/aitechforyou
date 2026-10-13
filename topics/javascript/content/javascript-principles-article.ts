import type { ArticleSection } from "@/lib/articles";

export const javascriptPrinciplesSections: ArticleSection[] = [
  {
    id: "thread-and-memory", heading: "The thread and memory",
    paragraphs: [
      "**The thread of execution** follows the order in which JavaScript runs statements.",
      "**Memory** stores values under names such as num.",
      "**An execution context** holds the information needed to run a piece of code.",
      "**The global context** runs the code outside functions in this example.",
    ],
  },
  {
    id: "trace-the-code", heading: "Watch the code run",
    paragraphs: [
      "**The blackboard** traces the exact example from the supplied lesson.",
      "**The highlighted line** follows the thread into each function call.",
      "**Memory boxes** show the values at the selected step.",
      "**New entries** appear as the thread reaches their lines.",
    ],
    blocks: [{ type: "execution-context-trace" }],
  },
  {
    id: "saved-functions", heading: "Saved functions and references",
    paragraphs: [
      "**A function definition** saves code for later calls.",
      "**multiplyBy2** is defined once in this example.",
      "**The saved function** can be called repeatedly.",
      "**A reference** is a link to a value stored elsewhere in memory.",
      "**The function name** refers to the saved function object.",
      "**The blackboard's function symbol** represents the saved function in a simplified memory diagram.",
    ],
  },
  {
    id: "call-stack", heading: "The call stack",
    paragraphs: [
      "**JavaScript** uses the call stack to track which function is currently running.",
      "**Running a function** adds its execution context to the call stack.",
      "**Finishing a function** removes its execution context from the call stack.",
      "**The top of the call stack** shows where the thread of execution is currently running.",
    ],
    blocks: [{ type: "call-stack-trace" }],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** to check the walkthrough's final values.",
      "**Change the argument 10 to 7** in this editor.",
      "**Predict newOutput** before running again.",
      "**The blackboard** continues to trace the original example.",
    ],
    code: "const num = 3;\nfunction multiplyBy2(inputNumber) {\n  const result = inputNumber * 2;\n  return result;\n}\nconst output = multiplyBy2(num);\nconst newOutput = multiplyBy2(10);\nconsole.log(output); // 6\nconsole.log(newOutput); // 20",
    blocks: [{ type: "quiz", question: "Which value does inputNumber hold during the second call?", answers: [
      { text: "10", correct: true, explanation: "The second call supplies 10 as its argument." },
      { text: "3", correct: false, explanation: "3 belongs to the first call's parameter." },
      { text: "6", correct: false, explanation: "6 is the first returned value stored in output." },
    ] }],
  },
  {
    id: "remember", heading: "Remember",
    paragraphs: [
      "**The thread** enters a function when it is called.",
      "**Each call** gets its own execution context.",
      "**Parameters** hold arguments in local memory.",
      "**return** gives a value back to the waiting caller.",
    ],
  },
  {
    id: "review-questions", heading: "Review questions",
    paragraphs: [],
    blocks: [
      { type: "details", title: "What is an execution context in JavaScript?", paragraphs: [
        "**An execution context** is a space in which code executes.",
        "**The thread of execution** runs through code line by line.",
        "**Memory** provides a place to store data.",
        "**A function call** creates a new execution context.",
        "**The new context** has its own thread of execution.",
        "**Local memory** belongs to that function call.",
      ] },
      { type: "details", title: "What is the difference between a parameter and an argument in a function?", paragraphs: [
        "**A parameter** is a label or identifier defined in the function declaration.",
        "**The parameter** receives a value.",
        "**An argument** is the actual value passed when the function is called.",
      ] },
      { type: "details", title: "What happens to the local memory and execution context when a function finishes executing?", paragraphs: [
        "**The execution context** closes when the function finishes.",
        "**Local memory** is forgotten when the function finishes.",
        "**The return value** is the only value passed out.",
        "**A variable in the outer scope** can receive the returned value.",
      ] },
      { type: "details", title: "What symbol or syntax indicates that a function is being invoked or called rather than just defined?", paragraphs: [
        "**Parentheses ()** after the function name indicate that the function is being called.",
      ] },
      { type: "details", title: "What are the two fundamental components that JavaScript creates when executing a function?", paragraphs: [
        "**A thread of execution** goes through the code line by line.",
        "**Local memory** provides a place to store data.",
        "**Local memory** is available only while the function is running.",
        "**The thread and local memory** together form an execution context.",
      ] },
      { type: "details", title: "How is a function saved in memory?", paragraphs: [
        "**The function name** refers to a saved function object.",
        "**A reference** links to a value elsewhere in memory.",
        "**The diagram** shows the saved function with a simplified symbol.",
      ] },
      { type: "details", title: "How many times is a function defined versus how many times can it be used?", paragraphs: [
        "**A function** is defined once.",
        "**The saved function** can be called repeatedly while memory is available.",
      ] },
      { type: "details", title: "What is the global execution context?", paragraphs: [
        "**The global execution context** is the main context created when a JavaScript file starts running.",
        "**Its thread of execution** runs the overall file of code.",
        "**Its memory** stores data for the overall file.",
      ] },
      { type: "details", title: "What data structure does JavaScript use to track which function is currently being run?", paragraphs: [
        "**The call stack** tracks which function is currently running.",
        "**The call stack** tracks where execution returns when the function finishes.",
      ] },
      { type: "details", title: "What happens to the call stack when a function starts executing and when it finishes?", paragraphs: [
        "**Starting a function call** adds its context to the top of the call stack.",
        "**Finishing the call** pops its context off the stack.",
        "**JavaScript** resumes the context now at the top of the stack.",
      ] },
      { type: "details", title: "What keyword in JavaScript signals that a function should exit and go back to the previous execution context?", paragraphs: [
        "**return** signals that the current function's execution context should exit.",
        "**Execution** resumes in the context now at the top of the call stack.",
      ] },
    ],
  },
];
