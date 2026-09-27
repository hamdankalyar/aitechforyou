import type { ArticleSection } from "@/lib/articles";

export const reactNativeViewTextStylingSections: ArticleSection[] = [
  {
    id: "use-view",
    heading: "Use View as a container",
    paragraphs: [
      "**A component** wraps everything in React Native.",
      {
        text: "**Views** are React Native containers.",
        bullets: [
          "**Web equivalent:** A View is the React Native equivalent of a div.",
          "**Usage:** A View is used in the same way as a div.",
          "**Quantity:** A React Native app can contain many View components.",
          "**The name:** View does not mean one large model-view-controller view.",
        ],
      },
      {
        text: "**A View** can wrap a Text component.",
        block: {
          type: "command",
          label: "React Native",
          command: `<View>
  <Text>Coffee</Text>
</View>`,
        },
      },
    ],
  },
  {
    id: "use-text",
    heading: "Render text inside Text",
    paragraphs: [
      {
        text: "**Text components** render text in React Native.",
        bullets: [
          "**Web behavior:** Text can be placed anywhere and still render.",
          "**React Native rule:** All text must always be rendered inside a Text component.",
          "**Error:** Text outside Text causes an error.",
          "**Reason:** React Native renders underlying native UI elements for each platform.",
          "**Platforms:** Text becomes iOS, Android, web, macOS, or tvOS text.",
        ],
      },
    ],
  },
  {
    id: "render-conditionally",
    heading: "Render conditionally without exposing text values",
    paragraphs: [
      {
        text: "**JavaScript truthy and falsy rules** control the AND operator.",
        bullets: [
          "**Truthy first value:** Double ampersand returns the second value.",
          "**Falsy first value:** Double ampersand returns the first value.",
        ],
      },
      {
        text: "**The common cases** return these values to React Native.",
        block: {
          type: "command",
          label: "React Native",
          command: `{true && <Text>Coffee</Text>}         // Text
{false && <Text>Coffee</Text>}        // false
{0 && <Text>Coffee</Text>}            // 0
{"" && <Text>Coffee</Text>}           // ""
{NaN && <Text>Coffee</Text>}          // NaN
{array.length && <Text>Coffee</Text>} // 0 when empty`,
        },
      },
      {
        text: "**React Native** handles the value returned by the AND operator.",
        bullets: [
          "**false:** Nothing renders.",
          "**0:** Zero is returned because it is the first falsy value.",
          "**Zero outside Text:** React Native tries to render it and causes an error.",
          "**Empty string:** The previous error was resolved.",
          "**NaN:** Not a number still causes the error.",
          "**Empty array:** The unsafe array.length expression returns zero.",
        ],
      },
      {
        text: "**The safe form** gives double ampersand a true or false value.",
        bullets: [
          "**Comparison:** array.length greater than zero returns only true or false.",
          "**false:** Nothing renders.",
          "**true:** The Text component is returned.",
        ],
        block: {
          type: "command",
          label: "React Native",
          command: `<View>
  {array.length > 0 && <Text>Coffee</Text>}
</View>`,
        },
      },
    ],
  },
  {
    id: "pass-style-object",
    heading: "Pass styles as a JavaScript object",
    paragraphs: [
      {
        text: "**JavaScript style objects** provide the built-in styling approach.",
        bullets: [
          "**Web similarity:** Built-in React Native styles are very similar to web styles.",
          "**The style prop:** It takes a JavaScript object.",
          "**Inline styles:** They can be written directly on the component.",
          "**CSS syntax:** It is not a valid JavaScript object.",
          "**Converted CSS:** A CSS style will probably work after conversion into a JavaScript object.",
        ],
      },
      {
        text: "**Spacing properties** control margins and paddings.",
        bullets: [
          "**paddingHorizontal:** It replaces separate left and right padding values.",
          "**paddingVertical:** It replaces separate top and bottom padding values.",
          "**Utility styles:** Horizontal and vertical padding are used often.",
        ],
      },
      {
        text: "**The example View** uses inline background and padding styles.",
        block: {
          type: "command",
          label: "React Native",
          command: `<View
  style={{
    backgroundColor: "pink",
    paddingHorizontal: 16,
    paddingVertical: 16,
  }}
>
  <Text>Coffee</Text>
</View>`,
        },
      },
    ],
  },
  {
    id: "understand-flex",
    heading: "Understand the Flexbox defaults",
    paragraphs: [
      {
        text: "**Flexbox** controls React Native styling.",
        bullets: [
          "**Web similarity:** React Native Flexbox is very similar to web Flexbox.",
          "**Different defaults:** React Native differs from the web.",
          "**display flex:** It is the default for every element and never needs to be written.",
          "**flexDirection:** It defaults to column instead of row on the web.",
        ],
      },
    ],
  },
  {
    id: "use-display-points",
    heading: "Use display points instead of pixels",
    paragraphs: [
      {
        text: "**Display points** are the units used by numeric styles.",
        bullets: [
          "**Written unit:** Numeric style values do not include one.",
          "**Meaning:** The numbers are display points instead of pixels.",
          "**Device difference:** A display point changes with pixel density or pixel ratio.",
        ],
      },
      {
        text: "**Pixel ratio** explains how display points map to pixels.",
        bullets: [
          "**A ratio of three:** One display point uses a three-by-three square of pixels.",
          "**Possible densities:** Pixel density can be two, three, or three and a half.",
          "**Images:** A high-end iOS device needs a larger image to look crisp than an older Android device.",
          "**Android devices:** Some can also have a pixel density of three and a half.",
        ],
      },
      "**A border color** does not appear until the border has a width.",
      {
        text: "**The example styles** use display points without unit names.",
        block: {
          type: "command",
          label: "React Native",
          command: `borderBottomWidth: 1,
fontSize: 18,
fontWeight: "200",`,
        },
      },
    ],
  },
  {
    id: "share-a-theme",
    heading: "Share built-in styles through a theme",
    paragraphs: [
      {
        text: "**A shared theme file** holds commonly used built-in styles.",
        bullets: [
          "**File location:** theme.ts is created in the root directory.",
          "**Shared colors:** Cerulean and white can live in the theme file.",
          "**Production projects:** Spacing and font sizes can also live there.",
        ],
      },
      {
        text: "**Global styles** are not available in React Native.",
        bullets: [
          "**Web CSS:** It can apply one style to every H1 element.",
          "**React Native:** It cannot apply a global style that way.",
          "**Shared styles:** A theme file shares them between components.",
        ],
      },
      {
        text: "**Styling alternatives** are available through libraries.",
        bullets: [
          "**Built-in limits:** CSS modules, CSS variables, and Sass are not included.",
          "**NativeWind:** It brings Tailwind-style styling to React Native.",
          "**Web knowledge:** Developers can reuse their Tailwind knowledge with NativeWind.",
          "**The course:** It uses the built-in style object.",
        ],
      },
    ],
  },
  {
    id: "create-a-styles-object",
    heading: "Move styles into StyleSheet.create",
    paragraphs: [
      {
        text: "**StyleSheet.create** organizes built-in styles.",
        bullets: [
          "**Both options:** Inline styles and StyleSheet.create can be used.",
          "**Tidier code:** A separate styles object cleans up the component.",
          "**Common pattern:** The styles object sits at the bottom of each UI file.",
          "**Validation:** StyleSheet.create checks that styles and their types are valid.",
          "**Under the hood:** It does not do anything special.",
        ],
      },
      {
        text: "**Named styles** separate styles by purpose.",
        bullets: [
          "**styles.itemContainer:** It holds the View styles.",
          "**styles.itemText:** It holds the Text styles.",
        ],
      },
      {
        text: "**The component** reads the named styles from the styles object.",
        block: {
          type: "command",
          label: "React Native",
          command: `<View style={styles.itemContainer}>
  <Text style={styles.itemText}>Coffee</Text>
</View>

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: theme.color.cerulean,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
});`,
        },
      },
    ],
  },
];
