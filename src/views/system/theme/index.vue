<template>
  <zxn-plan>
    <zxn-tabs
      activeName="theme"
      :tabsList="[{ label: '主题配置', name: 'theme' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <div class="mb-[16px]">
        <el-button type="primary" class="mr-[8px]">+ 新建</el-button>
      </div>
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
    <theme-drawer v-model="visible" />
  </zxn-plan>
</template>
<script setup lang="ts">
import { systemLog } from "@/api/system";
import { transformTimeRange } from "@/utils";
import themeDrawer from "./components/themeDrawer.vue";
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
  { label: "域名", prop: "admin_name" },
  { label: "logo", prop: "real_name" },
  { label: "版权备案", prop: "path" },
  { label: "操作内容", prop: "page", slot: "page" },
  { label: "操作时间", prop: "add_time" },
  // { label: "操作", slot: "operation", fixed: "right", width: 90 },
];

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
const visible = ref(false);
onMounted(() => {
  getList();
});
</script>
