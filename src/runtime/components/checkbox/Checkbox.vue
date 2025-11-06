<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui'
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  modelValue?: boolean
  defaultValue?: boolean
  label?: string
  disabled?: boolean
  description?: string
  indeterminate?: boolean
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const value = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue
})
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <label
      class="flex flex-row gap-3 cursor-pointer"
      :class="{
        'items-center': !description,
        'items-start': description
      }"
    >
      <CheckboxRoot
        v-model="value"
        :disabled="disabled"
        :class="
          cn(
            'bg-background hover:bg-surface-container flex h-5 w-5 shrink-0 appearance-none items-center justify-center rounded-md data-[disabled]:cursor-not-allowed data-[state=checked]:bg-flux-primary data-[state=checked]:text-on-primary data-[state=checked]:border-flux-primary shadow-sm border border-outline-variant outline-none focus-within:bg-surface-container focus-within:shadow',
            props.class
          )
        "
      >
        <CheckboxIndicator
          class="h-full w-full rounded flex items-center justify-center"
        >
          <Icon
            :name="
              indeterminate
                ? 'material-symbols:check-indeterminate-small'
                : 'radix-icons:check'
            "
            class="h-5 w-5"
          />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span v-if="label" class="block pointer-events-none">
        <span v-if="label" class="font-medium block text-sm" v-text="label" />
        <span
          v-if="description"
          class="block text-xs text-flux-outline"
          v-text="description"
        />
      </span>
    </label>
  </div>
</template>
