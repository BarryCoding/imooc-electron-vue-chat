<script setup lang="ts">
import { useRouter } from "vue-router";
import { ChatProps } from "../types";
import dayjs from "dayjs";
import { useChatStore } from "../stores/chat";

defineProps<{ items: ChatProps[] }>();

const router = useRouter();
const chatStore = useChatStore();

const goToChat = (id: number) => {
  chatStore.setCurrentChatId(id);
  router.push({
    path: `/chat/${id}`,
  });
};
</script>

<template>
  <div class="conversation-list">
    <div
      :class="{
        'bg-gray-100 hover:bg-gray-300': chatStore.currentChatId === item.id,
        'bg-white hover:bg-gray-200': chatStore.currentChatId !== item.id,
      }"
      v-for="item in items"
      :key="item.id"
      @click="goToChat(item.id)"
    >
      <div
        class="flex items-center justify-between text-sm leading-5 text-gray-500"
      >
        <span>{{ item.selectedModel }}</span>
        <span>{{ dayjs(item.updatedAt).format("YYYY-MM-DD") }}</span>
      </div>
      <h2 class="truncate leading-6 font-semibold text-gray-900">
        {{ item.title }}
      </h2>
    </div>
  </div>
</template>
