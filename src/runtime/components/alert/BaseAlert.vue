<script setup lang="ts">
/* eslint-disable vue/no-v-html */

import type { HTMLAttributes } from 'vue'
import { iconSizeConfig, variantConfig } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: keyof typeof variantConfig
    iconSize?: keyof typeof iconSizeConfig
    title?: string
    description?: string
    descriptionAsHtml?: boolean
    iconName?: string
    descriptionClass?: HTMLAttributes['class']
  }>(),
  {
    class: undefined,
    title: undefined,
    description: undefined,
    variant: 'info',
    iconSize: 'default',
    iconName: 'mdi:information',
    descriptionClass: undefined
  }
)

const slots = useSlots()
</script>

<template>
  <div
    :class="
      cn(
        'flex gap-2 px-3 py-2 rounded-lg',
        variantConfig[props.variant],
        props.description ? 'items-start' : 'items-center',
        props.class
      )
    "
  >
    <Icon
      :name="props.iconName"
      :size="iconSizeConfig[props.iconSize]"
      class="flex-none"
    />

    <div class="grow flex flex-col gap-1">
      <p v-if="props.title" class="font-semibold text-xs">
        {{ props.title }}
      </p>
      <div v-if="props.description || slots.default" class="text-xs">
        <slot>
          <div
            v-if="props.description && props.descriptionAsHtml"
            v-html="props.description"
          ></div>
          <p
            v-if="props.description && !props.descriptionAsHtml"
            :class="cn(props.descriptionClass)"
          >
            {{ props.description }}
          </p>
        </slot>
      </div>
    </div>
    <slot name="trailing" />
  </div>
</template>
