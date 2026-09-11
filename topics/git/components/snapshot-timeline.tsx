"use client";

import { useId, useState } from "react";
import { snapshots } from "@/topics/git/content/git-snapshots";

export function SnapshotTimeline() {
  const [selected, setSelected] = useState(2);
  const [edited, setEdited] = useState(false);
  const snapshot = snapshots[selected];
  const [announcement, setAnnouncement] = useState("");
  const groupName = useId();

  function select(index: number) {
    setSelected(index);
    setAnnouncement(`Viewing saved moment ${snapshots[index].id}. Your current file is unchanged.`);
  }

  return (
    <div className="snapshot-lab" aria-label="Reading list snapshot explorer">
      <div className="lab-topline"><span className="learning-kicker">Practice example · 01</span><span className="lab-local">Safe page simulation</span></div>
      <h3>Past version. Current file.</h3>
      <p className="lab-instruction">Choose a recorded moment on the left side of the story. The current file stays visible beside it.</p>
      <fieldset className="commit-timeline">
        <legend className="sr-only">Choose a recorded moment</legend>
        {snapshots.map((commit, index) => (
          <label key={commit.id} className={`commit-stop ${index === selected ? "is-selected" : ""}`}>
            <input className="sr-only" type="radio" name={groupName} checked={index === selected} onChange={() => select(index)} />
            <span className="commit-node">{commit.id}</span>
            <span className="commit-description">{commit.message}</span>
            <span className="commit-state">{index === selected ? "Viewing" : "Saved moment"}</span>
          </label>
        ))}
      </fieldset>
      <div className="timeline-legend" aria-hidden="true"><span>Earlier</span><strong>A → B → C</strong><span>Later</span></div>
      <div className="snapshot-panels">
        <div className="snapshot-file saved-file">
          <div className="file-heading"><span>Past version <strong>{snapshot.id}</strong></span><span className="file-badge">Recorded earlier</span></div>
          <div className="file-path">reading-list.md</div>
          <div className="file-lines" aria-label={`File recorded at moment ${snapshot.id}`}>
            <div className="file-line"><span className="line-marker" aria-hidden="true">1</span><code># Reading list</code></div>
            {snapshot.books.map((book, index) => <div className="file-line" key={book}><span className="line-marker" aria-hidden="true">{index + 2}</span><code>- {book}</code></div>)}
          </div>
          <p className="file-caption">This is what Git recorded at moment {snapshot.id}. Looking here does not change your current file.</p>
        </div>
        <div className="snapshot-file working-file">
          <div className="file-heading"><span>Your file now</span><span className={`file-badge ${edited ? "is-edited" : ""}`}>{edited ? "Changed today" : "Matches latest moment"}</span></div>
          <div className="file-path">reading-list.md</div>
          <div className="file-lines" aria-label="Current file on your computer">
            <div className="file-line"><span className="line-marker" aria-hidden="true">1</span><code># Reading list</code></div>
            {snapshots[2].books.map((book, index) => <div className="file-line" key={book}><span className="line-marker" aria-hidden="true">{index + 2}</span><code>- {book}</code></div>)}
            {edited && <div className="file-line diff-added"><span className="line-marker" aria-label="new line in current file">+</span><code>- Piranesi</code></div>}
          </div>
          <p className="file-caption">{edited ? "Piranesi exists only here. Git has not recorded another moment." : "Your current file begins with the version recorded at C."}</p>
        </div>
      </div>
      <div className="lab-actions">
        <button type="button" className="lab-primary" onClick={() => { setEdited(!edited); setAnnouncement(edited ? "Piranesi removed from the current file. Saved moments are unchanged." : "Piranesi added to the current file. Saved moments A, B, and C are unchanged."); }}>{edited ? "Remove Piranesi" : "Add Piranesi to my file"}<span aria-hidden="true">{edited ? "−" : "+"}</span></button>
        <button type="button" onClick={() => { setSelected(2); setEdited(false); setAnnouncement("Example reset. Viewing saved moment C; current file matches C."); }}>Reset this example</button>
      </div>
      <div className="lab-takeaway"><span aria-hidden="true">↳</span><p>{edited ? "Your current file changed. The three saved moments did not. Choose A, B, and C to check." : "Try this: add Piranesi, then look through all three saved moments."}</p></div>
      <span className="sr-only" role="status">{announcement}</span>
      <details className="lab-transcript"><summary>Read the example without interacting</summary><p>A records Dune. B records Dune and The Hobbit. C records A Wizard of Earthsea and The Hobbit. Adding Piranesi changes only the current file; A, B, and C remain unchanged.</p></details>
      <noscript><p>The controls need JavaScript, but the written example above explains the same idea.</p></noscript>
    </div>
  );
}
