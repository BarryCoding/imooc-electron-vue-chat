import { default as Dexie, type EntityTable } from "dexie";
import type { AIProviderProps, ChatProps, MessageProps } from "./types";
import { mockProviders } from "./mocks/data";

export const db = new Dexie("vChatDatabase") as Dexie & {
  aiProviders: EntityTable<AIProviderProps, "id">;
  chats: EntityTable<ChatProps, "id">;
  messages: EntityTable<MessageProps, "id">;
};

db.version(1).stores({
  aiProviders: "++id, name",
  chats: "++id, providerId",
  messages: "++id, chatId",
});

export const initProviders = async () => {
  const count = await db.aiProviders.count();
  if (count === 0) {
    db.aiProviders.bulkAdd(mockProviders);
  }
};
