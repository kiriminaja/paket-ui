<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  show?: boolean
  imageUrl?: string
  imageAlt?: string
  downloadNewTab?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:show', payload?: boolean): void
  (e: 'close'): void
}>()

let rotation = 0
let scale = 1
const pos = { x: 0, y: 0 }
const isPanning = ref(false)
let start = { x: 0, y: 0 }

const show = useVModel(props, 'show', emits, {
  defaultValue: false,
  passive: true
})

const handleClose = () => {
  show.value = false
  rotation = 0
  scale = 1
  emits('close')
}

const handleDownload = () => {
  if (!props.imageUrl) return

  createDownloadLink(props.imageUrl, { newTab: props.downloadNewTab })
}

const handleMouseDown = (e: MouseEvent) => {
  isPanning.value = true
  start = { x: e.clientX - pos.x, y: e.clientY - pos.y }
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length !== 1) return
  isPanning.value = true
  const touch = e.touches[0]
  start = { x: touch.clientX - pos.x, y: touch.clientY - pos.y }
  document.addEventListener('touchmove', handleTouchMove, { passive: false })
  document.addEventListener('touchend', handleTouchEnd)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isPanning.value) return
  // Calculate movement delta
  const dx = e.clientX - start.x
  const dy = e.clientY - start.y
  // Adjust for rotation
  const rad = toRadians(rotation % 360)
  pos.x = dx * Math.cos(rad) + dy * Math.sin(rad)
  pos.y = -dx * Math.sin(rad) + dy * Math.cos(rad)
  applyPan()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isPanning.value || e.touches.length !== 1) return
  e.preventDefault()
  const touch = e.touches[0]
  const dx = touch.clientX - start.x
  const dy = touch.clientY - start.y
  const rad = toRadians(rotation % 360)
  pos.x = dx * Math.cos(rad) + dy * Math.sin(rad)
  pos.y = -dx * Math.sin(rad) + dy * Math.cos(rad)
  applyPan()
}

const applyTransform = () => {
  pos.x = 0
  pos.y = 0
  const img = document.getElementById('image-previewer')
  if (!img) return
  img.style.transform = `rotate(${rotation}deg) scale(${scale}) translate(0px, 0px)`
}

const toRadians = (deg: number) => deg * (Math.PI / 180)

const applyPan = () => {
  const img = document.getElementById('image-previewer')
  if (!img) return
  img.style.transform = `rotate(${rotation}deg) scale(${scale}) translate(${pos.x}px, ${pos.y}px)`
}

const handleMouseUp = () => {
  isPanning.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleTouchEnd = () => {
  isPanning.value = false
  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
}

const handleImageRotate = (direction: 'left' | 'right') => {
  rotation += direction === 'left' ? -90 : 90
  applyTransform()
}

const handleImageZoom = (zoomIn: boolean) => {
  scale = zoomIn ? scale * 1.2 : scale / 1.2
  applyTransform()
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
      class="inset-0 w-full max-h-full max-w-full translate-x-0 translate-y-0 flex flex-col"
    >
      <div
        class="flex flex-col-reverse lg:flex-row items-center justify-between gap-2 p-4"
      >
        <div class="flex items-center min-w-60 shrink-0"></div>
        <p class="text-sm font-semibold text-white">
          {{ props.imageAlt || 'Image Preview' }}
        </p>
        <div class="flex items-center gap-2">
          <UiButtonIconButton
            class="p-2 rounded-md border-none text-white"
            variant="outline"
            icon-name="material-symbols:zoom-in"
            size="xs"
            @click="handleImageZoom(true)"
          />
          <UiButtonIconButton
            class="p-2 rounded-md border-none text-white"
            variant="outline"
            icon-name="material-symbols:zoom-out"
            size="xs"
            @click="handleImageZoom(false)"
          />
          <UiButtonIconButton
            class="p-2 rounded-md border-none text-white"
            variant="outline"
            icon-name="material-symbols:rotate-left"
            size="xs"
            @click="handleImageRotate('left')"
          />
          <UiButtonIconButton
            class="p-2 rounded-md border-none text-white"
            variant="outline"
            icon-name="material-symbols:rotate-right"
            size="xs"
            @click="handleImageRotate('right')"
          />
          <UiButtonIconButton
            class="p-2 rounded-md border-none text-white"
            variant="outline"
            icon-name="material-symbols:download"
            size="xs"
            @click="handleDownload"
          />
          <UiButtonIconButton
            class="p-2 rounded-md border-none text-white"
            variant="outline"
            icon-name="material-symbols:close"
            size="xs"
            @click="handleClose"
          />
        </div>
      </div>
      <div
        class="flex-1 flex justify-center items-center overflow-hidden p-4"
        @click="handleClose"
      >
        <div class="h-3/4">
          <img
            id="image-previewer"
            :src="props.imageUrl"
            class="w-full h-full object-contain select-none cursor-grab"
            :class="{ 'transition-all duration-200 ease-in-out': !isPanning }"
            draggable="false"
            @mousedown="handleMouseDown"
            @touchstart="handleTouchStart"
            @click.stop
          />
        </div>
      </div>
    </UiDialogRekaDialogContent>
  </UiDialogRekaDialogRoot>
</template>
