// Storyboard for the smallest app lecture: what each process and the window hold at each moment of startup.
// Example version numbers are the ones Electron 26 shipped with, the version used in the workshop.
const heading = "Hello World!";
const emptyVersions = "We are using Node.js , Chromium , and Electron .";
const filledVersions = "We are using Node.js 18.16.1, Chromium 116.0.5845.62, and Electron 26.0.0.";

export const startupSteps = [
  { label: "npm start", file: "package.json", main: ["Reading package.json", "main field: main.js"], renderer: [], page: [], explanation: "npm start runs electron in the project folder. Electron reads package.json and finds main.js in the main field." },
  { label: "main.js", file: "main.js", main: ["Running main.js", "Waiting for app.whenReady()"], renderer: [], page: [], explanation: "main.js runs in the main process. It waits until Electron is ready before it opens a window." },
  { label: "Window", file: "main.js", main: ["createWindow()", "new BrowserWindow({...})"], renderer: ["Renderer process started", "No page loaded yet"], page: [], explanation: "Electron is ready, so createWindow runs. new BrowserWindow starts a renderer process for the window. The window is still empty." },
  { label: "preload.js", file: "preload.js", main: ["Window open"], renderer: ["Running preload.js", "Can read process.versions", "Listening for DOMContentLoaded"], page: [], explanation: "preload.js runs first inside the renderer, before any page. It can read process.versions. It sets up a listener that waits for the page." },
  { label: "index.html", file: "index.html", main: ["Window open"], renderer: ["Reading index.html", "CSP: only the app's own scripts"], page: [heading, emptyVersions], explanation: "loadFile loads index.html. The page appears, and its Content Security Policy starts working. The version spans are still empty." },
  { label: "renderer.js", file: "renderer.js", main: ["Window open"], renderer: ["Running renderer.js", "Normal front-end code"], page: [heading, emptyVersions], explanation: "The script tag at the end of the page runs renderer.js. It is normal front-end code. In this app it is almost empty." },
  { label: "Loaded", file: "preload.js", main: ["Window open"], renderer: ["DOMContentLoaded fired", "preload.js fills in the versions"], page: [heading, filledVersions], explanation: "The page has finished loading, so DOMContentLoaded fires. The listener from preload.js writes the three version numbers into the page." },
];
