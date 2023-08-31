<template>
  <div class="card">
    <div class="card-top">
      <slot name="top" />
    </div>
    <div class="card-main">
      <slot name="main" />
    </div>
    <div class="card-bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  width: 275px;
  height: 160px;
  background: #f5f5f5;
  border-radius: 4px 4px 4px 4px;
  padding: 26px 20px;

  &-top {
    font-size: 14px;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC;
    font-weight: 500;
    color: #333333;
    margin-bottom: 15px;
  }

  &-main {
    font-size: 32px;
    font-family: SourceHanSansSC-Bold, SourceHanSansSC;
    font-weight: bold;
    color: #356ff3;
  }
}
</style>
