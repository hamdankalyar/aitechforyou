import Link from "next/link";
import { Spark } from "./icons";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="AI Tech For You home">
          <span className="brand-mark"><Spark size={18} /></span>
          <span>AI TECH <i>FOR YOU</i></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/articles">Articles</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="header-cta" href="/articles">Start learning</Link>
      </div>
    </header>
  );
}
