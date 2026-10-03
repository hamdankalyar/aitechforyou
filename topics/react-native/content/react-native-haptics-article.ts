import type { ArticleSection } from "@/lib/articles";

export const reactNativeHapticsSections: ArticleSection[] = [
  {
    id: "haptic-feedback",
    heading: "Haptic feedback",
    paragraphs: [
      "**Haptic feedback** is the little vibration a phone makes in response to certain touches.",
      "**Button presses** can trigger haptic feedback.",
      "**Typing on a keyboard** can also trigger haptic feedback.",
      "**Occasional haptics** can make an app more interesting to use.",
      "**Haptic feedback** should be used sparingly.",
    ],
  },
  {
    id: "expo-haptics",
    heading: "expo-haptics and vibration presets",
    paragraphs: [
      "**expo-haptics** is a small library for triggering haptic feedback.",
      "**Presets** are predefined vibration patterns.",
      {
        text: "**The library** provides three functions for different vibration presets.",
        bullets: [
          "**impactAsync** triggers impact feedback.",
          "**notificationAsync** triggers notification feedback.",
          "**selectionAsync** provides a selection feedback preset.",
        ],
      },
      {
        text: "**The installation command** adds expo-haptics to the project.",
        block: {
          type: "command",
          label: "Terminal",
          command: "npx expo install expo-haptics",
        },
      },
      {
        text: "**Haptics** is the name used to access the imported library's functions and presets.",
        block: {
          type: "command",
          label: "Library import",
          command: 'import * as Haptics from "expo-haptics";',
        },
      },
    ],
  },
  {
    id: "medium-impact",
    heading: "Medium impact",
    paragraphs: [
      "**Haptics.impactAsync** triggers an impact using the feedback style passed as its argument.",
      "**Haptics.ImpactFeedbackStyle.Medium** selects the medium impact used in this example.",
      {
        text: "**Deleting an item** triggers a medium impact before the list state is updated.",
        block: {
          type: "command",
          label: "Inside the item deletion handler",
          command: "Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);",
        },
      },
    ],
  },
  {
    id: "success-notification",
    heading: "Success notification",
    paragraphs: [
      "**Haptics.notificationAsync** triggers notification feedback using the type passed as its argument.",
      "**Haptics.NotificationFeedbackType.Success** selects a success notification.",
      "**Completing an item** uses the success notification in the list example.",
      "**Success feedback** feels stronger than medium impact on both phones tested.",
      "**The tested iPhone** produces a double vibration for success feedback.",
    ],
  },
  {
    id: "previous-completion-state",
    heading: "Feedback based on previous completion state",
    paragraphs: [
      "**Toggling completion** switches an item between completed and to do.",
      "**The previous state** determines which feedback accompanies the change.",
      "**completedAtTimestamp** records when the item was completed in this example.",
      {
        text: "**The feedback choice** applies only to the item being toggled.",
        bullets: [
          "**A previously completed item** gets a medium impact when marked to do.",
          "**An incomplete item** gets a success notification when marked completed.",
        ],
      },
      {
        text: "**The condition** checks the selected item's completion timestamp before its completion state changes.",
        block: {
          type: "command",
          label: "Inside the completion toggle for the selected item",
          command: `if (item.completedAtTimestamp) {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
} else {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}`,
        },
      },
    ],
  },
  {
    id: "real-device-testing",
    heading: "Real-device testing",
    paragraphs: [
      "**A real phone** lets you feel the haptic feedback.",
      "**A simulator** cannot let you feel the vibrations.",
      "**The tested Android phone** felt stronger overall than the tested iPhone.",
      "**The Android comparison** may reflect that particular phone.",
    ],
  },
  {
    id: "review-questions",
    heading: "Review questions",
    paragraphs: [],
    blocks: [
      {
        type: "details",
        title: "What is haptic feedback?",
        paragraphs: [
          "**Haptic feedback** is a tactile vibration response to user interactions.",
          "**Button presses** are an example of these interactions.",
          "**Typing on a keyboard** is another example.",
          "**Haptic feedback** is designed to enhance the user experience.",
        ],
      },
      {
        type: "details",
        title: "What are the three main haptic feedback functions available in the Expo haptics library?",
        paragraphs: [
          "**impactAsync, notificationAsync, and selectionAsync** are the three main functions.",
          "**The functions** provide different preset vibration patterns.",
        ],
      },
      {
        type: "details",
        title: "What haptic feedback styles were used in the application's delete and toggle functions?",
        paragraphs: [
          "**Deleting an item** uses medium impact feedback.",
          "**Completing an item** uses success notification feedback.",
          "**Marking a previously completed item as undone** uses medium impact feedback.",
        ],
      },
      {
        type: "details",
        title: "How do you import the haptics library in an Expo project?",
        paragraphs: [
          "**The import statement** imports the library as haptics.",
        ],
        code: 'import * as haptics from "expo-haptics";',
      },
      {
        type: "details",
        title: "What are some common considerations when implementing haptic feedback across iOS and Android platforms?",
        paragraphs: [
          "**Haptic intensity** can vary between iOS and Android devices.",
          "**Haptic feel** can also vary between platforms.",
          "**Android devices** often have stronger default haptic feedback than iOS devices.",
          "**Testing on both platforms** helps check that the experience is appropriate for each.",
          "**The same API calls** may produce different physical sensations across devices and operating systems.",
        ],
      },
    ],
  },
];
