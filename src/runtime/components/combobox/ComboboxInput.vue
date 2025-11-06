<script setup lang="ts">
import { ComboboxInput, injectComboboxRootContext } from 'reka-ui'

const ctx = injectComboboxRootContext()

const handleFocus = () => {
  if (!ctx.open.value) {
    ctx.onOpenChange(true)
  }
}
</script>
<template>
  <ComboboxInput ref="input" @click="handleFocus" />
</template>
