<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string
  modelValue?: string
  class?: HTMLAttributes['class']
  invalid?: boolean
  id?: HTMLAttributes['id']
  name?: string
  disabled?: boolean
  placeholder?: string
  autocomplete?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue
})

const showPassword = ref(false)
</script>

<template>
  <div class="relative w-full items-center">
    <UiInputField
      :type="showPassword ? 'text' : 'password'"
      v-model="modelValue"
      :invalid="invalid"
      :class="cn('pr-11', props.class)"
      :id="props.id"
      :name="props.name"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :autocomplete="autocomplete"
    />
    <span
      class="absolute right-0 inset-y-0 flex items-center justify-center pr-3.5 text-flux-primary peer-data-[invalid=true]:text-flux-error peer-data-[invalid=true]:peer-focus-visible:text-flux-primary cursor-pointer"
      @click="showPassword = !showPassword"
    >
      <Icon
        :name="
          showPassword
            ? 'material-symbols:visibility-outline'
            : 'material-symbols:visibility-off-outline'
        "
        size="24px"
      />
    </span>
  </div>
</template>
