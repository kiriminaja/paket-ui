<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    modelValue?: File
    defaultValue?: File
    pathIcon?: string
    suggestionLabel?: string
    additionalLabel?: string
    maxFileSize?: number
    accept?: string[]
    buttonLabel?: string
    uploadedLabel?: string
  }>(),
  {
    additionalLabel: 'Pilih file .jpeg, .jpg atau .png untuk diupload',
    pathIcon: '/svg/placeholder/upload.svg',
    suggestionLabel: 'Letakkan file kamu di sini atau',
    maxFileSize: 10 * 1024 * 1024,
    accept: () => ['.jpg', '.jpeg', '.png'],
    buttonLabel: 'Ubah'
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: File): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const isCropper = ref(false)
const fileRef = ref<HTMLInputElement | null>(null)
const imageState = ref<{
  url: string
  file: File | null
  isDrag: boolean
  errorMessage: string | null
}>({
  url: '',
  file: null,
  isDrag: false,
  errorMessage: null
})

const previewModelValue = computed(() => {
  return modelValue.value ? URL.createObjectURL(modelValue.value) : null
})

const openFile = () => {
  if (previewModelValue.value) return
  fileRef.value?.click()
}

const changeFile = (e: Event) => {
  e.stopPropagation()
  fileRef.value?.click()
}

const onChangeCropper = (file: File) => {
  imageState.value.file = file
  modelValue.value = file
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
  imageState.value.errorMessage = null
  if (!fileRef.value) return

  const file = fileRef.value.files?.item(0)
  fileRef.value.value = ''

  if (!file) return (imageState.value.errorMessage = 'File tidak ditemukan.')

  const validateMessage = validateFile(file)
  if (validateMessage) return (imageState.value.errorMessage = validateMessage)

  imageState.value.url = URL.createObjectURL(file)
  isCropper.value = true
}

const drop = (event: DragEvent) => {
  imageState.value.errorMessage = null
  const file = event.dataTransfer?.files[0] ?? undefined

  if (!file) return (imageState.value.errorMessage = 'File tidak ditemukan.')

  const validateMessage = validateFile(file)
  if (validateMessage) return (imageState.value.errorMessage = validateMessage)

  imageState.value.url = URL.createObjectURL(file)
  isCropper.value = true
}
</script>

<template>
  <div>
    <UiDialogConfirmationSingle
      title="Gagal Unggah File"
      :show="!!imageState.errorMessage"
      :description="imageState.errorMessage || ''"
      image="/img/fail-redemption.png"
      button-label="Oke"
      @close="imageState.errorMessage = null"
      @submit="imageState.errorMessage = null"
    />

    <UiCropperImage
      :show="isCropper"
      :url="imageState.url"
      @onChange="onChangeCropper"
      @close="isCropper = false"
    />

    <div
      @dragover.prevent="imageState.isDrag = true"
      @dragleave.prevent="imageState.isDrag = false"
      @drop.stop.prevent="
        ($event) => {
          drop($event)
        }
      "
      draggable
      class="border border-outlineVariant transition duration-300 box-center px-2 rounded-3xl"
      :class="[
        previewModelValue
          ? 'border-none bg-surfaceContainerLow'
          : 'cursor-pointer border-dashed hover:bg-surfaceContainerLow'
      ]"
      @click="openFile"
    >
      <div
        v-if="!previewModelValue"
        class="flex flex-col pointer-events-none justify-center items-center gap-2 py-14"
      >
        <NuxtImg
          provider="provider"
          :src="pathIcon"
          alt="input-image"
          width="56px"
        />
        <div
          class="flex flex-col gap-1 justify-center items-center text-flux-outline text-xs"
        >
          <div class="flex gap-1">
            <p v-text="suggestionLabel" />
            <p class="font-bold underline">pilih file</p>
          </div>
          <p v-if="additionalLabel" v-text="additionalLabel" />
        </div>
      </div>

      <div
        v-if="previewModelValue"
        class="flex flex-col justify-center items-center gap-y-4"
      >
        <div class="w-full md:w-80 text-center overflow-clip relative">
          <NuxtImg
            v-if="previewModelValue"
            :src="previewModelValue"
            class="w-full h-auto shadow-2xl"
            alt="uploaded-image"
          />

          <p
            v-if="uploadedLabel"
            class="text-[11px] py-1 text-onPrimary font-semibold absolute bottom-0 inset-x-0 bg-flux-primary opacity-80"
          >
            {{ uploadedLabel }}
          </p>

          <div class="absolute inset-x-0 bottom-8 flex justify-center">
            <UiButtonBaseButton
              variant="primaryOutline"
              class="bg-surfaceContainerLowest"
              size="sm"
              :label="buttonLabel"
              @click="changeFile"
            />
          </div>
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
