# Mutable vs. immutable source notes

- **Source:** The author's supplied text, GetImage (5).png, GetImage (6).png, and later instructions to organize the lesson around two kinds of change.
- **Teaching order:** Explain value/item mutation first, then variable reassignment, object references with stack/heap diagrams, let versus const, and a combined comparison.
- **Central distinction:** Index assignment cannot change a string's characters. Assigning a different string to a let variable is reassignment, and the original string remains unchanged.
- **Examples:** Retain the source array mutation, staff/staff2 object, student strings, number reassignment, const array, and push/concat examples. Add only direct comparisons needed for the requested clarification: keep the original string, reassign an array while retaining the old reference, and show const string reassignment failing.
- **Diagrams:** Retain the supplied shared-object and primitive-value diagrams. Explain that the object diagram shows the original name before mutation.
- **Memory correction:** Stack/heap placement is a simplified model. Actual storage and allocations are chosen by the engine.
- **Terminology:** Mutability describes a value. let and const control reassignment of the variable's binding; for objects, this determines whether its reference can be replaced.
- **String correction:** Attempt to replace e with E so the failed character change is visible. Non-strict code ignores this assignment; strict code throws TypeError.
- **Scope:** Keep explanations short and focused on the two kinds of change. Do not add unrelated concepts or extra exercises.
