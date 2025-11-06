<template>
  <UiCardBaseCard class="divide-y divide-outlineVariant p-0 relative">
    <div v-if="slots['header']" class="p-4">
      <slot name="header" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="slots['footer']" class="p-4">
      <slot name="footer" />
    </div>
  </UiCardBaseCard>
</template>
<script setup lang="ts">
const slots = useSlots()
</script>
