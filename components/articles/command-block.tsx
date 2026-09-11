"use client";

import { useEffect, useState } from "react";

export function CommandBlock({ command, explanation, output, label = "Command" }: { command: string; explanation: string; output?: string; label?: string }) {
  const [buttonText, setButtonText] = useState("Copy");
  useEffect(() => {
    if (buttonText === "Copy") return;
    const timer = window.setTimeout(() => setButtonText("Copy"), 2000);
    return () => window.clearTimeout(timer);
  }, [buttonText]);

  async function copy() {
    try { await navigator.clipboard.writeText(command); setButtonText("Copied"); }
    catch { setButtonText("Select text"); }
  }
  return <div className="article-command"><p>{explanation}</p><div className="command-heading"><span>{label}</span><button type="button" onClick={copy} aria-label={buttonText === "Copy" ? `Copy ${label.toLowerCase()}` : buttonText} aria-live="polite">{buttonText}</button></div><pre tabIndex={0} aria-label={label}><code>{command}</code></pre>{output && <><div className="output-label">Example output</div><pre className="command-output" tabIndex={0} aria-label="Example command output"><code>{output}</code></pre></>}</div>;
}
