<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    thumbClass?: HTMLAttributes['class']
    modelValue?: boolean
  }>(),
  {
    class: '',
    thumbClass: '',
    modelValue: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: false
})

const slots = useSlots()
</script>

<template>
  <SwitchRoot
    v-model="modelValue"
    :class="
      cn(
        'w-12 h-7 shrink-0 shadow-sm flex data-[state=unchecked]:bg-surface-container-highest data-[state=checked]:bg-flux-primary border-2 border-flux-outline data-[state=checked]:border-flux-primary rounded-full relative transition-[background] focus-within:outline-flux-primary',
        props.class
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          {
            'w-3 h-3 translate-x-1.5': !slots.icon,
            'w-5 h-5 translate-x-0.5': slots.icon
          },
          'my-auto bg-flux-outline data-[state=unchecked]:text-surface-container-highest data-[state=check]:text-flux-primary flex items-center justify-center shadow-xl rounded-full transition-transform will-change-transform',
          'data-[state=checked]:translate-x-[calc(100%+1px)] data-[state=checked]:bg-on-primary data-[state=checked]:w-5 data-[state=checked]:h-5',
          props.thumbClass
        )
      "
    >
      <slot name="icon" :value="modelValue" />
    </SwitchThumb>
  </SwitchRoot>
</template>
