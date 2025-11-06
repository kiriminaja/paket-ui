<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  classViewport?: HTMLAttributes['class']
}>()

const scrollArea = useTemplateRef('scrollArea')

const scrollToBottom = () => {
  const container = scrollArea.value?.viewport
  if (container) {
    const top = scrollArea.value?.$el.scrollHeight
    container.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}
defineExpose({
  scrollArea,
  scrollToBottom
})
</script>

<template>
  <ScrollAreaRoot
    ref="scrollArea"
    :class="cn('w-full h-[400px] overflow-hidden', props.class)"
    style="--scrollbar-size: 10px"
  >
    <ScrollAreaViewport
      :class="cn('w-full h-full focus:outline-none', props.classViewport)"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 z-20 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-surface-container-low data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 group"
      orientation="vertical"
    >
      <ScrollAreaThumb
        class="flex-1 bg-outline-variant group-hover:bg-flux-outline rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-surface-container-low data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 group"
      orientation="horizontal"
    >
      <ScrollAreaThumb
        class="flex-1 bg-outline-variant group-hover:bg-flux-outline rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
