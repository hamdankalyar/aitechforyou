# Electron lessons

- **Course:** The course lives at `/courses/electron`.
- **Basics:** Cover what Electron is, its two runtimes, and project setup.
- **Processes:** Cover the main process, renderer processes, preload scripts, and IPC.
- **Files:** Cover native dialogs, reading and writing files, and shell actions.
- **Frameworks:** Cover TypeScript, Electron Forge, Vite, and React.
- **Desktop:** Cover menus, clipboard, notifications, global shortcuts, and the system tray.
- **Native:** Cover native modules and packaging.
- **Content:** Put lecture sections in `topics/electron/content/`.
- **Registry:** Register each lecture in `lib/articles.ts` with its matching category.
- **Quiz mode:** End every lecture with a `lecture-quiz` section that holds one `quiz-mode` block.
- **Quiz answers:** Give every question exactly one correct answer and an explanation for every answer.
- **Check:** Run `node topics/electron/scripts/check-electron-articles.mjs` after each change.
