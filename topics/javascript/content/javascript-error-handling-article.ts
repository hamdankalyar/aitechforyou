import type { ArticleSection } from "@/lib/articles";

export const javascriptErrorHandlingSections: ArticleSection[] = [
  {
    id: "try-and-catch", heading: "Try code that might fail",
    paragraphs: [
      "**An error** is a problem that stops normal JavaScript code.",
      "**try** holds code that might cause an error.",
      "**catch** runs when code inside try causes an error.",
      "**The error parameter** stores information about the error.",
      { text: "**This example** catches an error instead of stopping the whole program.", code: 'try {\n  console.log("Before the error");\n  throw new Error("Something went wrong");\n  console.log("After the error"); // Does not print\n} catch (error) {\n  console.log(error.message); // Something went wrong\n}' },
    ],
  },
  {
    id: "errors-skip-lines", heading: "An error skips the remaining try lines",
    paragraphs: [
      "**An error inside try** stops the remaining lines in that try block.",
      "**JavaScript jumps to catch** after the error happens.",
      "**The line after throw** does not print in the previous example.",
    ],
  },
  {
    id: "throw-your-own-error", heading: "Throw your own error",
    paragraphs: [
      "**throw** creates an error when your code finds a problem.",
      "**new Error(message)** creates an Error object with your message.",
      "**Use throw** when your program cannot continue with the current value.",
      { text: "**This function** throws an error when age is too small.", code: 'function enter(age) {\n  if (age < 18) throw new Error("You must be 18.");\n  return "Welcome";\n}\n\ntry {\n  console.log(enter(16));\n} catch (error) {\n  console.log(error.message); // You must be 18.\n}' },
    ],
  },
  {
    id: "error-name-and-message", heading: "Read the error details",
    paragraphs: [
      "**error.name** gives the kind of error.",
      "**error.message** gives the description you wrote for the error.",
      "**TypeError** is one kind of JavaScript error.",
      { text: "**This example** prints an error's name and message.", code: 'try {\n  throw new TypeError("Name must be text.");\n} catch (error) {\n  console.log(error.name);    // TypeError\n  console.log(error.message); // Name must be text.\n}' },
    ],
  },
  {
    id: "finally", heading: "Run code at the end",
    paragraphs: [
      "**finally** runs after try and catch finish.",
      "**finally** runs whether the code succeeds or an error happens.",
      "**Use finally** for cleanup that must always happen.",
      { text: "**This example** prints the cleanup message after the caught error.", code: 'try {\n  throw new Error("No connection");\n} catch (error) {\n  console.log(error.message); // No connection\n} finally {\n  console.log("Cleaning up."); // Cleaning up.\n}' },
    ],
  },
  {
    id: "error-stack", heading: "See where an error came from",
    paragraphs: [
      "**error.stack** often shows the code locations that led to an error.",
      "**The stack text** can look different in different browsers.",
      "**You can ignore error.stack** until you need to find the source of a bug.",
    ],
  },
  {
    id: "quick-check", heading: "Run it yourself",
    paragraphs: [
      "**Press Run** and read the error name and message.",
      "**Change 0 to 2** and run it again.",
      "**Reset** restores the example.",
    ],
    code: 'function divide(a, b) {\n  if (b === 0) throw new Error("Cannot divide by zero.");\n  return a / b;\n}\n\ntry {\n  console.log(divide(12, 0));\n} catch (error) {\n  console.log(error.name);    // Error\n  console.log(error.message); // Cannot divide by zero.\n}',
    blocks: [{ type: "quiz", question: "What happens after an error inside try?", answers: [
      { text: "JavaScript skips to catch", correct: true, explanation: "The remaining try lines do not run after the error." },
      { text: "JavaScript keeps running every try line", correct: false, explanation: "An error stops the rest of that try block." },
      { text: "JavaScript runs finally before catch", correct: false, explanation: "catch handles the error before finally runs." },
    ] }],
  },
  {
    id: "take-it-with-you", heading: "Remember",
    paragraphs: [
      "**try** holds code that might fail.",
      "**catch** handles an error from try.",
      "**throw new Error()** creates your own error.",
      "**finally** runs after try and catch.",
    ],
  },
];
