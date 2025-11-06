<template>
  <DialogGeneral :title="props.title" :show="show" @close="emit('close')">
    <div class="p-6 grid text-center">
      <div>
        <img
          :src="image"
          class="inline-block mb-4 w-72 min-w-72"
          :placeholder="imagePlaceholder"
          alt="Image Confirmation"
        />
      </div>
      <p class="text-sm" v-text="description"></p>

      <div
        class="grid gap-3 mt-8"
        :class="{
          'grid-cols-2': props.multiple
        }"
      >
        <slot v-if="props.multiple" name="left">
          <UiButtonBaseButton
            :variant="leftButtonVariant"
            :label="leftButtonLabel"
            :loading="loading"
            @click="emit('click-left')"
          />
        </slot>
        <slot name="right">
          <UiButtonBaseButton
            :variant="rightButtonVariant"
            :label="rightButtonLabel"
            :loading="loading"
            @click="emit('click-right')"
          />
        </slot>
      </div>
    </div>
  </DialogGeneral>
</template>
<script setup lang="ts">
import type { variantConfig } from '../button'

const props = withDefaults(
  defineProps<{
    title: string
    description: string
    show: boolean
    image?: string
    imagePlaceholder?: string
    leftButtonLabel?: string
    leftButtonVariant?: keyof typeof variantConfig
    rightButtonLabel?: string
    rightButtonVariant?: keyof typeof variantConfig
    loading?: boolean
    multiple?: boolean
  }>(),
  {
    image: '/img/confirmation.png',
    imagePlaceholder: '/img/confirmation.png',
    leftButtonLabel: 'Close',
    leftButtonVariant: 'primaryOutline',
    rightButtonLabel: 'Konfirmasi',
    rightButtonVariant: 'primary',
    multiple: true
  }
)

const emit = defineEmits<{
  (e: 'close' | 'click-left' | 'click-right'): void
}>()
</script>
