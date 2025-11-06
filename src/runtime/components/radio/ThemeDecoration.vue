<script setup lang="ts">
import { storeToRefs } from 'pinia'

const globalStore = useGlobalStore()
const { getThemeExpedition } = storeToRefs(globalStore)
</script>

<template>
  <div class="absolute inset-0">
    <NuxtImg
      v-if="getThemeExpedition?.background_url"
      class="w-full h-full object-cover"
      :src="getThemeExpedition.background_url"
    />
  </div>
  <NuxtImg
    v-if="getThemeExpedition?.ornamen_url"
    class="h-[71px] hidden min-[400px]:block absolute top-1 right-28"
    :src="getThemeExpedition.ornamen_url"
  />
  <NuxtImg
    v-if="getThemeExpedition?.frame_url"
    class="h-2/6 max-h-14 absolute top-2.5 left-2 rotate-90"
    :src="getThemeExpedition.frame_url"
  />
  <NuxtImg
    v-if="getThemeExpedition?.frame_url"
    class="h-2/6 max-h-14 absolute top-2.5 right-2 rotate-180"
    :src="getThemeExpedition.frame_url"
  />
  <NuxtImg
    v-if="getThemeExpedition?.frame_url"
    class="h-2/6 max-h-14 absolute bottom-2.5 right-2 -rotate-90"
    :src="getThemeExpedition.frame_url"
  />
  <NuxtImg
    v-if="getThemeExpedition?.frame_url"
    class="h-2/6 max-h-14 absolute bottom-2.5 left-2"
    :src="getThemeExpedition.frame_url"
  />
</template>
