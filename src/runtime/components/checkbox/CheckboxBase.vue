<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: boolean
  modelValue?: boolean
  class?: HTMLAttributes['class']
  id?: HTMLAttributes['id']
  name?: string
  disabled?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const toggle = () => {
  if (props.disabled) return
  modelValue.value = !modelValue.value
}
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-center w-5 h-5 rounded-[4px] text-primaryContainer border-[1.5px] cursor-pointer',
        {
          'bg-flux-primary': modelValue
        },
        [modelValue ? 'border-flux-primary' : 'border-flux-outline'],
        props.class
      )
    "
    @click="toggle"
  >
    <input
      :id="props.id"
      v-model="modelValue"
      class="hidden"
      type="checkbox"
      :name="props.name"
      :disabled="props.disabled"
    />
    <Icon v-if="modelValue" name="material-symbols:check" size="16px" />
  </div>
</template>
