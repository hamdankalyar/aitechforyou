// Run against a local server: node scripts/check-git-learning.mjs [base URL]
import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3001";
async function page(path) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response.text();
}
const hub = await page("/learn/git");
assert.match(hub, /Set your Git name and email/);
assert.doesNotMatch(hub, /Planned/);
assert.doesNotMatch(hub, /Available now|You’re here|aria-current="page"/);
assert.match(hub, /8 lessons available/);
for (const path of ["what-git-remembers", "install", "stage-a-file", "first-commit", "commit-again", "read-history"]) assert.match(hub, new RegExp(`href="/learn/git/${path}"`));
for (const [query, expected] of [
  ["set email", "/learn/git/configure"],
  ["GIT CONFIG", "/learn/git/configure"],
  ["wrong project email", "/articles/git-config-identity-and-overrides"],
  ["git init", "/learn/git/init"],
  ["install git", "/learn/git/install"],
  ["stage file", "/learn/git/stage-a-file"],
  ["first commit", "/learn/git/first-commit"],
  ["read history", "/learn/git/read-history"],
  ["save vs commit", "/articles/git-is-a-time-machine"],
  ["unfindable-xyz", undefined],
]) {
  const html = await page(`/learn/git?q=${encodeURIComponent(query)}`);
  const links = [...html.matchAll(/class="git-result" href="([^"]+)"/g)].map(match => match[1]);
  assert.equal(links[0], expected, query);
  if (!expected) assert.match(html, /No published page matches/);
}
const lesson = await page("/learn/git/configure");
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
const firstGuide = await page("/articles/git-is-a-time-machine");
assert.match(firstGuide, /href="\/articles\/from-edited-file-to-first-commit"/);
const guide = await page("/articles/git-config-identity-and-overrides");
assert.match(guide, /href="\/learn\/git\/configure"/);
assert.match(guide, /id="follow-the-value"/);
const sitemap = await page("/sitemap.xml");
assert.match(sitemap, /\/learn\/git\/configure/);
assert.match(sitemap, /\/learn\/git\/init/);
assert.match(sitemap, /\/learn\/git\/read-history/);
assert.equal((await fetch(new URL("/learn/git/not-a-lesson", base))).status, 404);
console.log("Git learning checks passed: eight lessons, search, navigation, guides, outline, and sitemap.");
