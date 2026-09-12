import type { ArticleSection } from "@/lib/articles";

export const javascriptEqualityTruthinessInterviewSections: ArticleSection[] = [
  {
    id: "empty-array-equals-zero", heading: "Interview question: Why is [] == 0 true?",
    paragraphs: [
      "**An array** is a list, written with square brackets. [] is an empty list, and arrays are objects. Objects and arrays are covered in more detail in later lessons.",
      "**A method** is a function attached to a value. Calling valueOf() or toString() asks the value for a result. Functions are covered in a later lesson.",
      { text: "**Answer:** the empty array becomes 0 before the final comparison.", bullets: [
        "**Step 1:** [] is an object and 0 is a primitive number.",
        "**Step 2:** loose equality asks the array for a primitive value.",
        "**Step 3:** [].valueOf() is still an object, so JavaScript tries [].toString(), which produces an empty string.",
        "**Step 4:** the empty string becomes the number 0.",
        "**Final comparison:** 0 == 0 is true.",
      ] },
      "**Strict equality gives false.** [] === 0 performs no conversion, and an object is not a number.",
    ],
    code: 'console.log(JSON.stringify([].toString())); // ""\nconsole.log(Number([])); // 0\nconsole.log([] == 0); // true\nconsole.log([] === 0); // false',
  },
  {
    id: "empty-array-equals-not-array", heading: "Interview question: Why is [] == ![] true?",
    paragraphs: [
      { text: "**Answer:** both sides become 0 during the loose comparison.", bullets: [
        "**The left []** becomes an empty string, then the number 0.",
        "**The right []** is an object, so it is truthy.",
        "**The ! operator** reverses truthy to false.",
        "**Loose equality** converts false to the number 0.",
        "**Final comparison:** 0 == 0 is true.",
      ] },
    ],
    code: 'console.log(Boolean([])); // true\nconsole.log(![]); // false\nconsole.log(Number([])); // 0\nconsole.log([] == ![]); // true',
  },
  {
    id: "object-comparisons", heading: "Interview question: How do objects compare?",
    paragraphs: [
      { text: "**Answer:** two objects are equal only when both sides refer to the same object.", bullets: [
        "**Each []** creates a new array object in memory.",
        "**Object against object** uses the same reference check with == and ===.",
        "**Object against primitive with ==** converts the object to a primitive first.",
      ] },
      { text: "**new Number(5)** creates a number wrapper object.", bullets: [
        "**Its valueOf() method** returns the primitive number 5.",
        "**With == 5,** the wrapper becomes 5, so the comparison is true.",
        "**With === 5,** the object and number have different types, so the comparison is false.",
        "**Use primitive numbers** in application code. Wrapper objects mainly appear in interview questions and older code.",
      ] },
    ],
    code: 'const list = [];\nconsole.log(list === list); // true\nconsole.log([] === []); // false\nconsole.log([] == []); // false\nconsole.log(new Number(5) == 5); // true\nconsole.log(new Number(5) === 5); // false',
  },
  {
    id: "booleans-with-loose-equality", heading: "Interview question: What happens to booleans with ==?",
    paragraphs: [
      { text: "**Answer:** loose equality converts the boolean to a number first.", bullets: [
        "**true** becomes 1.",
        "**false** becomes 0.",
        "**The comparison then continues** using the remaining loose-equality rules.",
      ] },
      "**ToBoolean is different.** == converts a boolean to a number. An if condition converts its value to a boolean.",
    ],
    code: 'console.log(true == 1); // true\nconsole.log(false == 0); // true\nconsole.log("1" == true); // true\nconsole.log("0" == false); // true',
  },
  {
    id: "falsy-values", heading: "Interview question: Which values are falsy?",
    paragraphs: [
      "**Answer:** eight ordinary values become false with ToBoolean.",
      "**Every other ordinary value is truthy.** This includes non-empty strings, empty arrays, empty objects, and functions.",
      "**One browser-only exception exists.** The old document.all value is also falsy for web compatibility.",
    ],
    code: 'console.log(Boolean(false)); // false\nconsole.log(Boolean(0)); // false\nconsole.log(Boolean("")); // false\nconsole.log(Boolean(NaN)); // false\nconsole.log(Boolean([])); // true\nconsole.log(Boolean({})); // true',
    blocks: [{ type: "table", caption: "The eight ordinary falsy values", columns: ["Value", "Why it is falsy"], rows: [
      ["false", "The boolean false"],
      ["0", "Number zero"],
      ["-0", "Negative number zero"],
      ["0n", "BigInt zero"],
      ["\"\"", "Empty string"],
      ["null", "No value"],
      ["undefined", "Missing value"],
      ["NaN", "Invalid numeric result"],
    ] }],
  },
  {
    id: "try-it-yourself", heading: "Run it yourself",
    paragraphs: [
      { text: "**Predict each answer before pressing Run.**", bullets: [
        "**Track the operation:** strict equality, loose equality, or ToBoolean.",
        "**For loose equality,** write each conversion as a separate step.",
      ] },
    ],
    code: 'const value = [];\nconsole.log(value == 0); // true\nconsole.log(value === 0); // false\nconsole.log(Boolean(value)); // true\nconsole.log(!value); // false',
    blocks: [{ type: "quiz", question: "Why does [] == ![] return true?", answers: [
      { text: "Both sides become 0", correct: true, explanation: "Correct. [] becomes an empty string and then 0. ![] becomes false and then 0." },
      { text: "An empty array is falsy", correct: false, explanation: "Every array is an object, and every ordinary object is truthy." },
      { text: "== compares array contents", correct: false, explanation: "Object against object uses identity. In this expression, ! converts the right array to a boolean before == compares the sides." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [],
    blocks: [{ type: "recap", items: [
      "=== compares without conversion. Objects must share the same reference.",
      "== converts booleans to numbers and objects to primitives when its rules require it.",
      "Every ordinary object, including [] and {}, is truthy.",
      "[] == ![] becomes 0 == 0, so the result is true.",
    ] }],
  },
];
