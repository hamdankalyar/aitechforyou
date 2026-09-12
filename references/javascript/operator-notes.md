# Operator notes

Source: author's notes supplied in the conversation on September 12, 2026.

- Without parentheses, calculations follow standard mathematical priorities.
- Equality (`==`) checks whether values are equal and uses type coercion. Examples: `5 == 5` is true, `5 == 6` is false, and `5 == "5"` is true.
- Strict equality (`===`) compares without coercion. `5 === 5` is true. The notes accidentally used `5 == "5"` for the false example; the corrected expression is `5 === "5"`.
- Inequality (`!=`) uses the loose equality rules and reverses the answer. `5 != "5"` is false.
- Strict inequality (`!==`) reverses strict equality. `5 !== 5` is false and `5 !== "5"` is true.
- Worked calculation: `4 + 1 * 2 * 4 + 2` gives `14`.
- Clarification for the DMAS reminder: multiplication and division share priority, as do addition and subtraction. At either level, group from left to right. Use round parentheses for JavaScript arithmetic grouping, not the notes' mixed `{ }` and `[ ]` notation.

The published material uses separate precedence and equality lessons to follow the course's one-topic-per-lesson rule. It adds boolean, null/undefined, and NaN examples to clarify the limits of the equality shortcuts in the notes.

Follow-up reminders from the author: conditions, the ternary operator, and adding CSS classes with `element.classList.add()`. These need their own lessons. The original wording was "addclasslist".
