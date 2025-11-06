<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  headerClass?: HTMLAttributes['class']
  headerWrapperClass?: HTMLAttributes['class']
  bodyClass?: HTMLAttributes['class']
}>()

const slots = defineSlots()
</script>
<template>
  <UiCardBaseCard
    :class="
      cn(
        {
          'p-0 divide-y border-0 shadow divide-outline-variant': slots.tabs
        },
        props.class
      )
    "
  >
    <slot name="tabs" />
    <div
      :class="{
        'p-4': slots.tabs
      }"
    >
      <slot name="filter" />
      <UiCardBaseCard
        :class="
          cn(
            'sticky top-[var(--navbar-height)] z-10 p-0 pt-4 border-0 mt-0.5 rounded-none',
            props.headerWrapperClass
          )
        "
      >
        <div
          :class="
            cn(
              'grid gap-3 text-xs items-center font-semibold py-2 px-3 bg-primary-container uppercase dark:bg-secondary-container border border-outline-variant rounded-t-lg',
              props.headerClass
            )
          "
        >
          <slot name="header" />
        </div>
      </UiCardBaseCard>
      <div
        :class="
          cn(
            'border border-outline-variant rounded-b-lg divide-y divide-outline-variant border-t-0 text-sm',
            props.bodyClass
          )
        "
      >
        <slot />
      </div>
      <slot name="pagination" />
    </div>
  </UiCardBaseCard>
</template>
