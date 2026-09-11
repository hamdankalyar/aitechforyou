import Link from "next/link";
import { gitLessons } from "@/lib/git-learning";

export function GitLessonOutline({ current }: { current?: string }) {
  return <nav className="git-outline" aria-label="Git lesson outline">
    <div className="git-label">Learn Git</div>
    <h2>A little at a time.</h2>
    <p>Short lessons, in learning order. Start anywhere, or follow the complete path.</p>
    <ol>{gitLessons.map((lesson, index) => <li key={lesson.title}>
      <Link href={lesson.href} aria-current={current === lesson.href ? "page" : undefined}><span className="git-step">{String(index + 1).padStart(2, "0")}</span><span>{lesson.title}{current === lesson.href && <small>You’re here</small>}</span></Link>
    </li>)}</ol>
  </nav>;
}
