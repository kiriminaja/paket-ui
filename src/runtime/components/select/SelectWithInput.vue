<script setup lang="ts">
import { useElementSize, useVModel } from '@vueuse/core'
import type { InputHTMLAttributes } from 'vue'

const props = defineProps<{
  modelValue?: string
  modelValueOption?: string
  class?: InputHTMLAttributes['class']
  invalid?: boolean
  errorMessage?: string
  placeholder?: InputHTMLAttributes['placeholder']
  options: {
    id: string
    label: string
  }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue' | 'update:modelValueOption', value?: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emit)

const modelValueOption = useVModel(props, 'modelValueOption', emit)

const elementWrapper = useTemplateRef('elementWrapper')

const { width } = useElementSize(elementWrapper)
</script>

<template>
  <div
    ref="elementWrapper"
    :class="
      cn(
        'w-full flex items-center gap-1 rounded-lg border divide-x divide-flux-outline border-outlineVariant ring-0',
        [
          props.invalid
            ? 'ring-offset-1 ring-offset-flux-error bg-surfaceContainerLow'
            : 'ring-offset-0 ring-offset-flux-primary bg-background dark:bg-surface-container-high'
        ],
        props.class
      )
    "
  >
    <UiSelectBase
      v-model="modelValueOption"
      class="border-none focus-visible:ring-offset-0 text-xs rounded-r-none ring-offset-0"
      :options="props.options"
      :invalid="props.invalid"
      :width-content="Math.round(width) + 'px'"
    />
    <UiInputField
      v-model="modelValue"
      :placeholder="props.placeholder"
      class="border-none flex-1 pl-0 focus-visible:ring-offset-0 rounded-l-none ring-offset-0"
      :invalid="props.invalid"
    />
  </div>
</template>
