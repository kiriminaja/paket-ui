<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger
} from 'reka-ui'
import { ref, type HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  triggerClass?: HTMLAttributes['class']
  openOnMount?: boolean
}>()

const isOpen = ref(props.openOnMount ?? false)
</script>

<template>
  <CollapsibleRoot
    v-model:open="isOpen"
    :unmount-on-hide="false"
    :class="cn('flex flex-col', props.class)"
  >
    <CollapsibleTrigger :class="cn('cursor-default', props.triggerClass)">
      <slot name="trigger" :is-open="isOpen"></slot>
    </CollapsibleTrigger>

    <CollapsibleContent class="CollapsibleContent">
      <slot></slot>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
.CollapsibleContent {
  overflow: hidden;
}
.CollapsibleContent[data-state='open'] {
  animation: slideDown 300ms ease-out;
}
.CollapsibleContent[data-state='closed'] {
  animation: slideUp 300ms ease-out;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-collapsible-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-collapsible-content-height);
  }
  to {
    height: 0;
  }
}
</style>
