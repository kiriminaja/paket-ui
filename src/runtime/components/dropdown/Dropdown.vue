<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { sizeConfig, variantConfig, iconSizeConfig } from '../button'
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger
} from 'reka-ui'
import { useVModel } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    contentClass?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    size?: keyof typeof sizeConfig
    label?: string
    modelValue?: boolean
    iconName?: string
    iconPosition?: 'left' | 'right'
    iconSize?: keyof typeof iconSizeConfig
    iconClass?: HTMLAttributes['class']
    disabled?: boolean
    loading?: boolean
    showArrow?: boolean
    sideOffset?: number
    alignContent?: 'start' | 'center' | 'end'
    collisionPadding?: number
  }>(),
  {
    class: undefined,
    contentClass: undefined,
    variant: 'primaryOutline',
    size: 'default',
    label: '',
    iconName: undefined,
    iconClass: undefined,
    iconPosition: 'left',
    iconSize: 'default',
    showArrow: true,
    sideOffset: 5,
    alignContent: 'center',
    collisionPadding: 4
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

// Local state for fallback
const localState = ref(false)

// Use modelValue if provided, otherwise fallback to localState
const state = useVModel(props, 'modelValue', emit, {
  defaultValue: undefined,
  passive: true
})

const isOpen = computed({
  get: () => (props.modelValue === undefined ? localState.value : state.value),
  set: (value: boolean) => {
    if (props.modelValue === undefined) {
      localState.value = value
    } else {
      state.value = value
    }
  }
})

const slots = useSlots()
</script>
<template>
  <DropdownMenuRoot v-model:open="isOpen" :modal="false">
    <DropdownMenuTrigger
      :class="
        cn([
          'rounded-full flex justify-center items-center gap-2 text-sm font-semibold focus:outline-flux-primary disabled:opacity-40 disabled:cursor-not-allowed hover:saturate-150',
          !slots.default ? variantConfig[props.variant] : undefined,
          !slots.default ? sizeConfig[props.size] : undefined,
          {
            'flex-row-reverse': iconPosition === 'right'
          },
          props.class
        ])
      "
      :disabled="props.disabled"
      aria-label="Customise options"
    >
      <Icon
        v-if="iconName"
        :name="loading ? 'svg-spinners:ring-resize' : iconName"
        :size="iconSizeConfig[iconSize]"
        :class="cn(props.iconClass)"
      />
      <slot>{{ props.label }}</slot>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :class="
          cn([
            'min-w-52 p-1 outline-none z-100 shadow-lg bg-background dark:bg-surface-container-high border border-outline-variant rounded-lg will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade',
            props.contentClass
          ])
        "
        :side-offset="sideOffset"
        :align="alignContent"
        :collision-padding="collisionPadding"
      >
        <slot name="content" />
        <DropdownMenuArrow
          v-if="props.showArrow"
          :width="16"
          :height="8"
          class="fill-background dark:fill-surface-container-high stroke-outline-variant"
        />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
