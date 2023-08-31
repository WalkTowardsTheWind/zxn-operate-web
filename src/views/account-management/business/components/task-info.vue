<template>
  <zxn-plan>
    <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #person_count="scope">
        <span>{{ scope.row.task_attribute.person_count }}</span>
      </template>
      <template #salary_min_max="scope">
        <span>{{ scope.row.task_attribute.salary_min }}</span>
        <span>-</span>
        <span>{{ scope.row.task_attribute.salary_max }}</span>
      </template>
      <!-- <template #operation="scope" v-if="isEdit">
				<el-button v-if="scope" link type="primary">通过</el-button>
				<el-button v-if="scope" link type="primary">驳回</el-button>
				<el-button v-if="scope" link type="primary">编辑</el-button>
				<el-button link type="primary">删除</el-button>
				<el-button link type="primary">详情</el-button>
			</template> -->
      <!-- <template #operation="scope" v-else>
				<el-button link type="primary" @click="scope.row.id">查看</el-button>
			</template> -->
    </zxn-table>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessAccountTaskList } from "@/api/account/business";

enum status {
  "申请中",
  "驳回",
  "报名中",
  "已验收",
  "封停",
  "关闭",
}

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const tableData = reactive([] as any);

const columnList = [
  { label: "任务编号", prop: "task_no", minWidth: 200 },
  { label: "任务名称", prop: "task_name", minWidth: 150 },
  {
    label: "状态",
    prop: "status",
    path: "accountEnum.taskStaus",
    type: "enum",
    minWidth: 150,
    color: {
      0: {},
      1: {
        color: "#366FF3",
        background: "#DFE8FD",
      },
      2: {
        color: "#333333",
        background: "#DEDEDE",
      },
      3: {
        color: "#1ee685",
        background: "#dbfceb",
      },
      4: {
        color: "#5EE9F9",
        background: "#E5FBFE",
      },
      5: {
        color: "#F35036",
        background: "#FDE3DF	",
      },
    },
  },
  { label: "关联企业", prop: "company_name", minWidth: 200 },
  { label: "需求人数", prop: "task_attribute", slot: "person_count" },
  { label: "税地", prop: "tax_land_name", minWidth: 200 },
  { label: "行业", prop: "category_name" },
  {
    label: "预算",
    prop: "task_attribute",
    slot: "salary_min_max",
    minWidth: 150,
  },
  { label: "申请时间", prop: "add_time", minWidth: 200 },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

function getList() {
  if (props.id) {
    let params = {
      company_id: props.id,
      ...pageInfo,
    };
    getBusinessAccountTaskList(params).then((res) => {
      tableData.length = 0;
      tableData.push(...res.data.data);
      pageInfo.total = res.data.total;
    });
  }
}

function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  getList();
}

getList();
</script>
