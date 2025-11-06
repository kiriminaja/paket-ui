<script setup lang="ts">
import { promiseTimeout, useImage } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  src?: string
  delay?: number
  maxRetry?: number
  retryTimeout?: number
  draggable?: boolean
}>()

let retry = 0

const { error, execute } = useImage(
  { src: props.src || '' },
  {
    delay: props.delay
  }
)

const handleOnError = async () => {
  error.value = true
  while (error.value && retry < (props.maxRetry || 1)) {
    await promiseTimeout(props.retryTimeout || 2000)
    retry++
    execute()
  }
}

const handleRetry = (e: MouseEvent) => {
  e.stopPropagation()
  execute()
}
</script>

<template>
  <div :class="cn(props.class)">
    <div
      v-if="error"
      class="w-full h-full p-2 rounded-lg bg-surface-container-low flex flex-col items-center justify-center gap-2 cursor-pointer group relative"
      @click="handleRetry"
    >
      <div
        class="absolute inset-0 hidden group-hover:flex justify-center items-center rounded-lg backdrop-blur-sm bg-black/20"
      >
        <Icon name="material-symbols:refresh" class="text-white" size="24px" />
      </div>
      <Icon
        name="material-symbols:hide-image"
        class="text-on-surface-variant"
        size="56px"
      />
      <p class="text-xs text-center text-on-surface-variant">
        Gagal memuat gambar
      </p>
    </div>
    <img
      v-else
      :src="props.src"
      class="w-full h-full object-contain"
      :draggable="props.draggable"
      @error="handleOnError"
    />
  </div>
</template>
