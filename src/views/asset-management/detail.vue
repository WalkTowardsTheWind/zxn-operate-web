<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <RechargeDetailView />
      </template>
      <template #2>
        <SettlementDetailView />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import RechargeDetailView from "./components/recharge-detail.vue";
import SettlementDetailView from "./components/settlement-detail.vue";

const tabsList = [
  {
    name: "1",
    label: "充值明细",
  },
  {
    name: "2",
    label: "结算明细",
  },
];

const activeName = ref("1");
</script>
