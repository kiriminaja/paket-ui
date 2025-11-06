<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="['inline-flex justify-center items-center gap-1', props.class]">
    <div
      class="w-3 h-3 animate-bounce rounded-full bg-surfaceContainerHigh dark:bg-on-surface-variant"
    ></div>
    <div
      class="w-3 h-3 animate-[bounce_1s_infinite_200ms] rounded-full bg-surfaceContainerHigh dark:bg-on-surface-variant"
    ></div>
    <div
      class="w-3 h-3 animate-[bounce_1s_infinite_400ms] rounded-full bg-surfaceContainerHigh dark:bg-on-surface-variant"
    ></div>
  </div>
</template>
