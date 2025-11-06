<template>
    <button class="flex items-center px-3 py-2.5 rounded-lg text-flux-primary font-medium text-sm hover:ring-2 hover:ring-flux-primary transition-all gap-2 w-full bg-secondaryContainer">
        <Icon v-if="icon" :name="icon" size="24px"/>
        <span v-text="label" class="grow block text-left"></span>
        <Icon name="material-symbols:chevron-right" size="24px"/>
    </button>
</template>
<script setup lang="ts">
defineProps<{
    icon?: string
    label: string
}>()
</script>