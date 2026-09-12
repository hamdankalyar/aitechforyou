import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { GitLessonOutline } from "@/topics/git/components/git-lesson-outline";
import { GitNavigation, GitReferenceOutline } from "@/topics/git/components/git-navigation";
import { articles } from "@/lib/articles";
import { getGitResources, gitConfigGuide, searchGitResources } from "@/topics/git/content/git-learning";
import { gitReferenceGroups } from "@/topics/git/content/git-references";
import "@/topics/git/git-learning.css";

export const metadata: Metadata = {
  title: "Learn Git: Reference & Guides",
  description: "Find a Git command or understand the concept. Practical references, short lessons, and detailed visual guides, side by side.",
  alternates: { canonical: "/learn/git" },
};

export default async function GitLearningPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; view?: string | string[] }> }) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q ?? "").trim();
  const view = params.view === "guides" ? "guides" : "reference";
  const resources = getGitResources(articles);
  const results = query ? searchGitResources(resources, query) : resources.filter(resource => resource.kind === "Guide");
  const result = (resource: { href: string; kind: string; time: string; title: string; description: string }) => <Link className="git-result" href={resource.href} key={resource.href}><div className="git-resource-meta"><span>{resource.kind}</span>{resource.kind !== "Reference" && <span>{resource.time}</span>}</div><h3>{resource.title} <ArrowRight size={20} /></h3><p>{resource.description}</p></Link>;

  return <main id="main" className="git-learning git-reference-hub shell">
    <header className="git-hub-hero">
      <Link className="git-back" href="/courses">← All courses</Link>
      <div className="git-label">The Git notebook</div>
      <h1>{query ? "Find a Git answer." : view === "guides" ? "Git Guides" : "Git Reference"}</h1>
      <p>{view === "guides" ? "Understand the ideas behind the commands, with stories, visual examples, and room to explore." : "Find the command. See how to use it. Get back to your project."}</p>
      <form action="/learn/git" method="get" role="search" className="git-search">
        <label htmlFor="git-query">Search Git references, guides, and lessons</label>
        <div><input id="git-query" name="q" type="search" defaultValue={query} placeholder="Try “git config” or “set email”" /><button type="submit" className="button dark">Search <ArrowRight size={18} /></button></div>
      </form>
    </header>
    <GitNavigation current={query ? undefined : view} />
    <div className="git-hub-grid">
      <aside><GitReferenceOutline /><details className="git-existing-lessons"><summary>Getting started lessons</summary><GitLessonOutline /></details></aside>
      <div className="git-catalog">
        {query || view === "guides" ? <section aria-labelledby="catalog-heading">
          <div className="git-section-heading"><div><span className="git-label">{query ? "Search all Git resources" : "Learn the concepts"}</span><h2 id="catalog-heading">{query ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”` : "Understand how Git works."}</h2></div>{query && <Link href="/learn/git">Clear search</Link>}</div>
          {query && results.length === 0 && <p className="git-empty">No published page matches that yet. Try “email”, “snapshot”, or “merge”, or clear the search to browse everything available.</p>}
          {results.map(result)}
        </section> : gitReferenceGroups.map((group, index) => <section key={group.label} aria-labelledby={`group-${index}`}>
          <div className="git-section-heading"><div>{index === 0 && <span className="git-label">Browse by topic</span>}<h2 id={`group-${index}`}>{group.label}</h2></div></div>
          {group.references.map(reference => result({ ...reference, kind: "Reference" }))}
        </section>)}
        {!query && view === "reference" && <aside className="git-hub-guide"><span className="git-label">Looking for the explanation?</span><h2>Go deeper with a guide.</h2><p>See how Git’s settings work together, and why a project can use a different email.</p><Link href={gitConfigGuide}>Explore identity & overrides <ArrowRight size={18} /></Link><Link href="/learn/git?view=guides">Browse all Git guides →</Link></aside>}
      </div>
    </div>
  </main>;
}
