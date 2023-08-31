<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="tabsList"
      v-model:activeName="activeName"
      hasBack
    ></zxn-tabs>
    <zxn-plan>
      <div class="manager">
        渠道管理员
        <span>：{{ channelName }}</span>
      </div>
      <div class="channel">
        <div class="line"></div>
        <span>上级渠道</span>
      </div>
      <zxn-table
        :table-data="tableData1"
        :column-list="columnList1"
        :has-pagination="false"
      ></zxn-table>
      <div class="channel">
        <div class="line"></div>
        <span>下级渠道</span>
      </div>
      <zxn-table
        :table-data="tableData2"
        :column-list="columnList2"
        :has-pagination="false"
      ></zxn-table>
      <div class="product" v-if="isEdit">
        <div class="head">
          <span>产品</span>
          <span>票面种类及税点</span>
          <span>合作价格</span>
        </div>
        <div class="form" v-for="(item, index) in addForm" :key="index">
          <el-select class="form-item"></el-select>
          <el-select class="form-item item3"></el-select>
          <el-input class="form-item" />
        </div>
        <div class="add" @click="addClick">+ 添加产品</div>
        <div class="add" v-if="addForm.length > 0" @click="delClick">
          - 删除
        </div>
      </div>
    </zxn-plan>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessChannelList } from "@/api/account/business";
import { useRoute } from "vue-router";

const route = useRoute();

const isEdit = ref(false);
const clickType = ref("");
const channelName = ref("");

if (route.query.status) {
  clickType.value = route.query.status.toString();
}

if (route.query.status === "edit") {
  isEdit.value = true;
}

const tabsList = [{ name: "0", label: "渠道信息" }];
const activeName = "0";

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
  { label: "累计借用金额", prop: "amount" },
  { label: "绑定时间", prop: "add_time" },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const addForm = ref([] as any);
const addClick = () => {
  addForm.value.push({
    product: "",
    type: "",
    price: "",
  });
};

const delClick = () => {
  if (addForm.value.length !== 0) {
    addForm.value.splice(0, 1);
  }
};

async function getList() {
  if (route.query.id && route.query.type) {
    let params = {
      id: route.query.id,
      type: route.query.type,
    };
    const res = await getBusinessChannelList(params);
    channelName.value = res.data.channel_admin_name;
    tableData1.value = [res.data.parent];
    tableData2.value = res.data.child;
    console.log(res);
  }
}

getList();
</script>

<style scoped lang="scss">
.manager {
  margin: 20px 0;
  color: #656565;

  span {
    color: #333;
  }
}

.channel {
  display: flex;
  align-items: center;
  margin: 16px 0;
  color: #356ff3;

  .line {
    width: 4px;
    height: 16px;
    margin-right: 8px;
    background: #366ff3;
    border-radius: 2px;
  }
}

.product {
  width: 402px;

  .head {
    display: flex;
    gap: 0 90px;
    justify-content: center;
    padding: 20px 0;
    margin: 20px 0;
    background: #f7fbff;
  }

  .form {
    display: flex;
    gap: 0 10px;

    .form-item {
      flex: 1;
      margin: 10px 0;
    }

    .item3 {
      flex: 2;
    }
  }

  .add {
    color: #356ff3;
    cursor: pointer;
    user-select: none;
  }
}
</style>
