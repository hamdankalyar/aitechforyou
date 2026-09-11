import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { articles, getArticle } from "@/lib/articles";
import { ArticleBlock } from "@/components/articles/article-block";
import "../article-learning.css";

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
  const learning = Boolean(article.series);
  const sections = article.sections.map((section, index) => ({ ...section, id: section.id ?? `section-${index + 1}` }));
  const contents = <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}</ol>;

  return (
    <main id="main" className={`article-page ${learning ? "learning-article" : ""}`}>
      <header className={`article-hero ${article.accent}`}>
        <div className="shell article-hero-grid">
          <div>
            <Link className="back-link" href="/articles">← All articles</Link>
            {article.series && <div className="series-eyebrow"><span className="series-dot" />{article.series.title}<span>Article {String(article.series.order).padStart(2, "0")}</span></div>}
            <div className="article-meta"><span>{article.topic}</span><span>{article.date}</span><span>{article.readTime}</span></div>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
            {article.series && <div className="learning-hero-actions"><a href="#try-the-timeline" className="button dark">Explore the timeline <ArrowRight /></a><span>{article.series.practiceTime} · Beginner friendly</span></div>}
          </div>
          {learning ? <div className="learning-hero-art" aria-hidden="true"><div className="hero-snapshot back">A<span>Then.</span></div><div className="hero-snapshot front">C<span>Now.</span><i /><i /><i /></div><div className="hero-art-note">Every moment has a story.</div></div> : <div className="article-number" aria-hidden="true">{article.number}</div>}
        </div>
      </header>
      <article className="article-body shell">
        <aside>{learning ? <><div className="desktop-contents"><span>Inside this article</span><nav aria-label="Article contents">{contents}</nav><div className="contents-footnote">One idea at a time.<br />At your own pace.</div></div><details className="mobile-contents"><summary>Inside this article</summary><nav aria-label="Article contents">{contents}</nav></details></> : <><span>In one sentence</span><p>{article.excerpt}</p></>}</aside>
        <div className="article-prose">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              {learning && <div className="section-counter" aria-hidden="true">{String(index + 1).padStart(2, "0")}<span /></div>}
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.code && <pre><code>{section.code}</code></pre>}
              {section.blocks?.map((block, index) => <ArticleBlock block={block} key={index} />)}
            </section>
          ))}
          {article.sources && <div className="article-sources"><span className="learning-kicker">Further reading · official Git documentation</span><ul>{article.sources.map(source => <li key={source.url}><a href={source.url}>{source.title} ↗</a></li>)}</ul></div>}
          {article.series ? <div className="series-next"><span className="learning-kicker">Next in Git, made visible · In preparation</span><h2>{article.series.nextTitle}</h2><p>Now that you know what a commit remembers, we’ll give yours a name and an identity.</p><Link href="/articles?topic=Git">Browse available Git articles <ArrowRight /></Link></div> : <div className="article-end">
            <span>Keep learning</span>
            <h2>One idea understood.<br />Many more to explore.</h2>
            <Link className="button dark" href="/articles">Read another article <ArrowRight /></Link>
          </div>}
        </div>
      </article>
    </main>
  );
}
