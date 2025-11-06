<template>
  <UiAlertBaseAlert
    class="mb-3"
    variant="error"
    icon-name="material-symbols:info"
    title="Alamat pengiriman paket sudah tidak ada di list data pengiriman. Klik Ganti Alamat untuk ganti dengan data terbaru."
  />
  <div
    :class="
      cn([
        'box-between border text-sm relative transition-all p-3 rounded-xl ring-inset gap-3 flex flex-col md:flex-row',
        'border-outlineVariant'
      ])
    "
  >
    <div class="flex flex-col items-start gap-1.5">
      <div class="flex gap-2 font-semibold text-flux-primary">
        <span v-text="address.name" />
        <span>/</span>
        <span v-text="address.phone" />
      </div>
      <p class="font-semibold">
        {{
          [
            address.sub_district_name,
            address.district_name,
            address.city_province_name
          ]
            .filter((item) => item)
            .join(', ')
        }}
      </p>
      <p class="text-xs text-flux-outline break-all" v-text="address.address" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IAddressDetail } from '~~/types/response/address'

defineProps<{
  address: {
    name: IAddressDetail['name']
    phone: IAddressDetail['phone']
    latitude?: IAddressDetail['latitude']
    longitude?: IAddressDetail['longitude']
    address: IAddressDetail['address']
    sub_district_name?: string | null
    district_name?: string | null
    city_province_name?: string | null
  }
}>()
</script>
