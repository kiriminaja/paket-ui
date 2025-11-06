<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()

defineProps<{
  selected?: boolean
  title: string
  description?: string
}>()
</script>
<template>
  <div
    :class="[
      'box-between w-full mb-3 px-3.5 gap-3 transition-all py-2 ring-1 rounded-lg relative',
      {
        'ring-flux-success bg-successContainer text-flux-success': selected,
        'bg-background shadow ring-outline-variant': !selected
      }
    ]"
  >
    <UiIconVoucher />
    <div class="grow">
      <h4 class="font-semibold" v-text="title" />
      <p v-if="description" v-text="description"></p>
    </div>
    <Icon name="material-symbols:chevron-right" size="24px" />
    <button
      type="button"
      class="absolute inset-0"
      @click="emit('click')"
    ></button>
  </div>
</template>
