<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            ref="FormRef"
            :model="formItem"
            :rules="Rules"
            label-width="100px"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="合同名称">
                  <span class="mx-1">{{ contractName }}</span>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="合同类型"
                  prop="contract_kind"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.contract_kind"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'contractCenterEnum.contractType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="甲方" prop="party_a">
                  <el-input placeholder="请输入" v-model="formItem.party_a" />
                </el-form-item>
                <el-form-item class="mt-25px" label="乙方" prop="party_b">
                  <el-input placeholder="请输入" v-model="formItem.party_b" />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="签约点位"
                  prop="tax_location"
                >
                  <el-input
                    placeholder="请输入"
                    v-model="formItem.tax_location"
                  >
                    <template #append>%</template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="合同期限"
                  prop="contract_term"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.contract_term"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'contractCenterEnum.contractTerm'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="签约时间" prop="sign_time">
                  <el-date-picker
                    v-model="formItem.sign_time"
                    type="date"
                    value-format="YYYY-MM-DD"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="到期时间" prop="end_time">
                  <el-date-picker
                    v-model="formItem.end_time"
                    value-format="YYYY-MM-DD"
                    type="date"
                    unlink-panels
                    placeholder="请选择"
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="备注要求" prop="remarks">
                  <el-input
                    placeholder="请输入"
                    v-model="formItem.remarks"
                    type="textarea"
                  />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同文件" prop="file_url">
                  <multi-upload
                    v-model:modelValue="formItem.file_url"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件" prop="annex_url">
                  <multi-upload
                    v-model:modelValue="formItem.annex_url"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleEnterpriseContractAdd"
              >确 定</el-button
            >
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">无内容</div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </zxn-bottom-btn>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { enterpriseContractAdd } from "@/api/contractCenter/enterpriseContract";
import { ElMessage } from "element-plus";
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const activeName = ref("1");

const tabsList = [
  {
    name: "1",
    label: "线下合同",
  },
];

//表单信息
const FormRef = ref(ElForm);
const validateTax_location = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入点位"));
  } else if (!/^([0-9]\d{0,1}|100$)(\.\d{1,2})?$/.test(value)) {
    callback(new Error("请输入正确格式"));
  } else {
    callback();
  }
};
const Rules = {
  online_type: [{ required: true, message: "请输入", trigger: "blur" }],
  contract_kind: [{ required: true, message: "请输入", trigger: "blur" }],
  party_a: [{ required: true, message: "请输入", trigger: "blur" }],
  party_b: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_location: [
    { required: true, validator: validateTax_location, trigger: "blur" },
  ],
  contract_term: [{ required: true, message: "请输入", trigger: "blur" }],
  sign_time: [{ required: true, message: "请输入", trigger: "blur" }],
  end_time: [{ required: true, message: "请输入", trigger: "blur" }],
  remarks: [{ required: true, message: "请输入", trigger: "blur" }],
  file_url: [{ required: true, message: "请上传图片", trigger: "blur" }],
  annex_url: [{ required: true, message: "请上传图片", trigger: "blur" }],
};
const formItem = reactive({
  online_type: 1,
  contract_kind: "",
  party_a: "",
  party_b: "",
  tax_location: "",
  contract_term: "",
  sign_time: "",
  end_time: "",
  remarks: "",
  file_url: [],
  annex_url: [],
});
// 计算属性

var contractName = computed(() => {
  var contractkind =
    proxy.$enumSet["contractCenterEnum.contractType"][formItem.contract_kind];
  return (formItem.party_a || "") + (contractkind || "");
}) as any;

const handleEnterpriseContractAdd = () => {
  FormRef.value.validate((valid: boolean) => {
    if (valid) {
      const params = { ...formItem, contract_name: contractName.value } as any;
      params.file_url = JSON.stringify(params.file_url);
      params.annex_url = JSON.stringify(params.annex_url);
      enterpriseContractAdd(params)
        .then(() => {
          ElMessage({
            type: "success",
            message: `新建成功`,
          });
          router.push({
            name: "contractCenter",
            query: { activeName: "enterprise" },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
};
const handleSubmit = () => {};
const handleClose = () => {
  router.push({
    name: "contractCenter",
    query: { activeName: "enterprise" },
  });
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
