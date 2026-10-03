import type { ArticleSection } from "@/lib/articles";

export const reactNativeLayoutAnimationSections: ArticleSection[] = [
  {
    id: "layout-animation",
    heading: "Layout animation",
    paragraphs: [
      "**UI** means the user interface displayed on the screen.",
      "**LayoutAnimation** animates the UI from its previous state to its current state.",
      "**LayoutAnimation** is part of React Native.",
      "**Layout animation** provides a simple way to create limited full-page animations.",
      "**The animation** uses platform-specific behavior.",
      "**This approach** does not give control over how the UI animates.",
    ],
  },
  {
    id: "configure-next",
    heading: "configureNext and animation presets",
    paragraphs: [
      "**configureNext** configures the animation for the next UI update.",
      "**The call** belongs immediately before a state change that triggers a UI update.",
      "**Presets** are animation configurations already provided by LayoutAnimation.",
      "**LayoutAnimation.Presets.easeInEaseOut** is the preset used in this example.",
      "**The preset** is passed as the argument to configureNext.",
      {
        text: "**The shopping list example** calls configureNext before each setShoppingList call.",
        bullets: [
          "**setShoppingList** changes the list held in component state.",
          "**newShoppingList** represents the updated list in this example.",
        ],
      },
      {
        text: "**LayoutAnimation** is imported from react-native before being used in a list update handler.",
        block: {
          type: "command",
          label: "Import and list update calls",
          command: `import { LayoutAnimation } from "react-native";

// Inside a list update handler:
LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
setShoppingList(newShoppingList);`,
        },
      },
      "**Marking items as completed** makes them animate up and down in the demonstrated list.",
    ],
  },
  {
    id: "batched-ui-updates",
    heading: "Batched UI updates",
    paragraphs: [
      "**Batching** groups several state updates into a single UI update.",
      "**Several useState updates** in one hook can be batched together.",
      "**configureNext** affects the next UI update rather than only the next line of code.",
      "**The animation** applies when the component next re-renders and the UI updates.",
    ],
  },
  {
    id: "custom-animations",
    heading: "Custom animations",
    paragraphs: [
      "**More involved animations** can require a lot of code.",
      "**Swipe to delete** is an example of this additional work.",
      "**Animated** is part of React Native for more advanced animation.",
      "**React Native Reanimated** is a hooks-based animation library.",
      "**Reanimated** is the commonly used option described for more advanced animation.",
      "**React Native Gesture Handler** works well with Reanimated.",
      "**Reanimated and Gesture Handler** are the libraries discussed for a custom swipe-to-delete animation.",
    ],
  },
  {
    id: "review-questions",
    heading: "Review questions",
    paragraphs: [],
    blocks: [
      {
        type: "details",
        title: "What is Layout Animation in React Native and how is it typically used?",
        paragraphs: [
          "**LayoutAnimation** animates UI changes from a previous state to the current state.",
          "**Platform-specific animations** are applied automatically.",
          "**LayoutAnimation.configureNext()** is called immediately before a state change that triggers a UI update.",
          "**easeInEaseOut** is an example preset passed to configureNext.",
        ],
      },
      {
        type: "details",
        title: "What are the two primary libraries recommended for advanced animations in React Native?",
        paragraphs: [
          "**React Native Reanimated and React Native Gesture Handler** are the two libraries discussed for advanced animations.",
          "**Software Mansion** builds both libraries.",
          "**The libraries** work well together.",
          "**Custom interactions** such as swipe to delete use these libraries.",
          "**Reanimated** is a hooks-based animation library.",
        ],
      },
      {
        type: "details",
        title: "How does LayoutAnimation.configureNext() work with state updates?",
        paragraphs: [
          "**LayoutAnimation.configureNext()** configures animation for the next UI update.",
          "**Its effect** is not limited to the directly following line of code.",
          "**Batching** groups multiple state changes into one UI update.",
          "**The animation** applies to the next component re-render and UI update.",
          "**Multiple state changes** in the same hook can be included in that update.",
        ],
      },
      {
        type: "details",
        title: "What is the primary purpose of React Native Reanimated?",
        paragraphs: [
          "**React Native Reanimated** is a hooks-based animation library for creating custom animations.",
          "**Its animation capabilities** provide more advanced and flexible options than the standard Animated library.",
        ],
      },
      {
        type: "details",
        title: "What makes Layout Animation simple to use in React Native?",
        paragraphs: [
          "**LayoutAnimation** creates full-page animations with minimal code.",
          "**UI changes** are animated automatically from the previous state to the current state.",
          "**Platform-specific animation styles** determine how the changes animate.",
          "**Detailed animation parameters** do not need to be specified.",
        ],
      },
    ],
  },
];
