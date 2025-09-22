<template>
  <div class="mx-auto h-full w-[80%]">
    <div class="flex h-[85%] items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          {{ t("home.title") }}
        </h1>
        <p class="mb-8 text-lg text-gray-600 dark:text-gray-400">
          {{ t("home.subtitle") }}
        </p>
        <AIProviderSelect :items="aiProviders" v-model="currentModel" />
      </div>
    </div>
    <div class="flex h-[15%] items-center">
      <MessageInput @create="createChat" :disabled="!currentModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import AIProviderSelect from "../components/AIProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { useRouter } from "vue-router";
import { useChatStore } from "../stores/chat";
import { useAiProviderStore } from "../stores/ai-provider";
import { useMessageStore } from "../stores/message";

const { t } = useI18n();
const currentModel = ref("");
const chatStore = useChatStore();
const router = useRouter();
const aiProviderStore = useAiProviderStore();
const aiProviders = computed(() => aiProviderStore.items);
const messageStore = useMessageStore();

const selectedModelInfo = computed(() => {
  const [providerId, selectedModel] = currentModel.value.split("/");
  return {
    providerId: Number(providerId),
    selectedModel,
  };
});

const createChat = async (question: string, filePath?: string) => {
  const { providerId, selectedModel } = selectedModelInfo.value;
  const currentDate = new Date().toISOString();
  let copiedImagePath: string | undefined;
  if (filePath) {
    try {
      copiedImagePath = await window.electronAPI.copyImageToUserDir(filePath);
      console.log(`🤖 ~ createChat ~ copiedImagePath:`, copiedImagePath);
    } catch (error) {
      console.error("Failed to copy image:", error);
    }
  }
  const chatId = await chatStore.createChat({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  const messageId = await messageStore.createMessage({
    content: question,
    type: "question",
    chatId,
    createdAt: currentDate,
    updatedAt: currentDate,
    ...(copiedImagePath && { imagePath: copiedImagePath }),
  });
  chatStore.setCurrentChatId(chatId);
  router.push(`/chat/${chatId}?init=${messageId}`);
};
</script>
