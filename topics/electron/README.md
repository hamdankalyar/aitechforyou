# Electron lessons

- **Course:** The course lives at `/courses/electron`.
- **Basics:** Cover what Electron is, its two runtimes, the process model, and project setup.
- **Processes:** Cover hands-on IPC between the main process, preload scripts, and renderer processes.
- **Files:** Cover native dialogs, reading and writing files, and shell actions.
- **Frameworks:** Cover TypeScript, Electron Forge, Vite, and React.
- **Desktop:** Cover menus, clipboard, notifications, global shortcuts, and the system tray.
- **Native:** Cover native modules and packaging.
- **Content:** Put lecture sections in `topics/electron/content/`.
- **Registry:** Register each lecture in `lib/articles.ts` with its matching category.
- **Code:** Show every code example in a `command` block with a short `label`, like the Git and React Native courses. Never use a plain paragraph `code` box.
- **Flashcards:** When a lecture has question-and-answer cards, put them in a `flashcards` section just before the quiz.
- **Quiz mode:** End every lecture with a `lecture-quiz` section that holds one `quiz-mode` block.
- **Quiz answers:** Give every question exactly one correct answer and an explanation for every answer.
- **Check:** Run `node topics/electron/scripts/check-electron-articles.mjs` after each change.
