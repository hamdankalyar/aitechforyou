"use client";

import { useId, useState } from "react";
import { callbackArraySource, callbackArraySteps } from "../content/javascript-callback-array-trace";
import { copyArraySource, copyArraySteps } from "../content/javascript-copy-array-trace";
import { callStackSteps, principlesSource, principlesSteps, type CallStage } from "../content/javascript-principles-trace";

function Points({ points }: { points: string[] }) {
  return <ul>{points.map(point => <li key={point}>{point.split("**").map((text, index) => index % 2 ? <strong key={index}>{text}</strong> : text)}</li>)}</ul>;
}

export function CallStackTrace() {
  const [step, setStep] = useState(0);
  const moment = callStackSteps[step];
  const finished = step === callStackSteps.length - 1;

  return <section className="execution-lab call-stack-lab" aria-labelledby="call-stack-trace-title">
    <div className="execution-topline"><span>Interactive stack</span><span>Step {step + 1} / {callStackSteps.length}</span></div>
    <h3 id="call-stack-trace-title">Watch the stack change</h3>
    <div className="execution-controls">
      <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>
      <button type="button" className="execution-next" onClick={() => setStep(step + 1)} disabled={finished}>{finished ? "Complete" : "Next step"}<span aria-hidden="true">→</span></button>
      <button type="button" onClick={() => setStep(0)}>Start over</button>
    </div>
    <div className="call-stack-workspace">
      <div className="execution-code" role="region" aria-label="Call stack example code" tabIndex={0}>
        <div className="execution-panel-title"><strong>principles.js</strong><span>{moment.line ? `Line ${moment.line}` : finished ? "Finished" : "Before line 1"}</span></div>
        <pre>{principlesSource.map((line, index) => <code key={index} className={moment.line === index + 1 ? "is-active" : undefined} aria-current={moment.line === index + 1 ? "step" : undefined}><span className="execution-line-number">{index + 1}</span><span className="execution-line-marker" aria-hidden="true">{moment.line === index + 1 ? "→" : ""}</span><span>{line || " "}</span></code>)}</pre>
      </div>
      <div className="execution-stack call-stack-diagram" role="region" aria-label="Current call stack">
        <h4>Call stack <small>Top first</small></h4>
        <ol>{moment.stack.map((frame, index) => <li key={frame} className={index === 0 ? "is-active" : undefined}><code>{frame}</code><small>{index === 0 ? "Running · top" : "Waiting"}</small></li>)}</ol>
        {moment.stack.length === 0 && <div className="call-stack-empty">Empty stack</div>}
      </div>
    </div>
    <div className="execution-status" role="status" aria-atomic="true"><h4>{moment.title}</h4><Points points={moment.points} /></div>
    <noscript><Points points={["**The controls** need JavaScript enabled."]} /></noscript>
  </section>;
}

function FunctionContext({ input, stage, number, callback = false }: { input: number; stage: CallStage; number: number; callback?: boolean }) {
  if (stage === "waiting") return null;
  const active = stage !== "closed";
  const hasInput = ["bound", "calculated", "returning", "closed"].includes(stage);
  const parameter = callback ? "input" : "inputNumber";
  const hasResult = ["calculated", "returning", "closed"].includes(stage);
  return <div className={`execution-context${active ? " is-active" : ""}${stage === "closed" ? " is-closed" : ""}`}>
    <div className="execution-context-heading"><strong>Call {number}</strong><span>{stage === "closed" ? "Closed · history" : stage === "returning" ? "Returning" : "Running"}</span></div>
    <code>{callback && `instructions(${input}) = `}multiplyBy2({input})</code>
    <div className="execution-context-body">
      <div className="execution-thread"><span>Thread</span><strong>{stage === "entered" ? "Enter function" : stage === "bound" ? `${parameter} = ${input}` : stage === "calculated" ? `${input} * 2 = ${input * 2}` : stage === "returning" ? `return ${input * 2}` : "Call ended"}</strong></div>
      <div className="execution-local"><span>Local memory</span><dl>{hasInput && <div><dt>{parameter}</dt><dd>{input}</dd></div>}{hasResult && !callback && <div><dt>result</dt><dd>{input * 2}</dd></div>}</dl></div>
    </div>
    {(stage === "returning" || stage === "closed") && <div className="execution-return"><span aria-hidden="true">↗</span> {input * 2} {stage === "closed" && !callback ? "stored in" : "returns to"} <code>{callback ? "copyArrayAndManipulate" : number === 1 ? "output" : "newOutput"}</code></div>}
  </div>;
}

function PrinciplesBoard({ step }: { step: number }) {
  const moment = principlesSteps[step];
  const activeCall = moment.calls.findIndex(stage => stage !== "waiting" && stage !== "closed");
  const finished = step === principlesSteps.length - 1;
  return (<div className="execution-board">
      {step > 0 && <>
      <div className="execution-contexts">
        <h4>Execution contexts</h4>
        <div className={`execution-global${activeCall === -1 && !finished ? " is-active" : ""}`}><strong>Global context</strong><span>{finished ? "Complete" : activeCall === -1 ? "Running" : `Paused at line ${activeCall === 0 ? 7 : 8}`}</span></div>
        <FunctionContext input={3} stage={moment.calls[0]} number={1} />
        <FunctionContext input={10} stage={moment.calls[1]} number={2} />
      </div>
      <div className="execution-memory">
        <h4>Global memory</h4>
        <dl>{["num", "multiplyBy2", "output", "newOutput"].map((name, index) => {
          if (step < [1, 2, 3, 8][index]) return null;
          const value = index === 1 ? "ƒ" : moment.globals[index > 1 ? index - 1 : index];
          return <div key={name} className={value === null ? "is-uninitialized" : undefined}><dt>{name}</dt><dd>{value === null ? "uninitialized" : value}{index === 1 && <small>saved function</small>}</dd></div>;
        })}</dl>
        <div className="execution-stack"><h4>Call stack <small>Top first</small></h4><ol>{activeCall !== -1 && <li className="is-active">multiplyBy2({activeCall === 0 ? 3 : 10})</li>}{!finished && <li>global</li>}{finished && <li className="execution-stack-empty">Empty</li>}</ol></div>
      </div>
      </>}
    </div>);
}

function CopyArrayBoard({ step, callback = false }: { step: number; callback?: boolean }) {
  const steps = callback ? callbackArraySteps : copyArraySteps;
  const moment = steps[step];
  const callbacks = callback ? callbackArraySteps[step].callbacks : [];
  const activeCallback = callbacks.findIndex(stage => stage !== "waiting" && stage !== "closed");
  const functionName = callback ? "copyArrayAndManipulate" : "copyArrayAndMultiplyBy2";
  const call = callback ? `${functionName}([1, 2, 3], multiplyBy2)` : `${functionName}(myArray)`;
  const inCall = !["global", "closed"].includes(moment.stage);
  const finished = step === steps.length - 1;
  const hasInput = !["global", "entered"].includes(moment.stage);
  const arrayValue = (value: number[]) => `[${value.join(", ")}]`;

  return <div className="execution-board copy-array-board">{step > 0 && <>
    <div className="execution-contexts">
      <h4>Execution contexts</h4>
      <div className={`execution-global${!inCall && !finished ? " is-active" : ""}`}><strong>Global context</strong><span>{finished ? "Complete" : inCall ? "Paused at line 10" : "Running"}</span></div>
      {moment.stage !== "global" && <div className={`execution-context${!inCall ? " is-closed" : activeCallback === -1 ? " is-active" : ""}`}>
        <div className="execution-context-heading"><strong>Function call</strong><span>{moment.stage === "closed" ? "Closed · history" : moment.stage === "returning" ? "Returning" : activeCallback !== -1 ? "Paused" : "Running"}</span></div>
        <code>{call}</code>
        <div className="execution-context-body">
          <div className="execution-thread"><span>Thread</span><strong>{moment.thread}</strong>{moment.index !== null && <><span>Loop block scope</span><strong>i = {moment.index}</strong></>}</div>
          <div className="execution-local"><span>Local memory</span><dl>
            {hasInput && <div><dt>array</dt><dd>[1, 2, 3]</dd></div>}
            {hasInput && callback && <div><dt>instructions</dt><dd>ƒ<small>multiplyBy2 reference</small></dd></div>}
            {moment.output !== null && <div><dt>output</dt><dd>{arrayValue(moment.output)}</dd></div>}
          </dl></div>
        </div>
        {["returning", "closed"].includes(moment.stage) && <div className="execution-return"><span aria-hidden="true">↗</span> [2, 4, 6] {moment.stage === "closed" ? "stored in" : "returns to"} <code>result</code></div>}
      </div>}
      {callbacks.map((stage, index) => <FunctionContext key={index} input={index + 1} stage={stage} number={index + 1} callback />)}
    </div>
    <div className="execution-memory">
      <h4>Global memory</h4>
      <dl>
        <div><dt>{functionName}</dt><dd>ƒ<small>saved function</small></dd></div>
        {step >= 2 && (callback ? <div><dt>multiplyBy2</dt><dd>ƒ<small>saved function</small></dd></div> : <div><dt>myArray</dt><dd>[1, 2, 3]</dd></div>)}
        {step >= 3 && <div className={moment.stage !== "closed" ? "is-uninitialized" : undefined}><dt>result</dt><dd>{moment.stage === "closed" ? "[2, 4, 6]" : "uninitialized"}</dd></div>}
      </dl>
      <div className="execution-stack"><h4>Call stack <small>Top first</small></h4><ol>
        {activeCallback !== -1 && <li className="is-active">instructions({activeCallback + 1}) · multiplyBy2({activeCallback + 1})</li>}
        {inCall && <li className={activeCallback === -1 ? "is-active" : undefined}>{call}{activeCallback !== -1 && <small>Paused</small>}</li>}
        {!finished && <li>global</li>}
        {finished && <li className="execution-stack-empty">Empty</li>}
      </ol></div>
    </div>
  </>}</div>;
}

export function ExecutionContextTrace({ example }: { example?: "copy-array" | "callback-array" }) {
  const [step, setStep] = useState(0);
  const titleId = useId();
  const callback = example === "callback-array";
  const copyArray = example === "copy-array" || callback;
  const steps = callback ? callbackArraySteps : copyArray ? copyArraySteps : principlesSteps;
  const source = callback ? callbackArraySource : copyArray ? copyArraySource : principlesSource;
  const moment = steps[step];
  const finished = step === steps.length - 1;

  return <section className="execution-lab" aria-labelledby={titleId}>
    <div className="execution-topline"><span>Interactive blackboard</span><span>Step {step + 1} / {steps.length}</span></div>
    <h3 id={titleId}>{callback ? "Follow the callback calls" : "Follow the thread of execution"}</h3>
    <Points points={["**Next step** moves the code and memory together.", "**Back** revisits the previous state."]} />
    <div className="execution-controls">
      <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0}>Back</button>
      <button type="button" className="execution-next" onClick={() => setStep(step + 1)} disabled={finished}>{finished ? "Complete" : "Next step"}<span aria-hidden="true">→</span></button>
      <button type="button" onClick={() => setStep(0)}>Start over</button>
    </div>
    <label className="execution-scrubber">Walkthrough progress<input type="range" min={0} max={steps.length - 1} value={step} aria-valuetext={`Step ${step + 1}: ${moment.title}`} onChange={event => setStep(Number(event.target.value))} /></label>

    <div className="execution-workspace">
    <div className="execution-code" role="region" aria-label="Code being traced" tabIndex={0}>
      <div className="execution-panel-title"><strong>{callback ? "callbacks.js" : copyArray ? "copy-array.js" : "principles.js"}</strong><span>{moment.line ? `Line ${moment.line}` : finished ? "Finished" : "Before line 1"}</span></div>
      <pre>{source.map((line, index) => <code key={index} className={moment.line === index + 1 ? "is-active" : undefined} aria-current={moment.line === index + 1 ? "step" : undefined}><span className="execution-line-number">{index + 1}</span><span className="execution-line-marker" aria-hidden="true">{moment.line === index + 1 ? "→" : ""}</span><span>{line || " "}</span></code>)}</pre>
    </div>

    {copyArray ? <CopyArrayBoard step={step} callback={callback} /> : <PrinciplesBoard step={step} />}
    </div>

    <div className="execution-status" role="status" aria-atomic="true"><span>Step {step + 1}{moment.line ? ` · Line ${moment.line}` : ""}</span><h4>{moment.title}</h4><Points points={moment.points} /></div>
    <details className="execution-transcript"><summary>Read every step</summary><ol>{steps.map((item, index) => <li key={item.title}><strong>{index + 1}. {item.title}</strong><Points points={item.points} /></li>)}</ol></details>
    <noscript><Points points={["**The controls** need JavaScript enabled.", "**Read every step** contains the full walkthrough."]} /></noscript>
  </section>;
}
