<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxRoot,
  ComboboxViewport,
  useFilter,
  type ListboxItemSelectEvent
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  modelValue?: string[]
  defaultValue?: string[]
  modelValueQuery?: string
  class?: HTMLAttributes['class']
  invalid?: boolean
  placeholder?: string
  spaceToAdd?: boolean
  options?: string[]
  ignoreFilter?: boolean
  minLength?: number
  maxLength?: number
  duplicate?: boolean
  tagValidation?: (tag: string) => boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
  (e: 'update:modelValueQuery', value: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue
})

const modelValueQuery = useVModel(props, 'modelValueQuery', emits)

const { contains } = useFilter({ sensitivity: 'base' })

const tagsInput = useTemplateRef('tagsInput')

defineExpose({
  focus: () => {
    tagsInput.value?.focus()
  }
})

const filteredOptions = computed(() => {
  const result = props.ignoreFilter
    ? props.options?.filter((option) => !modelValue.value?.includes(option))
    : props.options?.filter(
        (option) =>
          contains(option, modelValueQuery.value || '') &&
          !modelValue.value?.includes(option)
      )

  if (result?.length) return result
  if (modelValue.value?.includes(modelValueQuery.value || '')) return []
  if (
    modelValueQuery.value &&
    modelValueQuery.value.length >= (props.minLength ?? 1)
  )
    return [modelValueQuery.value]
  return []
})

const onSelect = (event: ListboxItemSelectEvent<string>) => {
  event.preventDefault()
  if (!event.detail.value) return
  modelValue.value?.push(event.detail.value)
  modelValueQuery.value = ''
}
</script>

<template>
  <ComboboxRoot ignore-filter class="relative">
    <UiTagsInput
      ref="tagsInput"
      v-model="modelValue"
      v-model:model-value-query="modelValueQuery"
      :class="props.class"
      :invalid="props.invalid"
      :placeholder="props.placeholder"
      :space-to-add="props.spaceToAdd"
      :with-option="true"
      :max-length="props.maxLength"
      :tag-validation="props.tagValidation"
      :duplicate="props.duplicate"
    />

    <ComboboxContent
      v-if="filteredOptions.length"
      class="absolute w-full mt-1 bg-background rounded-md shadow-lg z-100 border p-2"
    >
      <UiScrollAreaBase class="h-min max-h-60">
        <ComboboxViewport class="w-full h-full">
          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, index) in filteredOptions"
              :key="index"
              class="text-sm text-on-surface rounded-xl flex items-center justify-between gap-1 px-4 py-2 data-[highlighted]:outline-none data-[highlighted]:bg-surface-container"
              :value="option"
              @select="onSelect"
            >
              <span>
                {{ option }}
              </span>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </UiScrollAreaBase>
    </ComboboxContent>
  </ComboboxRoot>
</template>
