<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item>
        <el-input v-model="formItem.name" placeholder="请输入姓名或联系号码">
          <template #prefix>
            <i-ep-Search />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="账户状态">
        <el-select v-model="formItem.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
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
          value-format="YYYY-MM-DD"
          unlink-panels
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
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
        <el-dropdown trigger="click">
          <el-button type="primary">批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="1">删除</el-dropdown-item>
              <el-dropdown-item command="2">下载</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #is_channel="scope">
        <span>{{ scope.row.is_channel === 0 ? "否" : "是" }}</span>
      </template>
      <template #operation="scope">
        <el-button
          v-if="[1, 2, 3].includes(scope.row.status)"
          link
          type="primary"
          @click="stop(scope.row.id, 2)"
          >封停</el-button
        >
        <el-button
          v-if="scope.row.status === 4"
          link
          type="primary"
          @click="stop(scope.row.id, 1)"
        >
          解封
        </el-button>
        <el-button v-if="scope.row.status === 1" link type="primary"
          >上传</el-button
        >
        <el-button link type="primary" @click="toDetail('edit', scope.row.id)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="del(scope.row.id)"
          >删除</el-button
        >
        <el-button link type="primary" @click="toDetail('detail', scope.row.id)"
          >详情</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>

<script lang="ts" setup>
import {
  delPersonalAccount,
  getPersonalAccountList,
  setPersonalStatus,
} from "@/api/account/personal";
import router from "@/router";

// import router from "@/router";

const statusOptions = ref([
  { label: "全部", value: "" },
  { label: "申请中", value: 0 },
  { label: "未认证 ", value: 1 },
  { label: "正常", value: 2 },
  { label: "预警", value: 3 },
  { label: "封停", value: 4 },
]);

const formItem = reactive({
  name: "",
  status: "",
  start_time: "",
  end_time: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const date = ref("");

const tableData = reactive([] as any);
const columnList = [
  { label: "账户ID", prop: "id", width: 100 },
  {
    label: "状态",
    type: "enum",
    path: "accountEnum.personalType",
    prop: "status",
    color: {
      0: { color: "#366FF3", background: "#dfe8fd" },
      1: { color: "#5EE9F9", background: "#e5fbfe" },
      2: { color: "#366FF3", background: "#dfe8fd" },
      3: { color: "#F35125", background: "#fde3dc" },
      4: { color: "#333333", background: "#dedede" },
      width: 100,
    },
  },
  { label: "姓名", prop: "real_name" },
  { label: "是否渠道", prop: "is_channel", slot: "is_channel" },
  { label: "联系方式", prop: "phone" },
  { label: "创建时间", prop: "add_time" },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const toDetail = (status: string, id: number) => {
  router.push({ name: "personal-account-detail", query: { status, id } });
};

/**
 * 页面
 */
function pageChange(current: any) {
  console.log(current);
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  handleSearch();
}

/**
 * 查询
 */
async function handleSearch() {
  tableData.length = 0;
  let params = {
    ...formItem,
    ...pageInfo,
    start_time: date.value[0],
    end_time: date.value[1],
  };
  const { data } = await getPersonalAccountList(params);
  pageInfo.total = data.total;
  tableData.push(...data.data);
}
/**
 * 重置
 */
function handleReset() {
  formItem.name = "";
  formItem.status = "";
  date.value = "";
  handleSearch();
}

/**
 * 删除个人账户
 */
function del(id) {
  ElMessageBox.confirm("是否删除账号?", "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      delPersonalAccount(id).then((res) => {
        console.log(res);
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

function stop(id: number, status: number) {
  if (status === 1) {
    ElMessageBox.confirm("是否解封账号?", "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        setPersonalStatus({ id, status }).then((res) => {
          console.log(res);
          ElMessage({
            type: "success",
            message: "解封成功",
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
  if (status === 2) {
    ElMessageBox.confirm("是否封停账号?", "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
      center: true,
    })
      .then(() => {
        setPersonalStatus({ id, status }).then((res) => {
          console.log(res);
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
          message: "取消删除",
        });
      });
  }
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
