// Page simulation of the app lifecycle code in the smallest app lecture.
// topics/electron/scripts/check-electron-articles.mjs runs that real main.js code against a mock of Electron and compares every outcome.
export type Platform = "darwin" | "win32" | "linux";
export type LifecycleAction = "start" | "open" | "close" | "dock";

export const platforms: { id: Platform; label: string }[] = [
  { id: "darwin", label: "macOS" },
  { id: "win32", label: "Windows" },
  { id: "linux", label: "Linux" },
];

// Electron gives every new window the next number and never reuses one, so the state keeps a counter.
export type LifecycleState = { running: boolean; windows: number[]; opened: number; event: string | null; code: string | null; explanation: string };

const start: LifecycleState = { running: false, windows: [], opened: 0, event: null, code: null, explanation: "The app is not running yet. Press Start the app." };

export function lifecycleStep(platform: Platform, state: LifecycleState, action: LifecycleAction): LifecycleState {
  const name = platforms.find(item => item.id === platform)!.label;
  const nextId = state.opened + 1;
  if (action === "start") {
    if (state.running) return state;
    return { running: true, windows: [1], opened: 1, event: "app.whenReady()", code: "app.whenReady().then(() => {\n  createWindow()", explanation: "Electron is ready, so createWindow opens the first window." };
  }
  if (!state.running) return state;
  if (action === "open") {
    return { running: true, windows: [...state.windows, nextId], opened: nextId, event: "createWindow()", code: "createWindow()", explanation: `A second call to createWindow opens Window ${nextId}. Imagine a New Window menu item calling it.` };
  }
  if (action === "close") {
    if (!state.windows.length) return state;
    const windows = state.windows.slice(0, -1);
    const closed = state.windows.at(-1);
    if (windows.length) return { ...state, windows, event: null, code: null, explanation: `Window ${closed} closed. Other windows are still open, so no code in main.js runs.` };
    if (platform === "darwin") return { ...state, windows, event: "window-all-closed", code: "if (process.platform !== 'darwin') app.quit()", explanation: "The last window closed. On macOS the check is false, so the app keeps running in the Dock with no windows." };
    return { ...state, running: false, windows, event: "window-all-closed", code: "if (process.platform !== 'darwin') app.quit()", explanation: `The last window closed. On ${name} the check is true, so app.quit ends the app.` };
  }
  if (platform !== "darwin") return state;
  if (state.windows.length) return { ...state, event: "activate", code: "if (BrowserWindow.getAllWindows().length === 0) createWindow()", explanation: "A window is already open, so the check is false and no new window opens." };
  return { running: true, windows: [nextId], opened: nextId, event: "activate", code: "if (BrowserWindow.getAllWindows().length === 0) createWindow()", explanation: `No windows are open, so the check is true and createWindow opens Window ${nextId}.` };
}

export function lifecycle(platform: Platform, actions: LifecycleAction[]) {
  return actions.reduce((state, action) => lifecycleStep(platform, state, action), start);
}
