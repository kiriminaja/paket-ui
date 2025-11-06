<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuRoot,
  ContextMenuTrigger
} from 'reka-ui'

defineProps<{
  disabled?: boolean
  actions: {
    value: string
    label: string
    icon?: string
    onClick: () => void
  }[]
}>()
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger :disabled="disabled" as-child>
      <slot />
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent
        class="min-w-40 z-30 bg-background dark:bg-surface-container dark:border dark:border-outline-variant outline-none rounded-lg p-1.5 shadow-xl"
      >
        <ContextMenuItem
          v-for="(action, index) in actions"
          :key="index"
          :value="action.value"
          class="text-xs rounded-md flex items-center gap-2 p-2 relative select-none outline-none data-[disabled]:text-outline-variant data-[disabled]:pointer-events-none data-[highlighted]:bg-surface-container-low"
          @click="action.onClick"
        >
          <Icon v-if="action.icon" :name="action.icon" size="16px" />
          <span>{{ action.label }}</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
