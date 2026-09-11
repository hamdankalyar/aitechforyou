export const snapshots = [
  { id: "A", message: "Start the reading list", parent: null, books: ["Dune"] },
  { id: "B", message: "Add The Hobbit", parent: "A", books: ["Dune", "The Hobbit"] },
  { id: "C", message: "Replace Dune with Earthsea", parent: "B", books: ["A Wizard of Earthsea", "The Hobbit"] },
] as const;

export function snapshotDifference(index: number) {
  const current: readonly string[] = snapshots[index].books;
  const previous: readonly string[] = index > 0 ? snapshots[index - 1].books : [];
  return [
    ...previous.filter(book => !current.includes(book)).map(book => ({ book, kind: "removed" as const })),
    ...current.map(book => ({ book, kind: previous.includes(book) ? "unchanged" as const : "added" as const })),
  ];
}
