<template>
  <div class="mx-auto h-full w-[80%]">
    <div class="flex h-[85%] items-center">
      <AIProviderSelect :items="providers" v-model="selectedModel" />
    </div>
    <div class="flex h-[15%] items-center">
      <MessageInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AIProviderProps } from "../types";
import AIProviderSelect from "../components/AIProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
const selectedModel = ref("");

const providers: AIProviderProps[] = [
  {
    id: 1,
    name: "文心一言",
    desc: "文心一言 百度出品的大模型",
    models: ["ERNIE-4.0-8K", "ERNIE-3.5-8K", "ERNIE-Speed-8K"],
    avatar:
      "https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
  },
  {
    id: 2,
    name: "通义千问",
    desc: "通义千问",
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ["qwen-turbo", "qwen-plus", "qwen-max"],
    avatar:
      "https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg",
    createdAt: "2024-07-03",
    updatedAt: "2024-07-03",
  },
];
console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>
