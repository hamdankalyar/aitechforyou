// Reuses the architecture figure classes from topics/react-native/react-native-learning.css, like the runtime diagram.
const windows = ["Window 1", "Window 2", "Window 3"];

export function ElectronProcessDiagram() {
  return (
    <figure className="package-architecture electron-process">
      <div className="architecture-step architecture-folder electron-process-main"><strong>Main process</strong><small>One per app · Node.js</small></div>
      <div className="architecture-arrow electron-process-ipc"><span aria-hidden="true">↕</span> IPC messages go both ways</div>
      <div className="electron-process-windows">
        {windows.map(name => (
          <div className="architecture-course-path architecture-problem-path" key={name}>
            <span>{name}</span>
            <div className="architecture-step"><strong>Preload script</strong><small>Shares a short allow list</small></div>
            <div className="architecture-arrow"><span aria-hidden="true">↓</span> before the page loads</div>
            <div className="architecture-step"><strong>Renderer process</strong><small>Shows the page</small></div>
          </div>
        ))}
      </div>
      <figcaption>One main process runs the app. Each window gets its own renderer process, with a preload script in front of it.</figcaption>
    </figure>
  );
}
