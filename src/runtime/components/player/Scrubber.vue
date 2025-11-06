<script setup lang="ts">
import { useEventListener, useMouseInElement, useVModel } from '@vueuse/core'

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  secondary: { type: Number, default: 0 },
  modelValue: { type: Number, required: true }
})

const emit = defineEmits(['update:modelValue'])

const scrubber = shallowRef<HTMLDivElement>()
const scrubbing = shallowRef(false)
const pendingValue = shallowRef(0)

useEventListener('mouseup', () => (scrubbing.value = false), { passive: true })

const value = useVModel(props, 'modelValue', emit)
const { elementX, elementWidth } = useMouseInElement(scrubber)

watch([scrubbing, elementX], () => {
  const progress = Math.max(0, Math.min(1, elementX.value / elementWidth.value))
  pendingValue.value = progress * props.max
  if (scrubbing.value) value.value = pendingValue.value
})
</script>

<template>
  <div
    ref="scrubber"
    class="relative rounded-full h-2 transition-all cursor-pointer select-none flex gap-0.5"
    @mousedown="scrubbing = true"
  >
    <div
      class="relative h-full bg-flux-primary rounded-l-full rounded-r-md"
      :style="{ width: `${(value / max) * 100}%` }"
    />
    <div
      class="relative h-full"
      :class="{
        'w-1': scrubbing,
        'w-0.5': !scrubbing
      }"
    >
      <span
        class="absolute w-full -top-0.5 -bottom-0.5 left-0 right-0 bg-flux-primary rounded-full"
      />
    </div>
    <div
      class="relative h-full flex-1 bg-outline-variant rounded-r-full rounded-l-md"
    />
  </div>
</template>
