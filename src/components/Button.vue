<template>
  <button
    class="vk-button inline-flex items-center justify-center shadow-sm disabled:pointer-events-none disabled:opacity-50"
    :class="[colorClasses, sizeClasses]"
    :disabled="disabled || loading"
  >
    <Icon :icon="iconWithLoading" class="mr-2" v-if="iconWithLoading" />
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

export type ButtonColor = "green" | "purple";
export type ButtonSize = "large" | "small" | "default";

export interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconName?: string;
}

defineOptions({
  name: "VkButton",
});

const {
  color = "green",
  size = "default",
  plain = false,
  disabled = false,
  loading = false,
  iconName = "",
} = withDefaults(defineProps<ButtonProps>(), {});

const colorVariants: Record<ButtonColor, any> = {
  green: {
    plain:
      "bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white",
    normal:
      "bg-green-700 text-white hover:bg-green-700/90 border border-green-700",
  },
  purple: {
    plain:
      "bg-purple-50 text-purple-700 hover:bg-purple-700 border border-purple-700 hover:text-white",
    normal:
      "bg-purple-700 text-white hover:bg-purple-700/90 border border-purple-700",
  },
};

const colorClasses = computed(() => {
  if (plain) {
    return colorVariants[color].plain;
  } else {
    return colorVariants[color].normal;
  }
});

const sizeClasses = computed(() => {
  switch (size) {
    case "large":
      return "h-[40px] py-[12px] px-[19px] rounded-[4px] text-base";
    case "small":
      return "h-[24px] py-[11px] px-[5px] rounded-[3px] text-xs";
    default:
      return "h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]";
  }
});

const iconWithLoading = computed(() => {
  return loading ? "line-md:loading-loop" : iconName;
});
</script>
