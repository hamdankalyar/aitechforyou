import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  return (
    <main id="main" className="article-page">
      <header className={`article-hero ${article.accent}`}>
        <div className="shell article-hero-grid">
          <div>
            <Link className="back-link" href="/articles">← All articles</Link>
            <div className="article-meta"><span>{article.topic}</span><span>{article.date}</span><span>{article.readTime}</span></div>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
          </div>
          <div className="article-number" aria-hidden="true">{article.number}</div>
        </div>
      </header>
      <article className="article-body shell">
        <aside><span>In one sentence</span><p>{article.excerpt}</p></aside>
        <div className="article-prose">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.code && <pre><code>{section.code}</code></pre>}
            </section>
          ))}
          <div className="article-end">
            <span>Keep learning</span>
            <h2>One idea understood.<br />Many more to explore.</h2>
            <Link className="button dark" href="/articles">Read another article <ArrowRight /></Link>
          </div>
        </div>
      </article>
    </main>
  );
}
