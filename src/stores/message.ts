import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { MessageProps, UpdatedStreamData } from "../types";
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

  async function updateMessage(streamData: UpdatedStreamData) {
    const { messageId, data } = streamData;
    const currentMessage = await db.messages.where({ id: messageId }).first();
    if (currentMessage) {
      const updatedData = {
        content: currentMessage.content + data.result,
        status: data.is_end ? "finished" : "streaming",
        updatedAt: new Date().toISOString(),
      } as const;
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
  }

  return {
    currentMessages,
    isLoadingMessage,

    fetchMessagesByChatId,
    createMessage,
    updateMessage,
  };
});
