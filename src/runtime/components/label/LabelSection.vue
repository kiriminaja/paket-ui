<template>
  <div
    class="flex flex-row justify-between items-center gap-y-2 gap-x-3 w-full h-fit"
  >
    <div class="flex items-center gap-1">
      <div
        v-if="icon"
        class="p-1 mr-2 rounded-full bg-secondary-container text-flux-primary"
      >
        <Icon :name="icon" size="24px" />
      </div>
      <div>
        <h3 class="font-bold" v-text="title"></h3>
        <slot name="sub" />
      </div>
      <UiPopover v-if="slots.popover">
        <Icon
          name="material-symbols:info-outline"
          size="20px"
          class="text-flux-primary"
        />
        <template #content>
          <slot name="popover" />
        </template>
      </UiPopover>
    </div>
    <div v-if="slots.default" class="flex items-center gap-3">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
}>()

const slots = useSlots()
</script>
