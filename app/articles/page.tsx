import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { articles } from "@/lib/articles";

export const metadata: Metadata = { title: "Articles", description: "Browse clear, practical lessons about Git, AI, and web development." };

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const visibleArticles = topic ? articles.filter((article) => article.topic.toLowerCase() === topic.toLowerCase()) : articles;

  return (
    <main id="main" className="page-main shell">
      <div className="page-hero">
        <span className="eyebrow"><span /> The learning archive</span>
        <h1>Ideas, unpacked.</h1>
        <p>Notes from what I&apos;m learning, rewritten to make the difficult parts feel obvious.</p>
      </div>
      <div className="filter-row" aria-label="Article filter">
        <a className={!topic ? "active" : ""} href="/articles">All</a>
        {['Git', 'AI', 'Web'].map((name) => <a className={topic === name ? "active" : ""} href={`/articles?topic=${name}`} key={name}>{name}</a>)}
      </div>
      <div className="articles-grid archive-grid">
        {visibleArticles.map((article) => <ArticleCard article={article} key={article.slug} />)}
      </div>
    </main>
  );
}
