import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./window-manager";
import { setupChatHandlers } from "./ipc-handlers/chat-handlers";
import { setupConfigHandlers } from "./ipc-handlers/config-handlers";
import { setupFileHandlers } from "./ipc-handlers/file-handlers";
import { setupProtocolHandlers } from "./protocol-handlers";
import { createAppMenu, setupMenuHandlers } from "./app-menu";

export const initializeApp = async () => {
  // Setup all handlers
  setupConfigHandlers();
  setupFileHandlers();
  setupProtocolHandlers();

  // Create main window
  const mainWindow = await createMainWindow();

  // Setup chat handlers (needs mainWindow reference)
  setupChatHandlers(mainWindow);

  // Setup menu
  createAppMenu();
  setupMenuHandlers();
};

export const setupAppLifecycle = () => {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", initializeApp);

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", async () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      await initializeApp();
    }
  });
};
