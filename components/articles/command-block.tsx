"use client";

import { useEffect, useState } from "react";

export function CommandBlock({ command, explanation, output, label = "Command", highlightLines }: { command: string; explanation?: string; output?: string; label?: string; highlightLines?: number[] }) {
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
  return <div className="article-command">{explanation && <p>{explanation}</p>}<div className="command-heading"><span>{label}</span><button type="button" onClick={copy} aria-label={buttonText === "Copy" ? `Copy ${label.toLowerCase()}` : buttonText} aria-live="polite">{buttonText}</button></div><pre tabIndex={0} aria-label={label}><code>{highlightLines ? command.split("\n").map((line, index) => <span className={highlightLines.includes(index + 1) ? "code-focus" : undefined} key={index}>{line || " "}</span>) : command}</code></pre>{output && <><div className="output-label">Example output</div><pre className="command-output" tabIndex={0} aria-label="Example command output"><code>{output}</code></pre></>}</div>;
}
