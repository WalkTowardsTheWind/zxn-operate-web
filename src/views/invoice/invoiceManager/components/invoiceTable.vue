<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
      :label-width="100"
    >
      <el-form-item label="" prop="invoice_name">
        <el-input v-model="formItem.invoice_name" placeholder="请输入企业名称">
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="开票状态" prop="status">
        <zxn-select v-model="formItem.status">
          <el-option
            v-for="item in proxy.$const['statusEnum.invoiceStatus']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>
      <el-form-item label="开票类型" prop="invoice_type">
        <el-select v-model="formItem.invoice_type" placeholder="请选择">
          <el-option
            v-for="item in proxy.$const['statusEnum.applyInvoiceType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="开票行业类目"
        prop="category_id"
        v-if="type === 'enterprise'"
      >
        <el-cascader
          v-model="formItem.category_id"
          placeholder="请选择"
          :options="industryList"
          filterable
          clearable
          :props="{ label: 'name', value: 'id' }"
        />
      </el-form-item>
      <el-form-item prop="timeData" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      ref="table"
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      :loading="loading"
      hasSelect
      :selectable="selectable"
      @page-change="handlePageChange"
    >
      <template #tableTop>
        <!--        <el-button type="primary" plain @click="handleCommand"-->
        <!--          >批量驳回</el-button-->
        <!--        >-->
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button type="primary" plain>批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="reject">驳回</el-dropdown-item>
              <el-dropdown-item command="excel">导出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #img="{ row }">
        <zxn-image
          :imgList="row.settlement_confirmation_letter"
          :width="40"
          :height="40"
          targetClick
          ellipsis
        />
      </template>
      <template #operation="{ row }">
        <template v-if="!row.status">
          <el-button link type="primary" @click="handleReject([row.id])"
            >驳回</el-button
          >
          <el-button link type="primary" @click="handleUpload(row)"
            >上传发票</el-button
          >
        </template>
        <el-button link type="primary" @click="handleView(row)">详情</el-button>
        <el-button
          v-if="row.status === 5 || row.status === 1"
          link
          type="primary"
          @click="handleLogistics(row)"
          >查看物流</el-button
        >
        <!--        <el-button link type="primary">导出</el-button>-->
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import { getTreeList } from "@/api/common";
import {
  getInvoiceInCompany,
  getInvoiceInChannel,
  setStatus,
  channelSetStatus,
  getInvoiceExcel,
} from "@/api/invoice";
import { transformTimeRange } from "@/utils";
import { downloadByData } from "@/utils/download";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useRouteParams } from "@/store/modules/routeParams";
import { isNumber } from "@/utils/is";
const router = useRouter();
const props = defineProps({
  type: { type: String, default: "enterprise" },
});
const emits = defineEmits(["on-upload", "on-logistics"]);
const industryList = reactive([]);
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const getIndustryList = async () => {
  const { data } = await getTreeList({ type: 2 });
  industryList.length = 0;
  industryList.push(...data);
};
const formItem = reactive({
  invoice_name: "",
  tax_land_id: "",
  invoice_type: "",
  category_id: [],
  timeData: [],
  status: "",
});
const columnList: any[] = reactive([
  { label: "发票任务编号", prop: "invoice_no", minWidth: 200 },
  {
    label: "发票类目",
    prop: "category_num",
    minWidth: 120,
  },
  { label: "申请开票企业", prop: "company_name", minWidth: 150 },
  {
    label: "开票样式",
    prop: "invoice_type",
    type: "enum",
    path: "statusEnum.applyInvoiceType",
    minWidth: 120,
  },
  { label: "申请开票金额", prop: "apply_amount", type: "money", minWidth: 120 },
  {
    label: "税地发票面额",
    prop: "invoice_denomination",
    type: "enum",
    path: "taxLandManagementEnum.invoice_denomination",
    minWidth: 110,
  },
  { label: "发票张数", prop: "invoice_num", minWidth: 80 },
  {
    label: "开票要求",
    prop: "invoice_require",
    type: "enum",
    path: "statusEnum.invoiceRequire",
    minWidth: 120,
  },
  { label: "申请时间", prop: "add_time", minWidth: 180 },
  { label: "结算确认函", slot: "img", minWidth: 200 },
  {
    label: "状态",
    type: "enum",
    path: "statusEnum.invoiceStatus",
    prop: "status",
    color: {
      0: { color: "#35C5F3", backgroundColor: "#dff6fd" },
      1: { color: "#356FF3", backgroundColor: "#dfe8fd" },
      2: { color: "#F35135", backgroundColor: "#fde3df" },
      3: { color: "#FFFFFF", backgroundColor: "#f9a89a" },
      5: { color: "#356FF3", backgroundColor: "#dfe8fd" },
    },
    minWidth: 120,
  },
  {
    label: "是否导出",
    type: "enum",
    path: "common.yesOrNo",
    prop: "is_excel",
    minWidth: 120,
  },
  { label: "备注", prop: "reject_reason", minWidth: 180 },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    align: "right",
    width: 230,
  },
]);
const tableData: any[] = reactive([]);

const handleReset = () => {
  handleSearch();
};
const handleSearch = () => {
  pageInfo.page = 1;
  getList();
};
const handlePageChange = (cur) => {
  const { page } = cur;
  pageInfo.page = page;
  getList();
};
const loading = ref(false);
const getList = async () => {
  const params = transformTimeRange({ ...formItem });
  params.category_id = params.category_id.pop();
  params.task_type = props.type;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } =
      props.type === "enterprise"
        ? await getInvoiceInCompany(params)
        : await getInvoiceInChannel(params);
    loading.value = false;
    tableData.length = 0;
    pageInfo.page = data.current_page;
    pageInfo.total = data.total;
    tableData.push(...data.data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
const selectable = (row) => {
  return Boolean(!row.status);
};
const handleView = (cur) => {
  router.push({ name: "invoiceView", query: { id: cur.id, type: props.type } });
};
const table = ref();
const handleCommand = (type: string) => {
  const selected = table.value.getSelectionRows();
  const ids = selected.map((it) => it.id);
  if (!ids.length) {
    return ElMessage({
      type: "error",
      message: `请选择数据`,
    });
  }
  switch (type) {
    case "reject":
      handleReject(ids);
      break;
    case "excel":
      handleExcel(ids);
      break;
  }
};
const handleReject = (ids: number[]) => {
  ElMessageBox.prompt("", "驳回原因", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    inputErrorMessage: "请输入驳回原因",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean; inputValue: string },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        const params = {
          ids,
          status: 2,
          reject_reason: instance.inputValue,
        };
        props.type === "enterprise"
          ? await setStatus(params)
          : await channelSetStatus(params);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `驳回成功`,
    });
    getList();
  });
};
const handleExcel = async (ids: number[]) => {
  const params = {
    ids,
    page: 1,
    limit: pageInfo.limit,
  };
  const { data } = await getInvoiceExcel(params);
  downloadByData(data, "发票列表.xlsx");
  await getList();
};

const handleUpload = (cur) => {
  emits("on-upload", cur);
};
const handleLogistics = (cur) => {
  emits("on-logistics", cur);
};
onMounted(() => {
  if (props.type === "enterprise") {
    getIndustryList();
  }
});
onActivated(() => {
  const { pullParams } = useRouteParams();
  const searchParams: any = pullParams("invoiceManager");
  if (searchParams) {
    formItem.status =
      isNumber(searchParams.status) || searchParams.status
        ? searchParams.status + ""
        : "";
  }
});
defineExpose({
  getList,
});
</script>
