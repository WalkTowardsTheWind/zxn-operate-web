<template>
  <div class="zxn-money-input">
    <el-input
      :class="{ 'display-none': focus }"
      :model-value="showValue"
      :placeholder="placeholder"
      @focus="handleFocus"
    />
    <el-input
      ref="moneyInput"
      :class="{ 'display-none': !focus }"
      v-bind="$attrs"
      :model-value="modelValue"
      :placeholder="placeholder"
      @blur="handleBlur"
      v-inputFloat
    />
  </div>
</template>
<script setup lang="ts">
import { currencyFormat } from "@/utils";
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  placeholder: { type: String, default: "" },
});
const showValue = computed(() => {
  return currencyFormat(props.modelValue);
});
const emits = defineEmits(["blur"]);
const focus = ref(false);
const moneyInput = ref();
const handleFocus = () => {
  focus.value = true;
  moneyInput.value.focus();
};
const handleBlur = () => {
  focus.value = false;
  // eslint-disable-next-line no-undef
  emits("blur", arguments);
};
</script>
<style lang="scss" scoped>
.zxn-money-input {
  width: 100%;
}
</style>
