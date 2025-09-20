<template>
  <div class="mx-auto h-full w-[80%]">
    <div class="flex h-[85%] items-center">
      <AIProviderSelect :items="aiProviders" v-model="currentModel" />
    </div>
    <div class="flex h-[15%] items-center">
      <MessageInput @create="createChat" :disabled="!currentModel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AIProviderSelect from "../components/AIProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { useRouter } from "vue-router";
import { useChatStore } from "../stores/chat";
import { useAiProviderStore } from "../stores/ai-provider";
import { useMessageStore } from "../stores/message";

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
