import type { Metadata } from "next";
import Link from "next/link";
import { CommandBlock } from "@/components/articles/command-block";
import { GitLessonOutline } from "@/components/git-lesson-outline";
import { ArrowRight } from "@/components/icons";
import { gitConfigGuide, gitInitLesson, gitSetupLesson } from "@/lib/git-learning";
import { gitInstallLesson } from "@/lib/git-short-lessons";
import "../../../articles/article-learning.css";
import "../git-learning.css";

export const metadata: Metadata = { title: gitSetupLesson.title, description: "A short Git setup lesson: set your default name and email, read them back, and know when you are done." };

export default function GitConfigureLesson() {
  return <main id="main" className="git-learning git-lesson learning-article shell">
    <Link className="git-back" href="/learn/git">← Git lessons & guides</Link>
    <div className="git-lesson-grid">
      <aside className="git-lesson-sidebar"><div className="git-desktop-outline"><GitLessonOutline current={gitSetupLesson.href} /></div><details className="git-mobile-outline"><summary>Lesson outline</summary><GitLessonOutline current={gitSetupLesson.href} /></details></aside>
      <article className="git-lesson-content">
        <header><div className="git-label">Learn Git · Short lesson</div><h1>{gitSetupLesson.title}</h1><p className="git-lesson-outcome">Tell Git which name and email to attach to the work you record.</p><div className="git-lesson-meta">3 min read <span>+ a few minutes to try it</span></div></header>
        <section className="git-prerequisite" aria-labelledby="before-heading"><h2 id="before-heading">Before you start</h2><p>Open your terminal: the app where you type commands. Use Git 2.50 or newer for the commands below. No project is needed yet.</p><CommandBlock command="git --version" explanation="Check your installed version." /><p>If Git is missing or older, <a href="https://git-scm.com/install/">install or update Git</a>, then reopen your terminal.</p></section>
        <section id="set-identity"><h2><span>01</span> Give Git your details</h2><p>A <strong>commit</strong> is a recorded version of your project. Git includes a name and email with each new commit. These details identify your work; they do not sign you into GitHub.</p><p>Replace Maya’s example details with your own. Keep the quotation marks, and run each line by pressing Enter.</p><CommandBlock command={'git config set --global user.name "Maya Chen"\ngit config set --global user.email "maya@example.com"'} explanation="Save your default name and email. It is normal for these commands to print nothing." /><p><code>--global</code> means these are your defaults for Git projects on this computer. Running the same command with a different value updates that default.</p></section>
        <section id="check-identity"><h2><span>02</span> Read them back</h2><CommandBlock command={'git config get --global user.name\ngit config get --global user.email'} explanation="Ask Git to show the two defaults you just saved." output={'Maya Chen\nmaya@example.com'} /><p>You should see <strong>your</strong> name and email instead of Maya’s. If either is wrong or blank, run its <code>set</code> command again, then check it with <code>get</code>.</p></section>
        <section className="git-completion"><div className="git-label">You’re done when</div><h2>Both details match yours.</h2><p>Your defaults are saved. Changing them affects future commits; it does not change old ones. An existing project may have its own settings that override these defaults.</p></section>
        <aside className="git-deeper"><span className="git-label">Optional · Go deeper</span><h2>One laptop. Different project emails?</h2><p>Explore how defaults and project settings work together, and find out which value Git is using.</p><Link href={gitConfigGuide}>Read the configuration guide <ArrowRight size={18} /></Link></aside>
        <footer className="git-lesson-next"><Link href={gitInstallLesson.href}>← Previous: {gitInstallLesson.title}</Link><div className="git-label">Next lesson</div><h2>{gitInitLesson.title}</h2><p>Make a practice folder and get it ready to record your work.</p><Link href={gitInitLesson.href}>Create your repository <ArrowRight size={18} /></Link></footer>
      </article>
    </div>
  </main>;
}
