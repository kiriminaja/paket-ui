<template>
  <div>
    <UiLabelBaseLabel v-if="label" :is-required="required" :text="label" />
    <HeadlessListbox v-model="selectedItem">
      <div class="relative">
        <HeadlessListboxButton
          type="button"
          class="relative w-full cursor-default rounded-xl border border-outlineVariant py-2.5 focus:border-transparent focus:ring-inset transition-all pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-flux-primary sm:text-sm"
        >
          <span class="block truncate">{{
            selectedItem ? selectedItem[labelKey] : placeholder
          }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <Icon
              name="material-symbols:keyboard-arrow-down"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </HeadlessListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <HeadlessListboxOptions
            :class="
              cn(
                'absolute mt-1 max-h-60 w-full overflow-auto z-10 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
                props.optionPopClass
              )
            "
          >
            <HeadlessListboxOption
              v-for="(item, key) in options"
              v-slot="{ active, selected }"
              :key="`select-${key}`"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active
                    ? 'bg-primaryContainer text-flux-primary'
                    : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4'
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate'
                  ]"
                  >{{ item[labelKey] }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-flux-primary"
                >
                  <Icon
                    name="material-symbols:check"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </HeadlessListboxOption>
          </HeadlessListboxOptions>
        </transition>
      </div>
    </HeadlessListbox>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: number | string
    valueKey?: string
    placeholder?: string
    labelKey?: string
    label?: string
    required?: boolean
    optionPopClass?: HTMLAttributes['inputmode']
    options?: Record<string, number | string>[]
  }>(),
  {
    valueKey: 'id',
    labelKey: 'label',
    placeholder: 'Pilih Satu',
    required: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void
}>()

const selectedItem = computed({
  get: () =>
    props.options?.find((item) => item[props.valueKey] === props.modelValue),
  set: (newValue) => {
    if (newValue) {
      emit('update:modelValue', newValue[props.valueKey])
    }
  }
})
</script>
