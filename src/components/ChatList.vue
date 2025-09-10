<script setup lang="ts">
import { ChatProps } from "../types";

defineProps<{ items: ChatProps[] }>();
</script>

<template>
  <div class="conversation-list">
    <div
      class="item cursor-pointer border-t border-gray-300 bg-white p-2 hover:bg-gray-200"
      v-for="item in items"
      :key="item.id"
    >
      <RouterLink to="/conversation">
        <div
          class="flex items-center justify-between text-sm leading-5 text-gray-500"
        >
          <span>{{ item.selectedModel }}</span>
          <span>{{ item.updatedAt }}</span>
        </div>
        <h2 class="truncate leading-6 font-semibold text-gray-900">
          {{ item.title }}
        </h2>
      </RouterLink>
    </div>
  </div>
</template>
