import type { ArticleSection } from "@/lib/articles";

export const javascriptEventsSections: ArticleSection[] = [
  {
    id: "what-an-event-is", heading: "What an event is",
    paragraphs: [
      "**An event** is something that happens on the page, such as a click.",
      "**The browser watches** the page for things the user does.",
      "**When one happens**, the browser fires an event to announce it.",
      "**Fires** means creates the event and sends it out.",
      "**A click event** is fired when the user clicks somewhere on the page.",
      "**An event listener** is how JavaScript detects an event.",
    ],
  },
  {
    id: "add-event-listener", heading: "addEventListener",
    paragraphs: [
      "**addEventListener()** listens for an event on a DOM element.",
      "**A DOM element** is one part of the page: a heading, a box, a button, or the whole document.",
      { text: "**It takes two parameters.**", bullets: [
        '**The event name** as a string, such as "click".',
        "**A handler function** that JavaScript calls each time the event fires.",
      ] },
      "**document** is the whole page, so this listener catches every click on it.",
    ],
    code: 'document.addEventListener("click", () => {\n  console.log("clicked"); // clicked, once per click\n});',
    page: true,
  },
  {
    id: "handler-function", heading: "The handler can do anything",
    paragraphs: [
      "**The handler** is a normal function, so any code can go inside it.",
      "**Global variables** are visible inside the handler, as in the scope lesson.",
      "**clicks** goes up by one on every click.",
    ],
    code: 'let clicks = 0;\ndocument.addEventListener("click", () => {\n  clicks = clicks + 1;\n  console.log("Clicks:", clicks); // Clicks: 1, then Clicks: 2, and so on\n});',
    page: true,
  },
  {
    id: "event-object", heading: "The event object",
    paragraphs: [
      "**JavaScript passes an event object** to the handler with details about what happened.",
      "**Name a parameter** to receive it. event is the usual name.",
      "**event.type** is the event name.",
      "**event.target** is the element the event fired on.",
      "**tagName** gives that element's name in capitals: BUTTON, H1, DIV, or BODY.",
    ],
    code: 'document.addEventListener("click", (event) => {\n  console.log(event.type); // click\n  console.log(event.target.tagName); // BUTTON when you click the button\n});',
    page: true,
  },
  {
    id: "other-events", heading: "Other events",
    paragraphs: [
      '**"click"** is one of many event names.',
      '**"dblclick"** fires on a double click.',
      '**"mouseover"** fires when the mouse moves onto an element.',
      '**"mouseout"** fires when the mouse leaves an element.',
      "**Both listeners** below run on the same page at the same time.",
    ],
    code: 'document.addEventListener("dblclick", () => {\n  console.log("double click"); // double click\n});\ndocument.addEventListener("mouseover", (event) => {\n  console.log("mouse over", event.target.tagName); // mouse over BUTTON, as the mouse moves\n});',
    page: true,
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run**, then click the button in the demo page.",
      '**Change "click" to "mouseout"** and run again. Move the mouse onto the button and away.',
      "**Add a second console.log** that prints event.type.",
      "**Reset** restores the example.",
    ],
    code: 'document.addEventListener("click", (event) => {\n  console.log("You clicked", event.target.tagName); // You clicked BUTTON\n});',
    page: true,
    blocks: [{ type: "quiz", question: "What does addEventListener need as its second argument?", answers: [
      { text: "A function to call when the event fires", correct: true, explanation: "The handler function runs each time the named event happens on the element." },
      { text: "The element to watch", correct: false, explanation: "The element comes before the dot, as in document.addEventListener." },
      { text: "A second event name", correct: false, explanation: "One call listens for one event name. Call addEventListener again for another." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**The browser fires events** when things happen on the page.",
      "**addEventListener(name, handler)** runs the handler each time that event fires on the element.",
      "**The event object** tells the handler what happened. event.target is the element.",
      '**Event names** include "click", "dblclick", "mouseover", and "mouseout".',
    ],
  },
];
