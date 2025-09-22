<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import Button from "./Button.vue";
import { Icon } from "@iconify/vue";

defineProps<{
  disabled?: boolean;
}>();

const { t } = useI18n();

const emit = defineEmits<{
  create: [value: string, filePath?: string];
}>();

const userMessage = defineModel<string>();
const imagePreview = ref("");
let selectedImage: File | null = null;

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedImage = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = (e) => {
      if (e.target?.result) {
        imagePreview.value = e.target.result as string;
      }
    };
  }
};
const onCreate = () => {
  if (userMessage.value && userMessage.value?.trim() !== "") {
    if (selectedImage) {
      const filePath = window.electronAPI.getFilePath(selectedImage);
      emit("create", userMessage.value, filePath);
    } else {
      emit("create", userMessage.value);
    }
    selectedImage = null;
    imagePreview.value = "";
  }
};
</script>

<template>
  <div
    class="message-input w-full rounded-lg border border-gray-300 px-2 py-1 shadow-sm focus-within:border-green-700"
  >
    <div v-if="imagePreview" class="relative mb-2 flex items-center">
      <img
        :src="imagePreview"
        alt="upload image preview"
        class="h-24 w-24 rounded object-cover"
      />
    </div>
    <div class="flex items-center">
      <label>
        <Icon
          icon="radix-icons:image"
          width="24"
          height="24"
          class="mr-2"
          :class="[
            disabled
              ? 'cursor-not-allowed text-gray-300'
              : 'cursor-pointer text-gray-400 hover:text-gray-600',
          ]"
        />
        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
          :disabled="disabled"
        />
      </label>

      <input
        class="flex-1 border-0 bg-white outline-none focus:ring-0"
        type="text"
        v-model="userMessage"
        :placeholder="t('chat.sendMessage')"
        :disabled="disabled"
      />
      <Button
        icon-name="radix-icons:paper-plane"
        @click="onCreate"
        :disabled="disabled"
      >
        {{ t("common.send") }}
      </Button>
    </div>
  </div>
</template>
