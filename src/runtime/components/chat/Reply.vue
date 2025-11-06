<script setup lang="ts">
import EmojiPicker, { type EmojiExt } from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

import { breakpointsTailwind, useBreakpoints, useVModel } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)

const props = withDefaults(
  defineProps<{
    modelValue?: string
    limit?: number
    loading?: boolean
    disabled?: boolean
    disabledSubmit?: boolean
    withAudio?: boolean
  }>(),
  {
    modelValue: '',
    limit: 1600,
    loading: false,
    disabled: false,
    disabledSubmit: false,
    withAudio: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit' | 'recorder-remove'): void
  (e: 'recorded', value: FileList): void
}>()

const formData = useVModel(props, 'modelValue', emit)
const isMobile = computed(() => breakpoints.smaller('md').value)

const audioRecordOpen = ref(false)
const textInputRef = useTemplateRef('textInputRef')
const textAreaBaseHeight = 40
const textAreaMinSize = computed(() => {
  const itemHeight = 9
  const lineLength = formData.value.split('\n').length ?? 1

  if (lineLength > 0 && lineLength >= 10) {
    return textAreaBaseHeight + 10 * itemHeight
  }

  return textAreaBaseHeight + (lineLength > 1 ? lineLength * itemHeight : 0)
})

const selectEmoji = (emoji: EmojiExt) => {
  formData.value += emoji.i
  nextTick(() => textInputRef.value?.focus())
}

const colorMode = useColorMode()

defineExpose({
  input: textInputRef,
  closeAudioRecord: () => (audioRecordOpen.value = false)
})

const slots = useSlots()
</script>

<template>
  <div
    class="border-t border-outline-variant bg-background dark:bg-surface-container-low px-4 py-3 space-y-3"
  >
    <slot name="header" />
    <slot v-if="slots.default" />
    <div class="flex gap-3 items-end">
      <slot
        v-if="slots.leading && !audioRecordOpen"
        name="leading"
        :disabled="disabled || loading"
      />
      <UiButtonIconButton
        v-else-if="audioRecordOpen && withAudio"
        icon-name="material-symbols:delete-outline"
        variant="outline"
        class="flex-row-reverse p-2"
        @click="
          () => {
            audioRecordOpen = false
            emit('recorder-remove')
          }
        "
      />
      <div class="grow flex flex-col gap-3">
        <UiRecorderAudio
          v-if="audioRecordOpen && withAudio"
          :style="{
            height: textAreaBaseHeight + 'px'
          }"
          :max-duration="60 * 5"
          @recorded="emit('recorded', $event)"
        />
        <div v-else class="relative">
          <UiInputTextArea
            ref="textInputRef"
            v-model="formData"
            rows="1"
            class="focus:outline-transparent resize-none max-h-44 w-full min-h-0 scrollbar-hide appearance-none"
            :style="{ minHeight: textAreaMinSize + 'px' }"
            :class="{
              'rounded-full pl-4': textAreaMinSize <= textAreaBaseHeight,
              'pr-20': slots.trailing || withAudio
            }"
            :placeholder="`Isi Pesan ${!isMobile ? '(tekan ↵) untuk kirim' : ''}`"
            :maxlength="props.limit"
            :disabled="disabled || loading"
            allow-emoji
            @keydown.enter="
              (e: KeyboardEvent) => {
                if (disabledSubmit || disabled) return
                if (!e.shiftKey && !e.ctrlKey && !e.metaKey) {
                  e.preventDefault()
                  emit('submit')
                }
              }
            "
          />
          <div
            class="absolute right-1 flex"
            :class="{
              'top-1/2 -translate-y-1/2': textAreaMinSize <= textAreaBaseHeight,
              'bottom-0.5': textAreaMinSize > textAreaBaseHeight
            }"
          >
            <UiDropdown
              icon-name="mdi:emoji-outline"
              variant="outline"
              class="p-1.5 border-none text-outline"
              content-class="p-0"
              :disabled="disabled || loading"
              size="sm"
            >
              <template #content>
                <EmojiPicker
                  class="bg-transparent"
                  :native="true"
                  :theme="colorMode.value == 'dark' ? 'dark' : 'light'"
                  @select="selectEmoji"
                />
              </template>
            </UiDropdown>
            <slot name="trailing">
              <UiButtonIconButton
                v-if="withAudio && !audioRecordOpen"
                :disabled="disabled"
                :loading="loading"
                icon-name="material-symbols:keyboard-voice"
                variant="outline"
                size="xs"
                class="border-0 p-1.5 text-outline"
                @click="!disabled && (audioRecordOpen = true)"
              />
            </slot>
          </div>
        </div>
      </div>
      <slot
        name="action"
        :emit="emit"
        :loading="loading"
        :disabled="disabledSubmit || loading"
      >
        <UiButtonIconButton
          :disabled="disabledSubmit || loading"
          :loading="loading"
          icon-name="material-symbols:send-outline"
          class="flex-row-reverse p-2"
          @click="emit('submit')"
        />
      </slot>
    </div>
  </div>
</template>
<style>
.v3-emoji-picker {
  background: transparent !important;
  --v3-picker-bg: var(--flux-surfaceContainer) !important;
  --v3-picker-fg: var(--flux-onSurface) !important;
  --v3-picker-border: var(--flux-outlineVariant) !important;
  --v3-picker-input-border: var(--flux-outlineVariant) !important;
}
.v3-footer {
  display: none !important;
}
.v3-body {
  padding-bottom: 0 !important;
}
</style>
