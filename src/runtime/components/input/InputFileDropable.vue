<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

const props = withDefaults(
  defineProps<{
    modelValue?: File
    defaultValue?: File
    label?: string
    additionalLabel?: string
    pathIcon?: string
    suggestionLabel?: string
    maxFileSize?: number
    accept?: string[]
    loading?: boolean
    disabled?: boolean
    validating?: {
      progress: number
    }
  }>(),
  {
    modelValue: undefined,
    defaultValue: undefined,
    label: 'Upload File',
    additionalLabel: 'Pilih file untuk diupload',
    pathIcon: '/svg/placeholder/upload.svg',
    suggestionLabel: 'Letakkan file kamu di sini atau',
    maxFileSize: 10 * 1024 * 1024,
    accept: () => [
      '.pdf',
      '.xls',
      '.xlsx',
      '.doc',
      '.docx',
      '.jpg',
      '.jpeg',
      '.png'
    ],
    validating: undefined
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: File): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue
})

const fileRef = ref<HTMLInputElement | null>(null)
const isDrag = ref(false)
const errorMessage = ref<string | null>(null)

const makeLabel = computed(() => {
  if (props.loading) return 'Mengunggah File'
  if (props.validating) return 'Melakukan Validasi'
  return props.label
})

const openFile = () => {
  if (props.loading || props.validating || props.disabled) return
  fileRef.value?.click()
}

const validateFile = (file: File) => {
  if (!props.accept.includes('.' + (file.name.split('.')?.pop() ?? 'null')))
    return `Format file yang bisa diunggah adalah ${props.accept
      .map((item, index) => {
        if (index !== props.accept.length - 1)
          return item.substring(1).toUpperCase()
        return 'atau ' + item.substring(1).toUpperCase()
      })
      .join(', ')}.`

  if (file.size > props.maxFileSize)
    return `Ukuran file tidak boleh lebih dari ${
      props.maxFileSize / 1024 / 1024
    } MB.`

  return null
}

const onChange = () => {
  if (props.loading || props.validating || props.disabled) return

  errorMessage.value = null
  if (!fileRef.value) return

  const file = fileRef.value.files?.item(0)
  fileRef.value.value = ''

  if (!file) return (errorMessage.value = 'File tidak ditemukan.')

  const validateMessage = validateFile(file)
  if (validateMessage) return (errorMessage.value = validateMessage)

  modelValue.value = file
}

const drop = (event: DragEvent) => {
  errorMessage.value = null
  const file = event.dataTransfer?.files[0] ?? undefined

  if (!file) return (errorMessage.value = 'File tidak ditemukan.')

  const validateMessage = validateFile(file)
  if (validateMessage) return (errorMessage.value = validateMessage)

  modelValue.value = file
}
</script>

<template>
  <div>
    <UiDialogConfirmationSingle
      title="Gagal Unggah File"
      :show="!!errorMessage"
      :description="errorMessage || ''"
      image="/img/fail-redemption.png"
      button-label="Oke"
      @close="errorMessage = null"
      @submit="errorMessage = null"
    />
    <div
      draggable
      class="border border-outlineVariant border-dashed transition duration-300 bg-surfaceContainerLow py-3 rounded-xl"
      :class="[loading || validating ? 'cursor-not-allowed' : 'cursor-pointer']"
      @dragover.prevent="isDrag = true"
      @dragleave.prevent="isDrag = false"
      @drop.stop.prevent="
        ($event) => {
          drop($event)
        }
      "
      @click="openFile"
    >
      <div
        class="flex flex-col pointer-events-none justify-center items-center gap-3"
      >
        <div
          class="flex justify-center items-center h-[72px]"
          :class="validating ? 'w-full' : 'w-[72px]'"
        >
          <svg
            v-if="loading"
            class="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="73"
            height="72"
            viewBox="0 0 73 72"
            fill="none"
          >
            <path
              d="M36.4994 10.2861C41.2989 10.2861 46.0026 11.6293 50.0783 14.1638C54.1541 16.6982 57.4391 20.3228 59.5619 24.6273C61.6846 28.9318 62.5603 33.7445 62.0899 38.5209C61.6195 43.2972 59.8217 47.8466 56.9 51.6543C53.9782 55.462 50.0491 58.376 45.5573 60.0666C41.0654 61.7572 36.1901 62.1569 31.4828 61.2206C26.7756 60.2843 22.4243 58.0492 18.9213 54.7683C15.4184 51.4875 12.9035 47.2917 11.6613 42.6558L16.6035 41.3315C17.5985 45.045 19.613 48.4059 22.4189 51.034C25.2249 53.6621 28.7104 55.4524 32.481 56.2025C36.2516 56.9525 40.1569 56.6323 43.755 55.278C47.3531 53.9238 50.5004 51.5896 52.8408 48.5396C55.1812 45.4895 56.6213 41.8454 56.9981 38.0194C57.3749 34.1934 56.6735 30.3383 54.9731 26.8902C53.2727 23.4422 50.6413 20.5389 47.3765 18.5087C44.1117 16.4785 40.3439 15.4026 36.4994 15.4026L36.4994 10.2861Z"
              fill="#7D3EB9"
            />
          </svg>
          <div
            v-else-if="validating"
            class="w-full flex flex-col justify-center items-center"
          >
            <p class="text-xs text-flux-primary">{{ validating.progress }}%</p>
            <ProgressRoot
              class="mt-3 rounded-full relative h-[9px] w-full max-w-[240px] overflow-hidden bg-surface-container-highest"
            >
              <ProgressIndicator
                class="rounded-full block relative w-full h-full bg-flux-primary transition-transform overflow-hidden duration-700 ease-out"
                :style="`transform: translateX(-${100 - validating.progress}%)`"
              />
            </ProgressRoot>
          </div>
          <NuxtImg
            v-else
            provider="provider"
            :src="pathIcon"
            alt="input-image"
            width="72px"
          />
        </div>
        <p class="text-xs font-bold">{{ makeLabel }}</p>
        <div
          class="flex flex-col gap-1 justify-center items-center text-flux-outline text-xs"
        >
          <div class="flex gap-1">
            <p v-text="suggestionLabel" />
            <p class="font-bold underline text-flux-primary">pilih file</p>
          </div>
          <p v-if="additionalLabel" v-text="additionalLabel" />
        </div>
      </div>

      <input
        ref="fileRef"
        type="file"
        class="hidden"
        :accept="props.accept.join(',')"
        @change="onChange"
      />
    </div>
  </div>
</template>
