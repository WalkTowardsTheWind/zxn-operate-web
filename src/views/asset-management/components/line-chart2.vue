<template>
  <div class="top">
    <!-- 发佣合计 -->
    <card-view>
      <template #top>
        <span>发佣合计</span>
      </template>
      <template #main>
        <span class="yuan">￥</span>{{ proxy.$moneyFormat(commission_total) }}
      </template>
    </card-view>
    <!-- 利润 -->
    <card-view>
      <template #top>
        <span>利润</span>
      </template>
      <template #main>
        <span class="yuan">￥</span>{{ proxy.$moneyFormat(profit) }}
      </template>
    </card-view>
  </div>
  <div class="time">
    <zxn-title>发佣统计</zxn-title>
    <div class="date">
      <div
        v-for="(item, index) in dateList"
        :key="index"
        :class="{ active: index == currentDate }"
        @click="get3And1List(item.val, index)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
  <div id="main2"></div>
</template>

<script lang="ts" setup>
import CardView from "./card.vue";
import * as echarts from "echarts";
import { getChannelList } from "@/api/money";

const { proxy } = getCurrentInstance() as any;

const dateList = [
  { name: "上周", val: "2" },
  { name: "本周", val: "1" },
  { name: "上月", val: "4" },
  { name: "本月", val: "3" },
];
const currentDate = ref(3);

const commission_total = ref();
const profit = ref();
const profit_rate = ref();

function get3And1List(time_type: number, index: number) {
  currentDate.value = index;

  getChannelList({ time_type }).then((res) => {
    commission_total.value = res.data.commission_total;
    profit.value = res.data.profit;
    profit_rate.value = res.data.profit_rate;

    // console.log(res.data.commission_list);

    options.value.xAxis.data = res.data?.commission_list.map(
      (item) => item.date_time
    );
    options.value.series[0].data = res.data?.commission_list.map(
      (item) => item.commission
    );
    chart.value?.clear();
    chart.value?.setOption(options.value);
  });
}

const chart = ref({} as any);

const options = ref({
  tooltip: {
    trigger: "axis",
  },

  grid: {
    left: "0%",
    right: "10%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [], // x轴
    axisTick: {
      show: false, // 不显示刻度
    },
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "支出",
      type: "line",
      stack: "total",
      data: [], // 数据
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
    },
  ],
});

onMounted(() => {
  // 图表初始化
  chart.value = echarts.init(
    document.getElementById("main2") as HTMLDivElement
  );

  // 大小自适应
  window.addEventListener("resize", () => {
    chart.resize();
  });
});

get3And1List(3, 3);
</script>

<style scoped lang="scss">
#main2 {
  width: 50vw;
  height: 500px;
}

.top {
  box-sizing: border-box;
  display: flex;
  gap: 0 16px;
  width: 55vw;
  margin: 20px 0 30px;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 45vw;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
}

.date {
  display: flex;
  font-size: 14px;

  div {
    width: 60px;
    height: 40px;
    margin: 0 8px;
    line-height: 40px;
    color: #333;
    text-align: center;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }

  div.active {
    color: #366ff4;
    border-color: #366ff4;
  }
}
</style>
