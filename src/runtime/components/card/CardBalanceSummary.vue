<template>
  <UiCardStatistic
    :label="title"
    :icon="icon"
    :count="amount"
    icon-class="bg-background dark:bg-secondary-container"
    class="bg-surface-container-low"
    currency
    :hoverable="false"
  >
    <template v-if="description" #description>
      <div class="text-xs text-outline" v-text="description" />
    </template>
  </UiCardStatistic>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  amount?: number
  description?: string
  icon?: string
}>()
</script>
