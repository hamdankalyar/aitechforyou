import type { ArticleSection } from "@/lib/articles";

export const reactNativeNestedNavigatorsSections: ArticleSection[] = [
  {
    id: "nest-navigators",
    heading: "Nesting navigators",
    paragraphs: [
      "**Nesting navigation** means putting one navigator inside another.",
      {
        text: "**Native navigation** lets you nest navigators pretty much infinitely.",
        bullets: [
          "**A stack** can sit inside a tab.",
          "**A stack** can sit inside another stack.",
          "**A stack** can sit inside a modal.",
        ],
      },
      "**This example** uses a nested stack for the counter and history screens.",
    ],
  },
  {
    id: "example-structure",
    heading: "Example structure",
    paragraphs: [
      {
        text: "**The counter folder** contains its own layout and two screens.",
        code: `app/
├── _layout.tsx
└── counter/
    ├── _layout.tsx
    ├── index.tsx
    └── history.tsx`,
      },
      "**A layout** defines the navigator used for its screens.",
      "**app/_layout.tsx** contains the outer navigator.",
      "**counter/_layout.tsx** defines the inner stack.",
      "**An index screen** is the index file of a folder.",
      "**counter/index.tsx** is the counter screen at /counter.",
      "**The /counter path** is the same whether the screen is a counter file or the counter folder’s index file.",
      "**counter/history.tsx** is the history screen at /counter/history.",
      "**A placeholder** provides temporary screen content.",
      "**The history screen** reuses the idea screen’s content as a placeholder.",
    ],
  },
  {
    id: "navigation-headers",
    heading: "Navigation headers",
    paragraphs: [
      "**Nested navigators** can show two navigation headers for the same screen.",
      "**The outer header** comes from the root layout.",
      "**The inner header** comes from the counter stack.",
      "**The counter stack** has two screens that need their own headers.",
      "**The outer header** is hidden so only the inner screen’s header appears.",
      {
        text: "**headerShown: false** belongs in the counter screen’s options in the root layout.",
        block: {
          type: "command",
          label: "app/_layout.tsx · counter screen options",
          command: "headerShown: false",
        },
      },
      "**Stack** is imported from Expo Router for the counter layout.",
      "**Stack.Screen** identifies the index screen by name.",
      "**The title option** gives that screen the header title counter.",
    ],
  },
  {
    id: "header-navigation",
    heading: "Navigation to the history screen",
    paragraphs: [
      "**Header buttons** are a convenient way to navigate between screens with React Navigation.",
      "**headerRight** is a screen option that takes a function returning content for the right side of the header.",
      "**Text** can be returned first to check where the content renders.",
      "**An icon button** is used here to open history.",
      "**Material Icons’ history icon** is chosen for consistency with the example.",
      "**A different icon** can also be used.",
      "**The icon size** is 32.",
      "**The icon color** is gray.",
      "**Link** is the Expo Router component used to navigate to history.",
      "**href** is the destination screen’s path.",
      {
        text: "**The history link** uses /counter/history because history is inside counter.",
        block: {
          type: "command",
          label: "counter/_layout.tsx · index screen options",
          command: `headerRight: () => (
  <Link href="/counter/history">
    <MaterialIcons name="history" size={32} color="gray" />
  </Link>
)`,
        },
      },
    ],
  },
  {
    id: "touchable-area",
    heading: "The icon button’s touchable area",
    paragraphs: [
      "**A small icon button** requires a tap directly on the icon.",
      "**A larger touchable area** makes approximate taps easier to register.",
      "**Pressable** wraps the icon to provide a pressable area.",
      "**hitSlop** extends the area around the Pressable that also triggers a press.",
      "**hitSlop={20}** is used here.",
      "**asChild** is required on the Expo Router Link when it contains the Pressable component.",
      {
        text: "**The counter layout** combines the stack with the history button.",
        block: {
          type: "command",
          label: "app/counter/_layout.tsx",
          command: `import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "counter",
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable hitSlop={20}>
                <MaterialIcons name="history" size={32} color="gray" />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}`,
        },
      },
      "**A tap next to the icon** also opens the history screen.",
      "**Icon buttons without a defined border** benefit from this larger touchable area.",
    ],
  },
];
