<template>
  <el-dialog v-model="visible" class="zxn-dialog" title="关联任务">
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :has-pagination="false"
    >
    </zxn-table>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: "taskDialog",
};
</script>
<script setup lang="ts">
let visible = ref(false);
const columnList: any[] = reactive([
  { label: "发票任务编号", prop: "value", minWidth: 110 },
  { label: "任务名称", prop: "name", minWidth: 110 },
  { label: "行业", minWidth: 90 },
  { label: "结算金额", minWidth: 90 },
]);
let tableData: any[] = reactive([]);
const init = (data: any[]): void => {
  tableData = [...data];
  visible.value = true;
};
defineExpose({
  init,
});
</script>
