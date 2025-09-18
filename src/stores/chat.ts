import { defineStore } from "pinia";
import { ChatProps } from "../types";
import { ref } from "vue";
import { db } from "../db";

export const useChatStore = defineStore("chat", () => {
  const items = ref<ChatProps[]>([]);
  const currentChatId = ref<number>(-1);

  const setCurrentChatId = (id: number) => {
    currentChatId.value = id;
  };

  async function fetchChats() {
    items.value = await db.chats.toArray();
  }

  async function createChat(chat: Omit<ChatProps, "id">) {
    const id = await db.chats.add(chat);
    items.value.push({ ...chat, id });
    return id;
  }

  return {
    items,
    currentChatId,
    setCurrentChatId,

    createChat,
    fetchChats,
  };
});
