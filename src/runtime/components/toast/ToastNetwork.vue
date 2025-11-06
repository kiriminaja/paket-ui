<script setup lang="ts">
import { useOnline, useScrollLock } from '@vueuse/core'

const online = useOnline()
watch(online, (isOnline) => {
  const lock = useScrollLock(document.body)
  lock.value = !isOnline
})
</script>
<template>
  <div
    v-if="!online"
    class="fixed z-[100] bg-black/30 pt-6 pr-9 justify-end flex items-start backdrop-blur-sm top-0 right-0 bottom-0 left-0"
  >
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform translate-x-full scale-95 opacity-0"
      enter-to-class="transform translate-x-0 scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform translate-x-0 scale-100 opacity-100"
      leave-to-class="transform translate-x-full scale-95 opacity-0"
    >
      <UiToastCard
        id-alert-box="alert-box"
        class=""
        :toast="{
          title: 'Koneksi Internet Terputus',
          render: 'Silakan cek koneksi internet kamu dan coba lagi.',
          type: 'error'
        }"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            class="shrink-0"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21"
              opacity="0"
            >
              <animate
                id="svgSpinnersWifiFade0"
                fill="freeze"
                attributeName="opacity"
                begin="0;svgSpinnersWifiFade1.end+0.2s"
                dur="0.25s"
                values="0;1"
              />
              <animate
                id="svgSpinnersWifiFade1"
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinnersWifiFade3.end+0.5s"
                dur="0.1s"
                values="1;0"
              />
            </path>
            <path
              fill="currentColor"
              d="M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z"
              opacity="0"
            >
              <animate
                id="svgSpinnersWifiFade2"
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinnersWifiFade0.end"
                dur="0.25s"
                values="0;1"
              />
              <animate
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinnersWifiFade3.end+0.5s"
                dur="0.1s"
                values="1;0"
              />
            </path>
            <path
              fill="currentColor"
              d="M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3"
              opacity="0"
            >
              <animate
                id="svgSpinnersWifiFade3"
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinnersWifiFade2.end"
                dur="0.25s"
                values="0;1"
              />
              <animate
                fill="freeze"
                attributeName="opacity"
                begin="svgSpinnersWifiFade3.end+0.5s"
                dur="0.1s"
                values="1;0"
              />
            </path>
          </svg>
        </template>
      </UiToastCard>
    </Transition>
  </div>
</template>
