import { ipcMain } from "electron";
import { CreateChatProps } from "../types";
import { createProvider } from "../ai-providers";

export const setupChatHandlers = (mainWindow: Electron.BrowserWindow) => {
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
      console.log(`🤖 ~ start-chat ~ content:`, content);
      // send message to ipcRenderer
      mainWindow.webContents.send("update-message", content);
    }
  });
};
