import type { ArticleSection } from "@/lib/articles";

export const javascriptAsynchronousSections: ArticleSection[] = [
  {
    id: "synchronous-code", heading: "JavaScript runs on the main thread",
    paragraphs: [
      "**JavaScript is single-threaded.** It has one worker for running your code.",
      "**That worker is called the main thread.** It reads and runs your JavaScript one line at a time.",
      "**A thread** is a worker that follows instructions in order.",
      "**JavaScript cannot run two lines at the exact same time** on the main thread.",
      "**Synchronous code** finishes one line before JavaScript starts the next line.",
      "**Most function calls** are synchronous by default.",
      { text: "**This example** prints each line in the order it appears.", code: 'console.log("This prints first"); // This prints first\nconsole.log("This prints second"); // This prints second' },
    ],
  },
  {
    id: "asynchronous-work", heading: "Asynchronous work",
    paragraphs: [
      "**Asynchronous work** is work where the answer comes later.",
      "**Example:** JavaScript asks a server for data.",
      "**The server needs time** to prepare and send the data back.",
      "**The browser waits for the reply** because the data has not arrived yet.",
      "**JavaScript keeps running** the next lines while it waits.",
      "**When the data arrives,** JavaScript can use it.",
    ],
  },
  {
    id: "promise-states", heading: "A promise is a future answer",
    paragraphs: [
      "**A promise** is an object that represents an answer JavaScript will get later.",
      "**fetch()** returns a promise because a server needs time to send data back.",
      "**An async function** also returns a promise.",
      { text: "**Even a plain returned value** becomes the value inside that promise.", code: 'async function getGreeting() {\n  return "Hello";\n}\n\nconst result = getGreeting();\nconsole.log(result instanceof Promise); // true' },
      "**The instanceof operator** returns true if an object is an instance of a specified object.",
    ],
    blocks: [{ type: "table", caption: "The three Promise states", columns: ["State", "Meaning", "Example"], rows: [
      ["Pending", "The answer is still on its way", "The server has not replied"],
      ["Fulfilled", "The work succeeded", "The server sent the data"],
      ["Rejected", "The work failed", "The network request failed"],
    ] }],
  },
  {
    id: "create-a-promise", heading: "Create a promise with resolve and reject",
    paragraphs: [
      "**new Promise()** creates a promise when you need to describe work that will finish later.",
      "**The function inside new Promise()** tells JavaScript how the work will finish.",
      "**JavaScript gives that function** the resolve and reject parameters.",
      "**resolve and reject are functions.** You call one to finish the promise.",
      "**resolve(value)** marks the promise as fulfilled and stores value as its answer.",
      "**reject(reason)** marks the promise as rejected and stores reason as its error.",
      "**The value can be anything.** It can be a message, a number, an object, or nothing.",
      "**The parameter names are optional.** You can omit reject when your promise only needs resolve.",
      "**You can omit both names.** The promise then stays pending because nothing can finish it.",
      "**Call resolve or reject once.** A settled promise cannot change its answer later.",
      { text: "**This promise** is fulfilled with a success message.", code: 'const answer = new Promise((resolve, reject) => {\n  const found = true;\n\n  if (found) resolve("Yes, found it.");\n  else reject("No answer.");\n});\n\nanswer.then(message => console.log(message)); // Yes, found it' },
      { text: "**A value is optional** when you call resolve(). Without one, the fulfilled value is undefined.", code: 'const finished = new Promise(resolve => {\n  resolve();\n});\n\nfinished.then(value => console.log(value)); // undefined' },
    ],
  },
  {
    id: "then-and-catch", heading: "Read a promise result",
    paragraphs: [
      "**.then()** runs after a promise is fulfilled.",
      "**The parameter inside .then()** receives the value passed to resolve().",
      "**.catch()** runs after a promise is rejected.",
      "**The parameter inside .catch()** receives the reason passed to reject().",
      { text: "**This promise** rejects because access was not allowed.", code: 'const access = new Promise((resolve, reject) => {\n  const allowed = false;\n\n  if (allowed) resolve("Camera ready.");\n  else reject("Camera blocked.");\n});\n\naccess\n  .then(message => console.log(message))\n  .catch(message => console.log(message)); // Camera blocked.' },
      "**Most code uses promises from built-in functions** such as fetch() instead of creating them with new Promise().",
    ],
  },
  {
    id: "await", heading: "await waits inside an async function",
    paragraphs: [
      "**await** waits for a promise to finish.",
      "**await pauses its async function** until the promise has a result.",
      "**await does not make all JavaScript synchronous.** It pauses only that async function.",
      "**Use await** when the next line needs the answer from a promise.",
    ],
    code: 'async function getHounds() {\n  const response = await fetch("https://dog.ceo/api/breed/hound/list");\n  const data = await response.json();\n  console.log(response.status); // 200\n  console.log(data.status); // success\n  console.log(data.message); // ["afghan","basset","blood","english","ibizan","plott","walker"]\n}\n\ngetHounds();',
  },
  {
    id: "how-the-await-example-works", heading: "Read the example line by line",
    paragraphs: [
      "**async function getHounds()** creates a function that can use await.",
      "**fetch(...)** asks the Dog API for its list of hound breeds.",
      "**await fetch(...)** waits for the Dog API to reply.",
      "**response** stores the reply from the Dog API.",
      "**A Response object** is the reply that comes back from the server.",
      "**response.json()** turns the reply data into data JavaScript can use.",
      "**await response.json()** waits for that conversion to finish.",
      "**data** stores the ready-to-use hound information.",
      "**console.log(response.status)** prints 200 when the request worked.",
      "**console.log(data.status)** prints the API's success message.",
      "**console.log(data.message)** prints the list of hound breeds.",
      "**getHounds()** starts the function.",
      "**The browser can keep working** while getHounds() waits.",
      "**A rejected promise** makes await throw an error.",
      "**try...catch** handles that error in a later lesson.",
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the three console lines in order.",
      "**Change the delay** from 500 to 2,000 and run it again.",
      "**Change the message** inside resolve() and run it again.",
      "**Reset** restores the example.",
    ],
    code: 'function wait() {\n  return new Promise(resolve => {\n    setTimeout(() => resolve("Done"), 500);\n  });\n}\n\nasync function run() {\n  console.log("Start"); // Start\n  const message = await wait();\n  console.log(message); // Done\n}\n\nrun();\nconsole.log("JavaScript keeps going"); // JavaScript keeps going',
    blocks: [{ type: "quiz", question: "What does await pause?", answers: [
      { text: "The async function that contains it", correct: true, explanation: "await pauses that async function until its promise settles. Other JavaScript can still run." },
      { text: "Every JavaScript function", correct: false, explanation: "JavaScript can run other work while the async function waits." },
      { text: "The browser", correct: false, explanation: "The browser keeps working while JavaScript waits for a promise." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**Synchronous code** runs one line at a time in order.",
      "**Asynchronous work** can finish later while JavaScript continues.",
      "**A promise** represents a future result.",
      "**async and await** let a function wait for that result without pausing all JavaScript.",
    ],
  },
];
