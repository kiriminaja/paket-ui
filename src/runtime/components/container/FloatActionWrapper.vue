<template>
  <Transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="show"
      :class="
        cn([
          'fixed bottom-5 left-1/2 -translate-x-1/2 transition-all z-30 rounded-xl p-3 bg-background dark:bg-surface-container-high border border-outline-variant shadow-lg',
          props.class
        ])
      "
    >
      <slot />
    </div>
  </Transition>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    show?: boolean
  }>(),
  {
    class: undefined,
    show: false
  }
)
</script>
