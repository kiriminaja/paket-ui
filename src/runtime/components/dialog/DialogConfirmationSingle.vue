<script setup lang="ts">
/* eslint-disable @typescript-eslint/unified-signatures,vue/no-v-html */

import type { variantConfig } from '../button'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    show: boolean
    image?: string
    imagePlaceholder?: string
    buttonLabel?: string
    buttonVariant?: keyof typeof variantConfig
    buttonDisabled?: boolean
    buttonLoading?: boolean
    buttonLabelCancel?: string
    buttonVariantCancel?: keyof typeof variantConfig
    buttonDisabledCancel?: boolean
    buttonLoadingCancel?: boolean
    withButtonCancel?: boolean
    dismissable?: boolean
    showCloseButton?: boolean
    buttonDirection?: 'row' | 'column'
    buttonIcon?: string
    buttonIconCancel?: string
    showImage?: boolean
    dialogClass?: string
  }>(),
  {
    description: undefined,
    image: '/img/image-empty.png',
    imagePlaceholder: '/img/image-empty.png',
    buttonLabel: 'Close',
    buttonVariant: 'primary',
    buttonLabelCancel: 'Cancel',
    buttonVariantCancel: 'primaryOutline',
    showCloseButton: true,
    withButtonCancel: false,
    buttonDirection: 'column',
    buttonIcon: undefined,
    buttonIconCancel: undefined,
    showImage: true,
    dialogClass: undefined
  }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'cancel'): void
}>()

const dismissModal = () => {
  if (!props.dismissable) return
  emit('close')
}
</script>

<template>
  <DialogGeneral
    title=""
    :show="show"
    :dialog-size="dialogClass"
    :static="true"
    @close="dismissModal"
  >
    <div class="p-6 flex flex-col gap-6 text-center">
      <div class="flex flex-col gap-2">
        <div class="flex justify-end">
          <Icon
            v-if="showCloseButton"
            class="cursor-pointer text-flux-outline"
            name="material-symbols:close"
            size="24px"
            @click="emit('close')"
          />
          <div v-else class="w-6 h-6"></div>
        </div>
        <h3 class="font-bold text-2xl" v-text="title"></h3>
      </div>
      <NuxtImg
        v-if="showImage"
        :src="image"
        class="inline-block w-[240px] self-center"
        :placeholder="imagePlaceholder"
        alt="Image"
      />
      <p v-if="description" class="text-sm" v-html="description"></p>
      <slot />
      <div
        class="grid gap-4"
        :class="[
          withButtonCancel && buttonDirection === 'column'
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1'
        ]"
      >
        <template v-if="withButtonCancel">
          <UiButtonIconButton
            v-if="buttonIconCancel"
            :variant="buttonVariantCancel"
            :label="buttonLabelCancel"
            :disabled="buttonDisabledCancel"
            :loading="buttonLoadingCancel"
            :icon-name="buttonIconCancel"
            @click="emit('cancel')"
          />
          <UiButtonBaseButton
            v-else
            :variant="buttonVariantCancel"
            :label="buttonLabelCancel"
            :disabled="buttonDisabledCancel"
            :loading="buttonLoadingCancel"
            @click="emit('cancel')"
          />
        </template>
        <UiButtonIconButton
          v-if="buttonIcon"
          :variant="buttonVariant"
          :label="buttonLabel"
          :disabled="buttonDisabled"
          :loading="buttonLoading"
          :icon-name="buttonIcon"
          @click="emit('submit')"
        />
        <UiButtonBaseButton
          v-else
          :variant="buttonVariant"
          :label="buttonLabel"
          :disabled="buttonDisabled"
          :loading="buttonLoading"
          @click="emit('submit')"
        />
      </div>
    </div>
  </DialogGeneral>
</template>
