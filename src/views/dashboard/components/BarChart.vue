<!--  线 + 柱混合图 -->
<template>
  <div
    ref="dashboardBar"
    class="dashboard-bar"
    :style="{ width, height: `${boxHeight}px` }"
  >
    <div class="dashboard-title mt-30px">盈利看板</div>
    <div
      class="dashboard-bar-content relative"
      :style="{ height: `${boxHeight - 40}px` }"
    >
      <div class="dashboard-bar-content-search">
        <div class="dashboard-bar-content-search-quick">
          <span
            v-for="item in typeMap"
            :key="item.value"
            :class="{ active: activeType === item.value }"
            @click="handleChange(item)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>
      <div
        :id="id"
        :class="className"
        :style="{ height: `${boxHeight - 40}px`, width }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { dateUtil } from "@/utils/dateUtil";
import { getFinanceList } from "@/api/money";
import * as echarts from "echarts";

const props = defineProps({
  id: {
    type: String,
    default: "barChart",
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
});
const typeMap = [
  { label: "上周", value: 2 },
  { label: "本周", value: 1 },
  { label: "上月", value: 4 },
  { label: "本月", value: 3 },
];
const activeType = ref(3);
const xAxisData: string[] = ref([]);
const yAxisData = ref([]);
const handleChange = (item: any) => {
  activeType.value = item.value;
};
const chartInits = async () => {
  const params = { time_type: activeType.value };
  const { data } = await getFinanceList(params);
  xAxisData.value = [];
  yAxisData.value = [];
  data.income.forEach((it) => {
    xAxisData.value.push(it.date_time);
    yAxisData.value.push(it.amount);
  });
  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "0",
      bottom: "3%",
      top: "80px",
      containLabel: true,
    },
    legend: {
      data: ["收入"],
      right: "300px",
      top: "35px",
      icon: "circle",
    },
    xAxis: [
      {
        type: "category",
        data: xAxisData.value,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],

    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "收入",
        type: "line",
        showSymbol: false,
        smooth: true,
        itemStyle: {
          color: "#366ff4", // 折线颜色
          symbol: "circle", // 圆点标记
          symbolSize: 10, // 圆点大小
          lineStyle: {
            width: 1, // 折线宽度
          },
        },
        data: yAxisData.value,
      },
    ],
  };
  console.log(options, 2222);
  chart.setOption(options);
};
watch(
  activeType,
  () => {
    chartInits();
  },
  {
    immediate: true,
  }
);

let chart: echarts.ECharts | null = null;
const dashboardBar = ref<HTMLDivElement>();
let boxHeight = ref(0);

onMounted(() => {
  const { bottom } = (dashboardBar as any).value.getBoundingClientRect();
  boxHeight.value = bottom < 360 ? 360 : bottom;
  nextTick(() => {
    // 图表初始化
    chart = echarts.init(document.getElementById(props.id) as HTMLDivElement);
    // 大小自适应
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
<style lang="scss" scoped>
.dashboard-bar {
  &-content {
    position: relative;
    margin-top: 16px;
    background: #fff;
    border-radius: 4px;

    &-search {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 24px 24px 0;
      z-index: 999;

      &-quick {
        display: flex;

        > span {
          box-sizing: border-box;
          width: 56px;
          height: 36px;
          margin-right: 8px;
          font-size: 14px;
          line-height: 36px;
          text-align: center;
          cursor: pointer;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;

          &.active {
            color: #356ff3;
            border-color: #356ff3;
          }
        }
      }

      &-date {
        display: flex;
      }
    }
  }
}
</style>
