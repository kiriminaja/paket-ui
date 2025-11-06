<template>
  <div class="flex flex-col">
    <div v-if="label" class="mb-1 flex justify-between">
      <UiLabelBaseLabel
        v-if="label"
        :text="label"
        :for="id"
        :is-required="required"
        :class="cn('inline-block', props.labelClass)"
      />
      <span v-if="hint && props.maxLength" class="text-xs text-flux-outline">
        {{ content?.toString().length ?? 0 }} / {{ props.maxLength }}
      </span>
    </div>
    <div class="relative">
      <div
        v-if="slots.leading"
        class="absolute left-3 top-1/2 text-sm -translate-y-1/2"
      >
        <slot name="leading" />
      </div>
      <UiInputField
        :id="id"
        v-model="content"
        :class="[inputClasses]"
        :type="type"
        :max="max"
        :allow-emoji="allowEmoji"
        :placeholder="placeholder ?? label ?? ''"
        :required="required"
        :autocomplete="autocomplete"
        :max-length="maxLength"
        :maxlength="maxLength"
        :invalid="!!errorMessage"
        :inputmode="inputmode"
        :input-mask="inputMask"
        :tabindex="tabIndex"
        :local-tel="localTel"
        :disabled="disabled"
      />
      <div
        v-if="slots.trailing || props.trailing"
        class="absolute right-3 top-1/2 text-xs -translate-y-1/2"
      >
        <slot name="trailing">{{ props.trailing }}</slot>
      </div>
    </div>
    <p
      v-if="errorMessage"
      class="text-flux-error text-xs mt-1 font-semibold"
      v-text="errorMessage"
    />
  </div>
</template>

<script setup lang="ts">
// DEPRECATED: Use UiInputField and UiInputControl instead
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import type { inputMaskingConfiguration } from '.'

const props = defineProps<{
  id?: string
  modelValue?: string | number
  errorMessage?: string
  label?: string
  autocomplete?: InputHTMLAttributes['autocomplete']
  inputClass?: HTMLAttributes['class']
  placeholder?: InputHTMLAttributes['placeholder']
  type?: InputHTMLAttributes['type']
  disabled?: InputHTMLAttributes['disabled']
  required?: boolean
  inputMask?: keyof typeof inputMaskingConfiguration
  maxLength?: HTMLInputElement['maxLength']
  maxClipboardLength?: number
  inputmode?: HTMLAttributes['inputmode']
  labelClass?: HTMLAttributes['class']
  inputWrapperClass?: HTMLAttributes['class']
  tabIndex?: string | number
  allowEmoji?: boolean
  trailing?: string
  max?: InputHTMLAttributes['max']
  localTel?: boolean
  hint?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string | number): void
  (e: 'removeError'): void
  (e: 'focus' | 'blur', evt: FocusEvent): void
}>()

const slots = useSlots()
const content = useVModel(props, 'modelValue', emit)

const inputClasses = computed(() =>
  cn([
    {
      'pl-10': slots.leading,
      'pr-10': slots.trailing || props.trailing
    },
    props.inputClass
  ])
)
</script>
