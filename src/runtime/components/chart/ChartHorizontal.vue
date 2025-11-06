<template>
  <div class="rounded-lg group hover:space-x-0.5 flex overflow-hidden mb-1">
    <div
      v-if="constructOptions.length === 0 && !props.loading"
      :class="
        cn(
          'py-3 grow text-center font-semibold transition-all text-xs bg-surface-container-low',
          {
            'group-hover:rounded-lg': !props.loading
          }
        )
      "
    >
      <span class="text-surface-container-low">0%</span>
    </div>
    <template v-else>
      <div
        v-for="(item, key) in constructOptions"
        :key="`item-${key}`"
        :style="{
          width: calculateBarWidth(item.count) + '%'
        }"
        :class="
          cn(
            'py-3 grow text-center font-semibold transition-all text-xs',
            {
              'group-hover:rounded-lg': !props.loading
            },
            item.color
          )
        "
      >
        <Icon
          v-if="props.loading"
          name="svg-spinners:3-dots-fade"
          size="16px"
          class="inline-flex"
        />
        <span v-else v-text="calculatePercent(item.count) + `%`"></span>
      </div>
    </template>
  </div>
  <div class="lg:flex lg:flex-wrap max-w-full gap-4 text-sm">
    <div
      v-for="(item, key) in options"
      :key="`item-${key}`"
      class="flex flex-shrink-0 items-center gap-2"
    >
      <component
        :is="item.description ? UiPopover : 'div'"
        :class="[
          'flex flex-shrink-0 items-center justify-start font-semibold gap-2 py-2 focus:outline-none transition-all pr-6'
        ]"
      >
        <span
          :class="
            cn(
              'w-4 h-4 inline-block rounded aspect-square shrink-0',
              item.color
            )
          "
        ></span>
        <span class="flex font-semibold gap-1 text-xs">
          <slot name="label" :count="item.count" :label="item.label">
            <span v-text="item.label"></span>
            <slot name="count" :count="item.count">
              <span
                class="text-flux-outline"
                v-text="`(${formatNumber(item.count)})`"
              ></span>
            </slot>
          </slot>
        </span>
        <Icon
          v-if="item.description || props.loading"
          class="text-flux-primary"
          :name="
            props.loading
              ? 'svg-spinners:3-dots-fade'
              : 'material-symbols:info-outline'
          "
          size="12px"
        />
        <template v-if="item.description" #content>
          <div class="font-semibold mb-2" v-text="item.label"></div>
          {{ item.description }}
        </template>
      </component>
    </div>
  </div>
</template>
<script setup lang="ts">
import UiPopover from '@/components/ui/popover/Popover.vue'

const props = defineProps<{
  loading?: boolean
  options: {
    color?: string
    label: string
    description?: string
    count: number
  }[]
  hideEmptyOption?: boolean
}>()

const constructOptions = computed(() => {
  return props.options.filter(
    (item) => !props.hideEmptyOption || item.count > 0
  )
})

const calculatePercent = (value: number) => {
  if (props.loading) {
    return 0
  }

  const totalCount = props.options.reduce(
    (total, item) => total + item.count,
    0
  )

  if (totalCount === 0) {
    return 0
  }

  return Math.round((value / totalCount) * 1000) / 10
}

const calculateBarWidth = (value: number) => {
  const percent = calculatePercent(value)
  if (percent >= 80) {
    return 70
  }
  return percent
}
</script>
