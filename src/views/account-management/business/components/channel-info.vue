<template>
  <zxn-plan>
    <div class="channel">
      渠道管理员：<span class="name">{{ channelName }}</span>
    </div>
    <div>
      <div class="line">
        <div></div>
        <span>上级渠道</span>
      </div>
    </div>
    <zxn-table
      :table-data="tableData1"
      :column-list="columnList1"
      :hasPagination="false"
    >
      <template #operation="scope" v-if="isEdit">
        <el-button v-if="scope" link type="primary">编辑</el-button>
        <el-button link type="primary">删除</el-button>
        <el-button link type="primary">下载</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table>
    <div class="mt-10">
      <div class="line">
        <div></div>
        <span>下级渠道</span>
      </div>
    </div>
    <zxn-table
      :table-data="tableData2"
      :column-list="columnList2"
      :hasPagination="false"
    >
      <template #operation="scope" v-if="isEdit">
        <el-button v-if="scope" link type="primary">编辑</el-button>
        <el-button link type="primary">删除</el-button>
        <el-button link type="primary">下载</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessChannelList } from "@/api/account/business";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
});

const channelName = ref("");

const tableData1 = ref([] as any);

const tableData2 = ref([] as any);

const columnList1 = [
  { label: "上级渠道", prop: "channel_name" },
  { label: "分佣点位", prop: "point" },
  {
    label: "状态",
    prop: "status",
    // type: "enum",
    // path: "statusEnum.AccountType",
    // color: { 0: "blue", 1: "green", 2: "浅蓝", 3: "红色", 4: "封停" },
  },
  { label: "绑定时间", prop: "bind_time" },
  { label: "累计结佣任务", prop: "task_count" },
  { label: "累计借用金额", prop: "total_amount" },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const columnList2 = [
  { label: "下级企业", prop: "company_id" },
  { label: "企业名称", prop: "company_name" },
  {
    label: "状态",
    prop: "status",
    // type: "enum",
    // path: "statusEnum.AccountType",
    // color: { 0: "blue", 1: "green", 2: "浅蓝", 3: "红色", 4: "封停" },
  },
  { label: "税点", prop: "point" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "累计结佣任务", prop: "task_count" },
  { label: "累计结佣金额", prop: "amount" },
  { label: "绑定时间", prop: "add_time" },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

async function getList() {
  if (props.id) {
    let params = {
      id: 17,
      type: 2,
    };
    const res = await getBusinessChannelList(params);
    channelName.value = res.data.channel_admin_name;
    tableData1.value = [res.data.parent];
    tableData2.value = res.data.child;
  }
}

getList();
</script>

<style scoped lang="scss">
.channel {
  margin: 15px 0;
  font-size: 14px;
  color: #656565;

  .name {
    color: #333;
  }
}

.line {
  display: flex;
  align-items: center;
  margin: 15px 0;
  margin-bottom: 20px;
  font-size: 14px;
  color: #366ff4;
  color: #656565;

  div {
    width: 4px;
    height: 14px;
    margin-right: 8px;
    background: #366ff4;
    border-radius: 2px;
  }

  .name {
    color: #333;
  }
}
</style>
