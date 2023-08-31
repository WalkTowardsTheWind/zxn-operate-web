<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #channelCommissionSettlementDoc>
        <div class="p-[24px] p-b-[0]">
          <zxn-search
            class="m-t-[20px]"
            :formItem="formItem"
            @on-search="handleSearch"
            @on-reset="handleReset"
          >
            <el-form-item>
              <el-input v-model="formItem.keywords" placeholder="请输入关键字">
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="结算状态">
              <zxn-select v-model="formItem.status" @change="handleSearch">
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.channelSettlementStatus'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </zxn-select>
            </el-form-item>
            <el-form-item label="渠道名称">
              <zxn-select v-model="formItem.channelName" @change="handleSearch">
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.incomeType'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </zxn-select>
            </el-form-item>
            <el-form-item label="所属税地">
              <zxn-select v-model="formItem.tax" @change="handleSearch">
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.incomeType'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </zxn-select>
            </el-form-item>
            <el-form-item label="渠道管理员">
              <zxn-select v-model="formItem.name" @change="handleSearch">
                <el-option
                  v-for="item in proxy.$const[
                    'settlementCenterEnum.incomeType'
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </zxn-select>
            </el-form-item>
            <el-form-item prop="date" label="结算时间">
              <zxn-date-range v-model="formItem.timeData" />
            </el-form-item>
          </zxn-search>
          <div class="title">
            <div class="line"></div>
            <div>结算任务列表</div>
          </div>
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
        <zxn-bottom-btn>
          <el-button color="#ACACAC" @click="handleClose" plain>取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
          <el-button type="primary" @click="handleSend" plain>发送</el-button>
        </zxn-bottom-btn>
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
const activeName = ref("channelCommissionSettlementDoc");
const tabsList = reactive([
  {
    name: "channelCommissionSettlementDoc",
    label: "新建渠道佣金结算单",
  },
]);
//   //获取厂商列表
//   const optionsManufacturer = ref([] as any);
//   const getManufacturerList = async () => {
//   const { data } = await getManufacturer();
//   console.log(data);
//   const newData = data.map((item: any) => {
//       return {
//       label: item,
//       value: item,
//       };
//   });
//   optionsManufacturer.value.push(...newData);
//   };
//   getManufacturerList();
//   //所属税地
//     var optionsTaxLang = ref([]);
//     const getTaxLangList = async () => {
//     try {
//         const { data } = await getAreaList(0);
//         const newData = JSON.parse(
//         JSON.stringify(data)
//             .replace(/"id"/g, '"value"')
//             .replace(/"name"/g, '"label"')
//             .replace(/"cityList"/g, '"children"')
//             .replace(/"taxLandList"/g, '"children"')
//             .replace(/"child"/g, '"children"')
//         );
//         optionsTaxLang.value = newData;
//     } catch (error) {
//         console.log(error);
//     }
//     };
//     getTaxLangList();
//     const propsTaxLang = {
//     // multiple: true,
//     expandTrigger: "hover" as const,
//     };

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    status: "",
    channelName: "",
    tax: "",
    name: "",
    timeData: [],
    page: "",
    limit: "",
  };
  handleSearch();
};
const handleSearch = () => {
  console.log("查询");
  pageInfo.page = 1;
  getTableData();
  // 时间选择判断
  // if (!formItem.value.timeData[0] && !formItem.value.timeData[1]) {
  //   getTableData();
  // } else if (formItem.value.timeData[0] && formItem.value.timeData[1]) {
  //   getTableData();
  // } else if (!formItem.value.timeData[0] && formItem.value.timeData[1]) {
  //   ElMessage({
  //     type: "warning",
  //     message: `请选择开始时间`,
  //   });
  // } else if (formItem.value.timeData[0] && !formItem.value.timeData[1]) {
  //   ElMessage({
  //     type: "warning",
  //     message: `请选择结束时间`,
  //   });
  // }
};
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getTableData();
};
// 累计
var total_pay_money = ref();
const formItem = ref({
  keywords: "",
  status: "",
  channelName: "",
  tax: "",
  name: "",
  timeData: [],
  page: "",
  limit: "",
});

const tableData = reactive([] as any);
const columnList = [
  { label: "企业名称", prop: "settlement_order_no" },
  { label: "结算类型", prop: "task" },
  { label: "发票类型", prop: "taskewe" },
  { label: "成本点位", prop: "task_count" },
  { label: "企业点位", prop: "company_name" },
  { label: "渠道点位", prop: "company_name" },
  { label: "渠道名称", prop: "company_name" },
  { label: "渠道管理员", prop: "tax_land_name", width: 100 },
  { label: "所属税地", prop: "tax_land_name", width: 150 },
  { label: "打款金额", prop: "tax_land_name" },
  { label: "下发金额", prop: "tax_land_name" },
  { label: "服务费", prop: "tax_land_name" },
  { label: "成本费用", prop: "tax_land_name" },
  { label: "供应商结算", prop: "tax_land_name", width: 100 },
  { label: "渠道结算税前", prop: "tax_land_name", width: 110 },
  { label: "渠道结算税后", prop: "tax_land_name", width: 110 },
  { label: "结算时间", prop: "tax_point" },
  {
    label: "渠道结算状态",
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
//取消
const handleClose = () => {};
//保存
const handleSave = () => {};
//发送
const handleSend = () => {};
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
<style lang="scss" scoped>
// 蓝色标题样式
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 25px;
  font-size: 14px;
  font-family: SourceHanSansSC-Medium, SourceHanSansSC;
  font-weight: 500;
  color: #356ff3;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
}
</style>
