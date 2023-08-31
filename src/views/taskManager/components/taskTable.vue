<template>
  <div class="p-[24px] p-b-[0]">
    <zxn-search
      :formItem="formItem"
      @on-search="handleSearch"
      @on-reset="handleReset"
    >
      <el-form-item label="" prop="task_name">
        <el-input
          v-model="formItem.task_name"
          placeholder="请输入任务名称、关联企业"
        >
          <template #prefix>
            <el-icon><i-ep-Search /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="任务状态" prop="status">
        <zxn-select v-model="formItem.status" @change="handleSearch">
          <el-option
            v-for="item in proxy.$const['statusEnum.TaskEnum']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </zxn-select>
      </el-form-item>
      <el-form-item label="行业类型" prop="category_id">
        <el-cascader
          v-model="formItem.category_id"
          placeholder="请选择"
          :options="industryList"
          :props="{ label: 'name', value: 'id' }"
        />
      </el-form-item>
      <el-form-item prop="timeData" label="申请日期">
        <zxn-date-range v-model="formItem.timeData" />
      </el-form-item>
    </zxn-search>
    <zxn-table
      ref="taskTable"
      :table-data="tableData"
      :column-list="columnList"
      hasSelect
      :page-info="pageInfo"
      :selectable="selectable"
      :loading="loading"
      @page-change="handlePageChange"
    >
      <template #tableTop>
        <el-dropdown
          trigger="click"
          @command="(instar) => handleCommand(instar)"
        >
          <el-button type="primary" plain>批量操作</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="reject">驳回</el-dropdown-item>
              <el-dropdown-item command="fulfill">通过</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template #status="{ row }">
        <div
          v-if="row.company_status === 4"
          v-text="'已封停'"
          class="zxn-table-label"
          :style="{ color: '#333333', backgroundColor: '#999999' }"
        />
        <div
          v-else
          v-text="proxy.$enumSet['statusEnum.TaskEnum'][row.status]"
          class="zxn-table-label"
          :style="checkStatusColor[row.status]"
        />
      </template>
      <template #salary="{ row }">
        <template v-if="row.task_attribute.salary_type === 1">
          <money-text :modelValue="row.task_attribute.salary" />
        </template>
        <template v-else>
          <money-text :modelValue="row.task_attribute.salary_min" />
          -
          <money-text :modelValue="row.task_attribute.salary_max" />
        </template>
      </template>
      <template #operation="{ row }">
        <template v-if="row.status === 1">
          <el-button link type="primary" @click="handleFulfill(row.id)"
            >通过</el-button
          >
          <el-button link type="primary" @click="handleReject(row.id)"
            >驳回</el-button
          >
        </template>
        <!--        <el-button-->
        <!--          v-if="[3, 4].includes(row.status)"-->
        <!--          link-->
        <!--          type="primary"-->
        <!--          @click="handleCommand('close', row.id)"-->
        <!--        >-->
        <!--          关闭-->
        <!--        </el-button>-->
        <el-button link type="primary" @click="handleView(row)">详情</el-button>
        <el-button link type="primary" @click="handleDelete(row)"
          >删除</el-button
        >
      </template>
    </zxn-table>
  </div>
</template>
<script setup lang="ts">
import { transformTimeRange } from "@/utils";
import { getTaskIndex, removeTask, setTaskStatus } from "@/api/task";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { isArray, isNumber } from "@/utils/is";
import { useRouteParams } from "@/store/modules/routeParams";
const router = useRouter();

const props = defineProps({
  industryList: { type: Array, default: () => [] },
  type: { type: Number, default: 1 },
});
const { proxy } = getCurrentInstance() as any;
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const formItem = reactive({
  task_name: "",
  status: "",
  timeData: [],
  category_id: [],
  task_type: "",
});
const tableData = reactive([]);
const checkStatusColor = {
  0: { color: "#19B56B", backgroundColor: "#daf3e7" },
  1: { color: "#19B56B", backgroundColor: "#daf3e7" },
  2: { color: "#F35135", backgroundColor: "#fde3df" },
  3: { color: "#356FF3", backgroundColor: "#dfe8fd" },
  4: { color: "#FFFFFF", backgroundColor: "#9ab7f9" },
  5: { color: "#35C5F3", backgroundColor: "#dff6fd" },
  6: { color: "#333333", backgroundColor: "#dedede" },
  7: { color: "#333333", backgroundColor: "#999999" },
};
const columnList = [
  {
    label: "任务编号",
    prop: "task_no",
    visible: props.type !== 1,
    minWidth: 140,
  },
  {
    label: "状态",
    type: "enum",
    slot: "status",
    minWidth: 100,
  },
  { label: "任务名称", prop: "task_name", minWidth: 120 },
  { label: "关联企业", prop: "company_name", minWidth: 140 },
  { label: "需求人数", prop: "task_attribute.person_count", type: "deep" },
  { label: "行业", prop: "category_name", minWidth: 80 },
  { label: "金额", slot: "salary", minWidth: 220 },
  {
    label: "申请时间",
    minWidth: 180,
    prop: "add_time",
  },
  {
    label: "备注",
    prop: "reject_reason",
    visible: props.type !== 1,
    showOverflowTooltip: true,
    minWidth: 100,
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 190,
    align: "right",
  },
];
const handleReset = () => {
  handleSearch();
};
const handleSearch = () => {
  pageInfo.page = 1;
  getTaskList();
};
const handlePageChange = (cur) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  getTaskList();
};
const loading = ref(false);
const getTaskList = async () => {
  const params = transformTimeRange({ ...formItem });
  params.category_id = params.category_id.pop();
  params.task_type = props.type;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  loading.value = true;
  try {
    const { data } = await getTaskIndex(params);
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
  return Boolean(row.status === 1);
};
const taskTable = ref();

const handleReject = (id: number | number[]) => {
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
          ids: isArray(id) ? id : [id],
          status: 2,
          reject_reason: instance.inputValue,
        };
        await setTaskStatus(params);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: "驳回成功",
    });
    getTaskList();
  });
};
const handleCommand = async (type) => {
  const selected = taskTable.value.getSelectionRows();
  const ids = selected.map((it) => it.id);
  if (!ids.length) {
    return ElMessage({
      type: "error",
      message: `请选择数据`,
    });
  }
  switch (type) {
    case "fulfill":
      handleFulfill(ids);
      break;
    case "reject":
      handleReject(ids);
      break;
  }
};
const handleFulfill = (id: number | number[]) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定通过该任务`),
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
        const params = {
          ids: isArray(id) ? id : [id],
          status: 3,
        };
        await setTaskStatus(params);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `通过成功`,
    });
    getTaskList();
  });
};
const handleDelete = (row: { id: number }) => {
  ElMessageBox({
    title: "",
    message: h("p", null, "确定删除该任务"),
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
        await removeTask(row.id);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `删除成功`,
    });
    getTaskList();
  });
};
const handleView = (row: { id: number }) => {
  router.push({ name: "taskManagerView", query: { id: row.id } });
};
onActivated(() => {
  const { pullParams } = useRouteParams();
  const searchParams: any = pullParams("taskManagerIndex");
  if (searchParams) {
    formItem.status =
      isNumber(searchParams.status) || searchParams.status
        ? searchParams.status + ""
        : "";
  }
  getTaskList();
});
defineExpose({
  getTaskList,
});
</script>
