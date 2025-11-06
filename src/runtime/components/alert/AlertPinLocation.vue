<template>
  <div
    :class="[
      'px-3.5 py-3 rounded-lg text-sm grid lg:flex gap-2 relative hover:ring-2 transition-all',
      {
        'bg-errorContainer text-onErrorContainer hover:ring-flux-error':
          isError,
        'bg-secondary-container hover:ring-flux-primary': !isError
      }
    ]"
  >
    <NuxtImg
      provider="provider"
      width="44px"
      class="shrink-0"
      :src="
        !isError
          ? '/svg/global/pin-icon.svg'
          : `/svg/global/location-not-pointed.svg`
      "
      alt="not pointed"
    />
    <div class="grow">
      <h4 class="font-semibold">
        {{ isError ? 'Belum Atur Pin Lokasi' : 'Sudah Atur Pin Lokasi' }}
      </h4>
      <p
        class="line-clamp-2 text-xs break-all"
        v-text="
          !isError && address
            ? address
            : 'Wajib tentukan pin lokasi untuk memudahkan kurir menemukan lokasimu.'
        "
      ></p>
    </div>
    <Icon
      v-if="withAction"
      name="material-symbols:edit-outline"
      size="24px"
      class="shrink-0"
    />
    <button
      v-if="withAction"
      class="absolute inset-0"
      type="button"
      @click="emit('click')"
    ></button>
  </div>
</template>
<script setup lang="ts">
import type { IFAddresses } from '~~/services/settings/pickup-address/types'

const props = defineProps<{
  latitude?: IFAddresses['latitude']
  longitude?: IFAddresses['longitude']
  address?: IFAddresses['address']
  withAction?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isError = computed(
  () => props.latitude === undefined || props.latitude === null
)
</script>
