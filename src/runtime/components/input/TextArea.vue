<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { BASE_CLASS, BASE_INVALID_CLASS, inputMaskingConfiguration } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    defaultValue?: string | number | null
    modelValue?: string | number | null
    invalid?: boolean
    inputMask?: keyof typeof inputMaskingConfiguration
    maxlength?: HTMLTextAreaElement['maxLength'] | string
    allowEmoji?: boolean
  }>(),
  {
    class: undefined,
    defaultValue: undefined,
    modelValue: undefined,
    inputMask: 'default',
    maxlength: undefined
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number | null): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const maskedValue = computed({
  get: () =>
    inputMaskingConfiguration[props.inputMask].get(
      modelValue.value || undefined
    ),
  set: (value) =>
    (modelValue.value = inputMaskingConfiguration[props.inputMask].set(value))
})

const onInput = (e: Event) => {
  const inputEl = e.target as HTMLInputElement

  if (!props.allowEmoji && emojiRegex.test(inputEl.value)) {
    modelValue.value = inputEl.value = inputEl.value.replace(emojiRegex, '')
  }
}

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault()

  const clipboardData = (
    event.clipboardData?.getData('text/plain') || ''
  ).trim()

  const start = textInputRef.value?.selectionStart ?? 0
  const end = textInputRef.value?.selectionEnd ?? 0
  const currentValue = modelValue.value?.toString() ?? ''

  // Compose new value with pasted data
  let newValue: string | number | undefined =
    currentValue.slice(0, start) + clipboardData + currentValue.slice(end)

  newValue = inputMaskingConfiguration[props.inputMask].set(newValue)

  if (!props.allowEmoji && emojiRegex.test(newValue?.toString() || '')) {
    newValue = newValue?.toString().replace(emojiRegex, '')
  }

  if (props.maxlength) {
    newValue = newValue
      ?.toString()
      .slice(0, parseInt(props.maxlength.toString()))
  }

  modelValue.value = newValue

  // Move cursor after pasted text
  nextTick(() => {
    const pos = start + clipboardData.length
    textInputRef.value?.setSelectionRange(pos, pos)
  })
}

const textInputRef = ref<HTMLTextAreaElement | null>(null)

defineExpose({
  textInputRef,
  focus: () => {
    textInputRef.value?.focus?.()
  }
})
</script>

<template>
  <textarea
    ref="textInputRef"
    v-model="maskedValue"
    :class="
      cn(
        BASE_CLASS,
        'flex min-h-[76px]',
        props.invalid ? BASE_INVALID_CLASS : '',
        props.class
      )
    "
    :maxlength="maxlength"
    @paste="onPaste"
    @input="onInput"
  />
</template>
