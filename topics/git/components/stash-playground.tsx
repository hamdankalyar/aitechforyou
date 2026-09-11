"use client";

import { useState } from "react";
import { stashCommits, stashConflictNotes, stashSteps } from "@/topics/git/content/git-stash-lab";

export function StashPlayground() {
  const [index, setIndex] = useState(0);
  const step = stashSteps[index];
  const head = stashCommits[step.head];
  const lines = (items: string[], notes?: Record<number, string>) => <div className="file-lines">{items.map((line, i) => <div className={`file-line${notes?.[i] ? " is-conflict" : ""}`} key={`${i}-${line}`}><span className="line-marker" aria-hidden="true">{i + 1}</span><code>{line}</code>{notes?.[i] && <small className="line-note">{notes[i]}</small>}</div>)}</div>;

  return <div className="snapshot-lab stash-lab" aria-label="Git stash practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Two entries on the shelf. One comes back cleanly.</h3>
    <p className="lab-instruction">Step through the storyboard. Watch the shelf: apply leaves an entry in place, a clean pop removes it, and a conflicting pop keeps it.</p>
    <div className="inspection-panels">
      <section className="snapshot-file" aria-label="Your file now">
        <div className="commit-panel-heading"><span className="learning-kicker">Working tree · on main</span><h4>Your file</h4></div>
        <div className="file-path">reading-list.md</div>
        {lines(step.file, step.conflict ? stashConflictNotes : undefined)}
      </section>
      <section className="snapshot-file" aria-label="Last commit">
        <div className="commit-panel-heading"><span className="learning-kicker">Last commit · HEAD</span><h4>{step.head} · {head.message}</h4></div>
        <div className="file-path">reading-list.md</div>
        {lines(head.lines)}
      </section>
      <section className="snapshot-file" aria-label="The shelf">
        <div className="commit-panel-heading"><span className="learning-kicker">git stash list</span><h4>The shelf</h4></div>
        {step.stashes.length ? <ol className="stash-entries">{step.stashes.map(entry => <li key={entry}>{entry}</li>)}</ol> : <p className="fork-empty">Empty. Nothing is set aside.</p>}
      </section>
    </div>
    <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
      <span className="learning-kicker">Step {index + 1} of {stashSteps.length} · {step.title}</span>
      <h4><code>{step.command}</code></h4>
      <pre tabIndex={0} aria-label="Command output"><code>{step.output}</code></pre>
      <p>{step.explanation}</p>
      <p><code>git status --short</code> → <code>{step.status || "(no output: clean)"}</code></p>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Back</button>
        <button type="button" disabled={index === stashSteps.length - 1} onClick={() => setIndex(index + 1)}>Next</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => setIndex(0)}>Start over</button></div>
    </div>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>{stashSteps.map((item, i) => `${i + 1}. ${item.title}: ${item.explanation}`).join(" ")}</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every step.</p></noscript>
  </div>;
}
