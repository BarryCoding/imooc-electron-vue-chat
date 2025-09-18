<script setup lang="ts">
import Button from "./Button.vue";

defineProps<{
  disabled?: boolean;
}>();

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
      :disabled="disabled"
    />
    <Button
      icon-name="radix-icons:paper-plane"
      @click="onCreate"
      :disabled="disabled"
    >
      发送
    </Button>
  </div>
</template>
