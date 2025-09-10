<script setup lang="ts">
import { Icon } from "@iconify/vue";

const emit = defineEmits<{
  create: [value: string];
}>();
const userMessage = defineModel<string>();
const onCreate = () => {
  if (userMessage.value && userMessage.value?.trim() !== "") {
    emit("create", userMessage.value);
  }
};
</script>

<template>
  <div
    class="message-input flex w-full items-center rounded-lg border border-gray-300 px-2 py-1 shadow-sm focus-within:border-green-700"
  >
    <input
      class="flex-1 border-0 bg-white outline-none focus:ring-0"
      type="text"
      v-model="userMessage"
    />
    <button
      class="inline-flex h-[32px] items-center justify-center rounded-[4px] border border-green-700 bg-green-700 px-[15px] py-[8px] text-sm text-white shadow-sm hover:bg-green-700/90"
      @click="onCreate"
    >
      <Icon icon="radix-icons:paper-plane" class="mr-2"></Icon>
      发送
    </button>
  </div>
</template>
