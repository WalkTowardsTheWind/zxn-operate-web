<template>
  <div
    class="zxn-cropper-upload"
    :style="uploadStyle"
    :class="{ 'un-select': !modelValue }"
    @click="handleUpload"
  >
    <zxn-image
      v-if="modelValue"
      hasDelete
      :imgList="[modelValue]"
      :width="width"
      :height="height"
      @on-delete="handleDelete"
    />
  </div>
  <input
    ref="cropperInput"
    class="zxn-cropper-input"
    type="file"
    accept="image/*"
    @change="handleUploadChange"
  />
  <zxn-cropper-modal
    v-model="visible"
    :title="'裁剪图片' + width"
    :fileUrl="imageUrl"
    :cropperWidth="width"
    :cropperHeight="height"
    :close-on-click-modal="false"
    @on-success="handleSuccess"
  />
</template>
<script setup lang="ts">
import { addUnit } from "@/utils";
import type { CSSProperties } from "vue";

import { useFormItem } from "element-plus";

const props = defineProps({
  modelValue: { type: String, required: true },
  width: { type: [Number, String], default: 88 },
  height: { type: [Number, String], default: 88 },
  radius: { type: [Number, String], default: 4 },
});
const emits = defineEmits(["update:modelValue"]);
const uploadStyle = computed<CSSProperties>(() => {
  const boxWidth = addUnit(props.width);
  const boxHeight = addUnit(props.height);
  const boxRadius = addUnit(props.radius);
  return { width: boxWidth, height: boxHeight, borderRadius: boxRadius };
});
const cropperInput = ref();
const handleUpload = () => {
  if (props.modelValue) {
    return;
  }
  cropperInput.value.click();
};
const visible = ref<boolean>(false);
const imageUrl = ref<string | ArrayBuffer>("");
const handleUploadChange = (event: Event) => {
  const reader = new FileReader();
  const file = (event.target as HTMLInputElement).files![0];
  reader.readAsDataURL(file);
  reader.onload = () => {
    visible.value = true;
    imageUrl.value = reader.result as ArrayBuffer;
  };
};
const handleSuccess = (src) => {
  visible.value = false;
  emits("update:modelValue", src);
};
const handleDelete = (event: HTMLElement) => {
  emits("update:modelValue", "");
};
const { formItem } = useFormItem();
watch(
  () => props.modelValue,
  () => {
    formItem?.validate?.("change");
  }
);
</script>
<style lang="scss" scoped>
.zxn-cropper-upload {
  position: relative;
  background-color: #e5e5e5;
  &.un-select {
    cursor: pointer;
    &:after,
    &:before {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 2.5px;
      width: 40%;
      background-color: #333333;
      border-radius: 2px;
    }
    &:after {
      width: 2.5px;
      height: 40%;
      //transform: translate(-50%) rotate(90deg);
    }
  }
}
.zxn-cropper-input {
  display: none;
}
</style>
