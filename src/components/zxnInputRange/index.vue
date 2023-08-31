<template>
  <div class="zxn-input-range">
    <zxn-money-input
      v-if="type === 'money'"
      v-model="preValue"
      :placeholder="prePlaceholder"
      @blur="handlePreInput"
    />
    <el-input
      v-else
      v-model="preValue"
      v-inputFloat
      :placeholder="prePlaceholder"
      @blur="handlePreInput"
    />
    <div class="zxn-input-range-gap">-</div>
    <zxn-money-input
      v-if="type === 'money'"
      v-model="sufValue"
      :placeholder="sufPlaceholder"
      @blur="handleSufInput"
    />
    <el-input
      v-else
      v-model="sufValue"
      v-inputFloat
      :placeholder="sufPlaceholder"
      @blur="handleSufInput"
    />
  </div>
</template>
<script setup lang="ts">
import { isNumber } from "@/utils/is";

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  prePlaceholder: { type: String, default: "请输入" },
  sufPlaceholder: { type: String, default: "请输入" },
  type: { type: String, default: "" },
});
const emits = defineEmits(["update:modelValue"]);
const preValue = ref("");
const sufValue = ref("");
watch(
  () => props.modelValue,
  () => {
    const [pre, suf] = props.modelValue;
    preValue.value = isNumber(pre) ? pre : pre || "";
    sufValue.value = isNumber(suf) ? suf : suf || "";
  },
  { deep: true, immediate: true }
);
const handlePreInput = () => {
  emitValue("pre");
};
const handleSufInput = () => {
  emitValue("suf");
};
const emitValue = (type: string) => {
  if (
    preValue.value &&
    sufValue.value &&
    preValue.value * 1 > sufValue.value * 1
  ) {
    ElMessage({
      type: "error",
      message: "最大值不能小于最小值",
    });
    const value = type === "pre" ? ["", sufValue.value] : [preValue.value, ""];
    emits("update:modelValue", value);
    return;
  }
  const value = [preValue.value, sufValue.value];
  emits("update:modelValue", value);
};
</script>
<style lang="scss" scoped>
.zxn-input-range {
  display: flex;
  width: 100%;

  &-gap {
    flex: none;
    width: 16px;
    text-align: center;
  }
}
</style>
