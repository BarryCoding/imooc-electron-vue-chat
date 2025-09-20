import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { MessageProps } from "../types";
import { db } from "../db";

export const useMessageStore = defineStore("message", () => {
  const currentMessages = ref<MessageProps[]>([]);
  const isLoadingMessage = computed(() =>
    ["loading", "streaming"].includes(
      currentMessages.value.at(-1)?.status || "",
    ),
  );

  async function fetchMessagesByChatId(chatId: number) {
    currentMessages.value = await db.messages.where({ chatId }).toArray();
  }

  async function createMessage(message: Omit<MessageProps, "id">) {
    const id = await db.messages.add(message);
    currentMessages.value.push({ ...message, id });
    return id;
  }

  async function updateMessage(
    messageId: number,
    updatedData: Partial<MessageProps>,
  ) {
    await db.messages.update(messageId, updatedData);
    const index = currentMessages.value.findIndex(
      (item) => item.id === messageId,
    );
    if (index !== -1) {
      currentMessages.value[index] = {
        ...currentMessages.value[index],
        ...updatedData,
      };
    }
  }

  return {
    currentMessages,
    isLoadingMessage,

    fetchMessagesByChatId,
    createMessage,
    updateMessage,
  };
});
