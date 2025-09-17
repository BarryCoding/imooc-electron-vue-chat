import { CreateChatProps, OnUpdatedCallback } from "./types";

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => Electron.IpcRenderer;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
