<template>
  <div class="relative">
    <div
      :class="
        isActive ? 'font-bold text-flux-primary' : 'text-onSurfaceVariant'
      "
      class="py-2.5 px-4 whitespace-nowrap text-xs font-medium"
    >
      {{ label }}
      <span v-if="count > 0">({{ formatNumber(count) }})</span>
    </div>
    <div
      v-if="isActive"
      class="absolute rounded-t h-[4px] left-2 right-2 bottom-0 bg-flux-primary"
    ></div>
    <NuxtLink :to="to" class="absolute inset-0" />
  </div>
</template>

<script lang="ts" setup>
import type { NuxtLinkProps } from '#app'
withDefaults(
  defineProps<{
    label?: string
    count?: number
    isActive?: boolean
    disabled?: boolean
    to?: NuxtLinkProps
  }>(),
  {
    label: '',
    count: 0,
    isActive: false,
    statusKey: '',
    disabled: false,
    to: undefined
  }
)
</script>
