<template>
  <button
    id="panduan-button"
    class="rounded-full px-3.5 lg:bg-surface-container-highest py-2.5 lg:text-flux-primary flex text-sm items-center gap-3"
    @click="showMenu = !showMenu"
  >
    <Icon name="material-symbols:menu-book" size="20px" />
    <span class="hidden lg:block">Tutorial</span>
  </button>

  <UiDialogAside
    :open="showMenu"
    title="Tutorial"
    :with-padding="false"
    @close="showMenu = false"
  >
    <iframe :src="tutorialPath" title="Tutorial" height="100%" width="100%" />
  </UiDialogAside>
</template>
<script setup lang="ts">
import { fetchArticleByPath } from '~/services/help'

const showMenu = ref(false)

const route = useRoute()
const tutorialPath = ref('')
watch(
  () => [route.path, route.query],
  ([path, query]) => {
    const find = fetchArticleByPath({
      path: path.toString(),
      query
    })
    tutorialPath.value = `https://help.kiriminaja.com/${find ? 'article/' + find : ''}?embed=true&dark=true`
  },
  { immediate: true }
)
</script>
