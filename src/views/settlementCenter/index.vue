<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #enterprise>
        <enterprise-settlement ref="enterprise"></enterprise-settlement>
      </template>
      <template #channelCommission>
        <channel-commission-settlement
          ref="channelCommission"
        ></channel-commission-settlement>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import enterpriseSettlement from "./enterpriseSettlement/index.vue";
import channelCommissionSettlement from "./channelCommissionSettlement/channelCommissionSettlementList.vue";
const route = useRoute();
const activeName = ref("enterprise");
const tabsList = reactive([
  {
    name: "enterprise",
    label: "企业结算",
  },
  {
    name: "channelCommission",
    label: "渠道佣金结算",
  },
]);

const enterprise = ref();
const channelCommission = ref();
const handleTabChange = () => {
  if (route.query.activeName) {
    if (route.query.activeName === "enterprise") {
      activeName.value = "enterprise";
    } else if (route.query.activeName === "channelCommission") {
      activeName.value = "channelCommission";
    }
  }

  if (activeName.value === "enterprise") {
    enterprise.value.getTableData();
  } else if (activeName.value === "channelCommission") {
    channelCommission.value.getTableData();
  }
};
onMounted(() => {
  handleTabChange();
});
</script>
