<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  show?: boolean
  src: string
  title?: string
}>()

const emits = defineEmits<{
  (e: 'update:show', payload?: boolean): void
  (e: 'close'): void
}>()

const show = useVModel(props, 'show', emits, {
  defaultValue: false,
  passive: true
})

const handleClose = () => {
  show.value = false
  emits('close')
}
</script>

<template>
  <UiDialogRekaDialogRoot
    :show="show"
    :with-blur="true"
    overlay-class="bg-black/80"
    @update:show="handleClose"
  >
    <UiDialogRekaDialogContent
      class="inset-0 w-full max-h-full max-w-full translate-x-0 translate-y-0 flex justify-center items-center"
      @click.self="handleClose"
    >
      <UiButtonIconButton
        class="absolute top-2 right-2 p-2 rounded-md border-none text-white"
        variant="outline"
        icon-name="material-symbols:close"
        size="xs"
        @click="handleClose"
      />
      <UiPlayerVideo
        class="w-11/12 lg:w-5/6 aspect-video"
        :src="props.src"
        :options="['download', 'picture_in_picture', 'repeat']"
      />
    </UiDialogRekaDialogContent>
  </UiDialogRekaDialogRoot>
</template>
