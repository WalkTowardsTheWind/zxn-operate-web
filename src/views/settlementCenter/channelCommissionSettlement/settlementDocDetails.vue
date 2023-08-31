<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #settlementDocDetails>
        <div class="p-[24px] p-b-[0]">
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            :page-info="pageInfo"
            @page-change="handlePageChange"
            hasSelect
            @selection-change="handleSelect"
          >
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { useRouter } from "vue-router";
import {
  getChannelSettlementList,
  deleteChannelSettlementDoc,
  getChannelSettlementDetails,
} from "@/api/settlementCenter/channelSettlement";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const activeName = ref("settlementDocDetails");
const tabsList = reactive([
  {
    name: "settlementDocDetails",
    label: "结算单详情",
  },
]);

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getTableData();
};
const formItem = ref({
  page: "",
  limit: "",
});

const tableData = reactive([] as any);
const columnList = [
  { label: "结算单号", prop: "settlement_order_no" },
  { label: "任务数量", prop: "task" },
  { label: "结算企业", prop: "taskewe" },
  { label: "税地名称", prop: "task_count" },
  { label: "结算人数", prop: "company_name" },
  { label: "实际人数", prop: "company_name" },
  { label: "点位", prop: "company_name" },
  { label: "打款金额", prop: "tax_land_name" },
  { label: "实际下发", prop: "tax_land_name" },
  { label: "渠道结算税前", prop: "tax_land_name", width: 110 },
  { label: "渠道结算税后", prop: "tax_land_name", width: 110 },
  { label: "结算时间", prop: "tax_point" },
  {
    label: "状态",
    type: "enum",
    path: "settlementCenterEnum.channelSettlementStatus",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#FFFFFF", backgroundColor: "#96AEF6" },
      1: { color: "#1EE685", backgroundColor: "#DBFBEB" },
      2: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      3: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      4: { color: "#F45136", backgroundColor: "#FDE3DF" },
    },
    width: 120,
  },
];
/**
 * 批量
 */
//选中的数据
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};

/**
 * 批量操作
 */

//获取数据
const getTableData = async () => {
  const newParams = transformTimeRange(
    { ...formItem.value },
    "createTimeData"
  ) as any;
  const params = transformTimeRange(
    { ...newParams.value },
    "paymentTimeData"
  ) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    // const { data } = await getChannelSettlementList(params);

    // pageInfo.page = data.current_page;
    // pageInfo.total = data.total;
    // console.log(data, "=======>");
    // total_pay_money.value = data.total_pay_money;

    // var newData = data.data.map((item: any) => {
    //   return {
    //     id: item.id,
    //     settlement_order_no: item.settlement_order_no,
    //     status: item.status,
    //     task_count: item.task_count,
    //     company_name: item.company_name,
    //     tax_land_name: item.tax_land_name,
    //     tax_point: item.tax_point,
    //     channel_name: item.channel_name,
    //   };
    // });
    tableData.length = 0;
    // console.log(newData[0]);

    // tableData.push(...newData);
    tableData.push({ settlement_order_no: 1, status: 0 });
    tableData.push({ settlement_order_no: 2, status: 1 });
    tableData.push({ settlement_order_no: 3, status: 2 });
    tableData.push({ settlement_order_no: 4, status: 3 });
    tableData.push({ settlement_order_no: 5, status: 4 });
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {});
</script>
