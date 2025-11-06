<script setup lang="ts">
import { getLocalTimeZone, today, parseDate } from '@internationalized/date'
import {
  DateRangeFieldRoot,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
  useDateFormatter
} from 'reka-ui'
import type { DateRange, DateValue } from 'reka-ui'
import type { TModel } from '.'

const formatter = useDateFormatter('id-ID')
const selectedRange = ref<DateRange>()

const quickOptions = [
  {
    label: 'Hari ini',
    action: () => {
      const _today = today(getLocalTimeZone())
      selectedRange.value = {
        start: _today,
        end: _today
      }
    }
  },
  {
    label: 'Kemarin',
    action: () => {
      const yesterday = today(getLocalTimeZone()).subtract({ days: 1 })
      selectedRange.value = {
        start: yesterday,
        end: yesterday
      }
    }
  },
  {
    label: '8 Hari Terakhir',
    action: () => {
      selectedRange.value = {
        start: today(getLocalTimeZone()).subtract({ days: 8 }),
        end: today(getLocalTimeZone())
      }
    }
  },
  {
    label: '30 Hari Terakhir',
    action: () => {
      selectedRange.value = {
        start: today(getLocalTimeZone()).subtract({ days: 29 }),
        end: today(getLocalTimeZone())
      }
    }
  },
  {
    label: 'Bulan Ini',
    action: () => {
      const now = today(getLocalTimeZone())
      const startOfMonth = now.set({ day: 1 })
      selectedRange.value = {
        start: startOfMonth,
        end: now
      }
    }
  },
  {
    label: 'Bulan Lalu',
    action: () => {
      const now = today(getLocalTimeZone())
      const lastMonth = now.subtract({ months: 1 })
      const startOfLastMonth = lastMonth.set({ day: 1 })
      const endOfLastMonth = startOfLastMonth
        .add({ months: 1 })
        .subtract({ days: 1 })
      selectedRange.value = {
        start: startOfLastMonth,
        end: endOfLastMonth
      }
    }
  }
]

const props = withDefaults(
  defineProps<{
    modelValue?: TModel
    presets?: boolean
  }>(),
  {
    modelValue: undefined,
    presets: true
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value?: TModel): void
}>()

const applySelection = () => {
  if (!selectedRange.value) return

  const periodStart =
    selectedRange.value?.start?.year +
    '-' +
    String(selectedRange.value?.start?.month).padStart(2, '0') +
    '-' +
    String(selectedRange.value?.start?.day).padStart(2, '0')

  const periodEnd =
    selectedRange.value?.end?.year +
    '-' +
    String(selectedRange.value?.end?.month).padStart(2, '0') +
    '-' +
    String(selectedRange.value?.end?.day).padStart(2, '0')

  emit('update:modelValue', {
    period_start_date: periodStart,
    period_end_date: periodEnd
  })
}

watch(
  () => props.modelValue,
  (modelValue) => {
    if (modelValue) {
      const { period_start_date, period_end_date } = modelValue
      if (period_start_date && period_end_date) {
        selectedRange.value = {
          start: parseDate(period_start_date),
          end: parseDate(period_end_date)
        }
      }
    }
  },
  {
    immediate: true
  }
)

const maxValue = today('Asia/Jakarta')

function pagingFunc(date: DateValue, sign: -1 | 1) {
  if (sign === -1) return date.subtract({ years: 1 })
  return date.add({ years: 1 })
}
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row">
    <div v-if="presets" class="lg:w-40 lg:border-r border-outline-variant p-2">
      <button
        v-for="option in quickOptions"
        :key="option.label"
        class="flex w-full rounded-md bg-transparent text-flux-primary hover:bg-primary-container hover:text-on-primary-container transition px-3 py-2 text-left text-[13px]"
        @click="option.action"
      >
        {{ option.label }}
      </button>
    </div>
    <div>
      <RangeCalendarRoot
        v-slot="{ weekDays, grid }"
        v-model="selectedRange"
        :max-value="maxValue"
        :week-starts-on="1"
        weekday-format="short"
        class="flex space-y-4 flex-col lg:flex-row lg:space-y-0 p-4"
        fixed-weeks
        :number-of-months="2"
        locale="id-ID"
      >
        <div
          v-for="(month, index) in grid"
          :key="month.value.toString()"
          :class="{ 'mr-4': index === 0 }"
        >
          <div v-if="index === 0" class="flex items-center">
            <RangeCalendarPrev
              class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
              :prev-page="(date: DateValue) => pagingFunc(date, -1)"
            >
              <Icon
                name="material-symbols:keyboard-double-arrow-left"
                size="24px"
              />
            </RangeCalendarPrev>
            <RangeCalendarPrev
              class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
            >
              <Icon name="material-symbols:chevron-left" size="24px" />
            </RangeCalendarPrev>
            <span class="font-semibold flex-1 text-center">{{
              formatter.custom(month.value.toDate(getLocalTimeZone()), {
                month: 'long',
                year: 'numeric'
              })
            }}</span>
            <span class="w-7" />
          </div>
          <div v-if="index === grid.length - 1" class="flex items-center">
            <span class="w-7" />
            <span class="font-semibold flex-1 text-center">{{
              formatter.custom(month.value.toDate(getLocalTimeZone()), {
                month: 'long',
                year: 'numeric'
              })
            }}</span>
            <RangeCalendarNext
              class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
            >
              <Icon name="material-symbols:chevron-right" size="24px" />
            </RangeCalendarNext>
            <RangeCalendarNext
              class="inline-flex items-center cursor-pointer justify-center rounded-md bg-transparent w-7 h-7 hover:bg-primary-container active:scale-98 active:transition-all focus:shadow-[0_0_0_2px] focus:ring-1 focus:ring-flux-primary"
              :next-page="(date: DateValue) => pagingFunc(date, 1)"
            >
              <Icon
                name="material-symbols:keyboard-double-arrow-right"
                size="24px"
              />
            </RangeCalendarNext>
          </div>
          <div
            class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <RangeCalendarGrid
              class="w-full border-collapse select-none space-y-1"
            >
              <RangeCalendarGridHead>
                <RangeCalendarGridRow class="mb-1 grid w-full grid-cols-7">
                  <RangeCalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="rounded-md text-xs text-flux-primary"
                  >
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody class="grid">
                <RangeCalendarGridRow
                  v-for="(weekDates, rowIndex) in month.rows"
                  :key="`weekDate-${rowIndex}`"
                  class="grid grid-cols-7"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    :class="
                      cn([
                        'aspect-square last:text-flux-error lg:w-[34px] my-0.5 p-0',
                        'first:[&:has([data-selected])]:rounded-l-full',
                        'first:[&:has([data-highlighted])]:rounded-l-full last:[&:has([data-highlighted])]:rounded-r-full',
                        'last:[&:has([data-selected])]:rounded-r-full [&:has([data-selected][data-selection-end])]:rounded-r-full [&:not(:has([data-highlighted])):has([data-selected][data-selection-start])]:rounded-l-full',
                        '[&:has([data-highlighted-end])]:rounded-r-full [&:has([data-highlighted-start])]:rounded-l-full',
                        '[&:has([data-selected])]:bg-primary-container [&:has([data-highlighted])]:bg-primary-container',
                        'data-[disabled]:pointer-events-none data-[disabled]:opacity-30'
                      ])
                    "
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="relative flex items-center rounded-full data-[outside-view]:opacity-50 justify-center whitespace-nowrap text-sm font-normal w-full h-full outline-none focus:shadow-[0_0_0_2px] transition duration-100 focus:shadow-flux-primary hover:bg-flux-primary hover:text-on-primary data-[selection-start]:bg-flux-primary data-[selection-end]:bg-flux-primary data-[selection-start]:text-on-primary data-[selection-end]:text-on-primary data-[highlighted-start]:bg-flux-primary data-[highlighted-start]:text-on-primary data-[highlighted-end]:bg-flux-primary data-[highlighted-end]:text-on-primary data-[unavailable]:pointer-events-none data-[unavailable]:text-black/30 data-[unavailable]:line-through before:absolute before:bottom-[3px] before:hidden before:rounded-full before:w-1 before:h-1 data-[today]:before:block data-[today]:before:bg-flux-success data-[outside-month]:opacity-25"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
        </div>
      </RangeCalendarRoot>

      <DateRangeFieldRoot
        v-model="selectedRange"
        locale="id-ID"
        class="px-4 py-2.5 border-t border-outline-variant flex items-center select-none"
      >
        <slot name="types"></slot>

        <span
          class="ml-4 text-flux-error font-semibold text-sm [[data-invalid]_&]:block hidden"
          >Invalid date</span
        >

        <UiButtonBaseButton
          label="Terapkan"
          size="sm"
          class="ml-auto"
          :disabled="!selectedRange"
          @click="applySelection"
        />
      </DateRangeFieldRoot>
    </div>
  </div>
</template>
