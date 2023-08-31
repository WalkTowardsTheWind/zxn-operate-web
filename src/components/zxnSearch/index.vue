<template>
  <div ref="zxnSearch" class="zxn-search">
    <el-form
      ref="form"
      inline
      label-position="right"
      :label-width="labelWidth"
      :model="formItem"
      class="zxn-search-content"
    >
      <slot />
      <div ref="searchBtn" class="zxn-search-btn">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button type="info" @click="handleReset">重置</el-button>
        <slot name="rightBtn" />
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { TabsContextKey } from "@/components/constants";
const tabsContext = inject(TabsContextKey, undefined);
defineProps({
  formItem: { type: Object, default: () => ({}) },
  labelWidth: { type: [String, Number], default: 90 },
});
const emit = defineEmits(["on-search", "on-reset"]);
const handleSearch = () => {
  emit("on-search");
};
const form = ref(ElForm);
const handleReset = () => {
  form.value.resetFields();
  emit("on-reset");
};
const searchBtn = ref(HTMLElement);
let item_width = ref("");
const resetWidth = () => {
  nextTick(() => {
    item_width.value = `calc((100% - ${Math.ceil(
      searchBtn.value.clientWidth * window.devicePixelRatio
    )}px) / 3)`;
  });
};
const zxnSearch = ref<HTMLDivElement>();
const context = reactive({
  $el: zxnSearch,
  resetWidth,
});
onMounted(() => {
  resetWidth();
  tabsContext?.addSearch(context);
});
defineExpose({
  resetWidth,
});
</script>
<style scoped lang="scss">
.zxn-search {
  &-content {
    display: flex;
    flex-wrap: wrap;

    :deep(.zxn-date-range) {
      width: 100%;
    }

    :deep(.el-form-item) {
      width: v-bind(item_width);
      margin-right: 0;
      margin-bottom: 16px;
      //display: inline-flex;
      //vertical-align: middle;

      .el-form-item__label {
        font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #656565;
      }

      .el-form-item__content {
        .el-select,
        .el-input,
        .el-cascader {
          width: 100%;
        }
      }
    }
  }

  &-btn {
    padding-bottom: 16px;
    padding-left: 16px;
  }
}
</style>
