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
import { providers } from "../mocks/data";
import AIProviderSelect from "../components/AIProviderSelect.vue";
import MessageInput from "../components/MessageInput.vue";
const selectedModel = ref("");
</script>
