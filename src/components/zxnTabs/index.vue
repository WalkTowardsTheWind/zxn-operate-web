<template>
  <div class="zxn-tabs">
    <el-tabs :model-value="activeValue as string" @tab-change="handleClick">
      <el-tab-pane
        v-for="item in tabsList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :disabled="item.disabled"
      >
        <slot :name="item.name"></slot>
        <component :is="item.subassembly"></component>
      </el-tab-pane>
    </el-tabs>
    <!--    <div class="zxn-tabs-back" v-if="hasUpdate" @click="handleClickRight">-->
    <!--&lt;!&ndash;      <el-icon size="14" color="#474747">&ndash;&gt;-->
    <!--&lt;!&ndash;                <i-ep-ArrowLeft v-if="hasBack" />&ndash;&gt;-->
    <!--&lt;!&ndash;        <i-ep-RefreshRight v-if="hasUpdate" />&ndash;&gt;-->
    <!--&lt;!&ndash;      </el-icon>&ndash;&gt;-->
    <!--&lt;!&ndash;      <span>{{ hasBack ? "返回上一级" : "更新" }}</span>&ndash;&gt;-->
    <!--    </div>-->
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import { TabsContextKey } from "@/components/constants";
type tabsListType = {
  label: string;
  name: string;
  subassembly?: any;
  disabled?: boolean;
}[];

const props = defineProps({
  activeName: { type: String, default: "" },
  tabsList: { type: Array as PropType<tabsListType>, default: () => [] },
  hasBack: { type: Boolean, default: false },
  hasUpdate: { type: Boolean, default: false },
});
const emit = defineEmits(["update:activeName", "tab-change"]);
const activeValue = computed(() => props.activeName);
const handleClick = (tab: string) => {
  emit("update:activeName", tab);
  emit("tab-change", tab);
  setTimeout(resizeSearch);
};
// const handleClickRight = () => {
//   if (props.hasBack) {
//     return router.go(-1);
//   }
//   const { fullPath } = route;
//   nextTick(() => {
//     router.replace({ path: "/redirect" + fullPath }).catch((err) => {
//       console.warn(err);
//     });
//   });
// };
const searchEl: any[] = [];
const addSearch = (searchBox: any) => {
  searchEl.push(searchBox);
};
const TableEl: any[] = [];
const addTable = (tableBox: any) => {
  TableEl.push(tableBox);
};
const resizeSearch = () => {
  searchEl.forEach((it) => {
    if (it.$el.clientWidth) {
      it.resetWidth();
    }
  });
  TableEl.forEach((it) => {
    if (it.$el.clientWidth) {
      it.resetHeight();
    }
  });
};
provide(
  TabsContextKey,
  reactive({
    addSearch,
    addTable,
  })
);
</script>
<style scoped lang="scss">
.zxn-tabs {
  position: relative;

  &-back {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex: none;
    align-items: center;
    height: 63px;
    padding-right: 24px;
    line-height: 63px;
    cursor: pointer;

    > span {
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #474747;
    }
  }

  :deep(.el-tabs) {
    .el-tabs__header {
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
        padding-left: 53px;
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

        &.is-disabled {
          display: none;
        }
      }
    }
  }
}
</style>
