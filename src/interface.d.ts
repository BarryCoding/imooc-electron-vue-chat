import { CreateChatProps, OnUpdatedCallback } from "./types";

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => Electron.IpcRenderer;

  getFilePath: (file: File) => string;
  copyImageToUserDir: (sourcePath: string) => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
