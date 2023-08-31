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
            :model="formItem"
            label-width="100px"
            ref="FormRef"
            :rules="Rules"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item label="合同名称">
                  <span class="mx-1">{{ contractName }}</span>
                </el-form-item>
                <el-form-item class="mt-25px" label="编号">
                  <span class="mx-1">{{ formItem.contract_no }}</span>
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
                    value-format="YYYY-MM-DD"
                    type="date"
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
                <el-form-item class="mt-25px" label="备注要求">
                  <el-input
                    placeholder="请输入"
                    v-model="formItem.remarks"
                    type="textarea"
                  />
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="合同文件" prop="file_url">
                  <multi-upload v-model="formItem.file_url"></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="附件">
                  <multi-upload v-model="formItem.annex_url"></multi-upload>
                </el-form-item>
              </div>
              <!-- 表格 -->
              <!-- <div class="w-[33%] box">
                <el-row>
                  <el-col class="top" :span="5">产品列表</el-col>
                  <el-col :span="5"> <div class="bg tac">产品</div></el-col>
                  <el-col class="bg tac" :span="8">票面种类及税点</el-col>
                  <el-col class="bg tac" :span="6">合作价格</el-col>
                </el-row>
                <el-row v-for="(item, index) in formItem.product" :key="index">
                  <el-col class="tac" :offset="5" :span="5">
                    <el-select v-model="item.product_type" placeholder="请选择">
                      <el-option
                        v-for="item in productOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col class="tac" :span="8">
                    <el-select v-model="item.invoice_type" placeholder="请选择">
                      <el-option
                        v-for="item in productOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col class="tac" :span="6">
                    <el-input
                      v-model="item.cooperate_pointnt"
                      placeholder="请输入"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :offset="5"
                    ><el-button link type="primary" @click="handleAdd"
                      >+ 添加产品</el-button
                    ></el-col
                  >
                </el-row>
              </div> -->
            </div>
          </el-form>
        </div>
        <zxn-bottom-btn>
          <div class="but">
            <el-button type="primary" @click="handleChannelContractEdit"
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
// import Form from "../components/Form.vue";
import { useRoute, useRouter } from "vue-router";
import { channelContractEdit } from "@/api/contractCenter/channelContract";
import { getContractDetails } from "@/api/contractCenter";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance() as any;
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
  file_url: [{ required: true, message: "请输入", trigger: "blur" }],
};
const formItem = ref({
  contract_name: "",
  contract_no: "",
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
  // product: [{ product_type: null, invoice_type: null, cooperate_pointnt: "" }],
});
// 计算属性
var contractName = computed(() => {
  var contractkind =
    proxy.$enumSet["contractCenterEnum.contractType"][
      formItem.value.contract_kind
    ];
  return (formItem.value.party_a || "") + (contractkind || "");
}) as any;

// const handleAdd = () => {
//   formItem.value.product.push({
//     product_type: null,
//     invoice_type: null,
//     cooperate_pointnt: "",
//   });
// };
const handleChannelContractEdit = () => {
  FormRef.value.validate((valid: boolean) => {
    if (valid) {
      const ID = Number(route.query.id);
      const params = {
        ...formItem.value,
        contract_name: contractName.value,
      } as any;
      params.file_url = JSON.stringify(params.file_url);
      params.annex_url = JSON.stringify(params.annex_url);
      // params.product = JSON.stringify(params.product);

      channelContractEdit(ID, params)
        .then(() => {
          ElMessage({
            type: "success",
            message: `编辑成功`,
          });
          router.push({
            name: "contractCenter",
            query: { activeName: "channel" },
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
  router.push({ name: "contractCenter", query: { activeName: "channel" } });
};
const getData = () => {
  const ID = Number(route.query.id);
  getContractDetails(ID)
    .then((response) => {
      var {
        contract_name,
        contract_no,
        contract_kind,
        party_a,
        party_b,
        tax_location,
        contract_term,
        sign_time,
        end_time,
        remarks,
        file_url,
        annex_url,
      } = response.data.info;

      // const product = response.data.product.map((item) => {
      //   return {
      //     product_type: item.product_type,
      //     invoice_type: item.invoice_type,
      //     cooperate_pointnt: item.cooperate_pointnt,
      //   };
      // });

      formItem.value = {
        contract_name,
        contract_no,
        online_type: 1,
        contract_kind: contract_kind + "",
        party_a,
        party_b,
        tax_location,
        contract_term: contract_term + "",
        sign_time,
        end_time,
        remarks,
        file_url,
        annex_url,
        // product,
      };
    })
    .catch();
};
getData();
onMounted(() => {});
</script>
<style lang="scss" scoped>
.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }

    //  flex-grow: 1
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}

.box {
  .top {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0 12px 0 0;
    font-size: 14px;
    line-height: 32px;
    color: rgb(96 98 102);
  }

  .bg {
    background-color: #eff4fe;
  }

  .tac {
    display: flex;
    align-items: center;
    height: 50px;
  }
}
</style>
