<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  VisuallyHidden
} from 'reka-ui'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    class?: HTMLAttributes['class']
    dissmissOnOutsideClick?: boolean
    isScrollable?: boolean
  }>(),
  {
    title: undefined,
    description: undefined,
    class: undefined,
    dissmissOnOutsideClick: true,
    isScrollable: false
  }
)
</script>

<template>
  <DialogContent
    :class="
      cn(
        {
          'w-full max-w-[450px] focus:outline-none rounded-2xl bg-background dark:bg-surface-container dark:border dark:border-outline-variant shadow-xl':
            props.isScrollable
        },
        {
          'fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] focus:outline-none z-100':
            !props.isScrollable
        },
        props.class
      )
    "
    @pointer-down-outside="
      (event) => {
        if (!props.dissmissOnOutsideClick) return event.preventDefault()

        const originalEvent = event.detail.originalEvent
        const target = originalEvent.target as HTMLElement

        if (
          originalEvent.offsetX > target.clientWidth ||
          originalEvent.offsetY > target.clientHeight
        ) {
          event.preventDefault()
        }
      }
    "
  >
    <VisuallyHidden>
      <DialogTitle>{{ title }}</DialogTitle>
      <DialogDescription>{{ description }}</DialogDescription>
    </VisuallyHidden>

    <slot />
  </DialogContent>
</template>
