import type { CallStage } from "./javascript-principles-trace";

export const closureSource = [
  "function createFunction() {",
  "  function multiplyBy2(num) {",
  "    return num * 2;",
  "  }",
  "  return multiplyBy2;",
  "}",
  "",
  "const generatedFunc = createFunction();",
  "const result = generatedFunc(3); // 6",
];

type ClosureStep = {
  title: string;
  line: number | null;
  points: string[];
  outer: "waiting" | "entered" | "defined" | "returning" | "closed";
  inner: CallStage;
  generated: boolean;
  result: number | null;
};

// shortcut: this traces the fixed lesson example, add editable tracing only if requested.
export const closureSteps: ClosureStep[] = [
  { title: "Ready to trace", line: null, outer: "waiting", inner: "waiting", generated: false, result: null,
    points: ["**The board** begins empty.", "**Next step** follows the supplied returned-function example."] },
  { title: "Save createFunction", line: 1, outer: "waiting", inner: "waiting", generated: false, result: null,
    points: ["**createFunction** refers to the saved outer function.", "**Hoisting** makes this declaration available before the statements run.", "**The function body** waits for a call."] },
  { title: "Call createFunction()", line: 8, outer: "entered", inner: "waiting", generated: false, result: null,
    points: ["**Parentheses ()** call createFunction.", "**A new execution context** opens with its own local memory.", "**createFunction()** goes above global on the call stack.", "**generatedFunc** waits for the returned value."] },
  { title: "Create the inner function", line: 2, outer: "defined", inner: "waiting", generated: false, result: null,
    points: ["**multiplyBy2** refers to the inner function created for this outer call.", "**The nested declaration** is available before the outer body's statements run.", "**Its body** has not run yet.", "**The function symbol ƒ₂** identifies this function object on the board."] },
  { title: "Return the function reference", line: 5, outer: "returning", inner: "waiting", generated: false, result: null,
    points: ["**multiplyBy2** evaluates to the function itself.", "**return multiplyBy2** sends that function reference to the caller.", "**No parentheses** means multiplyBy2 is not called here.", "**The returned value** is a function rather than the number 6."] },
  { title: "Store the returned function", line: 8, outer: "closed", inner: "waiting", generated: true, result: null,
    points: ["**generatedFunc** now refers to the same function object shown as ƒ₂.", "**createFunction()** leaves the call stack.", "**The crossed-out context** is a historical view of that finished call.", "**The returned function** remains reachable through generatedFunc."] },
  { title: "Call generatedFunc(3)", line: 9, outer: "closed", inner: "entered", generated: true, result: null,
    points: ["**generatedFunc(3)** calls the returned multiplyBy2 function.", "**A fresh execution context** opens for this call.", "**result** waits for its returned value.", "**createFunction** is not called again."] },
  { title: "Bind num to 3", line: 2, outer: "closed", inner: "bound", generated: true, result: null,
    points: ["**num** is the returned function's parameter.", "**The argument 3** is assigned to num in this call's local memory.", "**The highlighted definition** shows the code being run through generatedFunc."] },
  { title: "Calculate 3 * 2", line: 3, outer: "closed", inner: "calculated", generated: true, result: null,
    points: ["**num** reads the local value 3.", "**3 * 2** evaluates to 6.", "**This expression** does not declare a local result variable."] },
  { title: "Return 6", line: 3, outer: "closed", inner: "returning", generated: true, result: null,
    points: ["**return num * 2** sends 6 back to the waiting caller.", "**The global result** still waits for the call to finish."] },
  { title: "Store result in global memory", line: 9, outer: "closed", inner: "closed", generated: true, result: 6,
    points: ["**result** receives 6 in global memory.", "**generatedFunc(3)** leaves the call stack.", "**generatedFunc** still refers to the returned function.", "**createFunction** ran only once in this program."] },
  { title: "The program is complete", line: null, outer: "closed", inner: "closed", generated: true, result: 6,
    points: ["**result** holds 6.", "**The call stack** is empty.", "**Returning a function** preserves the function object rather than rerunning its creator.", "**Captured outer variables** are demonstrated by the counter below."] },
];
