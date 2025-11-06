<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { iconSizeConfig, sizeConfig, variantConfig } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    label?: string
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'default',
    label: ''
  }
)
</script>

<template>
  <button
    :class="
      cn(
        'rounded-full flex justify-center items-center gap-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:saturate-150',
        variantConfig[variant],
        sizeConfig[size],
        props.class
      )
    "
    :disabled="disabled || loading"
  >
    <Icon
      v-if="loading"
      name="svg-spinners:ring-resize"
      :size="iconSizeConfig[size]"
    />
    {{ label }}
  </button>
</template>
