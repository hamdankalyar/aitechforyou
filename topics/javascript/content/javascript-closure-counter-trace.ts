export const counterInsideSource = [
  "function outer() {",
  "  let counter = 0;",
  "  function add1() {",
  "    counter++;",
  "  }",
  "",
  "  add1();",
  "}",
  "outer();",
];

export const counterReturnedSource = [
  "function outer() {",
  "  let counter = 0;",
  "  function add1() { counter++; }",
  "  return add1;",
  "}",
  "",
  "const newFunc = outer();",
  "newFunc();",
  "newFunc();",
];

type CounterCallStage = "waiting" | "entered" | "lookup-local" | "lookup-outer" | "incremented" | "returning" | "closed";
type CounterStep = {
  title: string;
  line: number | null;
  points: string[];
  outer: "waiting" | "entered" | "initialized" | "defined" | "returning" | "closed";
  calls: [CounterCallStage, CounterCallStage];
  counter: number | null;
};

const initial: Pick<CounterStep, "outer" | "calls" | "counter"> = {
  outer: "waiting", calls: ["waiting", "waiting"], counter: null,
};

// shortcut: these trace the two supplied examples, add editable tracing only if requested.
export const counterInsideSteps: CounterStep[] = [
  { ...initial, title: "Ready to trace", line: null,
    points: ["**The board** begins empty."] },
  { ...initial, title: "Save outer", line: 1,
    points: ["**outer** refers to the saved function.", "**Its body** waits for a call."] },
  { ...initial, title: "Call outer()", line: 9, outer: "entered",
    points: ["**outer()** opens a new execution context.", "**The call stack** places outer above global."] },
  { ...initial, title: "Initialize counter", line: 2, outer: "initialized", counter: 0,
    points: ["**counter** receives 0 in outer's local memory."] },
  { ...initial, title: "Save add1 in outer", line: 3, outer: "defined", counter: 0,
    points: ["**add1** is created with access to outer's scope.", "**The nested declaration** is available before outer's body statements run.", "**The board** now reveals its function reference."] },
  { ...initial, title: "Call add1() inside outer", line: 7, outer: "defined", counter: 0, calls: ["entered", "waiting"],
    points: ["**add1()** opens its own execution context.", "**outer()** pauses while add1 runs.", "**The call stack** now has add1 above outer above global."] },
  { ...initial, title: "Look in add1's local memory", line: 4, outer: "defined", counter: 0, calls: ["lookup-local", "waiting"],
    points: ["**counter++** first needs the existing counter variable.", "**add1's local memory** has no counter declaration."] },
  { ...initial, title: "Follow the surrounding scope", line: 4, outer: "defined", counter: 0, calls: ["lookup-outer", "waiting"],
    points: ["**add1** was defined inside outer.", "**The scope lookup** finds counter = 0 in outer's memory.", "**The definition location** determines where this lookup goes.", "**The call stack** tracks execution rather than variable lookup."] },
  { ...initial, title: "Update outer's counter", line: 4, outer: "defined", counter: 1, calls: ["incremented", "waiting"],
    points: ["**counter++** adds 1 to the existing variable.", "**0 + 1** evaluates to 1.", "**outer's counter** now holds 1.", "**add1** does not create a local counter."] },
  { ...initial, title: "Finish add1", line: 5, outer: "defined", counter: 1, calls: ["returning", "waiting"],
    points: ["**add1** reaches the end of its body.", "**No explicit return** means the call returns undefined.", "**The counter update** remains in outer's memory."] },
  { ...initial, title: "Resume outer", line: 7, outer: "defined", counter: 1, calls: ["closed", "waiting"],
    points: ["**add1()** leaves the call stack.", "**outer()** resumes with counter = 1."] },
  { ...initial, title: "Finish outer", line: 8, outer: "closed", counter: 1, calls: ["closed", "waiting"],
    points: ["**outer()** leaves the call stack.", "**The crossed-out boxes** keep historical views of the finished calls.", "**Global code** has no counter variable from this call."] },
  { ...initial, title: "The inside call is complete", line: null, outer: "closed", counter: 1, calls: ["closed", "waiting"],
    points: ["**The call stack** is empty.", "**The final counter value** was 1.", "**The next example** calls add1 after outer has finished."] },
];

export const counterReturnedSteps: CounterStep[] = [
  ...counterInsideSteps.slice(0, 5).map(step => step.line === 9 ? { ...step, line: 7 } : step),
  { ...initial, title: "Return add1", line: 4, outer: "returning", counter: 0,
    points: ["**return add1** returns the function reference.", "**add1** retains access to the surrounding counter.", "**The inner function** has not run yet."] },
  { ...initial, title: "Store newFunc and close outer", line: 7, outer: "closed", counter: 0,
    points: ["**newFunc** receives the returned add1 function.", "**outer()** leaves the call stack.", "**The captured scope** keeps the original counter variable.", "**The live scope panel** shows that variable separately from the closed call's history."] },
];

for (const index of [0, 1]) {
  const before = index;
  const after = before + 1;
  const callLine = 8 + index;
  const calls = (stage: CounterCallStage): CounterStep["calls"] => index === 0 ? [stage, "waiting"] : ["closed", stage];
  counterReturnedSteps.push(
    { title: `Call newFunc() ${index + 1}`, line: callLine, outer: "closed", counter: before, calls: calls("entered"),
      points: ["**newFunc()** calls the saved add1 function.", "**A fresh execution context** opens with empty local memory.", "**outer()** is absent from the call stack."] },
    { title: `Check local memory on call ${index + 1}`, line: 3, outer: "closed", counter: before, calls: calls("lookup-local"),
      points: ["**add1's local memory** has no counter variable.", "**The lookup** continues into its captured outer scope."] },
    { title: `Find captured counter = ${before}`, line: 3, outer: "closed", counter: before, calls: calls("lookup-outer"),
      points: ["**The function's definition location** supplies its surrounding scope.", `**counter** still holds ${before} in that captured scope.`, "**Global memory** is not where this counter is stored."] },
    { title: `Change counter to ${after}`, line: 3, outer: "closed", counter: after, calls: calls("incremented"),
      points: ["**counter++** changes the same captured variable.", `**${before} + 1** evaluates to ${after}.`, `**The live counter** now holds ${after}.`] },
    { title: `Finish returned call ${index + 1}`, line: 3, outer: "closed", counter: after, calls: calls("returning"),
      points: ["**add1** returns undefined because it has no return statement.", "**The captured counter** keeps its updated value."] },
    { title: `Resume global after call ${index + 1}`, line: callLine, outer: "closed", counter: after, calls: calls("closed"),
      points: ["**newFunc()** leaves the call stack.", "**Its local execution context** closes.", "**The captured scope** remains reachable through newFunc."] },
  );
}
counterReturnedSteps.push({ title: "Both returned calls are complete", line: null, outer: "closed", counter: 2, calls: ["closed", "closed"],
  points: ["**The captured counter** holds 2.", "**outer()** ran once.", "**add1** ran twice through newFunc.", "**The call stack** is empty."] });
