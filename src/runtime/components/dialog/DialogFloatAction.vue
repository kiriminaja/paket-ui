<template>
  <UiContainerFloatActionWrapper
    :show="show"
    class="flex flex-col sm:flex-row gap-3 items-center"
  >
    <div v-if="count > 0" class="pr-4 pl-1 border-r border-outline-variant">
      <h3 class="text-xs">{{ countLabel }}</h3>
      <p class="font-semibold text-sm">
        {{ formatNumber(count) }} {{ countSuffix }}
      </p>
    </div>

    <slot>
      <UiPopover>
        <UiButtonIconButton
          v-if="showDeleteButton"
          class="rounded-lg p-2.5"
          :disabled="loading"
          icon-name="material-symbols:delete-outline"
          variant="errorContainer"
          @click="emit('delete')"
        />
        <template #content> Hapus semua item yang terpilih </template>
      </UiPopover>
      <UiButtonIconButton
        v-if="showProcessButton"
        class="rounded-lg"
        :loading="loading"
        :label="processLabel"
        icon-name="material-symbols:arrow-outward"
        variant="primary"
        @click="emit('process')"
      />
    </slot>
  </UiContainerFloatActionWrapper>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    show?: boolean
    loading?: boolean
    processLabel?: string
    showDeleteButton?: boolean
    showProcessButton?: boolean
    count?: number
    countLabel?: string
    countSuffix?: string
    processableCount?: number
  }>(),
  {
    show: false,
    loading: false,
    processLabel: 'Proses',
    showDeleteButton: true,
    showProcessButton: true,
    count: 0,
    countLabel: 'Jumlah Terpilih',
    countSuffix: 'Item',
    processableCount: 0
  }
)

const emit = defineEmits<{
  (e: 'delete' | 'process'): void
}>()
</script>
