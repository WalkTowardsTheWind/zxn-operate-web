<!--  线 + 柱混合图 -->
<template>
  <el-card>
    <template #header> 下发柱状图 </template>
    <div :id="id" :class="className" :style="{ height, width }" />
  </el-card>
</template>

<script setup lang="ts">
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
  height: {
    type: String,
    default: "200px",
    required: true,
  },
});
// const widthValue = computed(() => props.width);
// watch(
//   () => props.width,
//   (newVal, oldVal) => {
//     console.log("监听基本类型数据testStr");
//     console.log("new", newVal);
//     console.log("old", oldVal);
//   }
// );

const options = {
  xAxis: {
    type: "category",
    data: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110],
      type: "bar",
      barWidth: 20,
    },
  ],
};

onMounted(() => {
  // 图表初始化
  console.log(props.width);
  const chart = echarts.init(
    document.getElementById(props.id) as HTMLDivElement
  );
  chart.setOption(options);

  // 大小自适应
  window.addEventListener("resize", () => {
    chart.resize();
  });
});
</script>
