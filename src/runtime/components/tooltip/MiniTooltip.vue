<template>
  <Transition>
    <div :class="cn('inline-flex relative', props.class)" @mousemove="showTooltip = true" @mouseleave="showTooltip = false">
      <Icon :name="icon" :size="iconSize + 'px'" class="text-flux-primary cursor-pointer" />
      <template v-if="showTooltip">
        <div class="absolute z-10 flex justify-center" :style="arrowStyle">
          <div class="border-l-[6px] border-r-[6px] border-l-transparent border-r-transparent border-t-[6px] border-onSurfaceVariant" :class="[tooltipCenter ? 'rotate-180' : 'rotate-90']"></div>
        </div>
        <div ref="el" class="absolute text-surfaceVariant bg-onSurfaceVariant z-20 px-2 py-1 rounded-[4px] w-max" :style="contentWrapperStyle">
          <slot/>
        </div>
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useElementBounding, useWindowSize } from '@vueuse/core';
import type { HTMLAttributes, StyleValue } from 'vue';

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  icon?: string;
  iconSize?: number;
}>(), {
  icon: 'material-symbols:info-outline',
  iconSize: 16,
})

const showTooltip = ref(false);
const el = ref<HTMLElement | null>(null);

const { width } = useElementBounding(el);
const { width: windowWidth } = useWindowSize();

const tooltipCenter = computed(() => {
  if (width.value < windowWidth.value / 2) return false
  return true
})

const arrowStyle = computed<StyleValue>(() => {
  if (tooltipCenter.value) return {
    left: 0,
    right: 0,
    flexDirection: 'row',
    top: (props.iconSize + 2) + 'px',
  }
  
  return {
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    left: props.iconSize + 'px',
  }
})

const contentWrapperStyle = computed<StyleValue>(() => {
  if (tooltipCenter.value) return {
    left: '50%',
    top: (props.iconSize + 8) + 'px',
    transform: 'translateX(-50%)',
  }
  
  return {
    top: '50%',
    left: (props.iconSize + 8) + 'px',
    transform: 'translateY(-50%)',
  }
})

</script>