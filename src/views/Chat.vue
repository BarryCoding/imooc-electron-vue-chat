<script setup lang="ts">
import { useRoute } from "vue-router";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import { ref, watch, computed, onMounted } from "vue";
import { db } from "../db";
import { ChatProps, MessageProps } from "src/types";
const route = useRoute();
const currentChat = ref<ChatProps>();
let chatId = Number(route.params.id as string);
const currentMessages = ref<MessageProps[]>([]);
const initMessageId = Number(route.query.init as string);
const createInitMessage = async () => {
  const initData: Omit<MessageProps, "id"> = {
    content: "",
    status: "loading",
    type: "answer",
    chatId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const messageId = await db.messages.add(initData);
  currentMessages.value.push({ ...initData, id: messageId });
};
onMounted(async () => {
  currentChat.value = await db.chats.where({ id: chatId }).first();
  currentMessages.value = await db.messages.where({ chatId }).toArray();
  if (initMessageId) {
    createInitMessage();
  }
});
watch(
  () => route.params.id,
  async (newId: string) => {
    chatId = Number(newId);
    currentChat.value = await db.chats.where({ id: chatId }).first();
    currentMessages.value = await db.messages.where({ chatId }).toArray();
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
