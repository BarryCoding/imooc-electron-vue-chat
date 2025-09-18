import { defineStore } from "pinia";
import { AIProviderProps } from "../types";
import { ref } from "vue";
import { db } from "../db";

export const useAiProviderStore = defineStore("aiProvider", () => {
  const items = ref<AIProviderProps[]>([]);

  async function fetchAiProviders() {
    items.value = await db.aiProviders.toArray();
  }

  return {
    items,

    fetchAiProviders,
  };
});
