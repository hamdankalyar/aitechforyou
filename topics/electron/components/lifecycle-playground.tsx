"use client";

import { useId, useState } from "react";
import { lifecycle, platforms, type LifecycleAction, type Platform } from "@/topics/electron/content/electron-lifecycle-lab";

// Same building blocks as the Git merge playground: inspection-questions, branch-panels, snapshot-file, inspection-answer, lab-actions.
export function LifecyclePlayground() {
  const group = useId();
  const [platform, setPlatform] = useState<Platform>("win32");
  const [actions, setActions] = useState<LifecycleAction[]>([]);
  const state = lifecycle(platform, actions);
  const act = (action: LifecycleAction) => setActions([...actions, action]);
  const name = platforms.find(item => item.id === platform)!.label;

  return <div className="snapshot-lab lifecycle-lab" aria-label="Electron app lifecycle practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no app running</span></div>
    <h3>Close the last window. Does the app quit?</h3>
    <p className="lab-instruction">Pick a system and start the app. Open and close windows. On macOS, click the Dock icon after every window is closed. Changing the system starts over.</p>
    <fieldset className="inspection-questions"><legend>Which system is the app running on?</legend>{platforms.map(item => <label key={item.id}>
      <input type="radio" name={group} checked={platform === item.id} onChange={() => { setPlatform(item.id); setActions([]); }} />
      <span>{item.label}<code>process.platform === &apos;{item.id}&apos;</code></span>
    </label>)}</fieldset>
    <div className="branch-panels">
      <section className="snapshot-file" aria-label="The app now">
        <div className="commit-panel-heading"><span className="learning-kicker">{name}</span><h4>The app now</h4></div>
        <div className="file-path">{state.running ? "App is running" : "App is not running"}</div>
        <div className="file-lines">{state.windows.length ? state.windows.map((id, index) => <div className="file-line" key={id}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>Window {id}</code></div>) : <p className="commit-empty">{state.running ? "No windows open · still in the Dock" : "No windows open"}</p>}</div>
      </section>
      <div className="inspection-answer" role="status" aria-live="polite" aria-atomic="true">
        <span className="learning-kicker">Code that ran in main.js</span>
        <h4><code>{state.event ?? "Nothing ran"}</code></h4>
        {state.code && <pre tabIndex={0} aria-label="Code that ran"><code>{state.code}</code></pre>}
        <p>{state.explanation}</p>
      </div>
    </div>
    <div className="lab-actions">
      <div className="lab-step-buttons">
        <button type="button" disabled={state.running} onClick={() => act("start")}>Start the app</button>
        <button type="button" disabled={!state.running} onClick={() => act("open")}>Open another window</button>
        <button type="button" disabled={!state.windows.length} onClick={() => act("close")}>Close a window</button>
        {platform === "darwin" && <button type="button" disabled={!state.running} onClick={() => act("dock")}>Click the Dock icon</button>}
      </div>
      <div className="lab-step-buttons"><button type="button" disabled={!actions.length} onClick={() => setActions([])}>Start over</button></div>
    </div>
    <p className="lab-instruction">The buttons act like a user. The answer panel shows which part of the lecture’s main.js code ran.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>Starting the app runs app.whenReady, which opens Window 1. Opening another window calls createWindow again. Closing a window that is not the last one runs no code. Closing the last window fires window-all-closed. On Windows and Linux, process.platform is not darwin, so app.quit ends the app. On macOS the app keeps running with no windows. Clicking the Dock icon fires activate, and because no windows are open, createWindow opens a new one.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every outcome.</p></noscript>
  </div>;
}
