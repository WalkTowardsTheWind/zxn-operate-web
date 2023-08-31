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
          >
            <div class="flex">
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="税地类型"
                  prop="tax_land_type"
                >
                  {{
                    proxy.$enumSet["taxLandManagementEnum.tax_land_type"][
                      formItem.tax_land_type
                    ]
                  }}
                </el-form-item>
                <el-form-item label="税地负责人">
                  <el-input v-model="formItem.tax_land_head" readonly />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="formItem.head_mobile" readonly />
                </el-form-item>
                <el-form-item class="mt-25px" label="税地来源">
                  <el-input
                    class="w-[100%]"
                    v-model="formItem.tax_land_name"
                    readonly
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="成本点位">
                  {{ formItem.tax_cost_point }}%
                </el-form-item>
                <!-- <el-form-item
                  class="mt-25px"
                  label="计算方式"
                  prop="calculation_type"
                >
                  <el-select
                    class="w-[100%]"
                    v-model="formItem.calculation_type"
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
                        v-model="formItem.min_employment_year"
                        readonly
                      />
                    </el-form-item>
                  </el-col>
                  <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        v-model="formItem.max_employment_year"
                        readonly
                      />
                    </el-form-item>
                  </el-col>
                </el-form-item>

                <el-form-item class="mt-25px" label="税地地区">
                  <el-cascader
                    class="w-[100%]"
                    placeholder=" "
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    disabled
                  />
                </el-form-item>
                <!-- <el-form-item class="mt-25px" label="网址">
                  <el-input v-model="formItem.web_url" readonly />
                </el-form-item> -->
                <el-form-item
                  class="mt-25px"
                  label="认证规则"
                  prop="certification_rules"
                >
                  <el-select
                    disabled
                    v-model="formItem.certification_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
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
                    disabled
                    v-model="formItem.signing_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
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
                  {{ proxy.$moneyFormat(formItem.individual_monthly_limit) }}元
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item
                  class="mt-25px"
                  label="税地发票类型"
                  prop="invoice_type"
                >
                  {{
                    proxy.$enumSet["taxLandManagementEnum.InvoiceType"][
                      formItem.invoice_type
                    ]
                  }}
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="开票类目"
                  prop="category_id"
                >
                  <el-cascader
                    popper-class="last-cascader"
                    class="w-[100%]"
                    v-model="formItem.category_id"
                    :options="optionsInvoicingCategory"
                    :props="propsInvoicingCategory"
                    collapse-tags
                    collapse-tags-tooltip
                    disabled
                  />
                </el-form-item>
                <el-form-item class="mt-25px" label="发票面额">
                  {{
                    proxy.$enumSet[
                      "taxLandManagementEnum.invoice_denomination"
                    ][formItem.invoice_denomination]
                  }}
                </el-form-item>
                <el-form-item class="mt-25px" label="发票金额上限">
                  {{ proxy.$moneyFormat(formItem.max_money) }}元
                </el-form-item>

                <el-form-item class="mt-25px" label="是否有支付接口">
                  {{
                    proxy.$enumSet["taxLandManagementEnum.is_payment_api"][
                      formItem.is_payment_api
                    ]
                  }}
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="支付方式"
                  prop="payment_type"
                >
                  {{
                    proxy.$enumSet["taxLandManagementEnum.paymentType"][
                      formItem.payment_type
                    ]
                  }}
                </el-form-item>
                <el-form-item class="mt-25px" label="开户行" prop="bank">
                  {{ formItem.bank }}
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="开户行账户"
                  prop="bank_account"
                >
                  {{ formItem.bank_account }}
                </el-form-item>
                <!-- <el-form-item
                  class="mt-25px"
                  label="企业代码"
                  prop="company_code"
                >
                  <el-input v-model="formItem.company_code" readonly />
                </el-form-item> -->
                <el-form-item
                  class="mt-25px"
                  label="委托代征年限"
                  prop="tax_contract_term"
                >
                  <el-select
                    disabled
                    class="w-[100%]"
                    v-model="formItem.tax_contract_term"
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
                  {{ formItem.incoming_materials }}
                </el-form-item>
              </div>
              <div class="w-[33%]">
                <el-form-item
                  class="mb-[0]"
                  label="税地营业执照"
                  prop="tax_land_license"
                >
                  <picture-preview
                    :imageList="formItem.tax_land_license"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mt-13px" label="公司资质">
                  <picture-preview
                    :imageList="formItem.company_qualifications"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="发票票样">
                  <picture-preview
                    :imageList="formItem.invoice_sample"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="行业限制">
                  <picture-preview
                    :imageList="formItem.industry_limit"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="个人合同模板">
                  <picture-preview
                    v-model="formItem.agreement_url"
                    :limit="3"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="企业合同模板">
                  <picture-preview
                    v-model="formItem.contract_img"
                    :limit="3"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="结算确认函">
                  <picture-preview
                    :imageList="formItem.settlement_confirmation_letter"
                  ></picture-preview>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import {
  StringTransformNumber,
  categoryTransformNumber,
  categoryTransformArray,
} from "@/utils";
import { useRoute } from "vue-router";
import { selfOperatedTaxLandDetails } from "@/api/taxLandManagement/selfOperatedTaxLand";
import { getAreaList } from "@/api/taxLandManagement";
// import { getCategoryTreeList } from "@/api/category";
import { getTreeList } from "@/api/common";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "税地详情",
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
const propsTaxLang = {
  // multiple: true,
  expandTrigger: "hover" as const,
};

//表单信息
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
  invoice_sample: [],
  industry_limit: [],
  certification_rules: [],
  signing_rules: [],
  individual_monthly_limit: "",
  tax_contract_term: "",
  incoming_materials: "",
  agreement_url: [],
  contract_img: [],
  settlement_confirmation_letter: [],
});

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
      invoice_sample,
      industry_limit,
      certification_rules,
      signing_rules,
      individual_monthly_limit,
      tax_contract_term,
      incoming_materials,
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
      // company_code,
      invoice_sample,
      industry_limit,
      certification_rules: StringTransformNumber(certification_rules),
      signing_rules: StringTransformNumber(signing_rules),
      individual_monthly_limit,
      tax_contract_term: tax_contract_term + "",
      incoming_materials,
      // tax_reg_type: tax_reg_type + "",
      // tax_organ_code,
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
  :deep(.el-input .el-input__wrapper) {
    width: 100%;
    border: none;
    box-shadow: none;
  }

  :deep(.el-select > .select-trigger > .el-input > .el-input__wrapper) {
    width: 100%;
    border: none;
    box-shadow: none;
  }

  :deep(.el-input.is-disabled .el-input__inner) {
    color: #333;
    cursor: pointer;
    -webkit-text-fill-color: #333;
  }

  :deep(.el-input__suffix) {
    display: none;
  }

  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
  }
  // :deep(.el-select__tags .el-tag--info) {
  //   background-color: #fff;
  // }

  :deep(.el-select .el-input.is-disabled .el-input__wrapper) {
    cursor: pointer;
  }

  :deep(.el-select .el-input.is-disabled .el-input__inner) {
    cursor: pointer;
  }

  :deep(.el-select__tags.is-disabled) {
    cursor: pointer;
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}
</style>
