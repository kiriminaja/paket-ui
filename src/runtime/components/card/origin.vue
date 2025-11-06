<template>
  <div class="grid gap-2 relative">
    <UiAlertBaseAlert
      v-if="
        ((address && !address?.latitude) || (address && !address.longitude)) &&
        !instant
      "
      variant="info"
      icon-name="material-symbols:info"
      title="Pin lokasi wajib diisi untuk pengiriman menggunakan Pos Indonesia dan Lion Parcel."
    />
    <UiAlertBaseAlert
      v-if="address && !address.subdistrict?.id && !instant"
      variant="warning"
      icon-name="material-symbols:info"
      title="Belum atur kelurahan. Data kelurahan dibutuhkan untuk POS, RPX dan Paxel"
    />
    <UiCardOriginItem
      v-if="address"
      :instant="instant"
      :item="address"
      class="cursor-pointer hover:bg-secondaryContainer hover:ring-1 hover:border-flux-primary hover:ring-flux-primary"
    />
    <UiCardOriginEmpty v-else />
    <button
      v-if="clickable"
      class="absolute inset-0"
      @click="emit('onClick')"
    />
  </div>
</template>
<script setup lang="ts">
import type { IAddressDetail } from '~~/types/response/address'

withDefaults(
  defineProps<{
    address?: {
      id: IAddressDetail['id']
      name: IAddressDetail['name']
      label: IAddressDetail['label']
      phone: IAddressDetail['phone']
      latitude: IAddressDetail['latitude']
      longitude: IAddressDetail['longitude']
      address: IAddressDetail['address']
      is_primary: IAddressDetail['is_primary']
      subdistrict: IAddressDetail['subdistrict']
    }
    instant?: boolean
    modified?: boolean
    clickable?: boolean
    editIndicator?: boolean
    link?: boolean
  }>(),
  {
    address: undefined,
    link: true,
    modified: false
  }
)

const emit = defineEmits<{
  (e: 'onClick'): void
}>()
</script>
