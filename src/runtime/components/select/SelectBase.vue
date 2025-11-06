<script setup lang="ts">
import { useElementVisibility, useVModel } from '@vueuse/core'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  type AcceptableValue
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    modelValue?: AcceptableValue
    defaultModelValue?: AcceptableValue
    options: Record<string, AcceptableValue>[]
    placeholder?: string
    valueKey?: string
    labelKey?: string
    invalid?: boolean
    widthContent?: string
    ableToNextPage?: boolean
    icon?: string
  }>(),
  {
    class: undefined,
    modelValue: undefined,
    defaultModelValue: undefined,
    placeholder: 'Pilih Satu',
    valueKey: 'id',
    labelKey: 'label',
    widthContent: undefined,
    ableToNextPage: false,
    icon: 'material-symbols:keyboard-arrow-down'
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload?: AcceptableValue): void
  (e: 'nextPage'): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultModelValue
})

const getLabel = (value: AcceptableValue | AcceptableValue[] | undefined) => {
  const option = props.options.find((item) => item[props.valueKey] === value)
  return option ? option[props.labelKey] : ''
}

const getIcon = (value: AcceptableValue | AcceptableValue[] | undefined) => {
  const option = props.options.find((item) => item[props.valueKey] === value)
  return option && option.icon ? option.icon : ''
}

const bottomOfListRef = useTemplateRef('bottomOfListRef')
const bottomOfListVisible = useElementVisibility(bottomOfListRef)

watch(
  bottomOfListVisible,
  (visible) => {
    if (visible) emits('nextPage')
  },
  { immediate: true }
)
</script>

<template>
  <SelectRoot v-model="modelValue" autocomplete="off">
    <SelectTrigger
      :class="
        cn(
          'flex justify-between items-center pl-2.5 py-2 pr-10 relative text-sm rounded-lg border border-outlineVariant focus-visible:outline-none ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-flux-primary disabled:cursor-not-allowed disabled:opacity-50 peer focus-visible:text-onSurface focus-visible:bg-surfaceContainerLowest data-[placeholder]:text-flux-outline disabled:bg-surface-container-low',
          [
            props.invalid
              ? `text-flux-error data-[state='open']:ring-flux-error focus:ring-1 focus:ring-flux-error focus:border-flux-error bg-surfaceContainerLow`
              : `text-onSurface data-[state='open']:ring-flux-primary focus:ring-1 focus:ring-flux-primary focus:border-flux-primary bg-background dark:bg-surface-container-high`
          ],
          props.class
        )
      "
    >
      <SelectValue class="flex gap-2 items-center">
        <template #default="{ selectedLabel, modelValue: selectedValue }">
          <slot :selected-label="selectedLabel" :selected-value="selectedValue">
            <Icon
              v-if="getIcon(selectedValue)"
              :name="getIcon(selectedValue)"
              size="20px"
            />
            <span
              class="line-clamp-1 text-left grow"
              :class="{
                'text-flux-outline': !selectedLabel.length
              }"
            >
              {{ selectedLabel.length ? getLabel(selectedValue) : placeholder }}
            </span>
          </slot>
        </template>
      </SelectValue>
      <Icon
        :name="props.icon"
        class="text-flux-primary absolute right-2 top-1/2 -translate-y-1/2"
        size="24px"
      />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="bg-background rounded-lg shadow-lg z-100 border border-outline-variant p-1.5"
        :class="{ 'w-[--reka-select-trigger-width]': !widthContent }"
        :style="{ width: widthContent }"
        position="popper"
        :side-offset="4"
      >
        <UiScrollAreaBase
          class="h-fit max-h-60"
          class-viewport="h-fit max-h-60"
        >
          <SelectViewport class="w-full h-full">
            <SelectGroup>
              <SelectItem
                v-for="(option, index) in props.options"
                :key="`option-${option[props.valueKey]}-${index}`"
                ref="itemRef"
                class="text-sm text-on-surface rounded-lg flex items-center justify-between gap-1 px-2.5 py-2 data-[highlighted]:outline-none data-[highlighted]:bg-surface-container data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed"
                :value="option[props.valueKey] || '-'"
                :disabled="!!option.disabled"
              >
                <SelectItemText class="flex gap-2 items-center">
                  <slot name="option" :option="option">
                    <Icon v-if="option.icon" :name="option.icon" size="20px" />
                    {{ option[labelKey] }}
                  </slot>
                </SelectItemText>
                <SelectItemIndicator class="flex-none w-5 h-5">
                  <Icon
                    name="material-symbols:check"
                    class="text-flux-primary"
                    size="20px"
                  />
                </SelectItemIndicator>
              </SelectItem>
            </SelectGroup>
            <div
              v-if="ableToNextPage"
              ref="bottomOfListRef"
              class="w-full h-2"
            ></div>
          </SelectViewport>
        </UiScrollAreaBase>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
