<script setup lang="ts">
import type { AnchorHTMLAttributes, HTMLAttributes } from 'vue'
import { iconSizeConfig, sizeConfig, variantConfig } from '.'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    to: RouteLocationRaw
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    label?: string
    icon?: string
    target?: AnchorHTMLAttributes['target']
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    class: undefined,
    variant: 'primary',
    size: 'default',
    icon: undefined,
    target: '_self',
    label: ''
  }
)
</script>

<template>
  <NuxtLink
    :to="to"
    :class="
      cn(
        'rounded-full flex justify-center items-center gap-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:saturate-150',
        variantConfig[variant],
        sizeConfig[size],
        {
          'cursor-not-allowed': loading || disabled
        },
        props.class
      )
    "
    :target="target"
  >
    <Icon
      v-if="loading"
      name="svg-spinners:ring-resize"
      :size="iconSizeConfig[size]"
    />
    <Icon v-if="icon && !loading" :name="icon" :size="iconSizeConfig[size]" />
    {{ label }}
  </NuxtLink>
</template>
