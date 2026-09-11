# Git notes → interactive articles

Planning date: September 11, 2026. Status: all eight foundation lessons are complete and committed at `1adf1b7`. Guides 01–11 (snapshots, first commit, inspection, configuration, ignore rules, branches, merging, conflicts, remotes, push/pull, fork and pull request) are implemented; guides 05–10 are committed at `c39fb92`, `1f405a0`, `c34391a`, `43f453f`, `584d78c`, and `ff2dbe6`. Part II is complete. **The next detailed guide is “Put unfinished work on a shelf.”**

## Current delivery plan: lessons and guides together

The short lessons provide a quick route to a specific outcome. The detailed **Git, made visible** guides remain the main series: full explanations, interactive examples, common mistakes, and deeper reasoning. The short-lesson pilot does not replace the guide roadmap below.

Work by topic, with links between the two formats. One guide can support several small lessons; there is no need to duplicate every page or finish the whole short course before returning to guides.

| Next | Delivery | Purpose |
| --- | --- | --- |
| Complete | Detailed guide: From edited file to first commit | Introduces working files, staging, and recorded versions one at a time. Readers edit, stage, edit again, and commit to see exactly which contents are recorded. |
| Complete | All eight short foundation lessons | A continuous practice path from the basic idea and setup through two commits and history. |
| Complete | Detailed guide: Read what Git is telling you | Status, three diff comparisons, patch reading, and log; an interactive example checked against real Git. |
| Complete | Detailed guide: Teach Git what to ignore | Ignore rules, pattern matching with reasons, negation limits, and untracking an already tracked file. |
| Complete | Detailed guide: Branches are labels that move | Create, switch, rename, and delete branches; locate HEAD; watch only one label advance. |
| Complete | Detailed guide: How Git brings two branches together | Fast-forward versus a merge of diverged histories, with the same sci-fi branch joined under both conditions. |
| Complete | Detailed guide: A conflict is a question you can answer | Read conflict markers, choose or edit the final text, stage it, and finish or abort the merge. |
| Complete | Detailed guide: Your branch, their branch, and origin/main | Local branches, remote-tracking references, and server branches; what fetch changes and what it leaves alone. |
| Complete | Detailed guide: Push, pull, and the upstream connection | Publish a branch to a shared bare repository, set upstream, and understand what pull does and when it refuses. |
| Complete | Detailed guide: From fork to pull request | Fork, clone, branch, push to the fork, and open a pull request against the original repository. |
| Next | Detailed guide: Put unfinished work on a shelf | Stash apply versus pop, older stashes, untracked files, and a conflicting pop that keeps its entry. |

Continue the detailed roadmap, skipping the configuration guide already completed, and add short companion lessons where they serve a separate practical need. The next request to “move next” should begin the stash guide (12) unless the user names another topic or format. Then continue Part III with undo and reflog.

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
| 02 | From edited file to first commit | Create a repository, handle the minimum identity setup when needed, stage chosen contents, and commit the intended version | Edit → stage → edit again → commit; compare working file, staging area, and saved snapshot |
| 03 | Read what Git is telling you | Use status, diff, and log for different questions | Switch between working/index/HEAD comparisons; connect each view to the matching command |
| 04 | Set up Git so it knows who you are | Set identity and explain which configuration scope wins | Edit global and local identity cards; see the effective value and its source |
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

**Promise:** “By the end, you can explain why saving a file today does not change a version Git recorded yesterday.”

**Source material:** Repository/Commit, Repository/Status, introductory Internals/Storing Data and Trees and Blobs, plus the site's existing article.

**One example project:** a small reading-list project with a `reading-list.md` file. Reuse this project across later articles so readers spend their attention on Git, not a new fictional codebase each time.

| Reading beat | Content | Visual or action |
| --- | --- | --- |
| 1. The familiar problem | “Your file worked yesterday. Today it doesn't. Which version do you want back?” | Introduce one reading-list file without requiring terminal or Git knowledge |
| 2. Saving and recording differ | Contrast an editor save with a Git commit, then introduce “snapshot” as the contents of a recorded moment | Two plain-language cards: current file changes versus a saved moment appears |
| 3. Visit saved moments | Show the reading list as it was at A, B, and C | Select A, B, or C to inspect that past version beside the current file |
| 4. Your current edit is separate | Add Piranesi to the current file while keeping A, B, and C fixed | Add/remove Piranesi and inspect all three recorded moments |
| 5. Make a prediction | Ask where Piranesi exists after saving but before another commit | Answer choices reveal a short explanation; no scoring requirement |
| 6. Take the model forward | Recap Save, Commit, and unchanged past versions | Point to the first practical commit lesson as the next article |

**Scope boundary:** one timeline with three recorded moments, a current-file panel, one file edit, one question, and reset. Do not introduce staging, hashes, parent links, branches, `main`, `HEAD`, diffs, or terminal commands in this article.

**Article 01 is done when:** the writing stands alone, the example proves recorded moments do not mutate when the current file changes, all controls work with keyboard and touch, the written fallback conveys the same lesson, and the desktop/mobile light/dark layouts have been inspected. Type checking and a production build pass after implementation; the exercise's relevant state transitions are verified.

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
- [x] Build and commit the detailed configuration article: `9a030c5`.
- [x] Revise article 01 around one beginner learning outcome after editorial review.
- [x] Complete “From edited file to first commit” as guide 02; committed at `14a75cc`.
- [x] Complete the eight-lesson foundation path; committed at `1adf1b7`.
- [x] Complete “Read what Git is telling you” as guide 03.
- [x] Complete “Teach Git what to ignore” as guide 05; guide 04 was already published.
- [x] Complete “Branches are labels that move” as guide 06.
- [x] Complete “How Git brings two branches together” as guide 07.
- [x] Complete “A conflict is a question you can answer” as guide 08.
- [x] Complete “Your branch, their branch, and origin/main” as guide 09.
- [x] Complete “Push, pull, and the upstream connection” as guide 10.
- [x] Complete “From fork to pull request” as guide 11.
- [ ] Proceed to “Put unfinished work on a shelf” as guide 12.

### Fork guide delivery — September 12, 2026

- URL: `/articles/from-fork-to-pull-request`; guide 11 closes Part II and points at the stash guide as in preparation.
- The hosting service is a folder with two account folders: `sam/reading-list.git` is the original and `maya/reading-list.git` the fork, created with `git clone --bare`, which is what the Fork button does. Covers the four places a change passes through, `origin` versus `upstream`, `remote add` and `fetch upstream`, branching per change, `push -u` to the fork, what the pull request page shows (`upstream/main..branch` and the three-dot diff), the request as a pointer rather than a copy, the maintainer’s merge done by hand with `FETCH_HEAD` and the service’s message, syncing laptop and fork with `fetch upstream`, `merge --ff-only`, and `push`, deleting the branch locally and remotely, and the refused-push message as an illustration only. Pull request creation itself is described as a service step, since Git has no command for it.
- Interactive example: an eleven-step storyboard with Back, Next, and Start over showing the original, the fork, the laptop, and the pull request, with new, moved, and removed labels marked at each step. The transcript lists every step.
- `node topics/git/scripts/check-git-fork.mjs` executes the storyboard against three real repositories under Git 2.50.1 and compares every label map and the checked-out branch at each step, then runs the article’s walkthrough as one shell session.

### Push and pull guide delivery — September 12, 2026

- URL: `/articles/push-pull-and-the-upstream-connection`; guide 10 follows the remotes guide and points at the fork guide as in preparation.
- Introduces the shared bare repository by showing why a push into a checked-out branch is refused. The project starts locally with `git init` and `git remote add`, so the no-upstream refusal is real; cloning an empty server would have pre-set the upstream. Covers `-u`/`--set-upstream`, `branch -vv`, clone setting the upstream, `push.default` simple and `push.autoSetupRemote` as optional detail, the rejected non-fast-forward push (nothing sent, nothing fetched), pull as fetch plus one of three answers, the divergent-branches refusal after the fetch step has already run, `--ff-only`, `--no-rebase`, `pull.ff only`, and a rebase pointer for later. Force-push is deferred to guide 24 as the plan requires.
- Interactive example: server, your repository with upstream state, Sam’s pushes, your commit, push with and without `-u`, and pull under three modes, with Git’s real outputs and the status line. The transcript covers every outcome.
- `node topics/git/scripts/check-git-push.mjs` replays four action sequences against a bare server, your laptop, and Sam’s clone under Git 2.50.1 (push and pull outputs, histories of main, origin/main, and the server, upstream presence, file, both status forms), then runs the article’s walkthrough as one shell session.

### Remotes guide delivery — September 12, 2026

- URL: `/articles/your-branch-their-branch-and-origin-main`; guide 09 follows the conflict guide and points at the push/pull guide as in preparation.
- The remote is Sam’s ordinary repository folder on the same disk, so the whole guide runs without a network and without push; the shared bare server is introduced with push in guide 10. Covers clone, `origin` as a nickname, `origin/main` as a remote-tracking record, `remote -v`, `branch --all`, `origin/HEAD`, stale “up to date”, `fetch` and its one-line-per-label output, looking before acting (`log main..origin/main`, `show origin/main:file`), merging `origin/main` as a fast-forward, the ahead/behind/diverged status sentences and their short form, a diverged merge, and the `git fetch main` mistake from the source notes.
- Interactive example: Sam’s history and yours side by side with `main`, `origin/main`, and Sam’s `main` labels; Sam commits, fetch, merge, and your own commit, with Git’s outputs and both status forms. The transcript covers every outcome.
- `node topics/git/scripts/check-git-remotes.mjs` replays six action sequences against two real repositories under Git 2.50.1 (histories of all three labels, your file, fetch and merge outputs, short and long status), then runs the article’s walkthrough as one shell session so `cd` between the repositories carries over, requiring documented outputs to match.

### Conflict guide delivery — September 12, 2026

- URL: `/articles/a-conflict-is-a-question-you-can-answer`; guide 08 follows the merge guide and points at the remotes guide as in preparation.
- Covers why same-place changes conflict while distant ones merge, base/ours/theirs, reading the three markers, `UU` and “both modified”, abort versus finish, `git add` as the resolution signal, `git merge --continue` and the editor, `git diff --check`, the index stages `:1:`/`:2:`/`:3:`, `git log --merge`, `git restore --ours/--theirs`, the refusal when finishing before staging, committed markers as a mistake Git does not catch, and the zdiff3 style as optional detail.
- Interactive example: base, ours, and theirs panels beside the conflicted file with per-line notes; five answers including leaving the markers in; check, stage, finish, abort, and reset, with the refusal when finishing early. The transcript covers every outcome.
- `node topics/git/scripts/check-git-conflict.mjs` checks all five answers finished and aborted against Git 2.50.1 (conflict output, file, status codes, `diff --check` output and exit, early `--continue` refusal, abort restoring D, merge commit parents and recorded file), then replays every command block in the article through the shell in order, requiring documented outputs to match and undocumented ones to be silent.

### Merge guide delivery — September 11, 2026

- URL: `/articles/how-git-brings-two-branches-together`; guide 07 follows the branches guide and points at the conflict guide as in preparation.
- Covers the fork-point question, fast-forward versus merge commit, what a merge commit’s snapshot and two parents hold, the merged label never moving, `--ff-only` refusal, `--no-edit`, `Auto-merging` and the `ort` strategy line, `--parents`, `--no-ff`, and deleting merged branches with `-d`. The example changes different lines on each branch on purpose; same-line conflicts are deferred to guide 08.
- Interactive example: choose whether main moved after the fork and which of three merge commands to run; the graph shows parents per commit, HEAD, and labels; delete before and after a merge shows Git’s refusal and success. The transcript covers every outcome.
- `node topics/git/scripts/check-git-merge.mjs` checks all six situation × command combinations against Git 2.50.1 (merge output, first-parent history, file, parent count, unmoved `sci-fi`, delete refusal and success), then runs every command block from the article through the shell in order and requires each documented output to end the real output.

### Branches guide delivery — September 11, 2026

- URL: `/articles/branches-are-labels-that-move`; guide 06 follows the ignore guide and points at the merge guide as in preparation.
- Covers branch-as-label, HEAD, which label moves on commit, forked history and parent direction, switching rewriting the working file and refusing to overwrite edits, `git branch`/`switch`/`switch -c`, `log --graph --all`, rename, `-d` refusal rules, and `-D`.
- Interactive example: create `sci-fi`, switch, commit on either branch (two example books each), with a two-lane graph, HEAD outline, labels, working-file panel, last command, and reset. The transcript covers every outcome including committing without switching.
- `node topics/git/scripts/check-git-branches.mjs` replays four action sequences against Git 2.50.1: per-branch history and file contents, branch list, HEAD, and working file after every step, plus `-d` and current-branch refusals, dirty-switch refusal, rename, and `-D`.

### Ignore guide delivery — September 11, 2026

- URL: `/articles/teach-git-what-to-ignore`; guide 05 follows the configuration guide and points at the branches guide as in preparation.
- Covers the tracked/untracked/ignored model, last-match and negation rules, name-anywhere versus anchored patterns, the excluded-folder limit on `!`, `git check-ignore -v`, `git rm --cached` with the history caveat, `notes/*` versus `notes/`, and the three ignore-file locations.
- Interactive example: five toggleable rules against seven paths (two tracked), a reason per path, a simulated `git status --short --ignored`, and a stop-tracking action for `.env`. The written transcript covers every outcome.
- `node topics/git/scripts/check-git-ignore.mjs` verifies all 32 rule combinations before and after untracking `.env` against Git 2.50.1: `check-ignore -v` line, pattern, and path for every example path, plus status output, history retention, and the `notes/*` fix.
- Type checking, production build, and browser checks passed: rule toggles, stop-tracking and its disabled state, reset, series previous/next links, hub search for “gitignore”, no page overflow at phone width.

### Inspection guide delivery — September 11, 2026

- URL: `/articles/git-status-diff-and-log`; guide 03 connects the first-commit and configuration guides.
- Covers normal and compact status, staged/unstaged modifications, three diff endpoints, patch notation, log/show, two-commit comparisons, untracked files, and misleading empty net comparisons.
- Reuses the reading-list example with Dune committed, The Hobbit staged, and Piranesi unstaged. Readers choose a comparison, stage or commit, and reset. The written explanation remains available without interaction.
- `node topics/git/scripts/check-git-inspection.mjs` verifies all reachable simulation states and both action orders against Git 2.50.1, plus history inspection and the cancellation/untracked examples.
- Type checking, production build, route/search/sitemap checks passed. Browser checks covered keyboard radio selection, both action orders, disabled states, reset, desktop dark mode and phone light mode with no page overflow.
- Added reciprocal links from the change-again and history lessons. Next new guide: ignore rules and already tracked files.

### Article 01 delivery — September 11, 2026

- URL: `/articles/git-is-a-time-machine` (existing URL retained).
- Refocused the prose on the difference between saving the current file and deliberately recording a commit. Staging, hashes, parent links, branches, `main`, `HEAD`, diffs, and terminal commands are deferred to the articles that teach them.
- The selectable A/B/C timeline now presents chronological direction and two explicit panels: “Past version” and “Your file now.” Adding or removing Piranesi changes only the current-file panel.
- Added a plain-language Save/Commit comparison, an applied knowledge check, accessible radio controls, reset, a written fallback, official references, and a clearly marked next article in preparation.
- Kept article prose server-rendered and existing plain-text articles compatible. The original article shell and first interaction were committed at `ef23192`; the beginner-focused revision followed the author's editorial review.
- Verified the revision in light and dark themes at phone and desktop widths with no horizontal overflow. A/B/C selection, keyboard navigation, current-file editing, reset, and quiz feedback work; type checking and the production build pass.

### Detailed configuration article delivery — September 11, 2026

- URL: `/articles/git-config-identity-and-overrides`.
- Covers all seven configuration notes: identity, key/value syntax, get/set, scopes, unset, duplicate values, and section removal. Worktree configuration and temporary overrides are optional detail.
- Interactive global/local name and email fields show independent winning values and their origins. Per-key overrides can be enabled or removed, empty values are explained, and reset restores the initial mixed-scope example.
- Added reusable table and expandable-detail blocks. The article is placed fourth in the beginner series so readers first understand snapshots, make a commit, and learn the three local states. Its next topic is clearly marked as in preparation rather than linked to an empty page.
- Browser checks covered edits behind an active override, fallback after removing an override, separate name/email scope choices, keyboard toggles, empty values, reset, quiz feedback, both themes, narrow-phone layouts, no-JavaScript content, print explanations, and previous/next navigation.
- Executed the setup and inspection examples with isolated configuration files and a disposable repository under Git 2.50.1. Verified global/local lookup, origin/scope output, default branch naming, unset, blank values, temporary command overrides, duplicate-key handling, and section removal without changing the author's settings.
- Type checking and production build passed. The configuration article and remaining site changes were committed at `9a030c5` on September 11. “From edited file to first commit” is the next planned delivery.
