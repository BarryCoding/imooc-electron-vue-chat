<script setup lang="ts">
import { AIProviderProps, ChatProps } from "./types";
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

const AIProviders: AIProviderProps[] = [
  {
    id: 1,
    name: "文心一言",
    desc: "文心一言 百度出品",
    models: ["ERNIE-4.0-8K", "ERNIE-3.5-8K", "ERNIE-Speed-8K"],
    avatar:
      "https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
  },
  {
    id: 2,
    name: "通义千问",
    desc: "通义千问 阿里出品",
    models: ["qwen-turbo", "qwen-plus", "qwen-max"],
    avatar:
      "https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
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
      <div class="flex h-full flex-1 items-center">
        <div class="mx-auto w-[80%]">
          <AIProviderSelect :items="AIProviders" />
        </div>
      </div>
    </div>
  </div>
</template>
