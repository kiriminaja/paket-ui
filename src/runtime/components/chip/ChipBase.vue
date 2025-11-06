<script setup lang="ts">
/* eslint-disable vue/no-v-html */

import type { HTMLAttributes } from 'vue'
import { variantConfig } from '.'
import type { iconSizeConfig } from '../button'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    classLabel?: HTMLAttributes['class']
    classButton?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    label?: string
    iconName?: string
    iconSize?: keyof typeof iconSizeConfig
  }>(),
  {
    class: undefined,
    classLabel: undefined,
    classButton: undefined,
    variant: 'outline',
    variantIcon: 'outline',
    label: undefined,
    iconName: 'material-symbols:close',
    iconSize: 'xs'
  }
)

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center gap-2 py-2 pl-3 pr-2 rounded-full cursor-default',
        variantConfig[variant],
        props.class
      )
    "
  >
    <p
      :class="
        cn('text-sm font-semibold break-all line-clamp-1', props.classLabel)
      "
      v-html="label"
    />
    <UiButtonIconButton
      :class="
        cn(
          'flex-none w-5 h-5 rounded-full p-0 bg-outline-variant',
          props.classButton
        )
      "
      variant="outline"
      :icon-name="iconName"
      :icon-size="iconSize"
      @click="$emit('close')"
    />
  </div>
</template>
