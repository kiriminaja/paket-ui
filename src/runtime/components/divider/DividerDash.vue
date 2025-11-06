<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    label?: string
    labelClass?: HTMLAttributes['class']
    labelPosition?: 'left' | 'right' | 'center'
    borderColorClass?: HTMLAttributes['class']
    thickness?: number
  }>(),
  {
    labelPosition: 'center',
    thickness: 1
  }
)
</script>

<template>
  <div
    :class="
      cn(
        props.label
          ? 'w-full flex items-center'
          : 'w-full border-dashed border-outlineVariant',
        props.borderColorClass,
        props.class
      )
    "
    :style="{ 'border-top-width': `${props.label ? 0 : props.thickness}px` }"
  >
    <template v-if="props.label">
      <div
        v-if="labelPosition === 'right' || labelPosition === 'center'"
        :class="
          cn('grow border-dashed border-outlineVariant', props.borderColorClass)
        "
        :style="{ 'border-top-width': `${props.thickness}px` }"
      ></div>
      <span :class="cn('flex-none p-1 text-xs', props.labelClass)">{{
        props.label
      }}</span>
      <div
        v-if="labelPosition === 'left' || labelPosition === 'center'"
        :class="
          cn('grow border-dashed border-outlineVariant', props.borderColorClass)
        "
        :style="{ 'border-top-width': `${props.thickness}px` }"
      ></div>
    </template>
  </div>
</template>
