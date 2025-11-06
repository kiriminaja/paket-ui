<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { TModel } from '.'

const props = withDefaults(
  defineProps<{
    modelValue?: TModel
    displayValue?: (par: TModel) => void
    placeholder?: string
    presets?: boolean
    types?: Record<string, string>
  }>(),
  {
    modelValue: undefined,
    displayValue: undefined,
    placeholder: 'Pilih Periode...',
    presets: true,
    types: undefined
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', newValue?: TModel): string
}>()

const range = useVModel(props, 'modelValue', emit)
const renderedRange = computed(() => {
  if (!range.value?.period_start_date || !range.value?.period_end_date)
    return undefined

  if (props.displayValue) return props.displayValue(range.value)

  const start = formatDateShortMonth(range.value?.period_start_date)
  const end = formatDateShortMonth(range.value?.period_end_date)

  return start + ' - ' + end
})

const open = ref(false)
const rangeType = ref(range.value?.period_type)

const handleApply = (period?: TModel) => {
  range.value = { ...period, period_type: rangeType.value }
  open.value = false
}

watch(open, (value) => {
  if (!value) return
  rangeType.value = range.value?.period_type
})
</script>

<template>
  <UiDropdown
    v-model="open"
    class="rounded-lg transition-all relative font-normal lg:min-w-44 inline-flex justify-between bg-background dark:bg-surface-container-high gap-3 text-sm py-2 pl-2.5 pr-10 items-center border border-outline-variant outline-none focus:ring-1 focus:border-flux-primary focus:ring-flux-primary"
    content-class="p-0"
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
      <UiRangePickerBody
        v-model="range"
        :presets="presets"
        @update:model-value="handleApply"
      >
        <template v-if="types && range" #types>
          <div class="flex text-sm grow items-center gap-1">
            <span class="text-xs">Tanggal:</span>
            <select
              id="date-type-picker"
              v-model="rangeType"
              class="font-semibold px-2 py-1 text-xs bg-transparent rounded-lg border border-outlineVariant appearance-none focus:ring-1 focus:ring-flux-primary focus:border-flux-primary focus:outline-none w-auto"
              name="type"
            >
              <option
                v-for="key in Object.keys(types)"
                :key="key"
                :value="key"
                v-text="types[key]"
              />
            </select>
          </div>
        </template>
      </UiRangePickerBody>
    </template>
  </UiDropdown>
</template>
