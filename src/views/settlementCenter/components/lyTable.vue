<template>
  <div class="integration-table">
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelect"
      @sort-change="handleSort"
      class="zxn-table"
    >
      <el-table-column v-if="hasSelect" type="selection" />
      <el-table-column v-if="hasIndex" type="index" label="序号" width="65" />
      <template v-for="(item, index) in columnList" :key="index">
        <el-table-column v-if="(item as any).slot" v-bind="item">
          <template #default="scope">
            <slot :name="(item as any).slot" v-bind="scope" />
          </template>
        </el-table-column>
        <el-table-column v-else-if="(item as any).type" v-bind="item">
          <template #default="{ row }">
            <div
              v-if="(item as any).type === 'enum'"
              v-text="proxy.$enumSet[(item as any).path][row[(item as any).prop]]"
              :class="`zxn-table-label ${item.color[[row[item.prop]]]}`"
            />
          </template>
        </el-table-column>
        <el-table-column v-else v-bind="item" />
      </template>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import type { SortParams } from "./tableType";
const { proxy } = getCurrentInstance() as any;
const props = defineProps({
  hasSelect: { type: Boolean as PropType<boolean>, default: false },
  hasIndex: { type: Boolean as PropType<boolean>, default: true },
  tableData: { type: Array, default: () => [] },
  columnList: { type: Array, default: () => [] },
  hasPagination: { type: Boolean, default: true },
  pageInfo: { type: Object, default: () => ({}) },
});
const emit = defineEmits(["sort-change", "selection-change", "page-change"]);
const handleSort = ({ column, prop, order }: SortParams<any>) => {
  emit("sort-change", { column, prop, order });
};
let selectedNumber = ref(0);
const handleSelect = (value: any) => {
  selectedNumber.value = value.length;
  emit("selection-change", value);
};
let _total = ref(0);
let _page = ref(1);
watchEffect(() => {
  const { total, page } = props.pageInfo;
  // console.log(total, '2222')
  _total.value = total;
  _page.value = page;
});
const handlePageChange = (current: { page: number; limit: number }) => {
  emit("page-change", current);
};
</script>
<style lang="scss" scoped>
.integration-table {
  &-top {
    margin-bottom: 16px;
  }
}
</style>
