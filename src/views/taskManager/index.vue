<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" hasUpdate>
    </zxn-tabs>
    <task-table ref="manual" :type="0" :industry-list="industryList" />
  </zxn-plan>
</template>
<script lang="ts">
export default {
  name: "taskManagerIndex",
};
</script>
<script setup lang="ts">
import taskTable from "./components/taskTable.vue";
import { getTreeList } from "@/api/common";
const activeName = ref("task");
const tabsList = [
  {
    name: "task",
    label: "任务中心",
  },
];
const industryList = reactive([]);
const manual = ref();
const getIndustryList = async () => {
  const { data } = await getTreeList({ type: 0 });
  industryList.length = 0;
  industryList.push(...data);
};
onActivated(() => {
  getIndustryList();
});
</script>
