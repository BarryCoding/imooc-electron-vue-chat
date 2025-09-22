import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import zhCN from "../locales/zh-CN.json";

// Define supported locales type
export type SupportedLocale = "en" | "zh-CN";

const messages = {
  en,
  "zh-CN": zhCN,
};

const i18n = createI18n({
  legacy: false, // Use Composition API (required for v11+)
  locale: "en", // Default locale
  fallbackLocale: "en", // Fallback locale
  messages,
  // Custom missing key handler for better debugging
  missing: (locale: string, key: string) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Vue I18n] Missing translation for key "${key}" in locale "${locale}"`,
      );
    }
  },
});

// Utility function to load language from app config
export const loadLanguageFromConfig = async (): Promise<SupportedLocale> => {
  try {
    const config = await window.electronAPI.getAppConfig();
    const language = (config.language || "en") as SupportedLocale;
    i18n.global.locale.value = language;
    return language;
  } catch (error) {
    console.error("Failed to load language from config:", error);
    i18n.global.locale.value = "en";
    return "en";
  }
};

// Utility function to update language
export const updateLanguage = async (
  language: SupportedLocale,
): Promise<void> => {
  try {
    i18n.global.locale.value = language;
    await window.electronAPI.updateAppConfig({ language });
  } catch (error) {
    console.error("Failed to update language:", error);
    throw error;
  }
};

// Utility function to get current locale
export const getCurrentLocale = (): SupportedLocale => {
  return i18n.global.locale.value as SupportedLocale;
};

// Utility function to check if locale is supported
export const isSupportedLocale = (
  locale: string,
): locale is SupportedLocale => {
  return ["en", "zh-CN"].includes(locale);
};

export default i18n;
