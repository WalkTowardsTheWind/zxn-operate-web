<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            :model="formItem"
            label-width="130px"
            ref="FormRef"
            :rules="Rules"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="税地类型"
                  prop="tax_land_type"
                >
                  <el-select
                    class="w-[100%]"
                    disabled
                    v-model="formItem.tax_land_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.tax_land_type'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="税地负责人">
                  <el-input
                    v-model="formItem.tax_land_head"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input
                    v-model="formItem.head_mobile"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="税地来源"
                  prop="tax_land_name"
                >
                  <el-input
                    class="w-[100%]"
                    v-model="formItem.tax_land_name"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="成本点位">
                  <el-input
                    v-model="formItem.tax_cost_point"
                    placeholder="请输入"
                  />
                </el-form-item>
                <!-- <el-form-item
                  class="mt-25px"
                  label="计算方式"
                  prop="calculation_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.calculation_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.calculationType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item> -->
                <el-form-item class="mt-25px" label="税地用工年限">
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        type="number"
                        v-model="formItem.min_employment_year"
                        placeholder="起始年龄"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        type="number"
                        v-model="formItem.max_employment_year"
                        placeholder="截至年龄"
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item class="mt-25px" label="税地地区">
                  <el-cascader
                    class="w-[100%]"
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    clearable
                  />
                </el-form-item>
                <!-- <el-form-item class="mt-25px" label="网址">
                  <el-input v-model="formItem.web_url" placeholder="请输入" />
                </el-form-item> -->
              </div>
              <div class="w-[33%]">
                <el-form-item
                  class="mb-[0]"
                  label="税地营业执照"
                  prop="tax_land_license"
                >
                  <multi-upload
                    v-model="formItem.tax_land_license"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <multi-upload
                    v-model="formItem.company_qualifications"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            :model="formItem"
            label-width="130px"
            ref="FormRef2"
            :rules="Rules2"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item class="mt-25px" label="税地发票类型">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.InvoiceType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="开票类目">
                  <el-cascader
                    popper-class="last-cascader"
                    class="w-[100%]"
                    v-model="formItem.category_id"
                    :options="optionsInvoicingCategory"
                    :props="propsInvoicingCategory"
                    collapse-tags
                    collapse-tags-tooltip
                    clearable
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="发票面额">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.invoice_denomination"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.invoice_denomination'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="发票金额上限">
                  <zxn-money-input
                    v-model="formItem.max_money"
                    placeholder="请输入"
                  />
                </el-form-item>

                <!-- <el-form-item class="mt-25px" label="是否有支付接口">
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.is_payment_api"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.is_payment_api'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item> -->
                <el-form-item
                  class="mt-25px"
                  label="支付方式"
                  prop="payment_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.payment_type"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.paymentType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="开户行">
                  <el-input v-model="formItem.bank" placeholder="请输入">
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="开户行账户">
                  <el-input
                    v-model="formItem.bank_account"
                    placeholder="请输入"
                  />
                </el-form-item>
                <!-- <el-form-item
                  class="mt-25px"
                  label="企业代码"
                  prop="company_code"
                >
                  <el-input
                    v-model="formItem.company_code"
                    placeholder="请输入"
                  />
                </el-form-item> -->
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="发票票样">
                  <multi-upload
                    v-model="formItem.invoice_sample"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item class="mb-[0]" label="行业限制">
                  <multi-upload
                    v-model="formItem.industry_limit"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            :model="formItem"
            label-width="130px"
            ref="FormRef3"
            :rules="Rules3"
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="认证规则"
                  prop="certification_rules"
                >
                  <el-select
                    v-model="formItem.certification_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="请选择"
                    class="w-[100%]"
                  >
                    <el-option
                      v-for="item in optionsCertificationRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="签约规则"
                  prop="signing_rules"
                >
                  <el-select
                    v-model="formItem.signing_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="请选择"
                    class="w-[100%]"
                  >
                    <el-option
                      v-for="item in optionsSigningRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="单人每月限额">
                  <zxn-money-input
                    v-model="formItem.individual_monthly_limit"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="委托代征年限"
                  prop="tax_contract_term"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.tax_contract_term"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.EntrustedCollectionPeriod'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="进件资料">
                  <el-input
                    v-model="formItem.incoming_materials"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
                <!-- <el-form-item
                  class="mt-25px"
                  label="企业注册类型"
                  prop="tax_reg_type"
                >
                  <el-select
                    v-model="formItem.tax_reg_type"
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="请选择"
                    class="w-[100%]"
                  >
                    <el-option
                      v-for="item in optionsTaxRegType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item> -->
                <el-form-item class="mt-25px" label="社会信用代码">
                  <el-input
                    v-model="formItem.tax_organ_code"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item class="mb-[0]" label="个人合同模板">
                  <multi-upload
                    v-model="formItem.agreement_url"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item class="mb-[0]" label="企业合同模板">
                  <multi-upload
                    v-model="formItem.contract_img"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
                <el-form-item class="mb-[0]" label="结算确认函">
                  <multi-upload
                    v-model="formItem.settlement_confirmation_letter"
                    :limit="3"
                  ></multi-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
    <zxn-bottom-btn
      ><div class="but">
        <el-button type="primary" @click="handleSelfOperatedTaxLandEdit"
          >保存</el-button
        >
        <el-button @click="handleClose">取消</el-button>
      </div></zxn-bottom-btn
    >
  </zxn-plan>
</template>
<script setup lang="ts">
import {
  StringTransformNumber,
  categoryTransformNumber,
  categoryTransformArray,
  newArrayTransform,
  newNumberTransform,
} from "@/utils";
import { useRouter, useRoute } from "vue-router";
import {
  selfOperatedTaxLandEdit,
  selfOperatedTaxLandDetails,
} from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getAreaList } from "@/api/taxLandManagement";
import { getTreeList } from "@/api/common";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "基本信息",
  },
  {
    name: "2",
    label: "发票厂家信息",
  },
  {
    name: "3",
    label: "行业与合同信息",
  },
];

// 类目下拉选择框
var optionsInvoicingCategory = ref([]);
const getInvoicingCategoryTradeList = async () => {
  try {
    const { data } = await getTreeList({ type: 2 });
    const newData = JSON.parse(
      JSON.stringify(data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"children"/g, '"children"')
    );
    optionsInvoicingCategory.value = newData;
  } catch (error) {
    console.log(error);
  }
};
getInvoicingCategoryTradeList();
const propsInvoicingCategory = {
  multiple: true,
  expandTrigger: "hover" as const,
};
// 认证规则选择框
var optionsCertificationRules = ref([
  {
    value: 1,
    label: "个税申报二要素（人名，身份证）",
  },
  {
    value: 2,
    label: "运营商三要素（姓名，手机号，身份证号）",
  },
  {
    value: 3,
    label: "银行卡三要素（姓名，身份证，银行卡）",
  },
  {
    value: 4,
    label: "四要素",
  },
]);
// 签约规则选择框
var optionsSigningRules = ref([
  {
    value: 1,
    label: "静默签（下发后默认签约）",
  },
  {
    value: 2,
    label: "有感签刷脸意愿校验签约",
  },
  {
    value: 3,
    label: "有感短信校验签约",
  },
]);
// 企业注册类型选择框
// 企业注册类型，NORMAL（组织机构代码）、MERGE（社会信用代码）、REGCODE（工商注册号），默认NORMAL组织机构代码、统一社会信用代码，工商注册号

// const optionsTaxReg = computed(() => {
//   console.log(formItem.value.tax_reg_type, optionsTaxRegType.value);

//   const optionsTaxReg =
//     optionsTaxRegType.value.find(
//       (item) => item.value === formItem.value.tax_reg_type
//     )?.label || "组织机构代码";

//   return optionsTaxReg;
// });

// //
// var optionsTaxRegType = ref([
//   {
//     value: "NORMAL",
//     label: "组织机构代码",
//   },
//   {
//     value: "MERGE",
//     label: "社会信用代码",
//   },
//   {
//     value: "REGCODE",
//     label: "工商注册号",
//   },
// ]);
//税地
var optionsTaxLang = ref([]);
const getTaxLangList = async () => {
  try {
    const { data } = await getAreaList(0);
    const newData = JSON.parse(
      JSON.stringify(data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"cityList"/g, '"children"')
        .replace(/"taxLandList"/g, '"children"')
        .replace(/"child"/g, '"children"')
    );
    optionsTaxLang.value = newData;
    getData();
  } catch (error) {
    console.log(error);
  }
};
getTaxLangList();
const propsTaxLang = {
  // multiple: true,
  expandTrigger: "hover" as const,
};

//表单信息

const FormRef = ref(ElForm);
const FormRef2 = ref(ElForm);
const FormRef3 = ref(ElForm);
const validateMin_employment_year = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else if (!/^[0-9]+$/.test(value)) {
    callback(new Error("请输入正整数"));
  } else if (value > formItem.value.max_employment_year) {
    if (!formItem.value.max_employment_year) return;
    callback(new Error("起始年龄应该小于截至年龄"));
  } else {
    callback();
  }
};
const validateMax_employment_year = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else if (!/^[0-9]+$/.test(value)) {
    callback(new Error("请输入正整数"));
  } else if (value < formItem.value.min_employment_year) {
    if (!formItem.value.min_employment_year) return;
    callback(new Error("起始年龄应该小于截至年龄"));
  } else {
    callback();
  }
};
const validateIndividualMonthlyLimit = (
  rule: any,
  value: any,
  callback: any
) => {
  if (value === "") {
    callback(new Error("请输入"));
  } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
    callback(new Error("请输入正确格式，（例如：2，2.2，2.22）"));
  } else {
    callback();
  }
};
const Rules = {
  tax_land_type: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_land_head: [{ required: true, message: "请输入", trigger: "blur" }],
  head_mobile: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_land_name: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_cost_point: [{ required: true, message: "请输入", trigger: "blur" }],
  calculation_type: [{ required: true, message: "请输入", trigger: "blur" }],
  min_employment_year: [
    { required: true, validator: validateMin_employment_year, trigger: "blur" },
  ],
  max_employment_year: [
    { required: true, validator: validateMax_employment_year, trigger: "blur" },
  ],
  tax_land_city_id: [{ required: true, message: "请输入", trigger: "blur" }],
  web_url: [{ required: true, message: "请输入", trigger: "blur" }],

  tax_land_license: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
  company_qualifications: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
};
const Rules2 = {
  invoice_type: [{ required: true, message: "请输入", trigger: "blur" }],
  category_id: [{ required: true, message: "请输入", trigger: "blur" }],
  invoice_denomination: [
    { required: true, message: "请输入", trigger: "blur" },
  ],
  max_money: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_point: [{ required: true, message: "请输入", trigger: "blur" }],
  is_payment_api: [{ required: true, message: "请输入", trigger: "blur" }],
  payment_type: [{ required: true, message: "请输入", trigger: "blur" }],
  bank: [{ required: true, message: "请输入", trigger: "blur" }],
  bank_account: [{ required: true, message: "请输入", trigger: "blur" }],
  company_code: [{ required: true, message: "请输入", trigger: "blur" }],
  invoice_sample: [{ required: true, message: "请上传图片", trigger: "blur" }],
  industry_limit: [{ required: true, message: "请上传图片", trigger: "blur" }],
};
const Rules3 = {
  certification_rules: [{ required: true, message: "请输入", trigger: "blur" }],
  signing_rules: [{ required: true, message: "请输入", trigger: "blur" }],
  individual_monthly_limit: [
    {
      required: true,
      validator: validateIndividualMonthlyLimit,
      trigger: "blur",
    },
  ],
  tax_contract_term: [{ required: true, message: "请输入", trigger: "blur" }],
  tax_reg_type: [{ required: true, message: "请选择", trigger: "blur" }],
  tax_organ_code: [{ required: true, message: "请输入", trigger: "blur" }],
  agreement_url: [{ required: true, message: "请上传图片", trigger: "blur" }],
  contract_img: [{ required: true, message: "请上传图片", trigger: "blur" }],
  settlement_confirmation_letter: [
    { required: true, message: "请上传图片", trigger: "blur" },
  ],
};
const formItem = ref({
  tax_land_type: "",
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_cost_point: "",
  calculation_type: "",
  min_employment_year: "",
  max_employment_year: "",
  tax_land_city_id: [],
  web_url: "",
  tax_land_license: [],
  company_qualifications: [],
  invoice_type: "",
  category_id: [],
  invoice_denomination: "",
  max_money: "",
  tax_point: "",
  is_payment_api: "",
  payment_type: "",
  bank: "",
  bank_account: "",
  company_code: "",
  invoice_sample: [],
  industry_limit: [],
  certification_rules: [],
  signing_rules: [],
  individual_monthly_limit: "",
  tax_contract_term: "",
  incoming_materials: "",
  tax_reg_type: "",
  tax_organ_code: "",
  agreement_url: [],
  contract_img: [],
  settlement_confirmation_letter: [],
});
const handleSelfOperatedTaxLandEdit = () => {
  FormRef.value.validate((valid: boolean) => {
    if (valid) {
      FormRef2.value.validate((valid: boolean) => {
        if (valid) {
          FormRef3.value.validate((valid: boolean) => {
            if (valid) {
              const ID = Number(route.query.id);
              const params = { ...formItem.value } as any;
              params.tax_land_license = JSON.stringify(params.tax_land_license);
              params.company_qualifications = JSON.stringify(
                params.company_qualifications
              );
              params.category_id = newArrayTransform(params.category_id);
              params.invoice_sample = JSON.stringify(params.invoice_sample);
              params.industry_limit = JSON.stringify(params.industry_limit);
              // params.certification_rules = flatten(params.certification_rules);
              // params.signing_rules = flatten(params.signing_rules);
              params.agreement_url = JSON.stringify(params.agreement_url);
              params.contract_img = JSON.stringify(params.contract_img);
              params.settlement_confirmation_letter = JSON.stringify(
                params.settlement_confirmation_letter
              );
              params.tax_land_city_id = newNumberTransform(
                params.tax_land_city_id
              );
              console.log(typeof params.tax_reg_type);

              // params.tax_reg_type = newNumberTransform(params.tax_reg_type);

              selfOperatedTaxLandEdit(ID, params)
                .then(() => {
                  ElMessage({
                    type: "success",
                    message: `编辑税地成功`,
                  });
                  router.push({
                    name: "taxLandManagementIndex",
                    query: { activeName: "selfOperated" },
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              activeName.value = "3";
            }
          });
        } else {
          activeName.value = "2";
        }
      });
    } else {
      activeName.value = "1";
    }
  });
};
const handleClose = () => {
  router.push({
    name: "taxLandManagementIndex",
    query: { activeName: "selfOperated" },
  });
};
const getData = async () => {
  const ID = Number(route.query.id);
  try {
    const { data } = await selfOperatedTaxLandDetails(ID);
    var {
      tax_land_type,
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_cost_point,
      calculation_type,
      min_employment_year,
      max_employment_year,
      tax_land_city_id,
      web_url,
      tax_land_license,
      company_qualifications,
      invoice_type,
      category_id,
      invoice_denomination,
      max_money,
      tax_point,
      is_payment_api,
      payment_type,
      bank,
      bank_account,
      company_code,
      invoice_sample,
      industry_limit,
      certification_rules,
      signing_rules,
      individual_monthly_limit,
      tax_contract_term,
      incoming_materials,
      tax_reg_type,
      tax_organ_code,
      agreement_url,
      contract_img,
      settlement_confirmation_letter,
    } = data.info;
    formItem.value = {
      tax_land_type: tax_land_type + "",
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_cost_point,
      calculation_type: calculation_type + "",
      min_employment_year,
      max_employment_year,
      tax_land_city_id: categoryTransformNumber(
        optionsTaxLang.value,
        tax_land_city_id
      ),
      web_url,
      tax_land_license,
      company_qualifications,
      invoice_type: invoice_type + "",
      category_id: categoryTransformArray(
        optionsInvoicingCategory.value,
        category_id
      ),
      invoice_denomination: invoice_denomination + "",
      max_money,
      tax_point,
      is_payment_api: is_payment_api + "",
      payment_type: payment_type + "",
      bank,
      bank_account,
      company_code,
      invoice_sample,
      industry_limit,
      certification_rules: StringTransformNumber(certification_rules),
      signing_rules: StringTransformNumber(signing_rules),
      individual_monthly_limit,
      tax_contract_term: tax_contract_term + "",
      incoming_materials,
      tax_reg_type: tax_reg_type + "",
      tax_organ_code,
      agreement_url,
      contract_img,
      settlement_confirmation_letter,
    };
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getTaxLangList();
});
</script>
<style lang="scss" scoped>
.steps {
  margin-top: 25px;
  margin-bottom: 50px;
  margin-left: 43px;
}

.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }
  }

  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
  }

  :deep(.el-input.is-disabled .el-input__inner) {
    color: #333;
    // cursor: pointer;
    -webkit-text-fill-color: #333;
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
