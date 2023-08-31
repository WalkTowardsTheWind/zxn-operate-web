<template>
  <zxn-plan>
    <zxn-tabs
      v-model:activeName="activeName"
      :tabsList="tabsList"
      @tabChange="handleTabChange"
    >
      <template #selfOperated>
        <self-operated-tax-land ref="selfOperated"></self-operated-tax-land>
      </template>
      <template #purchase>
        <purchase-tax-land ref="purchase"></purchase-tax-land>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import selfOperatedTaxLand from "./selfOperatedTaxLand/selfOperatedTaxLand.vue";
import purchaseTaxLand from "./purchaseTaxLand/purchaseTaxLand.vue";
const route = useRoute();
const activeName = ref("selfOperated");
const tabsList = reactive([
  {
    name: "selfOperated",
    label: "自营税地",
  },
  {
    name: "purchase",
    label: "采购税地",
  },
]);
const selfOperated = ref();
const purchase = ref();
const handleTabChange = () => {
  if (route.query.activeName) {
    if (route.query.activeName === "selfOperated") {
      activeName.value = "selfOperated";
    } else if (route.query.activeName === "purchase") {
      activeName.value = "purchase";
    }
  }

  if (activeName.value === "selfOperated") {
    selfOperated.value.getTableData();
  } else if (activeName.value === "purchase") {
    purchase.value.getTableData();
  }
};
onMounted(() => {
  handleTabChange();
});
</script>
