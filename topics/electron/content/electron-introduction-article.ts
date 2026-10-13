import type { ArticleSection } from "@/lib/articles";

export const electronIntroductionSections: ArticleSection[] = [
  {
    id: "web-developers-build-desktop-apps",
    heading: "Web developers can build desktop apps",
    paragraphs: [
      "**JavaScript developers** are not limited to the browser anymore.",
      "**The same skills** can build hardware projects, servers, and desktop apps.",
      "**This course** uses those skills to build full desktop applications.",
      {
        text: "**Many apps you use daily** are already built with Electron.",
        bullets: [
          "**Visual Studio Code** is a code editor built with Electron.",
          "**Obsidian** is a note-taking app built with Electron.",
          "**GitHub Desktop** is GitHub's Git client built with Electron.",
          "**Figma and Slack** also ship desktop apps built with Electron.",
        ],
      },
      "**These apps** prove Electron apps can feel at home on a desktop.",
    ],
  },
  {
    id: "what-electron-is",
    heading: "What Electron is",
    paragraphs: [
      "**Electron** is a framework for building desktop applications using web technologies.",
      "**Electron** joins two runtimes into one app.",
      "**Chromium** is the browser engine behind Google Chrome.",
      "**Node.js** is the JavaScript runtime that usually runs on servers.",
      "**Electron** adds bridges so these two parts can talk to each other.",
      "**The combination** can do more than either part can do alone.",
    ],
    blocks: [
      { type: "electron-runtime-diagram" },
      { type: "callout", title: "The shortest mental model", text: "Chromium draws the window. Node talks to the computer. Electron connects them." },
    ],
  },
  {
    id: "electron-ships-its-own-runtimes",
    heading: "Electron ships its own Chromium and Node",
    paragraphs: [
      "**Electron bundles** a copy of Chromium and a copy of Node inside your app.",
      "**Your users** do not need Node installed.",
      "**The Node version** is the one that came with your Electron version.",
      "**Node 16 or Node 20** on the user's machine does not matter.",
      "**The Chromium version** is also chosen when you choose your Electron version.",
      "**Browser support checks** are not needed, because every user gets the same engine.",
      "**Safari differences** do not affect an Electron app.",
      "**Feature planning** becomes simpler, because you know exactly which web features exist.",
    ],
  },
  {
    id: "the-chromium-side",
    heading: "Chromium runs the renderer process",
    paragraphs: [
      "**The renderer process** is the Chromium side of an Electron app.",
      "**The renderer** shows the user interface in a window.",
      {
        text: "**Chromium** gives the renderer everything a modern browser has.",
        bullets: [
          "**HTML5 support** covers the full modern HTML feature set.",
          "**GPU acceleration** uses the graphics card to draw the page quickly.",
          "**Blink** is the engine that lays out and paints the page.",
          "**V8** is the engine that runs the JavaScript.",
          "**Web APIs** include the DOM and other browser features.",
        ],
      },
    ],
  },
  {
    id: "the-node-side",
    heading: "Node runs the main process",
    paragraphs: [
      "**The main process** is the Node side of an Electron app.",
      "**The main process** can do everything a normal Node program can do.",
      {
        text: "**Node** gives the main process powers a browser tab does not have.",
        bullets: [
          "**Filesystem access** lets the app read and write files on the computer.",
          "**Native modules** let the app use compiled C or C++ code.",
          "**Database drivers** are often native modules written in C or C++.",
          "**Rust modules** can also be bundled when you need more speed.",
          "**Server-side capabilities** are available without running a separate server.",
        ],
      },
    ],
    blocks: [{
      type: "table",
      caption: "The two sides of every Electron app",
      columns: ["Side", "Built on", "Main job", "Has access to"],
      rows: [
        ["Renderer process", "Chromium", "Show the user interface", "DOM, Web APIs, GPU"],
        ["Main process", "Node.js", "Talk to the operating system", "Files, native modules, server-side code"],
      ],
    }],
  },
  {
    id: "keep-a-wall-between-them",
    heading: "Keep a wall between the two sides",
    paragraphs: [
      "**The renderer** is the part your users interact with.",
      "**The main process** is the part that can write to their file system.",
      "**A wall between them** protects the user's computer.",
      "**Security** is the main reason the two sides stay separate.",
      "**Older Electron apps** often called Node directly from the browser side.",
      "**That old approach** turned out to be a weak security posture.",
      "**It can still be switched on**, but this course does not do it.",
      "**The context bridge** is the Electron module that connects the two sides safely.",
      "**The renderer** asks the main process to do Node work through that bridge.",
    ],
    blocks: [{ type: "callout", title: "Remember this one", text: "Moving work and messages between the main process and the renderer process is most of the challenge in Electron." }],
  },
  {
    id: "one-codebase-web-and-desktop",
    heading: "One codebase for web and desktop",
    paragraphs: [
      "**A web app and a desktop app** can share one codebase.",
      "**Renderer code** stays separate from main process code.",
      "**Electron Forge** is the build tool used later in the course.",
      "**Vite or Webpack** can build the client-side files.",
      "**A monorepo** helps you organize the shared and separate parts.",
      {
        text: "**An abstraction** lets the same UI call different backends.",
        bullets: [
          "**In the browser**, the UI makes normal API calls.",
          "**In Electron**, the UI asks the main process instead.",
        ],
      },
      "**Apps like GitHub Desktop and Figma** start from the web experience and add desktop features.",
      "**This pattern** is called progressive enhancement.",
    ],
  },
  {
    id: "what-you-will-build",
    heading: "The three apps you will build",
    paragraphs: [
      {
        text: "**Firesale** is a Markdown editor that renders Markdown to HTML.",
        bullets: [
          "**Open and save** use native file dialogs scoped to certain file types.",
          "**Save HTML** exports the rendered page as an HTML file.",
          "**Revert** goes back to the last saved copy of the file.",
          "**Show File** opens the file's folder in Finder or Windows Explorer.",
          "**Open in Default Application** opens the file in the app the system prefers.",
          "**These actions** are hard in a browser and natural in Electron.",
        ],
      },
      {
        text: "**Not Done (Yet)** is a to-do list app.",
        bullets: ["**React** is the frontend framework used to build it."],
      },
      {
        text: "**Clipmaster** is a clipboard app.",
        bullets: [
          "**The menu bar** is where it lives on macOS.",
          "**The system tray** is where it lives on Windows.",
        ],
      },
    ],
  },
  {
    id: "what-the-course-covers",
    heading: "What the course covers",
    paragraphs: [
      "**Native file dialogs** open and save files.",
      "**The file system** is read and written from the main process.",
      "**Operating system integration** makes the app feel at home on each platform.",
      "**TypeScript** is used from the second example onward.",
      "**JavaScript users** can rename the files to .js instead.",
      "**The first app** uses plain TypeScript with no framework.",
      "**The second app** uses React to show how a frontend framework fits in.",
      "**Clipboard access** reads and writes copied text.",
      "**Notifications** show system messages to the user.",
      "**Global shortcuts** open the app from anywhere with a key combination.",
      "**Native modules** bring compiled code into Node when needed.",
    ],
  },
  {
    id: "what-the-course-skips",
    heading: "What the course does not cover deeply",
    paragraphs: [
      "**Packaging and code signing** are different on every operating system.",
      "**Electron Forge** packages an app with one command.",
      "**An Apple developer account** costs about $100 and is needed to sign apps for the App Store.",
      "**This course** focuses on building and developing the apps instead.",
    ],
    blocks: [{ type: "command", command: "npm run package", label: "Command", explanation: "Package an Electron Forge app for your current operating system." }],
  },
  {
    id: "lecture-quiz",
    heading: "Quiz mode: check this lecture",
    paragraphs: [
      "**Answer one question at a time.**",
      "**Each answer** shows why it is right or wrong.",
      "**Your score** appears at the end, and you can retry the questions you missed.",
    ],
    blocks: [{
      type: "quiz-mode",
      title: "Introduction to Electron",
      questions: [
        {
          question: "What is Electron?",
          answers: [
            { text: "A framework for building desktop apps with web technologies", correct: true, explanation: "Electron lets you build desktop apps with HTML, CSS, and JavaScript." },
            { text: "A browser extension that adds desktop features to Chrome", correct: false, explanation: "Electron apps are standalone desktop apps, not browser extensions." },
            { text: "A JavaScript engine that replaces V8", correct: false, explanation: "Electron uses V8. It does not replace it." },
            { text: "A hosting service for web apps", correct: false, explanation: "Electron apps run on the user's computer, not on a hosting service." },
          ],
        },
        {
          question: "Which two runtimes does Electron bring together?",
          answers: [
            { text: "Safari and Deno", correct: false, explanation: "Electron does not use Safari or Deno." },
            { text: "Chromium and Node.js", correct: true, explanation: "Chromium shows the interface, and Node.js gives access to the computer." },
            { text: "Firefox and Node.js", correct: false, explanation: "The browser side of Electron is Chromium, not Firefox." },
            { text: "Chromium and Bun", correct: false, explanation: "The server-side runtime in Electron is Node.js." },
          ],
        },
        {
          question: "A user has Node 16 installed. Your app needs a newer Node feature. What happens?",
          answers: [
            { text: "The app fails until the user upgrades Node", correct: false, explanation: "Users do not need Node installed at all." },
            { text: "Electron downloads the newest Node when the app starts", correct: false, explanation: "Electron does not download Node at runtime." },
            { text: "The app works, because Electron ships its own Node version", correct: true, explanation: "The Node version comes with your Electron version, so the user's Node does not matter." },
            { text: "Electron converts the feature into C++", correct: false, explanation: "Electron does not convert JavaScript into C++." },
          ],
        },
        {
          question: "Which process is the Chromium side of an Electron app?",
          answers: [
            { text: "The renderer process", correct: true, explanation: "The renderer process uses Chromium to show the user interface." },
            { text: "The main process", correct: false, explanation: "The main process is the Node side." },
            { text: "The package process", correct: false, explanation: "Electron has no package process. Packaging is a build step." },
            { text: "The native module process", correct: false, explanation: "Native modules are loaded by Node in the main process." },
          ],
        },
        {
          question: "Which job belongs to the main process?",
          answers: [
            { text: "Painting the page with Blink", correct: false, explanation: "Blink paints pages in the renderer process." },
            { text: "Running CSS animations", correct: false, explanation: "CSS animations run in the renderer process." },
            { text: "Building the DOM from HTML", correct: false, explanation: "The DOM lives in the renderer process." },
            { text: "Reading and writing files on the computer", correct: true, explanation: "File system access comes from Node, which runs in the main process." },
          ],
        },
        {
          question: "Why should the renderer not call Node directly?",
          answers: [
            { text: "Chromium cannot run JavaScript", correct: false, explanation: "Chromium runs JavaScript with V8." },
            { text: "The part users interact with should not be able to write to their file system", correct: true, explanation: "Keeping a wall between the two sides is mainly about security." },
            { text: "TypeScript does not allow it", correct: false, explanation: "TypeScript has nothing to do with this rule." },
            { text: "Node is slower than Chromium", correct: false, explanation: "The separation is about security, not speed." },
          ],
        },
        {
          question: "Which Electron module connects the renderer and the main process safely?",
          answers: [
            { text: "Blink", correct: false, explanation: "Blink is Chromium's rendering engine." },
            { text: "Electron Forge", correct: false, explanation: "Electron Forge is a build and packaging tool." },
            { text: "The context bridge", correct: true, explanation: "The context bridge exposes chosen main process features to the renderer." },
            { text: "Webpack", correct: false, explanation: "Webpack bundles files. It does not connect processes." },
          ],
        },
        {
          question: "Can a web app and an Electron app share one codebase?",
          answers: [
            { text: "No, Electron code can never run in a browser", correct: false, explanation: "Renderer code is web code, so it can also run in a browser." },
            { text: "Yes, but only if you rewrite the app in C++", correct: false, explanation: "No C++ is needed to share code." },
            { text: "Yes, if the UI uses an abstraction for API calls versus desktop calls", correct: true, explanation: "An abstraction lets the same UI call a web API in the browser and the main process in Electron." },
            { text: "Only if the web app targets Safari", correct: false, explanation: "Browser choice does not decide whether code can be shared." },
          ],
        },
        {
          question: "Where does a menu bar app like Clipmaster live on Windows?",
          answers: [
            { text: "In the system tray", correct: true, explanation: "Windows calls this area the system tray. macOS calls it the menu bar." },
            { text: "In the Start menu tiles only", correct: false, explanation: "Tiles are a different Windows feature." },
            { text: "In a browser tab", correct: false, explanation: "Clipmaster is a desktop app, not a browser tab." },
            { text: "In the Dock", correct: false, explanation: "The Dock is a macOS feature." },
          ],
        },
        {
          question: "Which topic does this course not cover deeply?",
          answers: [
            { text: "Native file dialogs", correct: false, explanation: "File dialogs are a core part of the Firesale app." },
            { text: "Global shortcuts", correct: false, explanation: "Global shortcuts are covered with Clipmaster." },
            { text: "Packaging and code signing", correct: true, explanation: "Signing is different on every operating system and can require a paid developer account." },
            { text: "Clipboard access", correct: false, explanation: "Clipboard access is covered with Clipmaster." },
          ],
        },
      ],
    }],
  },
];
