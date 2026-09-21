import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { articles, reactNativeCategories } from "@/lib/articles";

export const metadata: Metadata = {
  title: "React Native Course",
  description: "Learn React Native through lessons on components, styling, navigation, state, device APIs, and performance.",
  alternates: { canonical: "/courses/react-native" },
};

export default function ReactNativeCoursePage() {
  const lessons = articles.filter(article => article.topic === "React Native")
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));

  return (
    <main id="main" className="page-main shell course-page">
      <Link className="back-link" href="/courses">← All courses</Link>
      <div className="page-hero">
        <span className="eyebrow"><span /> {lessons.length} articles · {reactNativeCategories.length} sections</span>
        <h1>React Native.</h1>
        <p>Learn to build mobile apps from reusable components, then connect navigation, data, and device features.</p>
      </div>
      <nav className="filter-row course-categories" aria-label="React Native sections">
        {reactNativeCategories.map(category => (
          <a href={`#${category.toLowerCase()}`} key={category}>{category}</a>
        ))}
      </nav>
      {reactNativeCategories.map(category => {
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
