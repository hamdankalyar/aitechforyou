"use client";

import { useState } from "react";
import { commit, createBranch, featureBranch, fileLines, initialBranchState, lanes, nextBook, switchBranch, type BranchCommit } from "@/topics/git/content/git-branch-lab";

export function BranchPlayground() {
  const [state, setState] = useState(initialBranchState);
  const [command, setCommand] = useState("git log --oneline --decorate");
  const [action, setAction] = useState("Start: main is on commit B, and HEAD names main. No other branch exists yet.");
  const { mainLane, featureLane, fork } = lanes(state);
  const other = state.head === "main" ? featureBranch : "main";
  const book = nextBook(state);
  const labels = (item: BranchCommit) => Object.entries(state.branches).filter(([, id]) => id === item.id).map(([name]) => <span className={`branch-label${name === state.head ? " is-current" : ""}`} key={name}>{name === state.head ? "HEAD → " : ""}{name}</span>);
  const card = (item: BranchCommit) => <li className={`branch-commit${item.id === state.branches[state.head] ? " is-head" : ""}`} key={item.id}><strong>{item.id}</strong><span>{item.message}</span><div className="branch-labels">{labels(item)}</div></li>;

  return <div className="snapshot-lab branch-lab" aria-label="Git branches practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>One history. Two labels.</h3>
    <p className="lab-instruction">Create the branch, switch, and commit. Watch which label moves. Arrows point from a commit to its parent; the outlined commit is where HEAD is.</p>
    <div className="branch-graph" role="img" aria-label={`History: ${mainLane.map(item => item.id).join(", ")} on main${featureLane.length ? `; ${featureLane.map(item => item.id).join(", ")} on ${featureBranch} after ${mainLane[fork].id}` : ""}. HEAD is on ${state.head}.`}>
      <ol className="branch-lane">{mainLane.map(card)}</ol>
      {featureLane.length > 0 && <ol className="branch-lane is-fork" style={{ "--fork": fork + 1 } as React.CSSProperties}>{featureLane.map(card)}</ol>}
    </div>
    <div className="branch-panels">
      <section className="snapshot-file" aria-label="Your file now">
        <div className="commit-panel-heading"><span className="learning-kicker">Working tree · on {state.head}</span><h4>Your file now</h4></div>
        <div className="file-path">reading-list.md</div>
        <div className="file-lines">{fileLines(state).map((line, index) => <div className="file-line" key={line}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>{line}</code></div>)}</div>
      </section>
      <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
        <span className="learning-kicker">Last command</span>
        <h4><code>{command}</code></h4>
        <p>{action}</p>
        <p>{Object.entries(state.branches).map(([name, id]) => `${name} → ${id}`).join(" · ")}. HEAD → {state.head}.</p>
      </div>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={Boolean(state.branches[featureBranch])} onClick={() => { setState(createBranch(state, featureBranch)); setCommand(`git branch ${featureBranch}`); setAction(`${featureBranch} now names commit ${state.branches[state.head]}, the same as ${state.head}. HEAD did not move.`); }}>Create branch {featureBranch}</button>
        <button type="button" disabled={!state.branches[other]} onClick={() => { setState(switchBranch(state, other)); setCommand(`git switch ${other}`); setAction(`HEAD now names ${other}. Your file shows the snapshot at ${state.branches[other]}.`); }}>Switch to {other}</button>
        <button type="button" disabled={!book} onClick={() => { const next = commit(state); setState(next); setCommand(`git commit -am "Add ${book}"`); setAction(`Commit ${next.branches[state.head]} recorded with parent ${state.branches[state.head]}. Only the ${state.head} label moved.`); }}>Commit on {state.head}</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => { setState(initialBranchState); setCommand("git log --oneline --decorate"); setAction("Start restored: main on B, HEAD on main, no other branch."); }}>Start over</button></div>
    </div>
    <p className="lab-instruction">Create is unavailable once {featureBranch} exists. Switch is unavailable until the other branch exists. Commit is unavailable when this branch has no more example books. Start over resets this page example.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>Creating {featureBranch} puts a second label on B; HEAD stays on main. Switching to {featureBranch} moves HEAD and leaves the file unchanged, because both labels name B. Committing Foundation creates C with parent B and moves only {featureBranch}. Switching back to main removes Foundation from the file. Committing Piranesi creates D with parent B and moves only main; the history now forks at B. Creating {featureBranch} and committing without switching puts the commit on main, because HEAD still names main.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
