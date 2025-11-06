<script setup lang="ts">
import { ListboxItem, ListboxItemIndicator } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  indicatorClass?: HTMLAttributes['class']
  indicator?: boolean
}>()
</script>

<template>
  <ListboxItem
    :class="
      cn(
        'select-none outline-none data-[highlighted]:bg-surface-container-low data-[state=checked]:bg-surface-container-low data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <ListboxItemIndicator
      v-if="props.indicator"
      :class="
        cn(
          'absolute left-0 inline-flex items-center justify-center',
          props.indicatorClass
        )
      "
    >
      <slot name="indicator">
        <Icon name="material-symbols:check" />
      </slot>
    </ListboxItemIndicator>
    <slot />
  </ListboxItem>
</template>
