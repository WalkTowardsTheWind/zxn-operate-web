<template>
  <div class="zxn-bottom-btn">
    <div
      ref="affixBox"
      class="zxn-bottom-btn-affix"
      :style="{ width: affixWidth + 'px' }"
    >
      <el-affix position="bottom" :style="{ right: `${right}px` }">
        <slot />
      </el-affix>
    </div>
    <div
      ref="affixFill"
      class="zxn-bottom-btn-fill"
      :style="{ height: `${fillHeight}px` }"
    ></div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  offset: { type: [Number, String], default: 50 },
  right: { type: Number, default: 36 },
});
const style_bottom = props.offset + "px";
const style_right = props.right + "px";
let fillHeight = ref(0);
let affixWidth = ref(0);
const affixBox = ref();
const affixFill = ref<HTMLDivElement>();
onMounted(() => {
  fillHeight.value = affixBox.value.clientHeight
    ? affixBox.value.clientHeight + 16
    : 0;
  affixWidth.value = affixFill.value.clientWidth;
});
</script>
<style lang="scss" scoped>
.zxn-bottom-btn {
  &-affix {
    position: fixed;
    right: v-bind(style_right);
    bottom: v-bind(style_bottom);
    display: flex;
    justify-content: center;
    width: 100%;
  }

  :deep(.el-affix) {
    .el-affix--fixed {
      //right: v-bind(styleright);
    }
  }
}
</style>
