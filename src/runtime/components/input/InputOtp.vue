<script setup lang="ts">
import { PinInputInput, PinInputRoot } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  modelValue?: string
  class?: HTMLAttributes['class']
  placeholder?: HTMLAttributes['placeholder']
  numberOfInputs?: number
  disabled?: boolean
  required?: boolean
  invalid?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload?: string): void
  (e: 'complete'): void
}>()

const isPaste = ref(false)
const inputRefs = useTemplateRef('inputRefs')

defineExpose({
  inputRefs
})

const modelValue = computed({
  get: () => props.modelValue?.replace(/\D/g, '').split(''),
  set: (value) => emits('update:modelValue', value?.join('').replace(/\D/g, ''))
})

const setFocus = () => {
  if (inputRefs.value && inputRefs.value.length > 0) {
    inputRefs.value[0]?.$el.focus()
  }
}

const onKeyPress = (event: KeyboardEvent) => {
  if (
    event.key === 'Enter' &&
    modelValue.value?.length === props.numberOfInputs
  )
    emits('complete')
  if (event.key.match(/[0-9]/) || event.metaKey) return true
  return event.preventDefault()
}

const handleComplete = () => {
  if (isPaste.value) emits('complete')
  isPaste.value = false
}

onMounted(() => {
  setFocus()
})
</script>

<template>
  <PinInputRoot
    v-model="modelValue"
    :placeholder="props.placeholder"
    :class="cn('flex gap-3 justify-center items-center', props.class)"
    :required="props.required"
    :disabled="props.disabled"
    otp
    @complete="handleComplete"
  >
    <PinInputInput
      v-for="(num, index) in numberOfInputs"
      ref="inputRefs"
      :key="num"
      :index="index"
      class="w-10 h-10 md:w-12 md:h-12 bg-surfaceContainerLowest rounded-xl text-center border border-outlineVariant focus-visible:outline-none ring-0 focus:ring-offset-1 focus:ring-offset-flux-primary outline-none"
      :class="[
        props.invalid
          ? 'text-flux-error ring-offset-1 ring-offset-flux-error focus:border-flux-error'
          : 'text-onSurface ring-offset-0 ring-offset-flux-primary focus:border-flux-primary'
      ]"
      inputmode="tel"
      @keypress="onKeyPress"
      @paste="isPaste = true"
    />
  </PinInputRoot>
</template>
