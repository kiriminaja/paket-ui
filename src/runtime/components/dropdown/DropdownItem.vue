<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import { variantConfig, type sizeConfig } from '../button'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: string
    variant?: keyof typeof variantConfig
    command?: string
    label?: string
    description?: string
    icon?: string
    size?: keyof typeof sizeConfig
    class?: HTMLAttributes['class']
    iconClass?: HTMLAttributes['class']
  }>(),
  {
    value: undefined,
    variant: 'outline',
    label: undefined,
    description: undefined,
    size: 'default',
    icon: undefined,
    command: undefined,
    class: undefined,
    iconClass: undefined
  }
)
</script>
<template>
  <DropdownMenuItem
    :value="props.value"
    :class="
      cn(
        'group text-xs p-3 leading-none rounded flex justify-between gap-3 items-center relative select-none outline-none cursor-pointer',
        variantConfig[props.variant],
        'w-full border-none',
        'data-[disabled]:text-flux-outline data-[disabled]:cursor-not-allowed',
        'data-[highlighted]:bg-surface-container',
        props.class
      )
    "
  >
    <slot>
      <div>
        <span>{{ props.label }}</span>
        <span v-if="props.description" class="text-flux-outline ml-1">{{
          props.description
        }}</span>
      </div>
    </slot>
    <Icon
      v-if="props.icon"
      :class="cn(props.iconClass)"
      size="20px"
      :name="props.icon"
    />
    <div
      v-if="props.command"
      class="ml-auto pl-[20px] group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8"
    >
      {{ props.command }}
    </div>
  </DropdownMenuItem>
</template>
