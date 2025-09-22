import { ipcRenderer, contextBridge, webUtils } from "electron";
import type {
  CreateChatProps,
  OnUpdatedCallback,
  AppConfig,
  ConfigUpdateProps,
} from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  // send message to main process
  startChat: (data: CreateChatProps) => ipcRenderer.send("start-chat", data),

  // receive message from main process
  onUpdateMessage: (callback: OnUpdatedCallback) =>
    ipcRenderer.on("update-message", (_event, data) => callback(data)),

  // utils
  getFilePath: (file: File) => webUtils.getPathForFile(file),

  // send message to main process and receive response
  copyImageToUserDir: (filePath: string) =>
    ipcRenderer.invoke("copy-image-to-user-dir", filePath),

  // App configuration management
  getAppConfig: (): Promise<AppConfig> => ipcRenderer.invoke("get-app-config"),

  updateAppConfig: (updates: ConfigUpdateProps): Promise<AppConfig> =>
    ipcRenderer.invoke("update-app-config", updates),

  resetAppConfig: (): Promise<AppConfig> =>
    ipcRenderer.invoke("reset-app-config"),
});
