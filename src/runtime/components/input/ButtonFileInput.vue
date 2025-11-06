<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { sizeConfig, variantConfig } from '../button'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    iconName?: string
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    disabled?: boolean
    isMultiple?: boolean
    accept?: string[]
    label?: string
    maxFileSize?: number
  }>(),
  {
    iconName: 'material-symbols:upload',
    size: 'default',
    variant: 'primaryOutline',
    isMultiple: false,
    accept: () => ['.jpg', '.jpeg', '.png'],
    label: 'Upload',
    maxFileSize: 10 * 1024 * 1024
  }
)

const emits = defineEmits<{
  (e: 'onChange', payload: FileList | null): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const errorMessage = ref<string | null>(null)

const openFileInput = () => fileInputRef.value?.click()

const validateFile = (file?: File | null) => {
  if (!file) return 'File tidak ditemukan.'

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

const fileInputOnChange = () => {
  errorMessage.value = null
  if (!fileInputRef.value) return

  const fileLength = fileInputRef.value.files?.length
  if (!fileLength) {
    fileInputRef.value.value = ''
    return (errorMessage.value = 'File tidak ditemukan.')
  }

  for (let i = 0; i < fileLength; i++) {
    const validateMessage = validateFile(fileInputRef.value.files?.item(i))
    if (validateMessage) {
      fileInputRef.value.value = ''
      return (errorMessage.value = validateMessage)
    }
  }

  emits('onChange', fileInputRef.value.files)
  fileInputRef.value.value = ''
}
</script>

<template>
  <UiDialogConfirmationSingle
    title="Gagal Unggah File"
    :show="!!errorMessage"
    :description="errorMessage || ''"
    image="/img/fail-redemption.png"
    button-label="Oke"
    @close="errorMessage = null"
    @submit="errorMessage = null"
  />
  <UiButtonIconButton
    :label="props.label"
    :icon-name="props.iconName"
    :variant="props.variant"
    :size="props.size"
    :class="props.class"
    :disabled="props.disabled"
    @click="openFileInput"
  />
  <input
    @change="fileInputOnChange"
    ref="fileInputRef"
    type="file"
    class="hidden"
    :disabled="props.disabled"
    :multiple="isMultiple"
    :accept="props.accept.join(',')"
  />
</template>
