<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-vue";
import { AIProviderProps } from "../types";
import { Icon } from "@iconify/vue";

defineProps<{ items: AIProviderProps[] }>();

const selectedModel = defineModel<string>();
</script>

<template>
  <div class="provider-select w-full">
    <SelectRoot v-model="selectedModel">
      <SelectTrigger
        class="flex w-full items-center justify-between rounded-md border px-3 py-1.5 shadow-sm outline-none data-[placeholder]:text-gray-400"
      >
        <SelectValue placeholder="Select a model..." />
        <Icon icon="radix-icons:chevron-down" class="h-5 w-5" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent class="z-[100] rounded-md border bg-white shadow-md">
          <SelectViewport>
            <template v-for="(provider, index) in items" :key="provider.id">
              <SelectLabel class="flex h-7 items-center px-6 text-gray-500">
                <img
                  :src="provider.avatar"
                  :alt="provider.name"
                  class="mr-2 h-5 w-5 rounded"
                />
                {{ provider.name }}
              </SelectLabel>
              <SelectGroup>
                <SelectItem
                  class="relative flex h-7 cursor-pointer items-center rounded px-6 text-green-700 outline-none data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                  v-for="(model, index) in provider.models"
                  :key="index"
                  :value="`${provider.id}/${model}`"
                >
                  <SelectItemIndicator class="absolute left-2 w-6">
                    <Icon icon="radix-icons:check" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator
                v-if="index !== items.length - 1"
                class="my-2 h-[1px] bg-gray-300"
              />
            </template>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
