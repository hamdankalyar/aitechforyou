import type { ArticleSection } from "@/lib/articles";

export const reactNativeScrollViewFlatListSections: ArticleSection[] = [
  {
    id: "explicit-scrolling",
    heading: "Scrollable areas with ScrollView",
    paragraphs: [
      "**Web content** can become scrollable automatically when it exceeds the screen.",
      "**Native screens** do not automatically become scrollable when content exceeds the available space.",
      "**Overflowing content** extends beyond the screen where it cannot be seen.",
      "**ScrollView** explicitly makes an area scrollable.",
      "**ScrollView** replaces a View when its contents need to scroll.",
      "**ScrollView** is useful for pages that may be longer than a device's screen.",
      "**A sticky header** stays at the top while the remaining content scrolls.",
      "**stickyHeaderIndices** is a ScrollView prop containing an array of child indices to keep sticky.",
      "**Child indices** start at 0.",
      "**stickyHeaderIndices={[0]}** makes the first child the sticky header.",
      "**A white input background** prevents scrolling content from showing through the header.",
      {
        text: "**This ScrollView** keeps its first child TextInput sticky while the Text content scrolls.",
        block: {
          type: "command",
          label: "ScrollView with a sticky input header",
          command: `import { ScrollView, Text, TextInput } from "react-native";

<ScrollView stickyHeaderIndices={[0]}>
  <TextInput style={{ backgroundColor: "white" }} />
  <Text>Content that may extend beyond the screen.</Text>
</ScrollView>`,
        },
      },
    ],
  },
  {
    id: "content-container-style",
    heading: "Content spacing with contentContainerStyle",
    paragraphs: [
      "**style** applies styles to the scrollable element's container.",
      "**contentContainerStyle** applies styles to the content container inside it.",
      "**Content padding and margins** belong in contentContainerStyle.",
      "**Container paddingTop** caused the last item to overflow in the demonstrated list.",
      "**Moving the padding** to contentContainerStyle prevented that overflow.",
      "**StyleSheet** is imported from react-native for this example.",
      {
        text: "**This spacing example** puts top padding on the content container.",
        block: {
          type: "command",
          label: "Content container padding",
          command: `const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 24,
  },
});

<ScrollView contentContainerStyle={styles.contentContainer}>
  <Text>Scrollable content</Text>
</ScrollView>`,
        },
      },
      "**FlatList** also accepts style and contentContainerStyle.",
    ],
  },
  {
    id: "optimized-lists",
    heading: "Optimized item rendering with FlatList",
    paragraphs: [
      "**FlatList** is a component for rendering large sets of items on native platforms.",
      "**Arrays of items** should use FlatList instead of mapping components inside a ScrollView.",
      "**The visible area** is the portion of the page currently on screen.",
      "**Unmounting** removes a rendered item from the interface.",
      {
        text: "**FlatList** tracks the available visible area to optimize rendering.",
        bullets: [
          "**Distant items** are not rendered when they are far outside that area.",
          "**Passed items** can be unmounted after scrolling past them.",
        ],
      },
      "**renderItem** lets FlatList request an item's interface when it is ready to render it.",
    ],
  },
  {
    id: "data-and-render-item",
    heading: "List data and renderItem",
    paragraphs: [
      "**data** supplies the array of items to FlatList.",
      "**renderItem** is a function describing how to render each item.",
      "**The function argument** is an object containing the current item in its item property.",
      "**Destructuring** extracts item directly from that object.",
      "**The return value** is the component used to display that item.",
      "**ShoppingListItem** is the example component that displays an item's name.",
      {
        text: "**This FlatList example** displays the names in shoppingList.",
        block: {
          type: "command",
          label: "FlatList data and item renderer",
          command: `import { FlatList } from "react-native";

const shoppingList = [{ id: "1", name: "Coffee" }];

<FlatList
  data={shoppingList}
  renderItem={({ item }) => (
    <ShoppingListItem name={item.name} />
  )}
/>`,
        },
      },
      "**item.name** passes the current item's name to ShoppingListItem.",
      "**Parentheses after the arrow** return the component without an explicit return statement.",
    ],
  },
  {
    id: "item-keys",
    heading: "Item identity and keyExtractor",
    paragraphs: [
      "**Keys** identify individual items in a list.",
      "**FlatList** automatically uses an item's key or id when one is present.",
      "**The example data** uses id to identify each item.",
      "**ShoppingListItem** therefore needs no separate key prop inside renderItem.",
      "**keyExtractor** supplies a function that generates a unique key when data has neither key nor id.",
    ],
  },
  {
    id: "list-header",
    heading: "ListHeaderComponent and input remounting",
    paragraphs: [
      "**ListHeaderComponent** places a component at the head of a FlatList.",
      "**TextInput** is the input component used as the example list header.",
      "**Remounting** removes a component before mounting it again.",
      "**An inline header function** caused the demonstrated TextInput to remount whenever its value changed.",
      "**The remounted input** closed the keyboard after each change.",
      "**TextInput** is imported from react-native for this example.",
      {
        text: "**The corrected header** passes the TextInput element directly.",
        block: {
          type: "command",
          label: "FlatList header prop",
          command: "ListHeaderComponent={<TextInput />}",
        },
      },
      "**Removing the inline function** stopped the input from remounting on each value change.",
    ],
  },
  {
    id: "sticky-headers",
    heading: "Sticky headers with stickyHeaderIndices",
    paragraphs: [
      "**A sticky header** stays at the top while other content scrolls.",
      "**stickyHeaderIndices** takes an array of numeric indices for the parts that should stay sticky.",
      "**An index** identifies a part by its position.",
      "**Child indices** start at 0.",
      "**Index 0** selects the first part as the sticky header.",
      {
        text: "**stickyHeaderIndices={[0]}** keeps the first ScrollView child at the top while scrolling.",
        block: {
          type: "command",
          label: "Sticky header prop",
          command: "stickyHeaderIndices={[0]}",
        },
      },
      "**TextInput** is the first child at index 0 in this example.",
      "**Text** is the second child at index 1 in this example.",
      "**The Text content** scrolls below the sticky input.",
      "**stickyHeaderIndices** also works with FlatList.",
      "**The example FlatList** uses its TextInput header as the sticky part.",
      "**A white background** prevents scrolling content from showing through the input.",
      {
        text: "**The header input** can use backgroundColor to provide that background.",
        block: {
          type: "command",
          label: "TextInput header background",
          command: '<TextInput style={{ backgroundColor: "white" }} />',
        },
      },
    ],
  },
  {
    id: "empty-lists",
    heading: "Empty lists with ListEmptyComponent",
    paragraphs: [
      "**ListEmptyComponent** defines what FlatList displays when its data array is empty.",
      "**The built-in empty state** replaces a separate check of shoppingList.length before rendering FlatList.",
      "**The example empty state** displays Your shopping list is empty.",
      "**View and Text** are imported from react-native for this example.",
      {
        text: "**This FlatList prop** supplies the empty-state component.",
        block: {
          type: "command",
          label: "FlatList empty-state prop",
          command: `ListEmptyComponent={
  <View style={styles.listEmptyContainer}>
    <Text>Your shopping list is empty</Text>
  </View>
}`,
        },
      },
      "**justifyContent: \"center\"** centers the message vertically inside its container.",
      "**alignItems: \"center\"** centers the message horizontally inside its container.",
      "**marginVertical: 18** adds vertical space around the container.",
      {
        text: "**The empty-state style** combines the demonstrated alignment and spacing.",
        block: {
          type: "command",
          label: "Empty-state container style",
          command: `const styles = StyleSheet.create({
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});`,
        },
      },
      "**An empty data array** makes this placeholder appear.",
    ],
  },
  {
    id: "large-list-rendering",
    heading: "Rendering a large list",
    paragraphs: [
      "**A large test array** makes FlatList's rendering behavior easier to observe.",
      "**new Array(1000)** creates an array with room for 1,000 items.",
      "**fill(null)** fills those positions with null values.",
      "**map** returns an array of item objects.",
      "**The map callback** is the function called for each item.",
      "**The first callback argument** is the null value at each position.",
      "**The second callback argument** is that position's index.",
      {
        text: "**This test data** uses each index for the item's id and name.",
        block: {
          type: "command",
          label: "Large example data array",
          command: `const testData = new Array(1000).fill(null).map((item, index) => ({
  id: index,
  name: index,
}));`,
        },
      },
      "**data={testData}** supplies the large array to FlatList.",
      "**Logging inside renderItem** shows which items FlatList requests for rendering.",
      "**The demonstration** initially rendered 129 of the 1,000 items.",
      "**Taller items** would reduce the number rendered in the demonstration.",
      "**Scrolling** causes additional items to be rendered.",
    ],
  },
  {
    id: "interview-questions",
    heading: "Interview questions",
    paragraphs: ["**Answer each question before opening it.**"],
    blocks: [
      {
        type: "details",
        title: "What is the difference between style and contentContainerStyle props on a ScrollView?",
        paragraphs: [
          "**style** applies styles to the ScrollView container itself.",
          "**contentContainerStyle** applies styles to the scrollable content inside the ScrollView.",
          "**Content padding and margins** belong in contentContainerStyle to prevent overflow issues.",
        ],
      },
      {
        type: "details",
        title: "How can you make specific elements sticky in a ScrollView?",
        paragraphs: [
          "**stickyHeaderIndices** takes an array of indices for the elements that should stay sticky.",
          "**The selected elements** remain at the top of the ScrollView while scrolling.",
        ],
      },
      {
        type: "details",
        title: "How is the stickyHeaderIndices prop configured in a ScrollView?",
        paragraphs: [
          "**stickyHeaderIndices** is placed on the ScrollView component.",
          "**The value** is an array of numeric child indices.",
          "**Indices** start at 0.",
          "**stickyHeaderIndices={[0]}** keeps the first child at the top while scrolling.",
        ],
      },
      {
        type: "details",
        title: "Why might content overflow in a native mobile app without a ScrollView?",
        paragraphs: [
          "**Native mobile apps** do not automatically enable scrolling when content exceeds the screen size.",
          "**ScrollView** explicitly enables scrolling so overflowing content can be reached.",
        ],
      },
      {
        type: "details",
        title: "Why doesn't content automatically scroll in React Native when it overflows the screen?",
        paragraphs: [
          "**React Native views** do not automatically become scrollable when content overflows.",
          "**Web content** can become scrollable automatically when it exceeds the screen.",
          "**ScrollView** replaces a regular View to make its content scrollable.",
        ],
      },
      {
        type: "details",
        title: "What component should be used instead of ScrollView when rendering large lists of items in React Native?",
        paragraphs: [
          "**FlatList** should be used instead of ScrollView for large lists of items.",
          "**FlatList** renders items within or near the visible area.",
          "**Passed items** can be unmounted after scrolling past them.",
          "**This rendering behavior** makes FlatList more optimized for long lists.",
        ],
      },
      {
        type: "details",
        title: "How does FlatList optimize rendering of large lists?",
        paragraphs: [
          "**FlatList** tracks the visible area on the page.",
          "**Nearby items** are rendered within or near that area.",
          "**Distant items** are not rendered far outside that area.",
          "**Passed items** can be unmounted after scrolling past them.",
        ],
      },
      {
        type: "details",
        title: "What two props are required when using a FlatList?",
        paragraphs: [
          "**data** supplies the array of items.",
          "**renderItem** supplies a function defining how to render each item.",
        ],
      },
      {
        type: "details",
        title: "What component can be used in FlatList to display content when the list is empty?",
        paragraphs: [
          "**ListEmptyComponent** supplies the content to render when the data array is empty.",
        ],
      },
      {
        type: "details",
        title: "How does FlatList handle keys for list items?",
        paragraphs: [
          "**FlatList** automatically uses an item's id or key property for its key.",
          "**keyExtractor** supplies unique keys when data has neither property.",
        ],
      },
      {
        type: "details",
        title: "How do you implement a delete function for a shopping list item in React Native?",
        paragraphs: [
          "**filter** creates a new array excluding the item with the matching ID.",
          "**setShoppingList** updates the state with the new array.",
        ],
        code: `const handleDelete = (idToDelete) => {
  const newShoppingList = shoppingList.filter(
    (item) => item.id !== idToDelete,
  );
  setShoppingList(newShoppingList);
};`,
      },
      {
        type: "details",
        title: "How can you dynamically determine if a shopping list item is completed?",
        paragraphs: [
          "**completedAtTimestamp** stores the timestamp for a completed item.",
          "**Boolean(item.completedAtTimestamp)** converts the timestamp value to a completion flag.",
          "**undefined** converts to false for an incomplete item.",
        ],
        code: "const isCompleted = Boolean(item.completedAtTimestamp);",
      },
      {
        type: "details",
        title: "What method is used to toggle the completion status of a shopping list item?",
        paragraphs: [
          "**map()** creates a new shopping list array.",
          "**The matching ID** identifies the item to toggle.",
          "**undefined** replaces the timestamp when the item is currently completed.",
          "**Date.now()** supplies a timestamp when the item is currently incomplete.",
        ],
      },
      {
        type: "details",
        title: "How do you implement a toggle complete function for a shopping list item in React Native?",
        paragraphs: [
          "**handleToggleComplete** takes the ID of the item to toggle.",
          "**map()** iterates through the shopping list array.",
          "**The matching item** is returned as a new object with its completion timestamp toggled.",
          "**Other items** are returned unchanged.",
          "**setShoppingList** updates the state with the new array.",
        ],
        code: `const handleToggleComplete = (id) => {
  const newShoppingList = shoppingList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        completedAtTimestamp: item.completedAtTimestamp
          ? undefined
          : Date.now(),
      };
    }
    return item;
  });
  setShoppingList(newShoppingList);
};`,
      },
      {
        type: "details",
        title: "In React Native, how do you filter an array to remove an item by its ID?",
        paragraphs: [
          "**filter** keeps items whose IDs do not match the ID to delete.",
          "**The returned array** excludes the item with the matching ID.",
        ],
        code: "shoppingList.filter((item) => item.id !== id);",
      },
    ],
  },
];
