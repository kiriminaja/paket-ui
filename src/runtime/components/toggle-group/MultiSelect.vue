<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRoot } from 'reka-ui'

import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    valueKey?: string
    labelKey?: string
    options?: option[]
    id?: string
    modelValue?: number[]
  }>(),
  {
    class: '',
    valueKey: 'id',
    labelKey: 'label',
    options: [] as never,
    id: 'toggle-group-multi',
    modelValue: [] as never
  }
)
const emit = defineEmits<{
  (e: 'update:modelValue', value?: number[]): void
}>()
const content = useVModel(props, 'modelValue', emit)
interface option {
  id: number
  label: string
}
</script>

<template>
  <ToggleGroupRoot
    v-model="content"
    type="multiple"
    class="flex flex-wrap gap-2"
  >
    <ToggleGroupItem
      v-for="(item, nIndex) in options"
      :key="id + '-' + nIndex"
      :value="item[valueKey as keyof option]"
      :class="
        cn(
          'flex placeholder:text-flux-outline focus-visible:outline-none ring-0 focus-visible:ring-offset-1 focus-visible:ring-offset-flux-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:text-onSurface focus-visible:bg-surfaceContainerLowest focus:border-flux-primary  ',
          props.class
        )
      "
    >
      <slot name="item" :data="item">
        <UiBadgeBaseBadge
          class="text-base"
          :label="String(item[labelKey as keyof option])"
          :variant="
            undefined == content || !content.includes(item?.id)
              ? 'outline'
              : 'primaryOutlineActive'
          "
          size="xl"
        ></UiBadgeBaseBadge>
      </slot>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>
