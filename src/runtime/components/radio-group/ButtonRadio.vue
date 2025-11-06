<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot, type AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

type TRadioOptions = {
  label: string
  value: AcceptableValue | boolean
  icon?: string
  description?: string
  disabled?: boolean
}

const props = defineProps<{
  defaultValue?: AcceptableValue | boolean
  modelValue?: AcceptableValue | boolean
  class?: HTMLAttributes['class']
  optionClass?: HTMLAttributes['class']
  optionSelectedClass?: HTMLAttributes['class']
  disabled?: boolean
  options: TRadioOptions[]
  noIcon?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload?: AcceptableValue | boolean): void
}>()

const castAcceptableValue = (value?: AcceptableValue | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }
  return value
}

const modelValue = computed({
  get: () => {
    if (typeof props.modelValue === 'boolean') {
      return props.modelValue ? 'true' : 'false'
    }
    return props.modelValue
  },
  set: (value) => {
    if (['true', 'false'].includes(value as string)) {
      emits('update:modelValue', value === 'true' ? true : false)
      return
    }
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <RadioGroupRoot
    v-model="modelValue"
    :class="cn('grid gap-3', props.class)"
    :disabled="props.disabled"
    :default-value="castAcceptableValue(props.defaultValue)"
  >
    <RadioGroupItem
      v-for="(option, index) in props.options"
      :id="`radio-index-${index}`"
      :key="`index-${index}`"
      :value="castAcceptableValue(option.value)"
      :disabled="option.disabled"
      :class="
        cn(
          'cursor-pointer flex text-left items-center gap-x-2 focus-visible:bg-surface-container-low dark:focus-visible:bg-secondary-container focus-visible:shadow-lg outline-none rounded-lg px-3 py-2.5 [data-disabled]:cursor-not-allowed [data-disabled]:opacity-50',
          modelValue == castAcceptableValue(option.value)
            ? [
                'border border-flux-primary ring-1 ring-flux-primary bg-secondary-container',
                props.optionSelectedClass
              ]
            : 'border border-outline-variant',
          props.optionClass
        )
      "
    >
      <template #default="{ checked }">
        <slot
          v-if="!props.noIcon"
          name="icon"
          :active="checked"
          :value="castAcceptableValue(option.value)"
        >
          <div
            :class="{
              'p-1 rounded-full': option.icon,
              'bg-surface-container-low dark:bg-secondary-container':
                option.icon && !checked,
              'bg-background': option.icon && checked
            }"
          >
            <Icon
              :size="option.icon ? '24px' : '20px'"
              :class="[
                'shrink-0',
                checked || option.icon
                  ? 'text-flux-primary'
                  : 'text-flux-outline'
              ]"
              :name="
                option.icon ??
                (checked
                  ? 'mdi:radio-button-checked'
                  : 'mdi:radio-button-unchecked')
              "
            />
          </div>
        </slot>
        <label
          :for="`radio-index-${index}`"
          class="pointer-events-none relative"
        >
          <span class="block font-semibold text-sm">{{ option.label }}</span>
          <slot v-if="option.description" name="description" :option="option">
            <span class="text-xs text-flux-outline block">
              {{ option.description }}
            </span>
          </slot>
        </label>
        <slot
          name="trailing"
          :active="checked"
          :value="castAcceptableValue(option.value)"
        />
      </template>
    </RadioGroupItem>
  </RadioGroupRoot>
</template>
