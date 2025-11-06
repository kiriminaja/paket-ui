<template>
  <div class="rounded-lg mt-4 cursor-pointer relative hover:ring-2 transition-all hover:ring-flux-error py-3 px-4 gap-4 box-between bg-errorContainer text-onErrorContainer">
    <Icon name="material-symbols:warning-rounded" class="text-flux-error shrink-0" size="32px" />

    <div class="grow">
      <h2 class="text-sm font-semibold mb-1">Belum Pin Lokasi</h2>
      <p class="text-xs" v-if="!instant">
        Untuk pengiriman menggunakan ekspedisi
        <span class="font-semibold">Pos Indonesia, dan Lion Parcel</span> alamat pengirim harus
        disertai dengan pin lokasi.
      </p>
      <p class="text-xs" v-else>
        Untuk pengiriman menggunakan layanan Instant, alamat pengirim harus
        dilengkapi dengan data pin lokasi
      </p>
    </div>
    <Icon name="material-symbols:chevron-right" class="shrink-0 text-flux-error" size="32px" />
    <NuxtLink :to="to" v-if="to" class="absolute inset-0" />
  </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
  instant?: boolean
  to?: string
}>(), {
  instant: true
})
</script>