<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { sizeConfig, variantConfig, textSizeConfig } from '.'

const props = withDefaults(
  defineProps<{
    size?: keyof typeof sizeConfig
    class?: HTMLAttributes['class']
    src?: string
    variant?: keyof typeof variantConfig
    shape?: 'circle' | 'square'
    alt?: string
    text?: string
  }>(),
  {
    size: 'default',
    class: undefined,
    src: undefined,
    variant: 'primary',
    shape: 'circle',
    alt: 'profile',
    text: undefined
  }
)
</script>

<template>
  <div
    :class="
      cn(
        'overflow-hidden',
        shape === 'circle' ? 'rounded-full' : 'rounded-none',
        variantConfig[props.variant],
        sizeConfig[size],
        {
          'flex-none flex items-center justify-center': props.text
        },
        props.class
      )
    "
  >
    <span v-if="props.text" :class="[textSizeConfig[size], 'font-bold']">
      {{ InitialName(props.text) }}
    </span>
    <slot>
      <img
        v-if="!props.text"
        :src="src || '/svg/avatar/avatar-ang-2.svg'"
        :alt="alt"
        class="w-full h-full object-fill"
      />
    </slot>
  </div>
</template>
