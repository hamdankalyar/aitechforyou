import type { Metadata } from "next";
import Link from "next/link";
import { CommandBlock } from "@/components/articles/command-block";
import { GitNavigation, GitReferenceOutline } from "@/components/git-navigation";
import { gitConfigReference, gitConfigReferenceSections } from "@/lib/git-config-reference";
import { gitConfigGuide } from "@/lib/git-learning";
import "../../../articles/article-learning.css";
import "../git-learning.css";

export const metadata: Metadata = { title: "Git Config — command reference", description: gitConfigReference.description };

export default function GitConfigReferencePage() {
  const contents = <nav aria-label="On this page"><ul>{gitConfigReferenceSections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}<li><a href="#scopes">Scopes & configuration files</a></li></ul></nav>;

  return <main id="main" className="git-learning git-reference learning-article shell">
    <GitNavigation current="reference" />
    <div className="git-reference-grid">
      <aside className="git-reference-sidebar"><GitReferenceOutline current={gitConfigReference.href} /></aside>
      <article className="git-reference-content">
        <header className="git-reference-header">
          <div className="git-label">Git / Reference</div>
          <h1>Git Config</h1>
          <p>Read, write, and remove Git settings. Keys use the form <code>section.key</code>, such as <code>user.email</code>.</p>
          <p className="git-reference-version">Examples use Git 2.50+. Check with <code>git --version</code>. <a href="https://git-scm.com/install/">Update Git</a> if needed.</p>
        </header>
        <details className="git-reference-mobile-contents"><summary>On this page</summary>{contents}</details>
        {gitConfigReferenceSections.map(section => <section key={section.id} id={section.id}>
          <h2><a href={`#${section.id}`}>{section.heading}</a></h2>
          {section.description && <p>{section.description}</p>}
          {section.commands.map(command => <CommandBlock key={command.command} {...command} />)}
          {section.note && <p className="git-reference-note">{section.note}</p>}
        </section>)}
        <section id="scopes">
          <h2><a href="#scopes">Scopes & configuration files</a></h2>
          <p>Reads combine available scopes. Writes default to local. Specify <code>--global</code> or <code>--local</code> to make the destination explicit.</p>
          <div className="git-reference-table" role="region" aria-label="Configuration scopes" tabIndex={0}><table>
            <caption>Increasing priority for ordinary single-value settings</caption>
            <thead><tr><th scope="col">Scope</th><th scope="col">Applies to</th><th scope="col">Typical location</th></tr></thead>
            <tbody>
              <tr><th scope="row">System</th><td>All users</td><td><code>etc/gitconfig</code> under Git’s installation prefix</td></tr>
              <tr><th scope="row">Global</th><td>Your repositories</td><td><code>~/.gitconfig</code> and <code>$XDG_CONFIG_HOME/git/config</code> (defaults to <code>~/.config/git/config</code>)</td></tr>
              <tr><th scope="row">Local</th><td>One repository</td><td><code>$GIT_DIR/config</code>, usually <code>.git/config</code></td></tr>
              <tr><th scope="row">Worktree</th><td>One worktree</td><td><code>$GIT_DIR/config.worktree</code>, when enabled</td></tr>
              <tr><th scope="row">Command</th><td>One invocation</td><td><code>git -c key=value …</code>; no file</td></tr>
            </tbody>
          </table></div>
          <p className="git-reference-note">Worktree scope requires <code>extensions.worktreeConfig</code>; otherwise <code>--worktree</code> acts like <code>--local</code>. Includes and linked worktrees can change file locations. Use <code>--show-origin</code> to find the actual source.</p>
          <p>Section and variable names are case-insensitive; subsection names are case-sensitive. Multi-valued settings may collect entries across scopes. Author and committer environment variables can also override commit identity.</p>
        </section>
        <aside className="git-reference-guide"><div className="git-label">Understand the concept</div><h2>Why does one setting override another?</h2><p>Follow global defaults and project exceptions through a visual example.</p><Link href={gitConfigGuide}>Read the configuration guide →</Link></aside>
        <footer className="git-reference-footer"><a href="https://git-scm.com/docs/git-config">Official git config documentation ↗</a><Link href="/learn/git/init">Create a repository →</Link></footer>
      </article>
      <aside className="git-reference-toc"><div className="git-label">On this page</div>{contents}</aside>
    </div>
  </main>;
}
