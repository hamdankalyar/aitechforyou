import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="page-main shell">
      <div className="page-hero">
        <span className="eyebrow"><span /> 404</span>
        <h1>That page does not exist.</h1>
        <p>The link may be old, or the lesson is still being written.</p>
        <Link className="button primary" href="/articles">Browse all articles <ArrowRight /></Link>
      </div>
    </main>
  );
}
