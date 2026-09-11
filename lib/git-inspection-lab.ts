export const inspectionLines = ["# Reading list", "- Dune", "- The Hobbit", "- Piranesi"];
export const inspectionQuestions = [
  { command: "git status --short", question: "Which files need attention?", comparison: "Recorded → prepared, and prepared → current", endpoints: [0, 1, 2] },
  { command: "git diff", question: "What is still unstaged?", comparison: "Prepared → current", endpoints: [1, 2] },
  { command: "git diff --staged", question: "What would I commit?", comparison: "Recorded → prepared", endpoints: [0, 1] },
  { command: "git diff HEAD", question: "What differs from my last commit?", comparison: "Recorded → current", endpoints: [0, 2] },
];

export function inspectReadingList(recorded: number, staged: number, question: number) {
  if (question === 0) {
    const columns = `${staged === recorded ? " " : "M"}${staged === 4 ? " " : "M"}`;
    return columns === "  " ? "" : `${columns} reading-list.md\n`;
  }
  const from = question === 1 ? staged : recorded;
  const to = question === 2 ? staged : 4;
  if (from === to) return "";
  // ponytail: this example only appends these four fixed lines; use a diff library only if free editing is introduced.
  return inspectionLines.slice(0, to).map((line, index) => `${index < from ? " " : "+"}${line}`).join("\n") + "\n";
}
