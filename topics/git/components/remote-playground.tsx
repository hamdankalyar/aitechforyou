"use client";

import { useState } from "react";
import { fetchOrigin, firstParentChain, initialRemoteState, mergeOrigin, statusLine, teammateCommits, youCommit, yourLanes, type RemoteCommit, type RemoteState } from "@/topics/git/content/git-remote-lab";

export function RemotePlayground() {
  const [state, setState] = useState<RemoteState>(initialRemoteState);
  const [command, setCommand] = useState("git status");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState("Start: you cloned Sam’s repository. Your main, your record origin/main, and Sam’s main all point at B.");
  const status = statusLine(state);
  const { mainLane, originLane, fork } = yourLanes(state);
  const theirLane = firstParentChain(state, state.theirs);
  const file = mainLane[mainLane.length - 1].lines;

  function run(next: RemoteState, nextCommand: string, nextOutput: string, text: string) {
    setState(next); setCommand(nextCommand); setOutput(nextOutput); setAction(text);
  }
  const card = (labels: (item: RemoteCommit) => { name: string; kind: string }[]) => (item: RemoteCommit) => <li className={`branch-commit${item.id === state.main ? " is-head" : ""}`} key={item.id}>
    <strong>{item.id}</strong><span>{item.message}</span>
    <small className="branch-parents">{item.parents.length > 1 ? `parents: ${item.parents.join(" + ")}` : item.parents.length ? `parent: ${item.parents[0]}` : "no parent"}</small>
    <div className="branch-labels">{labels(item).map(label => <span className={`branch-label ${label.kind}`} key={label.name}>{label.name}</span>)}</div>
  </li>;
  const theirCard = card(item => item.id === state.theirs ? [{ name: "main", kind: "is-theirs" }] : []);
  const yourCard = card(item => [...(item.id === state.main ? [{ name: "HEAD → main", kind: "is-current" }] : []), ...(item.id === state.origin ? [{ name: "origin/main", kind: "is-remote" }] : [])]);

  return <div className="snapshot-lab remote-lab" aria-label="Git remote and fetch practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Three labels called main.</h3>
    <p className="lab-instruction">Let Sam commit, then fetch, then merge. Watch which of the three labels moves at each step, and when your file changes.</p>
    <p className="repo-title">Sam’s repository · origin</p>
    <div className="branch-graph" role="img" aria-label={`Sam’s history: ${theirLane.map(item => item.id).join(", ")}; main is on ${state.theirs}.`}><ol className="branch-lane">{theirLane.map(theirCard)}</ol></div>
    <p className="repo-title">Your repository · laptop</p>
    <div className="branch-graph" role="img" aria-label={`Your history: ${mainLane.map(item => item.id).join(", ")} on main${originLane.length ? `; ${originLane.map(item => item.id).join(", ")} known only through origin/main` : ""}. main is on ${state.main}; origin/main is on ${state.origin}.`}>
      <ol className="branch-lane">{mainLane.map(yourCard)}</ol>
      {originLane.length > 0 && <ol className="branch-lane is-fork" style={{ "--fork": fork + 1 } as React.CSSProperties}>{originLane.map(yourCard)}</ol>}
    </div>
    <div className="branch-panels">
      <section className="snapshot-file" aria-label="Your file now">
        <div className="commit-panel-heading"><span className="learning-kicker">Working tree · laptop · on main</span><h4>Your file now</h4></div>
        <div className="file-path">reading-list.md</div>
        <div className="file-lines">{file.map((line, index) => <div className="file-line" key={line}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>{line}</code></div>)}</div>
      </section>
      <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
        <span className="learning-kicker">Last command</span>
        <h4><code>{command}</code></h4>
        {output && <pre tabIndex={0} aria-label="Command output"><code>{output}</code></pre>}
        <p>{action}</p>
        <p><code>git status</code> says: {status.long.replace("\n", " ")} In short form: <code>{status.short}</code></p>
      </div>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={teammateCommits(state) === state} onClick={() => { const next = teammateCommits(state); run(next, `(Sam) git commit -am "${next.commits[next.commits.length - 1].message}"`, "", `Sam recorded ${next.theirs} on their main. Your repository knows nothing about it yet: origin/main still says ${state.origin}, and status still compares main with that record.`); }}>Sam commits</button>
        <button type="button" onClick={() => { const { state: next, output: text } = fetchOrigin(state); run(next, "git fetch", text, text ? `origin/main moved from ${state.origin} to ${next.origin}. main and your file did not change.` : "Nothing printed, nothing new: origin/main already matches Sam’s main."); }}>Fetch</button>
        <button type="button" onClick={() => { const { state: next, output: text } = mergeOrigin(state); run(next, "git merge origin/main", text, next === state ? "main already contains everything origin/main has." : next.main === state.origin ? `Fast-forward: main slid to ${next.main}, and your file now has Sam’s lines. origin/main did not move.` : `Both moved since the fork point, so Git recorded ${next.main} with parents ${state.main} and ${state.origin}. origin/main did not move.`); }}>Merge origin/main</button>
        <button type="button" disabled={youCommit(state) === state} onClick={() => run(youCommit(state), 'git commit -am "Update the title"', "", "D recorded on main. origin/main did not move: only fetch, or push in the next guide, moves your record.")}>You commit</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => run(initialRemoteState, "git status", "", "Start restored: all three labels on B.")}>Start over</button></div>
    </div>
    <p className="lab-instruction">Sam has two commits to make; you have one. Fetch and Merge always run, printing what Git prints when there is nothing to do. Start over resets this page example.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>After Sam commits C, your status still says up to date, because origin/main is your record and it has not moved. git fetch prints one line, C arrives, and origin/main moves to C; main and your file stay on B, and status now says behind by 1. git merge origin/main fast-forwards main to C and your file gains Foundation. If you commit D before fetching, status says ahead by 1; after Sam commits and you fetch, it says diverged, and merging origin/main records a merge commit. origin/main never moves when you commit, and Sam’s main never moves when you do anything in your repository.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
