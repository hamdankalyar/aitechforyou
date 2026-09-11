"use client";

import { useState } from "react";
import { snapshotDifference, snapshots } from "@/lib/git-snapshots";

export function SnapshotTimeline() {
  const [selected, setSelected] = useState(2);
  const [compare, setCompare] = useState(false);
  const [edited, setEdited] = useState(false);
  const snapshot = snapshots[selected];
  const [announcement, setAnnouncement] = useState("");

  function select(index: number) {
    setSelected(index);
    setAnnouncement(`Viewing commit ${snapshots[index].id}. ${snapshots[index].message}. Your current file is unchanged.`);
  }

  return (
    <div className="snapshot-lab" aria-label="Reading list snapshot explorer">
      <div className="lab-topline"><span className="learning-kicker">Practice example · 01</span><span className="lab-local">Only in this page</span></div>
      <h3>Same project. Different moments.</h3>
      <p className="lab-instruction">Choose a saved moment. Your current file has its own panel.</p>
      <div className="commit-timeline" role="group" aria-label="Select a saved commit">
        {snapshots.map((commit, index) => (
          <button key={commit.id} type="button" className={`commit-stop ${index === selected ? "is-selected" : ""} ${commit.id === snapshot.parent ? "is-parent" : ""}`} aria-pressed={index === selected} aria-label={`View commit ${commit.id}: ${commit.message}`} onClick={() => select(index)}>
            <span className="commit-node">{commit.id}</span>
            <span className="commit-description">{commit.message}</span>
            <span className="commit-state">{index === selected ? "Viewing" : commit.id === snapshot.parent ? "Parent of selected" : "Saved snapshot"}</span>
          </button>
        ))}
      </div>
      <div className="timeline-legend"><span>Parent links: C → B → A</span><span className="branch-label">HEAD → main → C</span></div>
      <div className="lab-toolbar">
        <label className="compare-toggle"><input type="checkbox" checked={compare} onChange={event => setCompare(event.target.checked)} />Compare with parent</label>
        <div className="lab-step-buttons"><button type="button" disabled={selected === 0} onClick={() => select(selected - 1)} aria-label="View previous commit">← Back</button><button type="button" disabled={selected === 2} onClick={() => select(selected + 1)} aria-label="View next commit">Next →</button></div>
      </div>
      <div className="snapshot-panels">
        <div className="snapshot-file saved-file">
          <div className="file-heading"><span>Saved snapshot <strong>{snapshot.id}</strong></span><span className="file-badge">Recorded</span></div>
          <div className="file-path">reading-list.md</div>
          <div className="file-lines" aria-label={compare ? `Commit ${snapshot.id} compared with ${snapshot.parent ?? "an empty project"}` : `File saved in commit ${snapshot.id}`}>
            <div className={`file-line ${compare && selected === 0 ? "diff-added" : ""}`}><span className="line-marker" aria-hidden="true">{compare ? selected === 0 ? "+" : " " : "1"}</span><code># Reading list</code></div>
            {compare ? snapshotDifference(selected).map(({ book, kind }) => (
              <div className={`file-line diff-${kind}`} key={`${kind}-${book}`}><span className="line-marker" aria-label={kind}>{kind === "added" ? "+" : kind === "removed" ? "−" : " "}</span><code>- {book}</code></div>
            )) : snapshot.books.map((book, index) => <div className="file-line" key={book}><span className="line-marker" aria-hidden="true">{index + 2}</span><code>- {book}</code></div>)}
          </div>
          <p className="file-caption">{compare ? snapshot.parent ? `Compared with ${snapshot.parent}. + added · − removed` : "A has no parent. Compare with an empty project: every line is new." : `${snapshot.message}. ${snapshot.parent ? `Parent: ${snapshot.parent}.` : "First commit; no parent."}`}</p>
        </div>
        <div className="snapshot-file working-file">
          <div className="file-heading"><span>Current file</span><span className={`file-badge ${edited ? "is-edited" : ""}`}>{edited ? "Modified" : "Matches C"}</span></div>
          <div className="file-path">reading-list.md</div>
          <div className="file-lines" aria-label="Current working file">
            <div className="file-line"><span className="line-marker" aria-hidden="true">1</span><code># Reading list</code></div>
            {snapshots[2].books.map((book, index) => <div className="file-line" key={book}><span className="line-marker" aria-hidden="true">{index + 2}</span><code>- {book}</code></div>)}
            {edited && <div className="file-line diff-added"><span className="line-marker" aria-label="uncommitted addition">+</span><code>- Piranesi</code></div>}
          </div>
          <p className="file-caption">{edited ? "Piranesi is only in your working file. No new commit yet." : "Your working file begins with the contents saved in C."}</p>
        </div>
      </div>
      <div className="lab-actions">
        <button type="button" className="lab-primary" onClick={() => { setEdited(!edited); setAnnouncement(edited ? "Working file restored to C. Saved snapshots are unchanged." : "Piranesi added to your working file. Saved snapshots A, B, and C are unchanged."); }}>{edited ? "Undo current edit" : "Add Piranesi to current file"}<span aria-hidden="true">{edited ? "↶" : "+"}</span></button>
        <button type="button" onClick={() => { setSelected(2); setCompare(false); setEdited(false); setAnnouncement("Example reset. Viewing C; current file matches C; comparison off."); }}>Start over</button>
      </div>
      <div className="lab-takeaway"><span aria-hidden="true">↳</span><p>{edited ? "Your file changed. Your history didn’t. Select any commit above to see for yourself." : "Try this: add a book to the current file, then look at an earlier snapshot."}</p></div>
      <span className="sr-only" role="status">{announcement}</span>
      <details className="lab-transcript"><summary>Read the example without interacting</summary><p>A records Dune. B records Dune and The Hobbit. C records A Wizard of Earthsea and The Hobbit. C’s parent is B; B’s parent is A. Adding Piranesi to the working file leaves all three saved snapshots unchanged. Selecting a snapshot only previews it; main and HEAD stay at C.</p></details>
      <noscript><p>Interactive controls need JavaScript. The three snapshots above and the written example explain the same idea.</p></noscript>
    </div>
  );
}
