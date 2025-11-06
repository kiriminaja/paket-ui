<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { iconSizeConfig, sizeConfig, variantConfig, textSizeConfig } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    label?: string
    iconName?: string
    bgColor?: string
    iconSize?: keyof typeof iconSizeConfig
    textClass?: HTMLAttributes['class']
  }>(),
  {
    class: undefined,
    variant: 'primary',
    size: 'default',
    label: '',
    iconName: 'mdi:circle',
    bgColor: undefined,
    iconSize: undefined,
    textClass: undefined
  }
)
</script>

<template>
  <div
    :class="
      cn(
        'rounded-full flex items-center gap-1',
        variantConfig[variant],
        sizeConfig[size],
        props.class
      )
    "
    :style="{ backgroundColor: bgColor }"
  >
    <Icon
      class="flex-none"
      :name="iconName"
      :size="iconSizeConfig[iconSize ?? size]"
    />
    <span
      :class="cn('text-xs font-medium', textSizeConfig[size], props.textClass)"
      >{{ label }}</span
    >
  </div>
</template>
