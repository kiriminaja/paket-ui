<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot, type AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    itemClass?: HTMLAttributes['class']
    valueKey?: string
    labelKey?: string
    options?: Record<string, AcceptableValue>[]
    multiple?: boolean
    modelValue?: AcceptableValue | AcceptableValue[]
    allowEmptyValue?: boolean
  }>(),
  {
    class: undefined,
    itemClass: undefined,
    valueKey: 'id',
    labelKey: 'label',
    options: undefined,
    multiple: false,
    modelValue: [] as never,
    allowEmptyValue: true
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value?: AcceptableValue | AcceptableValue[]): void
}>()

const content = useVModel(props, 'modelValue', emit)
const tempValue = ref<AcceptableValue | AcceptableValue[]>()

watch(content, (value) => (tempValue.value = value), { immediate: true })
</script>

<template>
  <ToggleGroupRoot
    v-model="tempValue"
    :type="props.multiple ? 'multiple' : 'single'"
    :class="cn('flex flex-wrap gap-2', props.class)"
    @update:model-value="
      (value) => {
        if (allowEmptyValue) return (content = value)
        if (value) content = value
        tempValue = content
      }
    "
  >
    <ToggleGroupItem
      v-for="(item, nIndex) in options"
      :key="item[valueKey] + '-' + nIndex"
      :value="item[valueKey]"
      :disabled="!!item.disabled"
      :class="
        cn('flex rounded-full focus:outline-flux-primary', props.itemClass)
      "
    >
      <template #default="{ state }">
        <slot
          name="item"
          :data="item"
          :active="state === 'on'"
          :label="item[labelKey]?.toString()"
        >
          <UiBadgeBaseBadge
            :label="item[labelKey]?.toString()"
            :class="state === 'on' ? 'bg-surface-container-low' : undefined"
            :variant="state === 'on' ? 'primaryOutline' : 'outline'"
            size="xl"
          ></UiBadgeBaseBadge>
        </slot>
      </template>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
