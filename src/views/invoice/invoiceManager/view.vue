<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" has-back>
      <template #info>
        <div class="pl-36px pr-36px mt-32px">
          <el-form
            class="zxn-view-form"
            label-position="right"
            label-width="130"
          >
            <el-row :gutter="16">
              <el-col :span="8">
                <el-form-item label="开票要求">
                  <el-input
                    :model-value="
                      proxy.$enumSet['statusEnum.invoiceRequire'][
                        formItem.invoice_require
                      ]
                    "
                    readonly
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <zxn-title class="mb20px">开票信息</zxn-title>
            <el-row :gutter="16">
              <el-col :span="8">
                <el-form-item label="税源地">
                  <el-input :model-value="formItem.tax_land_name" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码">
                  <el-input :model-value="formItem.credit_code" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发票抬头">
                  <el-input :model-value="formItem.company_name" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业地址">
                  <el-input :model-value="formItem.company_address" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户行">
                  <el-input :model-value="formItem.bank" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="银行账号">
                  <el-input :model-value="formItem.bank_account" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人">
                  <el-input :model-value="formItem.contacts" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话">
                  <el-input :model-value="formItem.contacts_mobile" readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <zxn-title class="mb20px">收件信息</zxn-title>
            <el-row>
              <el-col :span="8">
                <el-form-item label="收件人">
                  <el-input :model-value="formItem.consignee" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收件人电话">
                  <el-input :model-value="formItem.consignee_mobile" readonly />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="收件地址">
                  <el-input :model-value="formItem.address" readonly />
                </el-form-item>
              </el-col>
            </el-row>
            <zxn-title class="mb20px">发票信息</zxn-title>
            <el-row>
              <el-col :span="8">
                <el-form-item label="发票形式">
                  <el-input
                    :model-value="
                      proxy.$enumSet['statusEnum.InvoiceType'][
                        formItem.invoice_form
                      ]
                    "
                    readonly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="规格型号">
                  <el-input
                    :model-value="
                      proxy.$enumSet[
                        'taxLandManagementEnum.invoice_denomination'
                      ][formItem.invoice_denomination]
                    "
                    readonly
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="flex justify-between items-center mb20px">
            <zxn-title> 开票类目 </zxn-title>
            <div class="table-right-in">
              <span>预计开票：{{ tableData.length }}张</span>
              <span>合计金额：¥{{ totalValue }}</span>
            </div>
          </div>
          <zxn-table
            :column-list="columnList"
            :table-data="tableData"
            :hasPagination="false"
          >
            <template #categoryName="{ row }">{{
              `${row.p_name}/${row.name}`
            }}</template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import type { Ref } from "vue";
import { getInvoiceCompanyView, getInvoiceChannelView } from "@/api/invoice";
import { ElLoading } from "element-plus";
import type { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
import { useRoute } from "vue-router";
import currency from "currency.js";
const route = useRoute();
const activeName: Ref<string> = ref("info");
type TabsType = {
  name: string;
  label: string;
};
const tabsList: TabsType[] = reactive([
  {
    name: "info",
    label: "发票详情",
  },
]);
const columnList = [
  { label: "开票类目", slot: "categoryName" },
  { label: "关联笔数", prop: "num" },
  { label: "开票金额", prop: "settlement_amount" },
];
const formItem = reactive({
  invoice_require: "",
  tax_land_name: "",
  taxpayer_number: "",
  credit_code: "",
  company_name: "",
  company_address: "",
  bank: "",
  bank_account: "",
  contacts: "",
  contacts_mobile: "",
  consignee: "",
  consignee_mobile: "",
  address: "",
  invoice_form: "",
  invoice_denomination: "",
});
const tableData = reactive([]);
const getView = async () => {
  const { id, type } = route.query;
  const loading = ElLoading.service({
    text: "加载中...",
  });
  try {
    const { data } =
      type === "enterprise"
        ? await getInvoiceCompanyView(id * 1)
        : await getInvoiceChannelView(id * 1);
    loading.close();
    formItem.invoice_require = data.invoice_require;
    formItem.tax_land_name = data.tax_land_name;
    formItem.taxpayer_number = data.taxpayer_number;
    formItem.credit_code = data.credit_code;
    formItem.company_name = data.company_name;
    formItem.company_address = data.company_address;
    formItem.bank = data.bank;
    formItem.bank_account = data.bank_account;
    formItem.contacts = data.contacts;
    formItem.contacts_mobile = data.contacts_mobile;
    formItem.consignee = data.consignee;
    formItem.consignee_mobile = data.consignee_mobile;
    formItem.address = data.address;
    formItem.invoice_form = data.invoice_form;
    formItem.invoice_denomination = data.invoice_denomination;
    tableData.length = 0;
    tableData.push(...(Object.values(data.category) as []));
    getTotalNum();
  } catch (err) {
    loading.close();
  }
};
const totalValue = ref(0);
const getTotalNum = () => {
  totalValue.value = tableData.reduce((total: number, cur: any): number => {
    return currency(total).add(cur.settlement_amount) as number;
  }, 0);
};
onMounted(() => {
  getView();
});
</script>
<style lang="scss" scoped>
.table-right-in {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #333;

  > span {
    &:first-child {
      margin-right: 20px;
    }
  }
}
</style>
