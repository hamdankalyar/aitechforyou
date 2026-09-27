import type { ArticleSection } from "@/lib/articles";

export const reactNativeIconsSections: ArticleSection[] = [
  {
    id: "use-svgs-sparingly",
    heading: "Use SVGs sparingly in native apps",
    paragraphs: [
      "**SVGs** are not the most efficient way to render things in native apps.",
      "**Android** can be particularly expensive for SVG rendering.",
      "**A thousand SVGs** could slow an Android app to a crawl.",
      "**Small PNGs** can be preferable in that case.",
      "**SVGs** should be used sparingly in a React Native app.",
    ],
  },
  {
    id: "use-vector-icons",
    heading: "Use a convenient icon library",
    paragraphs: [
      "**@expo/vector-icons** is a convenient and easy way to add icons.",
      {
        text: "**Ionicons** renders a checkmark icon from the library.",
        block: {
          type: "command",
          label: "React Native",
          command: `import Ionicons from "@expo/vector-icons/Ionicons";

export function LibraryIcon() {
  return <Ionicons name="checkmark-circle" size={24} color="green" />;
}`,
        },
      },
    ],
  },
  {
    id: "understand-expo-go",
    heading: "Understand why Expo Go needs no rebuild",
    paragraphs: [
      "**Without Expo Go** you would need to rebuild the native app to use the icon library.",
      "**Expo Go** is a sandbox environment.",
      "**Expo Go** already includes many native libraries.",
      "**@expo/vector-icons** is one of those preinstalled libraries.",
    ],
  },
  {
    id: "other-svg-options",
    heading: "Other icon options discussed",
    paragraphs: [
      "**react-native-svg** can render an SVG icon you choose.",
      "**Circle** draws the green background in this SVG example.",
      {
        text: "**Path** draws the white checkmark.",
        block: {
          type: "command",
          label: "React Native",
          command: `import Svg, { Circle, Path } from "react-native-svg";

export function SvgIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" fill="green" />
      <Path d="M7 12l3 3 7-7" stroke="white" strokeWidth={2} fill="none" />
    </Svg>
  );
}`,
        },
      },
      "**Expo Image** can also render SVGs.",
      "**An SVG library website** can provide icons for either option.",
    ],
  },
];
