<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    label?: string
    labelClass?: HTMLAttributes['class']
    labelPosition?: 'left' | 'right' | 'center'
    colorClass?: HTMLAttributes['class']
  }>(),
  {
    labelPosition: 'center'
  }
)
</script>

<template>
  <div
    :class="
      cn(
        props.label
          ? 'w-full flex items-center'
          : 'w-full h-px bg-outlineVariant',
        props.colorClass,
        props.class
      )
    "
  >
    <template v-if="props.label">
      <div
        v-if="labelPosition === 'right' || labelPosition === 'center'"
        :class="cn('grow h-px bg-outlineVariant', props.colorClass)"
      ></div>
      <span :class="cn('flex-none p-1 text-xs', props.labelClass)">{{
        props.label
      }}</span>
      <div
        v-if="labelPosition === 'left' || labelPosition === 'center'"
        :class="cn('grow h-px bg-outlineVariant', props.colorClass)"
      ></div>
    </template>
  </div>
</template>
