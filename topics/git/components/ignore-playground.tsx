"use client";

import { useState } from "react";
import { explainIgnore, ignorePaths, ignoreRules, initiallyTracked, simulateStatus } from "@/topics/git/content/git-ignore-lab";

export function IgnorePlayground() {
  const [active, setActive] = useState(ignoreRules.map(() => true));
  const [envTracked, setEnvTracked] = useState(true);
  const [action, setAction] = useState("All five rules are on. .env is already tracked, so its rule changes nothing yet.");
  const rules = ignoreRules.filter((_, index) => active[index]).map(rule => rule.pattern);
  const results = ignorePaths.map(path => explainIgnore(path, path === ".env" ? envTracked : initiallyTracked.includes(path), rules));
  const status = simulateStatus(results);

  function toggle(index: number, checked: boolean) {
    setActive(values => values.map((value, i) => i === index ? checked : value));
    setAction(`${ignoreRules[index].pattern} is now ${checked ? "on" : "off"}. Read each path’s reason again.`);
  }

  return <div className="snapshot-lab ignore-lab" aria-label="Git ignore rules practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no files changed</span></div>
    <h3>Five rules. Seven paths.</h3>
    <p className="lab-instruction">Turn a rule on or off. The table shows what Git thinks of every path and why. .gitignore lines are numbered in the order of the rules that are on.</p>
    <fieldset className="ignore-rules"><legend>Rules in .gitignore</legend>{ignoreRules.map((rule, index) => <label key={rule.pattern}>
      <input type="checkbox" checked={active[index]} onChange={event => toggle(index, event.target.checked)} />
      <span><code>{rule.pattern}</code><small>{rule.note}</small></span>
    </label>)}</fieldset>
    <div className="learning-table" role="region" aria-label="What Git thinks of each path" tabIndex={0}><table>
      <caption>What Git thinks of each path</caption>
      <thead><tr><th scope="col">Path</th><th scope="col">Git’s view</th><th scope="col">Why</th></tr></thead>
      <tbody>{results.map(result => <tr key={result.path}><th scope="row"><code>{result.path}</code></th><td>{result.tracked ? "Tracked" : result.ignored ? "Ignored" : "Untracked"}</td><td>{result.reason}</td></tr>)}</tbody>
    </table></div>
    <div className="inspection-answer ignore-status" role="status" aria-live="polite" aria-atomic="true">
      <span className="learning-kicker">Untracked and ignored paths</span>
      <h4><code>git status --short --ignored</code></h4>
      {status ? <pre tabIndex={0} aria-label="Status result"><code>{status}</code></pre> : <p className="inspection-empty">No output. Every path is tracked and unchanged.</p>}
      <p>?? marks an untracked path. !! marks an ignored one and appears only with --ignored. Tracked files without changes print nothing.</p>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons"><button type="button" disabled={!envTracked} onClick={() => { setEnvTracked(false); setAction("git rm --cached .env removed it from the index and you committed. .env is untracked now, so the .env rule finally applies."); }}>Stop tracking .env</button></div>
      <div className="lab-step-buttons"><button type="button" onClick={() => { setActive(ignoreRules.map(() => true)); setEnvTracked(true); setAction("Start restored: all rules on, .env tracked again."); }}>Start over</button></div>
    </div>
    <p className="inspection-action" role="status">{action}</p>
    <p className="lab-instruction">Stop tracking stands for git rm --cached .env followed by a commit. It is unavailable once .env is untracked. Start over resets this page example.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>With all rules on, debug.log and logs/build.log are ignored by *.log; important.log is re-included by the ! rule and stays untracked; notes/draft.md and notes/keep.md are both ignored because notes/ excludes the folder, so !notes/keep.md has no effect; .env and reading-list.md are tracked and unaffected. Turning notes/ off makes notes/draft.md untracked and lets !notes/keep.md apply. Stopping tracking of .env makes it untracked, and the .env rule then hides it.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
