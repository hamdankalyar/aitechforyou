import type { ArticleSection } from "@/lib/articles";

export const reactNativeLintingFormattingSections: ArticleSection[] = [
  {
    id: "set-up-linting",
    heading: "Set up linting",
    paragraphs: [
      "**Linting** is important and quick to set up.",
      "**Expo SDK 51** includes a built-in lint command.",
      "**npx expo lint** checks the project for an ESLint config.",
      "**The first run** says that the project has no ESLint config.",
      "**Choosing yes** installs ESLint and some packages.",
      "**Choosing yes** also creates an ESLint config.",
    ],
    blocks: [
      { type: "command", command: "npx expo lint", explanation: "Run the built-in Expo lint command from the project root." },
    ],
  },
  {
    id: "install-prettier",
    heading: "Install Prettier",
    paragraphs: [
      "**Prettier** lets you focus on writing code.",
      "**Formatting details** include deciding where brackets should go.",
      "**Yarn** uses a separate installation command.",
      "**Other package managers** use the Expo installation command.",
    ],
    blocks: [
      { type: "command", command: "yarn add -D prettier eslint-config-prettier eslint-plugin-prettier", explanation: "Install Prettier and the Prettier ESLint packages with Yarn." },
      { type: "command", command: "npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier", explanation: "Install the same packages with another package manager." },
    ],
  },
  {
    id: "integrate-prettier",
    heading: "Integrate Prettier with ESLint",
    paragraphs: [
      "**.eslintrc.js** needs this configuration to add Prettier.",
      "**The update** extends the Prettier config.",
      "**The Prettier plugin** reports Prettier errors as ESLint errors.",
      "**Double quotes** are the Prettier default.",
      "**A .prettierrc.js file** can change the preference to single quotes.",
      "**This course** keeps the default double quotes.",
    ],
    blocks: [
      {
        type: "command",
        label: "Configuration",
        explanation: "Update .eslintrc.js with the Prettier configuration.",
        command: `module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};`,
      },
    ],
  },
  {
    id: "fix-formatting-errors",
    heading: "Fix formatting errors",
    paragraphs: [
      "**Prettier errors** can all be fixed automatically.",
      "**yarn lint** reports the linting and formatting errors.",
      "**npm run lint** is the npm alternative.",
      "**--fix** makes the lint command fix the errors.",
      "**VS Code** can also fix the errors when a file is saved.",
      "**The ESLint plugin** is needed for fixes on save in VS Code.",
    ],
    blocks: [
      { type: "command", command: "yarn lint", explanation: "Run the lint command with Yarn." },
      { type: "command", command: "npm run lint", explanation: "Run the lint command with npm." },
      { type: "command", command: "yarn lint --fix", explanation: "Fix the Prettier errors automatically." },
    ],
  },
];
