<script setup lang="ts">
import { useMediaControls } from '@vueuse/core'

const audioRef = useTemplateRef('audioRef')
const { playing, currentTime, muted, duration } = useMediaControls(audioRef)

const props = defineProps<{
  src?: string
  autoplay?: boolean
  loop?: boolean
}>()

const convertToMinutesSeconds = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

const getBlobDuration = () => {
  const tempVideoEl = document.createElement('video')

  const durationP = new Promise<number>((resolve, _reject) => {
    tempVideoEl.addEventListener('loadedmetadata', () => {
      if (tempVideoEl.duration === Infinity) {
        tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER
        tempVideoEl.ontimeupdate = () => {
          tempVideoEl.ontimeupdate = null
          resolve(tempVideoEl.duration)
          tempVideoEl.currentTime = 0
        }
      } else resolve(tempVideoEl.duration)
    })
    tempVideoEl.onerror = (_event) => resolve(0)
  })

  tempVideoEl.src = props.src || ''

  return durationP
}

watchEffect(async () => {
  if (props.src && props.src.startsWith('blob:'))
    duration.value = await getBlobDuration()
  else duration.value = duration.value || 0
})

defineExpose({
  audioRef,
  playing,
  currentTime,
  muted,
  duration,
  setAudioMuted: (value: boolean) => (muted.value = value),
  setAudioPlaying: (value: boolean) => (playing.value = value)
})
</script>

<template>
  <div class="bg-black/5 dark:bg-white/10 px-2 py-1.5 rounded-lg">
    <audio
      ref="audioRef"
      class="hidden"
      :autoplay="props.autoplay"
      :src="props.src"
      :loop="props.loop"
      :muted="muted"
      controls
    ></audio>

    <div class="flex items-center gap-1.5">
      <UiButtonIconButton
        v-if="props.src"
        class="p-0.5 border-none"
        variant="outline"
        size="sm"
        :icon-name="
          playing ? 'material-symbols:pause' : 'material-symbols:play-arrow'
        "
        @click="playing = !playing"
      />
      <div class="text-xs shrink-0">
        {{ convertToMinutesSeconds(currentTime) }}
      </div>
      <UiPlayerScrubber
        v-if="props.src"
        v-model="currentTime"
        class="grow block min-w-44"
        type="range"
        :max="duration"
        step="0.1"
      />
      <template v-if="props.src">
        <UiButtonIconButton
          class="p-0.5 border-none"
          variant="outline"
          size="sm"
          :icon-name="
            muted ? 'material-symbols:volume-off' : 'material-symbols:volume-up'
          "
          @click="muted = !muted"
        />
        <UiButtonLinkButton
          class="p-0.5 border-none"
          variant="outline"
          size="sm"
          icon="material-symbols:download"
          download
          :to="props.src"
        />
      </template>
    </div>
  </div>
</template>
