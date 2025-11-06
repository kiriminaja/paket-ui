<script setup lang="ts">
import { useDevicesList, useUserMedia } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    maxDuration?: number
  }>(),
  {
    maxDuration: 0 // 0 means no limit
  }
)

const emits = defineEmits<{
  (e: 'recorded', value: FileList): void
}>()

const currentAudio = shallowRef<string>()
const { audioInputs: microphones } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!microphones.value.find((i) => i.deviceId === currentAudio.value))
      currentAudio.value = microphones.value[0]?.deviceId
  }
})

const audio = useTemplateRef('audio')
const { stream, enabled } = useUserMedia({
  constraints: reactive({ audio: { deviceId: currentAudio, video: false } })
})

const recordedChunks = shallowRef<Blob[]>([])
const mediaRecorder = shallowRef<MediaRecorder | null>(null)
const audioFileSrc = shallowRef<string>('')
const durationTimer = shallowRef<NodeJS.Timeout | null>(null)

const stopRecording = () => {
  if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
    mediaRecorder.value.stop()
  }
  if (durationTimer.value) {
    clearTimeout(durationTimer.value)
    durationTimer.value = null
  }
  enabled.value = false
}

const toggleRecording = () => {
  if (enabled.value) {
    stopRecording()
  } else {
    enabled.value = true
  }
}

watchEffect(() => {
  if (stream.value) {
    recordedChunks.value = []
    if (mediaRecorder.value) {
      mediaRecorder.value.stop()
    }
    if (durationTimer.value) {
      clearTimeout(durationTimer.value)
      durationTimer.value = null
    }

    mediaRecorder.value = new MediaRecorder(stream.value)

    if (props.maxDuration > 0) {
      durationTimer.value = setTimeout(() => {
        stopRecording()
      }, props.maxDuration * 1000)
    }

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.value.push(event.data)

        const blob = new Blob(recordedChunks.value, { type: 'audio/mp3' })
        const newFile = new File(
          [blob],
          `recording-${new Date().toISOString()}.mp3`,
          {
            type: 'audio/mp3'
          }
        )

        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(newFile)
        emits('recorded', dataTransfer.files)
      }
    }

    mediaRecorder.value.onstop = () => {
      const blob = new Blob(recordedChunks.value, { type: 'audio/mp3' })
      audioFileSrc.value = URL.createObjectURL(blob)

      if (durationTimer.value) {
        clearTimeout(durationTimer.value)
        durationTimer.value = null
      }
    }

    mediaRecorder.value.start()
  }
})

watchEffect(() => {
  if (audio.value?.audioRef) {
    audio.value.audioRef.srcObject = stream.value!
  }
})

watch(enabled, (value) => {
  if (!audio.value) return
  audio.value.setAudioMuted(value)

  if (!value && durationTimer.value) {
    clearTimeout(durationTimer.value)
    durationTimer.value = null
  }
})

onMounted(() => {
  if (!enabled.value) {
    enabled.value = true
  }
})
onBeforeUnmount(() => {
  enabled.value = false

  if (durationTimer.value) {
    clearTimeout(durationTimer.value)
    durationTimer.value = null
  }
})
</script>

<template>
  <div
    class="flex gap-2 text-center items-center bg-background rounded-full border border-outline-variant px-2.5 py-2"
  >
    <Icon
      v-if="enabled"
      name="material-symbols:fiber-manual-record"
      class="animate-pulse text-flux-error"
      size="20px"
    />
    <UiPlayerAudio
      ref="audio"
      class="!bg-transparent !p-0 grow"
      :src="enabled ? undefined : audioFileSrc"
      autoplay
    />
    <UiButtonIconButton
      class="p-0.5 border-none"
      :icon-name="
        enabled ? 'material-symbols:stop' : 'material-symbols:keyboard-voice'
      "
      size="sm"
      variant="outline"
      @click="toggleRecording"
    />
  </div>
</template>
