<template>
  <div class="convenient-entry">
    <div class="convenient-entry-title">
      <span>便捷导航</span>
    </div>
    <div class="convenient-entry-content">
      <div
        class="convenient-entry-content-item"
        v-for="item in btnList"
        :key="item"
        @click="handleRouter(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const btnList = ref([
  { label: "新建企业", name: "business-account-add" },
  {
    label: "新建税地",
    name: "selfOperatedTaxLandAdd",
    query: { activeName: 1 },
  },
  // { name: '新建渠道', router: '' }
]);
const handleRouter = (item: any) => {
  router.push(item);
};
</script>
<style lang="scss" scoped>
.convenient-entry {
  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > span {
      &:first-child {
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }
    }

    &-add {
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 500;
      color: #356ff3;
      cursor: pointer;
    }
  }

  &-content {
    display: flex;
    flex-wrap: wrap;
    min-height: 120px;
    padding: 36px;
    margin-top: 16px;
    background: #fff;
    border-radius: 4px;

    &-item {
      box-sizing: border-box;
      width: 25%;
      padding-right: 8px;
      margin-top: 4px;
      overflow: hidden;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: #356ff3;
      }
    }
  }
}
</style>
<script setup lang="ts"></script>
