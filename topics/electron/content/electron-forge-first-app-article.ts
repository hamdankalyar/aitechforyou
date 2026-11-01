import type { ArticleSection } from "@/lib/articles";

export const forgeMainCode = `import { app, BrowserWindow } from 'electron';
import path from 'node:path';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, \`../renderer/\${MAIN_WINDOW_VITE_NAME}/index.html\`));
  }

  mainWindow.webContents.openDevTools({ mode: 'detach' });
};

app.on('ready', createWindow);`;

export const readyToShowCode = `const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  show: false,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  },
});

mainWindow.once('ready-to-show', () => {
  mainWindow.show();
  mainWindow.focus();
});`;

export const electronForgeFirstAppSections: ArticleSection[] = [
  {
    id: "why-electron-forge",
    heading: "Why start with Electron Forge",
    paragraphs: [
      "**Eating your vegetables** would mean wiring every piece of the app by hand first.",
      "**This course** uses Electron Forge instead, to save time and attention.",
      {
        text: "**Electron Forge** gives you a solid foundation.",
        bullets: [
          "**The processes** are already wired up and ready to go.",
          "**The build tools** are already set up.",
        ],
      },
      "**A ready-made app** is also a good way to study the setup before you engineer it yourself.",
    ],
  },
  {
    id: "the-firesale-repo",
    heading: "Pull down the Firesale repo first",
    paragraphs: [
      "**The course** has three repositories, one for each app.",
      "**Firesale** is the first one, and it is the Markdown editor from the introduction.",
      "**Electron Fiddle** is useful if you want it, but you do not need to download anything else.",
      {
        text: "**Pull down** the Firesale repo and install its packages before you continue.",
        block: { type: "command", command: "npm install", label: "Terminal", explanation: "Run this inside the Firesale folder once you have pulled it down." },
      },
    ],
  },
  {
    id: "forge-main-file",
    heading: "The Forge main file looks familiar",
    paragraphs: [
      "**The vanilla app** from the last lecture had a main.js file.",
      "**The Forge app** has a main file that does almost the same things.",
      {
        text: "**There are** a few extra tasting notes.",
        bullets: [
          "**The file** is TypeScript, so it ends in .ts.",
          "**Most TypeScript** like this could be pasted straight into a JavaScript file without any issue.",
          "**The window** loads from a dev server in development.",
          "**DevTools** open in detached mode.",
        ],
      },
      {
        text: "**createWindow** makes the window, and the ready event calls it once Electron has fully started.",
        block: { type: "command", label: "src/main.ts", command: forgeMainCode, highlightLines: [13, 14, 15, 16, 17, 19] },
      },
      "**This file** is the first version of the main process.",
      "**You will add** a lot more to it during the course.",
    ],
  },
  {
    id: "dev-server",
    heading: "A dev server runs while you develop",
    paragraphs: [
      "**Electron Forge** runs either a Webpack server or a Vite server.",
      "**Hot module reloading** is what that server is for.",
      "**Hot module reloading** swaps changed code into the page without a full restart.",
      "**In development**, the window loads a localhost address from that server.",
      "**In a packaged app**, there is no server, so the window loads the compiled files instead.",
      "**The if check** in createWindow picks between those two cases.",
    ],
    blocks: [{
      type: "table",
      caption: "Where the window loads from",
      columns: ["Situation", "What the window loads", "Address"],
      rows: [
        ["Development with Webpack", "The Webpack dev server", "localhost:9000"],
        ["Development with Vite", "The Vite dev server", "localhost:5173"],
        ["Packaged app", "The compiled index.html on disk", "No server"],
      ],
    }],
  },
  {
    id: "devtools-mode",
    heading: "DevTools can open in any position",
    paragraphs: [
      "**openDevTools** can take a mode option.",
      {
        text: "**The mode** decides where DevTools appear.",
        bullets: [
          "**detach** opens them in their own window.",
          "**bottom** docks them under the page.",
          "**right** docks them beside the page.",
        ],
      },
      {
        text: "**These app windows** are small, so the course detaches DevTools.",
        block: { type: "command", label: "src/main.ts", command: "mainWindow.webContents.openDevTools({ mode: 'detach' });", explanation: "Change detach to bottom or right if you prefer DevTools inside the window." },
      },
      "**You can delete** this line if you do not want DevTools opening on start.",
      "**DevTools** stay available in the View menu by default, so you can always open them by hand.",
      "**The course** turns this line on and off depending on the point being made.",
    ],
  },
  {
    id: "flash-of-white",
    heading: "Hide the window until it is ready",
    paragraphs: [
      "**Opening a window** takes a moment.",
      "**Loading the HTML, CSS, and JavaScript** takes another moment.",
      "**A flash of white** is what the user can see in between.",
      "**show: false** stops the window from appearing when it is created.",
      "**ready-to-show** is an event the window fires once the DOM and everything else has loaded.",
      "**show** then puts the window on the screen.",
      "**focus** is optional, and brings the window to the front.",
      {
        text: "**This pattern** loads everything while the window is hidden, then shows it when it is ready.",
        block: { type: "command", label: "src/main.ts", command: readyToShowCode, highlightLines: [4, 10, 11, 12, 13] },
      },
      "**It depends** on your app, but this is a solid practice most of the time.",
      "**The user** still sees the window, but only after the page is ready.",
    ],
  },
  {
    id: "once-and-event-emitter",
    heading: "once comes from Node's EventEmitter",
    paragraphs: [
      "**EventEmitter** is the Node.js class for objects that fire events.",
      "**Many Electron objects** extend EventEmitter, including windows.",
      "**on** runs a handler every time an event fires.",
      "**once** runs a handler one time, then removes it.",
      "**ready-to-show** only needs to be handled one time, so once fits.",
      "**The same pattern** appears again and again in Electron code.",
    ],
    blocks: [{ type: "callout", title: "Remember this one", text: "Create the window with show: false. Wait once for ready-to-show. Then call show, and focus if you want." }],
  },
  {
    id: "hidden-renderers",
    heading: "Hidden windows can do background work",
    paragraphs: [
      "**A renderer process** does not have to show its window.",
      "**That opens up** some interesting possibilities.",
      {
        text: "**A renderer process** is Chromium, so it has powers that plain Node does not.",
        bullets: [
          "**GPU acceleration** is available.",
          "**Canvas** is available for drawing and resizing images.",
          "**Every Web API** is available.",
        ],
      },
      {
        text: "**A hidden window** could do heavy work for the app.",
        bullets: [
          "**It could** process images.",
          "**It could** resize pictures on a canvas.",
          "**It could** send messages back and forth with the visible window.",
        ],
      },
      "**Node's child processes** are the usual way to offload work, and hidden windows let you skip that dance.",
      "**Most apps** never need this, but the power is there.",
    ],
  },
  {
    id: "web-apis",
    heading: "Every Web API is still there",
    paragraphs: [
      "**A renderer process** is a normal browser context.",
      {
        text: "**All the Web APIs** you know from the browser are available in it.",
        bullets: [
          "**Service workers** are available.",
          "**Shared workers** are available.",
          "**Web workers** are available.",
        ],
      },
      "**Most of these** are niche, and you only reach for them with a very specific need.",
      "**An Electron app** already has a main process and renderer processes.",
      "**Everything** between them is asynchronous.",
      "**That already** takes advantage of what makes JavaScript fast and snappy.",
      "**For a special case**, there is a lot of power and flexibility available.",
    ],
  },
  {
    id: "reloading-the-main-process",
    heading: "Vite reloads the page, not the main process",
    paragraphs: [
      "**Vite** handles hot reloading for the renderer code.",
      "**The main process** does not reload when you change it.",
      "**Nodemon** or a similar tool could restart the app on every change.",
      "**The course** skips that to keep the setup simple.",
      "**Restart the app** by hand after you change the main file.",
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
      title: "Your first Electron Forge app",
      cards: [
        {
          question: "What is the purpose of setting show: false in an Electron BrowserWindow's options?",
          answer: "Setting show: false prevents the window from being displayed by default when it is created. This allows you to load the HTML, CSS, and other content while the window is hidden, then show it only when everything is ready. This pattern helps avoid flashing white content or incomplete UI during the initial load.",
        },
        {
          question: "How can you show an Electron window after it has been created with show: false?",
          answer: "You can listen for the ready-to-show event on the window and call the show() method. You can also optionally call focus() to bring the window into focus.",
          code: "mainWindow.once('ready-to-show', () => {\n  mainWindow.show();\n});",
          codeLabel: "main.js",
        },
        {
          question: "What Web APIs are available in Electron renderer processes?",
          answer: "All standard Web APIs are available in Electron renderer processes, including service workers, shared workers, and web workers. Since renderer processes run Chromium with GPU acceleration support, they have access to the full suite of browser APIs, including Canvas and other graphics APIs.",
        },
        {
          question: "What is a potential use case for creating an Electron renderer process without showing its window?",
          answer: "Hidden renderer processes can be used for background tasks that benefit from GPU acceleration and Web APIs, such as image processing, canvas-based operations, or resizing images. These hidden processes can communicate with visible windows via message passing, providing a way to offload intensive work without using Node.js child processes.",
        },
        {
          question: "What Node.js class do Electron window objects extend from?",
          answer: "Electron window objects extend from the Node.js EventEmitter class. This is why they support methods like once() for listening to events and other event-driven patterns common in Node.js.",
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
      title: "Your first Electron Forge app",
      questions: [
        {
          question: "In Electron, what BrowserWindow option prevents the window from displaying immediately upon creation?",
          answers: [
            { text: "display: none", correct: false, explanation: "display: none is CSS for elements on a page, not a BrowserWindow option." },
            { text: "visible: false", correct: false, explanation: "BrowserWindow has no visible option." },
            { text: "show: false", correct: true, explanation: "show: false creates the window hidden, so you can show it later when it is ready." },
            { text: "hidden: true", correct: false, explanation: "BrowserWindow has no hidden option." },
          ],
        },
        {
          question: "Which event indicates that a BrowserWindow's DOM and assets have finished loading and the window is ready to be displayed?",
          answers: [
            { text: "content-complete", correct: false, explanation: "There is no content-complete event in Electron." },
            { text: "dom-ready", correct: false, explanation: "dom-ready fires on webContents when the DOM is parsed, but it does not mean the window is ready to show." },
            { text: "window-loaded", correct: false, explanation: "There is no window-loaded event in Electron." },
            { text: "ready-to-show", correct: true, explanation: "ready-to-show fires once the page has loaded and the window can be shown without a flash." },
          ],
        },
        {
          question: "What Web APIs remain available in Electron renderer processes for advanced use cases like background processing?",
          answers: [
            { text: "Only synchronous Web APIs like document manipulation", correct: false, explanation: "Renderer processes have the full set of browser APIs, not just synchronous ones." },
            { text: "Web APIs are disabled in renderer processes for security", correct: false, explanation: "A renderer process is a normal browser context, so Web APIs stay on." },
            { text: "Only the Node.js native modules and Electron IPC APIs", correct: false, explanation: "Those are not Web APIs, and the renderer gets very little Node access anyway." },
            { text: "Service workers, shared workers, and web workers", correct: true, explanation: "A renderer process is Chromium, so every worker type and the rest of the Web APIs are available." },
          ],
        },
        {
          question: "Why does the course start with Electron Forge instead of wiring everything by hand?",
          answers: [
            { text: "Forge already has the processes and build tools wired up, which saves time and attention", correct: true, explanation: "It gives a solid foundation, and you can study the setup before engineering it yourself." },
            { text: "Electron cannot run without Forge", correct: false, explanation: "The last lecture ran a vanilla Electron app with four files and no Forge." },
            { text: "Forge removes the need for a main process", correct: false, explanation: "The Forge app still has a main file that creates the window." },
            { text: "Forge is the only way to use TypeScript", correct: false, explanation: "TypeScript works in any Electron project with a build step." },
          ],
        },
        {
          question: "Which repo does the course use first, and what app is it?",
          answers: [
            { text: "Clipmaster, the clipboard manager", correct: false, explanation: "Clipmaster comes later in the course." },
            { text: "Firesale, the Markdown editor", correct: true, explanation: "Firesale is the first of the three repos, and it is the Markdown editor from the introduction." },
            { text: "Not Done (Yet), the to-do app", correct: false, explanation: "That app comes later in the course." },
            { text: "Electron Fiddle, the hello world app", correct: false, explanation: "Fiddle is a tool, not one of the three course repos." },
          ],
        },
        {
          question: "A teammate sees that the Forge main file ends in .ts and worries they cannot follow it. What is true?",
          answers: [
            { text: "They must learn TypeScript before touching it", correct: false, explanation: "The file uses so little TypeScript that plain JavaScript knowledge is enough." },
            { text: "The file only runs in the renderer process", correct: false, explanation: "It is the main process file, whatever its extension." },
            { text: "Most of it could be pasted into a .js file and still work", correct: true, explanation: "The main file is technically TypeScript, but it is almost plain JavaScript." },
            { text: "Electron reads .ts files only with Webpack", correct: false, explanation: "Forge compiles the file with Webpack or Vite before Electron runs it." },
          ],
        },
        {
          question: "In development, the window loads localhost:5173. Where does that page come from?",
          answers: [
            { text: "The compiled index.html on disk", correct: false, explanation: "Compiled files are loaded only when there is no dev server, like in a packaged app." },
            { text: "The Vite dev server that Forge started for hot module reloading", correct: true, explanation: "Vite serves the renderer at port 5173 in development, and Webpack uses port 9000." },
            { text: "The Electron website", correct: false, explanation: "localhost is your own computer, not a website." },
            { text: "The preload script", correct: false, explanation: "The preload script runs before the page. It does not serve the page." },
          ],
        },
        {
          question: "You package the app and ship it. What does the window load when a user opens it?",
          answers: [
            { text: "localhost:9000", correct: false, explanation: "There is no dev server on the user's computer." },
            { text: "Nothing, because the dev server is missing", correct: false, explanation: "The if check in createWindow handles this case." },
            { text: "The compiled index.html from the build output", correct: true, explanation: "With no dev server address, createWindow falls back to loadFile with the compiled page." },
            { text: "The TypeScript source files", correct: false, explanation: "The source is compiled before packaging." },
          ],
        },
        {
          question: "You delete the openDevTools line from main.ts. Can you still open DevTools while the app runs?",
          answers: [
            { text: "No, DevTools only open from code", correct: false, explanation: "DevTools are available in the default View menu too." },
            { text: "Yes, from the View menu, because DevTools are available there by default", correct: true, explanation: "The line only opens them automatically. The menu still has them." },
            { text: "Only after you rebuild the app", correct: false, explanation: "No rebuild is needed to open DevTools from the menu." },
            { text: "Only in a packaged app", correct: false, explanation: "DevTools are available in development and in packaged apps with the default menu." },
          ],
        },
        {
          question: "You change the ready-to-show handler from once to on. What is the difference?",
          answers: [
            { text: "on runs the handler every time the event fires, while once runs it one time and then removes it", correct: true, explanation: "Both come from Node's EventEmitter. ready-to-show only needs to be handled once, so once fits." },
            { text: "on runs the handler before the event, while once runs it after", correct: false, explanation: "Both run the handler when the event fires." },
            { text: "on only works on windows, while once only works on app", correct: false, explanation: "Any EventEmitter has both methods." },
            { text: "There is no difference", correct: false, explanation: "once removes the handler after the first call, and on keeps it." },
          ],
        },
        {
          question: "You edit main.ts while the app runs, but nothing changes in the window. Why?",
          answers: [
            { text: "TypeScript files cannot change while the app runs", correct: false, explanation: "The extension is not the problem." },
            { text: "The main process has crashed", correct: false, explanation: "Nothing crashed. The old main process is still running." },
            { text: "Vite only reloads the renderer code, so the main process keeps running the old file", correct: true, explanation: "Restart the app by hand, or add a tool like Nodemon to restart it for you." },
            { text: "Electron caches main.ts until you package the app", correct: false, explanation: "A restart picks up the change. No packaging is needed." },
          ],
        },
        {
          question: "Your app needs to resize many images with the GPU. Which option does the lecture suggest instead of a Node child process?",
          answers: [
            { text: "Run the resize in the main process", correct: false, explanation: "The main process has no canvas or GPU acceleration." },
            { text: "Ask the user to resize the images first", correct: false, explanation: "The app can do the work itself." },
            { text: "Create a hidden renderer process with a canvas and message the result back", correct: true, explanation: "A hidden window is Chromium, so it has GPU acceleration, canvas, and every Web API." },
            { text: "Turn off webSecurity", correct: false, explanation: "That removes protection and does not help with resizing." },
          ],
        },
      ],
    }],
  },
];
