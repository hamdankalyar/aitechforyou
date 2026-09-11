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
assert.match(hub, /Planned/);
assert.match(hub, /2 lessons available/);
assert.doesNotMatch(hub, /href="\/learn\/git\/(?:install|commit)"/);
for (const [query, expected, count] of [
  ["set email", "/learn/git/configure", 2],
  ["GIT CONFIG", "/learn/git/configure", 2],
  ["wrong project email", "/articles/git-config-identity-and-overrides", 1],
  ["user.email", "/learn/git/configure", 2],
  ["git config get --global user.email", "/learn/git/configure", 2],
  ["git config get --show-origin --show-scope user.email", "/articles/git-config-identity-and-overrides", 1],
  ["save vs commit", "/articles/git-is-a-time-machine", 1],
  ["git init", "/learn/git/init", 2],
  ["create repo", "/learn/git/init", 1],
  ["git status", "/learn/git/init", 1],
  ["unfindable-xyz", undefined, 0],
]) {
  const html = await page(`/learn/git?q=${encodeURIComponent(query)}`);
  const links = [...html.matchAll(/class="git-result" href="([^"]+)"/g)].map(match => match[1]);
  assert.equal(links.length, count, query);
  assert.equal(links[0], expected, query);
  if (!count) assert.match(html, /No published page matches/);
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
assert.match(initLesson, /href="\/articles\/git-is-a-time-machine"/);
const guide = await page("/articles/git-config-identity-and-overrides");
assert.match(guide, /href="\/learn\/git\/configure"/);
assert.match(guide, /id="follow-the-value"/);
const sitemap = await page("/sitemap.xml");
assert.match(sitemap, /\/learn\/git\/configure/);
assert.match(sitemap, /\/learn\/git\/init/);
console.log("Git learning checks passed: search, published routes, reciprocal links, outline, and sitemap.");
