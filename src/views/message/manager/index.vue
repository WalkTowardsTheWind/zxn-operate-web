<template>
  <zxn-plan>
    <zxn-tabs
      activeName="message"
      :tabsList="[{ label: '消息中心', name: 'message' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <zxn-search
        :formItem="formItem"
        @on-search="handleSearch"
        @on-reset="handleReset"
      >
        <el-form-item prop="keyword">
          <el-input v-model="formItem.keyword" placeholder="请输入">
            <template #prefix>
              <el-icon><i-ep-Search /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="timeData" label="通知日期">
          <zxn-date-range v-model="formItem.timeData" valueFormat="" />
        </el-form-item>
      </zxn-search>
      <zxn-table
        :table-data="tableData"
        :column-list="columnList"
        :page-info="pageInfo"
        :loading="loading"
        @page-change="handlePageChange"
      >
        <template #operation="{ row }">
          <el-button link type="primary" @click="handleView(row)"
            >查看</el-button
          >
        </template>
      </zxn-table>
    </div>
    <view-dialog ref="viewDialogRef" />
  </zxn-plan>
</template>
<script setup lang="ts">
import { notifyIndex } from "@/api/message";
import { transformTimeRange } from "@/utils";
import viewDialog from "./components/viewDialog.vue";
const formItem = reactive({
  keyword: "",
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
  { label: "来源", prop: "source", minWidth: 180 },
  { label: "信息标题", prop: "title", minWidth: 120 },
  { label: "信息内容", prop: "content", minWidth: 300 },
  { label: "通知时间", prop: "add_time", minWidth: 180 },
  { label: "操作", slot: "operation", fixed: "right", width: 70 },
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
    const { data } = await notifyIndex(params);
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
const viewDialogRef = ref();
const handleView = (row) => {
  viewDialogRef.value.init(row.id);
};
onMounted(() => {
  getList();
});
</script>
