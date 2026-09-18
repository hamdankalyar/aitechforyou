"use client";

import { useState } from "react";

type Moment = {
  label: string;
  title: string;
  detail: string;
  focusLines: number[];
  stack: string[];
  microtask: string | null;
  task: string | null;
  timer: string;
  output: string[];
  route: "script" | "queue" | "microtask" | "paint" | "task";
};

const source = [
  'console.log("start");',
  'setTimeout(() => console.log("timeout"), 0);',
  'Promise.resolve().then(() => console.log("promise"));',
  'console.log("end");',
];

const moments: Moment[] = [
  { label: "Run script", title: "Synchronous code runs first", detail: "The script enters the Call Stack and prints start, then end.", focusLines: [1, 4], stack: ["global script", 'console.log("start")', 'console.log("end")'], microtask: null, task: null, timer: "waiting", output: ["start", "end"], route: "script" },
  { label: "Queue work", title: "The callbacks wait in different queues", detail: "The promise handler enters the microtask queue while the completed timer enters the task queue.", focusLines: [2, 3], stack: [], microtask: "promise handler", task: "timeout callback", timer: "0 ms complete", output: ["start", "end"], route: "queue" },
  { label: "Run microtask", title: "The promise handler runs before the timer", detail: "The event loop moves the promise handler onto the empty Call Stack.", focusLines: [3], stack: ["promise handler"], microtask: null, task: "timeout callback", timer: "complete", output: ["start", "end", "promise"], route: "microtask" },
  { label: "Render", title: "The browser gets a rendering opportunity", detail: "The Call Stack and microtask queue are empty, so the browser may paint the page.", focusLines: [], stack: [], microtask: null, task: "timeout callback", timer: "may paint", output: ["start", "end", "promise"], route: "paint" },
  { label: "Run task", title: "The timeout callback runs last", detail: "The event loop moves the timeout callback from the task queue onto the Call Stack.", focusLines: [2], stack: ["timeout callback"], microtask: null, task: null, timer: "complete", output: ["start", "end", "promise", "timeout"], route: "task" },
];

function Arrow({ active, d }: { active: boolean; d: string }) {
  return <path className={active ? "event-arrow is-active" : "event-arrow"} d={d} markerEnd="url(#event-arrowhead)" />;
}

export function EventLoopTrace() {
  const [step, setStep] = useState(0);
  const moment = moments[step];
  const isStackActive = ["script", "microtask", "task"].includes(moment.route);

  return <section className="event-loop-lab" aria-labelledby="event-loop-trace-title">
    <div className="event-loop-heading"><span className="learning-kicker">Interactive walkthrough</span><span>Code first. Runtime second.</span></div>
    <h3 id="event-loop-trace-title">Watch one event-loop turn unfold.</h3>

    <div className="event-loop-code" aria-label="JavaScript example">
      <div className="event-loop-codebar"><span aria-hidden="true"><i /><i /><i /></span><strong>event-loop.js</strong><small>JavaScript</small></div>
      <pre>{source.map((line, index) => <code className={moment.focusLines.includes(index + 1) ? "is-active" : undefined} key={line}><span>{index + 1}</span><b>{line}</b></code>)}</pre>
    </div>

    <ol className="event-loop-progress" aria-label="Event loop progress">
      {moments.map((item, index) => <li aria-current={index === step ? "step" : undefined} className={index === step ? "is-current" : index < step ? "is-complete" : undefined} key={item.label}><span>{index + 1}</span><strong>{item.label}</strong></li>)}
    </ol>

    <div className="event-loop-canvas">
      <svg className="event-loop-graphic" viewBox="0 0 1000 630" role="img" aria-labelledby="event-loop-map-title event-loop-map-description">
        <title id="event-loop-map-title">Event loop runtime map</title>
        <desc id="event-loop-map-description">{moment.detail}</desc>
        <defs><marker id="event-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path className="event-arrowhead" d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
        <rect className={isStackActive ? "event-panel event-stack-panel is-active" : "event-panel event-stack-panel"} x="32" y="116" width="260" height="392" rx="18" />
        <rect className={["queue", "paint"].includes(moment.route) ? "event-panel event-browser-panel is-active" : "event-panel event-browser-panel"} x="374" y="52" width="218" height="154" rx="18" />
        <rect className={["queue", "microtask"].includes(moment.route) ? "event-panel event-micro-panel is-active" : "event-panel event-micro-panel"} x="672" y="52" width="296" height="210" rx="18" />
        <rect className={["queue", "task"].includes(moment.route) ? "event-panel event-task-panel is-active" : "event-panel event-task-panel"} x="672" y="330" width="296" height="178" rx="18" />
        <Arrow active={moment.route === "queue"} d="M292 205 C420 205 528 157 672 157" />
        <Arrow active={moment.route === "queue"} d="M483 206 C526 270 592 377 672 405" />
        <Arrow active={moment.route === "microtask"} d="M672 216 C560 270 447 345 292 345" />
        <Arrow active={moment.route === "paint"} d="M484 380 C484 310 484 260 484 207" />
        <Arrow active={moment.route === "task"} d="M672 438 C562 450 445 410 292 395" />
        <text className="event-number" x="58" y="153">01</text><text className="event-label" x="58" y="187">CALL STACK</text>
        {moment.stack.length ? moment.stack.map((item, index) => <g key={item}><rect className="event-chip" x="58" y={218 + index * 62} width="208" height="43" rx="8" /><text className="event-chip-text" x="74" y={245 + index * 62}>{item}</text></g>) : <text className="event-empty" x="58" y="245">empty</text>}
        <text className="event-note" x="58" y="470">JavaScript runs here now.</text>
        <text className="event-number" x="400" y="89">02</text><text className="event-label" x="400" y="118">BROWSER</text>
        <circle className="event-timer" cx="483" cy="163" r="42" /><text className="event-timer-small" x="483" y="156">TIMER</text><text className="event-timer-text" x="483" y="175">{moment.timer}</text>
        <text className="event-number" x="698" y="89">03</text><text className="event-label" x="698" y="118">MICROTASK QUEUE</text>
        {moment.microtask ? <><rect className="event-chip" x="698" y="146" width="242" height="48" rx="8" /><text className="event-chip-text" x="714" y="176">{moment.microtask}</text></> : <text className="event-empty" x="698" y="170">empty</text>}
        <text className="event-note" x="698" y="230">Promise handlers wait here.</text>
        <circle className={["microtask", "paint", "task"].includes(moment.route) ? "event-loop-circle is-active" : "event-loop-circle"} cx="483" cy="380" r="91" /><circle className="event-loop-ring" cx="483" cy="380" r="106" /><text className="event-loop-small" x="483" y="360">STACK EMPTY?</text><text className="event-loop-title" x="483" y="390">EVENT</text><text className="event-loop-title" x="483" y="420">LOOP</text>
        <text className="event-number" x="698" y="367">04</text><text className="event-label" x="698" y="396">TASK QUEUE</text>
        {moment.task ? <><rect className="event-chip" x="698" y="426" width="242" height="48" rx="8" /><text className="event-chip-text" x="714" y="456">{moment.task}</text></> : <text className="event-empty" x="698" y="450">empty</text>}
        <text className="event-note" x="698" y="490">Timers wait here.</text>
        <rect className="event-console" x="32" y="548" width="936" height="50" rx="12" /><text className="event-console-label" x="56" y="579">CONSOLE</text>{moment.output.map((line, index) => <g key={line}><rect className="event-output" x={190 + index * 145} y="560" width="126" height="27" rx="5" /><text className="event-output-text" x={204 + index * 145} y="579">{line}</text></g>)}
      </svg>

      <div className="event-loop-mobile-map" role="img" aria-label={moment.detail}>
        <div className={isStackActive ? "event-mobile-node is-active" : "event-mobile-node"}><span>01</span><strong>Call Stack</strong><small>{moment.stack.at(-1) ?? "empty"}</small></div>
        <div className={["queue", "paint"].includes(moment.route) ? "event-mobile-node is-active" : "event-mobile-node"}><span>02</span><strong>Browser timer</strong><small>{moment.timer}</small></div>
        <div className={["queue", "microtask"].includes(moment.route) ? "event-mobile-node is-active" : "event-mobile-node"}><span>03</span><strong>Microtask queue</strong><small>{moment.microtask ?? "empty"}</small></div>
        <div className={["microtask", "paint", "task"].includes(moment.route) ? "event-mobile-loop is-active" : "event-mobile-loop"}><small>Stack empty?</small><strong>Event Loop</strong></div>
        <div className={["queue", "task"].includes(moment.route) ? "event-mobile-node is-active" : "event-mobile-node"}><span>04</span><strong>Task queue</strong><small>{moment.task ?? "empty"}</small></div>
        <div className="event-mobile-console"><strong>Console</strong><span>{moment.output.join("  ·  ")}</span></div>
      </div>
    </div>

    <div className="event-loop-caption" role="status" aria-live="polite" aria-atomic="true"><span>Step {step + 1} of {moments.length}</span><h4>{moment.title}</h4><p>{moment.detail}</p></div>
    <div className="event-loop-actions">
      <button type="button" disabled={step === 0} onClick={() => setStep(current => current - 1)}>Previous</button>
      <button className="lab-primary" type="button" onClick={() => setStep(current => current === moments.length - 1 ? 0 : current + 1)}>{step === moments.length - 1 ? "Replay from start" : `Next: ${moments[step + 1].label}`}</button>
    </div>
  </section>;
}
