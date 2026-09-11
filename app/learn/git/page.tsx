import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { GitLessonOutline } from "@/components/git-lesson-outline";
import { articles } from "@/lib/articles";
import { getGitResources, gitConfigGuide, searchGitResources } from "@/lib/git-learning";
import "./git-learning.css";

export const metadata: Metadata = { title: "Learn Git — short lessons and detailed guides", description: "Learn Git one small step at a time, explore detailed guides, or find the command you need." };

export default async function GitLearningPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q ?? "").trim();
  const resources = getGitResources(articles);
  const lessons = resources.filter(resource => resource.kind === "Lesson");
  const guides = resources.filter(resource => resource.kind === "Guide");
  const results = searchGitResources(resources, query);

  return <main id="main" className="git-learning shell">
    <header className={`git-hub-hero${query ? " is-searching" : ""}`}>
      <Link className="git-back" href="/topics">← All topics</Link>
      <div className="git-label">The Git notebook</div>
      {query ? <h1>Find a Git answer.</h1> : <><h1>Small steps.<br /><em>Deeper understanding.</em></h1><p>Follow a short lesson to get something done. Open a guide when you want to understand why it works.</p></>}
      <form action="/learn/git" method="get" role="search" className="git-search">
        <label htmlFor="git-query">Find a Git topic or command</label>
        <div><input id="git-query" name="q" type="search" defaultValue={query} placeholder="Try “set email” or “git config”" /><button type="submit" className="button dark">Search <ArrowRight size={18} /></button></div>
      </form>
      {!query && <div className="git-shortcuts"><span>Looking for:</span><Link href="/learn/git/configure">Set my email</Link><Link href={`${gitConfigGuide}#follow-the-value`}>Wrong project email</Link><Link href="/articles/git-is-a-time-machine">Save vs. commit</Link></div>}
    </header>
    <div className="git-hub-grid">
      <aside><GitLessonOutline /></aside>
      <div className="git-catalog">
        {query ? <section aria-labelledby="search-heading">
          <div className="git-section-heading"><div><span className="git-label">Search published lessons & guides</span><h2 id="search-heading">{`${results.length} ${results.length === 1 ? "result" : "results"} for “${query}”`}</h2></div><Link href="/learn/git">Clear search</Link></div>
          {results.length === 0 && <p className="git-empty">No published page matches that yet. Try “email”, “snapshot”, or “merge”, or clear the search to browse everything available.</p>}
          {results.map(resource => <Link className="git-result" href={resource.href} key={resource.href}><div className="git-resource-meta"><span>{resource.kind}</span><span>{resource.time}</span></div><h3>{resource.title} <ArrowRight size={20} /></h3><p>{resource.description}</p></Link>)}
        </section> : <>
          <section aria-labelledby="lessons-heading"><div className="git-section-heading"><div><span className="git-label">{`Learn Git · ${lessons.length} lessons available`}</span><h2 id="lessons-heading">One useful thing. Then the next.</h2></div></div><p className="git-section-intro">Start with the basic idea, install Git, then build a tiny project one step at a time. Each lesson has one small goal.</p>
            {lessons.map((lesson, index) => <Link className={`git-result${index === 0 ? " git-lesson-feature" : ""}`} href={lesson.href} key={lesson.href}><div className="git-resource-meta"><span>Lesson · Getting started</span><span>{lesson.time}</span></div><h3>{lesson.title}</h3><p>{lesson.description}</p><span className="git-resource-action">Take the lesson <ArrowRight size={20} /></span></Link>)}
          </section>
          <section aria-labelledby="guides-heading"><div className="git-section-heading"><div><span className="git-label">Git Guides</span><h2 id="guides-heading">Stay curious. Go deeper.</h2></div></div><p className="git-section-intro">Visual explanations and room to explore. Read whichever answers your question.</p>
            {guides.map(resource => <Link className="git-result" href={resource.href} key={resource.href}><div className="git-resource-meta"><span>{resource.kind}</span><span>{resource.time}</span></div><h3>{resource.title} <ArrowRight size={20} /></h3><p>{resource.description}</p></Link>)}
          </section>
        </>}
      </div>
    </div>
  </main>;
}
