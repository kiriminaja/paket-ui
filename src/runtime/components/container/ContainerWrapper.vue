<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <UiCardBaseCard :class="props.class">
    <slot />
  </UiCardBaseCard>
</template>
