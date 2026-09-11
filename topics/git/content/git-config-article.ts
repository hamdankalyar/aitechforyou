import type { ArticleSection } from "@/lib/articles";

export const gitConfigSections: ArticleSection[] = [
  {
    id: "give-your-work-a-name",
    heading: "Your work deserves a name.",
    paragraphs: [
      "In the first article, a commit gave our reading list a recorded moment. There is a person behind that moment, too. When you make a normal new commit, Git needs a name and an email address to record with it.",
      "Imagine Maya keeps a personal reading list and also works on a studio website. Same laptop, same person—but she wants personal projects to use one email address and the studio project to use another. She does not need to change her settings every time she changes folders.",
      "We’ll give her a default identity, add a project-specific exception, and follow the values all the way to the result. You can explore the example before installing or configuring anything.",
    ],
    blocks: [{ type: "callout", title: "Identity is not a login", text: "user.name and user.email describe commit identity. They do not sign you into GitHub or grant access to a repository. Changing them affects future commits; it does not rewrite the people recorded in existing history." }],
  },
  {
    id: "set-your-defaults",
    heading: "Start with your everyday identity.",
    paragraphs: [
      "Git stores settings as keys and values. In user.name, user is the section and name is the key. You can read a setting with get and write one with set. Think of each command as answering a small question: what is it, or what should it be?",
      "For real setup, first run git --version to check that Git is installed. The commands here use the explicit set/get syntax and were checked with Git 2.50.1. Use Git 2.50 or newer to follow them as written. Older tutorials may use forms such as git config --global user.name instead.",
      "Replace Maya’s sample details with the name and email you want recorded in your commits. These commands change your user-wide defaults. They can run outside a repository.",
    ],
    blocks: [
      { type: "command", command: 'git config set --global user.name "Maya Chen"\ngit config set --global user.email "maya@example.com"', explanation: "Save your default commit identity. Successful set commands normally print nothing." },
      { type: "command", command: "git config get --global user.name\ngit config get --global user.email", explanation: "Read back just the global settings you saved.", output: "Maya Chen\nmaya@example.com" },
      { type: "command", command: "git config set --global init.defaultBranch main", explanation: "Choose main as the initial branch name for newly initialized repositories. This does not rename branches in projects that already exist." },
    ],
  },
  {
    id: "a-default-and-an-exception",
    heading: "A default. Then an exception.",
    paragraphs: [
      "Maya’s reading list can use her global identity. Inside the studio repository, she can set a local email instead. That local value takes precedence for this project; the personal address remains saved in her global configuration.",
      "The choice happens separately for each key. A local email does not replace the whole user section. If this project has no local name, it can still use the global name.",
    ],
    blocks: [
      { type: "table", caption: "The two scopes you will use most", columns: ["Scope", "Applies to", "Common location"], rows: [["Global", "Your repositories, unless overridden", "~/.gitconfig"], ["Local", "This repository", ".git/config"]] },
      { type: "command", command: 'git config set --local user.email "maya@studio.example"', explanation: "Run this from the studio repository to set its email. If you have no repository yet, explore the practice example below and return to this command once you have created a project with Git." },
    ],
  },
  {
    id: "try-the-settings",
    heading: "Which identity will Git find?",
    paragraphs: [
      "Here is Maya’s setup. Edit the global name, then turn the project overrides on and off. Watch the result show both the value and the scope supplying it.",
      "Try this: leave the name override off and the email override on. Then change the global email. The project continues using its local email. Turn that override off, and the updated global email becomes visible.",
    ],
    blocks: [{ type: "config-playground" }],
  },
  {
    id: "follow-the-value",
    heading: "Don’t guess. Ask where it came from.",
    paragraphs: [
      "A setting can look correct when you inspect its global value, yet have a different effective value inside a project. Ask Git for the value without restricting it to one scope. Add origin and scope information when you need to explain the result.",
    ],
    blocks: [
      { type: "command", command: "git config get user.email", explanation: "Inside Maya’s studio project, the local override supplies the value.", output: "maya@studio.example" },
      { type: "command", command: "git config get --show-origin --show-scope user.email", explanation: "Show the winning value with its scope and file. Spacing and file paths may differ on your computer.", output: "local  file:.git/config  maya@studio.example" },
      { type: "command", command: "git config get --all --show-origin --show-scope user.email", explanation: "See every configured value for this key, including the global value behind the local override. The path below is illustrative.", output: "global  file:/Users/maya/.gitconfig  maya@example.com\nlocal   file:.git/config            maya@studio.example" },
      { type: "callout", title: "Reading and writing have different defaults", text: "An unrestricted get reads across the available scopes. A set with no scope writes locally by default. Use --global or --local explicitly while learning so the destination is clear." },
    ],
  },
  {
    id: "remove-the-exception",
    heading: "Remove the exception, keep the default.",
    paragraphs: [
      "Suppose Maya no longer needs a studio-specific email. She removes the local key. The global setting was never erased, so it becomes the effective value again.",
      "Removing a key is different from setting it to an empty string. An empty configured value can still take precedence. Use unset to remove the override instead of blanking it out.",
    ],
    blocks: [
      { type: "command", command: "git config unset --local user.email\ngit config get user.email", explanation: "For our single local email entry, remove it and read the result. If the key is absent, unset reports a nonzero exit status.", output: "maya@example.com" },
    ],
  },
  {
    id: "a-little-deeper",
    heading: "There’s more under the surface.",
    paragraphs: ["Global defaults and local exceptions are enough to get started. These optional notes complete the picture when you encounter a more complicated configuration."],
    blocks: [
      { type: "details", title: "System, worktree, and command scopes", paragraphs: [
        "For the ordinary single-value lookups used here, increasing precedence is system → global → local → worktree → command. Worktree-specific configuration must be enabled with extensions.worktreeConfig; without it, --worktree behaves like --local. We will cover linked worktrees later.",
        "Common file locations are an installation-specific etc/gitconfig for system settings, ~/.gitconfig and the XDG Git config file for global settings, and the repository’s config for local settings. Includes and linked worktrees can change the paths you see. Use --show-origin rather than assuming a path.",
        "The practice example models only global and local lookups for user.name and user.email. Commit identity can also be supplied through author/committer environment variables or explicit command options. Multi-valued settings can collect values instead of using this simple one-winner model.",
      ], commands: [
        { command: 'git -c user.name="Temporary Name" config get user.name', explanation: "Override a setting for this command only. No configuration file is changed.", output: "Temporary Name" },
      ] },
      { type: "details", title: "Multiple values, custom keys, and whole sections", paragraphs: [
        "Your notes use custom configuration keys to explore the key/value store. We’ll use tutorial.reader here, so the exercise is separate from your identity. Git stores custom keys; another tool could choose to interpret them.",
        "--append adds another value for the same key. get --all reads them all. A plain unset does not silently remove one of several matching values: it refuses the ambiguous operation. Choose a matching value or use --all deliberately.",
      ], commands: [
        { command: 'git config set --local --append tutorial.reader "Maya"\ngit config set --local --append tutorial.reader "Sam"\ngit config get --local --all tutorial.reader', explanation: "In a practice repository with no existing tutorial.reader entries, add two values and inspect them.", output: "Maya\nSam" },
        { command: "git config unset --local --all tutorial.reader", explanation: "Remove every local value for this key. Other keys in the tutorial section are unaffected." },
        { command: 'git config set --local tutorial.topic "Git"\ngit config remove-section --local tutorial', explanation: "Create a sample setting, then remove the entire local tutorial section and all its keys. Use this only for your practice section." },
      ] },
      { type: "details", title: "How those settings look in a file", paragraphs: [
        "A section header such as [user] groups keys. The commands edit this format for you. The example below is a local email override, so it does not need to repeat the global name.",
        "Section and variable names are case-insensitive, while subsection names are case-sensitive. That distinction matters for keys that include a subsection, such as a named remote. Prefer the spelling shown in Git’s documentation.",
      ], code: "[user]\n    email = maya@studio.example", commands: [
        { command: "git config list --local", explanation: "List this repository’s settings. Alongside any identity settings you have kept, expect other entries such as core settings." },
      ] },
    ],
  },
  {
    id: "check-the-override",
    heading: "One setting, two places.",
    paragraphs: ["Maya’s global email is maya@example.com. This project has a local email of maya@studio.example. She removes only the local email setting."],
    blocks: [{ type: "quiz", question: "What will git config get user.email return now?", answers: [
      { text: "maya@example.com, from the global scope.", correct: true, explanation: "Exactly. Removing the local override reveals the global value that was already there. Each scope keeps its own settings." },
      { text: "Nothing. Both email settings were deleted.", correct: false, explanation: "The --local option limits the removal to this repository’s configuration. Maya’s global email remains available." },
      { text: "maya@studio.example, because Git remembers it.", correct: false, explanation: "The local entry has been removed. For this example, the next lookup uses the remaining global email instead." },
    ] }],
  },
  {
    id: "ready-for-your-first-commit",
    heading: "You’re ready to put your name on it.",
    paragraphs: ["Before recording work in a project, check its effective name and email. If something looks wrong, follow the value to its source. You now have a way to explain the result, not just another command to memorize."],
    blocks: [{ type: "recap", items: [
      "Use global settings for your everyday identity and local settings for a project’s exceptions.",
      "Resolve each key separately. A local email can coexist with a global name.",
      "Inspect with get and --show-origin; remove an override with unset when you want the default back.",
    ] }],
  },
];
