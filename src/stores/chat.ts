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

  async function deleteChat(chatId: number) {
    // Delete all messages associated with this chat
    await db.messages.where({ chatId }).delete();
    // Delete the chat itself
    await db.chats.delete(chatId);
    // Remove from local state
    const index = items.value.findIndex((item) => item.id === chatId);
    if (index !== -1) {
      items.value.splice(index, 1);
    }
    // Reset current chat if it was deleted
    if (currentChatId.value === chatId) {
      currentChatId.value = -1;
    }
  }

  return {
    items,
    currentChatId,
    setCurrentChatId,

    createChat,
    fetchChats,
    deleteChat,
  };
});
