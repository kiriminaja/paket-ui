<template>
  <div
    :class="
      cn([
        'transition-all duration-300 relative rounded-lg box-center w-full h-fit',
        'border border-outline-variant border-dashed bg-surface-container p-4',
        {
          'bg-secondary-container border-2 border-flux-primary': isDrag,
          'cursor-pointer hover:border-solid hover:bg-surface-container-low':
            state === 'default',
          'border-flux-error ring-1 ring-flux-error': errorMessage
        },
        props.class
      ])
    "
    @dragover.prevent="onDrag(true)"
    @dragenter.prevent="onDrag(true)"
    @dragleave.prevent="onDrag(false)"
    @drop.stop.prevent="onDrop"
  >
    <div
      class="flex flex-col justify-center items-center gap-3 pointer-events-none"
    >
      <div
        :class="
          cn(
            'aspect-square w-16 h-16 overflow-hidden text-flux-primary relative',
            {
              'text-flux-success': success
            }
          )
        "
      >
        <div
          :class="
            cn('absolute top-0 left-0 w-full transition-all', verticalTranslate)
          "
        >
          <NuxtImg
            provider="provider"
            src="/svg/placeholder/upload.svg"
            alt="input-image"
            class="w-16 h-16"
            width="64px"
          />
          <Icon
            :name="
              isDrag
                ? 'material-symbols:upload-rounded'
                : 'svg-spinners:90-ring-with-bg'
            "
            class="w-16 h-16"
            size="64px"
          />
          <UiLoadingCircular :value="progress" class="w-16 h-16 p-0.5" />
          <Icon
            name="material-symbols:check-circle-outline"
            class="w-16 h-16"
            size="64px"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1 justify-center items-center">
        <p
          class="font-bold text-center text-onSurface text-xs flex items-center gap-1"
        >
          <Icon
            v-if="props.state === 'validate'"
            name="svg-spinners:3-dots-fade"
            size="20px"
          />
          <span
            class="text-sm"
            v-text="
              success
                ? 'Selesai Mengunggah'
                : isDrag
                  ? 'Letakkan Disini...'
                  : loading
                    ? 'Mengunggah File'
                    : state == 'validate'
                      ? 'Melakukan Validasi'
                      : label
            "
          />
        </p>
        <Transition name="page" appear>
          <div
            v-if="!isDrag && props.state === 'default' && !loading && !success"
            class="text-xs text-flux-outline transform"
          >
            <p>
              <span v-text="suggestionLabel" />
              <span class="font-semibold underline"> pilih file </span>
            </p>
            <p v-if="description" v-text="description" />
            <p v-if="additionalDescription" v-text="additionalDescription" />
            <p v-if="!errorMessage" v-text="errorMessage" />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { promiseTimeout } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    errorMessage?: string
    state?: 'default' | 'validate'
    suggestionLabel?: string
    description?: string
    additionalDescription?: string
    loading?: boolean
    label?: string
    anywhere?: boolean
    progress?: number
  }>(),
  {
    class: undefined,
    errorMessage: undefined,
    state: 'default',
    description: undefined,
    additionalDescription: undefined,
    suggestionLabel: 'Letakkan file kamu di sini atau',
    label: 'Tambahkan Lampiran',
    progress: undefined
  }
)

const isDrag = ref(false)
const emit = defineEmits<{
  (e: 'drop', value: DragEvent): void
}>()

const onDrop = (event: DragEvent) => {
  if (props.state !== 'default') return
  emit('drop', event)
  isDrag.value = false
}
const onDrag = (value: boolean) => {
  if (props.state !== 'default') return
  isDrag.value = value
}

const success = ref(false)
watch(
  () => props.progress,
  async (newValue) => {
    if (newValue === 100) {
      success.value = true
      await promiseTimeout(2000)
      success.value = false
    }
  }
)
const verticalTranslate = computed(() => {
  if (props.state === 'validate') {
    return '-top-32'
  } else if (props.loading || isDrag.value) {
    return '-top-16'
  } else if (success.value) {
    return '-top-48'
  }
  return 'top-0'
})
</script>
