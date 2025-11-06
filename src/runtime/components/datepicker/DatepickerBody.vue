<script setup lang="ts">
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot
} from 'reka-ui'
import { parseDate, today, type DateValue } from '@internationalized/date'
import { formatYMDDash } from '~/utils/formatDate'

const defaultDate = today('Asia/Jakarta')

const emit = defineEmits<{
  (e: 'update:date', d?: Date): void
}>()

const props = defineProps<{
  date?: Date
  maxDate?: Date
  minDate?: Date
}>()

const modelValue = computed({
  get: () =>
    props.date ? parseDate(formatYMDDash(props.date.toString())) : undefined,
  set: (newDate) => {
    emit('update:date', newDate?.toDate('Asia/Jakarta'))
  }
})

function pagingFunc(date: DateValue, sign: -1 | 1) {
  if (sign === -1) return date.subtract({ years: 1 })
  return date.add({ years: 1 })
}

const maxDate = computed(() => {
  if (props.maxDate) {
    return parseDate(formatYMDDash(props.maxDate.toString()))
  }
  return undefined
})

const minDate = computed(() => {
  if (props.minDate) {
    return parseDate(formatYMDDash(props.minDate.toString()))
  }
  return undefined
})
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    v-model="modelValue"
    locale="id-ID"
    :max-value="maxDate ?? undefined"
    :min-value="minDate"
    :week-starts-on="1"
    weekday-format="short"
    :default-value="defaultDate"
    class="rounded-xl"
    fixed-weeks
  >
    <CalendarHeader class="flex items-center justify-between">
      <CalendarPrev
        class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
        :prev-page="(date: DateValue) => pagingFunc(date, -1)"
      >
        <Icon name="material-symbols:keyboard-double-arrow-left" size="24px" />
      </CalendarPrev>
      <CalendarPrev
        class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
      >
        <Icon name="material-symbols:chevron-left" size="24px" />
      </CalendarPrev>
      <CalendarHeading class="text-sm text-center grow font-medium" />
      <CalendarNext
        class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
      >
        <Icon name="material-symbols:chevron-right" size="24px" />
      </CalendarNext>
      <CalendarNext
        class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
        :next-page="(date: DateValue) => pagingFunc(date, 1)"
      >
        <Icon name="material-symbols:keyboard-double-arrow-right" size="24px" />
      </CalendarNext>
    </CalendarHeader>
    <div
      class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
    >
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none space-y-1"
      >
        <CalendarGridHead>
          <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="rounded-md text-xs text-flux-primary"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="grid grid-cols-7"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              :class="
                cn([
                  'rounded-full aspect-square last:text-flux-error lg:w-[34px] my-0.5 p-0',
                  'first:[&:has([data-selected])]:rounded-l-full',
                  'first:[&:has([data-highlighted])]:rounded-l-full last:[&:has([data-highlighted])]:rounded-r-full',
                  'last:[&:has([data-selected])]:rounded-r-full [&:has([data-selected][data-selection-end])]:rounded-r-full [&:not(:has([data-highlighted])):has([data-selected][data-selection-start])]:rounded-l-full',
                  '[&:has([data-highlighted-end])]:rounded-r-full [&:has([data-highlighted-start])]:rounded-l-full',
                  '[&:has([data-selected])]:bg-primary-container [&:has([data-highlighted])]:bg-primary-container',
                  'data-[disabled]:pointer-events-none data-[disabled]:opacity-30'
                ])
              "
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="relative flex items-center rounded-full data-[outside-view]:opacity-50 justify-center whitespace-nowrap text-sm font-normal w-full h-full outline-none focus:shadow-[0_0_0_2px] transition duration-100 focus:shadow-flux-primary hover:bg-flux-primary hover:text-on-primary data-[selection-start]:bg-flux-primary data-[selection-end]:bg-flux-primary data-[selection-start]:text-on-primary data-[selection-end]:text-on-primary data-[highlighted-start]:bg-flux-primary data-[highlighted-start]:text-on-primary data-[highlighted-end]:bg-flux-primary data-[highlighted-end]:text-on-primary data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:bottom-[3px] before:hidden before:rounded-full before:w-1 before:h-1 data-[today]:before:block data-[today]:before:bg-flux-success data-[outside-month]:opacity-25"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
