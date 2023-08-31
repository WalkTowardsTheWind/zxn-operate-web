<template>
  <div class="p-[24px] p-b-[0]">
    <div class="recharge">
      <div>
        累计结算<span class="money">{{
          proxy.$moneyFormat(total_settlement_money)
        }}</span
        ><span class="unit">元</span>
      </div>
    </div>
    <zxn-search
      class="m-t-[20px]"
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input
          v-model="formItem.keywords"
          placeholder="请输入结算企业/税地名称"
        >
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="任务状态">
        <zxn-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const[
              'settlementCenterEnum.settlementCenterList'
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>
      <el-form-item prop="date" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :hasIndex="false"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
      hasSelect
      @selection-change="handleSelect"
      field-total="real_money"
    >
      <template #tableTop>
        <el-dropdown
          class="ml-4"
          trigger="click"
          @command="handleBatchOperation"
        >
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">导出</el-dropdown-item>
              <!-- <el-dropdown-item command="2">删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #status="scope">
        <div
          v-if="scope.row.status == 0"
          v-text="
            proxy.$enumSet['settlementCenterEnum.settlementCenterList'][
              scope.row.status
            ]
          "
          class="zxn-table-label"
          :style="color ? color[scope.row.status] : {}"
        />
        <div
          v-if="scope.row.status == 1"
          v-text="
            proxy.$enumSet['settlementCenterEnum.settlementCenterList'][
              scope.row.status
            ]
          "
          class="zxn-table-label"
          :style="color ? color[scope.row.status] : {}"
        />
        <div
          v-if="scope.row.status == 2"
          v-text="
            proxy.$enumSet['settlementCenterEnum.settlementCenterList'][
              scope.row.status
            ]
          "
          class="zxn-table-label"
          :style="color ? color[scope.row.status] : {}"
        />
        <div
          v-if="scope.row.status == 3"
          v-text="
            proxy.$enumSet['settlementCenterEnum.settlementCenterList'][
              scope.row.status
            ]
          "
          class="zxn-table-label"
          :style="color ? color[scope.row.status] : {}"
        />
        <el-tooltip
          v-if="scope.row.status == 4"
          class="box-item"
          effect="dark"
          placement="top"
        >
          <template #content> {{ scope.row.reason }}</template>
          <div
            v-text="
              proxy.$enumSet['settlementCenterEnum.settlementCenterList'][
                scope.row.status
              ]
            "
            class="zxn-table-label"
            :style="color ? color[scope.row.status] : {}"
          />
        </el-tooltip>
      </template>
      <template #inspect="scope">
        <el-button link type="primary" @click="handleInspect(scope)"
          >查看</el-button
        >
      </template>
      <template #operation="scope">
        <template v-if="[1, 2, 4].includes(scope.row.status)">
          <el-button link type="primary" @click="handleThaw(scope)">{{
            scope.row.status == 4 ? "去解冻" : "去冻结"
          }}</el-button>
        </template>
        <el-button link type="primary" @click="handleDownload(scope)"
          >导出</el-button
        >
        <el-button link type="primary" @click="handleDelete(scope)"
          >删除</el-button
        >
        <el-button link @click="handleDetails(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
  <InspectDialog v-model:dialogVisible="dialogVisible" :imageList="imageList" />
</template>
<script setup lang="ts">
import { downloadByData } from "@/utils/download";
import { transformTimeRange } from "@/utils";
import InspectDialog from "../components/InspectDialog.vue";
import { useRouter } from "vue-router";
import {
  getEnterpriseSettlementList,
  getEnterpriseExcel,
  updateEnterpriseSettlementStatus,
  deleteEnterpriseSettlementDoc,
} from "@/api/settlementCenter/enterpriseSettlement";
import { businessAccountSetStatus } from "@/api/account/business";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
const imageList = ref([]) as any;
const { proxy } = getCurrentInstance() as any;
const router = useRouter();

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    keywords: "",
    timeData: [],
    status: "",
    reason: "",
    page: "",
    limit: "",
  };
  handleSearch();
};
const handleSearch = () => {
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
var total_settlement_money = ref();
const formItem = ref({
  keywords: "",
  timeData: [],
  status: "",
  reason: "",
  page: "",
  limit: "",
});
const tableData = reactive([] as any);
const color = {
  0: { color: "#1AB66B", backgroundColor: "#DAF3E7" },
  1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
  2: { color: "#333333", backgroundColor: "#DEDEDE" },
  3: { color: "#F45136", backgroundColor: "#FDE3DF" },
  4: { color: "#F45136", backgroundColor: "#FDE3DF" },
};
const columnList = [
  { label: "结算单号", prop: "settlement_order_no", width: 200 },
  // { label: "状态", slot: "status", width: 100, headerAlign: "left" },
  {
    label: "状态",
    type: "enum",
    path: "settlementCenterEnum.settlementCenterList",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#1EE685", backgroundColor: "#DBFBEB" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      2: { color: "#36C5F4", backgroundColor: "#DFF6FD" },
      3: { color: "#F45136", backgroundColor: "#FDE3DF" },
      4: { color: "#333333", backgroundColor: "#DEDEDE" },
    },
    width: 150,
  },
  { label: "任务数量", prop: "task_count" },
  { label: "结算企业", prop: "company_name", width: 200 },
  { label: "税地名称", prop: "tax_land_name", width: 220 },
  { label: "结算人数", prop: "total_people" },
  { label: "实际人数", prop: "real_people" },
  { label: "点位", prop: "tax_point" },
  { label: "打款金额", prop: "total_money" },
  { label: "实际下发", prop: "real_money" },
  {
    label: "结算时间",
    prop: "settlement_time",
    // sortable: "custom",
    width: 120,
  },
  // { label: "个人回单", slot: "inspect", headerAlign: "left" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 250,
    align: "right",
    headerAlign: "right",
  },
];
// 操作
const handleInspect = (scope: any) => {
  dialogVisible.value = true;
  console.log(typeof scope.row.transfer_certificate);

  imageList.value = scope.row.transfer_certificate;
};

const handleThaw = (scope: any) => {
  ElMessageBox({
    title: "",
    message: h(
      "p",
      null,
      `${
        [4].includes(scope.row.status)
          ? `是否去账户解封${scope.row.company_name}？`
          : `注意:该操作将直接封停${scope.row.company_name}！是否执行`
      }`
    ),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        if ([4].includes(scope.row.status)) {
          router.push({
            name: "business-account",
          });
        } else {
          await businessAccountSetStatus({
            id: scope.row.company_id,
            status: 2,
          });
        }
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `${
        [4].includes(scope.row.status)
          ? "成功跳转至账户中心"
          : "成功封停该企业！"
      }`,
    });
    getTableData();
  });
};
const handleDetails = (scope: any) => {
  router.push({
    name: "enterpriseSettlementDetails",
    query: { activeName: "1", id: scope.row.id },
  });
};
const handleDownload = async (scope: any) => {
  const { data } = await getEnterpriseExcel({ ids: [scope.row.id] });
  downloadByData(data, "结算列表.xlsx");

  await getTableData();
};
const handleDelete = (scope: any) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定删除该任务`),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;

        await deleteEnterpriseSettlementDoc(scope.row.id);

        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: "成功删除该任务",
    });
    getTableData();
  });
};
/**
 * 批量选择
 */
//选中的数据
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};

/**
 * 批量操作
 */
const handleBatchOperation = async (command: string | number | object) => {
  if (command == 1) {
    const { data } = await getEnterpriseExcel({ ids: selectionData.value });
    downloadByData(data, "结算列表.xlsx");
    await getTableData();
  }
};

const getTableData = async () => {
  const params = transformTimeRange({ ...formItem.value }) as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    const { data } = await getEnterpriseSettlementList(params);

    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    console.log(data.total_settlement_money, "total_settlement_money");
    total_settlement_money.value = data.total_settlement_money;

    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        settlement_order_no: item.settlement_order_no,
        status: item.status,
        reason: item.reason,
        task_count: item.task_count,
        company_id: item.company_id,
        company_name: item.company_name,
        tax_land_name: item.tax_land_name,
        total_people: item.total_people,
        real_people: item.real_people,
        tax_point: item.tax_point,
        total_money: proxy.$moneyFormat(item.total_money),
        real_money: proxy.$moneyFormat(item.real_money),
        settlement_time: item.settlement_time,
        transfer_certificate: item.transfer_certificate,
      };
    });
    tableData.length = 0;
    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
onMounted(() => {
  // rou()
});
defineExpose({
  getTableData,
});
</script>
<style lang="scss" scoped>
.recharge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding-left: 25px;
  font-size: 14px;
  background: #fef1f0;
  border-radius: 4px;
  opacity: 1;
}

.money {
  margin-left: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.unit {
  margin-left: 5px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
</style>
