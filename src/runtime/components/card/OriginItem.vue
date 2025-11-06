<template>
  <div
    :class="
      cn([
        'border text-sm relative dark:bg-surfaceContainerHigh transition-all px-3.5 py-3 space-y-0.5 rounded-lg ring-inset',
        {
          'border-outlineVariant': !active,
          'pr-20': selectAble,
          'border-flux-primary bg-surfaceContainerHighest ring-1 ring-flux-primary':
            active
        }
      ])
    "
  >
    <div class="flex gap-2 items-center flex-wrap">
      <span v-if="item.label" class="font-medium" v-text="item.label" />
      <UiBadgeIconBadge v-if="item.is_primary" size="xs" label="Utama" />
      <UiBadgeIconBadge
        :label="item.latitude ? 'Sudah Pin Lokasi' : 'Belum Pin Lokasi'"
        size="xs"
        :variant="item.latitude ? 'successContainer' : 'errorContainer'"
        :icon-name="
          item.latitude
            ? 'material-symbols:location-on'
            : 'material-symbols:location-off'
        "
      />
      <UiBadgeIconBadge
        v-if="!instant && !item.subdistrict?.id"
        size="xs"
        label="Belum Atur Kelurahan"
        variant="errorContainer"
        icon-name="material-symbols:warning-rounded"
      />
    </div>
    <div class="flex gap-2 font-semibold text-flux-primary">
      <span v-text="item.name" />
      <span>/</span>
      <span v-text="item.phone" />
    </div>
    <p v-if="!instant" class="font-semibold">
      {{
        nullHandling(
          item.subdistrict?.name,
          item.subdistrict?.district?.name,
          item.subdistrict?.district?.city?.name,
          item.subdistrict?.district?.city?.province?.name
        )
      }}
    </p>
    <p class="text-flux-outline break-all" v-text="item.address" />
    <UiButtonIconButton
      type="button"
      class="absolute top-2 right-2 border-0 p-1.5"
      size="sm"
      variant="primaryOutline"
      icon-name="material-symbols:edit-outline"
      @click="emit('edit')"
    />
    <UiButtonBaseButton
      v-if="selectAble && !active"
      size="sm"
      label="Pilih"
      variant="primaryOutline"
      class="absolute bottom-2.5 right-2.5"
      @click="emit('select')"
    />
  </div>
</template>
<script setup lang="ts">
import type { IAddressDetail } from '~~/types/response/address'

defineProps<{
  item: {
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
  active?: boolean
  selectAble?: boolean
}>()

const emit = defineEmits<{
  (e: 'select' | 'edit'): void
}>()
</script>
