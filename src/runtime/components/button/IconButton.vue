<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { iconSizeConfig, sizeConfig, variantConfig } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    label?: string
    iconName?: string
    iconPosition?: 'left' | 'right'
    iconSize?: keyof typeof iconSizeConfig
    iconClass?: HTMLAttributes['class']
    disabled?: boolean
    loading?: boolean
    labelClass?: HTMLAttributes['class']
  }>(),
  {
    variant: 'primary',
    size: 'default',
    label: '',
    iconName: 'mdi:circle',
    iconPosition: 'left',
    iconSize: 'default',
    class: undefined,
    iconClass: undefined,
    labelClass: undefined
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
        {
          'flex-row-reverse': iconPosition === 'right'
        },
        props.class
      )
    "
    :disabled="disabled || loading"
  >
    <Icon
      :name="loading ? 'svg-spinners:ring-resize' : iconName"
      :size="iconSizeConfig[iconSize]"
      :class="cn(props.iconClass)"
    />
    <span
      v-if="label && label != ''"
      :class="cn(props.labelClass)"
      v-text="label"
    ></span>
  </button>
</template>
