<template>
  <div
    :class="[
      'border text-sm relative transition-all text-onErrorContainer p-5 border-dashed border-outlineVariant flex flex-col justify-center items-center rounded-xl ring-inset gap-1.5'
    ]"
  >
    <div class="bg-flux-error text-onError p-1 rounded-full">
      <Icon name="material-symbols:location-off" size="24px" />
    </div>
    <h3 class="font-bold">Alamat Pengiriman Belum Diatur</h3>
    <p>Yuk <b>klik di sini</b> untuk menambahkan alamat sebelum kirim paket.</p>
  </div>
</template>
