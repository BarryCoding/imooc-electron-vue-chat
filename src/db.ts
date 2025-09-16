import { default as Dexie, type EntityTable } from "dexie";
import type { AIProviderProps } from "./types";

export const db = new Dexie("vChatDatabase") as Dexie & {
  aiProviders: EntityTable<AIProviderProps, "id">;
};

db.version(1).stores({
  aiProviders: "++id, name",
});
