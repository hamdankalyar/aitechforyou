import Link from "next/link";
import { pythonArticles } from "../content/python-articles";
import "../python-learning.css";

export function PythonOutline({ parentSlug, currentSlug }: { parentSlug?: string; currentSlug?: string }) {
  const children = pythonArticles.filter(note => note.topic === "Python" && note.parentSlug === parentSlug);
  if (!children.length) return null;

  return (
    <ol className="python-outline">
      {children.map(note => (
        <li key={note.slug}>
          <Link href={`/articles/${note.slug}`} aria-current={note.slug === currentSlug ? "page" : undefined}>{note.title}</Link>
          <PythonOutline parentSlug={note.slug} currentSlug={currentSlug} />
        </li>
      ))}
    </ol>
  );
}
