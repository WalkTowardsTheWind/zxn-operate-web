<template>
  <div class="" :class="`zxn-plan ${hasBottom ? 'has-bottom' : ''}`">
    <div class="zxn-plan-content">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  hasBottom: { type: Boolean, default: false },
});
</script>
<style scoped lang="scss">
.zxn-plan {
  box-sizing: border-box;
  padding: 16px 24px 0;

  &.has-bottom {
    padding-bottom: 27px;

    .zxn-plan-content {
      min-height: calc(100vh - 131px);
    }
  }

  &-content {
    min-height: calc(100vh - 104px);
    background: #fff;
    border-radius: 8px;
  }
}
</style>
<script setup lang="ts"></script>
