<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Customize your application preferences
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
                Language
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Choose your preferred language
              </p>
            </div>
            <Icon icon="lucide:globe" class="h-6 w-6 text-gray-400" />
          </div>

          <select
            v-model="config.language"
            @change="handleConfigChange"
            class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="en">English</option>
            <option value="zh-CN">中文 (简体)</option>
            <option value="zh-TW">中文 (繁體)</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        <!-- Font Size Settings -->
        <div
          class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Font Size
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Adjust the text size for better readability
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
                <span>Small</span>
                <span class="font-medium">{{ config.fontSize }}px</span>
                <span>Large</span>
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
                {{ size.label }}
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
                Preview
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                See how your settings will look
              </p>
            </div>
            <Icon icon="lucide:eye" class="h-6 w-6 text-gray-400" />
          </div>

          <div
            class="rounded-lg border bg-gray-50 p-4 dark:bg-gray-700"
            :style="{ fontSize: `${config.fontSize}px` }"
          >
            <p class="mb-2 text-gray-900 dark:text-white">
              This is how your text will appear with the current settings.
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              Language: {{ getLanguageName(config.language) }} | Font Size:
              {{ config.fontSize }}px
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
                Actions
              </h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Reset settings or save configuration
              </p>
            </div>
            <div class="flex gap-3">
              <button
                @click="resetToDefaults"
                :disabled="isLoading"
                class="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <Icon icon="lucide:rotate-ccw" class="mr-2 h-4 w-4" />
                Reset to Defaults
              </button>
              <button
                @click="saveSettings"
                :disabled="isLoading"
                class="flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon icon="lucide:save" class="mr-2 h-4 w-4" />
                Save Settings
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
import type { AppConfig, ConfigUpdateProps } from "../types";

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
  { label: "Small", value: 12 },
  { label: "Medium", value: 14 },
  { label: "Large", value: 16 },
  { label: "XL", value: 18 },
  { label: "XXL", value: 20 },
];

// Language mapping
const languageMap: Record<string, string> = {
  en: "English",
  "zh-CN": "中文 (简体)",
  "zh-TW": "中文 (繁體)",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
  ru: "Русский",
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
    showStatus("Failed to load settings", "error");
  } finally {
    isLoading.value = false;
  }
};

const handleConfigChange = async () => {
  try {
    await window.electronAPI.updateAppConfig(toRaw(config.value));
    showStatus("Settings saved automatically", "success");
  } catch (error) {
    console.error("Failed to save config:", error);
    showStatus("Failed to save settings", "error");
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
    showStatus("Settings reset to defaults", "success");
  } catch (error) {
    console.error("Failed to reset config:", error);
    showStatus("Failed to reset settings", "error");
  } finally {
    isLoading.value = false;
  }
};

const saveSettings = async () => {
  try {
    isLoading.value = true;
    await window.electronAPI.updateAppConfig(toRaw(config.value));
    showStatus("Settings saved successfully", "success");
  } catch (error) {
    console.error("Failed to save config:", error);
    showStatus("Failed to save settings", "error");
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
onMounted(() => {
  loadConfig();
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
