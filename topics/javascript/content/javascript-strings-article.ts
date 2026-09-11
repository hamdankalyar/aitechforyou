import type { ArticleSection } from "@/lib/articles";

export const javascriptStringsSections: ArticleSection[] = [
  {
    id: "what-a-string-is", heading: "What a string is",
    paragraphs: [
      "**A string is text.** Any characters between quotes: letters, digits, spaces, punctuation.",
      "**Three kinds of quotes work.** Double \"Ali\", single 'Ali', and backticks `Ali`. Pick one and stay consistent.",
      "**Spaces count.** \"Ali \" with a space at the end is different from \"Ali\".",
    ],
    code: 'const name = "Ali";\nconsole.log(name);        // Ali\nconsole.log("Ali" === "Ali "); // false: the space makes it different',
  },
  {
    id: "length-and-letters", heading: "Length and single letters",
    paragraphs: [
      "**.length counts the characters.** \"super\".length is 5.",
      "**Square brackets pick one character.** name[0] is the first character.",
      "**Counting starts at 0.** The first character is [0], the second is [1]. This surprises everyone once.",
    ],
    code: 'const name = "Ali";\nconsole.log(name.length); // 3\nconsole.log(name[0]);     // A: counting starts at 0\nconsole.log(name[1]);     // l\nconsole.log("super".length); // 5',
  },
  {
    id: "find-text", heading: "Find text inside a string",
    paragraphs: [
      "**A method is an action you can run on a value.** Write the value, a dot, the method name, and parentheses.",
      "**indexOf(\"l\") gives the position** of the first match. If there is no match, it gives -1.",
      "**includes(\"HA\") answers true or false.** Use it when you only need to know if the text is there.",
      "**startsWith(\"AL\") checks the beginning.**",
      "**Searching is case-sensitive.** \"ALOHA\" does not include \"ha\" in lowercase.",
    ],
    code: 'const name = "Ali";\nconsole.log(name.indexOf("l"));        // 1\nconsole.log(name.indexOf("z"));        // -1: not found\n\nconsole.log("ALOHA".includes("HA"));   // true\nconsole.log("ALOHA".includes("ha"));   // false: case matters\nconsole.log("ALOHA".startsWith("AL")); // true\nconsole.log("ALOHA".indexOf("HA"));    // 3',
  },
  {
    id: "join-strings", heading: "Join strings with +",
    paragraphs: [
      "**+ joins two strings** into one longer string.",
      "**Add the space yourself.** \"Hello\" + \"Ali\" gives HelloAli. Put a space inside one of the strings.",
    ],
    code: 'console.log("ALOHA" + "!");          // ALOHA!\nconsole.log("Hello" + "Ali");        // HelloAli\nconsole.log("Hello" + " " + "Ali");  // Hello Ali',
  },
  {
    id: "change-case", heading: "Change the case",
    paragraphs: [
      "**toUpperCase() gives an uppercase copy.** toLowerCase() gives a lowercase copy.",
      "**The original string does not change.** Strings are immutable: once created, a string can never be edited.",
      "**Keep the result by storing it.** Put the copy into a variable, or back into the same variable.",
    ],
    code: 'let name = "Sara";\nconsole.log(name.toUpperCase()); // SARA\nconsole.log(name);               // Sara: unchanged\n\nname = name.toUpperCase();       // store the copy\nconsole.log(name);               // SARA\nconsole.log("ALOHA".toLowerCase()); // aloha',
  },
  {
    id: "split-into-letters", heading: "Split a string into letters",
    paragraphs: [
      "**Array.from(text) makes a list of characters.** A list is called an array in JavaScript. Arrays come later in the course.",
      "**Each character becomes one item.** \"Ali\" becomes a list of three items: A, l, i.",
    ],
    code: 'console.log(Array.from("Ali")); // ["A", "l", "i"]',
  },
  {
    id: "quick-check", heading: "Quick check",
    paragraphs: [],
    code: 'const city = "Lahore";\ncity.toUpperCase();\nconsole.log(city);',
    blocks: [{ type: "quiz", question: "What does this print?", answers: [
      { text: "Lahore", correct: true, explanation: "Correct. toUpperCase() makes an uppercase copy, but the copy is never stored. city still holds Lahore." },
      { text: "LAHORE", correct: false, explanation: "LAHORE was created, but nothing stored it. The original string never changes." },
      { text: "A TypeError", correct: false, explanation: "Nothing tries to change city itself. Calling a method is allowed on a const. The output is Lahore." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "A string is text in quotes. Counting characters starts at 0.",
      "indexOf gives a position or -1. includes gives true or false. Searching is case-sensitive.",
      "String methods return a copy. The original never changes. Store the copy to keep it.",
    ] }],
  },
];
