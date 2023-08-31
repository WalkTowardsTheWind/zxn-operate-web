<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabs-list="tabsList" hasBack>
      <template #1>
        <BasicInfo :isEdit="isEdit" :id="id" />
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import BasicInfo from "./components/basic-info.vue";

import { useRoute } from "vue-router";

const tabsList = [{ name: 1, label: "基本信息" }];

const route = useRoute();
const isEdit = ref(false);
const id = ref();

if (route.query.status === "edit") {
  isEdit.value = true;
}
if (route.query.id) {
  id.value = route.query.id;
}

const activeName = ref(1);

// const handleClick = (tab: TabsPaneContext, event: Event) => {
// 	console.log(tab, event);
// };
</script>
