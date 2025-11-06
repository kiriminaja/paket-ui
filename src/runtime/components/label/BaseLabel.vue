<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  text?: string
  isRequired?: boolean
  as?: string
}>()
</script>

<template>
  <component
    :is="as ?? 'label'"
    :class="cn('text-xs font-medium', props.class)"
  >
    {{ props.text || 'This is Text' }}
    <span v-if="isRequired" class="text-flux-error">*</span>
  </component>
</template>
