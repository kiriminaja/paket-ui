<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    defaultValue?: string
    modelValue?: string
    class?: HTMLAttributes['class']
    invalid?: boolean
    id?: HTMLAttributes['id']
    name?: string
    disabled?: boolean
    placeholder?: string
    maxLength?: number
    autocomplete?: string
    withLeading?: boolean
    withTrailing?: boolean
  }>(),
  {
    defaultValue: undefined,
    modelValue: undefined,
    class: undefined,
    id: undefined,
    name: undefined,
    placeholder: '8XXXXXXXXXXX',
    maxLength: 13,
    autocomplete: undefined,
    withLeading: true,
    withTrailing: true
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const phoneInputRef = useTemplateRef('phoneInputRef')

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()

  const clipboardData = (
    event.clipboardData?.getData('text/plain') || ''
  ).trim()

  let clipboardValue = clipboardData.replace(/[^\d]+/g, '').trim()

  if (clipboardValue.startsWith('+62'))
    clipboardValue = clipboardValue.replace('+62', '')
  if (clipboardValue.startsWith('62'))
    clipboardValue = clipboardValue.replace('62', '')
  if (clipboardValue.startsWith('0')) clipboardValue = clipboardValue.slice(1)

  return (modelValue.value = clipboardValue.slice(0, props.maxLength))
}

defineExpose({
  setFocus: () => phoneInputRef.value?.$el.focus()
})
</script>

<template>
  <div class="relative w-full items-center">
    <UiInputField
      :id="props.id"
      ref="phoneInputRef"
      v-model="modelValue"
      type="text"
      :invalid="invalid"
      :class="cn({ 'pl-11': withLeading, 'pr-11': withTrailing }, props.class)"
      inputmode="tel"
      :maxlength="maxLength"
      :name="props.name"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :autocomplete="autocomplete"
      @paste="onPaste"
    />
    <span
      v-if="withLeading"
      class="absolute left-0 inset-y-0 flex items-center justify-center pl-3.5 text-on-surface-variant peer-data-[invalid=true]:text-flux-error peer-data-[invalid=true]:peer-focus-visible:text-on-surface-variant text-sm font-medium"
      :class="{ 'opacity-50': props.disabled }"
    >
      +62
    </span>
    <span
      v-if="withTrailing"
      class="absolute right-0 inset-y-0 flex items-center justify-center pr-3.5 text-flux-primary peer-data-[invalid=true]:text-flux-error peer-data-[invalid=true]:peer-focus-visible:text-flux-primary"
      :class="{ 'opacity-50': props.disabled }"
    >
      <Icon name="mdi:phone-outline" size="24px" />
    </span>
  </div>
</template>
