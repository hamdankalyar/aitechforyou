"use client";

import { useState, type CSSProperties } from "react";
import { startupSteps } from "@/topics/electron/content/electron-startup-lab";

// Same building blocks as the Git commit playground: commit-lab-steps, commit-lab-panels, snapshot-file, commit-lab-result, lab-actions.
export function StartupPlayground() {
  const [step, setStep] = useState(0);
  const current = startupSteps[step];
  const last = startupSteps.length - 1;
  const rendererFile = ["preload.js", "index.html", "renderer.js"].includes(current.file) ? current.file : "";
  const panels = [
    { term: "Node.js", label: "Main process", file: step === 0 ? "package.json" : "main.js", lines: current.main, empty: "Not started" },
    { term: "Chromium", label: "Renderer process", file: rendererFile, lines: current.renderer, empty: "Not started yet" },
    { term: "What the user sees", label: "The window", file: current.page.length ? "index.html" : "", lines: current.page, empty: current.renderer.length ? "An empty window" : "No window yet" },
  ];

  return <div className="snapshot-lab commit-lab" aria-label="Electron app startup practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">Page simulation · no app running</span></div>
    <h3>Watch the four files run.</h3>
    <p className="lab-instruction">Press Next step to move through startup. Watch which process is busy and what the window shows.</p>
    <ol className="commit-lab-steps lab-steps-count" style={{ "--count": startupSteps.length } as CSSProperties} aria-label="Startup progress">{startupSteps.map((item, index) => <li key={item.label} aria-current={step === index ? "step" : undefined}><span aria-hidden="true">{index + 1}</span>{item.label}</li>)}</ol>
    <div className="commit-lab-panels">{panels.map(panel => <section className="snapshot-file" key={panel.label} aria-label={panel.label}>
      <div className="commit-panel-heading"><span className="learning-kicker">{panel.term}</span><h4>{panel.label}</h4></div>
      <div className="file-path">{panel.file || " "}</div>
      <div className="file-lines">{panel.lines.length ? panel.lines.map((line, index) => <div className="file-line" key={line}><span className="line-marker" aria-hidden="true">{index + 1}</span><code>{line}</code></div>) : <p className="commit-empty">{panel.empty}</p>}</div>
    </section>)}</div>
    <div className="commit-lab-result" role="status"><span className="learning-kicker">Step {step + 1} of {startupSteps.length} · {current.file}</span><p>{current.explanation}</p></div>
    <div className="lab-actions">
      <button type="button" className="lab-primary" disabled={step === last} onClick={() => setStep(step + 1)}>{step === last ? "Startup complete" : "Next step"}<span aria-hidden="true">→</span></button>
      <div className="lab-step-buttons"><button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button type="button" onClick={() => setStep(0)}>Start over</button></div>
    </div>
    <p className="lab-instruction">The version numbers are examples from Electron 26, the version used in the workshop.</p>
    <details className="lab-transcript"><summary>Read the example without interacting</summary><p>npm start runs Electron, which reads package.json and finds main.js. main.js runs in the main process and waits for app.whenReady. Then createWindow makes a BrowserWindow, which starts a renderer process. preload.js runs first in that renderer and listens for DOMContentLoaded. index.html loads with its Content Security Policy, and the version spans are empty. renderer.js runs from the script tag. Finally DOMContentLoaded fires and preload.js writes the Node, Chromium, and Electron versions into the page.</p></details>
    <noscript><p>The controls need JavaScript. The written example covers every step.</p></noscript>
  </div>;
}
