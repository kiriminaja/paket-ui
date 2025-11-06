<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    items: Record<string, string | number>[]
    valueKey?: string
    labelKey?: string
  }>(),
  {
    class: undefined,
    valueKey: 'id',
    labelKey: 'label'
  }
)

const emits = defineEmits<{
  (e: 'close', payload: Record<string, string | number>): void
  (e: 'reset'): void
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col md:flex-row gap-4 justify-between items-start',
        props.class
      )
    "
  >
    <div class="flex flex-col md:flex-row gap-4">
      <p class="flex-none w-min font-medium text-sm pt-2">Filter</p>
      <div class="flex-1 flex gap-2 flex-wrap">
        <UiChipBase
          v-for="(item, index) in items"
          :key="index"
          :label="item[labelKey].toString()"
          @close="emits('close', item)"
        />
      </div>
    </div>
    <UiButtonIconButton
      variant="primaryOutline"
      label="Reset Filter"
      class="flex-none border-none rounded-none py-2 px-0"
      icon-name="material-symbols:delete-outline"
      @click="emits('reset')"
    />
  </div>
</template>
