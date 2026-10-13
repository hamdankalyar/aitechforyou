import type { ArticleSection } from "@/lib/articles";

export const electronProcessModelSections: ArticleSection[] = [
  {
    id: "the-biggest-challenge",
    heading: "The biggest challenge in Electron",
    paragraphs: [
      "**A process** is a program that is running on your computer.",
      "**Every Electron app** runs at least two kinds of process.",
      "**About 90% of the work** in an Electron app is getting these processes to talk to each other.",
      "**This lecture** explains what the processes are and how they connect.",
      "**Security rules** are stricter now than they were a few years ago.",
      "**Those rules** are why the processes need a careful way to talk.",
    ],
    blocks: [{ type: "callout", title: "The question we’ll answer", text: "If the page in the window cannot use Node, how does it read a file?" }],
  },
  {
    id: "main-and-renderer",
    heading: "One main process, one or more renderer processes",
    paragraphs: [
      "**The main process** is the Node side of the app.",
      "**Every app** has exactly one main process.",
      "**A renderer process** is the browser side that shows a window.",
      "**An app** can have one renderer process or many.",
      {
        text: "**Each window** usually gets its own renderer process.",
        bullets: [
          "**VS Code** opens a new renderer process for each window you open.",
          "**Most apps in this course** use one main process and one renderer process.",
        ],
      },
      {
        text: "**The main process** is in charge of the windows.",
        bullets: [
          "**It can open** a new renderer process.",
          "**It can close** a renderer process.",
          "**A renderer** can also close itself.",
        ],
      },
    ],
    blocks: [{ type: "electron-process-diagram" }],
  },
  {
    id: "like-browser-tabs",
    heading: "Renderer processes work like browser tabs",
    paragraphs: [
      "**Chrome** runs every tab in its own process.",
      "**One tab** cannot see inside another tab.",
      "**Renderer processes** in Electron are kept apart in the same way.",
      "**The main process** is the one part that connects them all.",
    ],
  },
  {
    id: "think-of-a-server",
    heading: "Think of the main process as a server",
    paragraphs: [
      "**On the web**, many browsers talk to one server.",
      "**In Electron**, one or more renderer processes talk to one main process.",
      "**The main process** plays the role of the server.",
      "**The renderer processes** play the role of the browsers.",
      "**This picture** is a good way to remember who does what.",
    ],
    blocks: [{
      type: "table",
      caption: "The web picture you already know, mapped to Electron",
      columns: ["On the web", "In Electron", "Its job"],
      rows: [
        ["Server", "Main process", "Does the powerful work, like reading files"],
        ["Browser", "Renderer process", "Shows the page and asks for that work"],
      ],
    }],
  },
  {
    id: "why-not-node-everywhere",
    heading: "Why the page cannot just use Node",
    paragraphs: [
      "**Older Electron apps** let the page use Node directly.",
      {
        text: "**This old code** reads a folder straight from the page.",
        block: {
          type: "command",
          label: "Old renderer code",
          command: "<script>\n  const fs = require('fs');\n  let files = fs.readdirSync('/Users/stevekinney/Notes');\n</script>",
        },
      },
      "**fs** is Node's file system module.",
      "**That looked convenient**, but it was risky.",
      {
        text: "**A script loaded from the internet** could run in the same page.",
        bullets: [
          "**A CDN** is a server that hosts scripts many sites load.",
          "**A bad or hacked script** from a CDN could call fs.writeFile.",
          "**fs.writeFile** writes files on the user's computer.",
        ],
      },
      "**Electron 12** made the safe setup the default.",
      "**Node in the page** is now something you have to switch on yourself.",
      "**This course** does not switch it on, and you should not either.",
      "**A quick test app** that only you use is the one place it might be acceptable.",
    ],
    blocks: [{ type: "callout", title: "Do not copy this", text: "The code above is the old way. It gives every script on the page full access to the user’s computer." }],
  },
  {
    id: "ipc",
    heading: "IPC: how the processes talk",
    paragraphs: [
      "**IPC** stands for inter-process communication.",
      "**IPC** lets one process send a message to another process.",
      "**The renderer** sends a message when it needs Node work done.",
      "**The main process** does the work and can send an answer back.",
      "**IPC** is used again and again in every app in this course.",
    ],
  },
  {
    id: "preload-scripts",
    heading: "Preload scripts: the safe doorway",
    paragraphs: [
      "**A preload script** is a small file that runs before your page loads.",
      "**It runs inside the renderer process.**",
      "**It is not** an extra process.",
      {
        text: "**It runs early**, before anything risky can happen.",
        bullets: [
          "**Before the DOM loads.**",
          "**Before any third-party script loads.**",
          "**Before the page talks to the outside world.**",
        ],
      },
      "**The preload script** decides which main process features the page may use.",
      "**This list of allowed features** is called an allow list.",
      "**The page** can use only what is on that list.",
    ],
    blocks: [{
      type: "table",
      caption: "The three pieces of every Electron window",
      columns: ["Piece", "Where it runs", "How many", "Its job"],
      rows: [
        ["Main process", "Node.js", "One per app", "Opens windows and talks to the computer"],
        ["Preload script", "Inside the renderer process", "One per window", "Shares a short list of safe features with the page"],
        ["Renderer process", "Chromium", "One per window", "Shows the page and uses only the shared features"],
      ],
    }],
  },
  {
    id: "least-access",
    heading: "Share as little as possible",
    paragraphs: [
      "**Least access** is a basic security rule.",
      "**Least access** means giving something only the power it needs.",
      "**The preload script** shares the smallest set of features the page needs.",
      "**Fewer shared features** means fewer ways for a bad script to cause harm.",
    ],
    blocks: [{ type: "callout", title: "Remember this one", text: "Give the page as much as it needs and as little as you can get away with." }],
  },
  {
    id: "version-numbers",
    heading: "Why Electron version numbers climb fast",
    paragraphs: [
      "**Electron 26** was the newest version when the workshop was recorded.",
      "**New versions** come out often.",
      "**A new version number** usually means a newer Chromium or Node inside.",
      "**A new version number** does not always mean your code will break.",
      "**Early Electron** took years to reach version 1 and then version 2.",
      "**Today** the numbers follow the release rhythm of Chromium and Node.",
    ],
  },
  {
    id: "auto-updates",
    heading: "Can an Electron app update itself?",
    paragraphs: [
      "**Yes**, Electron apps can update themselves.",
      "**A server** is needed to tell the app which version is the newest.",
      "**Plain Electron** does not choose an update method for you.",
      {
        text: "**Electron Forge** is a starter tool for Electron apps.",
        bullets: [
          "**It is similar to** Create React App, but for Electron.",
          "**It sets up** build tools like Webpack for you.",
          "**It supports** Squirrel, a common updater for desktop apps.",
          "**It can check for** and download updates once your server is set up.",
        ],
      },
      "**Some libraries** use GitHub Actions and GitHub Releases to deliver updates.",
      "**The Mac App Store** can also deliver updates and handle in-app purchases.",
    ],
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
      title: "Electron's process model",
      questions: [
        {
          question: "What takes most of the effort when building an Electron app?",
          answers: [
            { text: "Getting the main and renderer processes to talk to each other", correct: true, explanation: "The teacher calls this about 90% of the battle." },
            { text: "Writing the CSS", correct: false, explanation: "Styling works the same as on the web. It is not the hard part." },
            { text: "Choosing a code editor", correct: false, explanation: "Your editor has nothing to do with how Electron works." },
            { text: "Naming the app", correct: false, explanation: "The hard part is communication between processes." },
          ],
        },
        {
          question: "How many main processes does an Electron app have?",
          answers: [
            { text: "One for each window", correct: false, explanation: "Windows get renderer processes. The main process is shared." },
            { text: "Exactly one", correct: true, explanation: "Every Electron app has one main process that is in charge." },
            { text: "None", correct: false, explanation: "Every Electron app needs a main process to start." },
            { text: "One for each CPU core", correct: false, explanation: "The number of main processes does not depend on your computer." },
          ],
        },
        {
          question: "An app has three windows open. How many renderer processes does it usually have?",
          answers: [
            { text: "One shared by all windows", correct: false, explanation: "Each window usually gets its own renderer process." },
            { text: "None", correct: false, explanation: "Every window needs a renderer process to show its page." },
            { text: "Three, one for each window", correct: true, explanation: "Like browser tabs, each window usually runs in its own renderer process." },
            { text: "Six, two for each window", correct: false, explanation: "A window usually has one renderer process." },
          ],
        },
        {
          question: "Which web picture is a good way to think about the main process?",
          answers: [
            { text: "A CSS file", correct: false, explanation: "CSS only styles a page." },
            { text: "A browser tab", correct: false, explanation: "Browser tabs are more like renderer processes." },
            { text: "A cookie", correct: false, explanation: "A cookie stores a small piece of data. It does not do work." },
            { text: "A server that many browsers talk to", correct: true, explanation: "Renderer processes ask the main process for work, like browsers ask a server." },
          ],
        },
        {
          question: "Why is it risky to let the page use Node directly?",
          answers: [
            { text: "A bad script loaded from a CDN could write files on the user's computer", correct: true, explanation: "Any script on the page would get the same power as your own code." },
            { text: "Node makes the page load slower", correct: false, explanation: "The problem is safety, not speed." },
            { text: "Node cannot read HTML", correct: false, explanation: "That is not the reason. The reason is security." },
            { text: "It breaks the page's CSS", correct: false, explanation: "Node does not change how CSS works." },
          ],
        },
        {
          question: "What does IPC stand for?",
          answers: [
            { text: "Internet Protocol Channel", correct: false, explanation: "IPC is not about the internet." },
            { text: "Internal Page Cache", correct: false, explanation: "IPC is not a cache." },
            { text: "Inter-process communication", correct: true, explanation: "IPC is how one process sends messages to another process." },
            { text: "Instant Preload Call", correct: false, explanation: "Preload scripts use IPC, but that is not what the letters mean." },
          ],
        },
        {
          question: "Where does a preload script run?",
          answers: [
            { text: "In its own separate process", correct: false, explanation: "A preload script does not get its own process." },
            { text: "Inside the renderer process, before the page loads", correct: true, explanation: "It runs early in the renderer, before the DOM and any third-party scripts." },
            { text: "Inside the main process", correct: false, explanation: "The preload script belongs to the renderer side." },
            { text: "On a remote server", correct: false, explanation: "It runs on the user's computer, inside the app." },
          ],
        },
        {
          question: "What should a preload script share with the page?",
          answers: [
            { text: "All of Node", correct: false, explanation: "That would bring back the old security problem." },
            { text: "Nothing at all", correct: false, explanation: "Then the page could never ask the main process for help." },
            { text: "Everything while you are developing", correct: false, explanation: "Habits from development often reach the real app. Share only what is needed." },
            { text: "Only the few features the page needs", correct: true, explanation: "This is least access: as much as needed, as little as possible." },
          ],
        },
        {
          question: "Why do Electron version numbers go up so fast?",
          answers: [
            { text: "Each version follows new Chromium and Node releases", correct: true, explanation: "A new number often just means newer Chromium or Node inside." },
            { text: "Every version breaks all your code", correct: false, explanation: "Many new versions have no breaking changes for your code." },
            { text: "The numbers are chosen at random", correct: false, explanation: "They follow the release rhythm of Chromium and Node." },
            { text: "Each app picks its own Electron number", correct: false, explanation: "Electron versions are set by the Electron project." },
          ],
        },
        {
          question: "What do you need to set up for auto updates?",
          answers: [
            { text: "Nothing, updates happen by themselves", correct: false, explanation: "The app needs somewhere to check for new versions." },
            { text: "A server that tells the app which version is newest", correct: true, explanation: "Electron Forge can check and download updates once that server exists." },
            { text: "A new Chromium install on every computer", correct: false, explanation: "Electron already ships its own Chromium." },
            { text: "A second main process", correct: false, explanation: "An app always has exactly one main process." },
          ],
        },
      ],
    }],
  },
];
