<template>
  <zxn-plan>
    <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      <template #1>
        <PlatformAssetView />
      </template>
      <template #2>
        <ChannelCommission />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import PlatformAssetView from "./components/platform-assets.vue";
import ChannelCommission from "./components/channel-commission.vue";

const tabsList = [
  {
    name: "1",
    label: "平台资产",
  },
  {
    name: "2",
    label: "渠道佣金统计",
  },
];

const activeName = ref("1");
</script>
