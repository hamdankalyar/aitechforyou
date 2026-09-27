import type { ArticleSection } from "@/lib/articles";

export const reactNativePressableTouchableAlertSections: ArticleSection[] = [
  {
    id: "choose-a-button-component",
    heading: "Choose a button component",
    paragraphs: [
      {
        text: "**Button** renders a native-looking button for each platform.",
        bullets: [
          "**Platform appearance:** The button looks slightly different on Android and iOS.",
          "**Customization:** Button does not accept custom styles.",
          "**Local testing:** Button is useful when testing something locally.",
          "**Production apps:** Button is generally not used in production apps.",
        ],
        block: {
          type: "command",
          label: "React Native",
          command: `<Button title="Delete" />`,
        },
      },
      {
        text: "**Touchable and Pressable components** make wrapped content behave like a button.",
        bullets: [
          "**Common choices:** TouchableOpacity and Pressable are the most commonly used options.",
        ],
      },
    ],
  },
  {
    id: "understand-pressable",
    heading: "Understand Pressable",
    paragraphs: [
      "**Pressable** is the new generation of Touchable components.",
      "**onPress** takes a function that runs when the component is pressed.",
      {
        text: "**Pressable props** support several kinds of interaction.",
        bullets: [
          "**onHoverIn:** It responds when hovering starts.",
          "**onHoverOut:** It responds when hovering ends.",
          "**onPressIn:** It responds when pressing starts.",
          "**onPressOut:** It responds when pressing ends.",
          "**Custom styles:** They can change based on whether the component is pressed.",
        ],
        block: {
          type: "command",
          label: "React Native",
          command: `<Pressable onPress={() => console.log("Delete pressed")}>
  <Text>Delete</Text>
</Pressable>`,
        },
      },
    ],
  },
  {
    id: "use-touchable-opacity",
    heading: "Use TouchableOpacity",
    paragraphs: [
      "**TouchableOpacity** is a popular component that automatically applies opacity when pressed.",
      "**The default opacity** can feel too intense.",
      "**activeOpacity** changes the pressed opacity.",
      "**activeOpacity={0.8}** uses 80% opacity for a less intense effect.",
      {
        text: "**The wrapped Text** becomes the visible button content.",
        block: {
          type: "command",
          label: "React Native",
          command: `<TouchableOpacity activeOpacity={0.8}>
  <Text>Delete</Text>
</TouchableOpacity>`,
        },
      },
    ],
  },
  {
    id: "place-items-in-a-row",
    heading: "Place the button in a row",
    paragraphs: [
      "**The default layout** renders the item and button underneath each other.",
      "**flexDirection: \"row\"** renders them next to each other.",
      "**justifyContent: \"space-between\"** places space between the item and button.",
      "**alignItems: \"center\"** centers them on the same line.",
      {
        text: "**itemContainer** holds the row layout styles.",
        block: {
          type: "command",
          label: "React Native",
          command: `itemContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},`,
        },
      },
    ],
  },
  {
    id: "style-the-touchable",
    heading: "Style the TouchableOpacity and its text",
    paragraphs: [
      {
        text: "**The component styles** separate the button container from its text.",
        block: {
          type: "command",
          label: "React Native",
          command: `<TouchableOpacity
  activeOpacity={0.8}
  style={styles.button}
>
  <Text style={styles.buttonText}>Delete</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});`,
        },
      },
    ],
  },
  {
    id: "open-an-alert-on-press",
    heading: "Open an Alert from onPress",
    paragraphs: [
      "**Alert** is a built-in React Native component.",
      "**The import** brings Alert in from React Native.",
      "**handleDelete** is a function inside the React component.",
      "**We** use function declarations for components.",
      "**We** use arrow functions for small utility functions inside components.",
      "**The function style** is a preference without a required reason to follow it.",
      "**onPress={handleDelete}** passes the function directly because it does not take arguments.",
      {
        text: "**Alert.alert** opens the confirmation alert from handleDelete.",
        block: {
          type: "command",
          label: "React Native",
          command: `import { Alert } from "react-native";

const handleDelete = () => {
  Alert.alert("Are you sure you want to delete this?");
};

<TouchableOpacity onPress={handleDelete}>
  <Text>Delete</Text>
</TouchableOpacity>`,
        },
      },
    ],
  },
  {
    id: "configure-alert-actions",
    heading: "Configure the Alert actions",
    paragraphs: [
      "**The first argument** provides the alert text.",
      "**The second argument** provides the subtext.",
      "**The third argument** is an array of button options.",
      "**Each button option** is an object.",
      "**Every Alert button** dismisses the alert when pressed.",
      "**onPress** defines the additional action that runs when a button is pressed.",
      "**style: \"destructive\"** makes the Yes option red.",
      "**style: \"cancel\"** makes the second option a Cancel button.",
      {
        text: "**The complete alert** includes its message and both options.",
        block: {
          type: "command",
          label: "React Native",
          command: `const handleDelete = () => {
  Alert.alert(
    "Are you sure you want to delete this?",
    "It will be gone for good.",
    [
      {
        text: "Yes",
        onPress: () => console.log("Ok, deleting"),
        style: "destructive",
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
  );
};`,
        },
      },
    ],
  },
  {
    id: "use-platform-specific-alerts",
    heading: "Use the platform-specific Alert",
    paragraphs: [
      "**The built-in Alert** looks different on Android and iOS.",
      "**The reason** is that React Native uses a platform-specific alert.",
      "**Button order:** The platform decides where each configured button is displayed.",
      "**A custom alert** requires a custom dialogue.",
      "**The custom dialogue** can use a full-screen modal with a transparent background.",
      "**A smaller alert** can then use any styling inside the modal.",
    ],
  },
];
