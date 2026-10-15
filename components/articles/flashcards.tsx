"use client";

import { useState, type CSSProperties } from "react";
import { CommandBlock } from "@/components/articles/command-block";

// Question on the front, answer on the back. Reuses the quiz-mode look (snapshot-lab, lab-topline, commit-lab-steps, quiz-feedback, lab-actions).
export function Flashcards({ title, cards }: { title: string; cards: { question: string; answer: string; code?: string; codeLabel?: string }[] }) {
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = cards[position];
  const last = position === cards.length - 1;
  const go = (next: number) => { setPosition(next); setRevealed(false); };

  return <div className="snapshot-lab quiz-mode flashcards" aria-label={`${title} flashcards`}>
    <div className="lab-topline"><span className="learning-kicker">Flashcards</span><span className="lab-local">Card {position + 1} of {cards.length}</span></div>
    <ol className="commit-lab-steps lab-steps-count quiz-mode-steps" style={{ "--count": cards.length } as CSSProperties} aria-label="Flashcard progress">
      {cards.map((item, index) => <li key={item.question} aria-current={index === position ? "step" : undefined}><span aria-hidden="true">{index + 1}</span></li>)}
    </ol>
    <h3 id={`flashcard-${position}`}>{card.question}</h3>
    <p className="lab-instruction">Say your answer out loud or in your head first. Then show the answer and compare.</p>
    <div className={`quiz-feedback ${revealed ? "is-correct" : ""}`} role="status" aria-live="polite">{revealed ? <><strong>Answer.</strong> {card.answer}</> : "The answer is hidden. Press Show answer when you are ready."}</div>
    {revealed && card.code && <CommandBlock command={card.code} label={card.codeLabel ?? "Code"} />}
    <div className="lab-actions">
      <button type="button" className="lab-primary" onClick={() => go(last ? 0 : position + 1)}>{last ? "Start over" : "Next card"}<span aria-hidden="true">→</span></button>
      <div className="lab-step-buttons">
        <button type="button" disabled={position === 0} onClick={() => go(position - 1)}>Previous</button>
        <button type="button" aria-expanded={revealed} onClick={() => setRevealed(!revealed)}>{revealed ? "Hide answer" : "Show answer"}</button>
      </div>
    </div>
  </div>;
}
