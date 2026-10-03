import type { ArticleSection } from "@/lib/articles";

export const reactNativeTextInputShoppingListSections: ArticleSection[] = [
  {
    id: "text-input",
    heading: "TextInput",
    paragraphs: [
      "**TextInput** is the React Native component for receiving input from the user's keyboard.",
      "**TextInput** can collect both text and numbers.",
      "**React Native** has no form component like the web.",
      "**Inputs** are handled individually.",
      "**Props** are properties used to configure the input.",
      "**placeholder** shows example text in the input.",
      {
        text: "**A TextInput** can be created with a placeholder such as e.g Coffee.",
        block: {
          type: "command",
          label: "TextInput with a placeholder",
          command: '<TextInput placeholder="e.g Coffee" />',
        },
      },
      "**TextInput** has no styling by default.",
      "**Focusing on a TextInput** automatically opens the keyboard.",
    ],
  },
  {
    id: "component-state",
    heading: "Component state with useState",
    paragraphs: [
      "**State** holds values inside a React component.",
      "**useState** is the React hook used to store those values.",
      {
        text: "**useState** is imported from react.",
        block: {
          type: "command",
          label: "React import",
          command: 'import { useState } from "react";',
        },
      },
      "**An array** holds a list of items.",
      {
        text: "**useState** returns an array of two items.",
        bullets: [
          "**The first item** is the value being tracked.",
          "**The second item** is a function that updates that value.",
        ],
      },
      "**The two items** can have whatever names you want.",
      "**The update function** is usually named setThing or updateThing after the value it changes.",
      {
        text: "**An empty string** is the initial value for this text input.",
        block: {
          type: "command",
          label: "Inside a React component",
          command: 'const [value, setValue] = useState("");',
        },
      },
      "**value** holds the text typed into the input.",
      "**setValue** is the function used to update that text.",
    ],
  },
  {
    id: "control-the-input",
    heading: "Controlled inputs: value and onChangeText",
    paragraphs: [
      "**A controlled input** uses a value stored in component state.",
      "**The value prop** gives TextInput its current text.",
      "**onChangeText** receives the text when the input changes.",
      "**onChange** is also available in React Native.",
      "**onChange** receives an event from which the text must be extracted.",
      "**onChangeText** is more convenient when you only need the text.",
      {
        text: "**onChangeText** can pass the received text to setValue.",
        block: {
          type: "command",
          label: "TextInput prop",
          command: "onChangeText={(value) => setValue(value)}",
        },
      },
      "**setValue** can be passed directly because it takes the same argument.",
      {
        text: "**The controlled input** connects its text to state through value and onChangeText.",
        block: {
          type: "command",
          label: "Controlled TextInput",
          command: `<TextInput
  placeholder="e.g Coffee"
  value={value}
  onChangeText={setValue}
/>`,
        },
      },
    ],
  },
  {
    id: "keyboard-properties",
    heading: "Keyboard properties",
    paragraphs: [
      "**TextInput properties** adapt the keyboard to the information being collected.",
      {
        text: "**keyboardType** chooses the type of keyboard.",
        bullets: [
          "**A numeric keyboard** is an option for entering numbers.",
          "**An email keyboard** puts the at symbol in a convenient place.",
        ],
      },
      "**Text input** is the option used in these examples.",
      "**autoCapitalize, autoComplete, and autoCorrect** are additional properties for adapting the input.",
    ],
  },
  {
    id: "submit-from-the-keyboard",
    heading: "Submission: returnKeyType and onSubmitEditing",
    paragraphs: [
      "**returnKeyType** defines what the button at the bottom right of the keyboard looks like.",
      "**returnKeyType=\"done\"** changes it to a highlighted done button.",
      "**A callback** is a function called in response to an action.",
      "**onSubmitEditing** receives the function to call when the input is submitted.",
      "**The done button** can submit the input without a separate submit button beside it.",
      {
        text: "**This submission callback** logs Submitted when done is pressed.",
        block: {
          type: "command",
          label: "TextInput submission",
          command: `<TextInput
  value={value}
  onChangeText={setValue}
  returnKeyType="done"
  onSubmitEditing={() => console.log("Submitted")}
/>`,
        },
      },
      "**Enter** also triggers onSubmitEditing when using a keyboard in the simulator.",
    ],
  },
  {
    id: "array-state",
    heading: "Arrays in component state",
    paragraphs: [
      "**useState** can store a whole array in device memory.",
      "**A TypeScript type** describes what each item in the array looks like.",
      "**string** describes a text value.",
      "**id** is a string identifying the item in this example.",
      "**name** is a string containing the item's name.",
      {
        text: "**ShoppingListItemType** is an example of an item type.",
        block: {
          type: "command",
          label: "Example item type",
          command: `type ShoppingListItemType = {
  id: string;
  name: string;
};`,
        },
      },
      {
        text: "**initialList** supplies the array's starting value.",
        block: {
          type: "command",
          label: "Example initial array",
          command: `const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
];`,
        },
      },
      {
        text: "**useState<ShoppingListItemType[]>** stores an array of items with that type.",
        block: {
          type: "command",
          label: "Array state inside a React component",
          command: `const [shoppingList, setShoppingList] =
  useState<ShoppingListItemType[]>(initialList);`,
        },
      },
      "**shoppingList** holds the current array in this example.",
      "**setShoppingList** updates the stored array.",
    ],
  },
  {
    id: "rendering-array-state",
    heading: "Rendering an array with map",
    paragraphs: [
      "**map** lets you render one component for each item in an array.",
      "**Array-based rendering** replaces components defined individually for each item.",
      "**item.name** supplies the name displayed by each ShoppingListItem in this example.",
      "**item.id** supplies each component's key.",
      {
        text: "**The map example** renders the items held in state.",
        block: {
          type: "command",
          label: "Rendering array state",
          command: `{shoppingList.map((item) => (
  <ShoppingListItem key={item.id} name={item.name} />
))}`,
        },
      },
    ],
  },
  {
    id: "updating-state-on-submission",
    heading: "Updating state on submission",
    paragraphs: [
      "**handleSubmit** is an arrow function passed to onSubmitEditing.",
      "**if (value)** checks that the entered text is not an empty string.",
      "**A new array** can place the submitted item before the existing items.",
      "**Spreading the existing array** keeps the items already stored.",
      "**The state update function** replaces the stored array with the new array.",
      "**setValue(\"\")** clears the controlled TextInput after submission.",
      "**Unique ids** are ids that differ from one another.",
      "**UUID and NanoID libraries** are alternatives for creating unique ids.",
      "**A timestamp** uses the current date and time as an id.",
      "**This example** uses timestamp ids because they only need to be unique within the phone.",
      "**new Date().toISOString()** supplies the timestamp.",
      "**Timestamp ids** are unique unless items are added within the same millisecond.",
      {
        text: "**The submission example** adds the entered text to the array in state.",
        block: {
          type: "command",
          label: "Submission handler inside a React component",
          command: `const handleSubmit = () => {
  if (value) {
    const newShoppingList = [
      { id: new Date().toISOString(), name: value },
      ...shoppingList,
    ];

    setShoppingList(newShoppingList);
    setValue("");
  }
};`,
        },
      },
      {
        text: "**onSubmitEditing={handleSubmit}** connects the input to the submission handler.",
        block: {
          type: "command",
          label: "TextInput with a submission handler",
          command: `<TextInput
  placeholder="e.g Coffee"
  value={value}
  onChangeText={setValue}
  returnKeyType="done"
  onSubmitEditing={handleSubmit}
/>`,
        },
      },
    ],
  },
];
