<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import {
  ComboboxInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    defaultValue?: string[]
    modelValueQuery?: string
    class?: HTMLAttributes['class']
    invalid?: boolean
    placeholder?: string
    spaceToAdd?: boolean
    withOption?: boolean
    maxLength?: number
    tagValidation?: (tag: string) => boolean
    duplicate?: boolean
    tagValid?: (tag: string) => boolean
    inputMode?: HTMLAttributes['inputmode']
    autoFocus?: boolean
  }>(),
  {
    modelValue: undefined,
    defaultValue: undefined,
    modelValueQuery: undefined,
    class: undefined,
    placeholder: 'Add a tag...',
    withOption: false,
    maxLength: undefined,
    tagValidation: (tag: string) => {
      return tag.trim().length > 3
    },
    tagValid: (_tag: string) => true,
    inputMode: undefined
  }
)

const emits = defineEmits<{
  (e: 'update:modelValue' | 'update:modelValueQuery', value: string[]): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue
})

const modelValueQuery = useVModel(props, 'modelValueQuery', emits)

const delimiter = computed(() => {
  return props.spaceToAdd ? /[ ,;\t\n\r]+/ : /[,;\t\n\r]+/
})

const tagsInput = useTemplateRef('tagsInput')

defineExpose({
  focus: () => {
    tagsInput.value?.$el?.focus?.()
  }
})

const mergeAndIgnoreCase = (arr: string[]) => {
  const seen = new Set()
  const mergedArray = []

  for (const item of arr) {
    const lowerCaseItem = item.toLowerCase()
    if (!seen.has(lowerCaseItem)) {
      seen.add(lowerCaseItem)
      mergedArray.push(item)
    }
  }

  return mergedArray
}

const validate = (payload: string[]) => {
  const filteredTags = payload.filter((tag) => props.tagValidation(tag))
  if (props.duplicate) return (modelValue.value = filteredTags)
  return (modelValue.value = mergeAndIgnoreCase(filteredTags))
}

const onKeyPress = (event: KeyboardEvent) => {
  if (!props.inputMode) return true

  if (
    ((event.ctrlKey || event.metaKey) &&
      (event.key === 'v' || event.key === 'V')) ||
    event.key === 'Unidentified'
  ) {
    return true
  }

  if (
    ['Delete', 'Backspace', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(
      event.key
    )
  ) {
    return true
  }

  if (['tel', 'numeric'].includes(props.inputMode)) {
    if (event.key.match(/[0-9]/)) return true
    return event.preventDefault()
  }

  return true
}
</script>

<template>
  <TagsInputRoot
    v-model="modelValue"
    :class="
      cn(
        'flex gap-2 items-center flex-wrap w-full px-2.5 py-2 rounded-lg border border-outline-variant ring-0 relative',
        { 'ring-offset-1 ring-offset-flux-error': props.invalid },
        props.class
      )
    "
    :delimiter="delimiter"
    add-on-paste
    :duplicate="duplicate"
    @update:model-value="validate"
  >
    <TagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
      class="flex items-center justify-center gap-2 bg-surface-container-high aria-[current=true]:bg-outline-variant rounded-full py-2 px-3"
      :class="{
        'text-flux-error': !tagValid(item)
      }"
    >
      <TagsInputItemText class="text-xs break-all" />
      <TagsInputItemDelete class="p-0 bg-transparent">
        <Icon name="material-symbols:close" size="16px" />
      </TagsInputItemDelete>
    </TagsInputItem>

    <ComboboxInput v-if="withOption" v-model="modelValueQuery" as-child>
      <TagsInputInput
        ref="tagsInput"
        :placeholder="placeholder"
        class="text-sm focus:outline-none flex-1 bg-transparent placeholder:text-flux-outline"
        :max-length="maxLength"
        :auto-focus="autoFocus"
        @keypress="onKeyPress"
      />
    </ComboboxInput>

    <TagsInputInput
      v-else
      ref="tagsInput"
      :placeholder="placeholder"
      class="text-sm focus:outline-none flex-1 bg-transparent placeholder:text-flux-outline"
      :max-length="maxLength"
      :auto-focus="autoFocus"
      @keypress="onKeyPress"
    />

    <slot name="trailing" />
  </TagsInputRoot>
</template>
