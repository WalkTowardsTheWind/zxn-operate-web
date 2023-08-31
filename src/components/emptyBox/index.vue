<template>
  <div class="empty-box">
    <img :src="empty" alt="" />
    <div>暂无数据</div>
  </div>
</template>
<script lang="ts" setup>
const empty = new URL(`@/assets/empty.png`, import.meta.url).href;
</script>
<style lang="scss" scoped>
.empty-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);

  > img {
    width: 82px;
    height: 82px;
  }

  > div {
    margin-top: 16px;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #999;
  }
}
</style>
