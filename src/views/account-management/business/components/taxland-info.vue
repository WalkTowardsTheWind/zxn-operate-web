<template>
  <div class="content p-[30px]">
    <zxn-table
      :table-data="state.tableData"
      :column-list="columnList"
      :hasPagination="false"
    >
      <template #tableTop>
        <el-button
          type="primary"
          plain
          @click="taxLandClick('add')"
          v-if="isEdit"
          >+新增税地</el-button
        >
      </template>
      <template #tax_point="scope">
        <div>{{ scope.row.tax_point }}%</div>
      </template>
      <template #contract_img="scope">
        <zxn-image
          :imgList="scope.row.contract_img"
          width="40"
          height="40"
          targetClick
        />
      </template>
      <template #operation="scope" v-if="isEdit">
        <el-button
          link
          type="primary"
          @click="handleStatus(scope.row.id, scope.row.status)"
          >{{ scope.row.status == 1 ? "禁用" : "启用" }}</el-button
        >
        <el-button link type="primary" @click="taxLandClick('edit', scope.row)"
          >编辑</el-button
        >
      </template>
    </zxn-table>
    <!-- 新增 编辑 -->
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.dialogTitle"
      width="25%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="formItem"
        :model="state.formItem"
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="税地名称" prop="tax_land_id">
          <el-select
            class="w-full"
            placeholder="请选择"
            v-model="state.formItem.tax_land_id"
            :disabled="state.dialogType == 'edit'"
            @change="selecTaxland"
          >
            <el-option
              v-for="(item, index) in taxLandOption"
              :key="index"
              :value="item.id"
              :label="item.tax_land_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户点位" prop="tax_point">
          <el-input placeholder="请输入" v-model="state.formItem.tax_point">
            <template #append>%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="认证规则" prop="auth_type">
          <el-select class="w-full" v-model="state.formItem.auth_type">
            <el-option
              v-for="(item, index) in auth_type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约规则" prop="sign_type">
          <el-select
            class="w-full"
            placeholder="请选择（单选）"
            v-model="state.formItem.sign_type"
          >
            <el-option
              v-for="(item, index) in sign_type"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传合同" prop="contract_img">
          <MultiUpload v-model="state.formItem.contract_img">
            <i-ep-Plus />
          </MultiUpload>
          <!-- <PicturePreview v-else :image-list="formItem.contract_img" /> -->
        </el-form-item>
        <div style="display: flex; justify-content: center">
          <el-button type="primary" @click="taxLandConfirm(formItem)"
            >确认</el-button
          >
          <el-button type="info" @click="cancelClick">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getLandList } from "@/api/common";
import {
  getBusinessAccountDetail,
  editBusinessAccount,
  setTaxLandStatus,
  editAccountTaxLand,
  createAccountTaxLand,
} from "@/api/account/business";

import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

import { useStore } from "@/store/modules/taxLand";
import type { FormInstance } from "element-plus";

const formItem = ref<FormInstance>();

const taxLandStore = useStore();

const auth_type = ref([] as any);
const sign_type = ref([] as any);

const taxLandOption = ref([] as any);
function getTaxLandOption() {
  taxLandOption.value.length = 0;
  getLandList().then((res) => {
    taxLandOption.value.push(...res.data);
  });
}

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => 0,
  },
  taxLandList: {
    type: Array,
  },
});

watch(
  () => props.taxLandList,
  (newVal) => {
    state.tableData = newVal;
  }
);

const state = reactive({
  tableData: [],
  dialogTitle: "",
  dialogVisible: false,
  dialogType: "",
  formItem: {
    id: "",
    company_id: "",
    tax_land_id: "",
    tax_point: "",
    auth_type: "",
    sign_type: "",
    contract_img: [],
  },
});

const rules = reactive({
  tax_land_id: [{ required: true, message: "必填", trigger: "change" }],
  tax_point: [{ required: true, message: "必填", trigger: "blur" }],
  auth_type: [{ required: true, message: "必填", trigger: "change" }],
  sign_type: [{ required: true, message: "必填", trigger: "change" }],
  contract_img: [{ required: true, message: "必填", trigger: "change" }],
});

const columnList = [
  { label: "税地名称", prop: "tax_land_name", minWidth: 250 },
  {
    label: "客户点位",
    prop: "tax_point",
    slot: "tax_point",
    minWidth: 120,
  },
  { label: "税地银行", prop: "bank", minWidth: 250 },
  { label: "银行账户", prop: "sub_account_no", minWidth: 250 },
  { label: "账户余额", prop: "balance", type: "money", minWidth: 250 },
  {
    label: "签约合同",
    prop: "contract_img",
    slot: "contract_img",
    minWidth: 150,
  },
  {
    label: "认证规则",
    prop: "sign_type",
    type: "enum",
    path: "accountEnum.signType",
    minWidth: 150,
  },
  {
    label: "签约规则",
    prop: "auth_type",
    type: "enum",
    path: "accountEnum.authType",
    minWidth: 350,
  },
  {
    label: "状态",
    type: "enum",
    path: "accountEnum.taxLandStatusType",
    prop: "status",
    color: {
      0: {
        color: "#F35036",
        background: "#FDE3DF",
      },
      1: {
        color: "#356FF3",
        background: "#DFE8FD",
      },
    },
  },
  { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

const taxLandClick = (active: string, item?: any) => {
  formItem.value?.resetFields();
  state.dialogVisible = true;
  if (active == "add") {
    state.dialogTitle = "新增税地";
    state.dialogType = active;
    state.formItem.id = "";
    state.formItem.tax_land_id = "";
    state.formItem.company_id = "";
    state.formItem.tax_point = "";
    state.formItem.sign_type = "";
    state.formItem.auth_type = "";
    state.formItem.contract_img = [];
    state.formItem.company_id = route.query.id as string;
  }
  if (active == "edit") {
    state.dialogTitle = "编辑税地";
    state.dialogType = active;
    state.formItem.id = item.id;
    state.formItem.company_id = item.company_id;
    state.formItem.tax_land_id = item.tax_land_id;
    selecTaxland(item.tax_land_id);
    state.formItem.tax_point = item.tax_point;
    state.formItem.sign_type = item.sign_type;
    state.formItem.auth_type = item.auth_type;
    state.formItem.contract_img = item.contract_img;
  }
};
// 选择税地后才有对应规则
const selecTaxland = (tax_land_id: string) => {
  state.formItem.auth_type = "";
  state.formItem.sign_type = "";

  taxLandStore.updateTaxLandList(tax_land_id);

  auth_type.value = taxLandStore.auth_type;
  sign_type.value = taxLandStore.sign_type;
};

// 0 禁用 1 启用
const handleStatus = (id: string, status: number | string) => {
  status == 1 ? (status = 0) : (status = 1);
  setTaxLandStatus(id, status).then((res: any) => {
    ElMessage({
      message: res.msg,
      type: "success",
    });
    setTimeout(() => {
      location.reload();
    }, 500);
  });
};

const taxLandConfirm = async (formEl: FormInstance) => {
  if (state.dialogType == "add") {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        createAccountTaxLand(state.formItem).then((res) => {
          ElMessage({
            message: "新建税地成功",
            type: "success",
          });
          state.dialogVisible = false;
          setTimeout(() => {
            location.reload();
          }, 200);
        });
      }
    });
  }
  if (state.dialogType == "edit") {
    editAccountTaxLand(state.formItem).then((res) => {
      ElMessage({
        message: "编辑成功",
        type: "success",
      });
      state.dialogVisible = false;
      setTimeout(() => {
        location.reload();
      }, 200);
    });
  }
};
const cancelClick = () => {
  state.dialogVisible = false;
  state.formItem.id = "";
  state.formItem.company_id = "";
  state.formItem.tax_land_id = "";
  state.formItem.tax_point = "";
  state.formItem.sign_type = "";
  state.formItem.auth_type = "";
  state.formItem.contract_img = [];
};

getTaxLandOption();
</script>

<style scoped lang="scss">
.content {
  position: relative;
  height: calc(100vh - 200px);
}

.bottom-btn {
  position: absolute;
  bottom: 20px;
  left: 45%;
  transform: translateX(-50%);
}
</style>
