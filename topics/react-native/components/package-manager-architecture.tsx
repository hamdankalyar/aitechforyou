export function PackageManagerArchitecture() {
  return (
    <figure className="package-architecture">
      <div className="architecture-path-grid">
        <div className="architecture-course-path">
          <span>Why Yarn Classic works here</span>
          <div className="architecture-step"><strong>Yarn Classic</strong></div>
          <div className="architecture-arrow"><span aria-hidden="true">↓</span> creates</div>
          <div className="architecture-step architecture-folder"><strong>node_modules/</strong></div>
          <div className="architecture-arrow"><span aria-hidden="true">↓</span> linked directly from</div>
          <div className="architecture-native">
            <div><strong>Native iOS directory</strong></div>
            <div><strong>Native Android directory</strong></div>
          </div>
        </div>

        <div className="architecture-course-path architecture-problem-path">
          <span>Why Plug&apos;n&apos;Play can be a problem</span>
          <div className="architecture-step"><strong>Yarn Modern or pnpm</strong></div>
          <div className="architecture-arrow"><span aria-hidden="true">↓</span> Plug&apos;n&apos;Play gets rid of</div>
          <div className="architecture-step"><strong>node_modules/</strong><small>Folder does not exist</small></div>
          <div className="architecture-arrow"><span aria-hidden="true">↓</span> native links break</div>
          <div className="architecture-step"><strong>Workaround</strong><small>Use a hoisted node linker</small></div>
        </div>
      </div>
      <figcaption>This is why Yarn Classic is used in the course.</figcaption>
    </figure>
  );
}
