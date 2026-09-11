export const snapshots = [
  { id: "A", message: "Start the reading list", parent: null, books: ["Dune"] },
  { id: "B", message: "Add The Hobbit", parent: "A", books: ["Dune", "The Hobbit"] },
  { id: "C", message: "Replace Dune with Earthsea", parent: "B", books: ["A Wizard of Earthsea", "The Hobbit"] },
] as const;
