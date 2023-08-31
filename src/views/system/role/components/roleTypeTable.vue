<template>
  <div class="role-table">
    <div class="role-table-header">
      <span class="role-table-header-title">{{ floor }}级分类</span>
      <el-checkbox :disabled="!list.length" v-model="selected" />
    </div>
    <div
      v-for="(item, index) in list"
      :key="item.id"
      class="role-table-item"
      :class="{
        'cursor-pointer': item.children && item.children.length,
        active: index === activeId,
      }"
      @click="handleClick(index, item)"
    >
      <div class="role-table-item-right">
        <el-checkbox
          v-if="item.children && item.children.length"
          v-model="item.selected"
          @click="stopDefault($event)"
          @change="handleChange(index)"
        />
        <span class="role-table-item-text ml-10px">{{ item.label }}</span>
      </div>
      <span>
        <el-icon
          v-if="item.children && item.children.length"
          :color="index === activeId ? '#356FF3' : '#333333'"
          ><i-ep-ArrowRightBold
        /></el-icon>
        <el-checkbox
          v-else
          v-model="item.selected"
          @change="handleChange(index)"
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  floor: { type: String, default: "一" },
  list: { type: Array, default: () => [] },
});
const emits = defineEmits(["on-choose", "select-change", "on-change"]);
const selected = computed({
  get: () => {
    return props.list.length && isAllSelected(props.list);
  },
  set: (val) => {
    emits("select-change", val);
  },
});
const isAllSelected = (list) => {
  return list.reduce((acc, cur) => {
    if (cur.children && cur.children.length) {
      return acc && cur.selected && isAllSelected(cur.children);
    } else {
      return acc && cur.selected;
    }
  }, true);
};
const activeId = ref(null);
const handleClick = (rank, item) => {
  if (item.children && item.children.length) {
    activeId.value = rank;
    emits("on-choose", rank);
  }
};
const handleChange = (rank) => {
  emits("on-change", rank);
};
const init = () => {
  activeId.value = null;
};
const stopDefault = (e) => {
  e.stopPropagation();
};
defineExpose({
  init,
});
</script>
<style lang="scss" scoped>
.role-table {
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    background-color: #eff4fe;

    &-title {
      font-size: 14px;
      color: #656565;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid #f5f5f5;

    &.active {
      .role-table-item-text {
        color: #356ff3;
      }
    }

    &-text {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    &-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
