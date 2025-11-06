<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = withDefaults(
  defineProps<{
    show: boolean
    url: string
    title?: string
    aspectRatio?: number
  }>(),
  {
    title: 'Sesuaikan Rasio Gambar',
    aspectRatio: 5 / 3
  }
)

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'onChange', payload: File): void
}>()

const cropper = useTemplateRef<typeof Cropper>('cropper')

const onSave = () => {
  const canvas = cropper.value?.getCanvas()
  if (canvas) {
    canvas.toBlob((blob: File) => {
      nextTick(async () => {
        const file = new File([blob], 'image')
        emits('onChange', file)
        emits('close')
      })
    }, 'image/jpeg')
  }
}
</script>

<template>
  <DialogGeneral :title="title" :show="show" @close="emits('close')">
    <div class="pb-4 px-4 flex flex-col gap-3">
      <div
        class="rounded-xl overflow-hidden h-96 bg-surfaceContainerLow box-center"
      >
        <Cropper
          ref="cropper"
          class="transform transition duration-300"
          :src="url"
          :auto-zoom="true"
          :min-height="192"
          :min-width="320"
          :stencil-props="{
            aspectRatio: props.aspectRatio,
            resizable: true
          }"
        />
      </div>

      <div class="flex flex-col md:flex-row box-between gap-3">
        <div class="flex flex-row gap-3">
          <UiButtonIconButton
            class="p-2 rounded-lg"
            variant="outline"
            icon-size="lg"
            icon-name="material-symbols:rotate-left"
            @click="cropper?.rotate(-90)"
          />
          <UiButtonIconButton
            class="p-2 rounded-lg"
            variant="outline"
            icon-size="lg"
            icon-name="material-symbols:rotate-right"
            @click="cropper?.rotate(90)"
          />
          <UiButtonIconButton
            class="p-2 rounded-lg"
            variant="outline"
            icon-size="lg"
            icon-name="material-symbols:zoom-out"
            @click="cropper?.zoom(0.7)"
          />
          <UiButtonIconButton
            class="p-2 rounded-lg"
            variant="outline"
            icon-size="lg"
            icon-name="material-symbols:zoom-in"
            @click="cropper?.zoom(1.3)"
          />
        </div>

        <UiButtonBaseButton label="Simpan Gambar" @click="onSave" />
      </div>
    </div>
  </DialogGeneral>
</template>
