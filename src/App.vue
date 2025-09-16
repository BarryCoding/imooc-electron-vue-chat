<script setup lang="ts">
import ChatList from "./components/ChatList.vue";
import Button from "./components/Button.vue";
import { chats, providers } from "./mocks/data";
import { onMounted } from "vue";
import { db } from "./db";

onMounted(async () => {
  // Create
  const insertedId = await db.aiProviders.add(providers[0]);
  console.log("insertedId", insertedId);
  // Read
  const items = await db.aiProviders.where({ id: 1 }).toArray();
  console.log("items", items);
  // Update
  const updatedItem = await db.aiProviders.update(1, { desc: "updated desc" });
  console.log("updatedItem", updatedItem);
  // Delete
  const deletedItem = await db.aiProviders.delete(1);
  console.log("deletedItem", deletedItem);
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
