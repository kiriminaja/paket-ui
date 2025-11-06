<template>
    <div :class="[
        'flex items-center font-medium gap-1.5',
        {
            'text-flux-error': !valid,
            'text-flux-success': valid
        }
    ]">
        <Icon size="22px" :name="valid ? 'material-symbols:location-on-outline' : 'material-symbols:location-off-outline'"/>
        <span v-text="valid ? 'Sudah Pin Lokasi' : 'Belum Pin Lokasi'"></span>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    valid: boolean
}>()
</script>