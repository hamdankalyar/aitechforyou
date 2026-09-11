"use client";

import { useId, useState } from "react";
import { deleteOutput, mergeCommands, mergeLab, mergeOutcome, type MergeCommit, type MergeMode } from "@/topics/git/content/git-merge-lab";

const modes: { mode: MergeMode; label: string }[] = [
  { mode: "plain", label: "Let Git choose the shape" },
  { mode: "no-ff", label: "Always record a merge commit" },
  { mode: "ff-only", label: "Only move the label; refuse anything else" },
];

export function MergePlayground() {
  const group = useId();
  const [mainAdvanced, setMainAdvanced] = useState(false);
  const [mode, setMode] = useState<MergeMode>("plain");
  const [merged, setMerged] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [command, setCommand] = useState("git log --oneline --decorate --graph --all");
  const [output, setOutput] = useState("");
  const [action, setAction] = useState("Start: main is on B, sci-fi is on C, and HEAD names main. Choose a situation and a command, then merge.");
  const lab = mergeLab(mainAdvanced, mode, merged, deleted);
  const outcome = mergeOutcome(mainAdvanced, mode);

  function configure(apply: () => void, text: string) {
    apply(); setMerged(false); setDeleted(false); setOutput(""); setCommand("git log --oneline --decorate --graph --all"); setAction(`${text} The example returns to the moment before the merge.`);
  }
  function merge() {
    setCommand(mergeCommands[mode]); setOutput(outcome.output);
    if (!outcome.merged) { setAction("Refused. main has its own commit D, so the label cannot simply slide forward. Nothing changed."); return; }
    setMerged(true);
    setAction(outcome.fastForward ? "main slid forward to C. No commit was created, and sci-fi still points at C." : `Git recorded E with two parents: ${mainAdvanced ? "D" : "B"}, where main was, and C, the commit you merged in. Only main moved; sci-fi still points at C.`);
  }
  function remove() {
    setCommand("git branch -d sci-fi"); setOutput(deleteOutput(merged));
    if (!merged) { setAction("Refused: C is reachable only from sci-fi, so deleting the label would strand it. Merge first, or use -D on purpose."); return; }
    setDeleted(true); setAction("The label is gone. C is still in history, reachable from main.");
  }
  const card = (item: MergeCommit) => <li className={`branch-commit${item.id === lab.branches.main ? " is-head" : ""}`} key={item.id}>
    <strong>{item.id}</strong><span>{item.message}</span>
    <small className="branch-parents">{item.parents.length > 1 ? `parents: ${item.parents.join(" + ")}` : item.parents.length ? `parent: ${item.parents[0]}` : "no parent"}</small>
    <div className="branch-labels">{Object.entries(lab.branches).filter(([, id]) => id === item.id).map(([name]) => <span className={`branch-label${name === "main" ? " is-current" : ""}`} key={name}>{name === "main" ? "HEAD → " : ""}{name}</span>)}</div>
  </li>;

  return <div className="snapshot-lab merge-lab" aria-label="Git merge practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Same branch. Two shapes.</h3>
    <p className="lab-instruction">You are on main. Pick whether main moved after the fork, pick the command, then merge. Changing either choice starts the example over.</p>
    <fieldset className="inspection-questions"><legend>Where is main?</legend>
      <label><input type="radio" name={`${group}-main`} checked={!mainAdvanced} onChange={() => configure(() => setMainAdvanced(false), "main is back on B, the fork point.")} /><span>main stayed at the fork point<code>main → B</code></span></label>
      <label><input type="radio" name={`${group}-main`} checked={mainAdvanced} onChange={() => configure(() => setMainAdvanced(true), "main now has its own commit D, a new title.")} /><span>main moved on with its own commit<code>main → D</code></span></label>
    </fieldset>
    <fieldset className="inspection-questions"><legend>Which command?</legend>{modes.map(item => <label key={item.mode}>
      <input type="radio" name={`${group}-mode`} checked={mode === item.mode} onChange={() => configure(() => setMode(item.mode), `Command set to ${mergeCommands[item.mode]}.`)} />
      <span>{item.label}<code>{mergeCommands[item.mode]}</code></span>
    </label>)}</fieldset>
    <div className="branch-graph" role="img" aria-label={`History: ${lab.mainLane.map(item => item.id).join(", ")} on main${lab.featureLane.length ? `; C branches from B` : ""}. ${Object.entries(lab.branches).map(([name, id]) => `${name} is on ${id}`).join("; ")}.`}>
      <ol className="branch-lane">{lab.mainLane.map(card)}</ol>
      {lab.featureLane.length > 0 && <ol className="branch-lane is-fork" style={{ "--fork": lab.fork + 1 } as React.CSSProperties}>{lab.featureLane.map(card)}</ol>}
    </div>
    <div className="branch-panels">
      <section className="snapshot-file" aria-label="Your file now">
        <div className="commit-panel-heading"><span className="learning-kicker">Working tree · on main</span><h4>Your file now</h4></div>
        <div className="file-path">reading-list.md</div>
        <div className="file-lines">{lab.file.map((line, index) => <div className="file-line" key={line}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>{line}</code></div>)}</div>
      </section>
      <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
        <span className="learning-kicker">Last command</span>
        <h4><code>{command}</code></h4>
        {output && <pre tabIndex={0} aria-label="Command output"><code>{output}</code></pre>}
        <p>{action}</p>
        <p>{Object.entries(lab.branches).map(([name, id]) => `${name} → ${id}`).join(" · ")}. HEAD → main.</p>
      </div>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={merged} onClick={merge}>Merge sci-fi into main</button>
        <button type="button" disabled={deleted} onClick={remove}>Delete sci-fi</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => configure(() => { setMainAdvanced(false); setMode("plain"); }, "Start restored: main on B, sci-fi on C, plain merge.")}>Start over</button></div>
    </div>
    <p className="lab-instruction">Merge is unavailable once it has succeeded. Delete is unavailable once the label is gone; before a merge it shows Git’s refusal. In this example the output shows letters where Git prints commit IDs.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>With main at B, git merge sci-fi fast-forwards: main moves to C, no commit is created, and sci-fi still points at C. With main at D, the same command records merge commit E with parents D and C; the file has the new title and Foundation, and sci-fi still points at C. --no-ff with main at B records E with parents B and C instead of fast-forwarding. --ff-only with main at D refuses and changes nothing. Deleting sci-fi before a merge is refused because C would be stranded; after either merge, -d removes the label and C stays in history.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
