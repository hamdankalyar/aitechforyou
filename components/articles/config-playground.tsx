"use client";

import { useId, useState } from "react";

type IdentityKey = "name" | "email";
const initialGlobal = { name: "Maya Chen", email: "maya@example.com" };
const initialLocal = { name: "Maya Chen (Studio)", email: "maya@studio.example" };
const keys: IdentityKey[] = ["name", "email"];

export function ConfigPlayground() {
  const id = useId();
  const [globalValues, setGlobalValues] = useState(initialGlobal);
  const [localValues, setLocalValues] = useState(initialLocal);
  const [overrides, setOverrides] = useState({ name: false, email: true });
  const [announcement, setAnnouncement] = useState("");
  const hasEmptyValue = keys.some(key => (overrides[key] ? localValues[key] : globalValues[key]).trim() === "");

  function reset() {
    setGlobalValues(initialGlobal);
    setLocalValues(initialLocal);
    setOverrides({ name: false, email: true });
    setAnnouncement("Example reset. The name comes from global settings and the email comes from local settings.");
  }

  return (
    <div className="snapshot-lab config-lab" aria-label="Git configuration playground">
      <div className="lab-topline"><span className="learning-kicker">Practice example · 02</span><span className="lab-local">Only in this page</span></div>
      <h3>Your defaults. This project’s exceptions.</h3>
      <p className="lab-instruction">Edit the sample values. Toggle a local override to see where each result comes from.</p>
      <div className="config-scope-cards">
        <fieldset className="config-scope">
          <legend><span className="scope-letter" aria-hidden="true">G</span>Global defaults</legend>
          <p className="config-scope-note">Your starting point across projects.</p>
          <code className="config-file-path">~/.gitconfig</code>
          {keys.map(key => (
            <div className="config-field" key={key}>
              <label htmlFor={`${id}-global-${key}`}>Global {key}</label>
              <input id={`${id}-global-${key}`} type="text" autoComplete="off" spellCheck={false} maxLength={100} value={globalValues[key]} onChange={event => setGlobalValues(values => ({ ...values, [key]: event.target.value }))} onBlur={() => setAnnouncement(`Global ${key} updated. This project uses the ${overrides[key] ? "local override" : "global value"}.`)} />
              <span className="config-field-state">{overrides[key] ? "Saved behind the local override" : "Used by this project"}</span>
            </div>
          ))}
        </fieldset>
        <fieldset className="config-scope config-scope-local">
          <legend><span className="scope-letter" aria-hidden="true">L</span>Local overrides</legend>
          <p className="config-scope-note">An exception for the studio project.</p>
          <code className="config-file-path">.git/config</code>
          {keys.map(key => (
            <div className="config-field" key={key}>
              <label className="config-override-toggle"><input type="checkbox" checked={overrides[key]} onChange={event => { const checked = event.target.checked; setOverrides(values => ({ ...values, [key]: checked })); setAnnouncement(`${key === "name" ? "Name" : "Email"} now comes from ${checked ? "local" : "global"} settings.`); }} />Override {key} for this project</label>
              <label className="sr-only" htmlFor={`${id}-local-${key}`}>Local {key}</label>
              <input id={`${id}-local-${key}`} type="text" autoComplete="off" spellCheck={false} maxLength={100} value={localValues[key]} disabled={!overrides[key]} onChange={event => setLocalValues(values => ({ ...values, [key]: event.target.value }))} onBlur={() => setAnnouncement(`Local ${key} updated. It supplies this project’s ${key}.`)} />
              <span className="config-field-state">{overrides[key] ? "Overrides the global value" : "Off · no local entry in the example"}</span>
            </div>
          ))}
        </fieldset>
      </div>
      <div className="config-result" aria-labelledby={`${id}-result`}>
        <div className="config-result-heading"><span className="learning-kicker" id={`${id}-result`}>What Git finds in this project</span><span className="config-result-badge">Effective settings</span></div>
        <dl>
          {keys.map(key => (
            <div className="config-result-row" key={key}>
              <dt><code>user.{key}</code></dt>
              <dd><strong>{(overrides[key] ? localValues[key] : globalValues[key]) || "(empty value)"}</strong><span className={`config-origin ${overrides[key] ? "from-local" : "from-global"}`}>From {overrides[key] ? "local" : "global"}</span></dd>
            </div>
          ))}
        </dl>
        <p className="config-result-explanation">{overrides.name === overrides.email ? overrides.name ? "Both keys use local overrides. Your global defaults are still saved." : "Neither key has a local entry, so both values come from global settings." : `The ${overrides.name ? "name" : "email"} comes from local settings. The ${overrides.name ? "email" : "name"} comes from global settings. Git resolves each key separately.`}</p>
        {hasEmptyValue && <p className="config-empty-note">An empty setting still takes precedence; it does not fall back. Turn an override off to remove it. This shows configuration lookup—Git may reject an incomplete identity when committing.</p>}
      </div>
      <div className="lab-actions"><p className="config-hint">Try changing a global value while its override is on.</p><button type="button" onClick={reset}>Start over</button></div>
      <span className="sr-only" role="status">{announcement}</span>
      <details className="lab-transcript"><summary>Read the example without interacting</summary><p>The global name is Maya Chen and the global email is maya@example.com. Only the email has a local override: maya@studio.example. The result uses the global name and local email. Changing the global email leaves the local result unchanged. Turning off the email override reveals the updated global value. Reset returns to the initial values.</p></details>
      <noscript><p>The controls need JavaScript. The initial settings and the written example explain the same precedence rule.</p></noscript>
    </div>
  );
}
