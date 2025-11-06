<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { watchDebounced } from '@vueuse/core'

const RADIUS = 45
const circumference = 2 * Math.PI * RADIUS

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    value?: number
    half?: boolean
    strokeWidth?: number
    animationDelay?: number
  }>(),
  {
    class: undefined,
    value: 1,
    half: false,
    strokeWidth: 6,
    animationDelay: 700
  }
)

const progress = ref(0)
const dashOffset = computed(
  () =>
    (progress.value / 100) * (props.half ? circumference / 2 : circumference)
)

const trackPath = computed(() => {
  const r = RADIUS
  return props.half
    ? `
                                        M 50 50
                                        m -${r} 0
                                        a ${r} ${r} 0 1 1 ${r * 2} 0
                                        `
    : `
                                        M 50 50
                                        m 0 -${r}
                                        a ${r} ${r} 0 1 1 0 ${r * 2}
                                        a ${r} ${r} 0 1 1 0 -${r * 2}
                                        `
})

const circumferenceValue = computed(() =>
  props.half ? circumference / 2 : circumference
)

watchDebounced(
  () => props.value,
  (val) => {
    progress.value = val
  },
  { immediate: true, debounce: props.animationDelay }
)
</script>

<template>
  <div
    :class="
      cn('relative', props.half ? 'aspect-[2/1]' : 'aspect-square', props.class)
    "
  >
    <ProgressRoot :model-value="progress" as-child>
      <svg
        :class="props.half ? 'w-full h-full' : 'w-full h-full'"
        :viewBox="props.half ? '0 0 100 50' : '0 0 100 100'"
      >
        <!-- Define gradient -->
        <defs>
          <linearGradient
            id="progress-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset="0%"
              class="text-flux-primary"
              stop-color="currentColor"
            />
            <stop
              offset="100%"
              class="text-flux-info"
              stop-color="currentColor"
            />
          </linearGradient>
        </defs>

        <!-- Background circle -->
        <path
          :d="trackPath"
          class="fill-none stroke-outline-variant"
          :style="{
            strokeWidth: `${props.strokeWidth}px`
          }"
        />
        <!-- Progress circle -->
        <ProgressIndicator as-child>
          <path
            :d="trackPath"
            class="fill-none transition-[stroke-dasharray,opacity] duration-700 data-[value='0']:opacity-0"
            :style="{
              strokeWidth: `${props.strokeWidth}px`,
              'stroke-dasharray': `${dashOffset}px, ${circumferenceValue}px`,
              'stroke-dashoffset': '0px'
            }"
            stroke="url(#progress-gradient)"
          />
        </ProgressIndicator>
      </svg>
      <slot :value="props.value">
        <div
          class="absolute inset-0 flex items-center justify-center top-1/2 -translate-y-1/2"
        >
          <span class="text-lg font-bold text-foreground"
            >{{ props.value }}%</span
          >
        </div>
      </slot>
    </ProgressRoot>
  </div>
</template>
