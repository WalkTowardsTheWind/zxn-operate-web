<template>
  <div class="">
    <zxn-plan>
      <zxn-tabs :tabs-list="tabsList" v-model:activeName="activeName">
      </zxn-tabs>
      <AddPersonal v-if="activeName == 0" />
      <AddBusiness v-if="activeName == 1" />
      <AddExist v-if="activeName == 2" />
    </zxn-plan>
  </div>
</template>

<script lang="ts" setup>
import AddPersonal from "./components/add-personal.vue";
import AddBusiness from "./components/add-business.vue";
import AddExist from "./components/add-exist.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const activeName = ref(0);

const tabsList = [
  { name: 0, label: "新建个人渠道" },
  { name: 1, label: "新建企业渠道" },
  { name: 2, label: "新建已有账号" },
];

// const addType = ref()

if (route.query.type) {
  // addType.value = route.query.type
  activeName.value = Number(route.query.type);
}
</script>

<style lang="scss">
.product {
  width: 400px;

  .head {
    display: flex;
    gap: 0 90px;
    justify-content: center;
    padding: 20px 0;
    background: #f7fbff;
  }

  .form {
    position: relative;
    display: flex;
    gap: 0 10px;
    align-items: center;

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

  .del {
    position: absolute;
    right: -50px;
  }
}
</style>
