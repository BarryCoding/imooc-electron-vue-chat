<script setup lang="ts">
import { useRoute } from "vue-router";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";

import { ref, watch, computed } from "vue";
import { chats, messages } from "../mocks/data";
const route = useRoute();
const currentChatId = ref<string>("");
watch(
  () => route.params.id,
  (newId: string) => {
    currentChatId.value = newId;
  },
);

const currentChat = computed(() => {
  return chats.find((chat) => chat.id === Number(currentChatId.value));
});
const currentMessages = computed(() => {
  return messages.filter(
    (message) => message.chatId === Number(currentChatId.value),
  );
});
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
