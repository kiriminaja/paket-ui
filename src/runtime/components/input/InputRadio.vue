<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    defaultValue?: string
    modelValue?: string
    class?: HTMLAttributes['class']
    id?: HTMLAttributes['id']
    size?: string
    value: string
    label: string
  }>(),
  {
    defaultValue: undefined,
    modelValue: undefined,
    class: undefined,
    id: undefined,
    size: '24px'
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})
</script>

<template>
  <label
    :for="id"
    :class="
      cn(
        'cursor-pointer flex items-center justify-start gap-3 py-2',
        props.class
      )
    "
  >
    <span
      class="w-5 h-5 flex-none rounded-full border-2 flex justify-center items-center"
      :class="[
        modelValue === value ? 'border-flux-primary' : 'border-onSurface'
      ]"
    >
      <span
        class="w-3 h-3 flex-none rounded-full"
        :class="[modelValue === value ? 'bg-flux-primary' : 'bg-transparent']"
      ></span>
    </span>
    <span class="text-sm">{{ label }}</span>
    <input
      :id="id"
      v-model="modelValue"
      class="hidden"
      type="radio"
      :value="value"
    />
  </label>
</template>
