// Reuses the architecture figure classes from topics/react-native/react-native-learning.css, like the other Electron diagrams.
const steps = [
  { file: "package.json", text: "Its main field points to main.js", next: "npm start runs" },
  { file: "main.js", text: "Main process · creates the window", next: "the window runs", main: true },
  { file: "preload.js", text: "Renderer process · runs before the page", next: "then the window loads" },
  { file: "index.html", text: "The page, with a Content Security Policy", next: "a script tag loads" },
  { file: "renderer.js", text: "Renderer process · normal front-end code" },
];

export function ElectronStartupDiagram() {
  return (
    <figure className="package-architecture">
      <div className="architecture-course-path">
        <span>The order the four files run</span>
        {steps.map(step => <div key={step.file}>
          <div className={step.main ? "architecture-step architecture-folder" : "architecture-step"}><strong>{step.file}</strong><small>{step.text}</small></div>
          {step.next && <div className="architecture-arrow"><span aria-hidden="true">↓</span> {step.next}</div>}
        </div>)}
      </div>
      <figcaption>Electron reads package.json, runs main.js, and main.js opens the window that loads everything else.</figcaption>
    </figure>
  );
}
