import Link from "next/link";
import type { ReactNode } from "react";
import { ActiveSection } from "@/components/articles/active-section";
import { CommandBlock } from "@/components/articles/command-block";
import { GitNavigation, GitReferenceOutline } from "@/topics/git/components/git-navigation";
import { nextGitReference, type GitReference } from "@/topics/git/content/git-references";
import { JsonLd, breadcrumbSchema, lessonSchema } from "@/lib/seo";
import "../../../app/articles/article-learning.css";
import "@/topics/git/git-learning.css";

export const referenceTitle = (reference: GitReference) => `${reference.title} — command reference`;

export function GitReferencePage({ reference, intro, extraContents = [], children }: { reference: GitReference; intro?: ReactNode; extraContents?: { id: string; heading: string }[]; children?: ReactNode }) {
  const links = [...reference.sections.map(section => ({ id: section.id, heading: section.heading })), ...extraContents];
  const contents = <nav aria-label="On this page"><ul>{links.map(link => <li key={link.id}><a href={`#${link.id}`}>{link.heading}</a></li>)}</ul></nav>;
  const next = nextGitReference(reference);

  return <main id="main" className="git-learning git-reference learning-article shell">
    <JsonLd data={lessonSchema({ title: referenceTitle(reference), description: reference.description, path: reference.href })} />
    <JsonLd data={breadcrumbSchema([{ name: "Learn Git", path: "/learn/git" }, { name: reference.title, path: reference.href }])} />
    <GitNavigation current="reference" />
    <div className="git-reference-grid">
      <aside className="git-reference-sidebar"><GitReferenceOutline current={reference.href} /></aside>
      <article className="git-reference-content">
        <header className="git-reference-header">
          <div className="git-label">Git / Reference</div>
          <h1>{reference.title}</h1>
          <p>{intro ?? reference.intro}</p>
          <p className="git-reference-version">Examples use Git 2.50+. Check with <code>git --version</code>. <a href="https://git-scm.com/install/">Update Git</a> if needed.</p>
        </header>
        <details className="git-reference-mobile-contents"><summary>On this page</summary>{contents}</details>
        {reference.sections.map(section => <section key={section.id} id={section.id}>
          <h2><a href={`#${section.id}`}>{section.heading}</a></h2>
          {section.description && <p>{section.description}</p>}
          {section.commands.map(({ status: _status, ...command }) => <CommandBlock key={command.command} {...command} />)}
          {section.note && <p className="git-reference-note">{section.note}</p>}
        </section>)}
        {children}
        <aside className="git-reference-guide"><div className="git-label">Understand the concept</div><h2>{reference.guide.title}</h2><p>{reference.guide.text}</p><Link href={reference.guide.href}>{reference.guide.label}</Link></aside>
        <footer className="git-reference-footer"><span>{reference.docs.map((doc, index) => <span key={doc.href}>{index > 0 && " · "}<a href={doc.href}>Official {doc.label} documentation ↗</a></span>)}</span>{next && <Link href={next.href}>{next.label}</Link>}</footer>
      </article>
      <aside className="git-reference-toc"><div className="git-label">On this page</div>{contents}</aside>
      <ActiveSection links='nav[aria-label="On this page"] a' />
    </div>
  </main>;
}
