"use client";

import { useState } from "react";

const cart = [
  { name: "Shirt", price: 25.99 },
  { name: "Jeans", price: 49.99 },
  { name: "Shoes", price: 79.99 },
  { name: "Hat", price: 12.99 },
];
const start = 0;
let running = start;
const calls = cart.map((product, index) => {
  const accIn = running;
  running = accIn + product.price;
  return { index, accIn, product, accOut: running };
});
const total = running;

export function ReduceStepper() {
  const [step, setStep] = useState(0);
  const last = calls.length + 1;
  const call = step >= 1 && step <= calls.length ? calls[step - 1] : null;
  const acc = step === 0 ? start : call ? call.accIn : total;
  const status = step === 0
    ? `acc starts as ${start}, the second argument of reduce. No product has been visited yet.`
    : call
      ? `Call ${step}: acc is ${call.accIn} and product is ${call.product.name}. The function returns ${call.accIn} + ${call.product.price} = ${call.accOut}. That becomes the new acc.`
      : `No products are left. reduce returns acc, which is ${total}. That single value is stored in totalPrice.`;

  return <div className="snapshot-lab variables-lab reduce-lab" aria-label="reduce practice example">
    <div className="lab-topline"><span className="learning-kicker">Practice example</span><span className="lab-local">One function call at a time</span></div>
    <h3>Watch acc grow</h3>
    <p className="lab-instruction">Press Next step to run the function once. acc is the only thing that changes.</p>
    <pre tabIndex={0} aria-label="The reduce call being traced"><code>{"const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);"}</code></pre>
    <ol className="reduce-array" aria-label="Items in cart">
      {cart.map((product, index) => <li key={product.name} className={call?.index === index ? "is-current" : step > index + 1 || step === last ? "is-done" : undefined}><small>cart[{index}]</small>{product.name} {product.price}</li>)}
    </ol>
    <div className="reduce-flow" role="img" aria-label={status}>
      <div className={`reduce-node${step === 0 || step === last ? " is-current" : ""}`}><small>acc</small>{acc}</div>
      <span className="reduce-arrow" aria-hidden="true">→</span>
      <div className={`reduce-node reduce-function${call ? " is-current" : ""}`}><small>(acc, product) =&gt; acc + product.price</small>{call ? `${call.accIn} + ${call.product.price}` : step === 0 ? "not called yet" : "no more calls"}</div>
      <span className="reduce-arrow" aria-hidden="true">→</span>
      <div className={`reduce-node${call ? " is-current" : ""}`}><small>returns</small>{call ? call.accOut : step === 0 ? "nothing yet" : `acc = ${total}`}</div>
      <p className="reduce-back">The returned value is stored in acc before the next call.</p>
    </div>
    <table className="reduce-trace">
      <caption className="sr-only">Every call of the function</caption>
      <thead><tr><th scope="col">Call</th><th scope="col">acc in</th><th scope="col">product.price</th><th scope="col">returns</th></tr></thead>
      <tbody>
        {calls.map(row => <tr key={row.index} className={call?.index === row.index ? "is-current" : step <= row.index ? "is-pending" : undefined}>
          <td>{row.index + 1}</td><td>{step > row.index ? row.accIn : "?"}</td><td>{row.product.price}</td><td>{step > row.index ? row.accOut : "?"}</td>
        </tr>)}
      </tbody>
    </table>
    <div className="variables-result" role="status" aria-atomic="true"><span className="learning-kicker">Step {step + 1} of {last + 1} · {step === 0 ? "Start" : call ? `Call ${step}` : "Done"}</span><p>{status}</p></div>
    <div className="lab-actions">
      <button type="button" className="lab-primary" disabled={step === last} onClick={() => setStep(step + 1)}>{step === last ? "Example complete" : "Next step"}<span aria-hidden="true">→</span></button>
      <div className="lab-step-buttons"><button type="button" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button><button type="button" onClick={() => setStep(0)}>Start over</button></div>
    </div>
    <details className="lab-transcript"><summary>Read every step without interacting</summary><p>acc starts as 0. Call 1 receives acc 0 and Shirt, returns 25.99. Call 2 receives 25.99 and Jeans, returns 75.98. Call 3 receives 75.98 and Shoes, returns 155.97. Call 4 receives 155.97 and Hat, returns 168.96. No products are left, so reduce returns 168.96.</p></details>
    <noscript><p>The controls need JavaScript. Open the written steps above to follow every call.</p></noscript>
  </div>;
}
