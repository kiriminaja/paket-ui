<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const SELF_CONTEXT = Symbol('BaseCard')
const parentContext = inject(SELF_CONTEXT, null)
const isNested = !!parentContext

provide(SELF_CONTEXT, true)
</script>

<template>
  <div
    :class="
      cn(
        'p-5 rounded-xl bg-background dark:bg-surface-container border border-outlineVariant',
        {
          'shadow border-0':
            !isNested && !props.class?.toString().includes('border')
        },
        props.class
      )
    "
  >
    <slot name="header" />
    <slot />
  </div>
</template>
