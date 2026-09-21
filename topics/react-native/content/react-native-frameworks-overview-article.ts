import type { ArticleSection } from "@/lib/articles";

export const reactNativeFrameworksOverviewSections: ArticleSection[] = [
  {
    id: "understand-expo",
    heading: "Expo is a React Native framework",
    paragraphs: [
      "**React Native** is itself a UI framework.",
      "**A React Native Framework** is a set of tools and libraries built on top of React Native.",
      "**Expo** is a React Native framework.",
      "**Next.js, Remix, and RedwoodJS** are React frameworks in the same way.",
      "**Meta** recommended using a React Native framework at React Conf 2024.",
      "**Expo** was the specific recommendation for creating new React Native apps.",
    ],
  },
  {
    id: "understand-react-native",
    heading: "What React Native provides",
    paragraphs: [
      "**React code** is JavaScript code with React.",
      "**React Native** can run React code on native iOS and Android platforms.",
      "**Native platforms** use the underlying native components.",
      "**Metro** handles bundling.",
      "**Hermes** is the JavaScript runtime.",
      "**JSI** is part of the work that makes React Native possible.",
      "**Running React code natively** takes a huge amount of work.",
      "**Core building blocks** include Text, View, ScrollView, and lists.",
    ],
  },
  {
    id: "see-what-is-missing",
    heading: "What React Native does not provide by default",
    paragraphs: [
      "**Navigation** needs an extra tool or library.",
      "**Push notifications** need an extra tool or library.",
      "**Data storage across app launches** needs an extra tool or library.",
      "**Phone camera access** needs an extra tool or library.",
      "**Changing the app icon** is possible but tedious.",
      "**Adding custom native code** is possible but tedious.",
      "**Building app bundles** for a store release is possible but tedious.",
    ],
  },
  {
    id: "use-community-libraries",
    heading: "Why community libraries are needed",
    paragraphs: [
      "**The missing functionality** is a design choice rather than a failing by Meta.",
      "**Including everything** would make React Native completely unmaintainable for the small React Native team.",
      "**React Native developers** need to add this functionality themselves.",
      "**Community libraries** have provided this functionality from the beginning of React Native.",
      "**React Native Directory** is a resource for finding community libraries for React Native.",
    ],
  },
  {
    id: "use-expo-go",
    heading: "What Expo Go is",
    paragraphs: [
      "**Expo Go** is one small part of the Expo framework.",
      "**Expo Go** is a sandbox environment for learning, prototyping, and getting started quickly.",
    ],
  },
];
