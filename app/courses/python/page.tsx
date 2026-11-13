import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { articles, type Article } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Python",
  description: "Python FM",
  alternates: { canonical: "/courses/python" },
};

const notes = articles.filter(article => article.topic === "Python");
const childrenOf = (slug: string) => notes.filter(note => note.parentSlug === slug);
const chapters = notes.filter(note => !note.parentSlug && childrenOf(note.slug).length);
const standaloneNotes = notes.filter(note => !note.parentSlug && !childrenOf(note.slug).length);

function chapterSize(chapter: Article): number {
  return Number(chapter.sections.length > 0) + childrenOf(chapter.slug).reduce((count, child) => count + chapterSize(child), 0);
}

function ChapterTopics({ chapter, nested = false }: { chapter: Article; nested?: boolean }) {
  const children = childrenOf(chapter.slug);
  const directNotes = [...(chapter.sections.length ? [chapter] : []), ...children.filter(note => !childrenOf(note.slug).length)];

  return (
    <>
      {directNotes.length > 0 && <div className="articles-grid">
        {directNotes.map(article => <ArticleCard article={article} headingLevel={nested ? 4 : 3} key={article.slug} />)}
      </div>}
      {children.filter(note => childrenOf(note.slug).length).map(note => (
        <div className="course-subsection" id={note.slug} key={note.slug}>
          <h3>{note.title}</h3>
          <ChapterTopics chapter={note} nested />
        </div>
      ))}
    </>
  );
}

export default function PythonCoursePage() {
  return (
    <main id="main" className="page-main shell course-page">
      <Link className="back-link" href="/courses">← All courses</Link>
      <div className="page-hero"><h1>Python.</h1></div>
      <nav className="filter-row course-categories" aria-label="Python sections">
        {chapters.map(chapter => <a href={`#${chapter.slug}`} key={chapter.slug}>{chapter.title}</a>)}
      </nav>
      <div className="articles-grid">
        {standaloneNotes.map(article => <ArticleCard article={article} key={article.slug} />)}
      </div>
      {chapters.map(chapter => (
        <section className="course-section" id={chapter.slug} aria-labelledby={`${chapter.slug}-heading`} key={chapter.slug}>
          <div className="course-section-heading">
            <h2 id={`${chapter.slug}-heading`}>{chapter.title}</h2>
            <span>{chapterSize(chapter)} articles</span>
          </div>
          <ChapterTopics chapter={chapter} />
        </section>
      ))}
    </main>
  );
}
