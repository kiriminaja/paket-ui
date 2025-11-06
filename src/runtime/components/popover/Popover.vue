<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger
} from 'reka-ui'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const open = ref(false)
</script>

<template>
  <HoverCardRoot v-model:open="open">
    <HoverCardTrigger as="div" :class="cn(props.class)">
      <slot />
    </HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="z-90 max-w-72 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-on-inverse-surface select-none rounded-lg bg-inverse-surface p-2.5 text-xs shadow-sm will-change-[transform,opacity]"
        :side-offset="5"
      >
        <slot name="content" />
        <HoverCardArrow class="fill-inverse-surface" :width="12" :height="6" />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
