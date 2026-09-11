"use client";

import { useState } from "react";

export function CommandBlock({ command, explanation, output }: { command: string; explanation: string; output?: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(command); setMessage("Copied command."); }
    catch { setMessage("Copy unavailable. Select the command text to copy it."); }
  }
  return <div className="article-command"><p>{explanation}</p><div className="command-heading"><span>Command</span><button type="button" onClick={copy} aria-label={`Copy ${command}`}>Copy</button></div><pre tabIndex={0} aria-label="Git command"><code>{command}</code></pre><span className="copy-status" role="status">{message}</span>{output && <><div className="output-label">Example output</div><pre className="command-output" tabIndex={0} aria-label="Example command output"><code>{output}</code></pre></>}</div>;
}
