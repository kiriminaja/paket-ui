<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { DialogOverlay, DialogPortal, DialogRoot, DialogTrigger } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  show?: boolean
  overlayClass?: HTMLAttributes['class']
  class?: HTMLAttributes['class']
  withBlur?: boolean
  isScrollable?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:show', payload?: boolean): void
}>()

const show = useVModel(props, 'show', emits)
</script>

<template>
  <DialogRoot v-model:open="show">
    <DialogTrigger :class="cn(props.class)">
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <Transition>
        <DialogOverlay
          :class="
            cn(
              'bg-black/30 fixed inset-0 z-90',
              { 'backdrop-blur-md': withBlur },
              { 'grid place-items-center overflow-y-auto': isScrollable },
              props.overlayClass
            )
          "
        >
          <slot v-if="isScrollable" />
        </DialogOverlay>
      </Transition>

      <Transition>
        <slot v-if="!isScrollable" />
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
