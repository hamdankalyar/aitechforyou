import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { articles, electronCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Electron Course",
  description: "Learn Electron by building desktop apps: the main and renderer processes, files, frameworks, and operating system features.",
  alternates: { canonical: "/courses/electron" },
};

export default function ElectronCoursePage() {
  const lessons = articles.filter(article => article.topic === "Electron")
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));

  return (
    <main id="main" className="page-main shell course-page">
      <Link className="back-link" href="/courses">← All courses</Link>
      <div className="page-hero">
        <span className="eyebrow"><span /> {lessons.length} {lessons.length === 1 ? "lecture" : "lectures"} · {electronCategories.length} sections</span>
        <h1>Electron.</h1>
        <p>Use your web skills to build desktop apps. Every lecture ends with a quiz so you can check what stuck.</p>
      </div>
      <nav className="filter-row course-categories" aria-label="Electron sections">
        {electronCategories.map(category => (
          <a href={`#${category.toLowerCase()}`} key={category}>{category}</a>
        ))}
      </nav>
      {electronCategories.map(category => {
        const categoryArticles = lessons.filter(article => article.category === category);
        const id = category.toLowerCase();
        return (
          <section className="course-section" id={id} aria-labelledby={`${id}-heading`} key={category}>
            <div className="course-section-heading">
              <h2 id={`${id}-heading`}>{category}</h2>
              <span>{categoryArticles.length} {categoryArticles.length === 1 ? "lecture" : "lectures"}</span>
            </div>
            {categoryArticles.length ? (
              <div className="articles-grid">
                {categoryArticles.map(article => <ArticleCard article={article} key={article.slug} />)}
              </div>
            ) : <p className="course-empty">No lectures yet in {category}.</p>}
          </section>
        );
      })}
    </main>
  );
}
