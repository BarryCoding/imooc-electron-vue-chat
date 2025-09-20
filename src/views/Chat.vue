<script setup lang="ts">
import { useRoute } from "vue-router";
import MessageInput from "../components/MessageInput.vue";
import MessageList from "../components/MessageList.vue";
import { ref, watch, computed, onMounted, nextTick } from "vue";
import { MessageProps, MessageStatus } from "src/types";
import { useChatStore } from "../stores/chat";
import { useMessageStore } from "../stores/message";
import { useAiProviderStore } from "../stores/ai-provider";

const scrollRef = ref<{ ref: HTMLDivElement }>();
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
        ...(message.imagePath && { imagePath: message.imagePath }),
      };
    }),
);
const initMessageId = Number(route.query.init as string);

const messageScrollToBottom = async (behavior: ScrollBehavior = "smooth") => {
  await nextTick();
  if (scrollRef.value) {
    scrollRef.value.ref.scrollIntoView({ block: "end", behavior });
  }
};

// REFACTOR: not DRY
const sendNewMessage = async (question: string, imagePath?: string) => {
  if (question) {
    let copiedImagePath: string | undefined;
    if (imagePath) {
      try {
        copiedImagePath =
          await window.electronAPI.copyImageToUserDir(imagePath);
        console.log("copiedImagePath", copiedImagePath);
      } catch (error) {
        console.error("Failed to copy image:", error);
      }
    }
    const date = new Date().toISOString();
    await messageStore.createMessage({
      content: question,
      chatId: chatId.value,
      createdAt: date,
      updatedAt: date,
      type: "question",
      ...(copiedImagePath && { imagePath: copiedImagePath }),
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
  await messageScrollToBottom();
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
let currentMessageListHeight = 0;
let streamContent = "";
onMounted(async () => {
  await messageStore.fetchMessagesByChatId(chatId.value);
  await messageScrollToBottom("instant");
  if (initMessageId) {
    createInitMessage();
  }
  // TODO: 检查消息是否结束，如果结束，则重置高度
  // 方案一：watch 监听消息列表高度变化

  const checkAndScrollToBottom = async () => {
    if (scrollRef.value) {
      const newHeight = scrollRef.value.ref.clientHeight;
      console.log("the current Height", currentMessageListHeight);
      console.log("the new Height", newHeight);
      if (newHeight > currentMessageListHeight) {
        console.log("scroll to bottom");
        currentMessageListHeight = newHeight;
        await messageScrollToBottom();
      }
    }
  };
  window.electronAPI.onUpdateMessage(async (streamData) => {
    const { messageId, data } = streamData;
    streamContent += data.result;
    const updatedData = {
      content: streamContent,
      status: (data.is_end ? "finished" : "streaming") as MessageStatus,
      updatedAt: new Date().toISOString(),
    };
    await messageStore.updateMessage(messageId, updatedData);
    await checkAndScrollToBottom();
    if (data.is_end) {
      streamContent = "";
    }
  });
});
watch(
  () => route.params.id,
  async (newId: string) => {
    chatId.value = Number(newId);
    await messageStore.fetchMessagesByChatId(chatId.value);
    currentMessageListHeight = 0;
    await messageScrollToBottom("instant");
  },
);
</script>

<template>
  <div
    class="flex h-[10%] items-center justify-between border-b border-gray-300 bg-gray-200 px-[5%]"
    v-if="currentChat"
  >
    <h3 class="font-semibold text-gray-900">{{ currentChat.title }}</h3>
    <span class="text-sm text-gray-500">{{ currentChat.updatedAt }}</span>
  </div>
  <div class="mx-auto h-[75%] w-full overflow-y-auto px-[5%] pt-2">
    <MessageList :messages="currentMessages" ref="scrollRef" />
  </div>
  <div class="mx-auto flex h-[15%] w-[90%] items-center">
    <MessageInput
      @create="sendNewMessage"
      v-model="inputValue"
      :disabled="messageStore.isLoadingMessage"
    />
  </div>
</template>
