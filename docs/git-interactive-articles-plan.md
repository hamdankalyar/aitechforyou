# Git notes → interactive articles

Planning date: September 11, 2026. Status: articles 01 and 02 implemented and approved for commit. Article 03 has not started.

## 1. The direction

Turn these notes into a coherent, illustrated Git series for AI Tech For You: warm editorial pages where readers can change a small example and see why Git behaves as it does.

Working series title: **Git, made visible.**

Assumed audience: a beginner who can edit a file and is learning to use a terminal, with optional deeper explanations for working developers. Keep the author's conversational, question-led voice. Expand shorthand into clear explanations, retain useful real scenarios, and remove export clutter and conversational filler.

Build and review one article at a time. The proposed 24-article sequence is a roadmap, not a requirement to implement the whole series now. Start with article 01, settle the reading experience, then proceed in order unless the author chooses a different topic.

## 2. What was reviewed

- Source: `/Users/hamdan/Downloads/git`.
- Read all 88 HTML pages, including nested topics, examples, Q&A, and exported inline comments. Extracted text totals approximately 8,250 words, including titles and navigation labels.
- Inspected all three images: branching, squashing, and configuration precedence.
- Reviewed the site's article data, article renderer, topic navigation, layout, and styles.
- Checked selected correctness issues against official Git documentation. This is an editorial audit, not yet an execution test of every command.

The export has 20 topic families plus its root index. Many pages contain fewer than 100 words; several are only indexes. They should become sections, examples, or optional detail inside a complete article. Publishing 88 separate pages would fragment the learning experience.

### Complete source-family coverage

Counts include each family's parent page and all descendants. Numbers refer to the article roadmap below. An individual note can inform more than one article.

| Source family | Pages | Planned destination |
| --- | ---: | --- |
| Root Git index | 1 | Series navigation |
| Repository | 5 | 01, 03, 04; amend material in 17 |
| Config | 7 | 02; worktree detail in 21 |
| Gitignore | 3 | 05 |
| Branching | 8 | 06, 09, 10; replacement scenarios in 24 |
| Git Merge | 3 | 07 |
| Conflicts | 10 | 08, 14, 15, 16 |
| Git Remote | 6 | 09, 10 |
| Github | 5 | 10, 11; deletion scenario in 24 |
| Fork | 1 | 11 |
| Git Stash | 5 | 12 |
| Reset | 4 | 13, 24 |
| Revert | 2 | 13; move its nested diff note to 04 |
| Git Reflog | 3 | 06, 14, 24 |
| Rebase | 2 | 15 |
| Squashing | 2 | 17 |
| git cherry-pick | 1 | 18 |
| Tag | 2 | 19 |
| Bisect | 3 | 20 |
| Git Worktree | 6 | 21 |
| Internals | 9 | Introductory model in 01; full explanations in 22–23 |
| **Total** | **88** | **All source families accounted for** |

### Editorial findings

The strongest material is the repeated question “what actually happens?” The local/remote branch Q&A, stepwise rebase explanations, blob deduplication experiment, and worktree-versus-branch distinction already provide good interactive storyboards.

The missing connective material is a beginner's start: creating or cloning a repository, a full edit–stage–commit cycle, the difference between working files and staged contents, and undoing the right thing. Add these as clearly authored bridge material. Introduce `git restore` and default mixed reset alongside the existing reset notes.

Move internals later in the sequence. Introduce just enough snapshots and pointers early to make commands understandable. Move detached HEAD out of the general conflict category. Consolidate repeated merge/rebase comparisons. Move `git diff` out of Revert into inspection. Rename “Stagging” and “why we use workflows” to their intended subjects.

The source screenshots establish a useful sketch-like visual voice. Recreate their information as responsive, selectable diagrams with text equivalents. Do not use screenshots as the only explanation. Distinguish the order commits were created from the direction of their parent references.

## 3. The reading experience

### Visual direction

Keep the existing brand: warm paper, dark ink, coral for Git, and the current Outfit/Work Sans font pairing. Use the large expressive type for titles, then a quieter article body. The design-skill search supported spacious layouts and clear type hierarchy; its generic landing-page structure and alternative pink palette are not a fit for this existing publication.

- Main text around 65–72 characters wide, 18–19px on desktop and 17–18px on mobile, with generous line spacing.
- Short paragraphs, descriptive subheadings, and comfortable pauses around diagrams.
- A compact series label, title, one-sentence promise, and estimated reading time at the top. Show optional practice time separately.
- A sticky section list on desktop and a compact expandable contents list on mobile. Anchor targets must clear the existing sticky header.
- Diagrams may extend wider than the prose when helpful; their mobile version becomes a vertical sequence.
- Use coral, blue, and lime consistently inside diagrams, alongside labels and shapes. Color alone never communicates branch identity, selection, or success.
- Command blocks distinguish the command from its output. Copy copies only the command and gives visible feedback.
- Gentle motion explains a state transition when the reader acts. No looping decorations or scroll-controlled lessons. Reduced-motion mode changes states immediately.
- Finish with a small recap and the actual next available article in the series. Preserve the existing light/dark theme behavior.

### A repeatable article rhythm

1. **A real question:** open with a recognizable problem, such as “I staged a file, edited it again, and committed. Which version did Git save?”
2. **The idea in plain language:** explain the model before introducing flags.
3. **A diagram:** label the starting state and the relevant parts.
4. **Try one thing:** a focused interactive example that answers the opening question.
5. **Read the result:** a short explanation of what changed and why, placed beside or beneath the result.
6. **Use it for real:** a small reproducible command sequence with expected output.
7. **A common mistake:** a specific counterexample, with an optional deeper explanation.
8. **Check understanding:** one or two prediction questions with useful explanations for every answer.
9. **Take it with you:** a compact command reference, a three-point recap, and the next article.

Aim for roughly 6–10 minutes of reading in most articles. Larger subjects can use optional detail sections; split an article only when it needs two independent learning goals. Essential explanations must remain readable without completing a quiz or using the interactive example.

### Interaction rules

Every example has an obvious initial state, one clear task, visible state labels, and a “Start over” control. Step-based examples also have Back and Next. Use a small deterministic browser simulation, labeled “Practice example”; it does not operate on the reader's computer or GitHub account.

Buttons and keyboard controls are sufficient for every task. If dragging is later added, retain button equivalents. File comparisons use addition/removal markers as well as colors. Explain disabled actions. Announce meaningful results accessibly without reading the entire diagram after every click.

Every interactive example also has a static diagram and written explanation, so the article works with JavaScript unavailable, in print, and for assistive technology. Keep all essential prose in the initial page HTML.

## 4. Topic-by-topic roadmap

Each row is one article delivery. The main path runs in this order; individual articles link to the prerequisites named in their opening.

### Part I — Understand your local repository

| # | Working title | Reader can… | Main interactive example |
| --- | --- | --- | --- |
| 01 | Git is a time machine, not a save button | Explain a snapshot, a commit, and the difference between past history and current files | Select moments in a project timeline and inspect the file snapshot saved at each moment |
| 02 | Set up Git so it knows who you are | Set identity and explain which configuration scope wins | Edit global and local identity cards; see the effective value and its source |
| 03 | From edited file to first commit | Create a repository, stage chosen contents, and commit the intended version | Edit → stage → edit again → commit; compare working file, staging area, and saved snapshot |
| 04 | Read what Git is telling you | Use status, diff, and log for different questions | Switch between working/index/HEAD comparisons; connect each view to the matching command |
| 05 | Teach Git what to ignore | Predict ignore patterns and recognize an already tracked file | Change a small rule list and see which example paths match, with a reason per result |

### Part II — Branch and collaborate

| # | Working title | Reader can… | Main interactive example |
| --- | --- | --- | --- |
| 06 | Branches are labels that move | Create, switch, rename, and delete branches; locate HEAD | Create a branch and commit on it; watch only its label advance; switch between saved file states |
| 07 | How Git brings two branches together | Distinguish fast-forward and a merge of diverged histories | Toggle whether main has advanced, merge the same feature, and compare the resulting graph |
| 08 | A conflict is a question you can answer | Read conflict markers, resolve a file, stage it, and finish or abort a merge | Compare base/current/incoming text and choose or edit the final version |
| 09 | Your branch, their branch, and origin/main | Distinguish local branches, remote-tracking references, and server branches | Advance a simulated teammate's branch, then fetch; show which local labels and files change |
| 10 | Push, pull, and the upstream connection | Publish a branch, set upstream, and understand explicit pull targets | Connect laptop and server states; try push with/without upstream and choose explicit pull modes |
| 11 | From fork to pull request | Distinguish fork, clone, branch, and PR in a contribution workflow | Follow a change from upstream repository to fork, local clone, feature branch, and PR target |

### Part III — Pause, undo, and recover

| # | Working title | Reader can… | Main interactive example |
| --- | --- | --- | --- |
| 12 | Put unfinished work on a shelf | Choose stash apply or pop, identify an older stash, and handle a conflict | Save two named stashes, apply one, then compare successful and conflicting pop outcomes |
| 13 | Undo the right thing | Choose restore, soft/mixed/hard reset, or revert based on what needs undoing | Run each action from the same saved scenario; compare HEAD, index, files, and history |
| 14 | Lost a commit? Follow the reflog | Recognize detached HEAD and preserve a reachable commit with a branch | Leave a detached commit, locate its reflog entry, inspect it, and attach a recovery branch |

### Part IV — Shape history deliberately

| # | Working title | Reader can… | Main interactive example |
| --- | --- | --- | --- |
| 15 | Rebase: replay your work on a new starting point | Explain replayed commits and choose merge or rebase for a scenario | Replay two commits one step at a time, then compare against merging the same starting graph |
| 16 | When a rebase stops halfway | Resolve and continue/abort a rebase; interpret ours/theirs in context | Pause at a conflicting replay, label both versions, resolve it, and resume; rerere as optional detail |
| 17 | Turn messy commits into a readable story | Amend the latest commit and squash a short private sequence | Choose pick/reword/squash in a small todo list and inspect the new history and combined changes |
| 18 | Take one change with cherry-pick | Apply a selected commit's change and understand dependencies | Choose a fix from another branch, replay it, and compare an independent fix with a dependent change |

### Part V — Use Git on real projects

| # | Working title | Reader can… | Main interactive example |
| --- | --- | --- | --- |
| 19 | Give a release a name | Distinguish branches, lightweight/annotated tags, and version numbers | Tag a commit, add more commits, then choose a version bump for a stated change |
| 20 | Find the commit that broke it | Run manual bisect and understand automated tests and skip results | Mark selected revisions good/bad/skip and watch the candidate range shrink |
| 21 | Work on two branches at once | Distinguish branch from worktree; add, list, and remove linked worktrees | Open two folders over one shared repository; show separate HEAD/index states and branch occupancy |

### Part VI — Look underneath and connect the ideas

| # | Working title | Reader can… | Main interactive example |
| --- | --- | --- | --- |
| 22 | Open a commit and see what's inside | Navigate commit → tree → blob and explain snapshot reuse | Expand an object explorer; compare two commits sharing an unchanged file's blob |
| 23 | Why a tiny change creates a different hash | Explain object identity, commit metadata, references, and loose versus packed storage | Change one object input at a time and see identity changes; rename identical file contents to show blob reuse |
| 24 | Git rescue recipes, with the consequences visible | Combine the series to handle common mistakes and deliberate branch replacement | Choose a scenario such as wrong branch, deleted branch, or divergent local/remote; inspect before/after states |

### Prerequisite notes

- 03 builds the three-state model used by 04, 12, and 13.
- 06 supplies branch/HEAD knowledge for 07–10 and 14–18.
- 07 and 08 precede rebase; 09–11 explain why rewriting shared history affects others.
- 13–14 precede history rewriting so readers already know how to preserve and recover work.
- 22–23 deepen the introductory snapshot model after the reader has practical context.
- 24 is a reference article and capstone, not a place to hide missing explanations from earlier lessons.

## 5. Accuracy work before article publication

### Corrections already checked against official documentation

| Source issue | Editorial correction |
| --- | --- |
| The nested diff note describes plain diff as everything uncommitted versus the last commit | Teach plain `git diff` as working tree versus index; `--staged` as index versus HEAD; `git diff HEAD` as working tree versus HEAD. [Git diff](https://git-scm.com/docs/git-diff) |
| Reset notes describe removing commits and deleting all changes too broadly | For commit-form reset, show branch/HEAD movement and the separate index/working-tree effects. Soft preserves index and files; mixed resets index; hard resets both. Hard can overwrite obstructing untracked paths; it is not a general removal of every untracked file. Treat committed-history recovery separately from discarded uncommitted work. [Git reset](https://git-scm.com/docs/git-reset) |
| Stash descriptions promise a clean directory and unconditional removal on pop | Explain untracked/ignored inclusion options, and that a conflicting pop retains its stash entry. [Git stash](https://git-scm.com/docs/git-stash) |
| Upstream notes promise argument-free push to a differently named upstream | State push configuration assumptions. Default simple mode checks matching branch names when pushing back to the pull remote; upstream and push destination are related but not identical concepts. Automatic upstream setup is configurable. [Git push](https://git-scm.com/docs/git-push) |
| Ignore notes imply matching files cannot be tracked or pushed | Already tracked files are unaffected by ignore rules. Explain nested scope and the limits of negation beneath excluded directories. [Git ignore](https://git-scm.com/docs/gitignore) |
| Config notes say unset removes one duplicate automatically | Multiple matching values can make unset fail; teach value selection or all-values removal. Explain case sensitivity of subsection names separately from section/key names. [Git config](https://git-scm.com/docs/git-config) |

### Additional checks scheduled with the relevant article

- Fix copied command spacing, one-dash flags where two are intended, curly quotes in shell examples, export artifacts, and the likely remote/branch mix-up in `git fetch development`.
- Replace personal contact details in reusable commands with clear sample identity values.
- Verify all configuration commands against a stated supported Git version; the notes mix newer subcommands and older forms. Include a small compatibility note where needed.
- Merge: avoid implying every merge creates a commit, or that every merge commit must have exactly two parents. Teach the common two-parent case first.
- Branch deletion: check merged-into-upstream behavior rather than saying `-d` only checks the current branch.
- Status: distinguish modified, staged, untracked, and clean; a tracked file can have both staged and unstaged edits.
- Reflog: explain local records, expiration, and object retention. Do not promise indefinite recovery or recovery of work never stored by Git.
- Rebase: verify patch-equivalent/skipped and empty-commit behavior; label ours as the rebased-so-far side, not merely “main.” Include abort and the consequences of skip.
- Worktrees: explain the default branch occupancy protection, per-worktree state, shared data, and when worktree-specific configuration is enabled.
- Internals: verify SHA-1 versus SHA-256, object headers in hashing, root/merge parent counts, annotated tag objects, packed objects, and packed/alternative ref storage. Avoid presenting loose-file layout as universal.
- Tags/SemVer: explain annotated versus lightweight tags, explicit tag publication, public API compatibility, and the special meaning of pre-1.0 versions.
- Bisect: add the skipped-test exit status and prerequisites for interpreting a regression boundary.
- Branch replacement: move force-push recipes into article 24; explain preserving a reference, checking remote state, shared-history consequences, and the limits of lease protection before the command.
- Rebuild the blob deduplication experiment in a uniquely created temporary repository; replace its fixed `/tmp/gitdemo` setup and recursive cleanup with a narrowly scoped exercise.

Use official Git manuals, the Git book, GitHub documentation for hosting workflows, and the Semantic Versioning specification as the publication references. Record the Git version used when validating each executable example.

## 6. Fit with the existing website

### Current foundation

The site has four articles, including two Git articles. Article data lives in `lib/articles.ts`; its section shape currently supports headings, paragraphs, and optional code. `app/articles/[slug]/page.tsx` renders that prose, metadata, and a generic next-reading link. The project already has static article parameters, topic filtering, responsive styles, and theme support.

The installed Next.js version is 16.3.4 with React 19.3.0. The bundled guide on Server and Client Components was reviewed for this plan. Re-read any additional relevant local framework guides before implementation.

### Smallest useful implementation path

1. Extend the existing article model with optional structured content blocks and series order. Keep legacy sections working so current articles remain compatible.
2. Add only the blocks required by article 01: prose, figure with caption, the timeline example, and a knowledge check. Add later block types when their first article needs them.
3. Keep prose and article layout server-rendered. Place browser state and event handling inside small client components for each exercise. This follows the installed Next.js guide.
4. Build diagrams with semantic HTML and SVG; maintain a written representation of their state. A full terminal emulator, general Git engine, CMS, account system, and large animation dependency are outside the first article's needs.
5. Evolve the current aside into a useful contents list. Add a small series navigation element with previous/next published articles and clear planned states for unavailable topics.
6. Keep existing article URLs. Expand `git-is-a-time-machine` for 01. Reuse `merge-versus-rebase` for 15's comparison-oriented article, refining its title as needed rather than publishing a duplicate explanation.
7. Derive topic counts, metadata, sitemap entries, and available next links from published article data. Planned topics must not become empty published article pages.
8. Consider a separate MDX authoring change only if writing the first articles shows a concrete need. The first delivery does not require a content-system migration.

Likely touched files during implementation: the article data model, article route, article-related styles, and new narrowly scoped components under `components/articles/`. These are future changes; this planning task adds documentation only.

## 7. First article: concrete storyboard

**Article:** Git is a time machine, not a save button.

**Promise:** “By the end, you can look at a commit and explain what it saved.”

**Source material:** Repository/Commit, Repository/Status, introductory Internals/Storing Data and Trees and Blobs, plus the site's existing article.

**One example project:** a small reading-list project with a `reading-list.md` file. Reuse this project across later articles so readers spend their attention on Git, not a new fictional codebase each time.

| Reading beat | Content | Visual or action |
| --- | --- | --- |
| 1. The familiar problem | “Your file worked yesterday. Today it doesn't. Which version do you want back?” | Three labeled saved moments and a current file preview |
| 2. A commit records a snapshot | Explain that the snapshot includes the project state prepared in staging; a commit also connects to history | Select A, B, or C to inspect the saved file and message |
| 3. A change is visible between snapshots | Show how the reading list evolves | Toggle a comparison of the selected moment with its parent |
| 4. Your current edits are separate | Add a line to the current working-file example while keeping the selected saved snapshot fixed | “Edit current file” updates that panel; the saved snapshot remains unchanged |
| 5. History connects moments | Explain parent links and introduce main as a label; reserve branch operations for 06 | Select a commit to highlight its parent, with explicit arrow legend |
| 6. Make a prediction | “If I edit my file now, does yesterday's commit change?” | Answer choices reveal a short explanation; no scoring requirement |
| 7. Take the model forward | Recap snapshots, parent links, and separate working edits | Link to setup when article 02 is available |

**Scope boundary:** one timeline with three saved snapshots, a current-file panel, one comparison toggle, one question, and reset. Commit IDs can be clearly labeled illustrative identifiers. No branch editor or merge/rebase simulator in this article.

**Article 01 is done when:** the writing stands alone, the example proves saved snapshots do not mutate when working files change, all controls work with keyboard and touch, static content conveys the same lesson, and the desktop/mobile light/dark layouts have been inspected. Type checking and a production build pass after implementation; the exercise's relevant state transitions are verified.

## 8. How we proceed one by one

For each article:

1. Read its mapped notes and resolve that article's correctness questions.
2. Write the complete article and a short interaction storyboard around one learning outcome.
3. Build the article using existing components, adding a reusable component only when needed.
4. Validate runnable Git examples in a disposable repository. Verify the simulator's expected starting, intermediate, and reset states against those examples where applicable.
5. Inspect the page on mobile and desktop, in both themes, using keyboard and reduced motion. Check diagrams, code overflow, captions, anchors, and article navigation.
6. Present the completed article for the author's editorial/design feedback. Incorporate that feedback before taking up the next topic.
7. Update this roadmap with its URL, completed checks, and any deferred optional material.

For the first delivery, the article shell and article 01 are one coherent piece of work. Once that experience feels right, article 02 reuses it. Do not prebuild all 24 interactive examples.

### Current checkpoint

- [x] Read the full notes export and inspect images.
- [x] Map source families into a sequential series.
- [x] Record the visual direction and article pattern.
- [x] Identify correctness fixes and missing bridge material.
- [x] Define the first article and its completion conditions.
- [x] Build article 01 and complete implementation checks.
- [x] Commit article 01 after the author's instruction to proceed: `ef23192`.
- [x] Build article 02 and complete implementation checks; author requested its commit.
- [ ] Proceed to article 03 after article 02 is settled.

### Article 01 delivery — September 11, 2026

- URL: `/articles/git-is-a-time-machine` (existing URL retained).
- Expanded prose, three static snapshot cards, a selectable timeline, parent comparisons, working-file edit/undo, reset, and a knowledge check with explanations for every answer.
- Added article contents navigation, separate command/output blocks with copy feedback, official references, a recap, and a clearly marked next article in preparation.
- Kept article prose server-rendered and existing plain-text articles compatible. Added small client components for the interactive controls without new dependencies.
- Browser checks covered A/B/C selection, current-edit independence, added/removed lines, first-commit comparison, reset, keyboard selection, quiz responses, both themes, and a narrow phone layout. Confirmed server-rendered prose and snapshots remain visible with JavaScript disabled; printed explanations are visible.
- Verified example command outputs and unchanged saved snapshots in a disposable repository using Git 2.50.1 (Apple Git-155).
- Type checking and production build passed. The author requested committing this article and continuing on September 11; checkpoint commit: `ef23192`.

### Article 02 delivery — September 11, 2026

- URL: `/articles/git-config-identity-and-overrides`.
- Covers all seven configuration notes: identity, key/value syntax, get/set, scopes, unset, duplicate values, and section removal. Worktree configuration and temporary overrides are optional detail.
- Interactive global/local name and email fields show independent winning values and their origins. Per-key overrides can be enabled or removed, empty values are explained, and reset restores the initial mixed-scope example.
- Added reusable table and expandable-detail blocks. The first article now links forward to the second, and the second links back. Article 03 is labeled as in preparation rather than linked to an empty page.
- Browser checks covered edits behind an active override, fallback after removing an override, separate name/email scope choices, keyboard toggles, empty values, reset, quiz feedback, both themes, narrow-phone layouts, no-JavaScript content, print explanations, and previous/next navigation.
- Executed the setup and inspection examples with isolated configuration files and a disposable repository under Git 2.50.1. Verified global/local lookup, origin/scope output, default branch naming, unset, blank values, temporary command overrides, duplicate-key handling, and section removal without changing the author's settings.
- Type checking and production build passed. The author requested committing article 02 with the remaining site changes on September 11. Article 03 is the next planned delivery.
