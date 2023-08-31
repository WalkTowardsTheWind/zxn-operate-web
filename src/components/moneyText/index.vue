<template>
  <div class="money-text" :class="{ slipLine }">
    <span :style="{ fontSize: `${markSize}px`, color: markColor }">{{
      mark
    }}</span>
    <span
      :style="{
        fontSize: `${moneySize}px`,
        color: moneyColor,
        fontWeight: bold,
      }"
    >
      {{ proxy.$moneyFormat(modelValue) }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  mark: {
    type: String,
    default: "¥",
  },
  markSize: {
    type: [String, Number],
    default: 12,
  },
  markColor: {
    type: String,
    default: "#333",
  },
  moneySize: {
    type: [String, Number],
    default: 14,
  },
  moneyColor: {
    type: String,
    default: "#333",
  },
  bold: {
    type: String,
    default: "400",
  },
  slipLine: Boolean,
});
const { proxy } = getCurrentInstance() as any;
</script>
<style lang="scss" scoped>
.money-text {
  display: inline-block;
  font-family: DINAlternate-Bold, DINAlternate, sans-serif;
}

.slipLine {
  color: #d0d0d0;
  text-decoration: line-through;
}
</style>
