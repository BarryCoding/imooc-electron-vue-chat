import { defineStore } from "pinia";
import { ChatProps } from "../types";

export interface ChatStore {
  items: ChatProps[];
}

export const useChatStore = defineStore("chat", {
  state: (): ChatStore => {
    return {
      items: [],
    };
  },
});
