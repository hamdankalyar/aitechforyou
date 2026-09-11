import Link from "next/link";
import type { Article } from "@/lib/articles";
import { isoDate } from "@/lib/seo";
import { ArrowUpRight } from "./icons";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className={`article-card ${article.accent}`}>
      <div className="card-topline">
        <span>{article.topic}</span>
        <span>{article.number}</span>
      </div>
      <div className="card-art" aria-hidden="true">
        <span className="art-ring" />
        <span className="art-dot" />
        <span className="art-line" />
      </div>
      <div className="card-copy">
        <p><time dateTime={isoDate(article.date)}>{article.date}</time> · {article.readTime}</p>
        <h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
      </div>
      <Link className="card-link" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>
        Read {article.series ? "guide" : "article"} <ArrowUpRight size={18} />
      </Link>
    </article>
  );
}
