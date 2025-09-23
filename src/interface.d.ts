import {
  CreateChatProps,
  OnUpdatedCallback,
  AppConfig,
  ConfigUpdateProps,
} from "./types";

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => Electron.IpcRenderer;

  // Menu IPC handlers
  onMenuNewChat: (callback: () => void) => Electron.IpcRenderer;
  onMenuOpenSettings: (callback: () => void) => Electron.IpcRenderer;

  getFilePath: (file: File) => string;
  copyImageToUserDir: (sourcePath: string) => Promise<string>;

  // App configuration management
  getAppConfig: () => Promise<AppConfig>;
  updateAppConfig: (updates: ConfigUpdateProps) => Promise<AppConfig>;
  resetAppConfig: () => Promise<AppConfig>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
