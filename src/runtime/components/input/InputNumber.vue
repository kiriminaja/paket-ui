<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  modelValue?: number
  defaultValue?: number
  class?: HTMLAttributes['class']
  inputClass?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: number): void
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue
})
</script>

<template>
  <NumberFieldRoot
    id="age"
    v-model="modelValue"
    :min="1"
    :default-value="props.defaultValue ?? 1"
    :class="
      cn(
        'flex items-center rounded-full h-8 focus:ring-1 justify-center focus:ring-flux-primary',
        props.class
      )
    "
  >
    <NumberFieldDecrement
      class="p-1 disabled:cursor-not-allowed bg-primary-container rounded-full hover:bg-flux-primary hover:text-on-primary"
    >
      <Icon name="material-symbols:check-indeterminate-small" size="20px" />
    </NumberFieldDecrement>
    <NumberFieldInput
      :class="
        cn(
          'bg-transparent w-12 tabular-nums text-center focus:outline-0 p-1',
          props.inputClass
        )
      "
    />
    <NumberFieldIncrement
      class="p-1 disabled:cursor-not-allowed bg-primary-container rounded-full hover:bg-flux-primary hover:text-on-primary"
    >
      <Icon name="material-symbols:add" size="20px" />
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
