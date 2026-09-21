import type { ArticleSection } from "@/lib/articles";

export const reactNativeProjectSetupSections: ArticleSection[] = [
  {
    id: "choose-node",
    heading: "Start a new project",
    paragraphs: [
      "**The terminal** is where the project command runs.",
      "**Node** needs to be installed.",
      "**node -v** shows which Node version is installed.",
      "**LTS** means long-term support.",
      "**Long-term support versions** use even numbers.",
    ],
    blocks: [{ type: "command", command: "node -v", explanation: "Check the installed Node version." }],
  },
  {
    id: "choose-a-package-manager",
    heading: "Which package manager should you use?",
    paragraphs: [
      "**A package manager** is the other thing you need.",
      "**This course** uses Yarn Classic 1.22.",
      "**npm** comes pre-installed with Node.",
      "**Yarn Modern, pnpm, and Bun** can also work.",
    ],
  },
  {
    id: "why-yarn-classic",
    heading: "Why this course uses Yarn Classic",
    paragraphs: [
      "**Yarn Classic** is getting a bit old.",
      "**Many React Native developers** still prefer it.",
      "**Yarn Modern and pnpm** can use Plug'n'Play mode for node linking.",
      "**Plug'n'Play** gets rid of the node_modules folder.",
      "**React Native projects** often link from native iOS and Android directories directly to files in node_modules.",
      "**Those links** break when the node_modules folder does not exist.",
      "**A hoisted node linker** is the workaround for Yarn Modern or pnpm.",
      "**These package managers** can still be used with that configuration.",
    ],
    blocks: [{ type: "package-manager-architecture" }],
  },
  {
    id: "understand-npx",
    heading: "Understand the project command",
    paragraphs: [
      "**npx create-expo-app** starts a new React Native project.",
      "**npx** comes with Node and does not need to be installed.",
      "**npx** is a Node package executor.",
      "**A package executor** runs packages without installing them globally.",
      "**--help** prints information about what the script can do.",
      "**--template** and its short form -t let you choose a template.",
    ],
    blocks: [{ type: "command", command: "npx create-expo-app --help", explanation: "See what the script can do." }],
  },
  {
    id: "choose-the-template",
    heading: "Why the course starts from a blank template",
    paragraphs: [
      "**The default template** was not blank as of SDK 51.",
      "**Navigation** comes pre-installed in the default template.",
      "**Styling** also comes with the default template.",
      "**The default setup** helps people start without being overwhelmed with choices.",
      "**This workshop** starts from scratch.",
      "**Everything** is built as the workshop goes on.",
    ],
  },
  {
    id: "create-the-project",
    heading: "Create the Taskly project",
    paragraphs: [
      "**npx create-expo-app** uses npm by default.",
      "**A package-lock file** is created when npm is used.",
      "**This course** uses the Yarn command instead.",
      "**taskly** is the project name.",
      "**-t** opens the prompt for choosing a template.",
      "**blank TypeScript** is the template selected in the workshop.",
    ],
    blocks: [
      { type: "command", command: "yarn create expo-app taskly -t", explanation: "Create Taskly with Yarn, then choose the blank TypeScript template." },
    ],
  },
];
