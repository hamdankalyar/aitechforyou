import { counterInsideSteps, counterReturnedSteps } from "../content/javascript-closure-counter-trace";

export function ClosureCounterBoard({ step, returned }: { step: number; returned: boolean }) {
  const steps = returned ? counterReturnedSteps : counterInsideSteps;
  const moment = steps[step];
  const inOuter = moment.outer !== "waiting" && moment.outer !== "closed";
  const activeCall = moment.calls.findIndex(stage => stage !== "waiting" && stage !== "closed");
  const finished = step === steps.length - 1;
  const hasFunction = ["defined", "returning", "closed"].includes(moment.outer);
  const captured = returned && moment.outer === "closed";
  const callLabel = returned ? "newFunc() · add1()" : "add1()";

  return <div className="execution-board closure-board">{step > 0 && <>
    <div className="execution-contexts">
      <h4>Execution contexts</h4>
      <div className={`execution-global${!inOuter && activeCall === -1 && !finished ? " is-active" : ""}`}><strong>Global context</strong><span>{finished ? "Complete" : inOuter || activeCall !== -1 ? `Paused at line ${inOuter ? returned ? 7 : 9 : activeCall + 8}` : "Running"}</span></div>
      {moment.outer !== "waiting" && <div className={`execution-context${!inOuter ? " is-closed" : activeCall === -1 ? " is-active" : ""}`}>
        <div className="execution-context-heading"><strong>Outer call</strong><span>{!inOuter ? "Closed · history" : activeCall !== -1 ? "Paused" : moment.outer === "returning" ? "Returning" : "Running"}</span></div>
        <code>outer()</code>
        <div className="execution-context-body">
          <div className="execution-thread"><span>Thread</span><strong>{!inOuter ? "Call ended" : activeCall !== -1 ? "Wait for add1()" : moment.outer === "entered" ? "Enter outer" : moment.outer === "initialized" ? "counter = 0" : moment.outer === "returning" ? "return add1" : "add1 is saved"}</strong></div>
          <div className="execution-local"><span>Local memory{captured ? " (at return)" : ""}</span><dl>
            {moment.counter !== null && <div><dt>counter</dt><dd>{captured ? 0 : moment.counter}</dd></div>}
            {hasFunction && <div><dt>add1</dt><dd>ƒ₂<small>defined in outer</small></dd></div>}
          </dl></div>
        </div>
        {returned && ["returning", "closed"].includes(moment.outer) && <div className="execution-return"><span aria-hidden="true">↗</span> ƒ₂ {captured ? "stored in" : "returns to"} <code>newFunc</code></div>}
      </div>}
      {moment.calls.map((stage, index) => stage === "waiting" ? null : <div key={index} className={`execution-context${stage === "closed" ? " is-closed" : " is-active"}`}>
        <div className="execution-context-heading"><strong>add1 call {index + 1}</strong><span>{stage === "closed" ? "Closed · history" : stage === "returning" ? "Returning" : "Running"}</span></div>
        <code>{callLabel}</code>
        <div className="execution-context-body">
          <div className="execution-thread"><span>Thread</span><strong>{stage === "entered" ? "Enter add1" : stage === "lookup-local" ? "Look for counter here" : stage === "lookup-outer" ? "Look in outer scope" : stage === "incremented" ? "counter++" : stage === "returning" ? "Return undefined" : "Call ended"}</strong></div>
          <div className="execution-local"><span>Local memory</span><dl /><small>No local counter</small></div>
        </div>
        {["lookup-local", "lookup-outer", "incremented"].includes(stage) && <div className="execution-return"><span aria-hidden="true">↗</span> {stage === "lookup-local" ? "counter is absent locally" : `${captured ? "Captured outer scope" : "outer's local memory"}: counter = ${moment.counter}`}</div>}
        {["returning", "closed"].includes(stage) && <div className="execution-return"><span aria-hidden="true">↗</span> undefined returns to <code>{returned ? "global" : "outer()"}</code></div>}
      </div>)}
    </div>
    <div className="execution-memory">
      <h4>Global memory</h4>
      <dl>
        <div><dt>outer</dt><dd>ƒ₁<small>saved function</small></dd></div>
        {returned && moment.outer !== "waiting" && <div className={!captured ? "is-uninitialized" : undefined}><dt>newFunc</dt><dd>{captured ? <>ƒ₂<small>add1 reference</small></> : "uninitialized"}</dd></div>}
      </dl>
      {captured && <div className="execution-context closure-captured-memory" role="region" aria-label="Captured outer scope">
        <h4>Captured outer scope <small>Live</small></h4>
        <div className="execution-local"><span>Reachable through newFunc (ƒ₂)</span><dl><div><dt>counter</dt><dd>{moment.counter}</dd></div></dl></div>
      </div>}
      <div className="execution-stack"><h4>Call stack <small>Top first</small></h4><ol>
        {activeCall !== -1 && <li className="is-active">{callLabel}</li>}
        {inOuter && <li className={activeCall === -1 ? "is-active" : undefined}>outer(){activeCall !== -1 && <small> · paused</small>}</li>}
        {!finished && <li>global</li>}
        {finished && <li className="execution-stack-empty">Empty</li>}
      </ol></div>
    </div>
  </>}</div>;
}
