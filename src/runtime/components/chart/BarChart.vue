<script setup lang="ts">
import { Bar as BarChart } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
import type { ChartData, ChartOptions, TooltipModel } from 'chart.js'
import type { HTMLAttributes } from 'vue';

Chart.register(...registerables);

const colorMode = useColorMode()

const props = defineProps<{
  chartData: ChartData<'bar', number[]>;
  externalTooltip?: (args: {
    chart: Chart;
    tooltip: TooltipModel<'bar'>;
  }) => void;
  class?: HTMLAttributes['class'];
  stacked?: boolean
}>();

const options = computed((): ChartOptions<'bar'> => ({
  interaction: {
    mode: 'x',
    intersect: false,
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false
    },
    tooltip: {
      enabled: props.externalTooltip === undefined,
      external: props.externalTooltip,
    },
  },
  scales: {
    x: {
      stacked: props.stacked,
      ticks: {
        padding: 16,
        color: colorMode.value === 'dark' ? '#968e98' : '#7c757e',
        font: {
          size: 10,
          weight: 600,
        },
      },
      grid: {
        display: false,
        drawTicks: false,
        drawOnChartArea: false,
      },
      border: {
        display: false
      },
    },
    y: {
      stacked: props.stacked,
      ticks: {
        padding: 12,
        color: colorMode.value === 'dark' ? '#968e98' : '#7c757e',
        font: {
          size: 10,
          weight: 600,
        },
        callback: (value) => {
          if (Math.floor(+value) === value) {
            return value.toLocaleString('id-ID')
          }
        }
      },
      grid: {
        drawTicks: false,
        color: colorMode.value === 'dark' ? '#4a454e' : '#e9dfeb',
      },
      border: {
        display: false,
        dash: [4, 4],
        dashOffset: 4,
      },
      grace: 1,
    },
  },
  layout: {
    padding: 0,
  }
}));
</script>

<template>
  <BarChart :class="props.class" :data="props.chartData" :options="options" />
</template>
