<script setup lang="ts">
import { ChatProps } from "./types";
import ChatList from "./components/ChatList.vue";
const items: ChatProps[] = [
  {
    id: 1,
    selectedModel: "GPT-3.5-Turbo",
    title: "什么是光合作用1",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 1,
  },
  {
    id: 2,
    selectedModel: "GPT-3.5-Turbo",
    title: "什么是光合作用",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 1,
  },
  {
    id: 3,
    selectedModel: "GPT-3.5-Turbo",
    title: "什么是光合作用",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 1,
  },
  {
    id: 4,
    selectedModel: "GPT-3.5-Turbo",
    title: "什么是光合作用, 你的说法很请正确，理解的很不错",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
    providerId: 1,
  },
];
</script>

<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[300px] border-r border-gray-300 bg-gray-200">
      <ChatList :items="items" />
    </div>

    <div class="h-full flex-1 bg-green-300 text-blue-700">content</div>
  </div>
</template>
