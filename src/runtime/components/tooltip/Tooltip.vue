<template>
  <Transition>
    <div class="relative" @mousemove="showTooltip = true" @mouseleave="showTooltip = false">
      <Icon :name="icon" :size="iconSize" class="text-flux-primary cursor-pointer" />
      <template v-if="showTooltip">
        <div class="absolute inset-x-0 bg-transparent z-10 flex justify-center top-8">
          <div class="w-4 h-4 bg-background rotate-45 pointer-tooltip rounded-sm default-tooltip-shadow"></div>
        </div>
        <div ref="el" class="absolute top-10 text-onSurface bg-background default-tooltip-shadow z-20 p-[18px] rounded-xl w-max" :style="{left: tooltipPosition.left, transform: tooltipPosition.transform}">
          <slot/>
        </div>
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useElementBounding, useWindowSize } from '@vueuse/core';


const props = withDefaults(defineProps<{
  icon?: string;
  iconSize?: string;
  offsetDirection?: 'left' | 'right' | 'center';
}>(), {
  icon: 'material-symbols:info-outline',
  iconSize: '24px',
  offsetDirection: 'left'
})

const showTooltip = ref(false);
const el = ref<HTMLElement | null>(null);

const { width } = useElementBounding(el);
const { width: windowWidth } = useWindowSize();

const tooltipPosition = computed(() => {
  if (width.value < windowWidth.value / 2) {
    return {
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }

  if (props.offsetDirection === 'center') {
    return {
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }

  return {
    left: '0',
    transform: `translateX(${props.offsetDirection === 'left' ? '-80%' : '-20%'})`
  }
})
</script>

<style scoped>
.pointer-tooltip::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: -4px -3px 10px rgba(0, 0, 0, 0.05);
  z-index: -1;
}
.pointer-tooltip::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.05); */
}

</style>