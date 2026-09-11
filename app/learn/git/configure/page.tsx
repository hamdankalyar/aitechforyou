import type { Metadata } from "next";
import { GitReferencePage, referenceTitle } from "@/topics/git/components/git-reference-page";
import { gitConfigReferenceEntry } from "@/topics/git/content/git-references";

export const metadata: Metadata = { title: referenceTitle(gitConfigReferenceEntry), description: gitConfigReferenceEntry.description, alternates: { canonical: gitConfigReferenceEntry.href } };

export default function GitConfigReferencePage() {
  return <GitReferencePage reference={gitConfigReferenceEntry} intro={<>Read, write, and remove Git settings. Keys use the form <code>section.key</code>, such as <code>user.email</code>.</>} extraContents={[{ id: "scopes", heading: "Scopes & configuration files" }]}>
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
  </GitReferencePage>;
}
