import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommandBlock } from "@/components/articles/command-block";
import { GitLessonOutline } from "@/topics/git/components/git-lesson-outline";
import { ArrowRight } from "@/components/icons";
import { gitLessons } from "@/topics/git/content/git-learning";
import { getShortGitLesson, shortGitLessons } from "@/topics/git/content/git-short-lessons";
import "../../../articles/article-learning.css";
import "@/topics/git/git-learning.css";

export function generateStaticParams() {
  return shortGitLessons.map(lesson => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const lesson = getShortGitLesson((await params).slug);
  return lesson ? { title: lesson.title, description: lesson.description } : {};
}

export default async function ShortGitLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const lesson = getShortGitLesson((await params).slug);
  if (!lesson) notFound();
  const index = gitLessons.findIndex(item => item.href === lesson.href);
  const previous = gitLessons[index - 1];
  const next = gitLessons[index + 1];

  return <main id="main" className="git-learning git-lesson learning-article shell">
    <Link className="git-back" href="/learn/git">← Git lessons & guides</Link>
    <div className="git-lesson-grid">
      <aside className="git-lesson-sidebar"><div className="git-desktop-outline"><GitLessonOutline current={lesson.href} /></div><details className="git-mobile-outline"><summary>Lesson outline</summary><GitLessonOutline current={lesson.href} /></details></aside>
      <article className="git-lesson-content">
        <header><div className="git-label">Learn Git · Short lesson</div><h1>{lesson.title}</h1><p className="git-lesson-outcome">{lesson.outcome}</p><div className="git-lesson-meta">{lesson.time}</div></header>
        <section className="git-prerequisite" aria-labelledby="before-heading"><h2 id="before-heading">Before you start</h2>{lesson.before.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>
        {lesson.sections.map((section, sectionIndex) => <section key={section.heading}>
          <h2><span>{String(sectionIndex + 1).padStart(2, "0")}</span>{section.heading}</h2>
          {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {section.commands?.map(command => <CommandBlock key={command.command} {...command} />)}
          {section.items && <ol className="git-concept-list">{section.items.map(item => <li key={item}>{item}</li>)}</ol>}
        </section>)}
        <section className="git-completion"><div className="git-label">You’re done when</div><h2>{lesson.completion.title}</h2><p>{lesson.completion.text}</p></section>
        {lesson.deeper && <aside className="git-deeper"><span className="git-label">Optional · Go deeper</span><h2>{lesson.deeper.title}</h2><p>{lesson.deeper.text}</p><Link href={lesson.deeper.href}>{lesson.deeper.label} <ArrowRight size={18} /></Link></aside>}
        {lesson.sources && <p className="git-sources">Official downloads: {lesson.sources.map((source, sourceIndex) => <span key={source.href}>{sourceIndex > 0 && " · "}<a href={source.href}>{source.label}</a></span>)}</p>}
        <footer className="git-lesson-next">
          {previous && <Link href={previous.href}>← Previous: {previous.title}</Link>}
          <div className="git-label">{next ? "Next lesson" : "Course complete"}</div>
          <h2>{next?.title ?? "You finished the first Git path."}</h2>
          <p>{next?.description ?? "Return to the Git notebook whenever you need a quick lesson or a deeper guide."}</p>
          <Link href={next?.href ?? "/learn/git"}>{next ? "Continue learning" : "Browse Git lessons and guides"} <ArrowRight size={18} /></Link>
        </footer>
      </article>
    </div>
  </main>;
}
