"use client";

import { useId, useState } from "react";
import { firstParentChain, initialPushState, pull, pullCommands, push, samPushes, statusLine, youCommit, yourLanes, type PullMode, type PushCommit, type PushState } from "@/topics/git/content/git-push-lab";

const modes: { mode: PullMode; label: string }[] = [
  { mode: "plain", label: "Let Git decide; it refuses when histories diverged" },
  { mode: "ff-only", label: "Only fast-forward; refuse anything else" },
  { mode: "no-rebase", label: "Merge when histories diverged" },
];

export function PushPlayground() {
  const group = useId();
  const [state, setState] = useState<PushState>(initialPushState);
  const [mode, setMode] = useState<PullMode>("plain");
  const [command, setCommand] = useState("git remote add origin ~/git-push/server.git");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState("Start: your laptop has A and B and knows the server as origin. The server is empty, and main has no upstream yet.");
  const status = statusLine(state);
  const { mainLane, originLane, fork } = yourLanes(state);
  const serverLane = state.server ? firstParentChain(state, state.server) : [];
  const file = mainLane[mainLane.length - 1].lines;

  function run(next: PushState, nextCommand: string, nextOutput: string, text: string) {
    setState(next); setCommand(nextCommand); setOutput(nextOutput); setAction(text);
  }
  function doPush(setUpstream: boolean) {
    const result = push(state, setUpstream);
    const text = result.state === state ? (state.upstream || setUpstream ? "Refused: the server’s main has a commit you do not have, so moving it to yours would drop that commit. Nothing was sent, and origin/main did not move; push never fetches." : "Refused: main has no upstream, so plain git push does not know where to send it. Nothing was sent.") : result.state.server === state.server ? "Nothing to send: the server already has everything main has." : `Sent ${state.server ? "your new commits" : "A and B"}: the server’s main is now ${result.state.main}, and your record origin/main moved with it.${setUpstream ? " main now tracks origin/main." : ""}`;
    run(result.state, setUpstream ? "git push -u origin main" : "git push", result.output, text);
  }
  function doPull() {
    const result = pull(state, mode);
    const fetched = state.upstream && state.origin !== state.server;
    const text = !state.upstream ? "Refused: without an upstream, pull does not know which branch to fetch and merge." : result.state.main !== state.main ? (result.state.commits.length > state.commits.length ? `Fetched, then merged: ${result.state.main} records both your title change and Sam’s lines.` : `Fetched${fetched ? "" : " nothing new"}, then fast-forwarded main to ${result.state.main}. Your file has Sam’s lines now.`) : result.output.endsWith("Already up to date.") ? `${fetched ? "Fetched, and " : ""}main already contains everything origin/main has.` : `${fetched ? "The fetch step ran: origin/main is now " + result.state.origin + ". " : ""}The second step stopped: your main and origin/main have diverged, and this command does not merge on its own.`;
    run(result.state, pullCommands[mode], result.output, text);
  }
  const card = (labels: (item: PushCommit) => { name: string; kind: string }[]) => (item: PushCommit) => <li className={`branch-commit${item.id === state.main ? " is-head" : ""}`} key={item.id}>
    <strong>{item.id}</strong><span>{item.message}</span>
    <small className="branch-parents">{item.parents.length > 1 ? `parents: ${item.parents.join(" + ")}` : item.parents.length ? `parent: ${item.parents[0]}` : "no parent"}</small>
    <div className="branch-labels">{labels(item).map(label => <span className={`branch-label ${label.kind}`} key={label.name}>{label.name}</span>)}</div>
  </li>;
  const serverCard = card(item => item.id === state.server ? [{ name: "main", kind: "is-theirs" }] : []);
  const yourCard = card(item => [...(item.id === state.main ? [{ name: "HEAD → main", kind: "is-current" }] : []), ...(item.id === state.origin ? [{ name: "origin/main", kind: "is-remote" }] : [])]);

  return <div className="snapshot-lab remote-lab push-lab" aria-label="Git push and pull practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Your laptop, the server, and Sam.</h3>
    <p className="lab-instruction">Push without an upstream, then with -u. Let Sam push, commit yourself, and watch a push get refused. Then choose how pull should answer.</p>
    <p className="repo-title">Shared server · origin · server.git</p>
    <div className="branch-graph" role="img" aria-label={serverLane.length ? `Server history: ${serverLane.map(item => item.id).join(", ")}; main is on ${state.server}.` : "The server is empty."}>{serverLane.length ? <ol className="branch-lane">{serverLane.map(serverCard)}</ol> : <p className="lab-instruction">Empty: no branch yet.</p>}</div>
    <p className="repo-title">Your repository · laptop{state.upstream ? " · main tracks origin/main" : " · no upstream"}</p>
    <div className="branch-graph" role="img" aria-label={`Your history: ${mainLane.map(item => item.id).join(", ")} on main${originLane.length ? `; ${originLane.map(item => item.id).join(", ")} known only through origin/main` : ""}. main is on ${state.main}; origin/main is ${state.origin ? `on ${state.origin}` : "absent"}.`}>
      <ol className="branch-lane">{mainLane.map(yourCard)}</ol>
      {originLane.length > 0 && <ol className="branch-lane is-fork" style={{ "--fork": fork + 1 } as React.CSSProperties}>{originLane.map(yourCard)}</ol>}
    </div>
    <fieldset className="inspection-questions"><legend>How should pull answer a divergence?</legend>{modes.map(item => <label key={item.mode}>
      <input type="radio" name={group} checked={mode === item.mode} onChange={() => setMode(item.mode)} />
      <span>{item.label}<code>{pullCommands[item.mode]}</code></span>
    </label>)}</fieldset>
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
        <p><code>git status --short --branch</code> → <code>{status.short}</code>{status.long ? `. ${status.long.replace("\n", " ")}` : ". No upstream, so status has nothing to compare with."}</p>
      </div>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" onClick={() => doPush(false)}>git push</button>
        <button type="button" disabled={state.upstream} onClick={() => doPush(true)}>git push -u origin main</button>
        <button type="button" onClick={doPull}>{pullCommands[mode]}</button>
        <button type="button" disabled={samPushes(state) === state} onClick={() => { const next = samPushes(state); run(next, `(Sam) git push`, `To ${"/Users/maya/git-push/server.git"}\n   ${state.server}..${next.server}  main -> main`, `Sam pushed ${next.server}. The server’s main moved; your origin/main still says ${state.origin}, because only your own fetch, pull, or push moves your record.`); }}>Sam pushes</button>
        <button type="button" disabled={youCommit(state) === state} onClick={() => run(youCommit(state), 'git commit -am "Update the title"', "", "D recorded on main. Nothing left your laptop: the server and origin/main are unchanged until you push.")}>You commit</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => run(initialPushState, "git remote add origin ~/git-push/server.git", "", "Start restored: A and B on your laptop, an empty server, no upstream.")}>Start over</button></div>
    </div>
    <p className="lab-instruction">Sam can push only once the server has a branch, and has two commits to make; you have one. The -u button is unavailable once the upstream is set. Start over resets this page example.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>Plain git push is refused while main has no upstream, and git pull is refused for the same reason. git push -u origin main sends A and B, creates main on the server, moves origin/main, and records the upstream; a second push says Everything up-to-date. After Sam pushes C, your status still says up to date, because origin/main has not moved. After you commit D, git push is rejected with fetch first, and nothing is sent. Plain git pull then fetches, moving origin/main to C, but refuses to integrate because the histories diverged; git pull --ff-only refuses too; git pull --no-rebase records merge commit E. git push then succeeds because the server’s main can move forward to E. When only Sam has moved, every pull fast-forwards.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
