<template>
  <div class="zxn-tag-select">
    <div class="zxn-tag-select-item" v-for="item in modelValue" :key="item.id">
      <span>{{ item.label }}</span>
      <el-icon size="12" color="#fff">
        <i-ep-CircleCloseFilled />
      </el-icon>
    </div>
    <div class="zxn-tag-select-add">添加+</div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  modelValue: { type: Array, required: true, default: () => [] },
});
</script>
<style lang="scss" scoped>
.zxn-tag-select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  &-item,
  &-add {
    height: 20px;
    padding: 2px 8px;
    margin-right: 8px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    background: green;
    border-radius: 2px;
  }

  &-add {
    cursor: pointer;
    background: dodgerblue;
  }
}
</style>
