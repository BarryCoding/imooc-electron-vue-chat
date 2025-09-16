<template>
  <div class="mx-auto h-full w-[80%]">
    <div class="flex h-[85%] items-center">
      <AIProviderSelect :items="aiProviders" v-model="currentModel" />
    </div>
    <div class="flex h-[15%] items-center">
      <MessageInput @create="createChat" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AIProviderSelect from "../components/AIProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
import { useRouter } from "vue-router";
import { AIProviderProps } from "src/types";
import { db } from "../db";
const currentModel = ref("");

const router = useRouter();
const aiProviders = ref<AIProviderProps[]>([]);
onMounted(async () => {
  aiProviders.value = await db.aiProviders.toArray();
});

const selectedModelInfo = computed(() => {
  const [providerId, selectedModel] = currentModel.value.split("/");
  return {
    providerId: Number(providerId),
    selectedModel,
  };
});

const createChat = async (question: string) => {
  const { providerId, selectedModel } = selectedModelInfo.value;
  const currentDate = new Date().toISOString();
  const chatId = await db.chats.add({
    title: question,
    providerId,
    selectedModel,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  const messageId = await db.messages.add({
    content: question,
    type: "question",
    chatId,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  router.push(`/chat/${chatId}?init=${messageId}`);
};
</script>
