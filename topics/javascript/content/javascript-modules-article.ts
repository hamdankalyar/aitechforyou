import type { ArticleSection } from "@/lib/articles";

export const javascriptModulesSections: ArticleSection[] = [
  {
    id: "what-modules-are", heading: "Split code into modules",
    paragraphs: [
      "**A module** is one JavaScript file.",
      "**Use modules** to keep your app in smaller files.",
      "**export** shares a function from one file.",
      "**import** brings that function into another file.",
    ],
  },
  {
    id: "named-exports", heading: "Export functions by name",
    paragraphs: [
      "**A named export** shares a function using its function name.",
      "**One file** can export many named functions.",
      "**export** goes before each function you want to share.",
      { text: "**math.js** shares addTwo and addThree by name.", module: true, code: "export function addTwo(a, b) {\n  return a + b;\n}\n\nexport function addThree(a, b, c) {\n  return a + b + c;\n}\n\nconsole.log(addTwo(2, 3)); // 5\nconsole.log(addThree(1, 2, 3)); // 6" },
    ],
  },
  {
    id: "import-named", heading: "Import named functions",
    paragraphs: [
      "**A named import** uses curly braces around the function name.",
      "**This import** brings in addTwo and no other function.",
      "**The name inside the braces** must match the exported function name.",
      { text: "**This file** imports only the named addTwo function.", module: true, moduleFiles: { "./addTwo.js": "export function addTwo(a, b) { return a + b; }\nexport function addThree(a, b, c) { return a + b + c; }" }, code: 'import { addTwo } from "./addTwo.js";\n\nconsole.log(addTwo(2, 3)); // 5' },
    ],
  },
  {
    id: "default-export", heading: "Export one default function",
    paragraphs: [
      "**export default** exports one function from a file.",
      "**A module** can have one default export.",
      "**Default exports** are optional.",
      { text: "**addTwo.js** exports addTwo as its default function.", module: true, code: "export default function addTwo(a, b) {\n  return a + b;\n}\n\nconsole.log(addTwo(2, 3)); // 5" },
    ],
  },
  {
    id: "import-default", heading: "Import a default function",
    paragraphs: [
      "**A default import** uses no curly braces.",
      "**The name after import** is the name you use in this file.",
      "**add** is the local name for the exported addTwo function.",
      "**The .js ending** is needed in browser module paths.",
      { text: "**This file** imports the default function and calls it add.", module: true, moduleFiles: { "./addTwo.js": "export default function addTwo(a, b) { return a + b; }" }, code: 'import add from "./addTwo.js";\n\nconsole.log(add(2, 3)); // 5' },
    ],
  },
  {
    id: "browser-modules", heading: "Load modules in the browser",
    paragraphs: [
      "**The browser** needs a script tag with type=\"module\" to start your module files.",
      "**The first module file** can import functions from other files.",
      "**Use a local development server** to open browser module files.",
      "**This script tag** starts mathOperations.js.",
    ],
    code: 'console.log(\'<script type="module" src="./mathOperations.js"></script>\'); // <script type="module" src="./mathOperations.js"></script>',
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the result from the imported function.",
      "**Change 4 to 10** and run it again.",
      "**Reset** restores the example.",
    ],
    module: true,
    moduleFiles: { "./multiply.js": "export function multiply(a, b) { return a * b; }" },
    code: 'import { multiply } from "./multiply.js";\n\nconsole.log(multiply(4, 5)); // 20',
    blocks: [{ type: "quiz", question: "Which import gets a named export called addTwo?", answers: [
      { text: 'import { addTwo } from "./addTwo.js";', correct: true, explanation: "Named imports use curly braces around the exported name." },
      { text: 'import addTwo from "./addTwo.js";', correct: false, explanation: "This syntax imports a default export." },
      { text: 'import default { addTwo } from "./addTwo.js";', correct: false, explanation: "JavaScript does not use this import syntax." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**export** shares a function from its file.",
      "**import** brings that function into another file.",
      "**A default export** lets the importing file choose its local function name.",
      "**A named import** uses the exported function name inside curly braces.",
    ],
  },
];
