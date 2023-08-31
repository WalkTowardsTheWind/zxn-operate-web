<template>
  <div class="p-x-[48px]">
    <div class="line-chart">
      <LineChart2 />
    </div>
    <div>
      <div class="title">
        <zxn-title>渠道数据合计</zxn-title>
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :page-info="pageInfo1"
      >
        <template #operation="scope">
          <el-button link @click="toDetail(scope.row)">详情</el-button>
        </template>
      </zxn-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import LineChart2 from "./line-chart2.vue";
import { getChannelTotalList } from "@/api/money";

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData1 = reactive([] as any);

const columnList1 = [
  { label: "企业ID", prop: "channel_id" },
  { label: "渠道", prop: "channel_name" },
  { label: "渠道结算税前", prop: "amount_before_tax" },
  {
    label: "渠道结算税后",
    prop: "amount_after_tax",
  },
  {
    label: "销售部业绩",
  },
  {
    label: "渠道结算合计",
  },
];

function getList1() {
  let params = {
    ...pageInfo1,
  };
  getChannelTotalList(params).then((res) => {
    console.log(res);
    tableData1.push(...res.data.data);
    pageInfo1.total = res.data.total;
  });
}

function toDetail(item: any) {
  router.push({
    name: "recharge-detail",
    query: { id: item.id, name: item.company_name },
  });
}

getList1();
</script>

<style lang="scss" scoped>
.title {
  margin: 10px 0;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
}
</style>
