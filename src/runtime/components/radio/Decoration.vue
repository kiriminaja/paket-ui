<template>
  <svg
    :class="[
      'absolute bottom-0 left-[172px] w-full',
      {
        'text-flux-warningYellow': !selected,
        'text-flux-primary': selected,
      },
    ]"
    width="367"
    height="60"
    viewBox="0 0 367 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.2"
      d="M0 60C125.182 44.0618 251.859 43.7384 377.12 59.0375L385 60H0Z"
      fill="currentColor"
    ></path>
    <path
      opacity="0.08"
      d="M115 60L151.736 44.3493C183.969 30.6169 220.176 29.4569 253.222 41.0981C271.996 47.7116 291.964 50.2498 311.795 48.5437L399 41.0413V60H115Z"
      fill="currentColor"
    ></path>
    <path
      opacity="0.15"
      d="M152 59L246.407 44.8876C248.133 44.6296 249.835 44.233 251.497 43.7015L278.476 35.074C317.49 22.598 359.182 21.0791 399 30.6829V59H152Z"
      fill="currentColor"
    ></path>
    <path
      opacity="0.1"
      d="M203 60L272.531 55.579C283.812 54.8617 294.987 52.9593 305.871 49.9034L341.908 39.7844C372.486 31.1985 405.331 38.8224 429 60L203 60Z"
      fill="currentColor"
    ></path>
  </svg>
</template>
<script setup lang="ts">
defineProps<{
  selected?: boolean;
}>();
</script>
