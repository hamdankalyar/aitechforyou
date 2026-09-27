import type { ArticleSection } from "@/lib/articles";

export const reactNativeConditionalStylingSections: ArticleSection[] = [
  {
    id: "conditional-styles",
    heading: "Apply styles when an item is completed",
    paragraphs: [
      "**isCompleted** tells ShoppingListItem whether an item is completed.",
      "**Boolean** has true and false values.",
      "**An optional prop** can be omitted when an item is not completed.",
      "**The default value** for isCompleted is false.",
      "**A style array** combines the regular style with a completed style.",
      "**The condition** adds the completed style when isCompleted is true.",
      "**Undefined** is allowed when the completed style is not needed.",
      {
        text: "**The item component** uses isCompleted to choose its styles.",
        block: {
          type: "command",
          label: "ShoppingListItem.tsx",
          command: `import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted = false }: Props) {
  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
  },
  completedContainer: {
    backgroundColor: "#eee",
  },
  itemText: {
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: "gray",
    color: "gray",
  },
});`,
          highlightLines: [5, 8, 11, 13, 17, 19, 32, 33, 38, 39, 40, 41],
        },
      },
    ],
  },
  {
    id: "pass-completed-prop",
    heading: "Pass the completed prop to an item",
    paragraphs: [
      "**Existing items** keep their regular styles when isCompleted is omitted.",
      "**Boolean shorthand** passes true by writing isCompleted alone.",
      "**Explicit true** can also be written as isCompleted={true}.",
      {
        text: "**The app** marks Tea completed with the Boolean shorthand.",
        block: {
          type: "command",
          label: "app.tsx",
          command: `import { View } from "react-native";
import { ShoppingListItem } from "./components/ShoppingListItem";

export default function App() {
  return (
    <View>
      <ShoppingListItem name="Coffee" />
      <ShoppingListItem name="Tea" isCompleted />
    </View>
  );
}`,
          highlightLines: [8],
        },
      },
    ],
  },
];
