<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  type AcceptableValue,
  type SelectItemSelectEvent
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    modelValue?: AcceptableValue[]
    defaultModelValue?: AcceptableValue[]
    options: Record<string, AcceptableValue>[]
    placeholder?: string
    valueKey?: string
    labelKey?: string
    invalid?: boolean
    widthContent?: string
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
    icon: 'material-symbols:keyboard-arrow-down'
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue', payload?: AcceptableValue[]): void
  (e: 'select-all'): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultModelValue
})

const onSelectAll = (e: SelectItemSelectEvent<AcceptableValue>) => {
  e.preventDefault()
  modelValue.value = []
  emits('select-all')
}
</script>

<template>
  <SelectRoot v-model="modelValue" multiple>
    <slot>
      <SelectTrigger
        :class="
          cn(
            'flex justify-between relative text-left items-start pl-2.5 pr-10 py-2 text-sm rounded-lg border border-outline-variant focus-visible:outline-none ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-flux-primary disabled:cursor-not-allowed disabled:opacity-50 peer focus-visible:text-onSurface focus-visible:bg-surfaceContainerLowest',
            [
              props.invalid
                ? 'text-flux-error ring-inset-1 ring-inset-flux-error focus:border-flux-error bg-surfaceContainerLow'
                : 'text-onSurface ring-inset-0 ring-inset-flux-primary focus:border-flux-primary bg-surfaceContainerLowest'
            ],
            props.class
          )
        "
      >
        <SelectValue>
          <template #default="{ selectedLabel }">
            <slot
              v-if="selectedLabel.length"
              name="label"
              :count="selectedLabel.length"
            >
              <span>{{ selectedLabel.length + ' Terpilih' }}</span>
            </slot>
            <span v-else class="text-flux-outline">{{ placeholder }}</span>
          </template>
        </SelectValue>
        <Icon
          :name="props.icon"
          class="text-flux-primary shrink-0 absolute right-2.5 top-1/2 -translate-y-1/2"
          size="24px"
        />
      </SelectTrigger>
    </slot>

    <SelectPortal>
      <SelectContent
        class="bg-background rounded-md shadow-lg z-100 border border-outline-variant p-2"
        :class="{ 'w-[--reka-select-trigger-width]': !widthContent }"
        :style="{ width: widthContent }"
        position="popper"
        :body-lock="false"
        :side-offset="4"
      >
        <UiScrollAreaBase
          class="h-fit max-h-60"
          class-viewport="h-fit max-h-60"
        >
          <SelectViewport class="w-full h-full">
            <SelectGroup>
              <SelectItem
                class="text-sm text-on-surface rounded-xl flex items-center justify-between gap-1 px-4 py-2 data-[highlighted]:outline-none data-[highlighted]:bg-surface-container cursor-default"
                value="all"
                @select="onSelectAll"
              >
                <SelectItemText> Semua </SelectItemText>
              </SelectItem>
              <SelectItem
                v-for="(option, index) in options"
                :key="`option-${option[props.valueKey]}-${index}`"
                class="text-sm text-on-surface rounded-xl flex items-center gap-2 px-4 py-2 data-[highlighted]:outline-none data-[highlighted]:bg-surface-container group cursor-default data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
                :value="option[props.valueKey] || '-'"
                :disabled="!!option.disabled"
              >
                <div
                  class="flex-none w-6 h-6 rounded-md flex justify-center items-center border-2 border-outline-variant bg-transparent group-data-[state=checked]:bg-flux-primary group-data-[state=checked]:border-flux-primary"
                >
                  <Icon
                    name="material-symbols:check"
                    class="text-background hidden group-data-[state=checked]:block"
                    size="20px"
                  />
                </div>
                <SelectItemText>
                  {{ option[labelKey] }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </UiScrollAreaBase>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
