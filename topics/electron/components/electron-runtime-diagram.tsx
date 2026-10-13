// Reuses the architecture figure classes from topics/react-native/react-native-learning.css so both courses' diagrams look the same.
export function ElectronRuntimeDiagram() {
  return (
    <figure className="package-architecture electron-runtime">
      <div className="architecture-path-grid">
        <div className="architecture-course-path">
          <span>The Chromium side</span>
          <div className="architecture-step architecture-folder"><strong>Renderer process</strong><small>Shows the user interface</small></div>
          <div className="architecture-arrow"><span aria-hidden="true">↓</span> gives you</div>
          <div className="architecture-native">
            <div><strong>HTML5 support</strong></div>
            <div><strong>GPU acceleration</strong></div>
            <div><strong>Blink</strong></div>
            <div><strong>V8</strong></div>
            <div><strong>Web APIs</strong></div>
          </div>
        </div>
        <div className="architecture-course-path architecture-problem-path">
          <span>The Node.js side</span>
          <div className="architecture-step"><strong>Main process</strong><small>Talks to the operating system</small></div>
          <div className="architecture-arrow"><span aria-hidden="true">↓</span> gives you</div>
          <div className="architecture-native">
            <div><strong>Native modules</strong></div>
            <div><strong>Filesystem access</strong></div>
            <div><strong>Server-side code</strong></div>
          </div>
        </div>
      </div>
      <div className="architecture-step electron-bridge"><strong><span aria-hidden="true">⇄ </span>Context bridge</strong><small>Passes messages between the two processes. The renderer never calls Node directly.</small></div>
      <figcaption>Electron ships both runtimes inside your app and connects them with a bridge.</figcaption>
    </figure>
  );
}
