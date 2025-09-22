import { app } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import type { AppConfig, ConfigUpdateProps } from "./types";

// Default app configuration
export const DEFAULT_CONFIG: AppConfig = {
  language: "en",
  fontSize: 14,
};

// Config file path
const getConfigPath = (): string => {
  const userDataPath = app.getPath("userData");
  return path.join(userDataPath, "app-config.json");
};

// Load app configuration from file
export const loadConfig = async (): Promise<AppConfig> => {
  try {
    const configPath = getConfigPath();
    const configData = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(configData) as AppConfig;
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    console.log("Config file not found or invalid, using default config");
    return DEFAULT_CONFIG;
  }
};

// Save app configuration to file
export const saveConfig = async (config: AppConfig): Promise<void> => {
  try {
    const configPath = getConfigPath();
    await fs.writeFile(configPath, JSON.stringify(config, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to save config:", error);
    throw error;
  }
};

// Update app configuration with partial updates
export const updateConfig = async (
  updates: ConfigUpdateProps,
): Promise<AppConfig> => {
  const currentConfig = await loadConfig();
  const updatedConfig = { ...currentConfig, ...updates };
  await saveConfig(updatedConfig);
  return updatedConfig;
};

// Reset app configuration to defaults
export const resetConfig = async (): Promise<AppConfig> => {
  await saveConfig(DEFAULT_CONFIG);
  return DEFAULT_CONFIG;
};
