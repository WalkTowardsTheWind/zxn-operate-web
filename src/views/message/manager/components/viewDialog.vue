<template>
  <el-dialog
    v-model="visible"
    @close="handleClose"
    class="zxn-dialog"
    :title="title"
    width="452"
  >
    <el-form
      ref="form"
      :model="formItem"
      label-width="70"
      label-position="left"
      class="pr-40px"
    >
      <el-form-item label="" label-width="0">{{
        formItem.content
      }}</el-form-item>
      <el-form-item label="通知时间">{{ formItem.add_time }}</el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="visible = false"> 确定 </el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { notifyView } from "@/api/message";
let visible = ref(false);
const title = ref("");
const formItem = reactive({
  title: "",
  content: "",
  add_time: "",
});
const init = async (id: number) => {
  const { data } = await notifyView(id);
  title.value = data.title;
  formItem.content = data.content;
  formItem.add_time = data.add_time;
  visible.value = true;
};
const handleClose = () => {};
onMounted(() => {});
defineExpose({
  init,
});
</script>
