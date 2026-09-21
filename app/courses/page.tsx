import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { articles, courses } from "@/lib/articles";
import { publishedGitLessons } from "@/topics/git/content/git-learning";

export const metadata: Metadata = { title: "Courses", description: "Explore courses in Git, JavaScript, React Native, and AI, each built from mental models and interactive examples.", alternates: { canonical: "/courses" } };

export default function CoursesPage() {
  return (
    <main id="main" className="page-main shell">
      <div className="page-hero">
        <span className="eyebrow"><span /> Choose your rabbit hole</span>
        <h1>Choose your course.</h1>
        <p>Start with what interests you. Follow the questions until the picture becomes clear.</p>
      </div>
      <div className="topics-list">
        {courses.map((topic) => (
          <Link className={`topic-row ${topic.className}`} href={topic.href} key={topic.name}>
            <span>{topic.index}</span>
            <h2>{topic.name}</h2>
            <p>{topic.description}</p>
            <small>{topic.name === "Git" ? `${publishedGitLessons.length} lessons · ` : ""}{articles.filter((article) => article.topic === topic.name).length} {topic.name === "Git" ? "guides" : "articles"}</small>
            <ArrowRight size={28} />
          </Link>
        ))}
      </div>
    </main>
  );
}
