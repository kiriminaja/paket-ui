<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { findFallbackIcon, iconFallbackSizeConfig } from '.'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    type?: 'image' | 'file' | 'video' | 'audio' | 'contact' | 'location'
    src?: string
    label?: string
    dismissable?: boolean
    iconFallbackSize?: keyof typeof iconFallbackSizeConfig
    invalid?: boolean
    invalidMessage?: string | null
  }>(),
  {
    class: undefined,
    type: 'image',
    src: undefined,
    label: undefined,
    iconFallbackSize: 'xs',
    dismissable: true,
    invalidMessage: undefined
  }
)

const emits = defineEmits<{
  (e: 'onDismiss' | 'onClick'): void
}>()

const handleClick = () => emits('onClick')

const handleDismiss = (e: MouseEvent) => {
  e.stopPropagation()
  emits('onDismiss')
}

const makeIcon = computed(() => findFallbackIcon(props.type))
</script>

<template>
  <div
    :class="
      cn(
        'bg-surface-container-high p-1.5 rounded-md flex flex-col gap-2',
        props.class
      )
    "
    @click="handleClick"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2 justify-start overflow-hidden">
        <Icon
          :name="makeIcon"
          class="text-outline flex-none"
          :size="iconFallbackSizeConfig[iconFallbackSize]"
        />
        <span
          class="text-xs font-semibold line-clamp-1"
          :class="{ 'text-flux-error': props.invalid }"
          >{{ props.label }}</span
        >
      </div>
      <Icon
        v-if="props.dismissable"
        name="mdi:close"
        class="text-flux-primary cursor-pointer flex-none"
        :size="iconFallbackSizeConfig[iconFallbackSize]"
        @click="handleDismiss"
      />
    </div>
    <p v-if="props.invalid" class="text-[8px] font-medium text-flux-error">
      {{ props.invalidMessage }}
    </p>
  </div>
</template>
