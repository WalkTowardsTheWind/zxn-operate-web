<template>
  <el-tabs v-model="activeValue" class="zxn-tabs" @tab-click="handleClick">
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import type { TabsPaneContext } from "element-plus";
type tabsListType = {
  label: string;
  name: string;
}[];
const props = defineProps({
  activeName: { type: String, default: "" },
  tabsList: { type: Array as PropType<tabsListType>, default: () => [] },
});
const emit = defineEmits(["update:activeName"]);
const activeValue = computed(() => props.activeName);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  emit("update:activeName", tab.props.name);
};
</script>
<style scoped lang="scss">
.zxn-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 0;

    .el-tabs__nav-wrap {
      &::after {
        height: 1px;
        background-color: #f5f5f5;
      }
    }

    .el-tabs__active-bar {
      height: 4px;
      background-color: $baseColor;
      border-radius: 2px;
    }

    .el-tabs__nav {
      padding-left: 0;
    }

    .el-tabs__item {
      height: 63px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 63px;
      color: #474747;

      &.is-active {
        color: $baseColor;
      }
    }
  }
}
</style>
