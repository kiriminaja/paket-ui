<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    valid?: boolean
    phone: string
    loading?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    valid: false,
    loading: false,
    class: undefined
  }
)
</script>
<template>
  <UiPopover
    :class="
      cn([
        'rounded-full py-1 relative',
        {
          'text-flux-success': props.valid && !loading,
          'text-flux-error': !props.valid && !loading
        },
        props.class
      ])
    "
  >
    <Icon
      :name="loading ? 'svg-spinners:ring-resize' : 'ic:outline-whatsapp'"
      size="24px"
    />
    <span
      v-if="!loading"
      class="absolute p-[2px] rounded-full -bottom-0.5 -right-0.5"
      :class="{
        'bg-flux-success text-on-success': props.valid,
        'bg-flux-error text-on-error': !props.valid
      }"
    >
      <Icon
        :name="
          props.valid ? 'material-symbols:check' : 'material-symbols:close'
        "
        size="12px"
      />
    </span>

    <template #content>
      <div class="mb-2 text-center">
        <h2 class="font-semibold text-sm mt-0.5 mb-1">
          Nomor Terdaftar di WhatsApp?
        </h2>
        <p>
          Sistem {{ !valid ? 'belum dapat' : '' }} mendeteksi
          <strong>{{ phone }}</strong> sebagai pengguna aplikasi WhatsApp.
        </p>
      </div>
      <UiAlertBaseAlert
        :variant="valid ? 'info' : 'warning'"
        class="mt-3"
        title="Konfirmasi WhatsApp"
        description="Mohon tetap lakukan konfirmasi langsung ke pelanggan."
      />
    </template>
  </UiPopover>
</template>
