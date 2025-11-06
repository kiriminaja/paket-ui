<template>
    <div :class="cn([
        'bg-surfaceContainerLow border w-24 flex justify-center items-center group aspect-square rounded-xl overflow-hidden relative p-3 transition-all',
        {
            'text-flux-error': isExpiredLink,
            'border-flux-error': isExpiredLink,
            'border-outlineVariant': !isExpiredLink
        },
        props.class,
    ])">
        <div class="grid items-center text-center">
            <Icon v-if="!isImageExtension || isExpiredLink" :name="isExpiredLink ? 'material-symbols:error-outline' : fileIcon" class="mb-3 mx-auto" size="32px" />
            <span v-if="!isImageExtension || isExpiredLink" v-text="isExpiredLink ? 'Kedaluwarsa' : fileName" class="text-xxs font-semibold line-clamp-1"></span>
            <NuxtImg v-if="isImageExtension && !isExpiredLink" :src="src" class="absolute inset-0" />
        </div>
        <button type="button" :class="[
            'absolute transition-all flex p-0.5 bg-surfaceContainer rounded-full',
            {
                '-top-5 group-hover:top-2 -right-5  group-hover:right-2': !isExpiredLink,
                'top-2 right-2': isExpiredLink
            }
        ]"
            @click="emit('close')" v-if="dismissAble">
            <Icon name="material-symbols:close" size="20px" />
        </button>
    </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'],
    src: string,
    dismissAble?: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const fileExtension = computed(() => {
    const pathname = new URL(props.src).pathname
    return pathname.split('.').pop()
})

const fileName = computed(() => {
    const string = new URL(props.src).origin + new URL(props.src).pathname
    const splitString = string.split('/')
    return splitString[splitString.length - 1]
})

// Only works for temp gcs link
const isExpiredLink = computed(() => {
    const urlParams = new URLSearchParams(props.src.split('?')[1]);
    const expiresTimestamp = urlParams.get('Expires');

    if(!expiresTimestamp) return

    const expiresTimeMs = Number(expiresTimestamp) * 1000;
    const currentTimeMs = Date.now();

    return expiresTimeMs < currentTimeMs
})

const fileIcon = computed(() => {
    switch (fileExtension.value) {
        case 'xlsx':
        case 'xls':
        case 'csv':
            return 'vscode-icons:file-type-excel'
        case 'doc':
        case 'docx':
        case 'odt':
            return 'vscode-icons:file-type-word'
        case 'pdf':
            return 'catppuccin:pdf'
        default:
            return 'tabler:file'
    }
})

const isImageExtension = computed(() => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension.value ?? ''))
</script>