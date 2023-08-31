<template>
  <div class="p-24px pt-[36px]">
    <zxn-table
      :column-list="columnList"
      :table-data="tableData"
      :bottomGap="60"
      :hasPagination="false"
    >
      <template #status="{ row }">
        <div
          v-if="row.status !== 4"
          v-text="proxy.$enumSet['taskEnum.checkStatus'][row.status]"
          class="zxn-table-label"
          :style="checkStatusColor[row.status]"
        />
        <div
          v-else
          v-text="
            proxy.$enumSet['taskEnum.settlementStatus'][row.settlement_status]
          "
          class="zxn-table-label"
          :style="settlementStatusColor[row.settlement_status]"
        />
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
const { proxy } = getCurrentInstance() as any;
const checkStatusColor = {
  0: { color: "#3770f4", backgroundColor: "#dfe8fd" },
  1: { color: "#F35135", backgroundColor: "#fde3df" },
  2: { color: "#3770f4", backgroundColor: "#dfe8fd" },
  3: { color: "#3770f4", backgroundColor: "#dfe8fd" },
  4: { color: "#3770f4", backgroundColor: "#dfe8fd" },
  5: { color: "#F35135", backgroundColor: "#fde3df" },
};
const settlementStatusColor = {
  0: { color: "#3770f4", backgroundColor: "#dfe8fd" },
  1: { color: "#1DE585", backgroundColor: "#dbfbeb" },
  2: { color: "#F35135", backgroundColor: "#fde3df" },
};

defineProps({
  tableData: { type: Array, default: () => [] },
});
const columnList = [
  {
    label: "人员状态",
    slot: "status",
    minWidth: 120,
  },
  { label: "姓名", prop: "real_name", minWidth: 120 },
  { label: "联系方式", prop: "phone", minWidth: 120 },
  // { label: "身份证号", prop: "idcard", minWidth: 200 },
  { label: "银行账号", prop: "bank_account", minWidth: 200 },
  { label: "申请时间", prop: "add_time", minWidth: 180 },
];
</script>
