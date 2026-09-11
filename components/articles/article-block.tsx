import type { ArticleBlock as Block } from "@/lib/articles";
import { snapshots } from "@/lib/git-snapshots";
import { SnapshotTimeline } from "./snapshot-timeline";
import { KnowledgeCheck } from "./knowledge-check";
import { CommandBlock } from "./command-block";
import { ConfigPlayground } from "./config-playground";
import { CommitPlayground } from "./commit-playground";
import { InspectionPlayground } from "./inspection-playground";

export function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "timeline": return <SnapshotTimeline />;
    case "save-commit-comparison": return <figure className="save-commit-comparison"><div><article><span className="learning-kicker">Your editor</span><h3>Save</h3><p>Updates the file on your computer.</p><strong>Current file changes</strong></article><article><span className="learning-kicker">Git</span><h3>Commit</h3><p>Records a chosen project version in its history.</p><strong>A saved moment appears</strong></article></div><figcaption>Saving answers “What is in my file now?” Committing answers “Which version should Git remember?”</figcaption></figure>;
    case "config-playground": return <ConfigPlayground />;
    case "commit-playground": return <CommitPlayground />;
    case "inspection-playground": return <InspectionPlayground />;
    case "table": return <div className="learning-table" role="region" aria-label={block.caption} tabIndex={0}><table><caption>{block.caption}</caption><thead><tr>{block.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
    case "details": return <details className="learning-details"><summary>{block.title}</summary>{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{block.code && <pre tabIndex={0} aria-label="Configuration file example"><code>{block.code}</code></pre>}{block.commands?.map(command => <CommandBlock {...command} key={command.command} />)}</details>;
    case "quiz": return <KnowledgeCheck {...block} />;
    case "command": return <CommandBlock {...block} />;
    case "callout": return <div className="learning-callout"><span className="learning-kicker">{block.title}</span><p>{block.text}</p></div>;
    case "recap": return <ol className="learning-recap">{block.items.map((item, i) => <li key={item}><span aria-hidden="true">0{i + 1}</span><p>{item}</p></li>)}</ol>;
    case "figure": return <figure className="snapshot-figure"><div className="snapshot-figure-grid">{snapshots.map(snapshot => <div className="snapshot-paper" key={snapshot.id}><div><strong>{snapshot.id}</strong><span>Saved moment</span></div><h3>{snapshot.message}</h3><ul>{snapshot.books.map(book => <li key={book}>{book}</li>)}</ul></div>)}</div><figcaption>{block.caption}</figcaption></figure>;
  }
}
