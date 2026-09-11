"use client";

import { useState } from "react";
import { forkCommits, forkSteps, labelChanges, type ForkLabels } from "@/topics/git/content/git-fork-lab";

export function ForkPlayground() {
  const [index, setIndex] = useState(0);
  const step = forkSteps[index];
  const previous = index > 0 ? forkSteps[index - 1] : null;
  const place = (title: string, term: string, labels: ForkLabels | null, before: ForkLabels | null, empty: string, head?: string | null) => {
    const { rows, removed } = labelChanges(labels, before);
    return <section className="snapshot-file fork-place" aria-label={title}>
      <div className="commit-panel-heading"><span className="learning-kicker">{term}</span><h4>{title}</h4></div>
      {labels ? <ul className="fork-labels">{rows.map(row => <li key={row.name}><code>{head === row.name ? "HEAD → " : ""}{row.name}</code><span>→ {row.id}</span>{row.note && <small>{row.note}</small>}</li>)}{removed.map(name => <li className="is-removed" key={name}><code>{name}</code><small>removed</small></li>)}</ul> : <p className="fork-empty">{empty}</p>}
    </section>;
  };

  return <div className="snapshot-lab fork-lab" aria-label="Fork and pull request practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>One change, four places.</h3>
    <p className="lab-instruction">Step through the journey. Each card lists the labels in that place; new and moved labels are marked at every step.</p>
    <div className="fork-places">
      {place("sam/reading-list", "Original · upstream", step.upstream, previous?.upstream ?? null, "")}
      {place("maya/reading-list", "Your fork · origin", step.fork, previous?.fork ?? null, "Not created yet.")}
      {place("laptop", "Your clone", step.laptop, previous?.laptop ?? null, "Not cloned yet.", step.head)}
      <section className="snapshot-file fork-place" aria-label="Pull request">
        <div className="commit-panel-heading"><span className="learning-kicker">On the service</span><h4>Pull request #1</h4></div>
        <p className="fork-empty">{step.pr === "none" ? "Not opened yet." : step.pr === "open" ? "Open: maya:add-piranesi → sam:main. Points at your branch; Sam can review it." : "Merged into sam:main as commit M."}</p>
      </section>
    </div>
    <p className="fork-legend">{Object.entries(forkCommits).map(([id, message]) => `${id} ${message}`).join(" · ")}</p>
    <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
      <span className="learning-kicker">Step {index + 1} of {forkSteps.length} · {step.title}</span>
      <h4><code>{step.command}</code></h4>
      <p>{step.explanation}</p>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Back</button>
        <button type="button" disabled={index === forkSteps.length - 1} onClick={() => setIndex(index + 1)}>Next</button>
      </div>
      <div className="lab-step-buttons"><button type="button" onClick={() => setIndex(0)}>Start over</button></div>
    </div>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>{forkSteps.map((item, i) => `${i + 1}. ${item.title}: ${item.explanation}`).join(" ")}</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every step.</p></noscript>
  </div>;
}
