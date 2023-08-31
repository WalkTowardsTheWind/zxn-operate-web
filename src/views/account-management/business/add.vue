<template>
  <zxn-plan>
    <zxn-tabs
      :tabs-list="tabsList"
      v-model:activeName="activeName"
      hasBack
    ></zxn-tabs>
    <zxn-step :step-list="stepList" :active-step="activeStep" />
    <el-form
      ref="addFormRef"
      :model="addForm"
      :rules="rules"
      class="mt-[52px] ml-[50px]"
      label-width="125px"
    >
      <el-row :gutter="30" v-show="activeStep === 0">
        <el-col :span="7">
          <el-form-item label="企业登录名称" prop="account" required>
            <el-input
              placeholder="请输入6位以上英文字母和数字组合"
              v-model="addForm.account"
            />
          </el-form-item>
          <el-form-item label="密码" prop="pwd" required>
            <el-input placeholder="请输入" v-model="addForm.pwd" />
          </el-form-item>
          <el-form-item label="确认密码" prop="conf_pwd" required>
            <el-input placeholder="请输入" v-model="addForm.conf_pwd" />
          </el-form-item>
          <el-form-item label="企业联系人" prop="contacts" required>
            <el-input placeholder="请输入" v-model="addForm.contacts" />
          </el-form-item>
          <el-form-item label="联系方式" prop="mobile" required>
            <el-input
              maxlength="11"
              placeholder="请输入手机号或座机号"
              v-model="addForm.mobile"
            />
          </el-form-item>
          <el-form-item label="企业名称" prop="company_name" required>
            <el-input placeholder="请输入" v-model="addForm.company_name" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-show="activeStep === 1">
        <el-col :span="7">
          <el-form-item label="统一社会信用代码" prop="credit_code" required>
            <el-input placeholder="请输入" v-model="addForm.credit_code" />
          </el-form-item>
          <el-form-item label="营业执照到期时间">
            <div class="w-full">
              <el-date-picker
                style="width: 100%"
                v-model="addForm.license_end_date"
                unlink-panels
                value-format="YYYY-MM-DD"
              />
            </div>
          </el-form-item>
          <el-form-item label="法人姓名">
            <el-input placeholder="请输入" v-model="addForm.legal_person" />
          </el-form-item>
          <el-form-item label="法人身份证号">
            <el-input
              placeholder="请输入"
              v-model="addForm.legal_person_idcard"
            />
          </el-form-item>
          <el-form-item label="法人电话">
            <el-input
              placeholder="请输入手机号或座机号"
              v-model="addForm.legal_person_mobile"
            />
          </el-form-item>
          <el-form-item label="选择行业">
            <el-select
              class="w-full"
              placeholder="请选择"
              v-model="addForm.category_id"
            >
              <el-option
                v-for="item in cateGoryOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="营业地址">
            <el-input placeholder="请输入" v-model="addForm.company_address" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="营业执照" prop="license" required>
            <MultiUpload v-model="addForm.license">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="法人身份证">
            <MultiUpload v-model="addForm.idcard_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="企业印章">
            <MultiUpload v-model="addForm.seal">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-show="activeStep === 2">
        <el-col :span="7">
          <el-form-item label="开户行">
            <el-input placeholder="请输入" v-model="addForm.bank" />
          </el-form-item>
          <el-form-item label="银行账号">
            <el-input placeholder="请输入" v-model="addForm.bank_account" />
          </el-form-item>
          <el-form-item label="纳税人类型">
            <el-select
              class="w-full"
              placeholder="请输入"
              v-model="addForm.taxpayer_type"
            >
              <el-option
                v-for="item in taxpayerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="17">
          <el-form-item label="开户许可证">
            <MultiUpload v-model="addForm.permit_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="纳税人类型证明">
            <MultiUpload v-model="addForm.taxpayer_type_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="公司门头照片">
            <MultiUpload v-model="addForm.header_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
          <el-form-item label="办公地点照片">
            <MultiUpload v-model="addForm.office_img">
              <i-ep-Plus />
            </MultiUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30" v-show="activeStep === 3">
        <el-col :span="8">
          <el-form-item label="企业模式">
            <template #default>
              <div class="busType">
                <div
                  class="radioBtn"
                  :class="addForm.company_source == '0' ? 'is-active' : ''"
                  @click="addForm.company_source = '0'"
                >
                  销售
                </div>
                <div
                  class="radioBtn"
                  :class="addForm.company_source == '1' ? 'is-active' : ''"
                  @click="addForm.company_source = '1'"
                >
                  渠道推广
                </div>
              </div>
            </template>
          </el-form-item>
          <template v-if="addForm.company_source == '0'">
            <el-form-item label="销售负责人">
              <el-input placeholder="请输入" v-model="addForm.sale_head" />
            </el-form-item>
            <el-form-item label="销售所属公司">
              <el-input placeholder="请输入" v-model="addForm.sale_company" />
            </el-form-item>
          </template>
          <template v-if="addForm.company_source == '1'">
            <el-form-item label="上级ID绑定" class="w-full">
              <div style="display: flex; gap: 0 10px">
                <el-select placeholder="请选择" v-model="addForm.channel_type">
                  <el-option label="个人" :value="1"></el-option>
                  <el-option label="企业" :value="2"></el-option>
                </el-select>
                <el-input
                  placeholder="请输入"
                  v-model="addForm.parent_channel_id"
                />
              </div>
            </el-form-item>
            <el-form-item label="渠道点位">
              <el-input placeholder="请输入" v-model="addForm.channel_point" />
            </el-form-item>
          </template>
          <el-form-item label="企业来源备注">
            <el-input
              placeholder="请输入"
              v-model="addForm.company_source_remark"
            />
          </el-form-item>
          <el-form-item label="点位计费方式" prop="calculation_type">
            <el-select
              class="w-full"
              v-model="addForm.calculation_type"
              placeholder="请选择"
            >
              <el-option label="内扣" value="0" />
              <el-option label="外扣" value="1" />
            </el-select>
          </el-form-item>

          <el-form-item label="企业邮箱">
            <el-input placeholder="请输入" v-model="addForm.company_email" />
          </el-form-item>
          <el-form-item label="发票收件人">
            <el-input placeholder="请输入" v-model="addForm.consignee" />
          </el-form-item>
          <el-form-item label="联系号码">
            <el-input
              placeholder="请输入手机号或座机号"
              v-model="addForm.consignee_mobile"
            />
          </el-form-item>
          <el-form-item label="邮寄地址">
            <el-input placeholder="请输入" v-model="addForm.address" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- 新建税地 -->
          <template v-for="(tax, index) in addForm.tax_land_list" :key="tax">
            <el-form-item
              label="选择税地"
              :prop="'tax_land_list.' + index + '.tax_land_id'"
              :rules="{
                required: true,
                message: '必填',
                trigger: 'change',
              }"
            >
              <el-select
                class="w-full"
                placeholder="请选择"
                v-model="tax.tax_land_id"
                @change="addSelecTaxland(tax, index)"
              >
                <el-option
                  v-for="(item, index) in taxLandOption"
                  :key="index"
                  :value="item.id"
                  :label="item.tax_land_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="客户点位"
              :prop="'tax_land_list.' + index + '.tax_point'"
              :rules="{
                required: true,
                message: '必填',
                trigger: 'change',
              }"
            >
              <el-input placeholder="请输入" v-model="tax.tax_point">
                <template #append>%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="认证规则">
              <el-select
                class="w-full"
                placeholder="请选择（单选）"
                v-model="tax.auth_type"
              >
                <el-option
                  v-for="(item, index) in auth_type"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="签约规则">
              <el-select
                class="w-full"
                placeholder="请选择（单选）"
                v-model="tax.sign_type"
              >
                <el-option
                  v-for="(item, index) in sign_type"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传合同">
              <MultiUpload v-model="tax.contract_img">
                <i-ep-Plus />
              </MultiUpload>
            </el-form-item>
            <el-form-item v-if="addForm.tax_land_list.length > 1 && index != 0">
              <div class="delTaxLand" @click="delTaxLand(index)">
                × 删除税地
              </div>
            </el-form-item>
          </template>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <div class="addTaxLand" @click="addNewTaxLand">+ 添加税地</div>
          </el-form-item>
        </el-col>
      </el-row>
      <zxn-bottom-btn>
        <el-button type="info" v-if="activeStep === 0" @click="$router.go(-1)"
          >取消</el-button
        >
        <el-button type="info" v-if="activeStep !== 0" @click="activeStep--"
          >上一步</el-button
        >
        <el-button type="primary" v-if="activeStep !== 3" @click="activeStep++"
          >下一步</el-button
        >
        <el-button
          type="primary"
          v-if="activeStep === 3"
          @click="submit(addFormRef)"
          >完成</el-button
        >
      </zxn-bottom-btn>
    </el-form>
  </zxn-plan>
</template>

<script lang="ts" setup>
import {
  createBusinessAccount,
  getCategoryList,
  getTaxlandDetail,
} from "@/api/account/business";
import { getLandList } from "@/api/common";
import router from "@/router";
import type { FormInstance, FormRules } from "element-plus";
import { useStore } from "@/store/modules/taxLand";

const taxLandStore = useStore();

const taxpayerOptions = [
  {
    label: "小规模",
    value: "1",
  },
  {
    label: "一般人",
    value: "2",
  },
];

const activeName = ref("0");
const activeStep = ref(0);
const taxLandOption = ref([] as any);

const tabsList = [{ name: "0", label: "新建企业" }];
const stepList = [
  { desc: "基本信息" },
  { desc: "公司信息" },
  { desc: "纳税信息" },
  { desc: "合同渠道" },
];

const cateGoryOptions = ref([] as any);

const addFormRef = ref<FormInstance>();

const addForm = reactive({
  account: "",
  pwd: "",
  conf_pwd: "",
  contacts: "",
  mobile: "",
  company_name: "",
  credit_code: "",
  license_end_date: "",
  legal_person: "",
  legal_person_idcard: "",
  legal_person_mobile: "",
  category_id: "",
  company_address: "",
  license: [],
  idcard_img: [],
  seal: [], // 企业印章
  bank: "",
  bank_account: "",
  taxpayer_type: "",
  permit_img: [],
  taxpayer_type_img: [],
  header_img: [],
  office_img: [],
  company_source: "0",
  sale_head: "",
  sale_company: "",
  channel_type: "",
  parent_channel_id: "",
  company_email: "",
  consignee: "",
  consignee_mobile: "",
  address: "",
  channel_point: "",
  company_source_remark: "",
  calculation_type: "",
  tax_land_list: [
    {
      tax_land_id: "",
      tax_point: "",
      sign_type: "",
      auth_type: "",
      contract_img: [],
    },
  ],
} as any);

const isTaxLandListValid = computed(() => {
  if (addForm.tax_land_list.length > 0) {
    const allElementsValid = addForm.tax_land_list.every((item) => {
      const { tax_land_id, tax_point, auth_type, sign_type, contract_img } =
        item;
      return (
        tax_land_id &&
        tax_point &&
        auth_type &&
        sign_type &&
        contract_img.length
      );
    });
    if (allElementsValid) {
      // 数组中所有元素的参数都有值时返回 true
      return true;
    } else {
      // 数组中存在元素的参数缺失值时返回 false
      return false;
    }
  } else {
    return true;
  }
});

const auth_type = ref([] as any);
const sign_type = ref([] as any);

// 相同参数
const requiredComputed = computed(() => {
  return (
    !!addForm.account &&
    !!addForm.pwd &&
    !!addForm.conf_pwd &&
    !!addForm.contacts &&
    !!addForm.mobile &&
    !!addForm.company_name &&
    !!addForm.credit_code &&
    !!addForm.license_end_date &&
    !!addForm.legal_person &&
    !!addForm.legal_person_idcard &&
    !!addForm.legal_person_mobile &&
    !!addForm.category_id &&
    !!addForm.company_address &&
    !!addForm.license.length &&
    !!addForm.idcard_img.length &&
    !!addForm.seal.length &&
    !!addForm.bank &&
    !!addForm.bank_account &&
    !!addForm.taxpayer_type &&
    !!addForm.permit_img.length &&
    !!addForm.taxpayer_type_img.length &&
    !!addForm.header_img.length &&
    !!addForm.office_img.length &&
    !!addForm.company_source &&
    !!addForm.company_source_remark &&
    !!addForm.calculation_type &&
    !!addForm.company_email &&
    !!addForm.consignee &&
    !!addForm.consignee_mobile &&
    !!addForm.address &&
    isTaxLandListValid.value
  );
});

const isAllComplete = computed(() => {
  if (addForm.company_source == "0") {
    return (
      requiredComputed.value &&
      !!addForm.company_source &&
      !!addForm.sale_head &&
      !!addForm.sale_company
    );
  }
  if (addForm.company_source == "1") {
    return (
      requiredComputed.value &&
      !!addForm.company_source &&
      !!addForm.channel_type &&
      !!addForm.channel_point
    );
  }
});

const rules = reactive<FormRules>({
  account: [{ required: true, message: "必填", trigger: "blur" }],
  pwd: [{ required: true, message: "必填", trigger: "blur" }],
  conf_pwd: [{ required: true, message: "必填", trigger: "blur" }],
  contacts: [{ required: true, message: "必填", trigger: "blur" }],
  mobile: [{ required: true, message: "必填", trigger: "blur" }],
  company_name: [{ required: true, message: "必填", trigger: "blur" }],
  tax_point: [{ required: true, message: "必填", trigger: "blur" }],
  tax_land_id: [{ required: true, message: "必填", trigger: "change" }],
  credit_code: [{ required: true, message: "必填", trigger: "blur" }],
  license: [{ required: true, message: "必填", trigger: "change" }],
  calculation_type: [{ required: true, message: "必填", trigger: "change" }],
});

/**
 * 提交
 */
async function submit(formEl: FormInstance | undefined) {
  if (!formEl) return;

  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(isAllComplete.value);

      // 全部填写完成
      if (isAllComplete.value) {
        const res = await createBusinessAccount(addForm);
        try {
          if (res.status === 200) {
            ElMessage({
              message: "新建企业账号成功",
              type: "success",
            });
            setTimeout(() => {
              router.go(-1);
            }, 200);
          }
        } catch (error: any) {
          return new Error("error", error);
        }
      } else {
        // 弹框激活
        ElMessageBox.confirm(
          "该企业信息暂不完善，是否立即激活企业状态？",
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "暂不",
            distinguishCancelAndClose: true,
            center: true,
          }
        )
          .then(async () => {
            addForm.is_active = 1;
            const res = await createBusinessAccount(addForm);
            try {
              if (res.status === 200) {
                ElMessage({
                  message: "新建企业账号成功",
                  type: "success",
                });
                setTimeout(() => {
                  router.go(-1);
                }, 200);
              }
            } catch (error: any) {
              return new Error("error", error);
            }
          })
          .catch(async (action) => {
            if (action == "close") {
              ElMessage({
                type: "info",
                message: "取消新建",
              });
            } else {
              addForm.is_active = 0;
              const res = await createBusinessAccount(addForm);
              try {
                if (res.status === 200) {
                  ElMessage({
                    message: "新建企业账号成功",
                    type: "success",
                  });
                  setTimeout(() => {
                    router.go(-1);
                  }, 200);
                }
              } catch (error: any) {
                return new Error("error", error);
              }
            }
          });
      }
    } else {
      ElMessage.error({
        message: "当前表单必填项还未填写！",
      });
      console.log("error submit!", fields);
    }
  });
}

// 行业选择
function getCategoryOptions() {
  getCategoryList().then((res) => {
    cateGoryOptions.value = res.data;
  });
}

// 获取税地列表
function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data);
  });
}

// 选择税地后才有对应规则
function addSelecTaxland(tax: any, index: number) {
  taxLandStore.updateTaxLandList(tax.tax_land_id);
  auth_type.value = taxLandStore.auth_type;
  sign_type.value = taxLandStore.sign_type;
}

// 添加税地
const addNewTaxLand = () => {
  addForm.tax_land_list.push({
    tax_land_id: "",
    tax_point: "",
    sign_type: "",
    auth_type: "",
    contract_img: [],
  });
};

const delTaxLand = (index: number) => {
  addForm.tax_land_list.splice(index, 1);
};

getCategoryOptions();
getTaxLandOption();
</script>

<style scoped lang="scss">
.busType {
  display: flex;
  gap: 0 20px;
  width: 100%;
  font-size: 14px;
}

.radioBtn {
  flex: 1;
  padding: 2px 0;
  color: #333;
  text-align: center;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

.is-active {
  color: #366ff3;
  border-color: #366ff3;
}

:deep(.el-input__wrapper) {
  width: 100% !important;
}

.addTaxLand {
  display: flex;
  align-items: center;
  gap: 0 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #356ff3;
}

.delTaxLand {
  display: flex;
  align-items: center;
  gap: 0 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #f35135;
}
</style>
