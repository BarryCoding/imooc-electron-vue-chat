<script setup lang="ts">
import ChatList from "./components/ChatList.vue";
import Button from "./components/Button.vue";
import { onMounted, ref } from "vue";
import { db, initProviders } from "./db";
import type { ChatProps } from "./types";

const chats = ref<ChatProps[]>([]);
onMounted(async () => {
  await initProviders();
  chats.value = await db.chats.toArray();
});
</script>

<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[300px] border-r border-gray-300 bg-gray-200">
      <div class="h-[90%] overflow-y-auto">
        <ChatList :items="chats" />
      </div>
      <div class="grid h-[10%] grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:plus-circled" class="w-full">
            新建聊天
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" class="w-full">
            应用设置
          </Button>
        </RouterLink>
      </div>
    </div>

    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>
