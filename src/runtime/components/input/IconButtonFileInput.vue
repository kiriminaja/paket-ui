<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { sizeConfig, variantConfig } from '../button'

type TFileOptions = {
  type: 'image' | 'video' | 'file' | 'media'
  description?: string
  label?: string
  multiple?: boolean
  accept?: string
  iconName?: string
}

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    iconName?: string
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    disabled?: boolean
    fileOptions?: TFileOptions[]
  }>(),
  {
    class: undefined,
    iconName: 'mdi:plus',
    variant: 'primaryOutline',
    size: 'default',
    disabled: false,
    fileOptions: () => {
      return [
        {
          type: 'image',
          label: 'Gambar & Video',
          description: 'Max 2 MB',
          iconName: 'material-symbols:image-outline',
          accept: 'image/*,video/*'
        },
        {
          type: 'file',
          label: 'Dokumen',
          description: 'Max 2 MB',
          iconName: 'material-symbols:file-copy-outline',
          accept: '.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip'
        }
      ]
    }
  }
)

const emits = defineEmits<{
  (e: 'onChange', payload: FileList | null): void
  (e: 'onSelect', payload: TFileOptions): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isMultiple = ref(true)
const accept = ref('image/*')

const openFileInput = (e: TFileOptions) => {
  isMultiple.value =
    props.fileOptions?.find((el) => el.type === e.type)?.multiple ?? true
  accept.value =
    props.fileOptions?.find((el) => el.type === e.type)?.accept ?? 'image/*'

  emits('onSelect', e)
  nextTick(() => fileInputRef.value?.click())
}

const onChange = () => {
  if (fileInputRef.value) {
    const files = fileInputRef.value?.files ?? null
    emits('onChange', files)
    fileInputRef.value.value = ''
  }
}
</script>

<template>
  <UiDropdown
    :icon-name="props.iconName"
    :class="props.class"
    :disabled="props.disabled"
    :variant="props.variant"
  >
    <template #content>
      <UiDropdownItem
        v-for="(fileOption, index) in props.fileOptions"
        :key="index"
        @click.prevent="openFileInput(fileOption)"
      >
        <p class="text-sm font-medium">
          {{ fileOption.label }}
          <span class="text-outline"> {{ fileOption.description }}</span>
        </p>
        <Icon
          :name="fileOption?.iconName || 'material-symbols:image-outline'"
          class="text-flux-primary"
          size="20px"
        />
      </UiDropdownItem>
    </template>
  </UiDropdown>
  <input
    ref="fileInputRef"
    type="file"
    class="hidden"
    :disabled="props.disabled"
    :multiple="isMultiple"
    :accept="accept"
    @change="onChange"
  />
</template>
