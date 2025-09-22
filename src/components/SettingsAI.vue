<template>
  <div>
    <!-- AI Provider Settings -->
    <div class="space-y-6">
      <div
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="mb-4 flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ t("settings.ai.providers.title") }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t("settings.ai.providers.description") }}
            </p>
          </div>
          <Icon icon="lucide:brain" class="h-6 w-6 text-gray-400" />
        </div>

        <AccordionRoot
          type="single"
          collapsible
          class="space-y-2"
          v-model:value="activeProvider"
        >
          <!-- Dashscope Provider -->
          <AccordionItem
            value="dashscope"
            class="rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger
              class="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:zap" class="h-5 w-5 text-blue-500" />
                <span>{{ t("settings.ai.providers.dashscope.name") }}</span>
              </div>
              <Icon
                icon="lucide:chevron-down"
                class="h-4 w-4 transition-transform duration-200"
              />
            </AccordionTrigger>
            <AccordionContent class="px-4 pt-0 pb-4">
              <div class="space-y-4">
                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ t("settings.ai.providers.dashscope.apiKey") }}
                  </label>
                  <input
                    v-model="providers.dashscope.apiKey"
                    type="password"
                    :placeholder="
                      t('settings.ai.providers.dashscope.apiKeyPlaceholder')
                    "
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    @input="handleProviderChange('dashscope')"
                  />
                </div>
                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ t("settings.ai.providers.dashscope.baseUrl") }}
                  </label>
                  <input
                    v-model="providers.dashscope.baseUrl"
                    type="url"
                    :placeholder="
                      t('settings.ai.providers.dashscope.baseUrlPlaceholder')
                    "
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    @input="handleProviderChange('dashscope')"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <!-- DeepSeek Provider -->
          <AccordionItem
            value="deepseek"
            class="rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger
              class="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:search" class="h-5 w-5 text-green-500" />
                <span>{{ t("settings.ai.providers.deepseek.name") }}</span>
              </div>
              <Icon
                icon="lucide:chevron-down"
                class="h-4 w-4 transition-transform duration-200"
              />
            </AccordionTrigger>
            <AccordionContent class="px-4 pt-0 pb-4">
              <div class="space-y-4">
                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ t("settings.ai.providers.deepseek.apiKey") }}
                  </label>
                  <input
                    v-model="providers.deepseek.apiKey"
                    type="password"
                    :placeholder="
                      t('settings.ai.providers.deepseek.apiKeyPlaceholder')
                    "
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    @input="handleProviderChange('deepseek')"
                  />
                </div>
                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ t("settings.ai.providers.deepseek.baseUrl") }}
                  </label>
                  <input
                    v-model="providers.deepseek.baseUrl"
                    type="url"
                    :placeholder="
                      t('settings.ai.providers.deepseek.baseUrlPlaceholder')
                    "
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    @input="handleProviderChange('deepseek')"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <!-- Anthropic Provider -->
          <AccordionItem
            value="anthropic"
            class="rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger
              class="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              <div class="flex items-center space-x-3">
                <Icon icon="lucide:bot" class="h-5 w-5 text-purple-500" />
                <span>{{ t("settings.ai.providers.anthropic.name") }}</span>
              </div>
              <Icon
                icon="lucide:chevron-down"
                class="h-4 w-4 transition-transform duration-200"
              />
            </AccordionTrigger>
            <AccordionContent class="px-4 pt-0 pb-4">
              <div class="space-y-4">
                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ t("settings.ai.providers.anthropic.apiKey") }}
                  </label>
                  <input
                    v-model="providers.anthropic.apiKey"
                    type="password"
                    :placeholder="
                      t('settings.ai.providers.anthropic.apiKeyPlaceholder')
                    "
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    @input="handleProviderChange('anthropic')"
                  />
                </div>
                <div>
                  <label
                    class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ t("settings.ai.providers.anthropic.baseUrl") }}
                  </label>
                  <input
                    v-model="providers.anthropic.baseUrl"
                    type="url"
                    :placeholder="
                      t('settings.ai.providers.anthropic.baseUrlPlaceholder')
                    "
                    class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    @input="handleProviderChange('anthropic')"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <!-- Actions -->
      <div
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ t("settings.ai.actions.title") }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ t("settings.ai.actions.description") }}
            </p>
          </div>
          <div class="flex gap-3">
            <button
              @click="resetToDefaults"
              :disabled="isLoading"
              class="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              <Icon icon="lucide:rotate-ccw" class="mr-2 h-4 w-4" />
              {{ t("settings.ai.actions.resetToDefaults") }}
            </button>
            <button
              @click="saveSettings"
              :disabled="isLoading"
              class="flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon icon="lucide:save" class="mr-2 h-4 w-4" />
              {{ t("settings.ai.actions.saveSettings") }}
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from "vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "radix-vue";

const { t } = useI18n();

// Reactive state
const activeProvider = ref<string>("");
const isLoading = ref(false);
const statusMessage = ref("");
const statusType = ref<"success" | "error">("success");

// AI Provider configurations
const providers = ref({
  dashscope: {
    apiKey: "",
    baseUrl: "https://dashscope.aliyuncs.com/api/v1",
  },
  deepseek: {
    apiKey: "",
    baseUrl: "https://api.deepseek.com/v1",
  },
  anthropic: {
    apiKey: "",
    baseUrl: "https://api.anthropic.com/v1",
  },
});

// Methods
const loadProviderConfig = async () => {
  try {
    isLoading.value = true;
    // TODO: Load AI provider config from electron API
    // const currentConfig = await window.electronAPI.getAIProviderConfig();
    // providers.value = currentConfig;
    console.log("Loading AI provider config...");
  } catch (error) {
    console.error("Failed to load AI provider config:", error);
    showStatus(t("settings.ai.messages.loadFailed"), "error");
  } finally {
    isLoading.value = false;
  }
};

const handleProviderChange = async (provider: string) => {
  try {
    // TODO: Save individual provider config
    // await window.electronAPI.updateAIProviderConfig(provider, providers.value[provider]);
    showStatus(t("settings.ai.messages.settingsSavedAuto"), "success");
  } catch (error) {
    console.error(`Failed to save ${provider} config:`, error);
    showStatus(t("settings.ai.messages.saveFailed"), "error");
  }
};

const resetToDefaults = async () => {
  try {
    isLoading.value = true;
    // TODO: Reset AI provider config to defaults
    // const defaultConfig = await window.electronAPI.resetAIProviderConfig();
    // providers.value = defaultConfig;

    // Reset to default values
    providers.value = {
      dashscope: {
        apiKey: "",
        baseUrl: "https://dashscope.aliyuncs.com/api/v1",
      },
      deepseek: {
        apiKey: "",
        baseUrl: "https://api.deepseek.com/v1",
      },
      anthropic: {
        apiKey: "",
        baseUrl: "https://api.anthropic.com/v1",
      },
    };

    showStatus(t("settings.ai.messages.settingsReset"), "success");
  } catch (error) {
    console.error("Failed to reset AI provider config:", error);
    showStatus(t("settings.ai.messages.resetFailed"), "error");
  } finally {
    isLoading.value = false;
  }
};

const saveSettings = async () => {
  try {
    isLoading.value = true;
    // TODO: Save all AI provider configs
    // await window.electronAPI.updateAIProviderConfigs(toRaw(providers.value));
    console.log("Saving AI provider configs:", toRaw(providers.value));
    showStatus(t("settings.ai.messages.settingsSaved"), "success");
  } catch (error) {
    console.error("Failed to save AI provider configs:", error);
    showStatus(t("settings.ai.messages.saveFailed"), "error");
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
  await loadProviderConfig();
});

// Watch for config changes and auto-save
watch(
  providers,
  () => {
    // Auto-save when any provider config changes
    // Object.keys(providers.value).forEach((provider) => {
    //   if (
    //     providers.value[provider].apiKey ||
    //     providers.value[provider].baseUrl
    //   ) {
    //     handleProviderChange(provider);
    //   }
    // });
  },
  { deep: true },
);
</script>

<style scoped>
/* Accordion animations */
[data-state="open"] .accordion-trigger-icon {
  transform: rotate(180deg);
}

.accordion-trigger-icon {
  transition: transform 200ms ease;
}
</style>
