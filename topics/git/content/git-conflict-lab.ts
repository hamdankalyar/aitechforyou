export const conflictBase = ["# Reading list", "- Dune", "- The Hobbit"];
export const conflictSides = [
  { title: "Base", term: "Fork point · B", lines: conflictBase },
  { title: "Ours", term: "main · HEAD · D", lines: [...conflictBase, "- Piranesi"] },
  { title: "Theirs", term: "sci-fi · C", lines: [...conflictBase, "- Foundation"] },
];
export const conflictedFile = [...conflictBase, "<<<<<<< HEAD", "- Piranesi", "=======", "- Foundation", ">>>>>>> sci-fi"];
export const conflictNotes: Record<number, string> = { 3: "start of main’s side", 4: "main’s line", 5: "divider", 6: "sci-fi’s line", 7: "end of sci-fi’s side" };

export const resolutions = [
  { id: "both", label: "Keep both, main’s line first", lines: [...conflictBase, "- Piranesi", "- Foundation"] },
  { id: "both-reversed", label: "Keep both, sci-fi’s line first", lines: [...conflictBase, "- Foundation", "- Piranesi"] },
  { id: "ours", label: "Keep only main’s line", lines: [...conflictBase, "- Piranesi"] },
  { id: "theirs", label: "Keep only sci-fi’s line", lines: [...conflictBase, "- Foundation"] },
  { id: "markers", label: "Leave the file exactly as Git wrote it", lines: conflictedFile },
];

export const mergeConflictOutput = "Auto-merging reading-list.md\nCONFLICT (content): Merge conflict in reading-list.md\nAutomatic merge failed; fix conflicts and then commit the result.";
export const continueRefusal = "error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use 'git add/rm <file>'\nhint: as appropriate to mark resolution and make a commit.\nfatal: Exiting because of an unresolved conflict.\nU\treading-list.md";

export type ConflictPhase = "conflict" | "staged" | "committed" | "aborted";
const isMarker = (line: string) => /^(<<<<<<<|=======|>>>>>>>)/.test(line);

export function conflictLab(phase: ConflictPhase, resolution: string | null) {
  const chosen = resolutions.find(item => item.id === resolution);
  const file = phase === "aborted" ? conflictSides[1].lines : chosen ? chosen.lines : conflictedFile;
  // Choosing exactly main's version leaves the index equal to HEAD, so status has nothing to list although the merge is still in progress.
  const status = phase === "conflict" ? "UU reading-list.md" : phase === "staged" && file.join("\n") !== conflictSides[1].lines.join("\n") ? "M  reading-list.md" : "";
  const check = file.map((line, index) => isMarker(line) ? `reading-list.md:${index + 1}: leftover conflict marker` : "").filter(Boolean).join("\n");
  return { file, status, markersLeft: check !== "", check, branches: phase === "committed" ? "main → E (parents D + C) · sci-fi → C" : "main → D · sci-fi → C" };
}
