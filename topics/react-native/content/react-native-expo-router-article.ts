import type { ArticleSection } from "@/lib/articles";

export const reactNativeExpoRouterSections: ArticleSection[] = [
  {
    id: "choose-expo-router",
    heading: "Use Expo Router for navigation",
    paragraphs: [
      {
        text: "**Mobile navigation** looks different from navigation on the web.",
        bullets: [
          "**Bottom tabs, modals, and stack navigators** are kinds of navigation used in mobile apps.",
        ],
      },
      {
        text: "**React Native** does not come with a navigation library built in.",
        bullets: [
          "**A navigation library** needs to be installed.",
        ],
      },
      {
        text: "**File system-based routing** uses file and folder names to determine screen names or page URLs.",
        bullets: [
          "**Next.js** is a web framework that also uses file system-based routing.",
        ],
      },
      {
        text: "**Expo Router** is the navigation library used here.",
        bullets: [
          "**Expo Router** provides file system-based navigation for React Native.",
        ],
      },
      {
        text: "**React Navigation** is the library Expo Router is built on top of.",
        bullets: [
          "**React Navigation** does not use file system-based routing.",
          "**Screen properties and options** are settings you use to configure a screen.",
          "**Expo Router** accepts the same screen settings as React Navigation.",
          "**The title option** is one example that sets the text in a screen's header.",
        ],
      },
    ],
  },
  {
    id: "map-files-to-screens",
    heading: "Map files and folders to screens",
    paragraphs: [
      "**The app folder** is the root of the file system-based routing.",
      {
        text: "**File and folder names** determine the routes in these examples.",
        code: `app/
├── index.tsx           → /
├── home.tsx            → /home
└── products/
    ├── index.tsx       → /products
    └── [id].tsx        → /products/123`,
      },
      "**index.tsx** is the index route.",
      "**A folder with an index file** uses the folder name in the route.",
      "**The index name** does not count as part of that route.",
      "**A dynamic route** accepts a value that the screen retrieves as a screen option.",
      "**/products/123** is an example with a product ID of 123.",
    ],
  },
  {
    id: "understand-layout-files",
    heading: "Use layout files for mobile navigation",
    paragraphs: [
      "**A layout file** tells Expo Router how the screens in its folder should be laid out.",
      "**_layout.tsx** is the layout file name.",
      "**Each folder** can have one layout file.",
      "**The layout** can arrange screens as a stack, tabs, or a modal.",
      "**Additional headers** can also be configured in the layout.",
    ],
  },
  {
    id: "install-navigation-libraries",
    heading: "Install the navigation libraries",
    paragraphs: [
      
      "**A safe area** is the area of the screen that is safe to use.",
      "**Headers on iOS and some Android devices** can overlay your content.",
      "**Deep linking** creates a URL that opens your app to a specific screen.",
      {
        text: "**The navigation setup** uses these libraries.",
        bullets: [
          "**expo-router** provides the navigation library.",
          "**react-native-safe-area-context** tells you which area of the screen is safe to use.",
          "**expo-linking** is needed because Expo Router comes with deep linking built in.",
          "**expo-status-bar** controls whether the status bar content is light or dark.",
        ],
      },
      "**Expo Router** uses react-native-safe-area-context under the hood.",
      "**Expo Router screens** are wrapped in a safe area by default.",
    ],
  },
  {
    id: "understand-app-entry",
    heading: "Understand the app entry point",
    paragraphs: [],
    blocks: [
      {
        type: "details",
        title: "How the app starts",
        paragraphs: [
          "**The entry point** is the file that runs first when your app starts.",
          "**The main field** in package.json tells the app which file to start with.",
        ],
        sections: [
          {
            heading: "Before adding Expo Router",
            paragraphs: [
              {
                text: "**The main field** points to Expo's starting file.",
                block: {
                  type: "command",
                  label: "package.json field",
                  command: `"main": "expo/AppEntry.js"`,
                },
              },
              "**AppEntry.js** is provided by Expo inside node_modules/expo/.",
              "**App.tsx** is your project's component that builds the main screen.",
              "**The root component** means the main component React Native starts with.",
              "**App.tsx** provides that root component in this setup.",
            ],
          },
          {
            heading: "What does registerRootComponent do?",
            paragraphs: [
              "**registerRootComponent** is a function provided by Expo.",
              "**Its job** is to tell React Native which component to use as the root.",
              {
                text: "**AppEntry.js** already handles this setup.",
                bullets: [
                  "**It imports** registerRootComponent from Expo.",
                  "**It imports** your App component from App.tsx.",
                  "**It calls** registerRootComponent(App) to register your component.",
                ],
                code: `package.json
    │ main points to
    ▼
expo/AppEntry.js
    │ calls
    ▼
registerRootComponent(App)
    │ registers
    ▼
Your App.tsx component`,
              },
            ],
          },
          {
            heading: "After adding Expo Router",
            paragraphs: [
              "**Expo Router** uses screen files inside the app folder.",
              {
                text: "**The main field** changes to Expo Router's starting file.",
                block: {
                  type: "command",
                  label: "package.json field",
                  command: `"main": "expo-router/entry"`,
                },
              },
              "**expo-router/entry** starts the app using Expo Router.",
              {
                text: "**Your existing App.tsx** moves to app/index.tsx.",
                code: `Before:
expo/AppEntry.js → App.tsx

With Expo Router:
expo-router/entry → app folder`,
              },
            ],
          },
          {
            heading: "When to use a custom index.js",
            paragraphs: [
              {
                text: "**Some libraries** need setup early when the app starts.",
                bullets: [
                  "**Sentry**, for example, records app errors and crashes.",
                  "**Early setup** gets its error monitoring ready as the app starts.",
                ],
              },
              "**A custom index.js** gives you a place to run that setup before registering the main component.",
              "**The main field** in package.json points to this custom file.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "move-app-to-index",
    heading: "Move App.tsx into the app folder",
    paragraphs: [
      "**The app folder** needs to be created in the project.",
      "**App.tsx** moves into the app folder.",
      "**App.tsx** is renamed to index.tsx.",
      "**Expo Router** needs at least one index file.",
      "**The main entry point** has to be called index.tsx.",
      "**Other screens** can use different file names.",
    ],
  },
  {
    id: "add-linking-scheme",
    heading: "Add a scheme for deep linking",
    paragraphs: [
      "**A scheme** is the name a mobile app registers to listen to for deep links.",
      "**The scheme** needs to be added to app.json.",
      "**Expo Router** requires it because deep linking is built in.",
      "**A missing scheme** produces a warning in this setup.",
      "**An intent** tells the phone that a URL is targeting a particular scheme.",
      "**Apps on the phone** check whether they are registered for that scheme.",
      "**An app registered for the scheme** can receive the URL.",
    ],
  },
  {
    id: "add-stack-layout",
    heading: "Add the stack layout",
    paragraphs: [
      {
        text: "**Navigation** uses a stack navigator by default.",
        bullets: [
          "**Moving the screen** into `app` keeps the app looking the same.",
          "**Screens inside `app`** are created even without a layout file.",
        ],
      },
      {
        text: "**`app/_layout.tsx`** defines an explicit layout for the screens.",
        bullets: [
          "**`Stack`** is imported from `expo-router` to display screens as a stack.",
          "**`Stack.Screen`** adds options for a particular screen.",
        ],
      },
      {
        text: "**The screen name** matches its file name.",
        bullets: [
          "**`index.tsx`** has the screen name `index`.",
          "**The header** initially displays `index`.",
          "**A custom title** replaces the file name in the header.",
        ],
      },
      {
        text: "**Screens and layouts** must use a default export.",
        bullets: [
          "**The layout function** can have any name because it uses a default export.",
          "**Reusable components** usually use named exports in these examples.",
        ],
      },
      {
        text: "**The options prop** sets the title to Shopping list.",
        block: {
          type: "command",
          label: "app/_layout.tsx",
          command: `import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Shopping list" }} />
    </Stack>
  );
}`,
        },
      },
    ],
  },
  {
    id: "other-linking-options",
    heading: "App links and universal links",
    paragraphs: [
      "**Deep linking** uses a link to open a specific screen in your app.",
      {
        text: "**Scheme-based links** use your app’s custom prefix, such as dailylist://counter.",
        bullets: [
          "**dailylist** is the app’s scheme.",
          "**counter** is the screen to open.",
        ],
      },
      {
        text: "**App links and universal links** use a normal website link to open your app.",
        bullets: [
          "**Example:** https://example.com/counter can open the counter screen.",
          "**Android** calls these app links.",
          "**iOS** calls these universal links.",
        ],
      },
      {
        text: "**Verification** helps your phone check which app a website link should open.",
        bullets: [
          "**The website** has a special file that says, “This is the app connected to this website.”",
          "**The app** has a setting that says, “This is the website connected to this app.”",
          "**The phone** checks that both sides agree before opening the app through that link.",
        ],
      },
      {
        text: "**The developer** sets up this connection between the website and the app.",
        bullets: [
          "**The user** does not need to register the website in their phone settings.",
        ],
      },
    ],
  },
];
