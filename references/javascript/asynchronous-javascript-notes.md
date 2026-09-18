# Asynchronous JavaScript source notes

- **Source:** Author's asynchronous JavaScript slides and notes supplied on September 16, 2026.
- **Order:** Synchronous code, work that takes time, promises, async functions, fetch and await, practice, and recap.
- **Promises:** Explain pending, fulfilled, and rejected states before showing new Promise(), resolve(), reject(), .then(), and .catch().
- **Promise executor:** Explain that JavaScript supplies resolve and reject as parameters to the executor function.
- **resolve value:** Explain that resolve() can omit a value, which fulfills the promise with undefined.
- **Fetch:** Use the supplied Dog API endpoint to show that fetch returns a promise, resolves to a Response, and response.json() returns another promise.
- **Accuracy:** async functions return promises, and await pauses the surrounding async function rather than all JavaScript.
- **Out of scope:** The event loop and parallel promises are later lessons.
