<template>
  <div class="risk-ring">
    <div class="dashboard-title">行业类型占比</div>
    <div class="risk-ring-content relative">
      <pie-chart
        height="100%"
        width="100%"
        id="industry"
        :chart-data="chartData"
        :hasRing="false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import PieChart from "./PieChart.vue";
defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped>
.risk-ring {
  flex: 1;

  &-content {
    height: 240px;
    margin-top: 16px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
