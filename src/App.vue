<script setup lang="ts">
import ChatList from "./components/ChatList.vue";
import Button from "./components/Button.vue";
import { Icon } from "@iconify/vue";
import { chats } from "./mocks/data";
</script>

<template>
  <div class="flex h-screen items-center justify-between">
    <div class="h-full w-[300px] border-r border-gray-300 bg-gray-200">
      <div class="h-[90%] overflow-y-auto">
        <ChatList :items="chats" />
      </div>
      <div class="grid h-[10%] grid-cols-2 gap-2 p-2">
        <RouterLink
          to="/"
          class="inline-flex h-[32px] items-center justify-center rounded-[4px] border border-green-700 bg-green-700 px-[15px] py-[8px] text-sm text-white shadow-sm hover:bg-green-700/90"
        >
          <Icon icon="radix-icons:plus-circled" class="mr-2" />
          <span>新建聊天</span>
        </RouterLink>
        <RouterLink
          to="/settings"
          class="inline-flex h-[32px] items-center justify-center rounded-[4px] border border-green-700 bg-green-50 px-[15px] py-[8px] text-sm text-green-700 shadow-sm hover:bg-green-700 hover:text-white"
        >
          <Icon icon="radix-icons:gear" class="mr-2"></Icon>
          <span>应用设置</span>
        </RouterLink>
      </div>
    </div>

    <div class="h-full flex-1">
      <Button color="purple" plain> Hello there</Button>
      <RouterView />
    </div>
  </div>
</template>
