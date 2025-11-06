<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <HeadlessTransitionRoot
    appear
    :show="show"
    as="template"
    data-code="modal-dialog-transition"
  >
    <HeadlessDialog
      as="div"
      class="relative z-90"
      data-code="modal-dialog"
      @close="emits('close')"
    >
      <HeadlessTransitionChild
        as="template"
        data-code="modal-overlay"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30" />
      </HeadlessTransitionChild>
      <div class="fixed inset-0 w-screen overflow-auto">
        <div class="flex h-screen">
          <div
          class="m-auto items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel>
              <slot />
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>
