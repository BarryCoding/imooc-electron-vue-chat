<script setup lang="ts">
import { ChatProps } from "./types";
import ChatList from "./components/ChatList.vue";
import AIProviderSelect from "./components/AIProviderSelect.vue";
import { Icon } from "@iconify/vue";
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
      <div class="h-[90%] overflow-y-auto">
        <ChatList :items="items" />
      </div>
      <div class="grid h-[10%] grid-cols-2 gap-2 p-2">
        <button
          class="inline-flex h-[32px] items-center justify-center rounded-[4px] border border-green-700 bg-green-700 px-[15px] py-[8px] text-sm text-white shadow-sm hover:bg-green-700/90"
        >
          <Icon icon="radix-icons:plus-circled" class="mr-2"></Icon>
          <span>新建聊天</span>
        </button>
        <button
          class="inline-flex h-[32px] items-center justify-center rounded-[4px] border border-green-700 bg-green-50 px-[15px] py-[8px] text-sm text-green-700 shadow-sm hover:bg-green-700 hover:text-white"
        >
          <Icon icon="radix-icons:gear" class="mr-2"></Icon>
          <span>应用设置</span>
        </button>
      </div>
    </div>

    <div class="h-full flex-1 bg-green-300 text-blue-700">
      <AIProviderSelect />
    </div>
  </div>
</template>
