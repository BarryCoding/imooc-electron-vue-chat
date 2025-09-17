<script setup lang="ts">
import { useRoute } from "vue-router";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import { ref, watch, computed, onMounted } from "vue";
import { db } from "../db";
import { ChatProps, MessageProps, MessageStatus } from "src/types";
import { useChatStore } from "../stores/chat";
const route = useRoute();
const chatId = ref(Number(route.params.id as string));
const chatStore = useChatStore();
const currentChat = computed(() =>
  chatStore.items.find((item) => item.id === chatId.value),
);
const currentMessages = ref<MessageProps[]>([]);
const initMessageId = Number(route.query.init as string);
let lastQuestion = "";
const createInitMessage = async () => {
  const initData: Omit<MessageProps, "id"> = {
    content: "",
    status: "loading",
    type: "answer",
    chatId: chatId.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const messageId = await db.messages.add(initData);
  currentMessages.value.push({ ...initData, id: messageId });
  if (currentChat.value) {
    const currentProvider = await db.aiProviders
      .where({ id: currentChat.value.providerId })
      .first();
    console.log(`🤖 ~ createInitMessage ~ currentProvider:`, currentProvider);
    if (currentProvider) {
      window.electronAPI.startChat({
        content: currentChat.value.title,
        providerName: currentProvider.name,
        selectedModel: currentChat.value.selectedModel,
        messageId,
      });
    }
  }
};
onMounted(async () => {
  currentMessages.value = await db.messages
    .where({ chatId: chatId.value })
    .toArray();
  if (initMessageId) {
    const lastMessage = await db.messages
      .where({ chatId: chatId.value })
      .last();
    lastQuestion = lastMessage?.content || "";
    createInitMessage();
  }
  window.electronAPI.onUpdateMessage(async (streamData) => {
    const { messageId, data } = streamData;
    const currentMessage = await db.messages.where({ id: messageId }).first();
    if (currentMessage) {
      const updatedData = {
        content: currentMessage.content + data.result,
        status: data.is_end ? "finished" : "streaming",
        updatedAt: new Date().toISOString(),
      } as const;
      await db.messages.update(messageId, updatedData);
      const index = currentMessages.value.findIndex(
        (item) => item.id === messageId,
      );
      if (index !== -1) {
        currentMessages.value[index] = {
          ...currentMessages.value[index],
          ...updatedData,
        };
      }
    }
  });
});
watch(
  () => route.params.id,
  async (newId: string) => {
    chatId.value = Number(newId);
    currentMessages.value = await db.messages
      .where({ chatId: chatId.value })
      .toArray();
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
