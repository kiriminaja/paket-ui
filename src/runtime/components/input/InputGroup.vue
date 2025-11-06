<script setup lang="ts">
const props = defineProps<{
  class?: string
  label?: string
  required?: boolean
  error?: string
}>()
</script>
<template>
  <UiInputControl :class="cn('flex flex-col', props.class)">
    <UiLabelBaseLabel :text="label" :is-required="required" class="block" />
    <slot />
    <p v-if="props.error" class="text-flux-error text-xs mt-1 font-semibold">
      {{ props.error }}
    </p>
  </UiInputControl>
</template>
