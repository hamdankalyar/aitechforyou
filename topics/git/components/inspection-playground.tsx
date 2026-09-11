"use client";

import { useId, useState } from "react";
import { inspectReadingList, inspectionLines, inspectionQuestions } from "@/topics/git/content/git-inspection-lab";

export function InspectionPlayground() {
  const group = useId();
  const [question, setQuestion] = useState(1);
  const [recorded, setRecorded] = useState(2);
  const [staged, setStaged] = useState(3);
  const [action, setAction] = useState("Dune is recorded. The Hobbit is staged. Piranesi is saved only in the working file.");
  const selected = inspectionQuestions[question];
  const output = inspectReadingList(recorded, staged, question);

  return <div className="snapshot-lab inspection-lab" aria-label="Git inspection practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Same file. Different questions.</h3>
    <p className="lab-instruction">Choose a question. The outlined panels show the versions Git compares. Then stage or commit and ask again.</p>
    <fieldset className="inspection-questions"><legend>What do you want to know?</legend>{inspectionQuestions.map((item, index) => <label key={item.command}>
      <input type="radio" name={group} checked={question === index} onChange={() => setQuestion(index)} />
      <span>{item.question}<code>{item.command}</code></span>
    </label>)}</fieldset>
    <div className="inspection-panels">{[
      { title: "Recorded", term: "Latest commit · HEAD", count: recorded },
      { title: "Prepared", term: "Staging area · index", count: staged },
      { title: "Current", term: "Working tree", count: 4 },
    ].map((panel, index) => <section key={panel.title} className={`snapshot-file${selected.endpoints.includes(index) ? " is-compared" : ""}`} aria-label={`${panel.title} version`}>
      <div className="commit-panel-heading"><span className="learning-kicker">{panel.term}</span><h4>{panel.title}</h4></div>
      <div className="file-path">reading-list.md</div>
      <div className="file-lines">{inspectionLines.slice(0, panel.count).map((line, lineIndex) => <div className="file-line" key={line}><span className="line-marker" aria-hidden="true">{lineIndex + 1}</span><code>{line}</code></div>)}</div>
    </section>)}</div>
    <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
      <span className="learning-kicker">{selected.comparison}</span>
      <h4><code>{selected.command}</code></h4>
      {output ? <><p>{question === 0 ? "Example output. First column: staged; second column: unstaged." : "Diff excerpt · file headers and line-range markers omitted. + marks an added line; a leading space marks unchanged context."}</p><pre tabIndex={0} aria-label="Inspection result"><code>{output.trimEnd().split("\n").map((line, index) => <span className={line.startsWith("+") ? "diff-added" : ""} key={index}>{line}{"\n"}</span>)}</code></pre></> : <p className="inspection-empty">No output. {question === 0 ? "This practice project is clean." : "These two versions match."}</p>}
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons"><button type="button" disabled={staged === 4} onClick={() => { setStaged(4); setAction("git add prepared all three books. Your working file and history did not change."); }}>Stage current file</button><button type="button" disabled={recorded === staged} onClick={() => { setRecorded(staged); setAction("git commit recorded the prepared version. Later working-file edits stay where they are."); }}>Commit staged version</button></div>
      <div className="lab-step-buttons"><button type="button" onClick={() => { setRecorded(2); setStaged(3); setQuestion(1); setAction("Start restored: Dune recorded, The Hobbit staged, Piranesi only in your file."); }}>Start over</button></div>
    </div>
    <p className="inspection-action" role="status">{action}</p>
    <p className="lab-instruction">Stage is unavailable when the current file already matches the index. Commit is unavailable when no change is staged. Start over resets this page example.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>Initially, status shows MM: one staged change and one later unstaged change in the same file. Plain diff adds Piranesi; staged diff adds The Hobbit; diff HEAD adds both. Staging again makes plain diff empty while staged diff shows both books. Committing then makes all three versions equal. Alternatively, committing before staging again records The Hobbit and leaves Piranesi unstaged. No inspection command changes a file.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
