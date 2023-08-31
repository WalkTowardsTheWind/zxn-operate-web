<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #enterprise>
        <enterprise-contract ref="enterprise"></enterprise-contract>
      </template>
      <template #channel>
        <channel-contract ref="channel"></channel-contract>
      </template>
      <template #supply>
        <supply-contract ref="supply"></supply-contract>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import enterpriseContract from "./enterpriseContract/index.vue";
import channelContract from "./channelContract/index.vue";
import supplyContract from "./supplyContract/index.vue";
const route = useRoute();
const activeName = ref("channel");
const tabsList = [
  {
    name: "enterprise",
    label: "企业合同",
  },
  {
    name: "channel",
    label: "渠道合同",
  },
  {
    name: "supply",
    label: "供应合同",
  },
];

const enterprise = ref();
const channel = ref();
const supply = ref();
const handleTabChange = () => {
  if (route.query.activeName) {
    if (route.query.activeName === "enterprise") {
      activeName.value = "enterprise";
    } else if (route.query.activeName === "channel") {
      activeName.value = "channel";
    } else if (route.query.activeName === "supply") {
      activeName.value = "supply";
    }
  } else {
    activeName.value = "enterprise";
  }
  if (activeName.value === "enterprise") {
    enterprise.value.getTableData();
  } else if (activeName.value === "channel") {
    channel.value.getTableData();
  } else if (activeName.value === "supply") {
    supply.value.getTableData();
  }
};
onMounted(() => {
  handleTabChange();
});
</script>
