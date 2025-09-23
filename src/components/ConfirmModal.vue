<template>
  <DialogRoot :open="show" @update:open="$emit('update:show', $event)">
    <DialogPortal>
      <DialogOverlay class="bg-opacity-50 fixed inset-0 z-50 bg-black" />
      <DialogContent
        class="fixed top-1/2 left-1/2 z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg"
      >
        <div class="flex items-center gap-4">
          <div class="flex-shrink-0">
            <Icon
              icon="material-symbols:warning"
              class="h-6 w-6 text-red-600"
            />
          </div>
          <div class="flex-1">
            <DialogTitle class="text-lg font-medium text-gray-900">
              {{ title }}
            </DialogTitle>
          </div>
        </div>

        <DialogDescription class="text-sm text-gray-500">
          {{ message }}
        </DialogDescription>

        <div class="flex justify-end gap-3">
          <DialogClose as-child>
            <button
              class="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              {{ t("common.cancel") }}
            </button>
          </DialogClose>
          <button
            @click="$emit('confirm')"
            class="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            {{ t("common.confirm") }}
          </button>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "radix-vue";

const { t } = useI18n();

defineProps<{
  show: boolean;
  title: string;
  message: string;
}>();

defineEmits<{
  "update:show": [value: boolean];
  confirm: [];
}>();
</script>
