<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    invalid?: boolean
    disabled?: boolean
    placeholder?: string
    defaultValue?: Date
    modelValue?: Date
    yearRange?: [number, number]
    maxDate?: Date
    minDate?: Date
  }>(),
  {
    class: undefined,
    defaultValue: undefined,
    modelValue: undefined,
    placeholder: 'Pilih tanggal',
    yearRange: () => [2020, new Date().getFullYear()],
    maxDate: () => new Date(),
    minDate: undefined
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload?: Date): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const renderedRange = computed(() => {
  if (!modelValue.value) return undefined

  return formatDateLongMonth(modelValue.value.toString())
})

const showPicker = ref(false)
</script>

<template>
  <UiDropdown
    v-model="showPicker"
    :class="
      cn(
        'rounded-lg min-w-64 relative transition-all font-normal inline-flex justify-between bg-background dark:bg-surface-container-high gap-3 text-sm py-2 px-2.5 items-center border border-outline-variant outline-none focus:ring-1 focus:border-flux-primary focus:ring-flux-primary',
        props.class
      )
    "
  >
    <span
      :class="{
        'text-flux-outline': !renderedRange
      }"
      >{{ renderedRange ?? placeholder }}</span
    >
    <Icon
      name="material-symbols:calendar-month-outline-rounded"
      size="24px"
      class="text-flux-primary absolute right-2 top-1/2 -translate-y-1/2"
    />
    <template #content>
      <UiDatepickerBody
        v-model:date="modelValue"
        :min-date="props.minDate"
        :max-date="props.maxDate"
      />
    </template>
  </UiDropdown>
</template>
