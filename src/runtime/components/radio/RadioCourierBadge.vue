<template>
  <div
    v-if="
      rtsRate ||
      (!cod && cod !== undefined) ||
      cutOffTime ||
      isShowUnsupportedInsurance ||
      firstShipment
    "
    :class="cn('flex flex-wrap gap-2', props.class)"
  >
    <UiBadgeIconBadge
      v-if="props.firstShipment"
      variant="info"
      label="Khusus Pengiriman Pertama"
      icon-name="material-symbols:bolt-rounded"
      size="xs"
    />

    <UiBadgeBaseBadge
      v-if="cutOffTime"
      variant="warning"
      size="xs"
      :label="`Cut-Off ` + cutOffTime"
    />
    <UiBadgeBaseBadge
      v-if="rtsRate"
      :variant="computedRtsRateColor"
      class="font-medium"
      size="xs"
      :label="`Potensi retur <span class='font-semibold'>${capitalFirstLatter(rtsRate)}</span>`"
    />
    <UiBadgeBaseBadge
      v-if="!cod && cod !== undefined"
      variant="black"
      class="font-medium"
      size="xs"
      label="COD tidak tersedia"
    />
    <UiBadgeBaseBadge
      v-if="isShowUnsupportedInsurance"
      variant="black"
      class="font-medium"
      size="xs"
      label="Asuransi tidak tersedia"
    />
  </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { variantConfig } from '../badge'

const props = defineProps<{
  rtsRate?: string
  cod?: boolean
  firstShipment?: boolean
  cutOffTime?: string
  isInsuranceSupported?: boolean
  class?: HTMLAttributes['class']
}>()

const computedRtsRateColor = computed((): keyof typeof variantConfig => {
  switch (props.rtsRate?.toLowerCase()) {
    case 'rendah':
      return 'infoContainer'
    case 'sedang':
      return 'warningContainer'
    default:
      return 'errorContainer'
  }
})

const isShowUnsupportedInsurance = computed(() => {
  return !props.isInsuranceSupported && props.isInsuranceSupported !== undefined
})
</script>
