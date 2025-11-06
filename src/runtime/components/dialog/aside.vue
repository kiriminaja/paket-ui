<template>
  <HeadlessTransitionRoot appear :show="isOpen" as="template">
    <HeadlessDialog as="div" class="relative z-80" @close="closeModal">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 dark:bg-black/80" />
      </HeadlessTransitionChild>

      <div
        class="fixed right-0 top-0 left-0 lg:left-auto bottom-0 overflow-hidden"
      >
        <HeadlessTransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="translate-x-full"
          enter-to="translate-x-0"
          leave="duration-200 ease-in"
          leave-from="translate-x-0"
          leave-to="translate-x-full"
        >
          <HeadlessDialogPanel
            :class="[
              'w-full lg:min-w-[35rem] flex flex-col lg:max-w-md transform overflow-hidden bg-background dark:bg-surface-container-low text-left align-middle shadow-xl h-full transition-all'
            ]"
          >
            <div
              v-if="title"
              :class="['flex justify-between items-center mb-1 px-4 pt-4']"
            >
              <HeadlessDialogTitle
                as="h3"
                class="text-lg font-semibold leading-6"
                >{{ title }}</HeadlessDialogTitle
              >
              <button
                type="button"
                class="bg-surfaceContainerLow p-2 rounded-lg"
                @click="closeModal"
              >
                <Icon name="material-symbols:close" size="20px" />
              </button>
            </div>
            <div
              :class="{
                'grow overflow-y-auto': true,
                'p-4': withPadding
              }"
              @scroll="handleScroll"
            >
              <slot />
            </div>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    withPadding?: boolean
  }>(),
  {
    title: undefined,
    withPadding: true
  }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'scroll', value: UIEvent): void
}>()

const isOpen = computed(() => props.open)

const closeModal = () => {
  emit('close')
}

const handleScroll = (event: UIEvent) => {
  emit('scroll', event)
}
</script>
