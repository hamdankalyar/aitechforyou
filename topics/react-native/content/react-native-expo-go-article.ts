import type { ArticleSection } from "@/lib/articles";

export const reactNativeExpoGoSections: ArticleSection[] = [
  {
    id: "inspect-the-project",
    heading: "Inspect the Taskly project",
    paragraphs: [
      "**The Taskly project** starts as a bare-bones project.",
      "**package.json** contains the project scripts.",
      "**The lock file** is included in the project.",
      "**App.tsx** is the main entry point.",
      "**app.json** is the app configuration file.",
      "**The scripts section** shows the commands that can start the app.",
      "**The start script** runs expo start.",
    ],
  },
  {
    id: "start-javascript-side",
    heading: "Start the JavaScript side",
    paragraphs: [
      "**A React Native app** has a JavaScript side and a native app side.",
      "**The packager** builds the JavaScript side of the app.",
      {
        text: "**npx expo start** starts the packager.",
        code: "npx expo start",
      },
      {
        text: "**yarn start** runs the same start script with Yarn.",
        code: "yarn start",
      },
      {
        text: "**npm run start** runs the same start script with npm.",
        code: "npm run start",
      },
      "**Another package manager** can use its own start command.",
      "**The running packager** displays a QR code to scan.",
      "**Expo Go** provides the native app side for this course.",
    ],
    blocks: [
      {
        type: "table",
        caption: "The two parts of the app used in the course",
        columns: ["Part", "How the course runs it"],
        rows: [
          ["JavaScript side", "The packager"],
          ["Native app side", "Expo Go"],
        ],
      },
    ],
  },
  {
    id: "run-on-ios",
    heading: "Run the app on iOS",
    paragraphs: [
      "**Expo Go** is available from the App Store.",
      "**An iPhone** does not show a button in Expo Go for scanning the QR code.",
      "**The Camera app** scans the QR code on iPhone.",
      "**A first-time installation** may not connect on the first attempt.",
      "**Reopening Expo Go** can show the local network prompt after a failed first scan.",
      "**The local network prompt** asks whether Expo Go can find and connect to devices on the local network.",
      "**Allow** gives Expo Go the local network access it needs.",
      "**A second scan** opens the app after local network access is allowed.",
      "**App.tsx** runs inside Expo Go.",
    ],
  },
  {
    id: "run-on-android",
    heading: "Run the app on Android",
    paragraphs: [
      "**Expo Go** is available from the Play Store.",
      "**Android** shows a button in Expo Go for scanning the QR code.",
      "**Camera access** lets Expo Go scan the QR code.",
      "**The QR code** opens the app in Expo Go.",
      "**Apple** does not allow the scan button used by the Android app.",
      "**The App Store** would not allow Expo Go with that button.",
      "**That restriction** is why the iOS and Android apps are different.",
    ],
  },
  {
    id: "use-the-debug-menu",
    heading: "Use the debug menu",
    paragraphs: [
      "**Shaking the phone** opens the debug menu.",
      "**Reload** reloads the app.",
      "**The performance monitor** can be shown from the debug menu.",
      "**The JavaScript debugger** can be opened from the debug menu.",
      "**Fast Refresh** keeps the app updating as the code changes.",
      "**Disable Fast Refresh** is usually selected accidentally.",
      "**An app that stops updating** may have Fast Refresh disabled.",
      "**Reload** is the option used most often.",
      "**Holding three fingers on an iPhone screen** also opens the debug menu.",
    ],
  },
  {
    id: "use-the-workshop-screen",
    heading: "Follow the workshop screen",
    paragraphs: [
      "**The workshop** uses an iOS simulator.",
      "**The iOS simulator** is easier to see on the workshop screen.",
      "**The iOS simulator** is available when Xcode is installed.",
      "**Xcode** is not required for this workshop.",
    ],
  },
  {
    id: "use-typescript",
    heading: "Use the TypeScript version",
    paragraphs: [
      "**This course** uses the TypeScript template.",
      "**TypeScript** is strongly recommended for the workshop.",
      "**Companies** are moving from JavaScript to TypeScript.",
      "**Projects and communities** are moving from JavaScript to TypeScript.",
      "**A superset** includes the original language and adds more features.",
      "**TypeScript** is a superset of JavaScript.",
      "**All JavaScript code** is valid TypeScript code.",
      "**TypeScript** adds type information to JavaScript.",
      "**The workshop** gives a light introduction to TypeScript.",
      "**A JavaScript-only version** is available as an alternative.",
      "**The JavaScript-only version** uses the same commit names.",
      "**The JavaScript-only version** is not linked throughout the course.",
      "**The difference** between the JavaScript and TypeScript versions is very minimal.",
    ],
  },
  {
    id: "fix-expo-go-connections",
    heading: "Fix Expo Go connection problems",
    paragraphs: [
      "**The first check** is that the phone and computer use the same Wi-Fi network.",
      "**The bundler** runs on localhost on the computer.",
      "**The same network** lets the phone access that bundler.",
      {
        text: "**--tunnel** is the workaround when a local connection is not possible.",
        code: "npx expo start --tunnel",
      },
      "**The first tunnel run** prompts you to install Ngrok.",
      "**Ngrok** exposes the bundler externally to the Internet.",
      "**The tunnel QR code** can be scanned from any device on any computer anywhere in the world.",
      "**The bundle** still runs from the local computer.",
      "**Tunnel mode** can share the work with a colleague or friend.",
      "**Tunnel mode** can also work around local network restrictions.",
      "**Windows firewalls** commonly cause this connection problem.",
      "**Tunnel mode** is a little slower than the normal connection.",
      "**The normal connection** is recommended when it works.",
    ],
  },
  {
    id: "review-questions",
    heading: "Review questions",
    paragraphs: [
      "**Answer each question before opening it.**",
    ],
    blocks: [
      {
        type: "details",
        title: "What are the two main parts of a React Native app?",
        paragraphs: [
          "**A React Native app** has a JavaScript side and a native app side.",
          "**The packager** builds the JavaScript side.",
          "**Expo Go** provides the native app side for this course.",
        ],
      },
      {
        type: "details",
        title: "What is the workaround if you cannot connect to Expo Go on the same Wi-Fi network?",
        paragraphs: [
          "**The --tunnel option** runs the start command through a tunnel.",
          "**Ngrok** exposes the bundler externally to the Internet.",
        ],
      },
      {
        type: "details",
        title: "How do you access the debug menu in Expo Go on a physical device?",
        paragraphs: [
          "**Shaking the phone** opens the debug menu.",
          "**Three fingers** held on an iPhone screen also open the debug menu.",
          "**Reload** is available from the debug menu.",
          "**The performance monitor** is available from the debug menu.",
          "**The JavaScript debugger** is available from the debug menu.",
          "**Fast Refresh** can be disabled from the debug menu.",
        ],
      },
    ],
  },
];
