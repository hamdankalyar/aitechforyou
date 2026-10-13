"use client";

import { useState, type CSSProperties } from "react";

type Question = { question: string; answers: { text: string; explanation: string; correct: boolean }[] };

// One question at a time, instant feedback, a score at the end, and a retry for missed questions.
// Built from the shared lab pieces (snapshot-lab, lab-topline, commit-lab-steps, lab-actions) so it matches the other examples.
export function QuizMode({ title, questions }: { title: string; questions: Question[] }) {
  const [round, setRound] = useState(() => questions.map((_, index) => index));
  const [position, setPosition] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const finished = position >= round.length;
  const current = round[position];
  const picked = finished ? undefined : picks[current];
  const missed = round.filter(index => !questions[index].answers[picks[index]]?.correct);

  const start = (indexes: number[]) => {
    setRound(indexes);
    setPosition(0);
    setPicks(previous => Object.fromEntries(Object.entries(previous).filter(([index]) => !indexes.includes(Number(index)))));
  };
  const steps = <ol className="commit-lab-steps quiz-mode-steps" style={{ "--count": round.length } as CSSProperties} aria-label="Quiz progress">
    {round.map((index, step) => <li key={index} aria-current={step === position ? "step" : undefined} className={step < position ? (questions[index].answers[picks[index]]?.correct ? "is-right" : "is-wrong") : undefined}><span aria-hidden="true">{step + 1}</span></li>)}
  </ol>;

  if (finished) {
    const score = round.length - missed.length;
    return <div className="snapshot-lab quiz-mode" aria-label={`${title} quiz`}>
      <div className="lab-topline"><span className="learning-kicker">Lecture quiz · Results</span><span className="lab-local">{title}</span></div>
      <h3>{score === round.length ? "Every answer right." : `${score} of ${round.length} correct.`}</h3>
      {steps}
      <p className="lab-instruction">{missed.length ? "Review the right answers below, then retry only the questions you missed." : "You can start over any time to check yourself again."}</p>
      {missed.length > 0 && <ol className="quiz-mode-review">{missed.map(index => <li key={index}><strong>{questions[index].question}</strong><p>{questions[index].answers.find(answer => answer.correct)?.text}</p></li>)}</ol>}
      <div className="lab-actions">
        {missed.length > 0 && <button type="button" className="lab-primary" onClick={() => start(missed)}>Retry {missed.length} missed<span aria-hidden="true">→</span></button>}
        <div className="lab-step-buttons"><button type="button" onClick={() => start(questions.map((_, index) => index))}>Start over</button></div>
      </div>
    </div>;
  }

  const question = questions[current];
  const answer = picked === undefined ? null : question.answers[picked];
  return <div className="snapshot-lab quiz-mode" aria-label={`${title} quiz`}>
    <div className="lab-topline"><span className="learning-kicker">Lecture quiz</span><span className="lab-local">Question {position + 1} of {round.length}</span></div>
    {steps}
    <h3 id={`quiz-question-${current}`}>{question.question}</h3>
    <p className="lab-instruction">Pick one answer. You get one try per question.</p>
    <div className="quiz-answers" role="group" aria-labelledby={`quiz-question-${current}`}>
      {question.answers.map((item, index) => {
        const state = picked === undefined ? "" : item.correct ? "is-right" : index === picked ? "is-wrong" : "";
        return <button type="button" key={item.text} disabled={picked !== undefined} aria-pressed={picked === index} className={state} onClick={() => setPicks({ ...picks, [current]: index })}>
          <span className="answer-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>{item.text}
          <span className="answer-selection">{state === "is-right" ? "Correct answer" : state === "is-wrong" ? "Your answer" : ""}</span>
        </button>;
      })}
    </div>
    <div className={`quiz-feedback ${answer?.correct ? "is-correct" : ""}`} role="status">{answer ? <><strong>{answer.correct ? "You’ve got it." : "Take another look."}</strong> {answer.explanation}</> : "Choose an answer to see the reasoning."}</div>
    <div className="lab-actions">
      <button type="button" className="lab-primary" disabled={picked === undefined} onClick={() => setPosition(position + 1)}>{position === round.length - 1 ? "See my score" : "Next question"}<span aria-hidden="true">→</span></button>
      <div className="lab-step-buttons"><button type="button" disabled={position === 0 && picked === undefined} onClick={() => start(questions.map((_, index) => index))}>Start over</button></div>
    </div>
  </div>;
}
