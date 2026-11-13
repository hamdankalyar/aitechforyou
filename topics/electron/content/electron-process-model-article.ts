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
    id: "flashcards",
    heading: "Flashcards: recall the big ideas",
    paragraphs: [
      "**Read the question** on each card.",
      "**Answer it yourself** before you look.",
      "**Show the answer** and compare it with yours.",
    ],
    blocks: [{
      type: "flashcards",
      title: "Electron's process model",
      cards: [
        {
          question: "What are the two main process types in an Electron app?",
          answer: "The main process and the renderer processes. The main process runs Node.js and acts like a server. Renderer processes run Chromium, one for each window. There is one main process, and there can be many renderer processes.",
        },
        {
          question: "Why is direct Node.js access from the renderer process off by default in modern Electron?",
          answer: "For security. Since Electron 12, you have to switch it on yourself. If the page had full Node.js access, any third-party script loaded from a CDN could use things like fs.writeFile on the user's computer.",
        },
        {
          question: "What is a preload script for?",
          answer: "It runs in the renderer process before the page loads and before any third-party script runs. It safely shares a small set of functions that let the page talk to the main process. This follows the rule of least access.",
        },
        {
          question: "How does the main and renderer setup compare to a normal web app?",
          answer: "The main process is like the server, and renderer processes are like browser tabs, the clients. On the web, many tabs talk to one server. In the same way, one main process starts and manages many renderer processes.",
        },
        {
          question: "Why do Electron version numbers go up so quickly, and what does a new number mean?",
          answer: "The numbers follow the release rhythm of Chromium and Node.js, not strict semantic versioning. A new version often just means a newer Chromium or Node.js inside, without breaking changes to Electron's own API.",
        },
      ],
    }],
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
          question: "An app has three windows open. How many main processes and renderer processes are running?",
          answers: [
            { text: "Three main processes and three renderer processes", correct: false, explanation: "An app never has more than one main process." },
            { text: "One main process and three renderer processes", correct: true, explanation: "One main process runs the app, and each window usually gets its own renderer process." },
            { text: "One main process and one renderer shared by all windows", correct: false, explanation: "Each window usually gets its own renderer process, like browser tabs." },
            { text: "Three main processes and no renderer processes", correct: false, explanation: "Windows need renderer processes to show their pages." },
          ],
        },
        {
          question: "A to-do app shows the list in a window and saves it to a file. Which process does each job?",
          answers: [
            { text: "The renderer saves the file, and the main process shows the list", correct: false, explanation: "It is the other way around. Only the main process should touch files." },
            { text: "A server process saves the file, and a client process shows the list", correct: false, explanation: "The idea is close, but Electron calls them the main process and the renderer process." },
            { text: "The renderer process does both jobs", correct: false, explanation: "The renderer cannot use Node, so it cannot save files on its own." },
            { text: "The main process saves the file, and the renderer process shows the list", correct: true, explanation: "The main process runs Node and can write files. The renderer runs Chromium and shows the page." },
          ],
        },
        {
          question: "If the main process is like a web server, what is a renderer process most like?",
          answers: [
            { text: "A browser tab that asks the server for things", correct: true, explanation: "Renderers ask the main process for work, like tabs ask a server." },
            { text: "A database", correct: false, explanation: "A database stores data. A renderer shows a page." },
            { text: "Another server", correct: false, explanation: "There is only one main process, which plays the server's part." },
            { text: "A CDN that hosts files", correct: false, explanation: "A CDN serves files over the internet. A renderer shows your app's page." },
          ],
        },
        {
          question: "Your page loads an analytics script from a CDN. Why is it good that the page cannot use Node?",
          answers: [
            { text: "Node modules would break normal DOM code on the page", correct: false, explanation: "Node and the DOM can work side by side. The real reason is security." },
            { text: "If that script is ever hacked, it still cannot write files on the user's computer", correct: true, explanation: "Without Node in the page, a bad script cannot reach things like fs.writeFile." },
            { text: "Running Node in every window would make the app too slow", correct: false, explanation: "Speed is not the reason. Safety is." },
            { text: "The script would bypass the same-origin policy", correct: false, explanation: "The concern is file and system access, not the same-origin policy." },
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
          question: "You want the page to be able to save a note, and nothing else. Where do you set that up?",
          answers: [
            { text: "In the main process, before any window starts", correct: false, explanation: "The main process does the saving, but the page's list of allowed actions is set up in the preload script." },
            { text: "On an update server that checks every request", correct: false, explanation: "Update servers deliver new versions of the app. They do not control what the page can do." },
            { text: "In the preload script, which runs before the page and shares a short allow list", correct: true, explanation: "The preload script decides exactly which actions the page may use." },
            { text: "In a cache that loads common modules into memory", correct: false, explanation: "Caching makes things faster. It does not decide what the page may do." },
          ],
        },
        {
          question: "A teammate's preload script shares every Node module with the page, just in case. What is wrong with that?",
          answers: [
            { text: "Nothing, sharing more makes the app easier to build", correct: false, explanation: "It also hands every script on the page full power over the computer." },
            { text: "Preload scripts are not allowed to share anything", correct: false, explanation: "Sharing a few chosen functions is exactly what preload scripts are for." },
            { text: "It makes the CSS load slower", correct: false, explanation: "The problem is safety, not speed." },
            { text: "It breaks least access, because the page gets far more power than it needs", correct: true, explanation: "Least access means sharing only what the page needs." },
          ],
        },
        {
          question: "Your app uses Electron 25, and Electron 26 comes out. What does the new number most likely mean?",
          answers: [
            { text: "The release came out in a new month, like a calendar version", correct: false, explanation: "Electron numbers are not dates." },
            { text: "Only security patches were added", correct: false, explanation: "New major versions also bring newer Chromium and Node.js." },
            { text: "Mostly a newer Chromium or Node.js inside, often with no breaking changes for your code", correct: true, explanation: "The numbers follow Chromium and Node.js releases, not big rewrites." },
            { text: "Every app must be rewritten to keep working", correct: false, explanation: "Many new versions need no changes to your code at all." },
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
