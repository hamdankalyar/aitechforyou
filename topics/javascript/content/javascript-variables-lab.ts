// Fixed teaching examples, verified by scripts/check-javascript-articles.mjs.
const declaration = 'let viewerName = "Ali";\nconsole.log(viewerName);\nconsole.log(typeof viewerName);';
const reassignment = `${declaration}\n\nviewerName = "Sara";\nconsole.log(viewerName);`;
const constant = 'const viewerName = "Ali";\nconsole.log(viewerName);';

export const variablesExamples = {
  let: [
    { title: "Give a value a name", code: declaration, value: "Ali", output: ["Ali", "string"], error: null, explanation: "viewerName refers to the string Ali. typeof describes that value as a string. The quotes mark text in the code; they are not part of the name itself." },
    { title: "Assign a different value", code: reassignment, value: "Sara", output: ["Ali", "string", "Sara"], error: null, explanation: "The same variable now refers to Sara. The earlier Ali output remains in the log: it records what we printed before the reassignment." },
    { title: "Return a new string", code: `${reassignment}\n\nconsole.log(viewerName.toUpperCase());\nconsole.log(viewerName);`, value: "Sara", output: ["Ali", "string", "Sara", "SARA", "Sara"], error: null, explanation: "toUpperCase() returns SARA. Printing that result does not assign it back to viewerName, so the variable still refers to Sara." },
  ],
  const: [
    { title: "Keep this assignment", code: constant, value: "Ali", output: ["Ali"], error: null, explanation: "This is a separate example. const creates viewerName with the value Ali and does not allow that variable to be reassigned." },
    { title: "Try to reassign it", code: `${constant}\n\nviewerName = "Sara";`, value: "Ali", output: ["Ali"], error: "TypeError", explanation: "The assignment fails with a TypeError. viewerName still refers to Ali. The precise error message varies between browsers; no Sara value was assigned." },
  ],
};
