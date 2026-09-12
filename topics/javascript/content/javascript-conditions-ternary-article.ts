import type { ArticleSection } from "@/lib/articles";

export const javascriptConditionsTernarySections: ArticleSection[] = [
  {
    id: "if-and-else", heading: "if, else if, and else: choose what runs",
    paragraphs: [
      { text: "**Each condition asks a yes-or-no question:**", bullets: [
        "**if** checks the first condition.",
        "**else if** checks another condition only when every earlier condition was false.",
        "**else** runs when none of the conditions were true.",
      ] },
      "**Only the first matching branch runs.** When a condition is true, JavaScript skips the remaining else if and else branches.",
      "**Try it:** Change score from 7 to 9. \"Excellent\" prints, and the other branches are skipped.",
    ],
    code: 'const score = 7;\nif (score >= 8) {\n  console.log("Excellent");\n} else if (score >= 5) {\n  console.log("Passed"); // Passed\n} else {\n  console.log("Try again");\n}',
  },
  {
    id: "truthy-and-falsy", heading: "Truthy and falsy: values can be conditions",
    paragraphs: [
      { text: "**A value can be used as the condition:**", bullets: [
        "**Truthy** means the if code runs. Examples: 7 and \"hello\".",
        "**Falsy** means the if code is skipped. Common values: false, 0, -0, 0n, \"\", null, undefined, and NaN.",
        "**\"false\" is truthy** because it is text that is not empty. It is different from false without quotes.",
      ] },
      "**Try it:** Change false to \"false\". The third message now runs because non-empty text is truthy.",
    ],
    code: 'if (2) {\n  console.log("2 runs"); // 2 runs\n}\nif (3) {\n  console.log("3 runs"); // 3 runs\n}\nif (false) {\n  console.log("The third message runs");\n}',
  },
  {
    id: "logical-and", heading: "AND && both checks must pass",
    paragraphs: [
      "**To enter,** you need a ticket AND the doors must be open.",
      "**true && false** gives false. Having a ticket is not enough when the doors are closed.",
      "**&& checks the left value first.** If it is falsy, JavaScript stops there and gives back that value. 0 && \"Welcome\" gives 0.",
      "**If the left value is truthy,** JavaScript moves to the right and gives back that value. true && \"Welcome\" gives \"Welcome\".",
      "**Try it:** Change doorsOpen to true. The first answer becomes true.",
    ],
    code: 'const hasTicket = true;\nconst doorsOpen = false;\nconsole.log(hasTicket && doorsOpen); // false\nconsole.log(0 && "Welcome"); // 0\nconsole.log(true && "Welcome"); // Welcome',
  },
  {
    id: "logical-or", heading: "OR || at least one check must pass",
    paragraphs: [
      "**To enter,** you can be a member OR have a guest pass. Both is fine too.",
      "**false || true** gives true. The guest pass is enough.",
      "**|| keeps the left value if it is truthy.** Otherwise, it gives back the right value.",
      "**\"\" || \"Guest\"** gives \"Guest\" because the first text is empty.",
      "**Try it:** Change hasGuestPass to false. With neither option, the first answer becomes false.",
    ],
    code: 'const isMember = false;\nconst hasGuestPass = true;\nconsole.log(isMember || hasGuestPass); // true\nconsole.log("" || "Guest"); // Guest',
  },
  {
    id: "logical-not", heading: "NOT ! give the opposite answer",
    paragraphs: [
      "**!true** gives false.",
      "**!false** gives true.",
      "**!isClosed** asks, \"Is it NOT closed?\"",
      "**!0** gives true because 0 is falsy.",
      "**!\"false\"** gives false because the text is truthy.",
      "**Try it:** Change isClosed to true. !isClosed now gives false.",
    ],
    code: 'const isClosed = false;\nconsole.log(!isClosed); // true\nconsole.log(!0); // true\nconsole.log(!"false"); // false',
    blocks: [{ type: "table", caption: "AND, OR, and NOT with booleans", columns: ["a", "b", "a && b", "a || b", "!a"], rows: [
      ["true", "true", "true", "true", "false"],
      ["true", "false", "false", "true", "false"],
      ["false", "true", "false", "true", "true"],
      ["false", "false", "false", "false", "true"],
    ] }],
  },
  {
    id: "ternary", heading: "Ternary ? : chooses one of two values",
    paragraphs: [
      { text: "**score >= 5 ? \"Passed\" : \"Try again\"** chooses a message:", bullets: [
        "**score >= 5** asks whether the score is 5 or more.",
        "**? \"Passed\"** is the value to use when the answer is yes.",
        "**: \"Try again\"** is the value to use when the answer is no.",
      ] },
      "**result** stores the chosen message. Only the chosen side runs.",
      "**Use a ternary** to choose a value. Use if/else when you need to run several lines of code.",
      "**Try it:** Change score to 3. The result becomes \"Try again\".",
    ],
    code: 'const score = 7;\nconst result = score >= 5 ? "Passed" : "Try again";\nconsole.log(result); // Passed',
  },
  {
    id: "try-it-yourself", heading: "Run it yourself",
    paragraphs: [
      { text: "**Show a lesson when both requirements pass:**", bullets: [
        "**isMember || hasTrial:** the person is a member or has a trial.",
        "**!isBlocked:** the person is not blocked.",
      ] },
      "**Parentheses** group the member-or-trial check before combining it with &&.",
      "**Try it:** Change isBlocked to true. The message becomes \"No access\".",
    ],
    code: 'const isMember = false;\nconst hasTrial = true;\nconst isBlocked = false;\nconst canView = (isMember || hasTrial) && !isBlocked;\nconsole.log(canView); // true\nconsole.log(canView ? "Show lesson" : "No access"); // Show lesson',
    blocks: [{ type: "quiz", question: "What does true && false give?", answers: [
      { text: "false", correct: true, explanation: "Both checks must be true. The second is false, so the answer is false." },
      { text: "true", correct: false, explanation: "One true check is not enough for AND. Both must be true." },
      { text: "SyntaxError", correct: false, explanation: "This is valid JavaScript. The answer is false." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**if, else if, and else** run only the first matching branch.",
      "**Truthy and falsy values** decide whether conditional code runs.",
      "**&&, ||, and !** combine or reverse conditions.",
      "**? :** chooses a value based on a condition.",
    ],
  },
];
