import type { ArticleSection } from "@/lib/articles";

export const reactNativeScreenNavigationSections: ArticleSection[] = [
  {
    id: "understand-stack-navigation",
    heading: "Stack navigation",
    paragraphs: [
      "**A stack** places each new screen on top of the previous screen.",
      "**Stack navigation** is the basic type of navigation used by default.",
      "**Going back** returns to the previous screen.",
    ],
  },
  {
    id: "add-placeholder-screens",
    heading: "Add placeholder screens",
    paragraphs: [
      "**A placeholder screen** uses a View and Text as temporary content.",
      "**The counter screen** starts as a copy of an existing file with this layout.",
      "**Copying the file** avoids typing out the same placeholder layout.",
      "**idea.tsx** adds another placeholder screen.",
      "**IdeaScreen** is the name used for this screen.",
      "**The idea screen** is for whatever you would like to build.",
    ],
  },
  {
    id: "navigate-with-link",
    heading: "Navigate with Link",
    paragraphs: [
      "**Expo Router** provides three main ways to navigate between screens.",
      "**Link** is the default way to navigate.",
      {
        text: "**Link** is imported from expo-router.",
        block: {
          type: "command",
          label: "Import",
          command: 'import { Link } from "expo-router";',
        },
      },
      "**The Link component** can contain text directly.",
      "**href** specifies where the link should navigate.",
      {
        text: "**Go to counter** links to the counter screen.",
        block: {
          type: "command",
          label: "Link",
          command: `<Link
  href="/counter"
  style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
>
  Go to counter
</Link>`,
        },
      },
      
      "**Pressing the link** places the counter screen on top of the shopping list screen.",
    ],
  },
  {
    id: "navigate-programmatically",
    heading: "Navigate programmatically",
    paragraphs: [
      "**Programmatic navigation** uses code to navigate between screens.",
      "**Go to idea** is text wrapped in a TouchableOpacity.",
      "**onPress** runs the navigation when the TouchableOpacity is pressed.",
      {
        text: "**useRouter** is the hook exported from expo-router for this navigation.",
        block: {
          type: "command",
          label: "Import",
          command: 'import { useRouter } from "expo-router";',
        },
      },
      {
        text: "**useRouter()** provides the router used in onPress.",
        block: {
          type: "command",
          label: "Inside the screen",
          command: "const router = useRouter();",
        },
      },
    ],
  },
  {
    id: "choose-navigation-method",
    heading: "Choose navigate, push, or replace",
    paragraphs: [
      "**push** always adds a screen on top of the stack.",
      "**replace** replaces the current screen.",
      "**navigate** goes to a screen but may go back in the stack.",
      {
        text: "**The example stack** has counter on top of idea and index.",
        code: `┌────────────────┐
│ counter screen │
├────────────────┤
│ idea screen    │
├────────────────┤
│ index screen   │
└────────────────┘`,
      },
      
      {
        text: "**navigate** is used here to open the idea screen.",
        block: {
          type: "command",
          label: "TouchableOpacity",
          command: `<TouchableOpacity onPress={() => router.navigate("/idea")}>
  <Text style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}>
    Go to idea
  </Text>
</TouchableOpacity>`,
        },
      },
      "**The text styles** reuse the same values as the counter link.",
    ],
  },
  {
    id: "use-header-buttons",
    heading: "Navigate with header buttons",
    paragraphs: [
      "**Header navigation buttons** are the third way to navigate.",
      "**React Navigation** adds these buttons by default.",
      "**The back buttons** let you go back through the stack.",
    ],
  },
];
