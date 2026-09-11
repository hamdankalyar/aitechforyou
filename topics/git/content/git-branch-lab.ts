export type BranchCommit = { id: string; message: string; parent: string | null; books: string[] };
export type BranchState = { commits: BranchCommit[]; branches: Record<string, string>; head: string };

export const featureBranch = "sci-fi";
const queues: Record<string, string[]> = { main: ["Piranesi", "Circe"], [featureBranch]: ["Foundation", "Neuromancer"] };

export const initialBranchState: BranchState = {
  commits: [
    { id: "A", message: "Start the reading list", parent: null, books: ["Dune"] },
    { id: "B", message: "Add The Hobbit", parent: "A", books: ["Dune", "The Hobbit"] },
  ],
  branches: { main: "B" },
  head: "main",
};

export function ancestors(state: BranchState, id: string | null): BranchCommit[] {
  const chain: BranchCommit[] = [];
  while (id) {
    const commit = state.commits.find(candidate => candidate.id === id)!;
    chain.push(commit);
    id = commit.parent;
  }
  return chain;
}

export function fileLines(state: BranchState, branch = state.head) {
  return ["# Reading list", ...ancestors(state, state.branches[branch])[0].books.map(book => `- ${book}`)];
}

export function nextBook(state: BranchState) {
  const recorded = ancestors(state, state.branches[state.head])[0].books;
  return queues[state.head].find(book => !recorded.includes(book));
}

export function createBranch(state: BranchState, name: string): BranchState {
  return state.branches[name] ? state : { ...state, branches: { ...state.branches, [name]: state.branches[state.head] } };
}

export function switchBranch(state: BranchState, name: string): BranchState {
  return state.branches[name] ? { ...state, head: name } : state;
}

export function commit(state: BranchState): BranchState {
  const book = nextBook(state);
  if (!book) return state;
  const parent = ancestors(state, state.branches[state.head])[0];
  const next = { id: String.fromCharCode(65 + state.commits.length), message: `Add ${book}`, parent: parent.id, books: [...parent.books, book] };
  return { ...state, commits: [...state.commits, next], branches: { ...state.branches, [state.head]: next.id } };
}

// Oldest-first lanes for drawing: main's whole ancestry, then the feature commits main cannot reach.
export function lanes(state: BranchState) {
  const mainLane = ancestors(state, state.branches.main).reverse();
  const featureLane = state.branches[featureBranch] ? ancestors(state, state.branches[featureBranch]).reverse().filter(commit => !mainLane.includes(commit)) : [];
  const fork = featureLane.length ? mainLane.findIndex(commit => commit.id === featureLane[0].parent) : -1;
  return { mainLane, featureLane, fork };
}
