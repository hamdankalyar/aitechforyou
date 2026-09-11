"use client";

import { useId, useState } from "react";
import { conflictLab, conflictNotes, conflictSides, continueRefusal, mergeConflictOutput, resolutions, type ConflictPhase } from "@/topics/git/content/git-conflict-lab";

export function ConflictPlayground() {
  const group = useId();
  const [phase, setPhase] = useState<ConflictPhase>("conflict");
  const [resolution, setResolution] = useState<string | null>(null);
  const [command, setCommand] = useState("git merge sci-fi");
  const [output, setOutput] = useState(mergeConflictOutput);
  const [action, setAction] = useState("Git merged the lines it could and stopped at the ones it cannot decide. Nothing is committed; you are in the middle of a merge.");
  const lab = conflictLab(phase, resolution);
  const conflicted = phase === "conflict" && !resolution;

  function run(nextCommand: string, nextOutput: string, text: string, nextPhase?: ConflictPhase) {
    setCommand(nextCommand); setOutput(nextOutput); setAction(text); if (nextPhase) setPhase(nextPhase);
  }
  function finish() {
    if (phase !== "staged") return run("git merge --continue", continueRefusal, "Refused. Git only records the merge once every conflicted file has been staged.");
    run("git merge --continue", "[main E] Merge branch 'sci-fi'", lab.markersLeft ? "Committed, markers and all. Git did not check the content, so the next reader of this file gets a surprise. Start over and try git diff --check before staging." : "Merge commit E recorded with parents D and C, exactly like a merge without a conflict. Its file is the version you chose. sci-fi still points at C.", "committed");
  }

  return <div className="snapshot-lab conflict-lab" aria-label="Git merge conflict practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Both sides changed the same spot.</h3>
    <p className="lab-instruction">You are on main and ran git merge sci-fi. Read the three versions, choose the final text, stage it, then finish or abort.</p>
    <div className="inspection-panels">{conflictSides.map(side => <section key={side.title} className="snapshot-file" aria-label={`${side.title} version`}>
      <div className="commit-panel-heading"><span className="learning-kicker">{side.term}</span><h4>{side.title}</h4></div>
      <div className="file-path">reading-list.md</div>
      <div className="file-lines">{side.lines.map((line, index) => <div className="file-line" key={line}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>{line}</code></div>)}</div>
    </section>)}</div>
    <section className="snapshot-file conflict-file" aria-label="Your file now">
      <div className="commit-panel-heading"><span className="learning-kicker">Working tree · on main</span><h4>Your file now</h4></div>
      <div className="file-path">reading-list.md</div>
      <div className="file-lines">{lab.file.map((line, index) => <div className={`file-line${conflicted && conflictNotes[index] ? " is-conflict" : ""}`} key={`${index}-${line}`}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>{line}</code>{conflicted && conflictNotes[index] && <small className="line-note">{conflictNotes[index]}</small>}</div>)}</div>
    </section>
    <fieldset className="inspection-questions" disabled={phase !== "conflict"}><legend>Your answer: replace the marked block with…</legend>{resolutions.map(item => <label key={item.id}>
      <input type="radio" name={group} checked={resolution === item.id} onChange={() => { setResolution(item.id); run("(edit reading-list.md and save)", "", item.id === "markers" ? "You saved the file with the markers still inside. Git will not notice; git diff --check would." : "The file now holds your answer. Status still says UU: Git waits for git add before it treats the file as resolved."); }} />
      <span>{item.label}<code>{item.lines.slice(3).join(" · ")}</code></span>
    </label>)}</fieldset>
    <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
      <span className="learning-kicker">Last command</span>
      <h4><code>{command}</code></h4>
      {output && <pre tabIndex={0} aria-label="Command output"><code>{output}</code></pre>}
      <p>{action}</p>
      <p><code>git status --short</code> → <code>{lab.status || (phase === "staged" ? "(no output, still merging)" : "(no output: clean)")}</code>. {lab.branches}.</p>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={phase !== "conflict"} onClick={() => run("git diff --check", lab.check, lab.markersLeft ? "Leftover markers found. Fix the file before staging it." : "No output: no marker is left in the file.")}>Check for markers</button>
        <button type="button" disabled={phase !== "conflict" || !resolution} onClick={() => run("git add reading-list.md", "", conflictLab("staged", resolution).status ? "Staged. Git now treats the conflict in this file as resolved; status shows an ordinary staged modification." : "Staged. The file now matches what main already had, so status has nothing to list, but you are still merging until you finish or abort.", "staged")}>Stage the file</button>
        <button type="button" disabled={phase === "committed" || phase === "aborted"} onClick={finish}>Finish the merge</button>
        <button type="button" disabled={phase === "committed" || phase === "aborted"} onClick={() => run("git merge --abort", "", "Back to before the merge: main on D, no markers, clean status. Nothing is lost; sci-fi still has Foundation.", "aborted")}>Abort the merge</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => { setPhase("conflict"); setResolution(null); run("git merge sci-fi", mergeConflictOutput, "Start restored: the merge has just stopped with the conflict."); }}>Start over</button></div>
    </div>
    <p className="lab-instruction">Check for markers stands for git diff --check before staging. Stage needs an answer first. Finish before staging shows Git’s refusal. Finish and Abort are unavailable once the merge is over. Start over resets this page example.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>{"The merge stops with CONFLICT and status UU. The file shows main’s line between <<<<<<< HEAD and =======, and sci-fi’s line between ======= and >>>>>>> sci-fi. Editing the file to any answer leaves status at UU until git add, after which status shows M in the first column. git merge --continue before staging is refused; after staging it records merge commit E with parents D and C and the chosen text, even if markers were left in. git merge --abort at any point before that returns main to D with a clean status. git diff --check lists the lines that still hold markers."}</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
