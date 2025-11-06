<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <div
    :class="
      cn(
        'border-2 border-background dark:border-flux-outline shadow-lg text-on-secondary-container rounded-xl p-4 relative overflow-hidden bg-secondary-container',
        props.class
      )
    "
  >
    <svg
      class="absolute bottom-0 right-0 opacity-70"
      width="189"
      height="190"
      viewBox="0 0 189 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_1130_118794)">
        <path
          d="M185.653 258.158C150.063 258.158 100.307 212.213 100.307 165.448C100.307 118.682 129.158 80.7717 164.748 80.7717C200.338 80.7717 229.189 118.682 229.189 165.448C229.189 212.213 221.243 258.158 185.653 258.158Z"
          fill="#2C0051"
        />
        <path
          d="M122.887 231.827C93.5781 231.827 69.819 193.586 69.819 146.415C69.819 99.2427 149.452 69.6851 178.761 69.6851C208.069 69.6851 155.225 99.2427 155.225 146.415C155.225 193.586 152.195 231.827 122.887 231.827Z"
          fill="#FFDBCA"
          fill-opacity="0.8"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1130_118794"
          x="0.527504"
          y="0.393715"
          width="297.953"
          height="327.055"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="34.6457"
            result="effect1_foregroundBlur_1130_118794"
          />
        </filter>
      </defs>
    </svg>
    <svg
      class="absolute top-0 left-0"
      width="334"
      height="183"
      viewBox="0 0 334 183"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_1130_118791)">
        <path
          d="M264.5 29.9999C264.5 65.5896 139.063 83.1496 92.298 83.1496C45.5328 83.1496 -18.5 36.5898 -18.5 1C-18.5 -34.5898 45.5328 -43.5 92.298 -43.5C139.063 -43.5 264.5 -5.58987 264.5 29.9999Z"
          fill="#7D3EB9"
          fill-opacity="0.8"
        />
        <path
          d="M158.677 60.5702C158.677 89.8786 120.437 113.638 73.2652 113.638C26.0933 113.638 -3.46436 34.0047 -3.46436 4.69627C-3.46436 -24.6121 26.0933 28.2322 73.2652 28.2322C120.437 28.2322 158.677 31.2619 158.677 60.5702Z"
          fill="#FFDBCA"
          fill-opacity="0.8"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1130_118791"
          x="-87.7913"
          y="-115.024"
          width="421.583"
          height="297.953"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="34.6457"
            result="effect1_foregroundBlur_1130_118791"
          />
        </filter>
      </defs>
    </svg>

    <slot />
  </div>
</template>
