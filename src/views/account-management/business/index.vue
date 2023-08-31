<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-reset="handleReset"
      @on-search="handleSearch"
    >
      <el-form-item>
        <el-input
          v-model="formItem.company_name"
          placeholder="请输入企业、账户名称、企业联系人、联系电话"
        >
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select
          v-model="formItem.status"
          placeholder="请选择"
          @change="handleChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="date" label="创建日期">
        <el-date-picker
          v-model="date"
          type="daterange"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          value-format="YYYY-MM-DD"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="客户点位">
        <div class="flex">
          <el-input
            v-model="formItem.point_min"
            placeholder="请输入"
            clearable
          />
          <div class="m-x-[20px]">~</div>
          <el-input
            v-model="formItem.point_max"
            placeholder="请输入"
            clearable
          />
        </div>
      </el-form-item>
      <el-form-item prop=" date" label="计费方式">
        <el-select v-model="formItem.calculation_type" placeholder="请选择">
          <el-option label="全部" value="" />
          <el-option label="内扣" value="0" />
          <el-option label="外扣" value="1" />
        </el-select>
      </el-form-item>
    </zxn-search>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      hasSelect
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #tableTop>
        <el-button
          type="primary"
          plain
          @click="$router.push({ name: 'business-account-add' })"
          >+ 新建</el-button
        >
        <!-- <el-dropdown class="ml-4" trigger="click">
          <el-button type="primary" plain>批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">封停</el-dropdown-item>
              <el-dropdown-item command="2">解封</el-dropdown-item>
              <el-dropdown-item command="3">导出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
      </template>
      <template #calculation_type="scope">
        <span>{{ ["内扣", "外扣"][scope.row.calculation_type] }}</span>
      </template>
      <template #operation="scope">
        <el-button
          v-if="
            scope.row.status !== 4 &&
            scope.row.status !== 0 &&
            scope.row.status !== 1
          "
          link
          type="primary"
          @click="stop(scope.row.company_id, '2')"
          >封停</el-button
        >
        <el-button
          v-if="scope.row.status === 0"
          link
          type="primary"
          @click="toDetail('check', scope.row.company_id)"
          >审核</el-button
        >
        <el-button
          v-if="scope.row.status === 4"
          link
          type="primary"
          @click="free(scope.row.company_id, '1')"
          >解封</el-button
        >
        <el-button
          v-if="scope.row.status === 1"
          link
          type="primary"
          @click="toDetail('edit', scope.row.company_id)"
          >上传</el-button
        >
        <el-button
          link
          type="primary"
          @click="toDetail('edit', scope.row.company_id)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="del(scope.row.company_id)"
          >删除</el-button
        >
        <!-- <el-button link type="primary">导出</el-button> -->
        <el-button
          link
          type="primary"
          @click="toDetail('detail', scope.row.company_id)"
          >详情</el-button
        >
        <!-- <el-button link type="primary" @click="resetPWD(scope.row.company_id)">重置密码</el-button> -->
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import {
  businessAccountSetStatus,
  deleteBusinessAccount,
  getBusinessAccountList,
} from "@/api/account/business";
import router from "@/router";

const options = ref([
  { label: "全部", value: "" },
  { label: "申请中", value: 0 },
  { label: "未认证 ", value: 1 },
  { label: "正常", value: 2 },
  { label: "预警", value: 3 },
  { label: "封停", value: 4 },
]);

const formItem = reactive({
  company_name: "",
  status: "",
  calculation_type: "",
  point_min: "",
  point_max: "",
} as any);

const pageInfo = reactive({
  total: 0,
  page: 1,
  limit: 20,
});
const date = ref("");

const tableData = reactive([] as any);
const columnList = [
  { label: "账户名称", prop: "account", width: 150 },
  {
    label: "状态",
    type: "enum",
    path: "accountEnum.businessType",
    prop: "status",
    color: {
      0: { color: "#1DE585", background: "#dbfbeb" },
      1: { color: "#35C5F3", background: "#dff6fd" },
      2: { color: "#356FF3", background: "#dfe8fd" },
      3: { color: "#F35036", background: "#fde3df" },
      4: { color: "#333333", background: "#dedede" },
    },
    width: 100,
  },
  { label: "企业", prop: "company_name", minWidth: 200 },
  { label: "企业联系人", prop: "contacts", width: 150 },
  { label: "联系号码", prop: "mobile", width: 150 },
  { label: "客户点位", prop: "tax_point", width: 100 },
  {
    label: "计费方式",
    prop: "calculation_type",
    slot: "calculation_type",
    width: 100,
  },
  { label: "创建时间", prop: "add_time", width: 200 },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const toDetail = (status: string, id: any) => {
  // console.log(item);
  router.push({
    name: "business-account-detail",
    query: { status, id },
  });
};

/**
 * 查询
 */
async function handleSearch() {
  tableData.length = 0;
  let params = {
    ...formItem,
    page: pageInfo.page,
    limit: pageInfo.limit,
    start_time: date.value[0] || "",
    end_time: date.value[1] || "",
  };
  try {
    const { data } = await getBusinessAccountList(params);
    pageInfo.total = data.total;
    tableData.push(...data.data);
  } catch (error: any) {
    return new Error("error", error);
  }
}
/**
 * 重置
 */
function handleReset() {
  formItem.company_name = "";
  formItem.status = "";
  formItem.point_min = "";
  formItem.point_max = "";
  formItem.calculation_type = "";
  date.value = "";
  handleSearch();
}

function handleChange() {
  handleSearch();
}

/**
 * 页面
 */
function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
}

/**
 * 删除企业账户
 */
function del(id: number) {
  ElMessageBox.confirm("是否删除企业账号?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      deleteBusinessAccount(id).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
}

function stop(id: string, status: string) {
  ElMessageBox.confirm("是否封停企业账号?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      businessAccountSetStatus({ id, status }).then(() => {
        ElMessage({
          type: "success",
          message: "封停成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
}

function free(id: string, status: string) {
  ElMessageBox.confirm("是否解封企业账号?", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      businessAccountSetStatus({ id, status }).then(() => {
        ElMessage({
          type: "success",
          message: "封停成功",
        });
        handleSearch();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消",
      });
    });
}

function resetPWD(company_id: string) {
  console.log(company_id);
}

handleSearch();
</script>

<style lang="scss">
.searchForm {
  margin-top: 10px;
}

.line {
  margin: 0 2px;
  font-size: 1px;
  color: #ccc;
  border: none !important;
}
</style>
