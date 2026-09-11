import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="AI Tech For You home">
          <BrandLogo />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/articles">Articles</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="header-cta" href="/articles">Start learning</Link>
        </div>
      </div>
    </header>
  );
}
