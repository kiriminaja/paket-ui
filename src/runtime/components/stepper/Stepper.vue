<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperRoot,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

type OptionT = {
  step: number
  title: string
  description?: string
  icon?: string
  disabled?: boolean
  completed?: boolean
}

const props = defineProps<{
  class?: HTMLAttributes['class']
  itemClass?: HTMLAttributes['class']
  triggerClass?: HTMLAttributes['class']
  separatorClass?: HTMLAttributes['class']
  modelValue?: number
  options: OptionT[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload?: number): void
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: 1
})
</script>

<template>
  <StepperRoot
    v-model="modelValue"
    :default-value="2"
    :class="cn('flex gap-2 w-full', props.class)"
  >
    <StepperItem
      v-for="item in options"
      :key="item.step"
      :class="
        cn(
          'w-full flex justify-center gap-2 relative group px-4',
          props.itemClass
        )
      "
      :step="item.step"
      :disabled="item.disabled"
      :completed="item.completed"
    >
      <template #default="{ state }">
        <StepperTrigger
          class="inline-flex border-2 shadow-sm items-center border-outline-variant justify-center rounded-full w-10 h-10 shrink-0"
          :class="
            cn(
              'group-data-[state=inactive]:text-on-surface',
              'group-data-[state=completed]:bg-flux-primary group-data-[state=completed]:text-on-primary group-data-[state=completed]:border-flux-primary',
              'group-data-[state=active]:bg-secondary-container group-data-[state=active]:text-flux-primary group-data-[state=active]:border-flux-primary',
              'group-data-[disabled]:opacity-100 group-data-[disabled]:cursor-default',
              props.triggerClass
            )
          "
        >
          <StepperIndicator v-if="item.icon">
            <Icon
              :name="
                state === 'active' ? 'svg-spinners:3-dots-bounce' : item.icon
              "
              size="24px"
              class="w-5 h-5"
            />
          </StepperIndicator>
        </StepperTrigger>

        <StepperSeparator
          v-if="item.step !== options[options.length - 1].step"
          :class="
            cn(
              `absolute block indicator top-1/2 -translate-y-1/2 left-[calc(50%+30px)] right-[calc(-50%+20px)] h-2 rounded-full bg-outline-variant shrink-0`,
              `data-[state=completed]:bg-flux-primary`,
              `data-[state=active]:bg-secondary-container data-[state=active]:text-flux-primary data-[state=active]:border-flux-primary`,
              props.separatorClass
            )
          "
        />

        <div class="absolute text-center top-full left-0 w-full mt-2">
          <StepperTitle class="font-medium text-sm">
            {{ item.title }}
          </StepperTitle>
          <StepperDescription
            v-if="item.description"
            class="hidden sm:block text-xs"
          >
            {{ item.description }}
          </StepperDescription>
        </div>
      </template>
    </StepperItem>
  </StepperRoot>
</template>
<style scoped>
.indicator[data-state='active'] {
  background-image: repeating-linear-gradient(
    123deg,
    transparent,
    transparent 0.75rem,
    currentColor 10px,
    currentColor 1rem
  );
  animation: linear-x 10s linear infinite;
}

@keyframes linear-x {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 160px;
  }
}
</style>
