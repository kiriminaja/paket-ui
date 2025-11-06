<script setup lang="ts">
import { useVModel, watchDebounced } from '@vueuse/core'

const open = ref(false)

const props = withDefaults(
  defineProps<{
    modelValue?: Date
    defaultValue?: Date
    min?: Date
    max?: Date
  }>(),
  {
    modelValue: undefined,
    defaultValue: () => new Date(),
    min: undefined,
    max: undefined
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', newValue?: Date): string
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue
})

// Prevent the user input to a date that is less than the min
watchDebounced(
  () => props.min,
  (newMin) => {
    if (newMin && modelValue.value && modelValue.value < newMin) {
      modelValue.value = newMin
    }
  },
  {
    debounce: 500
  }
)

const minHour = computed(() => {
  if (!props.min) return

  const currDate = new Date()
  if (formatDMYDash(currDate) !== formatDMYDash(props.min)) return
  if (modelValue.value && modelValue.value?.getTime() >= props.min?.getTime())
    return

  return props.min?.getHours() ?? 0
})

const minMinute = computed(() => {
  if (!props.min) return

  const currDate = new Date()
  if (formatDMYDash(currDate) !== formatDMYDash(props.min)) return
  if (modelValue.value && modelValue.value?.getTime() >= props.min?.getTime())
    return

  return props.min?.getMinutes() ?? 0
})

const hour = computed({
  get: () => modelValue.value?.getHours() ?? 0,
  set: (hour) => {
    if (modelValue.value && hour) {
      const newDate = new Date(modelValue.value)
      newDate.setHours(hour)
      emit('update:modelValue', newDate)
    }
  }
})

const minute = computed({
  get: () => modelValue.value?.getMinutes() ?? 0,
  set: (minute) => {
    if (props.modelValue && minute) {
      const newDate = new Date(props.modelValue)
      newDate.setMinutes(minute)
      emit('update:modelValue', newDate)
    }
  }
})
</script>
<template>
  <UiDropdown
    v-model="open"
    class="rounded-xl min-w-64 transition-all font-normal flex-row-reverse inline-flex justify-between bg-background gap-3 text-sm py-3 px-3.5 items-center h-11 border border-outline-variant outline-none focus:ring-1 focus:border-flux-primary focus:ring-flux-primary"
    content-class="p-0"
    icon-name="material-symbols:schedule-outline"
    icon-class="text-flux-primary"
  >
    <span
      >{{ hour < 10 ? '0' + hour : hour }} :
      {{ minute < 10 ? '0' + minute : minute }}</span
    >
    <template #content>
      <UiTimePickerBody
        v-model:hour="hour"
        v-model:minute="minute"
        :min-hour="minHour"
        :min-minute="minMinute"
      />
    </template>
  </UiDropdown>
</template>
