<script setup lang="ts">
import { cn } from '../../runtime/utils/cn'
import { useVModel } from '@vueuse/core'
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  wrapperClass?: HTMLAttributes['class']
  triggerClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  tabIndicatorClass?: HTMLAttributes['class']
  modelValue?: string
  defaultModelValue?: string
  tabs: {
    value: string
    label: string
  }[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload?: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultModelValue
})
</script>

<template>
  <TabsRoot
    v-model="modelValue"
    :class="cn('flex flex-col rounded-2xl', props.class)"
  >
    <div
      :class="
        cn(
          'overflow-x-auto scrollbar-hide rounded-t-2xl border-b border-outline-variant',
          props.wrapperClass
        )
      "
    >
      <TabsList class="relative shrink-0 flex w-max">
        <TabsIndicator
          :class="
            cn(
              'absolute px-3 left-0 h-[4px] bottom-0 w-[--reka-tabs-indicator-size] translate-x-[--reka-tabs-indicator-position] translate-y-[1px] transition-[width,transform] duration-300',
              props.tabIndicatorClass
            )
          "
        >
          <slot name="indicator">
            <div class="bg-flux-primary w-full h-full rounded-t-xl" />
          </slot>
        </TabsIndicator>
        <TabsTrigger
          v-for="(tab, index) in tabs"
          :key="`tab-trigger-${tab.value}-${index}`"
          :class="
            cn(
              'px-4 py-3 text-sm leading-none text-on-surface-variant font-medium select-none hover:text-flux-primary data-[state=active]:text-flux-primary outline-none cursor-pointer w-max',
              props.triggerClass
            )
          "
          :value="tab.value"
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent
      v-for="(tab, index) in tabs"
      :key="`tab-content-${tab.value}-${index}`"
      :class="cn('grow outline-none rounded-b-2xl', props.contentClass)"
      :value="tab.value"
    >
      <slot :name="tab.value"></slot>
    </TabsContent>
  </TabsRoot>
</template>
