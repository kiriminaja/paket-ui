<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { iconSizeConfig, sizeConfig } from '.'

const props = withDefaults(
  defineProps<{
    size?: keyof typeof sizeConfig
    class?: HTMLAttributes['class']
    iconName?: string
    iconColor?: string
    backgroundColor?: string
    shape?: 'circle' | 'square'
  }>(),
  {
    size: 'default',
    iconName: 'mdi:account',
    iconColor: 'text-flux-info',
    backgroundColor: 'bg-infoContainer',
    shape: 'circle'
  }
)
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-center',
        shape === 'circle' ? 'rounded-full' : 'rounded-none',
        backgroundColor,
        iconColor,
        sizeConfig[size],
        props.class
      )
    "
  >
    <Icon :name="iconName" :size="iconSizeConfig[size]" />
  </div>
</template>
