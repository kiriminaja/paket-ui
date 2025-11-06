<template>
  <div
    :class="
      cn(
        'flex items-start gap-3 p-4 py-3.5 transition-all bg-background border border-outlineVariant rounded-lg shadow-lg w-80',
        variantConfig[toast.type],
        variantConfigBg[toast.type]
      )
    "
  >
    <slot name="icon">
      <img
        v-if="toast.imageSrc"
        :src="toast.imageSrc"
        class="w-10 h-10 shrink-0 rounded"
      />
      <Icon
        v-else
        :name="toast.icon ?? 'material-symbols:info-outline'"
        class="shrink-0"
        size="24px"
      />
    </slot>
    <div class="pt-0.5 text-sm">
      <div v-if="toast.title" class="font-semibold" v-text="toast.title" />
      <div v-html="toast.render" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { variantConfig, variantConfigBg } from '.'
import type { Toast } from '~~/plugins/toast.client'

defineProps<{
  toast: Pick<Toast, 'imageSrc' | 'icon' | 'title' | 'render' | 'type'>
}>()
</script>
