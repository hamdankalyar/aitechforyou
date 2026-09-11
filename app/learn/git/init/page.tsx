import type { Metadata } from "next";
import Link from "next/link";
import { CommandBlock } from "@/components/articles/command-block";
import { GitLessonOutline } from "@/components/git-lesson-outline";
import { ArrowRight } from "@/components/icons";
import { gitInitLesson, gitSetupLesson } from "@/lib/git-learning";
import "../../../articles/article-learning.css";
import "../git-learning.css";

export const metadata: Metadata = { title: gitInitLesson.title, description: "Create an empty Git repository in a practice folder, understand what git init does, and check the result with git status." };

export default function GitInitLesson() {
  return <main id="main" className="git-learning git-lesson learning-article shell">
    <Link className="git-back" href="/learn/git">← Git lessons & guides</Link>
    <div className="git-lesson-grid">
      <aside className="git-lesson-sidebar"><div className="git-desktop-outline"><GitLessonOutline current={gitInitLesson.href} /></div><details className="git-mobile-outline"><summary>Lesson outline</summary><GitLessonOutline current={gitInitLesson.href} /></details></aside>
      <article className="git-lesson-content">
        <header><div className="git-label">Learn Git · Short lesson</div><h1>{gitInitLesson.title}</h1><p className="git-lesson-outcome">Give a practice project a place to keep its Git history.</p><div className="git-lesson-meta">3 min read <span>+ a few minutes to try it</span></div></header>
        <section className="git-prerequisite" aria-labelledby="before-heading"><h2 id="before-heading">Before you start</h2><p>Use the terminal on macOS or Linux, or Git Bash on Windows, with Git installed. Follow the <Link href={gitSetupLesson.href}>name and email lesson</Link> first if you haven’t set those yet.</p><p>Run each command one line at a time, pressing Enter after each line.</p></section>
        <section id="make-a-folder"><h2><span>01</span> Make a practice folder</h2><p>A <strong>repository</strong>, or <strong>repo</strong>, is where Git stores a project’s recorded history. We’ll create one inside a new folder for practice.</p><CommandBlock command={'cd ~\nmkdir git-practice\ncd git-practice'} explanation="Go to your home folder, create git-practice, then move into it. If that name already exists, choose an unused name in both of the last two lines." /><p><code>mkdir</code> makes a folder. <code>cd</code> changes the folder your terminal is working in. The <code>~</code> stands for your home folder.</p></section>
        <section id="initialize-git"><h2><span>02</span> Set up Git here</h2><CommandBlock command="git init --initial-branch=main" explanation="Initialize Git inside your new practice folder." output="Initialized empty Git repository in /Users/maya/git-practice/.git/" /><p>Your path will differ. Git creates a hidden <code>.git</code> folder to hold this project’s history and settings. You can leave its contents to Git.</p><p><code>--initial-branch=main</code> names the starting branch <code>main</code>. A branch is a named line of work; for now, we’ll use just this one.</p><p>This prepares a repository on your computer. It does not record a version of your files or upload anything to GitHub.</p></section>
        <section id="check-repository"><h2><span>03</span> Ask Git what it sees</h2><CommandBlock command="git status" explanation="Check the repository from inside git-practice." output={'On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files and use "git add" to track)'} /><p><strong>No commits yet</strong> means no version has been recorded. A commit is a recorded version of your project. The last line is expected: this new folder has no project files yet. We’ll use the suggested <code>git add</code> command in the next lesson.</p><p>If Git says <strong>not a git repository</strong>, check that you moved into your practice folder and ran <code>git init</code> there.</p></section>
        <section className="git-completion"><div className="git-label">You’re done when</div><h2>Git recognizes your empty project.</h2><p>You see <strong>On branch main</strong> and <strong>No commits yet</strong>. Keep the practice folder for the next lesson.</p></section>
        <aside className="git-deeper"><span className="git-label">Optional · Go deeper</span><h2>When does Git record a version?</h2><p>Explore the difference between saving a file and recording a moment in its history.</p><Link href="/articles/git-is-a-time-machine">Read the snapshots guide <ArrowRight size={18} /></Link></aside>
        <p>Command reference: <a href="https://git-scm.com/docs/git-init">git init</a> · <a href="https://git-scm.com/docs/git-status">git status</a></p>
        <footer className="git-lesson-next"><Link href={gitSetupLesson.href}>← Previous: Set your name and email</Link><div className="git-label">Next lesson · Planned</div><h2>Check and stage a file</h2><p>We’ll add a file to this project and choose it for the first recorded version. This lesson is still being written.</p><Link href="/learn/git">Back to available lessons & guides <ArrowRight size={18} /></Link></footer>
      </article>
    </div>
  </main>;
}
