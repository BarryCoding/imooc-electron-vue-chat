<script setup lang="ts">
import ChatList from "./components/ChatList.vue";
import Button from "./components/Button.vue";
import { onMounted, computed } from "vue";
import { db, initProviders } from "./db";
import { useChatStore } from "./stores/chat";
import { mockChats } from "./mocks/data";

let index = 0;
const chatStore = useChatStore();
const items = computed(() => chatStore.items);

onMounted(async () => {
  await initProviders();
  chatStore.items = await db.chats.toArray();
});

const testAdd = () => {
  index++;
  chatStore.items.push(mockChats[index]);
};
const testReset = () => {
  chatStore.$reset();
};
</script>

<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[300px] border-r border-gray-300 bg-gray-200">
      <div class="h-[90%] overflow-y-auto">
        <ChatList :items="items" />
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
        <Button
          icon-name="radix-icons:chat-bubble"
          class="w-full"
          @click="testAdd"
        >
          测试新增
        </Button>
        <Button
          icon-name="radix-icons:chat-bubble"
          class="w-full"
          @click="testReset"
        >
          测试Reset
        </Button>
      </div>
    </div>

    <div class="h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>
