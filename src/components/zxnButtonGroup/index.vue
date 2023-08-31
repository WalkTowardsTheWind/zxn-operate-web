<template>
  <div class="zxn-button-group">
    <div
      v-if="hasAll"
      class="zxn-button-group-item"
      :class="{ active: modelValue === '' }"
      @click="handleClick('')"
    >
      全部
    </div>
    <div
      v-for="item in options"
      :key="item.label"
      class="zxn-button-group-item"
      :class="{ active: modelValue === item.value }"
      @click="handleClick(item.value)"
    >
      {{ item.label }}{{ isNullOrUnDef(item.number) ? "" : `(${item.number})` }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { isNullOrUnDef } from "@/utils/is";
defineProps({
  options: { type: Array, default: () => [] },
  modelValue: { type: [String, Number], default: "" },
  hasAll: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue", "on-change"]);
const handleClick = (value: string | number): void => {
  emit("update:modelValue", value);
  emit("on-change", value);
};
</script>
<style lang="scss" scoped>
.zxn-button-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  width: 100%;

  &-item {
    text-align: center;
    cursor: pointer;
    border: 1px solid #e7e7e7;
    border-radius: 4px;

    &:hover {
      border-color: #497cf5;
    }

    &.active {
      color: #497cf5;
      border-color: #497cf5;
    }
  }
}
</style>
