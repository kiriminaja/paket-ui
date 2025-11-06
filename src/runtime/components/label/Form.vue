<template>
    <div class="mb-1 box-between flex">
        <label :for="for" class="text-xs font-semibold block text-onSurface">
            <span>{{label}} </span>
            <span v-if="required" class="text-flux-error">*</span>
        </label>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    for?: string
    label: string
    required?: boolean
}>()
</script>