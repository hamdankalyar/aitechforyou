export function SingleReferenceMemoryDiagram() {
  return <figure className="reference-step" id="single-reference-memory-diagram">
    <div className="reference-memory reference-memory-single" role="img" aria-label="Simplified stack and heap model: staff holds a reference that points to one object containing the name Strengthened, age 43, and hobbies reading and swimming.">
      <strong className="reference-stack-title">Stack</strong>
      <strong className="reference-heap-title">Heap</strong>
      <div className="reference-variable"><strong>staff</strong></div>
      <span className="reference-pointer">pointer</span>
      <svg className="reference-arrows" viewBox="0 0 100 180" preserveAspectRatio="none" aria-hidden="true">
        <defs><marker id="single-staff-pointer-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
        <path d="M 0 90 H 98" markerEnd="url(#single-staff-pointer-arrow)" />
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
    <figcaption><strong>One object.</strong> staff holds a reference to the object's data.</figcaption>
  </figure>;
}

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

export function ReassignmentMemoryDiagram() {
  return <figure className="reference-step" id="reassignment-memory-diagram">
    <div className="value-change-memory" role="img" aria-label={'Before reassignment, a points to "hello". After reassignment, a points to "world" while "hello" remains unchanged and is no longer referenced by a.'}>
      <div className="value-change-slide">
        <strong>1. Before reassignment</strong>
        <div className="value-change-flow">
          <span className="value-change-node value-change-variable"><small>variable</small>a</span>
          <svg className="value-change-arrow" viewBox="0 0 80 120" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="reassignment-before-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <path d="M 2 60 H 76" markerEnd="url(#reassignment-before-arrow)" />
          </svg>
          <span className="value-change-node value-change-current"><small>value</small>&quot;hello&quot;</span>
        </div>
      </div>
      <div className="value-change-slide">
        <strong>2. After reassignment</strong>
        <div className="value-change-flow">
          <span className="value-change-node value-change-variable"><small>variable</small>a</span>
          <svg className="value-change-arrow" viewBox="0 0 80 120" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="reassignment-after-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <path d="M 2 60 C 34 60, 42 92, 76 92" markerEnd="url(#reassignment-after-arrow)" />
          </svg>
          <span className="value-change-values">
            <span className="value-change-node value-change-old"><small>old value, unchanged</small>&quot;hello&quot;</span>
            <span className="value-change-node value-change-current"><small>new value</small>&quot;world&quot;</span>
          </span>
        </div>
      </div>
    </div>
    <figcaption><strong>Reassignment.</strong> a now points to &quot;world&quot;. The old string was not changed and may later be removed if nothing refers to it.</figcaption>
  </figure>;
}

export function ObjectMutationDiagram() {
  return <figure className="reference-step" id="object-mutation-diagram">
    <div className="value-change-memory" role="img" aria-label={'Before the change, student contains an object whose name is "Halina". After the change, the same object has the name "Ali".'}>
      <div className="value-change-slide">
        <strong>1. Before the change</strong>
        <div className="value-change-flow">
          <span className="value-change-node value-change-variable"><small>variable</small>student</span>
          <svg className="value-change-arrow" viewBox="0 0 80 120" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="object-before-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <path d="M 2 60 H 76" markerEnd="url(#object-before-arrow)" />
          </svg>
          <span className="value-change-node"><small>object</small>name: &quot;Halina&quot;</span>
        </div>
      </div>
      <div className="value-change-slide">
        <strong>2. After the change</strong>
        <div className="value-change-flow">
          <span className="value-change-node value-change-variable"><small>variable</small>student</span>
          <svg className="value-change-arrow" viewBox="0 0 80 120" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="object-after-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <path d="M 2 60 H 76" markerEnd="url(#object-after-arrow)" />
          </svg>
          <span className="value-change-node value-change-current"><small>same object, changed property</small>name: &quot;Ali&quot;</span>
        </div>
      </div>
    </div>
    <figcaption><strong>Object mutation.</strong> The object stays the same. Only its name property changes.</figcaption>
  </figure>;
}

export function ArrayMutationDiagram() {
  return <figure className="reference-step" id="array-mutation-diagram">
    <div className="value-change-memory" role="img" aria-label="Before the change, a contains the array 1, 2, 3. After the change, the same array contains 1, 5, 3 because the item at index 1 changed.">
      <div className="value-change-slide">
        <strong>1. Before the change</strong>
        <div className="value-change-flow">
          <span className="value-change-node value-change-variable"><small>variable</small>a</span>
          <svg className="value-change-arrow" viewBox="0 0 80 120" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="array-before-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <path d="M 2 60 H 76" markerEnd="url(#array-before-arrow)" />
          </svg>
          <span className="value-change-node"><small>array</small>[1, 2, 3]</span>
        </div>
      </div>
      <div className="value-change-slide">
        <strong>2. After the change</strong>
        <div className="value-change-flow">
          <span className="value-change-node value-change-variable"><small>variable</small>a</span>
          <svg className="value-change-arrow" viewBox="0 0 80 120" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="array-after-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" /></marker></defs>
            <path d="M 2 60 H 76" markerEnd="url(#array-after-arrow)" />
          </svg>
          <span className="value-change-node value-change-current"><small>same array, changed item</small>[1, 5, 3]</span>
        </div>
      </div>
    </div>
    <figcaption><strong>Array mutation.</strong> The array stays the same. Only the item at index 1 changes.</figcaption>
  </figure>;
}
