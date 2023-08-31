<template>
  <zxn-plan>
    <zxn-tabs
      activeName="log"
      :tabsList="[{ label: '操作日志', name: 'log' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        @on-reset="handleReset"
      >
        <el-form-item prop="key_word">
          <el-input v-model="formItem.key_word" placeholder="请输入账户名称">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!--        <el-form-item prop="admin_name" label="联系人">-->
        <!--          <el-input v-model="formItem.admin_name" />-->
        <!--        </el-form-item>-->
        <el-form-item prop="timeData" label="操作日期">
          <zxn-date-range v-model="formItem.timeData" valueFormat="" />
        </el-form-item>
        <!--        <template #rightBtn>-->
        <!--          <el-button type="primary" plain>导出</el-button>-->
        <!--        </template>-->
      </zxn-search>
      <zxn-table
        :table-data="tableData"
        :column-list="columnList"
        :page-info="pageInfo"
        :loading="loading"
        @page-change="handlePageChange"
      >
        <template #page>--</template>
        <template #operation>
          <el-button link type="primary">查看</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import { systemLog } from "@/api/system";
import { transformTimeRange } from "@/utils";
const formItem = reactive({
  key_word: "",
  admin_name: "",
  timeData: [],
});
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const tableData = reactive([]);
const columnList = [
  { label: "账户名称", prop: "admin_name" },
  { label: "联系人", prop: "real_name" },
  { label: "操作模块", prop: "path" },
  { label: "操作内容", prop: "page", slot: "page" },
  { label: "操作时间", prop: "add_time" },
  // { label: "操作", slot: "operation", fixed: "right", width: 90 },
];

const handleReset = () => {
  handleSearch();
};
const handleSearch = () => {
  pageInfo.page = 1;
  getList();
};
const handlePageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getList();
};
const loading = ref(false);
const getList = async () => {
  const params = transformTimeRange({ ...formItem }, "timeData", true);
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } = await systemLog(params);
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
onMounted(() => {
  getList();
});
</script>
