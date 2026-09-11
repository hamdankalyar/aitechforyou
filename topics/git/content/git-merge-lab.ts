export type MergeMode = "plain" | "no-ff" | "ff-only";
export type MergeCommit = { id: string; message: string; parents: string[]; lines: string[] };

export const mergeCommands: Record<MergeMode, string> = { plain: "git merge sci-fi", "no-ff": "git merge --no-ff sci-fi", "ff-only": "git merge --ff-only sci-fi" };

const A: MergeCommit = { id: "A", message: "Start the reading list", parents: [], lines: ["# Reading list", "- Dune"] };
const B: MergeCommit = { id: "B", message: "Add The Hobbit", parents: ["A"], lines: [...A.lines, "- The Hobbit"] };
const C: MergeCommit = { id: "C", message: "Add Foundation", parents: ["B"], lines: [...B.lines, "- Foundation"] };
const D: MergeCommit = { id: "D", message: "Update the title", parents: ["B"], lines: ["# Reading list for 2026", ...B.lines.slice(1)] };

export function mergeOutcome(mainAdvanced: boolean, mode: MergeMode) {
  if (mode === "ff-only" && mainAdvanced) return { merged: false, fastForward: false, output: "fatal: Not possible to fast-forward, aborting." };
  const fastForward = !mainAdvanced && mode !== "no-ff";
  const stat = " reading-list.md | 1 +\n 1 file changed, 1 insertion(+)";
  return { merged: true, fastForward, output: fastForward ? `Updating B..C\nFast-forward\n${stat}` : `${mainAdvanced ? "Auto-merging reading-list.md\n" : ""}Merge made by the 'ort' strategy.\n${stat}` };
}

export function deleteOutput(merged: boolean) {
  return merged ? "Deleted branch sci-fi (was C)." : "error: the branch 'sci-fi' is not fully merged\nhint: If you are sure you want to delete it, run 'git branch -D sci-fi'";
}

// Everything on the page derives from the situation, the command, and whether merge and delete have run.
export function mergeLab(mainAdvanced: boolean, mode: MergeMode, merged: boolean, deleted: boolean) {
  const outcome = mergeOutcome(mainAdvanced, mode);
  merged = merged && outcome.merged;
  const before = mainAdvanced ? D : B;
  const mergeCommit: MergeCommit | null = merged && !outcome.fastForward ? { id: "E", message: "Merge branch 'sci-fi'", parents: [before.id, C.id], lines: [before.lines[0], ...C.lines.slice(1)] } : null;
  const commits = [A, B, C, ...(mainAdvanced ? [D] : []), ...(mergeCommit ? [mergeCommit] : [])];
  const main = mergeCommit ? mergeCommit.id : merged ? C.id : before.id;
  const branches: Record<string, string> = deleted && merged ? { main } : { main, "sci-fi": C.id };
  const mainLane: MergeCommit[] = [];
  for (let id: string | undefined = main; id; id = mainLane[mainLane.length - 1].parents[0]) mainLane.push(commits.find(commit => commit.id === id)!);
  mainLane.reverse();
  const featureLane = mainLane.includes(C) ? [] : [C];
  return { commits, branches, mainLane, featureLane, fork: mainLane.findIndex(commit => commit.id === C.parents[0]), file: commits.find(commit => commit.id === main)!.lines };
}
