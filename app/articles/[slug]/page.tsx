import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { articles, getArticle } from "@/lib/articles";
import { JsonLd, articleSchema, breadcrumbSchema, isoDate, site } from "@/lib/seo";
import { ArticleBlock, Emphasis } from "@/components/articles/article-block";
import { CodeRunner } from "@/topics/javascript/components/code-runner";
import { GitNavigation } from "@/topics/git/components/git-navigation";
import { gitReferences } from "@/topics/git/content/git-references";
import "../article-learning.css";
import "@/topics/javascript/javascript-learning.css";
import "@/topics/git/git-learning.css";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const path = `/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: article.title, description: article.excerpt, publishedTime: isoDate(article.date), authors: [site.author.name], section: article.topic, tags: [article.topic, ...(article.series ? [article.series.title] : [])] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const series = article.series;
  const learning = Boolean(series);
  const showSectionNumbers = learning && article.topic !== "AI";
  const topicSlug = article.topic.toLowerCase();
  const runnableCode = article.topic === "JavaScript";
  const topicGuidesHref = article.topic === "Git" ? "/learn/git?view=guides" : article.topic === "JavaScript" ? `/courses/javascript#${article.category.toLowerCase()}` : `/articles?topic=${article.topic}`;
  const nextArticle = series ? articles.find(candidate => candidate.series?.title === series.title && candidate.series?.order === series.order + 1) : undefined;
  const previousArticle = series ? articles.find(candidate => candidate.series?.title === series.title && candidate.series?.order === series.order - 1) : undefined;
  const sections = article.sections.map((section, index) => ({ ...section, id: section.id ?? `section-${index + 1}` }));
  const contents = <ol>{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}>{showSectionNumbers && <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}{section.heading}</a></li>)}</ol>;

  return (
    <main id="main" className={`article-page topic-${topicSlug} ${learning ? "learning-article" : ""}`}>
      <JsonLd data={articleSchema(article)} />
      <JsonLd data={breadcrumbSchema([{ name: "Articles", path: "/articles" }, { name: article.title, path: `/articles/${article.slug}` }])} />
      {article.topic === "Git" && <div className="shell git-article-navigation"><GitNavigation current="guides" /></div>}
      <header className={`article-hero ${article.accent}`}>
        <div className="shell article-hero-grid">
          <div>
            <Link className="back-link" href={learning ? topicGuidesHref : "/articles"}>← {article.topic === "JavaScript" ? `JavaScript course · ${article.category}` : learning ? `All ${article.topic} guides` : "All articles"}</Link>
            {article.series && <div className="series-eyebrow"><span className="series-dot" />{article.topic} Guide<span>{article.series.title}</span></div>}
            <div className="article-meta"><span>{article.topic}</span><time dateTime={isoDate(article.date)}>{article.date}</time><span>{article.readTime}</span></div>
            <h1>{article.title}</h1>
            <p>{article.excerpt}</p>
            {article.series && <div className="learning-hero-actions"><a href={`#${article.series.exercise.id}`} className="button dark">{article.series.exercise.label} <ArrowRight /></a><span>{article.series.practiceTime}</span></div>}
            {article.shortLesson && <div className="short-lesson-link"><span>{gitReferences.some(reference => reference.href === article.shortLesson?.href) ? "Need the commands?" : "Prefer a short lesson?"}</span><Link href={article.shortLesson.href}>{gitReferences.some(reference => reference.href === article.shortLesson?.href) ? `${article.shortLesson.title} reference` : `Short lesson: ${article.shortLesson.title}`} <ArrowRight size={16} /></Link></div>}
          </div>
          {article.series?.illustration === "values" ? <div className="variables-hero-art" aria-hidden="true"><span>const viewerName =</span><strong>"Ali"</strong><div><span>A name.</span><span>A string value.</span></div></div> : article.series?.illustration === "ai-evolution" ? <div className="ai-evolution-art" aria-hidden="true"><div><span>01</span>Generate</div><div><span>02</span>Retrieve</div><div><span>03</span>Act</div><div><span>04</span>Adapt</div></div> : article.series?.illustration === "inspection" ? <div className="commit-hero-art" aria-hidden="true"><div><small>Locate changes</small>status</div><span>·</span><div><small>Compare versions</small>diff</div><span>·</span><div><small>Read history</small>log</div></div> : article.series?.illustration === "ignore" ? <div className="commit-hero-art" aria-hidden="true"><div><small>Matches a rule</small>Ignored</div><span>·</span><div><small>Starts with !</small>Kept</div><span>·</span><div><small>Already tracked</small>Unchanged</div></div> : article.series?.illustration === "branches" ? <div className="commit-hero-art" aria-hidden="true"><div><small>A label</small>main</div><span>·</span><div><small>Where you are</small>HEAD</div><span>·</span><div><small>Another label</small>sci-fi</div></div> : article.series?.illustration === "merge" ? <div className="commit-hero-art" aria-hidden="true"><div><small>main is behind</small>Fast-forward</div><span>·</span><div><small>Both moved</small>Merge commit</div><span>·</span><div><small>Two parents</small>D + C</div></div> : article.series?.illustration === "conflict" ? <div className="commit-hero-art" aria-hidden="true"><div><small>{"<<<<<<< HEAD"}</small>Piranesi</div><span>=======</span><div><small>{">>>>>>> sci-fi"}</small>Foundation</div><span>·</span><div><small>Your answer</small>Both</div></div> : article.series?.illustration === "remotes" ? <div className="commit-hero-art" aria-hidden="true"><div><small>Yours</small>main</div><span>·</span><div><small>Your record</small>origin/main</div><span>·</span><div><small>Sam’s</small>main</div></div> : article.series?.illustration === "push" ? <div className="commit-hero-art" aria-hidden="true"><div><small>Send</small>push</div><span>·</span><div><small>Bring</small>pull</div><span>·</span><div><small>Link</small>upstream</div></div> : article.series?.illustration === "fork" ? <div className="commit-hero-art" aria-hidden="true"><div><small>Sam’s</small>upstream</div><span>·</span><div><small>Your copy</small>fork</div><span>·</span><div><small>The ask</small>PR</div></div> : article.series?.illustration === "stash" ? <div className="commit-hero-art" aria-hidden="true"><div><small>Set aside</small>push</div><span>·</span><div><small>Take a copy</small>apply</div><span>·</span><div><small>Take it back</small>pop</div></div> : article.series?.illustration === "staging" ? <div className="commit-hero-art" aria-hidden="true"><div><small>01 · Save</small>Your file</div><span>↓</span><div><small>02 · Stage</small>Prepared</div><span>↓</span><div><small>03 · Commit</small>Recorded</div></div> : learning ? <div className="learning-hero-art" aria-hidden="true"><div className="hero-snapshot back">{article.series?.illustration === "config" ? "G" : "A"}<span>{article.series?.illustration === "config" ? "Global." : "Then."}</span></div><div className="hero-snapshot front">{article.series?.illustration === "config" ? "L" : "C"}<span>{article.series?.illustration === "config" ? "Local." : "Now."}</span><i /><i /><i /></div><div className="hero-art-note">{article.series?.illustration === "config" ? "A default. An exception." : "Every moment has a story."}</div></div> : <div className="article-number" aria-hidden="true">{article.number}</div>}
        </div>
      </header>
      <article className="article-body shell">
        <aside>{learning ? <><div className="desktop-contents"><span>Inside this article</span><nav aria-label="Article contents">{contents}</nav><div className="contents-footnote">One idea at a time.<br />At your own pace.</div></div><details className="mobile-contents"><summary>Inside this article</summary><nav aria-label="Article contents">{contents}</nav></details></> : <><span>In one sentence</span><p>{article.excerpt}</p></>}</aside>
        <div className="article-prose">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              {showSectionNumbers && <div className="section-counter" aria-hidden="true">{String(index + 1).padStart(2, "0")}<span /></div>}
              <h2>{section.heading}</h2>
              {learning ? <ul className="guide-points">{section.paragraphs.map(paragraph => {
                const text = typeof paragraph === "string" ? paragraph : paragraph.text;
                return <li key={text}><Emphasis text={text} />{typeof paragraph !== "string" && <ul>{paragraph.bullets.map(bullet => <li key={bullet}><Emphasis text={bullet} /></li>)}</ul>}</li>;
              })}</ul> : section.paragraphs.map(paragraph => typeof paragraph === "string" ? <p key={paragraph}>{paragraph}</p> : <div key={paragraph.text}><p><Emphasis text={paragraph.text} /></p><ul>{paragraph.bullets.map(bullet => <li key={bullet}><Emphasis text={bullet} /></li>)}</ul></div>)}
              {section.code && (runnableCode ? <CodeRunner code={section.code} /> : <pre tabIndex={0} aria-label="Code example"><code>{section.code}</code></pre>)}
              {section.blocks?.map((block, index) => <ArticleBlock block={block} runnableCode={runnableCode} key={index} />)}
            </section>
          ))}
          {article.sources && <div className="article-sources"><span className="learning-kicker">Further reading · {article.topic} sources</span><ul>{article.sources.map(source => <li key={source.url}><a href={source.url}>{source.title} ↗</a></li>)}</ul></div>}
          {article.series ? <nav className="series-navigation" aria-label={`${article.topic} guides`}>{previousArticle && <Link className="series-previous" href={`/articles/${previousArticle.slug}`}>← Previous guide: {previousArticle.title}</Link>}<div className="series-next"><span className="learning-kicker">Next guide in {article.series.title}{nextArticle ? "" : " · In preparation"}</span><h2>{nextArticle?.title ?? article.series.nextTitle}</h2><p>{article.series.nextDescription}</p>{nextArticle ? <Link href={`/articles/${nextArticle.slug}`}>Read the guide <ArrowRight /></Link> : <Link href={topicGuidesHref}>Browse {article.topic} {article.topic === "Git" ? "lessons & guides" : "articles & guides"} <ArrowRight /></Link>}</div></nav> : <div className="article-end">
            <span>Keep learning</span>
            <h2>One idea understood.<br />Many more to explore.</h2>
            <Link className="button dark" href="/articles">Read another article <ArrowRight /></Link>
          </div>}
        </div>
      </article>
    </main>
  );
}
