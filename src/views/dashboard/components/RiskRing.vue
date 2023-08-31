<template>
  <div class="risk-ring">
    <div class="dashboard-title">风险类型占比</div>
    <div class="risk-ring-content relative">
      <pie-chart
        v-if="chartData.length"
        height="100%"
        width="100%"
        :chart-data="chartData"
        :color="['#366ff4', '#5a85e8', '#7e9add', '#36c5f4', '#7ec5dd']"
      />
      <empty-box v-else />
    </div>
  </div>
</template>
<script setup lang="ts">
import PieChart from "./PieChart.vue";
const chartData = reactive([]);
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
