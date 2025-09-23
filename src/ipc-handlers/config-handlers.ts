import { ipcMain } from "electron";
import { ConfigUpdateProps } from "../types";
import { loadConfig, updateConfig, resetConfig } from "../app-config";

export const setupConfigHandlers = () => {
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
};
