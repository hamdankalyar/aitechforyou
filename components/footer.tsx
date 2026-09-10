import Link from "next/link";
import { Spark } from "./icons";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark"><Spark size={18} /></span>
            <span>AI TECH <i>FOR YOU</i></span>
          </Link>
          <p>Technology, explained like we&apos;re learning it together.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/articles">Articles</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/about">About</Link>
        </nav>
        <p className="footer-note">Built with curiosity.<br />© {new Date().getFullYear()} AI Tech For You.</p>
      </div>
    </footer>
  );
}
