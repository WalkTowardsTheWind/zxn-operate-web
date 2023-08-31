<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabs-list="tabsList">
      <template #1>
        <BasicInfo :isEdit="isEdit" :id="id" v-model:childData="formItem" />
      </template>
      <template #3>
        <TaxlandInfo
          :isEdit="isEdit"
          :id="id"
          :taxLandList="formItem.tax_land_list"
        />
      </template>
      <template #2>
        <PaperInfo :isEdit="isEdit" :id="id" v-model:childData="formItem" />
      </template>
      <template #4>
        <TaskInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #5>
        <RechargeInfo :isEdit="isEdit" :id="id" />
      </template>
      <template #6>
        <SettlementInfo :isEdit="isEdit" :id="id" />
      </template>
    </zxn-tabs>
    <zxn-bottom-btn v-if="isEdit && !['3', '4', '5', '6'].includes(activeName)">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="updateBusinessAccount">保存</el-button>
    </zxn-bottom-btn>
    <zxn-bottom-btn v-if="isCheck">
      <el-button type="info" @click="reject">驳回</el-button>
      <el-button type="primary" @click="pass">通过</el-button>
    </zxn-bottom-btn>
    <!-- 驳回 -->
    <el-dialog v-model="dialogVisible" top="30vh" title="驳回原因" width="20%">
      <el-form-item>
        <el-input v-model="reject_reason" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkReject">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-dialog>
  </zxn-plan>
</template>

<script lang="ts" setup>
import BasicInfo from "./components/basic-info.vue";
import PaperInfo from "./components/paper-info.vue";
import TaskInfo from "./components/task-info.vue";
import RechargeInfo from "./components/recharge-info.vue";
import SettlementInfo from "./components/settlement-info.vue";
import TaxlandInfo from "./components/taxland-info.vue";

import { useRoute } from "vue-router";

import {
  checkBusinessAccount,
  editBusinessAccount,
  getBusinessAccountDetail,
} from "@/api/account/business";
import router from "@/router";

const tabsList = [
  { name: "1", label: "基本信息" },
  { name: "3", label: "税地信息" },
  { name: "2", label: "证件信息" },
  // { name: "3", label: "合同信息" },
  { name: "4", label: "任务记录" },
  { name: "5", label: "充值记录" },
  { name: "6", label: "结算记录" },
  // { name: "7", label: "渠道信息" },
];

const activeName = ref("1");

watch(activeName, (newVal) => {
  sessionStorage.setItem("activeName", newVal);
});

onMounted(() => {
  const curTab = sessionStorage.getItem("activeName") || "";
  if (curTab) {
    activeName.value = curTab;
  }
});
// 监听页面离开事件
onBeforeUnmount(() => {
  // 重置 activeName
  activeName.value = "";

  // 清空 sessionStorage
  sessionStorage.removeItem("activeName");
});

const reject_reason = ref("");

const route = useRoute();

const isEdit = ref(false);
const isCheck = ref(false);
const id = ref();
const dialogVisible = ref(false);

const formItem = ref({} as any);

const isAllComplete = computed(() => {
  if (
    !!formItem.value.company_name &&
    !!formItem.value.credit_code &&
    !!formItem.value.contacts_mobile &&
    !!formItem.value.legal_person_idcard &&
    !!formItem.value.account &&
    !!formItem.value.legal_person &&
    !!formItem.value.category_id &&
    !!formItem.value.license_end_date &&
    !!formItem.value.contacts &&
    !!formItem.value.legal_person_mobile &&
    !!formItem.value.bank &&
    !!formItem.value.taxpayer_type &&
    // formItem.value.channel_point &&
    // formItem.value.calculation_type &&
    !!formItem.value.address &&
    !!formItem.value.bank_account &&
    !!formItem.value.company_email &&
    !!formItem.value.company_address &&
    !!formItem.value.consignee &&
    // formItem.value.company_source &&
    !!formItem.value.consignee_mobile &&
    !!formItem.value.license.length &&
    !!formItem.value.idcard_img.length &&
    !!formItem.value.taxpayer_type_img.length &&
    !!formItem.value.header_img.length &&
    !!formItem.value.permit_img.length &&
    !!formItem.value.seal.length &&
    !!formItem.value.auth_type &&
    !!formItem.value.tax_point &&
    !!formItem.value.sign_type &&
    !!formItem.value.contract_img.length &&
    !!formItem.value.company_source_remark
  ) {
    return true;
  } else {
    return false;
  }
});

if (route.query.status === "edit") {
  isEdit.value = true;
}
if (route.query.status === "check") {
  isCheck.value = true;
}
if (route.query.id) {
  id.value = route.query.id;
}

/**
 * 通过
 */
function pass() {
  ElMessageBox.confirm("是否激活该企业?", {
    confirmButtonText: "是",
    cancelButtonText: "否",
    center: true,
  })
    .then(() => {
      checkBusinessAccount({ id: id.value, audit_status: 1 }).then(() => {
        ElMessage({
          type: "success",
          message: "激活成功",
        });
        setTimeout(() => {
          router.go(-1);
        }, 200);
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消激活",
      });
    });
}

function reject() {
  dialogVisible.value = true;
}
/**
 * 驳回
 */
function checkReject() {
  checkBusinessAccount({
    id: id.value,
    audit_status: 2,
    reason: reject_reason.value,
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "驳回成功",
      });
      dialogVisible.value = false;
      router.go(-1);
    })
    .catch((err) => {
      return new Error("err", err);
    });
}

async function getAccountDetail() {
  if (route.query.id) {
    id.value = route.query.id;
    const res = await getBusinessAccountDetail(id.value);
    try {
      console.log(res.data);

      formItem.value = res.data;
    } catch (error: any) {
      return new Error("error", error);
    }
  }
}

async function updateBusinessAccount() {
  // 后台返回的 contacts_mobile 更新修改为 mobile
  let params = {
    ...formItem.value,
    mobile: formItem.value.contacts_mobile,
    contacts_mobile: undefined,
  };
  // console.log(formItem.value);
  // console.log(isAllComplete.value);

  if (isAllComplete.value) {
    try {
      await editBusinessAccount(params);
      ElMessage({
        message: "保存成功",
        type: "success",
      });
      router.go(-1);
    } catch (error: any) {
      return new Error(error);
    }
  } else {
    ElMessageBox.confirm("该企业信息暂不完善，是否立即激活企业状态？", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "暂不",
      distinguishCancelAndClose: true,
      center: true,
    })
      .then(async () => {
        params.is_active = 1;
        try {
          await editBusinessAccount(params);
          ElMessage({
            message: "保存成功",
            type: "success",
          });
          router.go(-1);
        } catch (error: any) {
          return new Error(error);
        }
      })
      .catch(async (action) => {
        if (action == "close") {
          ElMessage({
            type: "info",
            message: "取消保存",
          });
        } else {
          params.is_active = 0;
          try {
            await editBusinessAccount(params);
            ElMessage({
              message: "保存成功",
              type: "success",
            });
            router.go(-1);
          } catch (error: any) {
            return new Error(error);
          }
        }
      });
  }
}
getAccountDetail();
</script>
