<script setup lang="ts">
import { useFullscreen, useMediaControls } from '@vueuse/core'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    src: string
    type?: string
    options?: Array<'download' | 'picture_in_picture' | 'repeat'>
  }>(),
  {
    options: () => ['download']
  }
)

const video = useTemplateRef('video')
const loop = ref(false)

const {
  playing,
  buffered,
  currentTime,
  duration,
  waiting,
  volume,
  muted,
  supportsPictureInPicture,
  togglePictureInPicture
} = useMediaControls(video, {
  src: {
    src: props.src,
    type: props.type
  }
})

const { toggle: toggleFullScreen } = useFullscreen(video)

const endBuffer = computed(() =>
  buffered.value.length > 0 ? buffered.value[buffered.value.length - 1][1] : 0
)

const formatDuration = (seconds: number) => {
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}
</script>

<template>
  <div
    :class="cn('outline-none', props.class)"
    :tabindex="0"
    autofocus
    @keydown.prevent.space="playing = !playing"
    @keydown.right="currentTime += 10"
    @keydown.left="currentTime -= 10"
  >
    <div
      class="relative bg-black rounded-md overflow-hidden group/controls w-full h-full grid place-items-center"
    >
      <video
        ref="video"
        class="w-full aspect-video"
        :loop="loop"
        @click="playing = !playing"
      />
      <div
        v-if="waiting"
        class="absolute inset-0 grid place-items-center pointer-events-none bg-black bg-opacity-20"
      >
        <Icon
          class="text-white"
          name="line-md:loading-twotone-loop"
          size="24px"
        />
      </div>
      <div
        class="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-1 bg-gradient-to-b from-transparent to-black/80 opacity-0 transition-all duration-300 group-hover/controls:opacity-100"
      >
        <div
          class="flex justify-between gap-2 items-center text-white text-xxs"
        >
          <span>{{ formatDuration(currentTime) }}</span>
          <span>{{ formatDuration(duration) }}</span>
        </div>

        <UiPlayerScrubber
          v-model="currentTime"
          :max="duration"
          :secondary="endBuffer"
        />

        <div class="grid grid-cols-3 text-white pt-1">
          <div class="flex pl-1">
            <div class="flex gap-1 items-center group/volume">
              <Icon
                class="flex-none"
                :name="
                  muted || volume === 0
                    ? 'material-symbols:volume-off'
                    : 'material-symbols:volume-up'
                "
                size="20px"
                @click="muted = !muted"
              />
              <UiPlayerScrubber
                v-model="volume"
                :max="1"
                class="w-0 group-hover/volume:w-20 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>

          <div class="flex gap-2 items-center justify-center">
            <Icon
              name="material-symbols:replay-10"
              size="20px"
              @click="currentTime -= 10"
            />
            <Icon
              :name="
                playing
                  ? 'material-symbols:pause'
                  : 'material-symbols:play-arrow'
              "
              size="20px"
              @click="playing = !playing"
            />
            <Icon
              name="material-symbols:forward-10"
              size="20px"
              @click="currentTime += 10"
            />
          </div>

          <div class="flex gap-1 items-center justify-end">
            <Icon
              name="material-symbols:fullscreen"
              size="20px"
              @click="toggleFullScreen"
            />
            <UiDropdown
              class="p-1 rounded-md border-none"
              content-class="z-[1000]"
              :show-arrow="false"
              :side-offset="2"
              icon-name="material-symbols:more-vert"
              icon-class="text-white"
              variant="outline"
              size="xs"
            >
              <template #content>
                <UiDropdownItem
                  v-if="options.includes('download')"
                  label="Download"
                  icon="material-symbols:download"
                  @click="() => createDownloadLink(props.src, { newTab: true })"
                />
                <UiDropdownItem
                  v-if="
                    options.includes('picture_in_picture') &&
                    supportsPictureInPicture
                  "
                  label="Picture in Picture"
                  icon="material-symbols:picture-in-picture-alt-outline"
                  @click="togglePictureInPicture"
                />
                <UiDropdownItem
                  v-if="options.includes('repeat')"
                  label="Loop"
                  icon="material-symbols:repeat-rounded"
                  @click="loop = !loop"
                />
              </template>
            </UiDropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
