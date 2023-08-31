<!-- 饼图 -->
<template>
  <div class="pie-chart" :style="{ width, height }">
    <div :id="id" :class="className" :style="{ height, width }" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import theme from "@/utils/walden.json";

const props = defineProps({
  id: {
    type: String,
    default: "pieChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
  chartData: {
    type: Array,
    default: () => [],
  },
  color: {
    type: Array,
    default: () => [],
  },
  hasRing: {
    type: Boolean,
    default: true,
  },
});
watch(
  () => props.chartData,
  () => {
    chartInit();
  },
  { deep: true }
);
let chart: echarts.ECharts | null = null;
const chartInit = () => {
  nextTick(() => {
    const options = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        right: 80,
        top: "center",
        icon: "circle",
        formatter: (name) => {
          const item = props.chartData?.find((it) => it.name === name);
          return `${name}:  ${item.rate}%`;
        },
      },
      series: [
        {
          type: "pie",
          radius: props.hasRing ? ["40%", "70%"] : ["70%"],
          top: "10px",
          bottom: "10px",
          right: "200px",
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          selectedMode: "single",
          data: props.chartData,
        },
      ],
    };
    chart.setOption(options);
  });
};
onMounted(() => {
  chart = echarts.init(
    document.getElementById(props.id) as HTMLDivElement,
    theme
  );
  chartInit();
  window.addEventListener("resize", () => {
    (chart as echarts.ECharts).resize();
  });
});
</script>
<style lang="scss" scoped>
.pie-chart {
}
</style>
