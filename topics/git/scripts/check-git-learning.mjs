// Run against a local server: node topics/git/scripts/check-git-learning.mjs [base URL]
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3001";
async function page(path) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response.text();
}
const hub = await page("/learn/git");
assert.match(hub, /Git Reference/);
assert.match(hub, /Git Config/);
assert.doesNotMatch(hub, /Planned/);
assert.doesNotMatch(hub, /Available now|You’re here/);
assert.match(hub, /href="\/learn\/git\?view=guides"/);
assert.match(hub, /Getting started lessons/);
assert.doesNotMatch(hub, /8 lessons available/);
const guidesHub = await page("/learn/git?view=guides");
assert.match(guidesHub, /<h1>Git Guides<\/h1>/);
assert.match(guidesHub, /href="\/articles\/git-config-identity-and-overrides"/);
for (const path of ["what-git-remembers", "install", "stage-a-file", "first-commit", "commit-again", "read-history"]) assert.match(hub, new RegExp(`href="/learn/git/${path}"`));
for (const [query, expected] of [
  ["set email", "/learn/git/configure"],
  ["GIT CONFIG", "/learn/git/configure"],
  ["config append", "/learn/git/configure"],
  ["config fixed value", "/learn/git/configure"],
  ["wrong project email", "/articles/git-config-identity-and-overrides"],
  ["git init", "/learn/git/init"],
  ["install git", "/learn/git/install"],
  ["stage file", "/learn/git/stage-a-file"],
  ["first commit", "/learn/git/first-commit"],
  ["read history", "/learn/git/read-history"],
  ["save vs commit", "/articles/git-is-a-time-machine"],
  ["empty diff", "/articles/git-status-diff-and-log"],
  ["merge conflict", "/learn/git/conflicts"],
  ["git fetch", "/learn/git/remotes"],
  ["stop tracking", "/learn/git/ignore"],
  ["rename branch", "/learn/git/branch"],
  ["unfindable-xyz", undefined],
]) {
  const html = await page(`/learn/git?q=${encodeURIComponent(query)}`);
  const links = [...html.matchAll(/class="git-result" href="([^"]+)"/g)].map(match => match[1]);
  assert.equal(links[0], expected, query);
  if (!expected) assert.match(html, /No published page matches/);
}
const lesson = await page("/learn/git/configure");
assert.match(lesson, /<h1>Git Config<\/h1>/);
assert.doesNotMatch(lesson, /Before you start|You’re done when|Next lesson/);
for (const id of ["check-identity", "set-identity", "project-override", "default-branch", "inspect-settings", "unset", "multiple-values", "remove-section", "temporary-override", "scopes"]) {
  assert.match(lesson, new RegExp(`id="${id}"`));
  assert.match(lesson, new RegExp(`href="#${id}"`));
}
assert.match(lesson, /href="\/articles\/git-config-identity-and-overrides"/);
assert.match(lesson, /<code>git config get --global user.name\ngit config get --global user.email<\/code>/);
assert.match(lesson, /aria-current="page"/);
assert.match(lesson, /href="\/learn\/git\/init"/);
const initLesson = await page("/learn/git/init");
assert.match(initLesson, /<code>cd ~\nmkdir git-practice\ncd git-practice<\/code>/);
assert.match(initLesson, /git init --initial-branch=main/);
assert.match(initLesson, /No commits yet/);
assert.match(initLesson, /href="\/learn\/git\/configure"/);
assert.match(initLesson, /href="\/articles\/from-edited-file-to-first-commit"/);
assert.match(initLesson, /href="\/learn\/git\/stage-a-file"/);
for (const [path, expectedText, nextPath] of [
  ["/learn/git/what-git-remembers", "Saving today does not erase yesterday", "/learn/git/install"],
  ["/learn/git/install", "git --version", "/learn/git/configure"],
  ["/learn/git/stage-a-file", "A  reading-list.md", "/learn/git/first-commit"],
  ["/learn/git/first-commit", "Start the reading list", "/learn/git/commit-again"],
  ["/learn/git/commit-again", "Add The Hobbit", "/learn/git/read-history"],
  ["/learn/git/read-history", "git diff HEAD~1 HEAD", "/learn/git"],
]) {
  const html = await page(path);
  assert.match(html, new RegExp(expectedText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, new RegExp(`href="${nextPath}"`));
  assert.match(html, /aria-current="page"/);
  assert.equal((html.match(/<small>You’re here<\/small>/g) ?? []).length, 2, `${path} desktop and mobile outlines`);
  assert.doesNotMatch(html, /Available now/);
}
const commitGuide = await page("/articles/from-edited-file-to-first-commit");
assert.match(commitGuide, /id="try-the-commit"/);
assert.match(commitGuide, /Read the example without interacting/);
assert.match(commitGuide, /href="\/learn\/git\/init"/);
assert.match(commitGuide, /href="\/articles\/git-is-a-time-machine"/);
assert.match(commitGuide, /href="\/articles\/git-status-diff-and-log"/);
const inspectionGuide = await page("/articles/git-status-diff-and-log");
assert.match(inspectionGuide, /id="try-the-inspector"/);
assert.match(inspectionGuide, /Git inspection practice example/);
assert.match(inspectionGuide, /Read the example without interacting/);
assert.match(inspectionGuide, /href="\/articles\/from-edited-file-to-first-commit"/);
assert.match(inspectionGuide, /href="\/articles\/git-config-identity-and-overrides"/);
assert.match(inspectionGuide, /href="\/learn\/git\/inspect"/);
assert.match(inspectionGuide, /Need the commands\?/);
for (const slug of ["commit-again", "read-history"]) assert.match(await page(`/learn/git/${slug}`), /href="\/articles\/git-status-diff-and-log"/);
const firstGuide = await page("/articles/git-is-a-time-machine");
assert.match(firstGuide, /href="\/articles\/from-edited-file-to-first-commit"/);
const guide = await page("/articles/git-config-identity-and-overrides");
assert.match(guide, /href="\/learn\/git\/configure"/);
assert.match(guide, /id="follow-the-value"/);
assert.match(guide, /Need the commands\?/);
assert.match(guide, /Git Config reference/);
assert.doesNotMatch(guide, /Prefer a short lesson\?/);
for (const group of ["Setup &amp; configuration", "Recording changes", "Branches &amp; merging", "Remotes"]) assert.match(hub, new RegExp(`<h2 id="group-\\d+">${group}</h2>`));
for (const [slug, title, id, guide] of [
  ["commit", "Git Add &amp; Commit", "amend", "from-edited-file-to-first-commit"],
  ["inspect", "Git Status, Diff &amp; Log", "diff", "git-status-diff-and-log"],
  ["ignore", "Git Ignore", "stop-tracking", "teach-git-what-to-ignore"],
  ["branch", "Git Branch", "delete", "branches-are-labels-that-move"],
  ["merge", "Git Merge", "ff-only", "how-git-brings-two-branches-together"],
  ["conflicts", "Merge Conflicts", "abort", "a-conflict-is-a-question-you-can-answer"],
  ["remotes", "Git Remote &amp; Fetch", "fetch", "your-branch-their-branch-and-origin-main"],
]) {
  assert.match(hub, new RegExp(`class="git-result" href="/learn/git/${slug}"`));
  const reference = await page(`/learn/git/${slug}`);
  assert.match(reference, new RegExp(`<h1>${title}</h1>`));
  assert.match(reference, new RegExp(`id="${id}"`));
  assert.match(reference, new RegExp(`href="#${id}"`));
  assert.match(reference, new RegExp(`href="/articles/${guide}"`));
  assert.match(reference, /aria-current="page"/);
  assert.match(reference, /Git \/ Reference/);
  assert.doesNotMatch(reference, /Before you start|You’re done when|Next lesson|TODO/);
  const guideHtml = await page(`/articles/${guide}`);
  if (guide !== "from-edited-file-to-first-commit") { assert.match(guideHtml, new RegExp(`href="/learn/git/${slug}"`)); assert.match(guideHtml, /Need the commands\?/); }
}
const sitemap = await page("/sitemap.xml");
for (const slug of ["commit", "inspect", "ignore", "branch", "merge", "conflicts", "remotes"]) assert.match(sitemap, new RegExp(`/learn/git/${slug}<`));
assert.match(sitemap, /\/learn\/git\/configure/);
assert.match(sitemap, /\/learn\/git\/init/);
assert.match(sitemap, /\/learn\/git\/read-history/);
assert.match(sitemap, /\/articles\/git-status-diff-and-log/);
assert.equal((await fetch(new URL("/learn/git/not-a-lesson", base))).status, 404);
console.log("Git learning checks passed: command references, existing lessons, search, navigation, guides, anchors, and sitemap.");
