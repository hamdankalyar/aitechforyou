import Link from "next/link";
import { gitConfigReference } from "@/lib/git-config-reference";
import { gitConfigGuide } from "@/lib/git-learning";

export function GitNavigation({ current }: { current?: "reference" | "guides" }) {
  return <nav className="git-navigation" aria-label="Git resources">
    <Link href="/learn/git" aria-current={current === "reference" ? "page" : undefined}>Reference</Link>
    <Link href="/learn/git?view=guides" aria-current={current === "guides" ? "page" : undefined}>Guides</Link>
  </nav>;
}

export function GitReferenceOutline({ current }: { current?: string }) {
  return <nav className="git-reference-outline" aria-label="Git reference topics">
    <Link className="git-reference-home" href="/learn/git">Git Reference</Link>
    <div className="git-label">Setup & configuration</div>
    <Link href={gitConfigReference.href} aria-current={current === gitConfigReference.href ? "page" : undefined}>Git Config</Link>
    <div className="git-reference-related"><div className="git-label">Related guide</div><Link href={gitConfigGuide}>Identity & overrides ↗</Link></div>
  </nav>;
}
