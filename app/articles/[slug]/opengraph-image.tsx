import { ImageResponse } from "next/og";
import { articles, getArticle } from "@/lib/articles";
import { site } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map(article => ({ slug: article.slug }));
}

const accents = { coral: "#ff5b45", blue: "#5b8cff", lime: "#c8f05a", yellow: "#ffd35b" };

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  const accent = article ? accents[article.accent] : "#c8f05a";
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#121212", color: "#f4f0e8", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, color: "#c8c5be" }}>
        <span>aitech<span style={{ color: "#ff5b45" }}>foryou</span>.com</span>
        <span style={{ color: accent, textTransform: "uppercase", letterSpacing: 4 }}>{article?.topic ?? site.name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontSize: article && article.title.length > 40 ? 64 : 80, lineHeight: 1.05, letterSpacing: -2 }}>{article?.title ?? site.name}</div>
        <div style={{ fontSize: 30, color: "#c8c5be", lineHeight: 1.4 }}>{article?.excerpt ?? site.description}</div>
      </div>
      <div style={{ display: "flex", gap: 24, fontSize: 26, color: "#c8c5be" }}>
        {article?.series && <span>{article.series.title}</span>}
        {article && <span>{article.readTime}</span>}
      </div>
    </div>,
    size,
  );
}
