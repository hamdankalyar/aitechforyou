# Loops source notes

- **Source:** Author's Loops slides and notes supplied on September 15, 2026.
- **Split:** The notes cover three lessons. `javascript-loops` (for, for...of, iterables, forEach), `javascript-loop-objects` (objects are not iterable, Object.keys, Object.values, Object.entries, looping keys with brackets), and `javascript-for-in` (for...in, inherited properties, comparison table).
- **Order:** The notes used Object.keys before explaining it. The lessons teach Object.keys before the for...in comparison.
- **Examples:** Slide snippets (`rep`, `count`, `numbers`, `"ALOHA"`, `["pop", 6, "squish"]`), `array1.forEach`, the `Index 0: 1` forEach example, `car2`, `car3`, `car4`, `clothingItem`, `person`, and the four `car`/`car1` prototype snippets are kept.
- **Fixes:** `clothingItem` loop printed `keys` (undefined) in the notes; the lesson uses `key`. `var color` became `const color`. The forEach index example uses string joining instead of template literals, which are not taught yet.
- **Runner limits:** The Node checker prints objects as `[object Object]` while the runner uses JSON.
- **Parked:** The class examples (`Object.create(car)` with a class, `Object.create(Car.prototype)`) confused readers before the OOP lessons. They live in `later.md` at the project root for the OOP section. Removed on September 15, 2026.
- **Added:** `+=` and `i++` meaning, a TypeError snippet for for...of on an object, a break snippet for the comparison, and the definition of enumerable.
- **Added on September 16, 2026:** The while slides (`fiveRandomNumbers`, the `while (true)` warning) joined `javascript-loops` after the three-parts section. The random example prints the array length, so the checker gets a fixed value. The infinite loop stays in text, because every code box is a live editor with no timeout.
- **Out of scope:** classes and prototypes in depth (OOP section), maps and sets.
