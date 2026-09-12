import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { articles, javascriptCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "JavaScript Course",
  description: "Learn JavaScript with articles organized into Basic, Advanced, Functions, Interviews, Performance, and OOP.",
  alternates: { canonical: "/courses/javascript" },
};

export default function JavaScriptCoursePage() {
  const lessons = articles.filter(article => article.topic === "JavaScript")
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));

  return (
    <main id="main" className="page-main shell javascript-course">
      <Link className="back-link" href="/courses">← All courses</Link>
      <div className="page-hero">
        <span className="eyebrow"><span /> {lessons.length} articles · 6 sections</span>
        <h1>JavaScript.</h1>
        <p>Start with the basics, then explore each part of the language. Every article has examples you can run.</p>
      </div>
      <nav className="filter-row course-categories" aria-label="JavaScript sections">
        {javascriptCategories.map(category => (
          <a href={`#${category.toLowerCase()}`} key={category}>{category}</a>
        ))}
      </nav>
      {javascriptCategories.map(category => {
        const categoryArticles = lessons.filter(article => article.category === category);
        const id = category.toLowerCase();
        return (
          <section className="course-section" id={id} aria-labelledby={`${id}-heading`} key={category}>
            <div className="course-section-heading">
              <h2 id={`${id}-heading`}>{category}</h2>
              <span>{categoryArticles.length} {categoryArticles.length === 1 ? "article" : "articles"}</span>
            </div>
            {categoryArticles.length ? (
              <div className="articles-grid">
                {categoryArticles.map(article => <ArticleCard article={article} key={article.slug} />)}
              </div>
            ) : <p className="course-empty">No articles yet in {category}.</p>}
          </section>
        );
      })}
    </main>
  );
}
