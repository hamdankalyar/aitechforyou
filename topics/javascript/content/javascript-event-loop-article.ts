import type { ArticleSection } from "@/lib/articles";

export const javascriptEventLoopSections: ArticleSection[] = [
  {
    id: "one-thread-one-stack", heading: "One thread runs one stack",
    paragraphs: [
      "**The main thread** runs one piece of JavaScript at a time.",
      "**The Call Stack** holds the function that is running and the functions it called.",
      "**A function call** pushes a new frame onto the top of the stack.",
      "**A returned function** removes its frame from the top of the stack.",
      "**A long-running frame** stops clicks, painting, and queued JavaScript from running on that thread.",
    ],
  },
  {
    id: "where-later-work-waits", heading: "Later work waits in queues",
    paragraphs: [
      "**A task** is a unit of work that the browser schedules for a later event-loop turn.",
      "**Macrotask** is the common informal name for a task.",
      "**The task queue** can receive timer callbacks, user events, and I/O results.",
      "**The microtask queue** receives promise reactions and queueMicrotask() callbacks.",
      "**A timer delay** only makes its callback eligible to run after that time has passed.",
    ],
    blocks: [{ type: "table", caption: "Common ways to schedule later work", columns: ["Work", "Where it waits", "Examples"], rows: [
      ["Task", "Task queue", "setTimeout, setInterval, UI events, I/O"],
      ["Microtask", "Microtask queue", "Promise.then, Promise.catch, Promise.finally, queueMicrotask, MutationObserver"],
    ] }],
  },
  {
    id: "the-event-loop-turn", heading: "The event loop chooses the next work",
    paragraphs: [
      "**The event loop** waits until the Call Stack is empty before starting queued JavaScript.",
      "**One task** runs during an event-loop turn.",
      "**Every queued microtask** runs after that task finishes.",
      "**New microtasks** created by a microtask run in the same checkpoint.",
      "**The browser** may render after the microtask queue is empty.",
      "**The next task** can start after that possible rendering opportunity.",
    ],
    blocks: [{ type: "event-loop-trace" }],
  },
  {
    id: "read-the-output", heading: "Trace the usual interview example",
    paragraphs: [
      "**The first and last logs** run inside the current script task.",
      "**The promise handler** enters the microtask queue before the current script finishes.",
      "**The timeout callback** becomes a task after its delay has elapsed.",
      "**The microtask checkpoint** runs the promise handler before the timeout task.",
    ],
    code: 'console.log("start"); // start\n\nsetTimeout(() => console.log("timeout"), 0);\n\nPromise.resolve().then(() => console.log("promise"));\n\nconsole.log("end"); // end\n// promise\n// timeout',
  },
  {
    id: "microtasks-can-delay-work", heading: "Microtasks can delay the browser",
    paragraphs: [
      "**Microtasks drain completely** before the event loop starts the next task.",
      "**A microtask loop** can keep adding another microtask.",
      "**Too many microtasks** can postpone rendering and user input.",
      "**A task boundary** gives the browser a chance to handle other work.",
    ],
    code: 'console.log("task"); // task\n\nqueueMicrotask(() => {\n  console.log("microtask 1"); // microtask 1\n  queueMicrotask(() => console.log("microtask 2")); // microtask 2\n});\n\nsetTimeout(() => console.log("timer"), 0); // timer',
  },
  {
    id: "important-precision", heading: "Use the model precisely",
    paragraphs: [
      "**A task queue** is a teaching shortcut because browsers have task sources and task-selection rules.",
      "**Task order** is reliable within a source when its rules say so.",
      "**Rendering** is a possible opportunity instead of a guaranteed paint after every task.",
      "**setTimeout(fn, 0)** does not run fn immediately.",
      "**Web Workers** can run JavaScript on separate threads with separate event loops.",
    ],
    blocks: [{ type: "callout", title: "Rule of thumb", text: "After current JavaScript finishes, the runtime drains microtasks before it starts the next task." }],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and compare the console with the trace above.",
      "**Move the second promise** above the timer and run it again.",
      "**Add a queueMicrotask call** inside the first promise handler.",
      "**Predict the order** before you press Run.",
    ],
    code: 'console.log("A"); // A\n\nsetTimeout(() => console.log("D"), 0); // D\n\nPromise.resolve().then(() => {\n  console.log("B"); // B\n  queueMicrotask(() => console.log("C")); // C\n});',
    blocks: [{ type: "quiz", question: "When does C print?", answers: [
      { text: "Before D", correct: true, explanation: "C is a microtask created by another microtask, so it runs before the next task." },
      { text: "After D", correct: false, explanation: "D is a timer task, and the microtask queue drains before the next task." },
      { text: "Between A and B", correct: false, explanation: "B is the first queued microtask, so it runs before the microtask that prints C." },
    ] }],
  },
  {
    id: "remember", heading: "Remember",
    paragraphs: [
      "**The Call Stack** contains the JavaScript that is running now.",
      "**Tasks** run one at a time on later event-loop turns.",
      "**Microtasks** drain before the runtime selects the next task.",
      "**Long tasks and endless microtasks** make a page feel frozen.",
    ],
  },
];
