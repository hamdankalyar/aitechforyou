"use client";

import { useEffect, useId, useRef, useState } from "react";

type Line = { kind: "log" | "info" | "warn" | "error"; text: string };
type Status = "idle" | "running" | "done";

// Runs the code in a fresh sandboxed iframe (no same-origin access), so every run starts with clean globals
// and a crash or thrown error never touches the article page. Console calls are relayed back via postMessage.
function buildDocument(code: string, token: string) {
  const safeCode = code.replace(/<\/script/gi, "<\\/script");
  const bridge = `
    const token = ${JSON.stringify(token)};
    const send = (kind, text) => parent.postMessage({ token, kind, text }, "*");
    const format = (value) => {
      if (typeof value === "string") return value;
      if (typeof value === "bigint") return value + "n";
      if (typeof value === "symbol" || typeof value === "function") return String(value);
      if (value === undefined) return "undefined";
      if (value instanceof Error) return value.name + ": " + value.message;
      try { const text = JSON.stringify(value); return text === undefined ? String(value) : text; } catch { return String(value); }
    };
    for (const kind of ["log", "info", "warn", "error"]) console[kind] = (...args) => send(kind, args.map(format).join(" "));
    window.addEventListener("error", (event) => { send("error", event.message.replace(/^Uncaught /, "")); event.preventDefault(); });
    window.addEventListener("unhandledrejection", (event) => send("error", "Unhandled promise rejection: " + format(event.reason)));
  `;
  return `<!doctype html><meta charset="utf-8"><script>${bridge}</script><script>${safeCode}\n</script><script>parent.postMessage({ token: ${JSON.stringify(token)}, kind: "done" }, "*");</script>`;
}

export function CodeRunner({ code, label = "Editable example" }: { code: string; label?: string }) {
  const id = useId();
  const [source, setSource] = useState(code);
  const [lines, setLines] = useState<Line[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [run, setRun] = useState(0);
  const [document, setDocument] = useState<string | null>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const token = `${id}-${run}`;

  useEffect(() => {
    if (!document) return;
    const onMessage = (event: MessageEvent) => {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow || event.data?.token !== token) return;
      if (event.data.kind === "done") setStatus("done");
      else setLines(previous => [...previous, { kind: event.data.kind, text: String(event.data.text) }]);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [document, token]);

  const execute = () => {
    const next = run + 1;
    setLines([]);
    setStatus("running");
    setRun(next);
    setDocument(buildDocument(source, `${id}-${next}`));
  };

  const reset = () => { setSource(code); setLines([]); setStatus("idle"); setDocument(null); };
  const rows = Math.min(24, Math.max(4, source.split("\n").length + 1));
  const summary = status === "idle" ? "Press Run to execute this code." : status === "running" ? "Running…" : lines.length === 0 ? "Finished with no output. Add console.log(...) to print a value." : `Finished · ${lines.length} ${lines.length === 1 ? "line" : "lines"} printed.`;

  return <div className="code-runner" aria-label={label}>
    <div className="code-runner-topline"><span className="learning-kicker">{label}</span><span>JavaScript · runs in your browser</span></div>
    <label className="sr-only" htmlFor={`${id}-editor`}>JavaScript code. Edit it, then press Run.</label>
    <textarea id={`${id}-editor`} className="code-runner-editor" value={source} rows={rows} spellCheck={false} autoCapitalize="off" autoCorrect="off" wrap="off" onChange={event => setSource(event.target.value)} onKeyDown={event => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); execute(); } }} />
    <div className="lab-actions code-runner-actions">
      <button type="button" className="lab-primary" onClick={execute}>Run<span aria-hidden="true">▶</span></button>
      <div className="lab-step-buttons"><button type="button" onClick={reset} disabled={source === code && status === "idle"}>Reset</button><span className="code-runner-hint">⌘/Ctrl + Enter also runs</span></div>
    </div>
    <section className="code-runner-output" aria-label="Console output">
      <h4>Console</h4>
      <pre tabIndex={0}><code>{lines.length === 0 ? <span className="code-runner-empty">{summary}</span> : lines.map((line, index) => <span key={index} className={`code-runner-line ${line.kind}`}>{line.text}{"\n"}</span>)}</code></pre>
      <p className={`code-runner-status ${lines.length === 0 ? "sr-only" : ""}`} role="status" aria-live="polite">{summary}</p>
    </section>
    {document && <iframe key={run} ref={frameRef} hidden sandbox="allow-scripts" srcDoc={document} title="JavaScript sandbox" />}
  </div>;
}
