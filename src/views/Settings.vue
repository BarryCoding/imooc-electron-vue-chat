<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "radix-vue";
import SettingsCommon from "../components/SettingsCommon.vue";
import SettingsAI from "../components/SettingsAI.vue";

const { t } = useI18n();
const activeTab = ref("common");
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto max-w-4xl px-6 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          {{ t("settings.title") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ t("settings.subtitle") }}
        </p>
      </div>

      <!-- Tabs -->
      <TabsRoot v-model:value="activeTab" class="w-full">
        <TabsList
          class="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
        >
          <TabsTrigger
            value="common"
            class="flex items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
          >
            <Icon icon="lucide:settings" class="h-4 w-4" />
            <span>{{ t("settings.tabs.common") }}</span>
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            class="flex items-center justify-center space-x-2 rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
          >
            <Icon icon="lucide:brain" class="h-4 w-4" />
            <span>{{ t("settings.tabs.ai") }}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="common" class="mt-6">
          <SettingsCommon />
        </TabsContent>

        <TabsContent value="ai" class="mt-6">
          <SettingsAI />
        </TabsContent>
      </TabsRoot>
    </div>
  </div>
</template>
