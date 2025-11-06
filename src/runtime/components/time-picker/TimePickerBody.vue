<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hour: number
    minute: number
    minHour?: number
    maxHour?: number
    minMinute?: number
    maxMinute?: number
  }>(),
  {
    minHour: 0,
    maxHour: 24,
    minMinute: 0,
    maxMinute: 60
  }
)

const emit = defineEmits<{
  (e: 'update:hour' | 'update:minute', value: number): void
}>()

const hourInput = computed({
  get: () => props.hour,
  set: (value) => {
    emit('update:hour', value)
  }
})

const minuteInput = computed({
  get: () => props.minute,
  set: (value) => {
    emit('update:minute', value)
  }
})

const formattedHour = computed({
  get: () =>
    hourInput.value < 10 ? `0${hourInput.value}` : `${hourInput.value}`,
  set: (value) => {
    const parsedValue = parseInt(value, 10)
    emit('update:hour', isNaN(parsedValue) ? 0 : parsedValue)
  }
})

const formattedMinute = computed({
  get: () =>
    minuteInput.value < 10 ? `0${minuteInput.value}` : `${minuteInput.value}`,
  set: (value) => {
    const parsedValue = parseInt(value, 10)
    emit('update:minute', isNaN(parsedValue) ? 0 : parsedValue)
  }
})

const hourPicker = ref(true)

// Calculate the endpoint of the line based on the selected hour or minute
const lineEndpoint = computed(() => {
  if (hourPicker.value) {
    const isOuterCircle = hourInput.value > 12 || hourInput.value === 0
    const hour = isOuterCircle ? hourInput.value - 12 : hourInput.value
    const radius = isOuterCircle ? 45 : 30
    const angle = (hour - 3) * (Math.PI / 6) // Convert hour to angle
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    }
  } else {
    const minute = minuteInput.value
    const radius = 45
    const angle = (minute - 15) * (Math.PI / 30) // Convert minute to angle
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    }
  }
})
</script>

<template>
  <div class="flex flex-col items-center space-y-4 p-4">
    <div class="flex items-center space-x-2">
      <div>
        <UiInputField
          v-model="formattedHour"
          inputmode="numeric"
          maxlength="2"
          :min="props.minHour"
          :max="props.maxHour"
          class="w-16 text-2xl p-2 text-center"
          @focus="hourPicker = true"
        />
        <div class="text-xs">Jam</div>
      </div>
      <span class="text-2xl">:</span>
      <div>
        <UiInputField
          v-model="formattedMinute"
          inputmode="numeric"
          maxlength="2"
          :min="props.minMinute"
          :max="props.maxMinute"
          class="w-16 text-2xl p-2 text-center"
          @focus="hourPicker = false"
        />
        <div class="text-xs">Menit</div>
      </div>
    </div>

    <div class="bg-surface-container rounded-full p-3">
      <div class="relative w-64 h-64">
        <div class="relative w-full h-full">
          <svg class="absolute w-full h-full">
            <line
              x1="50%"
              y1="50%"
              :x2="`${lineEndpoint.x}%`"
              :y2="`${lineEndpoint.y}%`"
              stroke="var(--flux-primary)"
              stroke-width="2"
            />
          </svg>
          <span
            class="absolute w-2 h-2 bg-flux-primary rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          <!-- Hour Picker -->
          <div v-if="hourPicker">
            <div
              v-for="hr in 12"
              :key="'inner-group-' + hr"
              class="absolute cursor-pointer w-8 h-8 rounded-full flex items-center justify-center"
              :class="{
                'bg-flux-primary text-on-primary': hourInput === hr,
                'bg-none hover:bg-primary-container hover:text-flux-primary':
                  hour !== hr,
                'pointer-events-none cursor-not-allowed opacity-30':
                  hr < props.minHour || hr > props.maxHour
              }"
              :style="{
                left: `${50 + 30 * Math.cos((hr - 3) * (Math.PI / 6))}%`,
                top: `${50 + 30 * Math.sin((hr - 3) * (Math.PI / 6))}%`,
                transform: 'translate(-50%, -50%)'
              }"
              @click="hourInput = hr"
            >
              {{ hr }}
            </div>

            <div
              v-for="hr in 12"
              :key="'outer-group-' + (hr + 12)"
              class="absolute cursor-pointer w-8 h-8 rounded-full flex items-center justify-center"
              :style="{
                left: `${50 + 45 * Math.cos((hr - 3) * (Math.PI / 6))}%`,
                top: `${50 + 45 * Math.sin((hr - 3) * (Math.PI / 6))}%`,
                transform: 'translate(-50%, -50%)'
              }"
              :class="{
                'bg-flux-primary text-on-primary': hourInput === hr + 12,
                'bg-none hover:bg-primary-container hover:text-flux-primary':
                  hour !== hr + 12,
                'pointer-events-none cursor-not-allowed opacity-30':
                  hr + 12 < props.minHour || hr + 12 > props.maxHour
              }"
              @click="hourInput = hr + 12"
            >
              {{ hr + 12 }}
            </div>
          </div>

          <!-- Minute Picker -->
          <div v-else>
            <div
              v-for="min in 60"
              :key="'minute-' + min"
              :style="{
                left: `${50 + 45 * Math.cos((min - 15) * (Math.PI / 30))}%`,
                top: `${50 + 45 * Math.sin((min - 15) * (Math.PI / 30))}%`,
                transform: 'translate(-50%, -50%)'
              }"
              :class="
                cn(
                  'absolute cursor-pointer rounded-full flex items-center justify-center',
                  {
                    'w-2 h-2': min % 5 !== 0,
                    'w-8 h-8': min % 5 === 0,
                    'bg-flux-primary z-10 text-on-primary': minuteInput === min,
                    'pointer-events-none cursor-not-allowed opacity-30':
                      min < props.minMinute || min > props.maxMinute
                  }
                )
              "
              @click="minuteInput = min"
            >
              <span v-if="min % 5 === 0">{{ min }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
