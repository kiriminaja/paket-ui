<script setup lang="ts">
import { findFallbackIcon, iconFallbackSizeConfig } from '.'

const props = withDefaults(
  defineProps<{
    type?: 'image' | 'file' | 'video'
    src?: string
    alt?: string
    openable?: boolean
    dismissable?: boolean
    width?: string
    height?: string
    iconFallbackSize?: keyof typeof iconFallbackSizeConfig
  }>(),
  {
    type: 'image',
    openable: true,
    alt: 'none',
    width: '72px',
    height: '72px',
    iconFallbackSize: 'default'
  }
)

const emits = defineEmits<{
  (e: 'onDismiss'): void
}>()

const handleOpen = () => {
  if (!props.openable) return
  return window.open(props.src, '_blank')
}

const handleDismiss = (e: MouseEvent) => {
  e.stopPropagation()
  emits('onDismiss')
}

const makeIcon = computed(() => findFallbackIcon(props.type))
</script>

<template>
  <div
    class="relative rounded-xl overflow-hidden"
    :class="{ 'cursor-pointer': openable }"
    :style="{ width, height }"
    @click="handleOpen"
  >
    <div
      v-if="props.dismissable"
      class="absolute top-1 right-1 bg-surfaceContainerLow text-flux-primary rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
      @click="handleDismiss"
    >
      <Icon name="mdi:close" size="12px" />
    </div>
    <img
      v-if="props.type === 'image' && props.src"
      :src="props.src"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <div
      v-else
      class="w-full h-full bg-secondaryContainer text-flux-secondary flex justify-center items-center"
    >
      <Icon :name="makeIcon" :size="iconFallbackSizeConfig[iconFallbackSize]" />
    </div>
  </div>
</template>
