export type RemoteCommit = { id: string; message: string; parents: string[]; lines: string[] };
// theirs: main in Sam's repository (origin). main: your branch. origin: your remote-tracking record, origin/main.
export type RemoteState = { commits: RemoteCommit[]; theirs: string; main: string; origin: string };

const A: RemoteCommit = { id: "A", message: "Start the reading list", parents: [], lines: ["# Reading list", "- Dune"] };
const B: RemoteCommit = { id: "B", message: "Add The Hobbit", parents: ["A"], lines: [...A.lines, "- The Hobbit"] };
export const initialRemoteState: RemoteState = { commits: [A, B], theirs: "B", main: "B", origin: "B" };
export const remotePath = "/Users/maya/git-remotes/teammate";

const teammateBooks: [string, string][] = [["C", "Foundation"], ["F", "Neuromancer"]];
const find = (state: RemoteState, id: string) => state.commits.find(commit => commit.id === id)!;
const has = (state: RemoteState, id: string) => state.commits.some(commit => commit.id === id);
const stat = (n: number) => ` reading-list.md | ${n} ${"+".repeat(n)}\n 1 file changed, ${n} insertion${n === 1 ? "" : "s"}(+)`;

export function ancestors(state: RemoteState, id: string) {
  const seen: RemoteCommit[] = [];
  const queue = [id];
  while (queue.length) {
    const commit = find(state, queue.shift()!);
    if (seen.includes(commit)) continue;
    seen.push(commit);
    queue.push(...commit.parents);
  }
  return seen;
}
export const reachable = (state: RemoteState, from: string, target: string) => ancestors(state, from).some(commit => commit.id === target);

export function firstParentChain(state: RemoteState, id: string) {
  const chain: RemoteCommit[] = [];
  for (let current: string | undefined = id; current; current = find(state, current).parents[0]) chain.push(find(state, current));
  return chain.reverse();
}

export function teammateCommits(state: RemoteState): RemoteState {
  const next = teammateBooks.find(([id]) => !has(state, id));
  if (!next) return state;
  const parent = find(state, state.theirs);
  const commit = { id: next[0], message: `Add ${next[1]}`, parents: [parent.id], lines: [...parent.lines, `- ${next[1]}`] };
  return { ...state, commits: [...state.commits, commit], theirs: commit.id };
}

export function fetchOrigin(state: RemoteState) {
  const output = state.origin === state.theirs ? "" : `From ${remotePath}\n   ${state.origin}..${state.theirs}  main       -> origin/main`;
  return { state: { ...state, origin: state.theirs }, output };
}

export function youCommit(state: RemoteState): RemoteState {
  if (has(state, "D")) return state;
  const parent = find(state, state.main);
  const commit = { id: "D", message: "Update the title", parents: [parent.id], lines: ["# Reading list for 2026", ...parent.lines.slice(1)] };
  return { ...state, commits: [...state.commits, commit], main: "D" };
}

export function mergeOrigin(state: RemoteState) {
  if (reachable(state, state.main, state.origin)) return { state, output: "Already up to date." };
  const mainLines = find(state, state.main).lines;
  const originLines = find(state, state.origin).lines;
  if (reachable(state, state.origin, state.main)) return { state: { ...state, main: state.origin }, output: `Updating ${state.main}..${state.origin}\nFast-forward\n${stat(originLines.length - mainLines.length)}` };
  const id = ["E", "G", "H"].find(candidate => !has(state, candidate))!;
  const merge = { id, message: "Merge remote-tracking branch 'origin/main'", parents: [state.main, state.origin], lines: [mainLines[0], ...originLines.slice(1)] };
  return { state: { ...state, commits: [...state.commits, merge], main: id }, output: `Auto-merging reading-list.md\nMerge made by the 'ort' strategy.\n${stat(merge.lines.length - mainLines.length)}` };
}

export function statusLine(state: RemoteState) {
  const mine = ancestors(state, state.main);
  const theirs = ancestors(state, state.origin);
  const ahead = mine.filter(commit => !theirs.includes(commit)).length;
  const behind = theirs.filter(commit => !mine.includes(commit)).length;
  const count = (n: number) => `${n} commit${n === 1 ? "" : "s"}`;
  const short = `## main...origin/main${ahead && behind ? ` [ahead ${ahead}, behind ${behind}]` : ahead ? ` [ahead ${ahead}]` : behind ? ` [behind ${behind}]` : ""}`;
  const long = ahead && behind ? `Your branch and 'origin/main' have diverged,\nand have ${ahead} and ${behind} different commits each, respectively.` : ahead ? `Your branch is ahead of 'origin/main' by ${count(ahead)}.` : behind ? `Your branch is behind 'origin/main' by ${count(behind)}, and can be fast-forwarded.` : "Your branch is up to date with 'origin/main'.";
  return { short, long, ahead, behind };
}

// Oldest-first lanes for drawing your repository: main's first-parent chain, then origin/main's commits main cannot reach.
export function yourLanes(state: RemoteState) {
  const mainLane = firstParentChain(state, state.main);
  const originLane = firstParentChain(state, state.origin).filter(commit => !mainLane.includes(commit));
  const fork = originLane.length ? mainLane.findIndex(commit => commit.id === originLane[0].parents[0]) : -1;
  return { mainLane, originLane, fork };
}
