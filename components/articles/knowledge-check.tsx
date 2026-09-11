"use client";

import { useId, useState } from "react";

export function KnowledgeCheck({ question, answers }: { question: string; answers: { text: string; explanation: string; correct: boolean }[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();
  const answer = selected === null ? null : answers[selected];
  return (
    <div className="knowledge-check">
      <span className="learning-kicker">A little thought experiment</span>
      <h3 id={id}>{question}</h3>
      <div className="quiz-answers" role="group" aria-labelledby={id}>
        {answers.map((item, index) => <button type="button" key={item.text} aria-pressed={selected === index} className={selected === index ? "is-selected" : ""} onClick={() => setSelected(index)}><span className="answer-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>{item.text}<span className="answer-selection">{selected === index ? "Selected" : ""}</span></button>)}
      </div>
      <div className={`quiz-feedback ${answer?.correct ? "is-correct" : ""}`} role="status">{answer ? <><strong>{answer.correct ? "You’ve got it." : "Take another look."}</strong> {answer.explanation}</> : "Choose an answer to see the reasoning. You can try again."}</div>
      <details className="quiz-explanation"><summary>Read the answer</summary><p>{answers.find(item => item.correct)?.explanation}</p></details>
    </div>
  );
}
