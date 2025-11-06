<script setup lang="ts">
import { ListboxContent, ListboxRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  scrollableAreaClass?: HTMLAttributes['class']
}>()
</script>

<template>
  <ListboxRoot>
    <UiScrollAreaBase :class="scrollableAreaClass">
      <ListboxContent :class="cn('flex flex-col', props.class)">
        <slot />
      </ListboxContent>
    </UiScrollAreaBase>
  </ListboxRoot>
</template>
