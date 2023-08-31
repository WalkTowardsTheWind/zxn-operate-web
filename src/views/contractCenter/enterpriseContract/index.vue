<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input
          v-model="formItem.keywords"
          placeholder="请输入合同编号、甲方名称或乙方名称"
        >
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="合同状态">
        <el-select v-model="formItem.status" placeholder="全部">
          <el-option
            v-for="item in proxy.$const['contractCenterEnum.contractStatus']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="date" label="创建日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="handlePageChange"
      hasSelect
      @selection-change="handleSelect"
    >
      <template #tableTop>
        <el-dropdown trigger="click" @command="handleAdd">
          <el-button type="primary">+ 新建</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">线下合同</el-dropdown-item>
              <!-- <el-dropdown-item command="2">线下合同</el-dropdown-item> -->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="ml-4" color="#366FF4" plain @click="handleExport"
          >导出</el-button
        >
        <el-button class="ml-4" color="#366FF4" plain @click="handleImport"
          >导入</el-button
        >
      </template>
      <template #operation="scope">
        <el-button
          v-if="scope.row.status != 1"
          link
          type="primary"
          @click="handleUpdateStatus(scope)"
          >{{ scope.row.status == 0 ? "停用" : "启用" }}</el-button
        >
        <el-button link type="primary" @click="handleEdit(scope)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handleDownload(scope)"
          >下载</el-button
        >
        <el-button link @click="handleDetails(scope)">详情</el-button>
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { useRouter } from "vue-router";
import { getEnterpriseContractList } from "@/api/contractCenter/enterpriseContract";
import { updateStatus } from "@/api/contractCenter";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance() as any;

// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handleReset = () => {
  formItem.value = {
    company_id: "",
    keywords: "",
    timeData: [],
    contract_kind: "",
    page: "",
    limit: "",
    status: "",
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
const formItem = ref({
  company_id: "",
  keywords: "",
  timeData: [],
  contract_kind: "",
  page: "",
  limit: "",
  status: "",
});

var tableData = reactive([] as any);
const columnList = [
  { label: "合同编号", prop: "contract_no" },
  {
    label: "状态",
    type: "enum",
    path: "contractCenterEnum.contractStatus",
    prop: "status",
    // fixed: "left",
    color: {
      0: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      1: { color: "#FFFFFF", backgroundColor: "#999999" },
      2: { color: "#333333", backgroundColor: "#DEDEDE" },
    },
  },
  { label: "合同类型", prop: "contract_kind" },
  { label: "签署形式", prop: "online_type" },
  { label: "甲方", prop: "party_a" },
  { label: "乙方", prop: "party_b" },
  { label: "合同点位", prop: "tax_location" },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 250,
    align: "right ",
    headerAlign: "right",
  },
];
// 操作
const handleDetails = (scope: any) => {
  router.push({
    name: "enterpriseContractDetails",
    query: { activeName: "enterprise", id: scope.row.id },
  });
};
const handleEdit = (scope: any) => {
  router.push({
    name: "enterpriseContractEdit",
    query: { activeName: "enterprise", id: scope.row.id },
  });
};
const handleUpdateStatus = async (scope: any) => {
  ElMessageBox({
    title: "",
    message: h(
      "p",
      null,
      `确定${scope.row.status == 0 ? "停用" : "启用"}该合同`
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
        var data = {
          id: scope.row.id,
          status: scope.row.status == 0 ? "2" : "0",
        };
        await updateStatus(data);

        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `成功${scope.row.status == 0 ? "停用" : "启用"}该任务合同`,
    });
    getTableData();
  });
};
const handleDownload = (scope: any) => {
  console.log(scope);
};
/**
 * 批量选择
 */
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};
/**
 * 新建
 */
const router = useRouter();
const handleAdd = (command: string | number | object) => {
  if (command == 1) {
    router.push({
      name: "enterpriseContractAdd",
      query: { activeName: "enterprise" },
    });
  } else if (command == 2) {
    // router.push({ name: "enterpriseContractAdd", query: { activeName: "2" } });
  }
};
/**
 * 导出、导入
 */
const handleExport = () => {};
const handleImport = () => {};

/**
 * 获取数据
 */
const getTableData = async () => {
  const params = transformTimeRange({ ...formItem.value });
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  try {
    const { data } = await getEnterpriseContractList(params);
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    var newData = data.data.map((item: any) => {
      return {
        id: item.id,
        contract_no: item.contract_no,
        status: item.status,
        contract_kind:
          proxy.$enumSet["contractCenterEnum.contractType"][item.contract_kind],
        online_type:
          proxy.$enumSet["contractCenterEnum.onlineType"][item.online_type],
        party_a: item.party_a,
        party_b: item.party_b,
        tax_location: item.tax_location,
      };
    });
    tableData.push(...newData);
  } catch (error) {
    console.log(error);
  }
};
getTableData();
defineExpose({
  getTableData,
});
</script>
