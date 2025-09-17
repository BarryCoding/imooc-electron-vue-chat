<script setup lang="ts">
import { useRoute } from "vue-router";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import { ref, watch, computed, onMounted } from "vue";
import { db } from "../db";
import { MessageProps } from "src/types";
import { useChatStore } from "../stores/chat";
import { useMessageStore } from "../stores/message";

const route = useRoute();
const chatId = ref(Number(route.params.id as string));
const chatStore = useChatStore();
const currentChat = computed(() =>
  chatStore.items.find((item) => item.id === chatId.value),
);
const messageStore = useMessageStore();
const currentMessages = computed(() => messageStore.currentMessages);
const initMessageId = Number(route.query.init as string);
const lastQuestion = computed(() =>
  messageStore.currentMessages.findLast((item) => item.type === "question"),
);
const createInitMessage = async () => {
  const initData: Omit<MessageProps, "id"> = {
    content: "",
    status: "loading",
    type: "answer",
    chatId: chatId.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const messageId = await messageStore.createMessage(initData);
  if (currentChat.value) {
    const currentProvider = await db.aiProviders
      .where({ id: currentChat.value.providerId })
      .first();
    if (currentProvider) {
      window.electronAPI.startChat({
        content: lastQuestion.value?.content ?? "",
        providerName: currentProvider.name,
        selectedModel: currentChat.value.selectedModel,
        messageId,
      });
    }
  }
};
onMounted(async () => {
  await messageStore.fetchMessagesByChatId(chatId.value);
  if (initMessageId) {
    createInitMessage();
  }
  window.electronAPI.onUpdateMessage(async (streamData) => {
    messageStore.updateMessage(streamData);
  });
});
watch(
  () => route.params.id,
  async (newId: string) => {
    chatId.value = Number(newId);
    await messageStore.fetchMessagesByChatId(chatId.value);
  },
);
</script>

<template>
  <div
    class="flex h-[10%] items-center justify-between border-b border-gray-300 bg-gray-200 px-3"
    v-if="currentChat"
  >
    <h3 class="font-semibold text-gray-900">{{ currentChat.title }}</h3>
    <span class="text-sm text-gray-500">{{ currentChat.updatedAt }}</span>
  </div>
  <div class="mx-auto h-[75%] w-[80%] overflow-y-auto pt-2">
    <MessageList :messages="currentMessages" />
  </div>
  <div class="mx-auto flex h-[15%] w-[80%] items-center">
    <MessageInput />
  </div>
</template>
