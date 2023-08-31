<!--
  多图上传组件
  @author: youlaitech
  @date 2022/11/20
-->

<template>
  <div class="images">
    <div class="image" v-for="(item, index) in imageList" :key="index">
      <el-image
        style="width: 100px; height: 100px"
        :src="item"
        :zoom-rate="1.2"
        :preview-src-list="[item as string]"
        :initial-index="0"
        fit="cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  /**
   * 文件路径集合
   */
  imageList: {
    type: Array<string>,
    default: [] as Array<string>,
  },
});
</script>
<style lang="scss" scoped>
.images {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  gap: 8px;

  .image {
    height: 88px;

    :deep(.el-image) {
      width: 88px !important;
      height: 88px !important;
      border-radius: 6px;

      :deep(.el-image__inner) {
        width: 88px;
        height: 88px;
        border-radius: 6px;
      }
    }
  }
}
</style>
