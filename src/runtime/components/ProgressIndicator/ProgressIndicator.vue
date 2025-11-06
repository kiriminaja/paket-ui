<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  inactiveClass?: HTMLAttributes['class']
  value?: number
  max?: number
}>()

const percentage = computed(() => {
  if (props.max && props.value) {
    return Math.round((props.value / props.max) * 100)
  }
  return 0
})
</script>
<template>
  <div
    :class="
      cn(
        'w-full flex text-flux-primary rounded-full h-3 gap-1 items-center',
        props.class
      )
    "
  >
    <div
      v-if="percentage >= 1"
      class="shrink-0 h-full bg-current rounded-full transition-all"
      :style="{
        width: percentage + '%'
      }"
    ></div>
    <div
      v-if="percentage < 100"
      :class="
        cn(
          'bg-secondary-container h-full rounded-full grow relative transition-all',
          props.inactiveClass
        )
      "
    >
      <span
        class="bg-current rounded-full w-1.5 h-1.5 absolute top-1/2 right-0.5 -translate-y-1/2"
      />
    </div>
  </div>
</template>
