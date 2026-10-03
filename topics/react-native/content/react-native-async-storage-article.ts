import type { ArticleSection } from "@/lib/articles";

export const reactNativeAsyncStorageSections: ArticleSection[] = [
  {
    id: "state-and-persistence",
    heading: "Component state and persistence",
    paragraphs: [
      "**Component state** holds a shopping list in memory.",
      "**Refreshing the app** clears a list kept only in memory.",
      "**Reopening the app** also loses that list.",
      "**Persistence** saves data so it remains available across app launches.",
    ],
  },
  {
    id: "async-storage",
    heading: "AsyncStorage",
    paragraphs: [
      "**AsyncStorage** is the native equivalent of local storage on the web.",
      "**AsyncStorage** is an unsecured key-value store for native mobile applications.",
      "**A key-value store** pairs a key with stored data.",
      "**AsyncStorage calls** are asynchronous.",
      "**await** waits for a storage call's result inside an async function.",
      "**AsyncStorage** used to be part of React Native core.",
      "**The community library** lets AsyncStorage be developed independently of React Native core.",
      {
        text: "**npx expo install** installs the AsyncStorage package.",
        block: {
          type: "command",
          label: "Install AsyncStorage",
          command: "npx expo install @react-native-async-storage/async-storage",
        },
      },
      {
        text: "**AsyncStorage** is the package's default export.",
        block: {
          type: "command",
          label: "Import for the storage utilities",
          command: 'import AsyncStorage from "@react-native-async-storage/async-storage";',
        },
      },
      "**storage.ts** holds the example's utility functions for reading and saving data.",
    ],
  },
  {
    id: "storage-keys",
    heading: "Storage keys and application scope",
    paragraphs: [
      "**A storage key** is a string identifying the address of saved data.",
      "**Application scope** means the stored data belongs to the application using AsyncStorage.",
      "**Other applications** generally cannot access that application's AsyncStorage.",
      "**A unique key** identifies the same data whenever it is used within that application.",
      {
        text: "**shopping-list** is the storage key used in this example.",
        block: {
          type: "command",
          label: "Example storage key",
          command: 'const storageKey = "shopping-list";',
        },
      },
    ],
  },
  {
    id: "serialization",
    heading: "Strings and JSON serialization",
    paragraphs: [
      "**Strings** are text values.",
      "**AsyncStorage values** must be strings.",
      "**Serializable data** can be converted into a string for storage.",
      "**JSON** represents the example's objects as strings.",
      "**JSON.stringify(data)** converts an object into a JSON string.",
      "**JSON.parse(data)** converts that JSON string back into its saved value.",
      "**Arrays** are objects in JavaScript.",
      "**The shopping list example** stores an array using JSON.stringify.",
      "**Plain strings** can also be saved directly.",
      "**The reading approach** depends on how the value was saved.",
      "**The example's reading utility** uses JSON.parse because the saving utility uses JSON.stringify.",
      "**Date objects** cannot be stored directly because AsyncStorage only accepts strings.",
    ],
  },
  {
    id: "saving-data",
    heading: "Saving data with setItem",
    paragraphs: [
      {
        text: "**saveToStorage** is an async utility function with two arguments.",
        bullets: [
          "**key** is the string address for the saved data.",
          "**data** is the object to save.",
        ],
      },
      "**setItem** receives the storage key as its first argument.",
      "**setItem** receives the string to save as its second argument.",
      "**try/catch** handles errors raised while attempting an operation.",
      {
        text: "**The saving utility** converts the object into a string before storing it.",
        block: {
          type: "command",
          label: "storage.ts saving utility",
          command: `export async function saveToStorage(key: string, data: object) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {}
}`,
        },
      },
    ],
  },
  {
    id: "reading-data",
    heading: "Reading data and handling invalid JSON",
    paragraphs: [
      "**getFromStorage** is an async utility function that receives a string key.",
      "**getItem(key)** reads the stored string at that key.",
      "**JSON.parse** runs when stored data is present.",
      "**getFromStorage** returns the parsed value when reading succeeds.",
      "**Missing data** produces a null return value.",
      "**Invalid JSON** can cause a crash if parsing is not protected by try/catch.",
      "**Caught errors** also produce a null return value in this utility.",
      {
        text: "**The reading utility** protects both the storage read and JSON parsing.",
        block: {
          type: "command",
          label: "storage.ts reading utility",
          command: `export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}`,
        },
      },
    ],
  },
  {
    id: "loading-initial-data",
    heading: "Loading initial data with useEffect",
    paragraphs: [
      "**useEffect** is a React hook used here to fetch initial data when a component loads.",
      {
        text: "**useEffect** receives two arguments in this example.",
        bullets: [
          "**The first argument** is an arrow function containing the effect's work.",
          "**The second argument** is an empty array.",
        ],
      },
      "**The empty array** makes this effect run once when the component loads.",
      "**The effect's function** cannot itself be async.",
      "**An async function** inside the effect performs the asynchronous storage read.",
      "**fetchInitial** is the name of that inner function in this example.",
      "**setShoppingList(data)** restores the saved array into component state when data is present.",
      "**Fire and forget** means calling the async function without waiting for it inside the effect.",
      {
        text: "**fetchInitial()** starts the storage read from the synchronous effect.",
        block: {
          type: "command",
          label: "Initial loading inside a React component",
          command: `useEffect(() => {
  const fetchInitial = async () => {
    const data = await getFromStorage(storageKey);
    if (data) {
      setShoppingList(data);
    }
  };

  fetchInitial();
}, []);`,
        },
      },
    ],
  },
  {
    id: "saving-updates",
    heading: "Keeping stored data in sync with state",
    paragraphs: [
      {
        text: "**List changes** must also update AsyncStorage.",
        bullets: [
          "**Adding an item** saves the list containing the new item.",
          "**Deleting an item** saves the list without that item.",
          "**Toggling completion** saves the changed completion status.",
        ],
      },
      "**newShoppingList** is the updated array produced by one of these changes.",
      "**setShoppingList** updates the array held in component state.",
      {
        text: "**saveToStorage** saves the same updated array under the storage key.",
        block: {
          type: "command",
          label: "After creating the updated array in a list handler",
          command: `setShoppingList(newShoppingList);
saveToStorage(storageKey, newShoppingList);`,
        },
      },
      "**The saved list** preserves its items and completion status after a reload.",
    ],
  },
  {
    id: "review-questions",
    heading: "Review questions",
    paragraphs: [],
    blocks: [
      {
        type: "details",
        title: "What is AsyncStorage in React Native and how is it similar to web local storage?",
        paragraphs: [
          "**AsyncStorage** is a key-value store for native mobile applications.",
          "**Web local storage** is similar to AsyncStorage.",
          "**AsyncStorage calls** are all asynchronous.",
          "**Persistent storage** keeps data across app launches.",
          "**Application scope** limits stored data to a specific application.",
        ],
      },
      {
        type: "details",
        title: "What type of data can be stored in AsyncStorage?",
        paragraphs: [
          "**AsyncStorage** can only store strings.",
          "**JSON.stringify()** converts complex objects into strings before storing them.",
          "**JSON.parse()** converts stored JSON strings back into values when retrieving them.",
          "**Date objects** cannot be stored directly in AsyncStorage.",
        ],
      },
      {
        type: "details",
        title: "How do you handle asynchronous operations inside a synchronous useEffect hook?",
        paragraphs: [
          "**An async function** can be defined inside the effect's function.",
          "**The inner function** is invoked immediately after it is defined.",
          "**The effect's function** remains synchronous.",
        ],
      },
      {
        type: "details",
        title: "What are the two primary utility functions needed when working with AsyncStorage?",
        paragraphs: [
          {
            text: "**getFromStorage** retrieves saved data using a key.",
            bullets: [
              "**JSON.parse()** converts the stored JSON string back into a value.",
            ],
          },
          {
            text: "**saveToStorage** saves data using a key.",
            bullets: [
              "**JSON.stringify()** converts the data into a string for storage.",
            ],
          },
          "**Both utility functions** are asynchronous.",
        ],
      },
      {
        type: "details",
        title: "What security considerations exist with AsyncStorage?",
        paragraphs: [
          "**AsyncStorage** is an unsecured key-value store.",
          "**Sensitive data** such as passwords or tokens should not be stored in AsyncStorage.",
          "**Application scope** normally prevents one app from accessing another app's AsyncStorage.",
          "**Jailbroken devices** can bypass this application boundary.",
          "**More secure storage solutions** should be used for sensitive data.",
        ],
      },
    ],
  },
];
