import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Spark } from "@/components/icons";

export const metadata: Metadata = { title: "About", description: "Why AI Tech For You exists and how each lesson is made.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <main id="main">
      <section className="about-hero">
        <div className="shell">
          <span className="eyebrow"><span /> About this project</span>
          <h1>I&apos;m learning in public.<br /><em>You&apos;re invited.</em></h1>
        </div>
      </section>
      <section className="about-story shell">
        <div className="about-stamp"><Spark size={46} /><span>Stay<br />curious</span></div>
        <div>
          <p className="lead">Technology often feels difficult because the explanation starts in the wrong place.</p>
          <p>AI Tech For You is where I turn my study notes into friendly, visual lessons. I start with the mental model, connect it to something familiar, and only then bring in the technical language.</p>
          <p>I&apos;m not writing from a pedestal. I&apos;m documenting the questions, mistakes, and “aha” moments that happen while learning—and sharing the clearest version with you.</p>
        </div>
      </section>
      <section className="principles">
        <div className="shell">
          <div className="section-heading"><div><span className="section-index">03</span><p>How I explain</p></div></div>
          <div className="principles-grid">
            <div><span>01</span><h2>Start with why</h2><p>Understand the problem before memorizing the tool.</p></div>
            <div><span>02</span><h2>Draw the picture</h2><p>A useful mental model can replace a page of definitions.</p></div>
            <div><span>03</span><h2>Use the thing</h2><p>Real examples make abstract ideas stick.</p></div>
          </div>
        </div>
      </section>
      <section className="about-cta shell">
        <p>Ready to make something click?</p>
        <h2>Pick an idea.<br />Let&apos;s learn it together.</h2>
        <Link className="button primary" href="/articles">Explore all articles <ArrowRight /></Link>
      </section>
    </main>
  );
}
