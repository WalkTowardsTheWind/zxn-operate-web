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
          <div class="title">
            <div class="line"></div>
            <div>税地基本信息</div>
          </div>
          <el-form class="zxn-box" :model="formItem" label-width="130px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="税地类型" prop="tax_land_type">
                  <el-select
                    class="w-[100%] bg"
                    disabled
                    v-model="formItem.tax_land_type"
                    placeholder=" "
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
                    readonly
                    v-model="formItem.tax_land_head"
                    placeholder="请输入"
                  />
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input
                    readonly
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
                    readonly
                    class="w-[100%]"
                    v-model="formItem.tax_land_name"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="厂商" prop="tax_manufacturer">
                  <el-input
                    class="w-[100%]"
                    readonly
                    v-model="formItem.tax_manufacturer"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item class="mt-25px" label="成本点位">
                  <el-input
                    readonly
                    v-model="formItem.tax_cost_point"
                    placeholder="请输入"
                  />
                </el-form-item>

                <el-form-item class="mt-25px" label="税地用工年限">
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        readonly
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
                        readonly
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
                    disabled
                    v-model="formItem.tax_land_city_id"
                    :options="optionsTaxLang"
                    :props="propsTaxLang"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
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
              </el-col>
            </el-row>
          </el-form>

          <el-form class="zxn-box" :model="formItem" label-width="130px">
            <div class="title">
              <div class="line"></div>
              <div>发票厂家信息</div>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="税地发票类型">
                  <el-select
                    class="w-[100%]"
                    disabled
                    v-model="formItem.invoice_type"
                    placeholder=" "
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
                    disabled
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
                    disabled
                    v-model="formItem.invoice_denomination"
                    placeholder=" "
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
                  <zxn-money-input v-model="formItem.max_money" readonly />
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="支付方式"
                  prop="payment_type"
                >
                  <el-select
                    class="w-[100%]"
                    disabled
                    v-model="formItem.payment_type"
                    placeholder=" "
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
                  <el-input
                    readonly
                    v-model="formItem.bank"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="开户行账户"
                  prop="bank_account"
                >
                  <el-input
                    readonly
                    v-model="formItem.bank_account"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="核账网址">
                  <el-input readonly v-model="formItem.audit_web_url" />
                </el-form-item>
                <el-form-item class="mt-25px" label="核账网址账号">
                  <el-input readonly v-model="formItem.audit_account" />
                </el-form-item>
                <el-form-item class="mt-25px" label="核账网址密码">
                  <el-input readonly v-model="formItem.audit_password" />
                </el-form-item>
                <el-form-item class="mt-25px" label="余额计算规则">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.balance_type"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.balanceType'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="服务费计算规则">
                  <el-select
                    class="w-[100%]"
                    disabled
                    placeholder=" "
                    v-model="formItem.commission_rule"
                  >
                    <el-option
                      v-for="item in proxy.$const[
                        'taxLandManagementEnum.commissionRule'
                      ]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="mt-25px" label="支付供应商">
                  <el-input readonly v-model="formItem.payment_supplier">
                  </el-input>
                </el-form-item>
                <el-form-item
                  class="mt-25px"
                  label="单人每月限额"
                  prop="individual_monthly_limit"
                >
                  <zxn-money-input
                    v-model="formItem.individual_monthly_limit"
                    readonly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
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
              </el-col>
            </el-row>
          </el-form>
          <el-form class="zxn-box" :model="formItem" label-width="130px">
            <div class="title">
              <div class="line"></div>
              <div>行业与合同信息</div>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="认证规则" prop="certification_rules">
                  <el-select
                    class="w-[100%]"
                    disabled
                    v-model="formItem.certification_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder=" "
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
                    class="w-[100%]"
                    disabled
                    v-model="formItem.signing_rules"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in optionsSigningRules"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="委托代征年限" prop="tax_contract_term">
                  <el-select
                    class="w-[100%]"
                    disabled
                    v-model="formItem.tax_contract_term"
                    placeholder=" "
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
                    readonly
                    v-model="formItem.incoming_materials"
                    placeholder="请输入"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="mb-[0]" label="个人合同模板">
                  <picture-preview
                    :imageList="formItem.agreement_url"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="企业合同模板">
                  <picture-preview
                    :imageList="formItem.contract_img"
                  ></picture-preview>
                </el-form-item>
                <el-form-item class="mb-[0]" label="结算确认函">
                  <picture-preview
                    :imageList="formItem.settlement_confirmation_letter"
                  ></picture-preview>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </template>
      <template #2> </template>
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
import { getTreeList } from "@/api/common";
import { getCategoryTreeList } from "@/api/category";
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

//行业
var optionsTrade = ref([]);
const getTradeList = async () => {
  try {
    const { data } = await getCategoryTreeList({ type: "0" });
    console.log(data, "wwwwww");
    const newData = JSON.parse(
      JSON.stringify(data)
        .replace(/"id"/g, '"value"')
        .replace(/"name"/g, '"label"')
        .replace(/"children"/g, '"children"')
    );
    optionsTrade.value = newData;
  } catch (error) {
    console.log(error);
  }
};
getTradeList();
const propsTrade = {
  // multiple: true,
  expandTrigger: "hover" as const,
};
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
const formItem = ref({
  tax_land_type: "1",
  tax_land_head: "",
  head_mobile: "",
  tax_land_name: "",
  tax_manufacturer: "",
  tax_cost_point: "",
  min_employment_year: "18",
  max_employment_year: "60",
  tax_land_city_id: "",
  tax_land_license: [],
  company_qualifications: [],
  // 2
  invoice_type: "",
  category_id: [],
  invoice_denomination: "",
  max_money: "",
  // is_payment_api: "",
  payment_type: "",
  bank: "",
  bank_account: "",
  audit_web_url: "",
  audit_account: "",
  audit_password: "",
  // 余额计算规则
  balance_type: "",
  commission_rule: "",
  payment_supplier: "",
  individual_monthly_limit: "98000",
  invoice_sample: [],
  // 行业限制
  industry_limit: [],
  // 3
  certification_rules: [],
  signing_rules: [],
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
      tax_manufacturer,
      tax_cost_point,
      min_employment_year,
      max_employment_year,
      tax_land_city_id,
      tax_land_license,
      company_qualifications,
      invoice_type,
      category_id,
      invoice_denomination,
      max_money,
      payment_type,
      bank,
      bank_account,
      audit_web_url,
      audit_account,
      audit_password,
      balance_type,
      commission_rule,
      payment_supplier,
      individual_monthly_limit,
      invoice_sample,
      industry_limit,
      certification_rules,
      signing_rules,
      tax_contract_term,
      incoming_materials,
      // tax_reg_type,
      // tax_organ_code,
      agreement_url,
      contract_img,
      settlement_confirmation_letter,
    } = data.info;
    formItem.value = {
      tax_land_type: tax_land_type + "",
      tax_land_head,
      head_mobile,
      tax_land_name,
      tax_manufacturer,
      tax_cost_point,
      // calculation_type: calculation_type + "",
      min_employment_year,
      max_employment_year,
      tax_land_city_id: categoryTransformNumber(
        optionsTaxLang.value,
        tax_land_city_id
      ),
      // web_url,
      tax_land_license,
      company_qualifications,
      invoice_type: invoice_type + "",
      category_id: categoryTransformArray(
        optionsInvoicingCategory.value,
        category_id
      ),
      invoice_denomination: invoice_denomination + "",
      max_money,
      // tax_point,
      // is_payment_api: is_payment_api + "",
      payment_type: payment_type + "",
      bank,
      bank_account,
      audit_web_url,
      audit_account,
      audit_password,
      // 余额计算规则
      balance_type: balance_type + "",
      commission_rule: commission_rule + "",
      payment_supplier,
      individual_monthly_limit,
      invoice_sample,
      industry_limit,
      certification_rules: StringTransformNumber(certification_rules),
      signing_rules: StringTransformNumber(signing_rules),

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

// 蓝色标题样式
.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  margin-left: 29px;
  font-family: sans-serif;
  font-size: 14px;
  color: #356ff3;
}

.line {
  display: flex;
  width: 4px;
  height: 14px;
  margin-right: 10px;
  background: #356ff3;
  border-radius: 4px;
}
</style>
