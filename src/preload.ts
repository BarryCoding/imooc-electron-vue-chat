import { ipcRenderer, contextBridge } from "electron";
import type { CreateChatProps, OnUpdatedCallback } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  // send message to main process
  startChat: (data: CreateChatProps) => ipcRenderer.send("start-chat", data),

  // receive message from main process
  onUpdateMessage: (callback: OnUpdatedCallback) =>
    ipcRenderer.on("update-message", (_event, data) => callback(data)),
});
