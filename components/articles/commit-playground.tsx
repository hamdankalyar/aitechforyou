"use client";

import { useState } from "react";
import { getCommitLabState } from "@/lib/git-commit-lab";

export function CommitPlayground() {
  const [step, setStep] = useState(0);
  const [restaged, setRestaged] = useState(false);
  const state = getCommitLabState(step, restaged);
  const panels = [
    { label: "Your file now", term: "Working tree", text: state.working, caption: "The file you edit and save on your computer." },
    { label: "Prepared version", term: "Staging area", text: state.staged, caption: step === 3 ? "Still matches the commit. Committing does not empty the index." : "The contents Git will use for a normal commit." },
    { label: "Recorded version", term: "Commit", text: state.committed, caption: "A moment recorded in this project’s history." },
  ];

  return <div className="snapshot-lab commit-lab" aria-label="Edit, stage, and commit practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Which version will Git remember?</h3>
    <p className="lab-instruction">Start with Dune. Stage it, add another book, then commit. Use Back to try staging the later edit before committing.</p>
    <ol className="commit-lab-steps" aria-label="Example progress">{["Saved file", "Stage", "Edit again", "Commit"].map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}><span aria-hidden="true">{index + 1}</span>{label}</li>)}</ol>
    <div className="commit-lab-panels">{panels.map((panel, index) => <section className="snapshot-file" key={panel.label} aria-label={panel.label}>
      <div className="commit-panel-heading"><span className="learning-kicker">{panel.term}</span><h4>{panel.label}</h4></div>
      <div className="file-path">reading-list.md</div>
      <div className="file-lines">{panel.text === null ? <p className="commit-empty">{index === 1 ? "Not staged yet" : "No commits yet"}</p> : panel.text.trimEnd().split("\n").map((line, lineIndex) => <div className={`file-line${line.includes("The Hobbit") ? " diff-added" : ""}`} key={line}><span className="line-marker" aria-hidden="true">{lineIndex + 1}</span><code>{line}</code></div>)}</div>
      <p className="file-caption">{panel.caption}</p>
    </section>)}</div>
    <div className="commit-lab-result" role="status"><span className="learning-kicker">Step {step + 1} of 4</span><p>{state.explanation}</p></div>
    {step === 2 && <label className="commit-restage"><input type="checkbox" checked={restaged} onChange={event => setRestaged(event.target.checked)} /><span>Run <code>git add</code> again before committing<small>Checked: stage both books. Unchecked: replay the example without this extra step.</small></span></label>}
    <div className="lab-actions">
      <button type="button" className="lab-primary" disabled={step === 3} onClick={() => setStep(step + 1)}>{["Stage Dune", "Add The Hobbit and save", "Commit staged version", "Commit complete"][step]}<span aria-hidden="true">→</span></button>
      <div className="lab-step-buttons"><button type="button" disabled={step === 0} onClick={() => { setStep(step - 1); if (step <= 2) setRestaged(false); }}>Back</button><button type="button" onClick={() => { setStep(0); setRestaged(false); }}>Start over</button></div>
    </div>
    <p className="lab-instruction commit-lab-note">Back and Start over rewind this page example; they are not Git undo commands. The highlight marks The Hobbit wherever it appears.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>First, the file contains Dune. Staging copies that version into the proposed snapshot. Adding The Hobbit changes only the working file. A normal commit records Dune, leaving The Hobbit uncommitted. Running git add again before the commit includes both books instead. After either commit, the staging area still matches the recorded version.</p></details>
    <noscript><p>The controls need JavaScript. The written example explains both outcomes.</p></noscript>
  </div>;
}
