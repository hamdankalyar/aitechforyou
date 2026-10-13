export const copyArraySource = [
  "function copyArrayAndMultiplyBy2(array) {",
  "  const output = [];",
  "  for (let i = 0; i < array.length; i++) {",
  "    output.push(array[i] * 2);",
  "  }",
  "  return output;",
  "}",
  "",
  "const myArray = [1, 2, 3];",
  "const result = copyArrayAndMultiplyBy2(myArray);",
];

export type CopyArrayStep = {
  title: string;
  line: number | null;
  points: string[];
  stage: "global" | "entered" | "bound" | "loop" | "returning" | "closed";
  output: number[] | null;
  index: number | null;
  thread: string;
};

// ponytail: a fixed lesson trace; add a parser only if editable tracing is needed.
export const copyArraySteps: CopyArrayStep[] = [
  { title: "Ready to trace", line: null, stage: "global", output: null, index: null, thread: "",
    points: ["**The board** begins empty.", "**Next step** follows the supplied array example."] },
  { title: "Save the function", line: 1, stage: "global", output: null, index: null, thread: "",
    points: ["**copyArrayAndMultiplyBy2** refers to the saved function.", "**Hoisting** makes this declaration available before the statements run.", "**The function body** waits for a call."] },
  { title: "Store the input array", line: 9, stage: "global", output: null, index: null, thread: "",
    points: ["**myArray** refers to [1, 2, 3] in global memory."] },
  { title: "Call copyArrayAndMultiplyBy2(myArray)", line: 10, stage: "entered", output: null, index: null, thread: "Enter function",
    points: ["**A function call** opens a new execution context.", "**The call stack** places this call above global.", "**result** waits for the returned value."] },
  { title: "Bind the array parameter", line: 1, stage: "bound", output: null, index: null, thread: "array = myArray",
    points: ["**array** is the parameter in local memory.", "**myArray** is the argument supplied by the caller.", "**Both names** refer to the same input array.", "**Passing the array** does not copy its elements."] },
  { title: "Create a new output array", line: 2, stage: "bound", output: [], index: null, thread: "output = []",
    points: ["**output** refers to a new empty array.", "**The input array** remains [1, 2, 3]."] },
  { title: "Start at index 0", line: 3, stage: "loop", output: [], index: 0, thread: "let i = 0",
    points: ["**i** starts at 0 in the loop's block scope.", "**Index 0** identifies the first element."] },
  { title: "Check 0 < 3", line: 3, stage: "loop", output: [], index: 0, thread: "0 < 3 is true",
    points: ["**array.length** is 3.", "**0 < 3** is true.", "**The loop body** runs."] },
  { title: "Multiply the first element", line: 4, stage: "loop", output: [2], index: 0, thread: "1 * 2 = 2",
    points: ["**array[0]** reads 1.", "**1 * 2** evaluates to 2.", "**output.push(2)** appends 2 to output."] },
  { title: "Advance to index 1", line: 3, stage: "loop", output: [2], index: 1, thread: "i++ makes i = 1",
    points: ["**i++** increases i from 0 to 1."] },
  { title: "Check 1 < 3", line: 3, stage: "loop", output: [2], index: 1, thread: "1 < 3 is true",
    points: ["**1 < 3** is true.", "**The loop body** runs again."] },
  { title: "Multiply the second element", line: 4, stage: "loop", output: [2, 4], index: 1, thread: "2 * 2 = 4",
    points: ["**array[1]** reads 2.", "**2 * 2** evaluates to 4.", "**output.push(4)** appends 4 to output."] },
  { title: "Advance to index 2", line: 3, stage: "loop", output: [2, 4], index: 2, thread: "i++ makes i = 2",
    points: ["**i++** increases i from 1 to 2."] },
  { title: "Check 2 < 3", line: 3, stage: "loop", output: [2, 4], index: 2, thread: "2 < 3 is true",
    points: ["**2 < 3** is true.", "**The loop body** runs once more."] },
  { title: "Multiply the third element", line: 4, stage: "loop", output: [2, 4, 6], index: 2, thread: "3 * 2 = 6",
    points: ["**array[2]** reads 3.", "**3 * 2** evaluates to 6.", "**output.push(6)** appends 6 to output."] },
  { title: "Advance to index 3", line: 3, stage: "loop", output: [2, 4, 6], index: 3, thread: "i++ makes i = 3",
    points: ["**i++** increases i from 2 to 3."] },
  { title: "Stop the loop", line: 3, stage: "loop", output: [2, 4, 6], index: 3, thread: "3 < 3 is false",
    points: ["**3 < 3** is false.", "**The loop body** is skipped.", "**output** now holds [2, 4, 6]."] },
  { title: "Return output", line: 6, stage: "returning", output: [2, 4, 6], index: null, thread: "return output",
    points: ["**return output** sends the new array to the waiting caller.", "**The loop's i** is now out of scope."] },
  { title: "Store the returned array", line: 10, stage: "closed", output: [2, 4, 6], index: null, thread: "Call ended",
    points: ["**result** now refers to [2, 4, 6].", "**The function call** leaves the stack.", "**The crossed-out context** preserves a historical view.", "**myArray** still refers to [1, 2, 3]."] },
  { title: "The program is complete", line: null, stage: "closed", output: [2, 4, 6], index: null, thread: "Call ended",
    points: ["**result** holds the new array [2, 4, 6].", "**myArray** is unchanged.", "**The call stack** is empty."] },
];
