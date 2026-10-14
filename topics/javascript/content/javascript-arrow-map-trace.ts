import type { CallStage } from "./javascript-principles-trace";

export const arrowMapSource = [
  "const multiplyBy2 = input => input * 2;",
  "console.log(multiplyBy2(3)); // 6",
  "const result = [1, 2, 3].map(input => input * 2);",
  "console.log(result); // [2, 4, 6]",
];

type ArrowMapStep = {
  title: string;
  line: number | null;
  points: string[];
  calls: [CallStage, CallStage, CallStage, CallStage];
  map: "waiting" | "entered" | "running" | "returning" | "closed";
  output: number[] | null;
  printed: string[];
};

const initial: Pick<ArrowMapStep, "calls" | "map" | "output" | "printed"> = {
  calls: ["waiting", "waiting", "waiting", "waiting"], map: "waiting", output: null, printed: [],
};
const firstCall = (stage: CallStage): ArrowMapStep["calls"] => [stage, "waiting", "waiting", "waiting"];

// shortcut: this traces the fixed lesson example, add editable tracing only if requested.
export const arrowMapSteps: ArrowMapStep[] = [
  { ...initial, title: "Ready to trace", line: null,
    points: ["**The board** begins empty."] },
  { ...initial, title: "Save the arrow function", line: 1,
    points: ["**multiplyBy2** receives the function.", "**Its body** waits for a call."] },
  { ...initial, title: "Call multiplyBy2(3)", line: 2, calls: firstCall("entered"),
    points: ["**multiplyBy2(3)** opens a new execution context."] },
  { ...initial, title: "Bind input to 3", line: 1, calls: firstCall("bound"),
    points: ["**input** receives 3 in local memory."] },
  { ...initial, title: "Calculate 3 * 2", line: 1, calls: firstCall("calculated"),
    points: ["**3 * 2** evaluates to 6."] },
  { ...initial, title: "Return 6", line: 1, calls: firstCall("returning"),
    points: ["**The expression body** returns 6 automatically."] },
  { ...initial, title: "Resume the global context", line: 2, calls: firstCall("closed"),
    points: ["**The function call** leaves the stack.", "**console.log** receives 6."] },
  { ...initial, title: "Print 6", line: 2, calls: firstCall("closed"), printed: ["6"],
    points: ["**The console** prints 6."] },
  { ...initial, title: "Call built-in map", line: 3, calls: firstCall("closed"), map: "entered", printed: ["6"],
    points: ["**map** receives the anonymous callback.", "**result** waits for map to finish."] },
  { ...initial, title: "Create the new array", line: 3, calls: firstCall("closed"), map: "running", output: [], printed: ["6"],
    points: ["**map** starts building a new array.", "**The built-in state** is shown in simplified form."] },
];

for (const [index, input] of [1, 2, 3].entries()) {
  const value = input * 2;
  const output = [2, 4, 6].slice(0, index);
  const calls = (stage: CallStage): ArrowMapStep["calls"] => ["closed", ...[0, 1, 2].map(call => call < index ? "closed" : call === index ? stage : "waiting")] as ArrowMapStep["calls"];
  const base = { line: 3, map: "running" as const, output, printed: ["6"] };
  arrowMapSteps.push(
    { ...base, title: `Call the anonymous callback with ${input}`, calls: calls("entered"),
      points: [`**The element at index ${index}** is ${input}.`, "**The callback** opens its own execution context."] },
    { ...base, title: `Bind callback input to ${input}`, calls: calls("bound"),
      points: [`**input** receives ${input} in this callback's local memory.`] },
    { ...base, title: `Calculate ${input} * 2 in the callback`, calls: calls("calculated"),
      points: [`**${input} * 2** evaluates to ${value}.`] },
    { ...base, title: `Return ${value} to map`, calls: calls("returning"),
      points: [`**The callback** returns ${value} automatically.`] },
    { ...base, title: `Resume map after input ${input}`, calls: calls("closed"),
      points: ["**The callback** leaves the stack.", "**map** resumes its work."] },
    { ...base, title: `Store ${value} in the new array`, calls: calls("closed"), output: [...output, value],
      points: [`**map** stores ${value} at index ${index} in the new array.`] },
  );
}

const complete = { calls: ["closed", "closed", "closed", "closed"] as ArrowMapStep["calls"], output: [2, 4, 6], printed: ["6"] };
arrowMapSteps.push(
  { ...complete, title: "Return the new array", line: 3, map: "returning",
    points: ["**map** returns [2, 4, 6]."] },
  { ...complete, title: "Store result", line: 3, map: "closed",
    points: ["**result** receives [2, 4, 6] in global memory.", "**The anonymous function** has no global name."] },
  { ...complete, title: "Print result", line: 4, map: "closed", printed: ["6", "[2,4,6]"],
    points: ["**The console** prints [2, 4, 6]."] },
  { ...complete, title: "The program is complete", line: null, map: "closed", printed: ["6", "[2,4,6]"],
    points: ["**The call stack** is empty."] },
);
