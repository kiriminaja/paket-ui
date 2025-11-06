<script setup lang="ts">
import { Pie as PieChart } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js'
import type { ChartData, ChartOptions, TooltipModel } from 'chart.js'
import type { HTMLAttributes } from 'vue';

Chart.register(...registerables);

const colorMode = useColorMode();

const props = defineProps<{
  chartData: ChartData<'pie'>;
  externalTooltip?: (args: {
    chart: Chart;
    tooltip: TooltipModel<'pie'>;
  }) => void;
  class?: HTMLAttributes['class'];
}>();

const options = computed<ChartOptions<'pie'>>(() => ({
  interaction: {
    mode: 'nearest',
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
  borderColor: colorMode.value === 'dark' ? '#0F0D11' : '#FFFFFF'
}));
</script>

<template>
  <PieChart :class="props.class" :data="props.chartData" :options="options" />
</template>
