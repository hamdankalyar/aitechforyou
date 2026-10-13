import type { CopyArrayStep } from "./javascript-copy-array-trace";
import type { CallStage } from "./javascript-principles-trace";

export const callbackArraySource = [
  "function copyArrayAndManipulate(array, instructions) {",
  "  const output = [];",
  "  for (let i = 0; i < array.length; i++) {",
  "    output.push(instructions(array[i]));",
  "  }",
  "  return output;",
  "}",
  "",
  "function multiplyBy2(input) { return input * 2; }",
  "const result = copyArrayAndManipulate([1, 2, 3], multiplyBy2);",
];

type CallbackArrayStep = CopyArrayStep & { callbacks: [CallStage, CallStage, CallStage] };
const waiting: CallbackArrayStep["callbacks"] = ["waiting", "waiting", "waiting"];

// ponytail: a fixed trace of the supplied example; add a parser only for editable tracing.
export const callbackArraySteps: CallbackArrayStep[] = [
  { title: "Ready to trace callbacks", line: null, stage: "global", output: null, index: null, thread: "", callbacks: waiting,
    points: ["**The board** begins empty.", "**Next step** follows the callback example."] },
  { title: "Save copyArrayAndManipulate", line: 1, stage: "global", output: null, index: null, thread: "", callbacks: waiting,
    points: ["**copyArrayAndManipulate** refers to a saved function.", "**Hoisting** makes both function declarations available before statements run.", "**The function body** waits for a call."] },
  { title: "Save multiplyBy2", line: 9, stage: "global", output: null, index: null, thread: "", callbacks: waiting,
    points: ["**multiplyBy2** refers to the function that doubles its input.", "**The function definition** does not run its body."] },
  { title: "Call the higher order function", line: 10, stage: "entered", output: null, index: null, thread: "Enter function", callbacks: waiting,
    points: ["**[1, 2, 3]** is the first argument.", "**multiplyBy2 without ()** passes the function as the second argument.", "**copyArrayAndManipulate** opens a new execution context.", "**result** remains uninitialized while the call runs."] },
  { title: "Bind array and instructions", line: 1, stage: "bound", output: null, index: null, thread: "Bind both arguments", callbacks: waiting,
    points: ["**array** receives the input array reference.", "**instructions** receives the multiplyBy2 function reference.", "**Both function names** refer to the same saved function.", "**The function code** is not copied or renamed."] },
  { title: "Create output", line: 2, stage: "bound", output: [], index: null, thread: "output = []", callbacks: waiting,
    points: ["**output** refers to a new empty array."] },
  { title: "Start the loop", line: 3, stage: "loop", output: [], index: 0, thread: "let i = 0", callbacks: waiting,
    points: ["**i** starts at 0 in the loop's block scope."] },
];

// Each iteration follows the same call, return, and push sequence.
for (const index of [0, 1, 2]) {
  const input = index + 1;
  const value = input * 2;
  const output = [2, 4, 6].slice(0, index);
  const calls = (stage: CallStage): CallbackArrayStep["callbacks"] => [0, 1, 2].map(call => call < index ? "closed" : call === index ? stage : "waiting") as CallbackArrayStep["callbacks"];
  const base = { stage: "loop" as const, output, index };
  callbackArraySteps.push(
    { ...base, title: `Check ${index} < 3`, line: 3, thread: `${index} < 3 is true`, callbacks: calls("waiting"),
      points: [`**${index} < 3** is true.`, "**The loop body** runs."] },
    { ...base, title: `Call instructions(${input})`, line: 4, thread: `Wait for instructions(${input})`, callbacks: calls("entered"),
      points: [`**array[${index}]** reads ${input}.`, `**instructions(${input})** calls multiplyBy2 with ${input}.`, "**The callback** opens a nested execution context.", "**copyArrayAndManipulate** pauses below it on the stack."] },
    { ...base, title: `Bind callback input ${input}`, line: 9, thread: `Wait for instructions(${input})`, callbacks: calls("bound"),
      points: [`**input** receives ${input} in the callback's local memory.`, "**The callback** has its own local memory."] },
    { ...base, title: `Calculate ${input} * 2`, line: 9, thread: `Wait for instructions(${input})`, callbacks: calls("calculated"),
      points: [`**${input} * 2** evaluates to ${value}.`, "**output** has not received this value yet."] },
    { ...base, title: `Return ${value} from the callback`, line: 9, thread: `Wait for instructions(${input})`, callbacks: calls("returning"),
      points: [`**return** sends ${value} back to copyArrayAndManipulate.`] },
    { ...base, title: `Resume after instructions(${input})`, line: 4, thread: `instructions(${input}) = ${value}`, callbacks: calls("closed"),
      points: ["**The callback** leaves the stack.", `**instructions(${input})** has evaluated to ${value}.`, "**copyArrayAndManipulate** resumes at the push call."] },
    { ...base, title: `Push ${value} into output`, line: 4, output: [...output, value], thread: `output.push(${value})`, callbacks: calls("closed"),
      points: [`**output.push(${value})** appends ${value} to the new array.`] },
    { ...base, title: `Advance to index ${index + 1}`, line: 3, index: index + 1, output: [...output, value], thread: `i++ makes i = ${index + 1}`, callbacks: calls("closed"),
      points: [`**i++** increases i from ${index} to ${index + 1}.`] },
  );
}

const closed: CallbackArrayStep["callbacks"] = ["closed", "closed", "closed"];
callbackArraySteps.push(
  { title: "Stop the loop", line: 3, stage: "loop", output: [2, 4, 6], index: 3, thread: "3 < 3 is false", callbacks: closed,
    points: ["**3 < 3** is false.", "**The loop body** is skipped."] },
  { title: "Return the output array", line: 6, stage: "returning", output: [2, 4, 6], index: null, thread: "return output", callbacks: closed,
    points: ["**return output** sends the array [2, 4, 6] to the global caller.", "**The loop's i** is now out of scope."] },
  { title: "Store result", line: 10, stage: "closed", output: [2, 4, 6], index: null, thread: "Call ended", callbacks: closed,
    points: ["**result** receives the new array [2, 4, 6].", "**copyArrayAndManipulate** leaves the stack.", "**The crossed-out contexts** show past calls."] },
  { title: "The program is complete", line: null, stage: "closed", output: [2, 4, 6], index: null, thread: "Call ended", callbacks: closed,
    points: ["**The call stack** is empty.", "**multiplyBy2** was passed once.", "**The callback** was called three times."] },
);
