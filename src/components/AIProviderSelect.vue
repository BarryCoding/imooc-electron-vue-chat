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

defineProps<{ items: AIProviderProps[] }>();
</script>

<template>
  <div class="provider-select">
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder="Select a model..." />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <template v-for="provider in items" :key="provider.id">
              <SelectLabel>
                <img :src="provider.avatar" :alt="provider.name" />
                {{ provider.name }}
              </SelectLabel>
              <SelectGroup>
                <SelectItem
                  v-for="(model, index) in provider.models"
                  :key="index"
                  :value="model"
                >
                  <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
            </template>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
