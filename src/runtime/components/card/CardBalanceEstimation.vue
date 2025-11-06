<template>
  <UiCardStatistic
    :label="props.title"
    :count="props.amount ?? 0"
    currency
    class="lg:px-3.5 lg:py-2.5 relative"
  >
    <button
      class="absolute inset-0 focus:outline-none"
      @click="emit('click')"
    />
    <template #trailing>
      <Icon
        name="material-symbols:info-outline"
        size="24px"
        class="text-flux-primary"
      />
    </template>
  </UiCardStatistic>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  amount?: number
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
