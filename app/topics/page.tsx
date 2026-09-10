import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { articles, topics } from "@/lib/articles";

export const metadata: Metadata = { title: "Topics", description: "Explore technology lessons by topic." };

export default function TopicsPage() {
  return (
    <main id="main" className="page-main shell">
      <div className="page-hero">
        <span className="eyebrow"><span /> Choose your rabbit hole</span>
        <h1>Learn by topic.</h1>
        <p>Start with what interests you. Follow the questions until the picture becomes clear.</p>
      </div>
      <div className="topics-list">
        {topics.map((topic) => (
          <Link className={`topic-row ${topic.className}`} href={`/articles?topic=${topic.name}`} key={topic.name}>
            <span>{topic.index}</span>
            <h2>{topic.name}</h2>
            <p>{topic.description}</p>
            <small>{articles.filter((article) => article.topic === topic.name).length} articles</small>
            <ArrowRight size={28} />
          </Link>
        ))}
      </div>
    </main>
  );
}
