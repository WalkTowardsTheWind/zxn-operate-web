<template>
  <el-tree-select
    class="w-full"
    v-model="selectVal"
    :data="options"
    :props="treeProps"
    check-strictly
    :render-after-expand="false"
  />
</template>

<script lang="ts" setup>
defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});
const treeProps = {
  label: "name",
  value: "id",
};
const selectVal = ref("");
</script>

<style scoped></style>
