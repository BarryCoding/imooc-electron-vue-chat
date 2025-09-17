import { ipcRenderer, contextBridge } from "electron";
import type { CreateChatProps } from "./types";

contextBridge.exposeInMainWorld("electronAPI", {
  startChat: (data: CreateChatProps) => ipcRenderer.send("start-chat", data),
});
