<template>
  <div class="zxn-title">
    <div class="zxn-title-content">
      <slot />
    </div>
    <slot name="right" />
  </div>
</template>
<style lang="scss" scoped>
.zxn-title {
  position: relative;
  display: flex;
  padding-left: 12px;

  &::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 4px;
    height: 16px;
    content: "";
    background: #366ff3;
    border-radius: 2px;
    transform: translateY(-50%);
  }

  &-content {
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #356ff3;
  }
}
</style>
<script setup lang="ts"></script>
