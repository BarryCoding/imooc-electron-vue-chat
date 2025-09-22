<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          {{ $t("settings.title") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t("settings.subtitle") }}
        </p>
      </div>

      <!-- Settings Cards -->
      <div class="space-y-6">
        <!-- Language Settings -->
        <div
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ $t("settings.language.title") }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("settings.language.description") }}
              </p>
            </div>
            <Icon icon="lucide:globe" class="h-6 w-6 text-gray-400" />
          </div>

          <select
            v-model="config.language"
            @change="handleLanguageChange"
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="en">{{ $t("settings.language.english") }}</option>
            <option value="zh-CN">{{ $t("settings.language.chinese") }}</option>
          </select>
        </div>

        <!-- Font Size Settings -->
        <div
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ $t("settings.fontSize.title") }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("settings.fontSize.description") }}
              </p>
            </div>
            <Icon icon="lucide:type" class="h-6 w-6 text-gray-400" />
          </div>

          <div class="space-y-4">
            <!-- Font Size Slider -->
            <div class="space-y-2">
              <div
                class="flex justify-between text-sm text-gray-600 dark:text-gray-400"
              >
                <span>{{ $t("settings.fontSize.small") }}</span>
                <span class="font-medium">{{ config.fontSize }}px</span>
                <span>{{ $t("settings.fontSize.large") }}</span>
              </div>
              <input
                v-model="config.fontSize"
                type="range"
                min="10"
                max="24"
                step="1"
                @input="handleConfigChange"
                class="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-600"
              />
            </div>

            <!-- Font Size Presets -->
            <div class="flex gap-2">
              <button
                v-for="size in fontSizes"
                :key="size.value"
                @click="updateFontSize(size.value)"
                :class="[
                  'flex-1 rounded-md border px-3 py-2 text-sm transition-colors',
                  config.fontSize === size.value
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
                ]"
              >
                {{ $t(`settings.fontSize.${size.key}`) }}
              </button>
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ $t("settings.preview.title") }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("settings.preview.description") }}
              </p>
            </div>
            <Icon icon="lucide:eye" class="h-6 w-6 text-gray-400" />
          </div>

          <div
            class="rounded-lg border bg-gray-50 p-4 dark:bg-gray-700"
            :style="{ fontSize: `${config.fontSize}px` }"
          >
            <p class="mb-2 text-gray-900 dark:text-white">
              {{ $t("settings.preview.text") }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              {{
                $t("settings.preview.info", {
                  language: getLanguageName(config.language),
                  fontSize: config.fontSize,
                })
              }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ $t("settings.actions.title") }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ $t("settings.actions.description") }}
              </p>
            </div>
            <div class="flex gap-3">
              <button
                @click="resetToDefaults"
                :disabled="isLoading"
                class="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <Icon icon="lucide:rotate-ccw" class="mr-2 h-4 w-4" />
                {{ $t("settings.actions.resetToDefaults") }}
              </button>
              <button
                @click="saveSettings"
                :disabled="isLoading"
                class="flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon icon="lucide:save" class="mr-2 h-4 w-4" />
                {{ $t("settings.actions.saveSettings") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Messages -->
      <div v-if="statusMessage" class="mt-6">
        <div
          :class="[
            'flex items-center rounded-md p-4',
            statusType === 'success'
              ? 'border border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200'
              : 'border border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200',
          ]"
        >
          <Icon
            :icon="
              statusType === 'success'
                ? 'lucide:check-circle'
                : 'lucide:alert-circle'
            "
            class="mr-2 h-4 w-4"
          />
          {{ statusMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from "vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import {
  updateLanguage,
  isSupportedLocale,
  type SupportedLocale,
} from "../i18n";
import type { AppConfig, ConfigUpdateProps } from "../types";

const { t } = useI18n();

// Reactive state
const config = ref<AppConfig>({
  language: "en",
  fontSize: 14,
});

const isLoading = ref(false);
const statusMessage = ref("");
const statusType = ref<"success" | "error">("success");

// Font size presets
const fontSizes = [
  { label: "Small", value: 12, key: "small" },
  { label: "Medium", value: 14, key: "medium" },
  { label: "Large", value: 16, key: "large" },
  { label: "XL", value: 18, key: "xl" },
  { label: "XXL", value: 20, key: "xxl" },
];

// Language mapping
const languageMap: Record<string, string> = {
  en: t("settings.language.english"),
  "zh-CN": t("settings.language.chinese"),
};

// Methods
const getLanguageName = (code: string): string => {
  return languageMap[code] || code;
};

const loadConfig = async () => {
  try {
    isLoading.value = true;
    const currentConfig = await window.electronAPI.getAppConfig();
    console.log(`🤖 ~ loadConfig ~ currentConfig:`, currentConfig);
    config.value = currentConfig;
  } catch (error) {
    console.error("Failed to load config:", error);
    showStatus(t("settings.messages.loadFailed"), "error");
  } finally {
    isLoading.value = false;
  }
};

const handleLanguageChange = async () => {
  try {
    const selectedLanguage = config.value.language;

    // Validate that the selected language is supported
    if (!isSupportedLocale(selectedLanguage)) {
      console.error(`Unsupported locale: ${selectedLanguage}`);
      showStatus(t("settings.messages.saveFailed"), "error");
      return;
    }

    await updateLanguage(selectedLanguage);
    showStatus(t("settings.messages.settingsSavedAuto"), "success");
  } catch (error) {
    console.error("Failed to save language config:", error);
    showStatus(t("settings.messages.saveFailed"), "error");
  }
};

const handleConfigChange = async () => {
  try {
    await window.electronAPI.updateAppConfig(toRaw(config.value));
    showStatus(t("settings.messages.settingsSavedAuto"), "success");
  } catch (error) {
    console.error("Failed to save config:", error);
    showStatus(t("settings.messages.saveFailed"), "error");
  }
};

const updateFontSize = async (size: number) => {
  config.value.fontSize = size;
  await handleConfigChange();
};

const resetToDefaults = async () => {
  try {
    isLoading.value = true;
    const defaultConfig = await window.electronAPI.resetAppConfig();
    config.value = defaultConfig;

    // Validate and update language
    if (isSupportedLocale(defaultConfig.language)) {
      await updateLanguage(defaultConfig.language);
    } else {
      console.warn(
        `Default language ${defaultConfig.language} is not supported, falling back to 'en'`,
      );
      await updateLanguage("en");
    }

    showStatus(t("settings.messages.settingsReset"), "success");
  } catch (error) {
    console.error("Failed to reset config:", error);
    showStatus(t("settings.messages.resetFailed"), "error");
  } finally {
    isLoading.value = false;
  }
};

const saveSettings = async () => {
  try {
    isLoading.value = true;
    await window.electronAPI.updateAppConfig(toRaw(config.value));

    // Validate and update language
    if (isSupportedLocale(config.value.language)) {
      await updateLanguage(config.value.language);
    } else {
      console.warn(
        `Language ${config.value.language} is not supported, falling back to 'en'`,
      );
      await updateLanguage("en");
    }

    showStatus(t("settings.messages.settingsSaved"), "success");
  } catch (error) {
    console.error("Failed to save config:", error);
    showStatus(t("settings.messages.saveFailed"), "error");
  } finally {
    isLoading.value = false;
  }
};

const showStatus = (message: string, type: "success" | "error") => {
  statusMessage.value = message;
  statusType.value = type;
  setTimeout(() => {
    statusMessage.value = "";
  }, 3000);
};

// Lifecycle
onMounted(async () => {
  await loadConfig();
});

// Watch for config changes and auto-save
watch(
  config,
  () => {
    if (config.value.language && config.value.fontSize) {
      handleConfigChange();
    }
  },
  { deep: true },
);
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark .slider::-webkit-slider-thumb {
  border-color: #1f2937;
}

.dark .slider::-moz-range-thumb {
  border-color: #1f2937;
}
</style>
