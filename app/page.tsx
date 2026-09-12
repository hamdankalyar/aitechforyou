import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { ArrowRight, Spark } from "@/components/icons";
import { articles, courses } from "@/lib/articles";
import { JsonLd, site, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — Git, JavaScript, and AI, made clear` },
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = articles.find((article) => article.featured) ?? articles[0];

  return (
    <main id="main">
      <JsonLd data={websiteSchema} />
      <section className="hero shell">
        <div className="eyebrow"><span /> Learning in public, one idea at a time</div>
        <div className="hero-grid">
          <div>
            <h1>Complex tech.<br /><em>Made clear.</em></h1>
            <p className="hero-intro">I learn technology, pull it apart, and rebuild the explanation so it finally makes sense.</p>
            <div className="hero-actions">
              <Link className="button primary" href="/articles">Explore articles <ArrowRight /></Link>
              <Link className="text-link" href="/about">Why I built this <ArrowRight size={18} /></Link>
            </div>
          </div>
          <div className="hero-visual" aria-label="A visual path from confusion to understanding">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="visual-label label-one">confusing</span>
            <span className="visual-label label-two">click.</span>
            <div className="visual-core"><Spark size={54} /><strong>Aha!</strong><small>now it makes sense</small></div>
          </div>
        </div>
        <div className="hero-ticker" aria-label="Courses available">
          <span>Git</span><i />
          <span>JS</span><i />
          <span>Artificial intelligence</span><i />
          <span>And whatever comes next</span>
        </div>
      </section>

      <section className="featured-section">
        <div className="shell">
          <div className="section-heading">
            <div><span className="section-index">01</span><p>Featured guide</p></div>
            <p>A good place to start</p>
          </div>
          <article className="featured-card">
            <div className="featured-art" aria-hidden="true">
              <span className="branch-line main-line" />
              <span className="branch-line split-line" />
              <span className="commit commit-a">A</span>
              <span className="commit commit-b">B</span>
              <span className="commit commit-c">C</span>
              <span className="commit commit-d">D</span>
              <span className="branch-name">main</span>
              <span className="branch-name feature-name">feature</span>
            </div>
            <div className="featured-copy">
              <div className="card-topline"><span>{featured.topic}</span><span>{featured.readTime}</span></div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Link className="button dark" href={`/articles/${featured.slug}`}>Read the guide <ArrowRight /></Link>
            </div>
          </article>
        </div>
      </section>

      <section className="topics-section shell">
        <div className="section-heading dark-heading">
          <div><span className="section-index">02</span><p>Explore courses</p></div>
          <Link className="text-link" href="/courses">View all courses <ArrowRight size={18} /></Link>
        </div>
        <div className="topic-grid">
          {courses.map((topic) => (
            <Link className={`topic-card ${topic.className}`} href={topic.href} key={topic.name}>
              <span>{topic.index}</span>
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="latest-section shell">
        <div className="section-heading dark-heading">
          <div><span className="section-index">03</span><p>Latest ideas</p></div>
          <Link className="text-link" href="/articles">Browse the archive <ArrowRight size={18} /></Link>
        </div>
        <div className="articles-grid">
          {articles.slice(1, 4).map((article) => <ArticleCard article={article} key={article.slug} />)}
        </div>
      </section>

      <section className="manifesto">
        <div className="shell manifesto-grid">
          <div className="manifesto-kicker"><Spark /> The idea behind this place</div>
          <blockquote>“If I can’t explain it simply, I haven’t understood it yet.”</blockquote>
          <div>
            <p>This is my public learning notebook—polished into explanations I wish I had when I started.</p>
            <Link className="button light" href="/about">Read my story <ArrowRight /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
