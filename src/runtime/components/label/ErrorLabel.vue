<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    text?: string
    isRequired?: boolean
  }>(),
  {
    isRequired: true
  }
)
</script>

<template>
  <span :class="cn('text-xs text-flux-error font-medium', props.class)">
    <span v-if="isRequired">*</span>{{ props.text || 'This is Text' }}
  </span>
</template>
