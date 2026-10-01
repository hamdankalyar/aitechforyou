import type { ArticleSection } from "@/lib/articles";

export const reactNativeModalTabsNavigationSections: ArticleSection[] = [
  {
    id: "navigation-types",
    heading: "Stacks, modals, and bottom tabs",
    paragraphs: [
      "**A stack** places each new screen on top of the previous screen.",
      "**Going back** returns to the previous screen in the stack.",
      "**A modal** displays a screen over other content.",
      "**Bottom tabs** let you move between screens using tabs at the bottom.",
    ],
  },
  {
    id: "place-modal-screens",
    heading: "Where a modal belongs",
    paragraphs: [
      "**Modal placement** must be at the same navigation level or higher than the screens it covers.",
      {
        text: "**Inside a tab’s stack**, a modal cannot cover the whole app.",
        code: `Top level
└── Bottom tabs navigator
    └── Stack
        ├── Screens
        └── Modal screen`,
      },
      {
        text: "**A modal beside the bottom tabs navigator** can appear over the whole app.",
        code: `Top level
├── Bottom tabs navigator
│   └── Stack
│       └── Screens
└── Modal screen`,
      },
      "**The example app** has all screens at one navigation level.",
      "**Any of these screens** can appear as a modal.",
      "**Another modal** can open on top of the first modal.",
      {
        text: "**Custom alerts** can use a transparent modal.",
        bullets: [
          "**The modal’s content** becomes the alert.",
        ],
      },
    ],
  },
  {
    id: "configure-modal-presentation",
    heading: "Screen discovery and appearance",
    paragraphs: [
      "**File system-based routing** means Expo Router finds screens from their files.",
      "**Navigation** works without listing those screens in the navigator.",
      "**Explicit screen definitions** are only needed here to customize screen options.",
      "**Screen options** control details such as headings and modal presentation.",
    ],
  },
  {
    id: "adjust-modal-animation",
    heading: "Modal appearance on Android",
    paragraphs: [
      "**An Android modal** can look similar to a regular screen.",
      "**This appearance** is expected Android navigation rather than a bug.",
      "**Animations** control how a screen appears.",
      "**Fade** makes the modal fade in.",
      "**Slide from bottom** makes the modal enter from the bottom on Android too.",
      "**The example** tries fade before using slide from bottom.",
      "**Custom animations** are also supported.",
    ],
  },
  {
    id: "switch-to-bottom-tabs",
    heading: "Bottom tabs and existing navigation",
    paragraphs: [
      "**A bottom tabs navigator** can contain many screens.",
      "**Expo Router** makes switching from a stack navigator to bottom tabs simple.",
      "**React Navigation without Expo Router** made this setup tedious and complicated.",
      "**The example** moves from modal screens to bottom tabs.",
      "**Links** still work when screens use bottom tabs.",
      "**Programmatic navigation** means navigating through code.",
      "**Programmatic navigation** still works with bottom tabs.",
      "**Separate navigation buttons** are unnecessary here because the tabs provide navigation.",
      "**Switching tabs** has no screen animation in this example.",
    ],
  },
  {
    id: "add-tab-icons",
    heading: "Bottom tab icons",
    paragraphs: [
      "**The default triangle** indicates that a tab has no icon.",
      "**@expo/vector-icons** supplies the icons used here.",
      "**The example icons** are a list, a clock, and a lightbulb.",
      "**The icon area** can also display an image, text, or your own React component.",
      {
        text: "**Each tab icon** receives information about its tab.",
        bullets: [
          "**Focus** tells it whether the tab is selected.",
          "**Color** tells it which color to use.",
          "**Size** tells it how large to appear.",
        ],
      },
    ],
  },
  
];
