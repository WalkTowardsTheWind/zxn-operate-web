<template>
  <zxn-plan>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #operation="scope" v-if="isEdit">
        <el-button v-if="scope" link type="primary">下载</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessAccountRechargeList } from "@/api/account/business";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);

const columnList = [
  { label: "充值单号", prop: "recharge_order_no" },
  // { label: "关联任务", prop: "value" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "税地账户", prop: "bank_account" },
  { label: "充值额度", prop: "amount" },
  { label: "充值时间", prop: "add_time" },
  // { label: "充值凭证", prop: "certificate", slot: "certificate" },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

function getList() {
  if (props.id) {
    let params = {
      id: props.id,
      ...pageInfo,
    };
    getBusinessAccountRechargeList(params).then((res) => {
      tableData.push(...res.data.data);
      pageInfo.total = res.data.total;
    });
  }
}
function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  getList();
}

getList();
</script>
