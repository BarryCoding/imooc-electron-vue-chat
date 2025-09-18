<script setup lang="ts">
import { useRoute } from "vue-router";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import { ref, watch, computed, onMounted } from "vue";
import { MessageProps } from "src/types";
import { useChatStore } from "../stores/chat";
import { useMessageStore } from "../stores/message";
import { ChatCompletionMessageParam } from "openai/resources/index";
import { useAiProviderStore } from "../stores/ai-provider";

const inputValue = ref("");
const aiProviderStore = useAiProviderStore();
const route = useRoute();
const chatId = ref(Number(route.params.id as string));
const chatStore = useChatStore();
const currentChat = computed(() =>
  chatStore.items.find((item) => item.id === chatId.value),
);
const messageStore = useMessageStore();
const currentMessages = computed(() => messageStore.currentMessages);
const sendedMessages = computed(() =>
  messageStore.currentMessages
    .filter((message) => message.status !== "loading")
    .map((message) => {
      return {
        role: message.type === "question" ? "user" : "assistant",
        content: message.content,
      } as ChatCompletionMessageParam;
    }),
);
const initMessageId = Number(route.query.init as string);

const sendNewMessage = async (question: string) => {
  if (question) {
    const date = new Date().toISOString();
    await messageStore.createMessage({
      content: question,
      chatId: chatId.value,
      createdAt: date,
      updatedAt: date,
      type: "question",
    });
    inputValue.value = "";
    createInitMessage();
  }
};

const createInitMessage = async () => {
  const initData: Omit<MessageProps, "id"> = {
    content: "",
    status: "loading",
    type: "answer",
    chatId: chatId.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const messageId = await messageStore.createMessage(initData);
  if (currentChat.value) {
    const currentProvider = aiProviderStore.items.find(
      (item) => item.id === currentChat.value?.providerId,
    );
    if (currentProvider) {
      window.electronAPI.startChat({
        messages: sendedMessages.value,
        providerName: currentProvider.name,
        selectedModel: currentChat.value.selectedModel,
        messageId,
      });
    }
  }
};
onMounted(async () => {
  await messageStore.fetchMessagesByChatId(chatId.value);
  if (initMessageId) {
    createInitMessage();
  }
  window.electronAPI.onUpdateMessage(async (streamData) => {
    messageStore.updateMessage(streamData);
  });
});
watch(
  () => route.params.id,
  async (newId: string) => {
    chatId.value = Number(newId);
    await messageStore.fetchMessagesByChatId(chatId.value);
  },
);
</script>

<template>
  <div
    class="flex h-[10%] items-center justify-between border-b border-gray-300 bg-gray-200 px-3"
    v-if="currentChat"
  >
    <h3 class="font-semibold text-gray-900">{{ currentChat.title }}</h3>
    <span class="text-sm text-gray-500">{{ currentChat.updatedAt }}</span>
  </div>
  <div class="mx-auto h-[75%] w-[80%] overflow-y-auto pt-2">
    <MessageList :messages="currentMessages" />
  </div>
  <div class="mx-auto flex h-[15%] w-[80%] items-center">
    <MessageInput
      @create="sendNewMessage"
      v-model="inputValue"
      :disabled="messageStore.isLoadingMessage"
    />
  </div>
</template>
