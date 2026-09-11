export const firstReadingList = "# Reading list\n- Dune\n";
export const editedReadingList = "# Reading list\n- Dune\n- The Hobbit\n";

export function getCommitLabState(step: number, restaged: boolean) {
  const working = step < 2 ? firstReadingList : editedReadingList;
  const staged = step === 0 ? null : step >= 2 && restaged ? editedReadingList : firstReadingList;
  const committed = step === 3 ? staged : null;
  const explanation = step === 0
    ? "Dune is saved in your file. Nothing is staged, and there are no commits yet."
    : step === 1
      ? "git add prepared the Dune version for your first commit. Your file stayed where it was."
      : step === 2
        ? restaged ? "You ran git add again. Both books are now prepared for the next commit." : "The Hobbit is saved in your file, but the staged version still contains only Dune. Which version will a commit record?"
        : restaged ? "The commit contains both books because you staged the updated file first. All three views now match." : "The commit contains only Dune. The Hobbit is still in your current file, waiting to be staged for a later commit.";
  return { working, staged, committed, explanation };
}
