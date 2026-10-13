import type { ArticleSection } from "@/lib/articles";

const createWindowCode = `const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}`;

const appLifecycleCode = `app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})`;

const preloadCode = `window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(\`\${type}-version\`, process.versions[type])
  }
})`;

const indexHtmlCode = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
    <script src="./renderer.js"></script>
  </body>
</html>`;

export const electronSmallestAppSections: ArticleSection[] = [
  {
    id: "two-helpful-tools",
    heading: "Two helpful tools",
    paragraphs: [
      "**The workshop** uses three practice repos.",
      {
        text: "**Electron Fiddle** is a free app for trying small Electron experiments.",
        bullets: [
          "**It shows** the simplest possible Electron app.",
          "**It is a good place** to see the processes before using bigger tools.",
        ],
      },
      {
        text: "**Electron Forge** is a starter kit for real Electron projects.",
        bullets: [
          "**It is like** Create React App, but for Electron.",
          "**It sets up** build tools, best practices, and auto updates for you.",
          "**You could** set all of this up by hand, but you probably do not want to.",
          "**Existing apps** can be moved into Electron Forge too.",
        ],
      },
      "**Most of this course** uses Electron Forge.",
    ],
  },
  {
    id: "why-a-build-tool",
    heading: "Why real apps need a build tool",
    paragraphs: [
      "**A bundler** is a tool that joins many code files into a few files the app can load.",
      "**Webpack and Vite** are two popular bundlers.",
      "**Every real app** needs some kind of module system or bundler sooner or later.",
      "**This is true** whether you write plain JavaScript or use React.",
      "**Without Electron Forge**, you end up copying setup code from Stack Overflow.",
    ],
  },
  {
    id: "the-four-files",
    heading: "The smallest Electron app has four files",
    paragraphs: [
      "**Electron Fiddle** opens a hello world app made of four files.",
      "**You can build** the same app yourself with two commands.",
      {
        text: "**npm init** creates the package.json file.",
        block: { type: "command", command: "npm init -y", label: "Terminal", explanation: "Create package.json with the default answers." },
      },
      {
        text: "**npm install** adds Electron to the project.",
        block: { type: "command", command: "npm install --save-dev electron", label: "Terminal", explanation: "Install Electron as a development dependency." },
      },
      "**Then you add** the four files shown below.",
    ],
    blocks: [{ type: "electron-startup-diagram" }],
  },
  {
    id: "package-json",
    heading: "package.json points to the first file",
    paragraphs: [
      "**The main field** in package.json names the app's first file.",
      "**In this app**, the first file is main.js.",
      "**Electron reads** this field when the app starts.",
      "**A Node server** works the same way with a file like index.js or server.js.",
      {
        text: "**npm start** runs Electron in the current folder.",
        block: { type: "command", label: "package.json", command: `{\n  "name": "hello-electron",\n  "main": "main.js",\n  "scripts": {\n    "start": "electron ."\n  }\n}`, highlightLines: [3, 5] },
      },
    ],
  },
  {
    id: "which-modules-where",
    heading: "Most Electron features live in the main process",
    paragraphs: [
      "**Electron** gives you many modules, like app and BrowserWindow.",
      {
        text: "**The main process** can use almost all of them.",
        bullets: [
          "**It can read** power settings, like whether the laptop is on battery.",
          "**It can read and write** files.",
          "**It can talk** directly to a database.",
        ],
      },
      "**The renderer process** can use only a few Electron modules.",
      "**IPC** is the most important one the renderer can use.",
      "**The renderer** asks the main process for anything else.",
      "**The main process** does the work and sends the result back.",
      "**Older Electron** made you remember which module worked where.",
      "**The newer, safer setup** makes this easier, because the renderer gets so little.",
    ],
  },
  {
    id: "main-js",
    heading: "main.js creates the window",
    paragraphs: [
      "**main.js** runs in the main process.",
      "**require('electron')** brings in app and BrowserWindow.",
      "**app** controls the whole application.",
      "**BrowserWindow** creates a window on the screen.",
      {
        text: "**new BrowserWindow** opens a window with the options you give it.",
        block: { type: "command", label: "main.js", command: createWindowCode, highlightLines: [5, 6, 7, 8, 9, 10, 11] },
      },
      {
        text: "**width and height** set the size of the window.",
        bullets: [
          "**minWidth, maxWidth, minHeight, and maxHeight** limit how far a user can resize it.",
          "**You control the window**, so you do not have to design for every screen size like on the web.",
        ],
      },
      {
        text: "**webPreferences** holds settings for the page inside the window.",
        bullets: [
          "**preload** gives the path to the preload script.",
          "**webSecurity** can be turned off, but you should never do that.",
        ],
      },
      "**loadFile** loads index.html into the window.",
      "**index.html** is the starting page of your app.",
    ],
  },
  {
    id: "devtools",
    heading: "Open DevTools while you build",
    paragraphs: [
      "**DevTools** are the same Chrome developer tools you use on the web.",
      "**openDevTools** opens them when the window starts.",
      {
        text: "**This check** opens DevTools only while you are developing.",
        block: { type: "command", label: "main.js", command: "if (process.env.NODE_ENV === 'development') {\n  mainWindow.webContents.openDevTools()\n}" },
      },
      "**Many finished Electron apps** still let users open DevTools.",
      "**A custom app menu** can hide DevTools if you want to lock the app down.",
    ],
  },
  {
    id: "feel-at-home",
    heading: "Make the app feel at home on each system",
    paragraphs: [
      "**Apps behave differently** on macOS, Windows, and Linux.",
      "**A good Electron app** follows the habits of each system.",
      {
        text: "**This code** starts the app and handles closing windows.",
        block: { type: "command", label: "main.js", command: appLifecycleCode },
      },
      "**app.whenReady** waits until Electron is ready, then creates the window.",
      {
        text: "**On Windows and Linux**, closing the last window quits the app.",
        bullets: ["**window-all-closed** runs when the last window closes, and app.quit ends the app."],
      },
      {
        text: "**On macOS**, closing the last window keeps the app running.",
        bullets: [
          "**The app** stays in the Dock with no windows.",
          "**activate** runs when the user clicks the Dock icon.",
          "**createWindow** then opens a new window if none are open.",
        ],
      },
      "**process.platform** tells you which system the app is running on.",
    ],
    blocks: [{
      type: "table",
      caption: "What process.platform returns on each system",
      columns: ["System", "process.platform", "Why that name"],
      rows: [
        ["macOS", "darwin", "macOS is built on a core system called Darwin"],
        ["Windows", "win32", "Used for both 32-bit and 64-bit Windows"],
        ["Linux", "linux", "Just the system name"],
      ],
    }],
  },
  {
    id: "preload-js",
    heading: "preload.js runs before the page",
    paragraphs: [
      "**preload.js** runs inside the renderer process.",
      "**It runs** before index.html has loaded.",
      "**At that moment**, Chromium has started but has not read any page yet.",
      {
        text: "**The preload script** can reach a few things the page cannot.",
        bullets: [
          "**process** is Node's object with facts about where the app is running.",
          "**process.versions** lists the Chrome, Node, and Electron versions.",
          "**IPC** lets it talk to the main process.",
        ],
      },
      "**It can also use** the DOM once the page has loaded.",
      {
        text: "**This preload script** writes the three version numbers into the page.",
        block: { type: "command", label: "preload.js", command: preloadCode },
      },
      "**DOMContentLoaded** waits until the page's HTML is ready.",
      "**The preload script** is a safe place to choose what the page may use.",
    ],
  },
  {
    id: "renderer-js",
    heading: "renderer.js is normal front-end code",
    paragraphs: [
      "**renderer.js** is loaded by a script tag in index.html.",
      "**It runs** in the renderer process like any browser script.",
      "**This is the code** front-end developers write every day.",
      "**In a real app**, it is often the output of Webpack or Vite.",
      "**In Electron Fiddle**, renderer.js is almost empty.",
      "**The version numbers** are written by preload.js instead, because only it can read process.",
      "**A later app** shares a few process values with the page in a safer way.",
    ],
  },
  {
    id: "index-html",
    heading: "index.html is the page",
    paragraphs: [
      "**index.html** is a normal HTML page.",
      {
        text: "**The spans** are empty until preload.js fills them in.",
        block: { type: "command", label: "index.html", command: indexHtmlCode, highlightLines: [5, 10, 11, 12, 13] },
      },
      {
        text: "**CSP** stands for Content Security Policy.",
        bullets: [
          "**A CSP** tells the page which scripts it may run.",
          "**script-src 'self'** allows only scripts that come from the app itself.",
          "**Electron** shows a warning in the console if your page has no CSP.",
          "**Webpack's live reload** uses WebSockets, so its CSP may need extra rules.",
        ],
      },
      "**These four files** are all you need for a working Electron app.",
    ],
    blocks: [{ type: "callout", title: "Remember this one", text: "package.json points to main.js. main.js opens a window with a preload script. The window loads index.html, which loads renderer.js." }],
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
      title: "The smallest Electron app",
      questions: [
        {
          question: "What is Electron Forge?",
          answers: [
            { text: "A starter kit that sets up build tools and best practices for Electron apps", correct: true, explanation: "It is like Create React App, but for Electron." },
            { text: "A code editor for Electron", correct: false, explanation: "Electron Forge sets up projects. It is not an editor." },
            { text: "A replacement for Node.js", correct: false, explanation: "Electron Forge uses Node. It does not replace it." },
            { text: "A browser extension", correct: false, explanation: "Electron Forge is a command-line tool for desktop projects." },
          ],
        },
        {
          question: "How does Electron know which file to run first?",
          answers: [
            { text: "It always runs index.html first", correct: false, explanation: "index.html is loaded later by main.js." },
            { text: "It reads the main field in package.json", correct: true, explanation: "The main field names the first file, like main.js." },
            { text: "It runs every .js file in the folder", correct: false, explanation: "Electron starts from one entry file." },
            { text: "It asks the user to choose a file", correct: false, explanation: "The entry file is set in package.json." },
          ],
        },
        {
          question: "Which process can read files and check if the laptop is on battery?",
          answers: [
            { text: "The renderer process", correct: false, explanation: "The renderer can use only a few Electron modules." },
            { text: "The preload script", correct: false, explanation: "The preload script can reach a few things, but not these." },
            { text: "The main process", correct: true, explanation: "The main process can use almost every Electron module." },
            { text: "index.html", correct: false, explanation: "index.html is just the page." },
          ],
        },
        {
          question: "What does new BrowserWindow do?",
          answers: [
            { text: "Opens a new tab in Chrome", correct: false, explanation: "Electron windows are part of your app, not Chrome tabs." },
            { text: "Loads the preload script into the main process", correct: false, explanation: "The preload script runs in the renderer process." },
            { text: "Starts a new main process", correct: false, explanation: "An app always has one main process." },
            { text: "Creates a window on the screen with the options you give it", correct: true, explanation: "Options like width, height, and webPreferences shape the window." },
          ],
        },
        {
          question: "Which BrowserWindow setting should you never turn off?",
          answers: [
            { text: "webSecurity", correct: true, explanation: "Turning off web security removes protections the page needs." },
            { text: "width", correct: false, explanation: "width only sets the window size." },
            { text: "preload", correct: false, explanation: "preload is a path, not a safety switch." },
            { text: "maxHeight", correct: false, explanation: "maxHeight only limits resizing." },
          ],
        },
        {
          question: "A Windows user closes the last window. What does this app do?",
          answers: [
            { text: "Keeps running in the background", correct: false, explanation: "That is the macOS habit, not the Windows habit." },
            { text: "Opens a new window right away", correct: false, explanation: "New windows open on macOS when the Dock icon is clicked." },
            { text: "Quits", correct: true, explanation: "window-all-closed calls app.quit on every system except macOS." },
            { text: "Shows an error", correct: false, explanation: "Closing the last window is normal and quits the app." },
          ],
        },
        {
          question: "What does process.platform return on macOS?",
          answers: [
            { text: "macos", correct: false, explanation: "Node uses the name of the core system instead." },
            { text: "darwin", correct: true, explanation: "macOS is built on a core system called Darwin." },
            { text: "apple", correct: false, explanation: "Node does not use the company name." },
            { text: "win32", correct: false, explanation: "win32 is what Windows returns." },
          ],
        },
        {
          question: "When does preload.js run?",
          answers: [
            { text: "After renderer.js finishes", correct: false, explanation: "preload.js runs before the page and its scripts." },
            { text: "Only when the user clicks a button", correct: false, explanation: "It runs automatically when the window starts." },
            { text: "Inside the main process, before the app is ready", correct: false, explanation: "It runs in the renderer process." },
            { text: "In the renderer process, before index.html loads", correct: true, explanation: "Chromium has started, but no page has been read yet." },
          ],
        },
        {
          question: "Why does preload.js write the version numbers instead of renderer.js?",
          answers: [
            { text: "Only preload.js can read the process object", correct: true, explanation: "process.versions holds the numbers, and the page cannot read process." },
            { text: "renderer.js runs too early", correct: false, explanation: "renderer.js runs after the page loads." },
            { text: "renderer.js cannot change the DOM", correct: false, explanation: "renderer.js can change the DOM. It cannot read process." },
            { text: "index.html blocks renderer.js", correct: false, explanation: "index.html loads renderer.js with a script tag." },
          ],
        },
        {
          question: "What does the Content Security Policy in index.html do?",
          answers: [
            { text: "Makes the page load faster", correct: false, explanation: "A CSP is about safety, not speed." },
            { text: "Hides the page from DevTools", correct: false, explanation: "DevTools can still inspect the page." },
            { text: "Tells the page which scripts it may run", correct: true, explanation: "script-src 'self' allows only scripts from the app itself." },
            { text: "Sets the window size", correct: false, explanation: "Window size is set in main.js with BrowserWindow." },
          ],
        },
      ],
    }],
  },
];
