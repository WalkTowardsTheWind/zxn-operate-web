<template>
  <el-dialog
    v-model="visible"
    class="zxn-dialog"
    title="上传发票"
    width="452"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <el-form ref="form" :model="formItem" label-width="110" :rules="rules">
      <el-form-item label="选择物流" prop="express_id">
        <el-select
          v-model="formItem.express_id"
          class="w-100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in logisticsCompany"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="输入物流单号" prop="express_no">
        <el-input v-model="formItem.express_no" />
      </el-form-item>
      <el-form-item label="票样" prop="invoice_sample_url">
        <multi-upload v-model="formItem.invoice_sample_url" :limit="1" />
      </el-form-item>
      <el-form-item label="物流面单" prop="express_url">
        <multi-upload v-model="formItem.express_url" :limit="1" />
      </el-form-item>
      <el-form-item label="">
        <div>
          <el-button type="primary" @click="handleSubmit" :loading="loading"
            >确定</el-button
          >
          <el-button @click="handleCancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: "addInvoice",
};
</script>
<script setup lang="ts">
import MultiUpload from "@/components/Upload/MultiUpload.vue";
import { getLogisticsCompany, uploadInvoice } from "@/api/invoice";
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";
const emits = defineEmits(["on-success"]);
let visible = ref(false);
const imgValidate = (message: any, rule: any, value: any, callback: any) => {
  if (value && value.length) {
    callback();
  } else {
    callback(message);
  }
};
const rules = reactive<FormRules>({
  express_id: [
    { required: true, message: "请选择物流公司", trigger: "change" },
  ],
  express_no: [
    { required: true, message: "请输入物流单号", trigger: "change" },
  ],
  invoice_sample_url: [
    { validator: imgValidate.bind(null, "请上传票样"), trigger: "change" },
  ],
  express_url: [
    { validator: imgValidate.bind(null, "请上传物流面单"), trigger: "change" },
  ],
});
const formItem = reactive({
  id: 0,
  express_id: "",
  express_no: "",
  invoice_sample_url: [],
  express_url: [],
});
const init = (id: number): void => {
  formItem.id = id;
  visible.value = true;
};
const logisticsCompany = reactive([]);
const getLogisticsCompanyList = async () => {
  const { data } = await getLogisticsCompany();
  logisticsCompany.length = 0;
  logisticsCompany.push(...data);
};
const form = ref(ElForm);
const loading = ref(false);
const handleSubmit = () => {
  form.value.validate(async (valid: boolean): void => {
    if (valid) {
      const params: any = {};
      console.log(form.invoice_sample_url);
      params.express_id = formItem.express_id;
      params.express_no = formItem.express_no;
      params.invoice_sample_url = formItem.invoice_sample_url.join(",");
      params.express_url = formItem.express_url.join(",");
      try {
        await uploadInvoice(formItem.id, params);
        loading.value = false;
        ElMessage({
          type: "success",
          message: `上传成功`,
        });
        emits("on-success");
        handleCancel();
      } catch (e) {
        loading.value = false;
      }
    }
  });
};
const handleCancel = () => {
  visible.value = false;
};
const handleClose = () => {
  form.value.resetFields();
};
onMounted(() => {
  getLogisticsCompanyList();
});
defineExpose({
  init,
});
</script>
