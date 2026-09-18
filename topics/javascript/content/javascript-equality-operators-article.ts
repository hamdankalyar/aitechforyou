import type { ArticleSection } from "@/lib/articles";

export const javascriptEqualityOperatorsSections: ArticleSection[] = [
  {
    id: "loose-equality", heading: "The equality operator ==",
    paragraphs: [
      { text: "**A comparison operator** asks a question about two values:", bullets: [
        "**Operands** are the values on either side.",
        "**The answer** is a boolean: true or false.",
      ] },
      { text: "**== checks loose equality:**", bullets: [
        "**Type coercion** means automatically converting a value to another type for an operation.",
      ] },
      { text: "**JavaScript checks the type of each value** to choose a conversion rule for ==.", bullets: [], info: {
        type: "details", icon: "info", title: "How does == decide?", paragraphs: [
          "**Start with the two types.** For 5 == \"5\", JavaScript sees a number and a string (text).",
          "**Same type?** Compare using === without conversion.",
          "**null and undefined?** This special pair gives true.",
          "**Number and string?** Convert the string to a number. 5 == \"5\" becomes 5 == 5.",
          "**Boolean with another type?** Convert true to 1 or false to 0, then check the types again.",
          "**Object with a number, string, BigInt, or Symbol?** Convert the object to a primitive (a non-object value), then check the types again.",
          "**BigInt and string?** Read the string as a BigInt. Invalid integer text gives false.",
          "**BigInt and number?** Compare their numeric values. NaN, Infinity, and -Infinity give false.",
          "**Browser exception:** document.all loosely equals null or undefined.",
          "**No matching rule?** Return false. For example, null == 0 is false.",
          "**Example: true == \"1\".** The boolean becomes 1, leaving 1 == \"1\".",
          "**Next check:** The string becomes 1, leaving 1 == 1.",
          "**Final check:** Both numbers match, so the result is true.",
        ],
      } },
      { text: "**Examples:**", bullets: [
        "**5 == 5** is true. The numbers match.",
        "**5 == 6** is false. The numbers differ.",
        "**5 == \"5\"** is true. JavaScript converts the string (text) \"5\" to the number 5 for this comparison.",
      ] },
    ],
    code: 'console.log(5 == 5); // true\nconsole.log(5 == 6); // false\nconsole.log(5 == "5"); // true',
  },
  {
    id: "strict-equality", heading: "The strict equality operator ===",
    paragraphs: [
      { text: "**=== compares without type coercion.** Notice the three equals signs:", bullets: [
        "**Different types** always give false.",
        "**The values must match too.** 5 === 6 is false, even though both values are numbers.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 === 5** is true. Both operands are the same number.",
        "**5 === \"5\"** is false. A number and a string have different types.",
        "**\"5\" === \"5\"** is true. Both operands are the same string.",
        "**5 === 6** is false. The types match, but the values differ.",
      ] },
      "**Comparing different types is allowed.** It returns false without throwing an error or changing either value.",
      "**Prefer ===** for equality checks without automatic conversion.",
    ],
    code: 'console.log(5 === 5); // true\nconsole.log(5 === "5"); // false\nconsole.log("5" === "5"); // true\nconsole.log(5 === 6); // false',
  },
  {
    id: "loose-inequality", heading: "The inequality operator !=",
    paragraphs: [
      { text: "**!= asks, \"Are these values different?\"**", bullets: [
        "**Type conversion** works the same way as with == before answering the question.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 != 5** is false, meaning \"No, they are not different.\" Both numbers are 5.",
        "**5 != 6** is true, meaning \"Yes, they are different.\" One number is 5 and the other is 6.",
        "**5 != \"5\"** is false. JavaScript converts \"5\" to 5, so it compares 5 with 5.",
      ] },
    ],
    code: 'console.log(5 != 5); // false\nconsole.log(5 != 6); // true\nconsole.log(5 != "5"); // false',
  },
  {
    id: "strict-inequality", heading: "The strict inequality operator !==",
    paragraphs: [
      { text: "**!== asks, \"Are these values different?\"**", bullets: [
        "**No conversion happens.** A number stays a number, and a string stays a string.",
      ] },
      { text: "**Examples:**", bullets: [
        "**5 !== 5** is false, meaning \"No, they are not different.\" Both are the number 5.",
        "**5 !== \"5\"** is true, meaning \"Yes, they are different.\" One is a number and the other is a string (text).",
        "**5 !== 6** is true, meaning \"Yes, they are different.\" Both are numbers, but 5 and 6 are different values.",
      ] },
    ],
    code: 'console.log(5 !== 5); // false\nconsole.log(5 !== "5"); // true\nconsole.log(5 !== 6); // true',
  },
  {
    id: "surprising-comparisons", heading: "A few comparisons to watch for",
    paragraphs: [
      { text: "**false becomes 0** in a loose comparison with a number:", bullets: [
        "**0 == false** is true because of conversion.",
        "**0 === false** is false because the types differ.",
      ] },
      { text: "**null and undefined** are a special loose-equality pair:", bullets: [
        "**null == undefined** is true.",
        "**null === undefined** is false. Strict equality keeps them distinct.",
      ] },
      { text: "**NaN means Not-a-Number.** It is a special number value for an invalid numeric result:", bullets: [
        "**Number(\"hello\")** gives NaN because the text \"hello\" cannot become a number.",
        "**NaN == NaN** is false.",
        "**NaN === NaN** is also false.",
        "**NaN !== NaN** is true because it reverses the strict equality result.",
      ] },
      { text: "**NaN is a value, not a function.** A function is an action you call using parentheses:", bullets: [
        "**NaN(8) and NaN(\"hello\")** throw a TypeError. You cannot call the value NaN.",
        "**isNaN(value)** is the built-in function for checking whether a value becomes NaN after number conversion. Use this exact spelling.",
      ] },
      { text: "**isNaN asks, \"Does converting this value to a number give NaN?\"**", bullets: [
        "**isNaN(8)** gives false. No, 8 is already a number and is not NaN.",
        "**isNaN(\"hello\")** gives true. Yes, converting \"hello\" to a number gives NaN.",
        "**Use it before a calculation** to detect text such as \"hello\" that cannot become a number.",
        "**An empty string is a catch.** isNaN(\"\") gives false because JavaScript converts empty text to 0. Check for missing input separately.",
      ] },
    ],
    code: 'console.log(0 == false); // true\nconsole.log(0 === false); // false\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false\nconsole.log(NaN == NaN); // false\nconsole.log(NaN === NaN); // false\nconsole.log(NaN !== NaN); // true\nconsole.log(Number("hello")); // NaN\nconsole.log(isNaN(8)); // false\nconsole.log(isNaN("hello")); // true',
  },
  {
    id: "interview-questions", heading: "Interview questions",
    paragraphs: [
      "**Answer each question before opening it.**",
    ],
    blocks: [
      { type: "details", title: "What is the difference between == and ===?", paragraphs: [
        "**==** can convert a value before comparing it.",
        "**===** compares the type and the value without conversion.",
      ] },
      { type: "details", title: "What is the difference between != and !==?", paragraphs: [
        "**!=** can convert a value before deciding whether the values differ.",
        "**!==** checks whether the type or value differs without conversion.",
      ] },
      { type: "details", title: "Why do developers usually prefer ===?", paragraphs: [
        "**===** avoids unexpected results from automatic type conversion.",
        "**Use ==** only when its conversion rule is deliberately needed.",
      ] },
      { type: "details", title: "Why does 5 == \"5\" return true?", paragraphs: [
        "**Types.** JavaScript sees a number and a string.",
        "**Conversion.** Loose equality converts the string \"5\" to the number 5.",
        "**Result.** JavaScript compares 5 == 5 and returns true.",
      ] },
      { type: "details", title: "What do 0 == false and 0 === false return?", paragraphs: [
        "**0 == false** returns true because false converts to 0.",
        "**0 === false** returns false because a number and a boolean have different types.",
      ] },
      { type: "details", title: "Why does null == undefined return true?", paragraphs: [
        "**Special rule.** == has a special rule for null and undefined.",
        "**Result.** JavaScript returns true when one side is null and the other is undefined.",
        "**No conversion.** JavaScript does not convert either value.",
      ] },
      { type: "details", title: "Why does null === undefined return false?", paragraphs: [
        "**Strict equality.** === does not use the special loose-equality rule.",
        "**typeof null.** typeof null returns \"object\" because of a historical JavaScript behavior.",
        "**typeof undefined.** typeof undefined returns \"undefined\".",
        "**Language types.** Null and Undefined are distinct language types, so strict equality returns false.",
      ] },
      { type: "details", title: "Why does [] == 0 return true?", paragraphs: [
        "**Array object.** An empty array is an object.",
        "**First conversion.** JavaScript converts [] to the empty string \"\".",
        "**Second conversion.** JavaScript converts \"\" to the number 0.",
        "**Result.** JavaScript compares 0 == 0 and returns true.",
      ] },
      { type: "details", title: "Why does an empty object == 0 return false?", paragraphs: [
        "**Object conversion.** JavaScript converts an empty object to \"[object Object]\".",
        "**Number conversion.** \"[object Object]\" cannot become a number, so JavaScript gets NaN.",
        "**Result.** NaN == 0 is false.",
      ] },
      { type: "details", title: "Why do {} == {} and [] == {} return false?", paragraphs: [
        "**Objects.** Both sides are objects.",
        "**References.** JavaScript compares object references when both values are objects.",
        "**Result.** Separately created objects have different references, so each comparison returns false.",
      ] },
      { type: "details", title: "Why does [] == ![] return true?", paragraphs: [
        "**Truthy array.** An array is truthy, so ![] becomes false.",
        "**Boolean conversion.** false becomes 0 for loose equality.",
        "**Array conversion.** [] becomes \"\", and \"\" becomes 0.",
        "**Result.** JavaScript compares 0 == 0 and returns true.",
      ] },
      { type: "details", title: "What do truthy and falsy mean?", paragraphs: [
        "**Truthy values.** JavaScript treats truthy values as true in a condition.",
        "**Falsy values.** JavaScript treats falsy values as false in a condition.",
        "**Arrays and objects.** Arrays and objects are truthy, even when empty.",
        "**Negation.** ! reverses a truthy or falsy value.",
      ] },
      { type: "details", title: "Why is NaN not equal to itself?", paragraphs: [
        "**NaN says:** \"I tried to make a number, but there is no valid numeric answer.\"",
        "**Failure marker.** NaN is a failure marker, not a valid numeric answer.",
        "**Comparison.** JavaScript must not claim that two failed calculations have the same numeric value.",
        "**Result.** NaN == NaN and NaN === NaN both return false.",
        "**Number.isNaN(value)** checks whether a value is NaN without converting it first.",
      ] },
    ],
  },
  {
    id: "try-it-yourself", heading: "Run it yourself",
    paragraphs: [
      { text: "**Start with a number and a string:**", bullets: [
        "**Run the code** and read the four answers.",
        "**Remove the quotes** around \"5\" in typedScore to make it a number.",
        "**Predict which answers change,** then run again.",
      ] },
    ],
    code: 'const score = 5;\nconst typedScore = "5";\nconsole.log(score == typedScore); // true\nconsole.log(score === typedScore); // false\nconsole.log(score != typedScore); // false\nconsole.log(score !== typedScore); // true',
    blocks: [{ type: "quiz", question: 'What does 5 !== "5" return?', answers: [
      { text: "true", correct: true, explanation: "Correct. Strict inequality returns true because the number and the string have different types." },
      { text: "false", correct: false, explanation: "That is the result of 5 != \"5\". The strict operator !== does not convert the string." },
      { text: "TypeError", correct: false, explanation: "Comparing a number with a string is allowed. Strict inequality returns a boolean." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "== and != use loose-equality conversion rules.",
      "=== and !== compare without type coercion.",
      "!= is the opposite of ==. !== is the opposite of ===.",
      "NaN is not equal to itself with either equality operator.",
    ] }],
  },
];
