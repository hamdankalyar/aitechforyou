import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { articles, courses } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse clear, practical lessons about Git, AI, and JavaScript: interactive guides, runnable code, and visual explanations.",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const { topic } = await searchParams;
  const selectedTopic = (Array.isArray(topic) ? topic[0] : topic)?.toLowerCase();
  if (selectedTopic === "web") redirect("/articles?topic=JavaScript");
  if (selectedTopic === "javascript") redirect("/courses/javascript");
  const visibleArticles = selectedTopic ? articles.filter((article) => article.topic.toLowerCase() === selectedTopic) : articles;

  return (
    <main id="main" className="page-main shell">
      <div className="page-hero">
        <span className="eyebrow"><span /> The learning archive</span>
        <h1>Ideas, unpacked.</h1>
        <p>Notes from what I&apos;m learning, rewritten to make the difficult parts feel obvious.</p>
      </div>
      <div className="filter-row" aria-label="Article filter">
        <Link className={!selectedTopic ? "active" : ""} aria-current={!selectedTopic ? "page" : undefined} href="/articles" scroll={false}>All</Link>
        {courses.map(({ name }) => <Link className={selectedTopic === name.toLowerCase() ? "active" : ""} aria-current={selectedTopic === name.toLowerCase() ? "page" : undefined} href={name === "JavaScript" ? "/courses/javascript" : `/articles?topic=${name}`} key={name} scroll={false}>{name === "JavaScript" ? "JS" : name}</Link>)}
      </div>
      <div className="articles-grid archive-grid">
        {visibleArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </div>
      {visibleArticles.length === 0 && <p>No articles match this course yet. <Link href="/articles">Browse all articles</Link>.</p>}
    </main>
  );
}
