export function BrandLogo() {
  return (
    <>
      <svg className="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect className="brand-tile" x="1" y="1" width="62" height="62" rx="17" />
        <path className="brand-letter" d="M36 26v22m0-11a11 11 0 1 1-22 0 11 11 0 1 1 22 0" strokeWidth="6.5" strokeLinecap="round" />
        <path className="brand-accent" d="M49 32v16" strokeWidth="6.5" strokeLinecap="round" />
        <circle className="brand-dot" cx="49" cy="20" r="4.5" />
      </svg>
      <span className="brand-wordmark">aitech<span>foryou</span></span>
    </>
  );
}
