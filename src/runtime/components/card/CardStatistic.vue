<template>
  <div
    :class="
      cn(
        'group p-3.5 rounded-xl border border-outlineVariant gap-3 items-start flex relative',
        {
          'cursor-pointer hover:bg-secondary-container hover:border-flux-primary hover:ring-1 hover:ring-inset hover:ring-flux-primary':
            hoverable,
          'bg-secondary-container border-flux-primary ring-1 ring-inset ring-flux-primary':
            active
        },
        props.class
      )
    "
  >
    <div
      v-if="icon"
      :class="
        cn(
          'p-1.5 aspect-square transition-all bg-secondary-container rounded-full text-flux-primary',
          {
            'group-hover:bg-flux-primary group-hover:text-on-primary':
              hoverable,
            'bg-flux-primary text-on-primary': active
          },
          props.iconClass
        )
      "
    >
      <Icon :name="icon" size="24px" />
    </div>
    <div
      class="space-y-1 text-sm grow"
      :class="{
        'group-hover:text-onPrimaryContainer': hoverable,
        'text-on-primary-container': active
      }"
    >
      <p
        :class="
          cn('font-normal text-sm text-onSurfaceVariant', props.labelClass)
        "
      >
        {{ label }}
      </p>

      <slot name="count">
        <Icon
          v-if="props.loading || (!count && count !== 0)"
          name="svg-spinners:3-dots-fade"
          size="24px"
          class="inline-flex"
        />
        <span
          v-else
          :class="cn('text-lg font-bold', props.contentClass)"
          v-text="count >= 0 ? formatNumber(count, currency) : ''"
        />
      </slot>
      <slot name="description" />
    </div>
    <slot name="trailing"> </slot>
    <span
      v-if="percentage && parentTotal > 0"
      :class="
        cn(
          'bg-surfaceContainerLow px-2 py-1 font-semibold text-xs rounded-full text-flux-primary',
          {
            'group-hover:bg-flux-primary group-hover:text-onPrimary': hoverable,
            'bg-flux-primary text-on-primary': active
          }
        )
      "
      v-text="calculatePercentage + `%`"
    />
    <slot />
  </div>
</template>
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
    iconClass?: HTMLAttributes['class']
    contentClass?: HTMLAttributes['class']
    percentage?: boolean
    parentTotal?: number
    label: string
    count?: number
    icon?: string
    loading?: boolean
    currency?: boolean
    hoverable?: boolean
    active?: boolean
  }>(),
  {
    class: undefined,
    labelClass: undefined,
    iconClass: undefined,
    contentClass: undefined,
    percentage: false,
    parentTotal: 0,
    count: undefined,
    icon: undefined,
    currency: false,
    hoverable: true,
    active: false
  }
)

const calculatePercentage = computed(() =>
  props.parentTotal > 0 && props.count && props.count > 0
    ? Math.round((props.count / props.parentTotal) * 10000) / 100
    : 0
)
</script>
