<script setup lang="ts">
/* eslint-disable vue/no-v-html */

import type { HTMLAttributes } from 'vue'
import { sizeConfig, variantConfig, textSizeConfig } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    label?: string
    bgColor?: string
  }>(),
  {
    class: undefined,
    variant: 'primary',
    size: 'default',
    label: '',
    bgColor: undefined
  }
)
</script>

<template>
  <div
    :class="
      cn(
        'py-1 px-2 rounded-full inline-flex font-semibold text-center',
        variantConfig[variant],
        sizeConfig[size],
        props.class
      )
    "
    :style="{ backgroundColor: bgColor }"
  >
    <span :class="cn('text-xs', textSizeConfig[size])" v-html="label"></span>
  </div>
</template>
