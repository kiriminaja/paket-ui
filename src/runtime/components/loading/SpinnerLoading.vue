<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div :class="['w-full flex justify-center items-center', props.class]">
    <div class="w-10 h-10 animate-spin rounded-full border-4 border-surfaceContainerHigh border-t-transparent"></div>
  </div>
</template>