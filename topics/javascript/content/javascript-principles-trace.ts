export const principlesSource = [
  "const num = 3;",
  "function multiplyBy2(inputNumber) {",
  "  const result = inputNumber * 2;",
  "  return result;",
  "}",
  "",
  "const output = multiplyBy2(num);",
  "const newOutput = multiplyBy2(10);",
];

export type CallStage = "waiting" | "entered" | "bound" | "calculated" | "returning" | "closed";
type TraceStep = {
  title: string;
  line: number | null;
  points: [string, ...string[]];
  globals: [number | null, number | null, number | null];
  calls: [CallStage, CallStage];
};

// ponytail: a fixed trace of this example; add a parser only if editable tracing is needed.
export const principlesSteps: TraceStep[] = [
  { title: "Ready to trace", line: null,
    points: ["**The board** begins empty.", "**Next step** reveals the first stored value."],
    globals: [null, null, null], calls: ["waiting", "waiting"] },
  { title: "Store the first value", line: 1,
    points: ["**num** receives the number 3.", "**Global memory** now shows num.", "**The thread of execution** follows the code one statement at a time."],
    globals: [3, null, null], calls: ["waiting", "waiting"] },
  { title: "Pass the function definition", line: 2,
    points: ["**multiplyBy2** now appears as a saved function on the board.", "**Hoisting** made this declaration available before line 1.", "**The function body** stays saved without running.", "**The next statement** is the call on line 7."],
    globals: [3, null, null], calls: ["waiting", "waiting"] },
  { title: "Call multiplyBy2(num)", line: 7,
    points: ["**num** evaluates to 3.", "**Parentheses ()** call the saved function.", "**A new execution context** opens for this call.", "**output** waits for the returned value."],
    globals: [3, null, null], calls: ["entered", "waiting"] },
  { title: "Bind the first argument", line: 2,
    points: ["**The argument 3** is assigned to the parameter inputNumber.", "**Local memory** belongs to this function call."],
    globals: [3, null, null], calls: ["bound", "waiting"] },
  { title: "Calculate the first result", line: 3,
    points: ["**inputNumber** reads the local value 3.", "**3 * 2** evaluates to 6.", "**result** receives 6 in local memory."],
    globals: [3, null, null], calls: ["calculated", "waiting"] },
  { title: "Return the value 6", line: 4,
    points: ["**result** evaluates to the number 6.", "**return** sends that value back to the waiting call."],
    globals: [3, null, null], calls: ["returning", "waiting"] },
  { title: "Resume the global context", line: 7,
    points: ["**multiplyBy2(num)** has evaluated to 6.", "**output** receives 6.", "**The first context** closes after returning.", "**The crossed-out box** keeps a historical view of its local memory."],
    globals: [3, 6, null], calls: ["closed", "waiting"] },
  { title: "Call multiplyBy2(10)", line: 8,
    points: ["**10** is the second call's argument.", "**A fresh context** opens for this call.", "**newOutput** waits for its returned value."],
    globals: [3, 6, null], calls: ["closed", "entered"] },
  { title: "Bind the second argument", line: 2,
    points: ["**inputNumber** receives 10 in the new local memory.", "**The first call's values** are not reused."],
    globals: [3, 6, null], calls: ["closed", "bound"] },
  { title: "Calculate the second result", line: 3,
    points: ["**inputNumber** reads the local value 10.", "**10 * 2** evaluates to 20.", "**result** receives 20 in this call's local memory."],
    globals: [3, 6, null], calls: ["closed", "calculated"] },
  { title: "Return the value 20", line: 4,
    points: ["**result** now evaluates to 20.", "**return** sends 20 back to the second call."],
    globals: [3, 6, null], calls: ["closed", "returning"] },
  { title: "Store the second returned value", line: 8,
    points: ["**newOutput** receives 20.", "**The second context** closes after returning.", "**The thread** resumes in the global context."],
    globals: [3, 6, 20], calls: ["closed", "closed"] },
  { title: "The program is complete", line: null,
    points: ["**output** holds 6.", "**newOutput** holds 20.", "**Both function calls** have left the call stack."],
    globals: [3, 6, 20], calls: ["closed", "closed"] },
];

export const callStackSteps = [
  { title: "Before the program starts", line: null, stack: [],
    points: ["**The call stack** starts empty."] },
  { title: "Start the global code", line: 1, stack: ["global"],
    points: ["**The global context** is added when the script starts."] },
  { title: "Push the first function call", line: 7, stack: ["multiplyBy2(3)", "global"],
    points: ["**multiplyBy2(3)** runs at the top of the stack.", "**The global context** waits below it."] },
  { title: "Pop the first function call", line: 7, stack: ["global"],
    points: ["**The first call** leaves the stack after returning 6.", "**Global execution** resumes to store 6 in output."] },
  { title: "Push the second function call", line: 8, stack: ["multiplyBy2(10)", "global"],
    points: ["**multiplyBy2(10)** runs at the top of the stack.", "**The global context** waits below it."] },
  { title: "Pop the second function call", line: 8, stack: ["global"],
    points: ["**The second call** leaves the stack after returning 20.", "**Global execution** resumes to store 20 in newOutput."] },
  { title: "The program is complete", line: null, stack: [],
    points: ["**The global context** leaves the stack when this script finishes.", "**output** holds 6.", "**newOutput** holds 20."] },
];
