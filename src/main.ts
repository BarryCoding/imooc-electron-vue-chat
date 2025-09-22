import { app, BrowserWindow, ipcMain, net, protocol } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { CreateChatProps, ConfigUpdateProps } from "./types";
import "dotenv/config";
import fs from "node:fs/promises";
import url from "node:url";
import { createProvider } from "./ai-providers";
import { loadConfig, updateConfig, resetConfig } from "./app-config";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("copy-image-to-user-dir", async (event, filePath: string) => {
    // Get the path to the user's application data directory
    const userDataPath = app.getPath("userData");

    // Define the path to the 'images' directory within the user data directory
    const imagesDir = path.join(userDataPath, "images");

    // Ensure the 'images' directory exists, create it if it doesn't (recursive allows nested dirs)
    await fs.mkdir(imagesDir, { recursive: true });

    // Extract the file name from the filePath
    const fileName = path.basename(filePath);

    // Define the destination path for the copied image
    const destPath = path.join(imagesDir, fileName);

    // Copy the image file from the filePath to the destination path
    await fs.copyFile(filePath, destPath);

    // Return the destination path of the copied image
    return destPath;
  });

  // Config management IPC handlers
  ipcMain.handle("get-app-config", async () => {
    return await loadConfig();
  });

  ipcMain.handle(
    "update-app-config",
    async (event, updates: ConfigUpdateProps) => {
      return await updateConfig(updates);
    },
  );

  ipcMain.handle("reset-app-config", async () => {
    return await resetConfig();
  });

  // REFACTOR: SRP
  protocol.handle("safe-file", async (request) => {
    const filePath = decodeURIComponent(
      request.url.slice("safe-file://".length),
    );

    // understanding the raw approach:
    // const data = await fs.readFile(filePath)
    // return new Response(data, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': lookup(filePath) as string
    //   }
    // })

    // url and net approach
    const newFilePath = url.pathToFileURL(filePath).toString();
    console.log(`🤖 ~ createWindow ~ newFilePath:`, newFilePath);
    return net.fetch(newFilePath);
  });

  // REFACTOR: SRP
  // receive message from ipcRenderer
  ipcMain.on("start-chat", async (event, data: CreateChatProps) => {
    const { providerName, messages, messageId, selectedModel } = data;
    const provider = createProvider(providerName);
    const stream = await provider.chat(messages, selectedModel);
    for await (const chunk of stream) {
      const content = {
        messageId,
        data: chunk,
      };
      console.log(`🤖 ~ createWindow ~ content:`, content);
      // send message to ipcRenderer
      mainWindow.webContents.send("update-message", content);
    }
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: "detach" });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
