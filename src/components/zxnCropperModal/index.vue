<template>
  <el-dialog :on="$attrs" class="zxn-dialog" width="600px">
    {{ coordinate }}
    <cropper-canvas background style="width: 100%; height: 600px">
      <cropper-image :src="props.fileUrl"></cropper-image>
      <cropper-handle action="move" plain></cropper-handle>
      <cropper-shade
        :width="coordinate.width"
        :height="coordinate.height"
        :x="coordinate.x"
        :y="coordinate.y"
      ></cropper-shade>
      <cropper-selection
        :width="coordinate.width"
        :height="coordinate.height"
        :x="coordinate.x"
        :y="coordinate.y"
      >
        <cropper-handle action="move" plain></cropper-handle>
      </cropper-selection>
    </cropper-canvas>
    <template #footer>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        确定
      </el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Cropper from "cropperjs";
import "cropperjs";
import { uploadFileApi } from "@/api/file";

const props = defineProps<{
  fileUrl: string;
  cropperWidth: number;
  cropperHeight: number;
}>();
const emits = defineEmits(["on-success"]);
watch(
  () => props.fileUrl,
  () => {
    nextTick(initImage);
  }
);
const coordinate = computed(() => {
  const width = props.cropperWidth;
  const height = props.cropperHeight;
  if (width > height) {
    const aspectRatio = height / width;
    return {
      width: 400,
      height: 400 * aspectRatio,
      y: (600 - 400 * aspectRatio) / 2,
      x: 100,
    };
  } else {
    const aspectRatio = width / height;
    return {
      width: 400 * aspectRatio,
      height: 400,
      x: (600 - 400 * aspectRatio) / 2,
      y: 100,
    };
  }
});
const loading = ref<boolean>(false);
let cropper = null;
let selection = null;
const initImage = () => {
  const image = new Image();
  image.src = props.fileUrl;
  cropper = new Cropper(image);
  selection = cropper.getCropperSelection();
};
const handleSubmit = () => {
  selection
    .$toCanvas({
      width: coordinate.width,
      height: coordinate.height,
    })
    .then((res) => {
      res.toBlob(async (blob) => {
        loading.value = true;
        const file = new File([blob], `logo.png`);
        const { data } = await uploadFileApi(file);
        loading.value = false;
        emits("on-success", data.src);
      }, "image/png");
    });
};
const handleCancel = () => {};
</script>
