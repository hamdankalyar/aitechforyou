"use client";

import { useId, useRef, useState } from "react";

export function Flashcards({ title, cards }: { title: string; cards: { question: string; answer: string; code?: string; codeLabel?: string }[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = cards[position];
  const last = position === cards.length - 1;
  const go = (next: number) => { setPosition(next); setRevealed(false); };

  return <>
    <button type="button" className="button dark flashcards-launch" aria-haspopup="dialog" onClick={() => { go(0); dialog.current?.showModal(); }}>Flashcards <span aria-hidden="true">↗</span></button>
    <dialog ref={dialog} className="flashcards-dialog" aria-labelledby={titleId}>
      <div className="flashcards-header">
        <h2 id={titleId}>{title} flashcards</h2>
        <button type="button" className="button" onClick={() => dialog.current?.close()} autoFocus>Close <span aria-hidden="true">×</span></button>
      </div>
      <div className="flashcards" aria-label={`${title} flashcards`}>
        <button
          key={position}
          type="button"
          className={`flashcard ${revealed ? "is-flipped" : ""}`}
          aria-label={revealed ? `${card.answer}${card.code ? ` ${card.code}` : ""} — Show question` : `${card.question} — Show answer`}
          aria-pressed={revealed}
          onClick={() => setRevealed(!revealed)}
        >
          <span className="flashcard-inner">
            <span className="flashcard-face flashcard-front" aria-hidden={revealed}>{card.question}</span>
            <span className="flashcard-face flashcard-back" aria-hidden={!revealed}>
              <span>{card.answer}</span>
              {card.code && <code className="flashcard-code">{card.code}</code>}
            </span>
          </span>
        </button>
        <div className="lab-actions">
          <div className="lab-step-buttons">
            <button type="button" disabled={position === 0} onClick={() => go(position - 1)}>Previous</button>
          </div>
          <button type="button" className="lab-primary" onClick={() => go(last ? 0 : position + 1)}>{last ? "Start over" : "Next card"}<span aria-hidden="true">→</span></button>
        </div>
      </div>
    </dialog>
  </>;
}
