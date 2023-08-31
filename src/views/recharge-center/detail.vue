<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabs-list="tabsList" hasBack>
    </zxn-tabs>
    <div class="p-[24px]">
      <div class="company">
        <span class="title"
          >企业名称<span class="item">武汉某某某有限公司</span></span
        >
        <span class="title"
          >企业账户ID<span class="item">0965672821</span></span
        >
        <span class="title">充值单号<span class="item">98764367818</span></span>
        <span class="title"
          >充值单号<span class="item">2022-10-10 10:10</span></span
        >
      </div>
      <zxn-table :table-data="tableData" :column-list="columnList" hasSelect>
        <template #operation>
          <el-button link>查看</el-button>
          <el-button link>上传</el-button>
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>

<script lang="ts" setup>
// import { useRoute } from 'vue-router';

// const route = useRoute()

const tabsList = [{ name: 1, label: "充值详情" }];

const tableData = reactive([
  { value: "1", name: "shshhud", state: 1 },
  { value: "2", name: "shshhud", state: 1 },
  { value: "3", name: "shshhud", state: 1 },
  { value: "4", name: "shshhud", state: 1 },
  { value: "5", name: "shshhud", state: 1 },
]);
const columnList = [
  { label: "任务编号", prop: "value" },
  { label: "税源地" },
  { label: "税地账户" },
  { label: "充值额度" },
  { label: "充值凭证", slot: "operation", fixed: "right", width: 250 },
];

const activeName = ref(1);

// function getList() {

// }
</script>

<style scoped>
.company {
  display: flex;
  padding: 24px 30px;
  margin-right: 19px;
  font-size: 14px;
  font-weight: 500;
}

.title {
  margin-right: 59px;
  color: #656565;
}

.item {
  margin-left: 19px;
  color: #333;
}
</style>
