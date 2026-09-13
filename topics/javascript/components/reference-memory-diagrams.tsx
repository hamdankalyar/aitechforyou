export function ReferenceMemoryDiagrams() {
  return <figure className="reference-step" id="reference-memory-diagrams">
    <div className="reference-memory" role="img" aria-label="Stack and heap model: staff2 and staff each point to the same object with name Strengthened, age 43, and hobbies reading and swimming.">
      <strong className="reference-stack-title">Stack</strong>
      <strong className="reference-heap-title">Heap</strong>
      <div className="reference-variable reference-first"><strong>staff2</strong></div>
      <div className="reference-variable reference-second"><strong>staff</strong></div>
      <span className="reference-pointer reference-first">pointer</span>
      <span className="reference-pointer reference-second">pointer</span>
      <svg className="reference-arrows" viewBox="0 0 100 240" preserveAspectRatio="none" aria-hidden="true">
        <defs><marker id="staff-pointer-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
        <path d="M 0 60 L 98 45" markerEnd="url(#staff-pointer-arrow)" />
        <path d="M 0 180 L 98 155" markerEnd="url(#staff-pointer-arrow)" />
      </svg>
      <div className="reference-object">
        <span>{"{"}</span>
        <span>name: &quot;Strengthened&quot;,</span>
        <span>age: 43,</span>
        <span>hobbies: [</span>
        <span>&quot;reading&quot;,</span>
        <span>&quot;swimming&quot;</span>
        <span>]</span>
        <span>{"}"}</span>
      </div>
    </div>
    <figcaption><strong>Shared object.</strong> staff and staff2 point to the same data.</figcaption>
  </figure>;
}

export function PrimitiveMemoryDiagram() {
  return <figure className="reference-step" id="primitive-memory-diagram">
    <div className="primitive-memory" role="img" aria-label="Simplified stack model: student2 holds Halina and student1 holds Halina. The variables are independent.">
      <strong>Stack</strong>
      <span>let student2 = &quot;Halina&quot;;</span>
      <span>let student1 = &quot;Halina&quot;;</span>
    </div>
    <figcaption><strong>Primitive values.</strong> Both variables hold &quot;Halina&quot; independently.</figcaption>
  </figure>;
}
