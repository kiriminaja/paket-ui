<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  text?: string
  isRequired?: boolean
  as?: string
  hint?: string
}>()

const forwarded = useForwardProps(props)

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="flex gap-2 justify-between">
    <UiLabelBaseLabel v-bind="{ ...$attrs, ...forwarded, hint: undefined }" />
    <span class="text-xs text-flux-outline">
      {{ props.hint }}
    </span>
  </div>
</template>
