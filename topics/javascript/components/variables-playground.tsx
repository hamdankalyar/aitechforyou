"use client";

import { useId, useState } from "react";
import { variablesExamples } from "@/topics/javascript/content/javascript-variables-lab";

export function VariablesPlayground() {
  const [mode, setMode] = useState<"let" | "const">("let");
  const [step, setStep] = useState(0);
  const id = useId();
  const states = variablesExamples[mode];
  const state = states[step];

  return <div className="snapshot-lab variables-lab" aria-label="Variables practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">One line of thought at a time</span></div>
    <h3>Same name. What value now?</h3>
    <p className="lab-instruction">Follow the let example, then switch to const. Each example starts fresh.</p>
    <fieldset className="variables-mode"><legend>Choose a declaration</legend>{(["let", "const"] as const).map(option => <label key={option}><input type="radio" name={id} checked={mode === option} onChange={() => { setMode(option); setStep(0); }} /><code>{option}</code></label>)}</fieldset>
    <dl className="variables-state"><div><dt>Variable name</dt><dd>viewerName</dd></div><div><dt>Current value</dt><dd>"{state.value}"</dd></div><div><dt>Value type</dt><dd>string</dd></div></dl>
    <div className="variables-panels">
      <section aria-label="Code so far"><h4>Code so far</h4><pre tabIndex={0} aria-label="JavaScript example"><code>{state.code}</code></pre></section>
      <section aria-label="Console output"><h4>Console output</h4><pre tabIndex={0} aria-label="Output in execution order"><code>{state.output.join("\n")}{state.error && `\n${state.error}: reassignment failed`}</code></pre></section>
    </div>
    <div className="variables-result" role="status" aria-atomic="true"><span className="learning-kicker">Step {step + 1} of {states.length} · {state.title}</span><p>{state.explanation}</p></div>
    <div className="lab-actions">
      <button type="button" className="lab-primary" disabled={step === states.length - 1} onClick={() => setStep(step + 1)}>{step === states.length - 1 ? "Example complete" : "Next step"}<span aria-hidden="true">→</span></button>
      <div className="lab-step-buttons"><button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button type="button" onClick={() => { setMode("let"); setStep(0); }}>Start over</button></div>
    </div>
    <p className="lab-instruction variables-note">Back revisits an earlier step; Start over resets both examples. These controls explain the code rather than undoing JavaScript execution.</p>
    <details className="lab-transcript"><summary>Read both examples without interacting</summary><p>With let, viewerName begins as Ali, and the first two outputs are Ali and string. Assigning Sara changes the current value and prints Sara. Calling toUpperCase() prints SARA, then printing viewerName again gives Sara: the method returned a new string without reassigning the variable.</p><p>In the separate const example, viewerName begins as Ali and prints Ali. Attempting to assign Sara throws a TypeError. The value remains Ali. const prevents reassignment; it does not change how string methods work.</p></details>
    <noscript><p>The controls need JavaScript. Open the written examples above to follow every step.</p></noscript>
  </div>;
}
