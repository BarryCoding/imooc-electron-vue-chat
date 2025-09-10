<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { MessageProps } from "../types";
defineProps<{ messages: MessageProps[] }>();
</script>

<template>
  <div class="message-list">
    <div
      class="message-item mb-3"
      v-for="message in messages"
      :key="message.id"
    >
      <div class="flex" :class="{ 'justify-end': message.type === 'question' }">
        <div>
          <div
            class="mb-2 text-sm text-gray-500"
            :class="{ 'text-right': message.type === 'question' }"
          >
            {{ message.createdAt }}
          </div>
          <div
            class="message-question rounded-md bg-green-700 p-2 text-white"
            v-if="message.type === 'question'"
          >
            {{ message.content }}
          </div>
          <div
            class="message-question rounded-md bg-gray-200 p-2 text-gray-700"
            v-else
          >
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading"></Icon>
            </template>
            <template v-else>
              {{ message.content }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
