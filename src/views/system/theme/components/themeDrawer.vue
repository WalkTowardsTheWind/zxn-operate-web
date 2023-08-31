<template>
  <el-drawer
    v-bind="$attrs"
    :title="id ? '添加配置' : '编辑配置'"
    :size="500"
    class="zxn-drawer"
  >
    <el-form ref="form" :model="formItem" label-width="90" :rules="rules">
      <el-form-item label="域名" prop="express_id">
        <el-input v-model="formItem.express_no" />
      </el-form-item>
      <el-form-item label="版权备案" prop="express_no">
        <el-input v-model="formItem.express_no" />
      </el-form-item>
      <el-form-item label="logo" prop="logo">
        <zxn-cropper-upload
          key="logo"
          v-model="formItem.logo"
          :width="204"
          :height="56"
        />
      </el-form-item>
      <el-form-item label="mini-logo" prop="miniLogo">
        <zxn-cropper-upload key="miniLogo" v-model="formItem.miniLogo" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="flex justify-start">
        <el-button type="primary">确定</el-button>
        <el-button>取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { FormRules } from "element-plus";
const props = defineProps({
  id: {
    type: Number,
  },
});

const rules = reactive<FormRules>({
  express_id: [
    { required: true, message: "请选择物流公司", trigger: "change" },
  ],
  express_no: [
    { required: true, message: "请输入物流单号", trigger: "change" },
  ],
  logo: [{ required: true, message: "请上传logo", trigger: "change" }],
  miniLogo: [{ required: true, message: "请上传logo", trigger: "change" }],
});
const formItem = reactive({
  logo: "",
  miniLogo: "",
});
</script>
