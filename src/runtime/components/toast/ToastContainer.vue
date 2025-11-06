<template>
    <div class="fixed top-6 right-4 z-100 flex flex-col gap-2">
        <TransitionGroup enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform translate-x-full scale-95 opacity-0" enter-to-class="transform translate-x-0 scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform translate-x-0 scale-100 opacity-100"
            leave-to-class="transform translate-x-full scale-95 opacity-0">
            <UiToastCard v-for="toast in toasts" :key="toast.id" :toast="toast" />
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import type { Toast } from '~~/plugins/toast.client';

const { $toasts } = useNuxtApp()
const toasts = $toasts as Ref<Toast[]>

</script>