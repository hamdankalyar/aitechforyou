export const ignoreRules = [
  { pattern: "*.log", note: "Any name ending in .log, in any folder." },
  { pattern: "!important.log", note: "Keep this one even though *.log matched." },
  { pattern: "notes/", note: "The notes folder and everything inside it." },
  { pattern: "!notes/keep.md", note: "Try to keep one file inside notes." },
  { pattern: ".env", note: "The secrets file." },
];
export const ignorePaths = ["debug.log", "logs/build.log", "important.log", "notes/draft.md", "notes/keep.md", ".env", "reading-list.md"];
export const initiallyTracked = [".env", "reading-list.md"];

export type IgnoreResult = { path: string; tracked: boolean; ignored: boolean; line: number; reason: string };

// ponytail: supports the pattern forms this example uses (*, trailing /, inner /, !). Add ** and ? if a later guide needs them.
function matches(pattern: string, target: string, targetIsDir: boolean) {
  let body = pattern.replace(/^!/, "");
  const dirOnly = body.endsWith("/");
  body = body.replace(/\/$/, "");
  if (dirOnly && !targetIsDir) return false;
  if (body.includes("/")) return target === body.replace(/^\//, "");
  const regex = new RegExp(`^${body.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, "[^/]*")}$`);
  return regex.test(target.slice(target.lastIndexOf("/") + 1));
}

function lastMatch(target: string, isDir: boolean, rules: string[]) {
  let found = 0;
  rules.forEach((rule, index) => { if (matches(rule, target, isDir)) found = index + 1; });
  return found;
}

export function explainIgnore(path: string, tracked: boolean, rules: string[]): IgnoreResult {
  if (tracked) return { path, tracked, ignored: false, line: 0, reason: "Already tracked. Ignore rules never apply to a tracked file; stop tracking it first." };
  const segments = path.split("/");
  for (let depth = 1; depth < segments.length; depth++) {
    const folder = segments.slice(0, depth).join("/");
    const line = lastMatch(folder, true, rules);
    if (line && !rules[line - 1].startsWith("!")) return { path, tracked, ignored: true, line, reason: `Its folder ${folder}/ is excluded by ${rules[line - 1]} on line ${line}. Git never looks inside an excluded folder, so no later ! rule can bring this file back.` };
  }
  const line = lastMatch(path, false, rules);
  if (!line) return { path, tracked, ignored: false, line: 0, reason: "No rule matches. Git lists it as untracked." };
  const rule = rules[line - 1];
  if (rule.startsWith("!")) return { path, tracked, ignored: false, line, reason: `${rule} on line ${line} is the last match, so it is re-included and listed as untracked.` };
  return { path, tracked, ignored: true, line, reason: `Matched by ${rule} on line ${line}. It stays off the status list.` };
}

export function simulateStatus(results: IgnoreResult[]) {
  const untracked = results.filter(result => !result.tracked && !result.ignored).map(result => `?? ${result.path}`);
  const ignored = results.filter(result => result.ignored).map(result => `!! ${result.path}`);
  return [...untracked.sort(), ...ignored.sort()].map(line => line + "\n").join("");
}
