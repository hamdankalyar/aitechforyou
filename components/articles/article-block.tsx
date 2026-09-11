import type { ArticleBlock as Block } from "@/lib/articles";
import { snapshots } from "@/lib/git-snapshots";
import { SnapshotTimeline } from "./snapshot-timeline";
import { KnowledgeCheck } from "./knowledge-check";
import { CommandBlock } from "./command-block";

export function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "timeline": return <SnapshotTimeline />;
    case "quiz": return <KnowledgeCheck {...block} />;
    case "command": return <CommandBlock {...block} />;
    case "callout": return <div className="learning-callout"><span className="learning-kicker">{block.title}</span><p>{block.text}</p></div>;
    case "recap": return <ol className="learning-recap">{block.items.map((item, i) => <li key={item}><span aria-hidden="true">0{i + 1}</span><p>{item}</p></li>)}</ol>;
    case "figure": return <figure className="snapshot-figure"><div className="snapshot-figure-grid">{snapshots.map(snapshot => <div className="snapshot-paper" key={snapshot.id}><div><strong>{snapshot.id}</strong><span>Saved moment</span></div><h3>{snapshot.message}</h3><ul>{snapshot.books.map(book => <li key={book}>{book}</li>)}</ul></div>)}</div><figcaption>{block.caption}</figcaption></figure>;
  }
}
