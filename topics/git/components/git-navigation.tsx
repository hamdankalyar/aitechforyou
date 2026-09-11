import Link from "next/link";
import { gitReferenceGroups } from "@/topics/git/content/git-references";

export function GitNavigation({ current }: { current?: "reference" | "guides" }) {
  return <nav className="git-navigation" aria-label="Git resources">
    <Link href="/learn/git" aria-current={current === "reference" ? "page" : undefined}>Reference</Link>
    <Link href="/learn/git?view=guides" aria-current={current === "guides" ? "page" : undefined}>Guides</Link>
  </nav>;
}

export function GitReferenceOutline({ current }: { current?: string }) {
  return <nav className="git-reference-outline" aria-label="Git reference topics">
    <Link className="git-reference-home" href="/learn/git">Git Reference</Link>
    {gitReferenceGroups.map(group => <div key={group.label}>
      <div className="git-label">{group.label}</div>
      {group.references.map(reference => <Link key={reference.href} href={reference.href} aria-current={current === reference.href ? "page" : undefined}>{reference.title}</Link>)}
    </div>)}
    <div className="git-reference-related"><div className="git-label">Need the why?</div><Link href="/learn/git?view=guides">Browse the guides ↗</Link></div>
  </nav>;
}
