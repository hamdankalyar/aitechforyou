import type { GitLessonSummary } from "./git-short-lessons";

export const gitConfigReference: GitLessonSummary = {
  title: "Git Config",
  href: "/learn/git/configure",
  description: "Read and set configuration, choose a scope, trace overrides, and remove settings.",
  time: "Command reference",
  keywords: "git config user.name user.email global local setup configure configuration set get change name email identity scope origin unset append duplicate remove section init.defaultBranch",
};

export const gitConfigReferenceSections: {
  id: string;
  heading: string;
  description?: string;
  commands: { command: string; explanation: string; output: string }[];
  note?: string;
}[] = [
  {
    id: "check-identity",
    heading: "Check your identity",
    commands: [{ command: "git config get user.name\ngit config get user.email", explanation: "Read the configured name and email. Run inside a repository to include its overrides.", output: "Your Name\nyou@example.com" }],
    note: "A missing key prints nothing and exits with status 1. These settings identify commits; they do not sign you into GitHub.",
  },
  {
    id: "set-identity",
    heading: "Set your name and email",
    description: "Replace these examples with your own details. Global settings are your defaults across repositories.",
    commands: [
      { command: 'git config set --global user.name "Your Name"\ngit config set --global user.email "you@example.com"', explanation: "Set or update your default commit identity.", output: "No output" },
      { command: "git config get --global user.name\ngit config get --global user.email", explanation: "Read back only your global settings.", output: "Your Name\nyou@example.com" },
    ],
    note: "Changes apply to future commits. Existing commits keep their recorded identity.",
  },
  {
    id: "project-override",
    heading: "Use a different email for one project",
    commands: [{ command: 'git config set --local user.email "you@company.example"\ngit config get user.email', explanation: "Run inside the target repository. Set its email, then read the effective value.", output: "you@company.example" }],
    note: "Local settings override global settings per key. A local email can still use a global name. Use user.name the same way to override the name.",
  },
  {
    id: "default-branch",
    heading: "Set the default branch name",
    commands: [{ command: "git config set --global init.defaultBranch main", explanation: "Use main when initializing new repositories.", output: "No output" }],
    note: "This does not rename a branch in an existing repository.",
  },
  {
    id: "inspect-settings",
    heading: "List settings and find their source",
    commands: [
      { command: "git config list --global\ngit config list --local", explanation: "List your defaults, then the current repository’s settings. The local command requires a repository.", output: "user.name=Your Name\nuser.email=you@example.com\ninit.defaultbranch=main\ncore.repositoryformatversion=0\ncore.bare=false\n…\nuser.email=you@company.example" },
      { command: "git config get --show-origin --show-scope user.email", explanation: "Show the effective email with the scope and file that supplied it.", output: "local  file:.git/config  you@company.example" },
      { command: "git config get --all --show-origin --show-scope user.email", explanation: "Show all configured emails, including values hidden by an override.", output: "global  file:/Users/you/.gitconfig  you@example.com\nlocal   file:.git/config              you@company.example" },
    ],
    note: "Configuration can include sensitive values. Review the output before sharing it.",
  },
  {
    id: "unset",
    heading: "Remove a setting",
    commands: [{ command: "git config unset --local user.email\ngit config get user.email", explanation: "Remove the project email, then check the remaining configured value.", output: "you@example.com" }],
    note: "A global email becomes effective again if no higher-priority override remains. An empty string is still a value; use unset to remove it. If the key is missing or has multiple matching values, plain unset exits with an error.",
  },
  {
    id: "multiple-values",
    heading: "Add and remove multiple values",
    description: "Use a practice repository with no existing tutorial.reader entries. This custom key is only for the example; Git does not use it for commit identity.",
    commands: [
      { command: 'git config set --local --append tutorial.reader "Maya"\ngit config set --local --append tutorial.reader "Sam"\ngit config get --local --all tutorial.reader', explanation: "Append two values to the same key and read both.", output: "Maya\nSam" },
      { command: 'git config unset --local --value="Maya" --fixed-value tutorial.reader', explanation: "Remove the exact value Maya, leaving Sam.", output: "No output" },
      { command: "git config unset --local --all tutorial.reader", explanation: "Remove every local value for this key.", output: "No output" },
    ],
    note: "Plain set and unset refuse ambiguous multiple matches. Use --append to add a value, --value with --fixed-value to select one, or --all deliberately. Repeating --append adds another entry.",
  },
  {
    id: "remove-section",
    heading: "Remove an entire section",
    commands: [{ command: 'git config set --local tutorial.topic "Git"\ngit config remove-section --local tutorial\ngit config list --local', explanation: "Create a sample key, remove its section, then inspect the remaining local settings.", output: "core.repositoryformatversion=0\ncore.bare=false\n…" }],
    note: "remove-section deletes the named section and all its keys in the selected scope. Use this example only for a disposable tutorial section.",
  },
  {
    id: "temporary-override",
    heading: "Override a setting for one command",
    commands: [{ command: 'git -c user.name="Temporary Name" config get user.name', explanation: "Apply a command-scoped value without changing a configuration file.", output: "Temporary Name" }],
  },
];
