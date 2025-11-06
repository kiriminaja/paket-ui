<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    value?: number
  }>(),
  {
    class: undefined,
    value: 0
  }
)

const RADIUS = 45
const circumference = 2 * Math.PI * RADIUS

const dashOffset = computed(() => (props.value / 100) * circumference)

const trackPath = computed(() => {
  const r = RADIUS
  return `
          M 50 50
          m 0 -${r}
          a ${r} ${r} 0 1 1 0 ${r * 2}
          a ${r} ${r} 0 1 1 0 -${r * 2}
          `
})
</script>

<template>
  <div :class="cn('relative w-[52px] h-[52px]', props.class)">
    <ProgressRoot :model-value="props.value" as-child>
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <path
          :d="trackPath"
          class="fill-none stroke-outline-variant stroke-[12px]"
        />
        <ProgressIndicator as-child>
          <path
            :d="trackPath"
            class="fill-none stroke-flux-primary stroke-[12px] transition-[stroke-dasharray,opacity] duration-700 data-[value='0']:opacity-0"
            :style="{
              'stroke-linecap': 'round',
              'stroke-dasharray': `${dashOffset}px, ${circumference}px`,
              'stroke-dashoffset': '0px'
            }"
          />
        </ProgressIndicator>
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-xs font-bold">{{ props.value }}%</span>
      </div>
    </ProgressRoot>
  </div>
</template>
