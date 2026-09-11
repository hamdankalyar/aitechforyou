export type PushCommit = { id: string; message: string; parents: string[]; lines: string[] };
// server: main in the shared bare repository. main: your branch. origin: your remote-tracking record. upstream: whether main tracks origin/main.
export type PushState = { commits: PushCommit[]; server: string | null; main: string; origin: string | null; upstream: boolean };
export type PullMode = "plain" | "ff-only" | "no-rebase";

export const serverPath = "/Users/maya/git-push/server.git";
const serverName = serverPath.replace(/\.git$/, "");
export const pullCommands: Record<PullMode, string> = { plain: "git pull", "ff-only": "git pull --ff-only", "no-rebase": "git pull --no-rebase" };

const A: PushCommit = { id: "A", message: "Start the reading list", parents: [], lines: ["# Reading list", "- Dune"] };
const B: PushCommit = { id: "B", message: "Add The Hobbit", parents: ["A"], lines: [...A.lines, "- The Hobbit"] };
export const initialPushState: PushState = { commits: [A, B], server: null, main: "B", origin: null, upstream: false };

export const noUpstreamPush = "fatal: The current branch main has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push --set-upstream origin main\n\nTo have this happen automatically for branches without a tracking\nupstream, see 'push.autoSetupRemote' in 'git help config'.";
export const noUpstreamPull = "There is no tracking information for the current branch.\nPlease specify which branch you want to merge with.\nSee git-pull(1) for details.\n\n    git pull <remote> <branch>\n\nIf you wish to set tracking information for this branch you can do so with:\n\n    git branch --set-upstream-to=origin/<branch> main";
// Git words the refusal differently depending on whether the server's commit is already in your repository (fetched) or not.
export const rejectedFetchFirst = `To ${serverPath}\n ! [rejected]        main -> main (fetch first)\nerror: failed to push some refs to '${serverPath}'\nhint: Updates were rejected because the remote contains work that you do not\nhint: have locally. This is usually caused by another repository pushing to\nhint: the same ref. If you want to integrate the remote changes, use\nhint: 'git pull' before pushing again.\nhint: See the 'Note about fast-forwards' in 'git push --help' for details.`;
export const rejectedNonFastForward = `To ${serverPath}\n ! [rejected]        main -> main (non-fast-forward)\nerror: failed to push some refs to '${serverPath}'\nhint: Updates were rejected because the tip of your current branch is behind\nhint: its remote counterpart. If you want to integrate the remote changes,\nhint: use 'git pull' before pushing again.\nhint: See the 'Note about fast-forwards' in 'git push --help' for details.`;
export const divergentPull = "hint: You have divergent branches and need to specify how to reconcile them.\nhint: You can do so by running one of the following commands sometime before\nhint: your next pull:\nhint:\nhint:   git config pull.rebase false  # merge\nhint:   git config pull.rebase true   # rebase\nhint:   git config pull.ff only       # fast-forward only\nhint:\nhint: You can replace \"git config\" with \"git config --global\" to set a default\nhint: preference for all repositories. You can also pass --rebase, --no-rebase,\nhint: or --ff-only on the command line to override the configured default per\nhint: invocation.\nfatal: Need to specify how to reconcile divergent branches.";
export const notFastForward = "hint: Diverging branches can't be fast-forwarded, you need to either:\nhint:\nhint: \tgit merge --no-ff\nhint:\nhint: or:\nhint:\nhint: \tgit rebase\nhint:\nhint: Disable this message with \"git config set advice.diverging false\"\nfatal: Not possible to fast-forward, aborting.";

const teammateBooks: [string, string][] = [["C", "Foundation"], ["F", "Neuromancer"]];
const find = (state: PushState, id: string) => state.commits.find(commit => commit.id === id)!;
const has = (state: PushState, id: string) => state.commits.some(commit => commit.id === id);
const stat = (n: number) => ` reading-list.md | ${n} ${"+".repeat(n)}\n 1 file changed, ${n} insertion${n === 1 ? "" : "s"}(+)`;

export function ancestors(state: PushState, id: string) {
  const seen: PushCommit[] = [];
  const queue = [id];
  while (queue.length) {
    const commit = find(state, queue.shift()!);
    if (seen.includes(commit)) continue;
    seen.push(commit);
    queue.push(...commit.parents);
  }
  return seen;
}
export const reachable = (state: PushState, from: string, target: string) => ancestors(state, from).some(commit => commit.id === target);
export function firstParentChain(state: PushState, id: string) {
  const chain: PushCommit[] = [];
  for (let current: string | undefined = id; current; current = find(state, current).parents[0]) chain.push(find(state, current));
  return chain.reverse();
}

export function push(state: PushState, setUpstream: boolean) {
  if (!state.upstream && !setUpstream) return { state, output: noUpstreamPush };
  if (state.server && !reachable(state, state.main, state.server)) return { state, output: state.origin === state.server ? rejectedNonFastForward : rejectedFetchFirst };
  const line = state.server === state.main ? "Everything up-to-date" : `To ${serverPath}\n${state.server ? `   ${state.server}..${state.main}  main -> main` : " * [new branch]      main -> main"}`;
  return { state: { ...state, server: state.main, origin: state.main, upstream: true }, output: setUpstream ? `${line}\nbranch 'main' set up to track 'origin/main'.` : line };
}

export function samPushes(state: PushState): PushState {
  const next = teammateBooks.find(([id]) => !has(state, id));
  if (!state.server || !next) return state;
  const parent = find(state, state.server);
  const commit = { id: next[0], message: `Add ${next[1]}`, parents: [parent.id], lines: [...parent.lines, `- ${next[1]}`] };
  return { ...state, commits: [...state.commits, commit], server: commit.id };
}

export function youCommit(state: PushState): PushState {
  if (has(state, "D")) return state;
  const parent = find(state, state.main);
  const commit = { id: "D", message: "Update the title", parents: [parent.id], lines: ["# Reading list for 2026", ...parent.lines.slice(1)] };
  return { ...state, commits: [...state.commits, commit], main: "D" };
}

export function pull(state: PushState, mode: PullMode) {
  if (!state.upstream) return { state, output: noUpstreamPull };
  const parts: string[] = [];
  let next = state;
  if (state.origin !== state.server) { parts.push(`From ${serverName}\n   ${state.origin}..${state.server}  main       -> origin/main`); next = { ...next, origin: state.server }; }
  const origin = next.origin!;
  const mainLines = find(next, next.main).lines;
  const originLines = find(next, origin).lines;
  if (reachable(next, next.main, origin)) parts.push("Already up to date.");
  else if (reachable(next, origin, next.main)) { parts.push(`Updating ${next.main}..${origin}\nFast-forward\n${stat(originLines.length - mainLines.length)}`); next = { ...next, main: origin }; }
  else if (mode === "plain") parts.push(divergentPull);
  else if (mode === "ff-only") parts.push(notFastForward);
  else {
    const id = ["E", "G", "H"].find(candidate => !has(next, candidate))!;
    const merge = { id, message: `Merge branch 'main' of ${serverName}`, parents: [next.main, origin], lines: [mainLines[0], ...originLines.slice(1)] };
    parts.push(`Auto-merging reading-list.md\nMerge made by the 'ort' strategy.\n${stat(merge.lines.length - mainLines.length)}`);
    next = { ...next, commits: [...next.commits, merge], main: id };
  }
  return { state: next, output: parts.join("\n") };
}

export function statusLine(state: PushState) {
  if (!state.upstream || !state.origin) return { short: "## main", long: "", ahead: 0, behind: 0 };
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
export function yourLanes(state: PushState) {
  const mainLane = firstParentChain(state, state.main);
  const originLane = state.origin ? firstParentChain(state, state.origin).filter(commit => !mainLane.includes(commit)) : [];
  const fork = originLane.length ? mainLane.findIndex(commit => commit.id === originLane[0].parents[0]) : -1;
  return { mainLane, originLane, fork };
}
