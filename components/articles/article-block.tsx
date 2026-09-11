import type { ArticleBlock as Block } from "@/lib/articles";
import { VariablesPlayground } from "@/topics/javascript/components/variables-playground";
import { CodeRunner } from "@/topics/javascript/components/code-runner";
import { snapshots } from "@/topics/git/content/git-snapshots";
import { SnapshotTimeline } from "@/topics/git/components/snapshot-timeline";
import { KnowledgeCheck } from "@/components/articles/knowledge-check";
import { CommandBlock } from "@/components/articles/command-block";
import { ConfigPlayground } from "@/topics/git/components/config-playground";
import { CommitPlayground } from "@/topics/git/components/commit-playground";
import { InspectionPlayground } from "@/topics/git/components/inspection-playground";

// Renders **term** as <strong>. Only bold is supported on purpose.
export function Emphasis({ text }: { text: string }) {
  return <>{text.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)}</>;
}

export function ArticleBlock({ block, runnableCode = false }: { block: Block; runnableCode?: boolean }) {
  switch (block.type) {
    case "variables-playground": return <VariablesPlayground />;
    case "timeline": return <SnapshotTimeline />;
    case "save-commit-comparison": return <figure className="save-commit-comparison"><div><article><span className="learning-kicker">Your editor</span><h3>Save</h3><p>Updates the file on your computer.</p><strong>Current file changes</strong></article><article><span className="learning-kicker">Git</span><h3>Commit</h3><p>Records a chosen project version in its history.</p><strong>A saved moment appears</strong></article></div><figcaption>Saving answers “What is in my file now?” Committing answers “Which version should Git remember?”</figcaption></figure>;
    case "config-playground": return <ConfigPlayground />;
    case "commit-playground": return <CommitPlayground />;
    case "inspection-playground": return <InspectionPlayground />;
    case "bullets": return <ul className="learning-bullets">{block.items.map(item => <li key={item.label}><strong><span aria-hidden="true">•</span>{item.label}</strong><p>{item.text}</p></li>)}</ul>;
    case "table": return <div className="learning-table" role="region" aria-label={block.caption} tabIndex={0}><table><caption>{block.caption}</caption><thead><tr>{block.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
    case "details": return <details className="learning-details"><summary>{block.title}</summary><ul className="guide-points compact">{block.paragraphs.map(paragraph => <li key={paragraph}><Emphasis text={paragraph} /></li>)}</ul>{block.code && (runnableCode ? <CodeRunner code={block.code} /> : <pre tabIndex={0} aria-label="Code example"><code>{block.code}</code></pre>)}{block.commands?.map(command => <CommandBlock {...command} key={command.command} />)}</details>;
    case "quiz": return <KnowledgeCheck {...block} />;
    case "command": return <CommandBlock {...block} />;
    case "callout": return <div className="learning-callout"><span className="learning-kicker">{block.title}</span><p>{block.text}</p></div>;
    case "recap": return <ol className="learning-recap">{block.items.map((item, i) => <li key={item}><span aria-hidden="true">0{i + 1}</span><p>{item}</p></li>)}</ol>;
    case "figure": return <figure className="snapshot-figure"><div className="snapshot-figure-grid">{snapshots.map(snapshot => <div className="snapshot-paper" key={snapshot.id}><div><strong>{snapshot.id}</strong><span>Saved moment</span></div><h3>{snapshot.message}</h3><ul>{snapshot.books.map(book => <li key={book}>{book}</li>)}</ul></div>)}</div><figcaption>{block.caption}</figcaption></figure>;
  }
}
