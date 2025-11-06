<template>
    <button type="button" :class="cn([
        'border border-outlineVariant rounded-xl border-dashed hover:border-solid hover:border-flux-primary p-3 aspect-square w-24 hover:ring-2 transition-all hover:text-flux-primary hover:ring-flux-primary',
        props.class,
    ])">
        <Icon :name="loading ? 'svg-spinners:90-ring-with-bg' : 'material-symbols:upload'" class="mb-3 mx-auto" size="32px"/>
        <span class="text-xxs font-semibold line-clamp-1">Tambah File</span>
    </button>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
    loading?: boolean
}>()
</script>