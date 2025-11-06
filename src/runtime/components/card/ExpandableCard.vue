<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const props = defineProps<{
  class?: HTMLAttributes['class']
  expandable?: boolean
  expandableMode?: 'mobile' | 'desktop' | 'all'
}>()

const isExpanded = ref(true)
const isOverflowHidden = ref(false)

const checkVisibility = computed(() => {
  if (!props.expandable) return false
  if (!props.expandableMode || props.expandableMode === 'all') return true
  if (props.expandableMode === 'mobile' && breakpoints.smaller('md').value)
    return true
  if (props.expandableMode === 'desktop' && breakpoints.greater('md').value)
    return true
  return false
})

const toggleExpand = () => (isExpanded.value = !isExpanded.value)

watch(isExpanded, (value) => {
  if (!props.expandable) return (isOverflowHidden.value = false)
  if (value) return setTimeout(() => (isOverflowHidden.value = false), 300)
  return (isOverflowHidden.value = true)
})

watch(breakpoints.greater('md'), (value) => {
  if (value) isExpanded.value = true
})
</script>

<template>
  <UiCardBaseCard :class="['rounded-none md:rounded-xl relative', props.class]">
    <Icon
      v-if="checkVisibility"
      class="absolute top-6 right-4 md:right-4 cursor-pointer text-flux-primary transition-all duration-300"
      :class="[isExpanded ? 'rotate-0' : 'rotate-180']"
      name="fe:arrow-up"
      size="24px"
      @click="toggleExpand"
    />
    <slot name="header" />
    <div
      class="p-0 grid transition-all duration-300"
      :class="[isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]']"
    >
      <div class="p-0" :class="{ 'overflow-hidden': isOverflowHidden }">
        <slot />
      </div>
    </div>
  </UiCardBaseCard>
</template>
