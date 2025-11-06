<template>
  <div
    :class="[
      'flex items-center gap-2 text-sm',
      variantConfigHelper[props.variant],
      props.class,
    ]"
  >
    <Icon :name="icon" size="20px" class="shrink-0" />
    <span class="font-semibold" v-text="description"></span>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { variantConfigHelper } from ".";

interface IInfoField {
  class?: HTMLAttributes["class"];
  icon?: string;
  description: string;
  variant?: keyof typeof variantConfigHelper;
}
const props = withDefaults(defineProps<IInfoField>(), {
  icon: "material-symbols:info",
  variant: "info",
});
</script>

<style scoped></style>
