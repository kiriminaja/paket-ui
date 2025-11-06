<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  progressValue?: number
  class?: HTMLAttributes['class']
  classIndicator?: HTMLAttributes['class']
}>()

const percentage = computed(() => {
  if (props.progressValue === undefined) return 0
  if (props.progressValue < 0) return 0
  if (props.progressValue > 100) return 100
  return props.progressValue
})
</script>

<template>
  <ProgressRoot
    v-model="percentage"
    :class="
      cn(
        'rounded-full relative h-4 w-full overflow-hidden bg-surface-container-low',
        props.class
      )
    "
  >
    <ProgressIndicator
      :class="
        cn(
          'rounded-full block relative w-full h-full bg-flux-primary transition-transform overflow-hidden duration-500 ease-in-out',
          props.classIndicator
        )
      "
      :style="`transform: translateX(-${100 - percentage}%)`"
    />
  </ProgressRoot>
</template>
