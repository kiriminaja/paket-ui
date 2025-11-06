<script
  setup
  lang="ts"
  generic="T extends Record<string, AcceptableValue | boolean | undefined>"
>
import type { HTMLAttributes } from 'vue'
import type { inputMaskingConfiguration } from '.'
import {
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxViewport,
  useForwardProps,
  type AcceptableValue
} from 'reka-ui'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  invalid?: boolean
  allowEmoji?: boolean
  inputmode?: HTMLAttributes['inputmode']
  maxLength?: HTMLInputElement['maxLength']
  inputMask?: keyof typeof inputMaskingConfiguration
  localTel?: boolean
  options?: T[]
}>()

const emits = defineEmits<{
  (e: 'select', payload: T): void
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits)

const forwarded = useForwardProps(props)

const open = ref(false)

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <ComboboxRoot
    v-model:open="open"
    class="relative"
    ignore-filter
    :reset-search-term-on-blur="false"
    :reset-search-term-on-select="false"
  >
    <ComboboxInput v-model="modelValue" as-child>
      <UiInputField
        v-bind="{ ...$attrs, ...forwarded }"
        v-model="modelValue"
        :options="undefined"
        @paste="open = true"
      />
    </ComboboxInput>

    <ComboboxContent
      v-if="options?.length"
      class="absolute w-full max-h-60 mt-1 bg-background rounded-md shadow-lg z-100 border p-2"
    >
      <ComboboxViewport>
        <ComboboxGroup>
          <ComboboxItem
            v-for="(option, index) in options"
            :key="index"
            class="rounded-xl data-[highlighted]:outline-none data-[highlighted]:bg-surface-container-low"
            :value="option"
            @select="emits('select', option)"
          >
            <slot name="option" :item="option" />
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
