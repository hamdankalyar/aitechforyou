import type { ArticleSection } from "@/lib/articles";

export const reactNativeReusableComponentsPropsSections: ArticleSection[] = [
  {
    id: "understand-components",
    heading: "Understand why components are used",
    paragraphs: [
      "**Components** are a React concept that is also used in React Native.",
      "**A single app.tsx file** becomes massive and difficult to use when everything stays inside it.",
      "**A modular app** is built from separate components.",
      "**The reason for components** is to create the app as a modular entity.",
      "**A components folder** is the common place for component files.",
    ],
  },
  {
    id: "create-and-export-a-component",
    heading: "Create and export a component",
    paragraphs: [
      "**ShoppingListItem.tsx** is the component file.",
      "**The naming convention** is to match the component name with the file name.",
      "**An export** makes the component available to another file.",
      "**A default export** is one available option.",
      "**A named export** is the modern option used here.",
      "**A function declaration** is used for the component.",
      {
        text: "**return null** keeps the new component empty for now.",
        block: {
          type: "command",
          label: "ShoppingListItem.tsx",
          command: `export function ShoppingListItem() {
  return null;
}`,
        },
      },
    ],
  },
  {
    id: "pass-properties",
    heading: "Pass properties into a component",
    paragraphs: [
      "**Props** means the properties passed into a component.",
      "**The parent file** passes a name so each component instance can show different text.",
      {
        text: "**The name prop** is written on each ShoppingListItem instance.",
        block: {
          type: "command",
          label: "app.tsx",
          command: `<ShoppingListItem name="Coffee" />
<ShoppingListItem name="Tea" />
<ShoppingListItem name="Sugar" />`,
        },
      },
      "**The props value** reaches the component as an object.",
      "**Destructuring** takes name from that object in the function arguments.",
      "**Function argument destructuring** is handy for receiving props.",
      "**A Props type** is the convention used to describe the component properties.",
      "**name: string** says that the name property contains a string.",
      {
        text: "**Curly braces** render the passed string inside Text.",
        block: {
          type: "command",
          label: "ShoppingListItem.tsx",
          command: `type Props = {
  name: string;
};

export function ShoppingListItem({ name }: Props) {
  return <Text>{name}</Text>;
}`,
        },
      },
    ],
  },
  {
    id: "choose-required-or-optional-props",
    heading: "Choose required or optional props",
    paragraphs: [
      "**A required name** causes a TypeScript error when name is not passed.",
      "**A question mark** makes a property optional.",
      "**An optional name** allows the component to be used without passing name.",
      "**The name prop** stays required because every item should receive a name.",
      {
        text: "**name?: string** is the optional form that is not used here.",
        block: {
          type: "command",
          label: "Optional alternative",
          command: `type Props = {
  name?: string;
};`,
        },
      },
    ],
  },
  {
    id: "understand-stylesheet-create",
    heading: "Understand StyleSheet.create",
    paragraphs: [
      "**What it does now:** In production, StyleSheet.create returns the styles you give it as an object. There’s no hidden performance trick.",
      "**What it does in development:** It checks your styles and can help catch invalid values.",
      "**Why validation mattered more before:** Older React Native versions passed styles directly to native components, where invalid values could cause crashes. Current versions have more protection.",
      "**Can you use a plain object?** Yes. In this example, though, TypeScript would complain about its inferred types. StyleSheet.create gives the styles the expected types.",
      "**Does it make the app faster?** No. StyleSheet.create does not remove duplicate styles or do any special optimization in production. It returns the styles you passed in.",
    ],
  },
  {
    id: "use-stylesheet-utilities",
    heading: "Use the StyleSheet utilities",
    paragraphs: [
      {
        text: "**A style array** lets one component receive more than one style through its style prop.",
        bullets: [
          "**The first style** uses absoluteFill to make the View cover the whole screen.",
          "**The second style** uses backgroundColor to make the full-screen View visible.",
        ],
        block: {
          type: "command",
          label: "React Native",
          command: `<View
  style={[
    StyleSheet.absoluteFill,
    { backgroundColor: "pink" },
  ]}
/>`,
        },
      },
    ],
  },
  {
    id: "understand-render-order",
    heading: "Choose what appears on top",
    paragraphs: [
      {
        text: "**The first View** appears underneath the component written after it.",
        block: {
          type: "command",
          label: "React Native",
          command: `<View>
  <View
    style={[
      StyleSheet.absoluteFill,
      { backgroundColor: "pink" },
    ]}
  />
  <ShoppingListItem />
</View>`,
        },
      },
      {
        text: "**The last View** appears over the component written before it.",
        block: {
          type: "command",
          label: "React Native",
          command: `<View>
  <ShoppingListItem />
  <View
    style={[
      StyleSheet.absoluteFill,
      { backgroundColor: "pink" },
    ]}
  />
</View>`,
        },
      },
    ],
  },
];
