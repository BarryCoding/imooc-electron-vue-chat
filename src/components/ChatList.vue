<script setup lang="ts">
import { useRouter } from "vue-router";
import { ChatProps } from "../types";
import dayjs from "dayjs";
import { useChatStore } from "../stores/chat";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import ConfirmModal from "./ConfirmModal.vue";

defineProps<{ items: ChatProps[] }>();

const router = useRouter();
const chatStore = useChatStore();
const { t } = useI18n();

const showDeleteConfirm = ref(false);
const chatToDelete = ref<number | null>(null);

const goToChat = (id: number) => {
  chatStore.setCurrentChatId(id);
  router.push({
    path: `/chat/${id}`,
  });
};

const handleDeleteClick = (event: Event, chatId: number) => {
  event.stopPropagation(); // Prevent triggering goToChat
  chatToDelete.value = chatId;
  showDeleteConfirm.value = true;
};

const handleDeleteConfirm = async () => {
  if (chatToDelete.value) {
    await chatStore.deleteChat(chatToDelete.value);
    showDeleteConfirm.value = false;
    chatToDelete.value = null;

    // If we deleted the current chat, navigate to home
    if (chatStore.currentChatId === chatToDelete.value) {
      router.push("/");
    }
  }
};
</script>

<template>
  <div class="conversation-list">
    <div
      :class="{
        'bg-gray-100 hover:bg-gray-300': chatStore.currentChatId === item.id,
        'bg-white hover:bg-gray-200': chatStore.currentChatId !== item.id,
      }"
      v-for="item in items"
      :key="item.id"
      @click="goToChat(item.id)"
      class="group relative cursor-pointer border-b border-gray-200 p-3"
    >
      <div
        class="flex items-center justify-between text-sm leading-5 text-gray-500"
      >
        <span>{{ item.selectedModel }}</span>
        <span>{{ dayjs(item.updatedAt).format("YYYY-MM-DD") }}</span>
      </div>
      <h2 class="truncate leading-6 font-semibold text-gray-900">
        {{ item.title }}
      </h2>

      <!-- Delete Icon - Only visible on hover -->
      <button
        @click="handleDeleteClick($event, item.id)"
        class="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full p-1 text-red-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-100 hover:text-red-700"
        :title="t('chat.deleteChat')"
      >
        <Icon icon="material-symbols:delete-outline" class="h-4 w-4" />
      </button>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <ConfirmModal
    :show="showDeleteConfirm"
    :title="t('chat.deleteChatTitle')"
    :message="t('chat.deleteChatConfirm')"
    @confirm="handleDeleteConfirm"
    @update:show="showDeleteConfirm = $event"
  />
</template>
