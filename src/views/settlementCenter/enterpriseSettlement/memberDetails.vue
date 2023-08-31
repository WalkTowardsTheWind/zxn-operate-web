<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-l-[53px] p-b-[0]">
          <el-form :model="formItem" label-width="90px" label-position="right">
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">个人身份信息</span>
            </div>
            <div class="m-t-[20px]">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="账户ID">
                    <el-text class="mx-1">{{ formItem.account }}</el-text>
                  </el-form-item>
                  <el-form-item label="证件类型">
                    <el-text class="mx-1">身份证</el-text>
                  </el-form-item>
                  <el-form-item label="开户行">
                    <el-text class="mx-1">{{ formItem.bank }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="姓名">
                    <el-text class="mx-1">{{ formItem.real_name }}</el-text>
                  </el-form-item>
                  <el-form-item label="身份证号">
                    <el-text class="mx-1">{{ formItem.idcard }}</el-text>
                  </el-form-item>
                  <el-form-item label="开户行号">
                    <el-text class="mx-1">{{ formItem.bank_account }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="联系方式">
                    <el-text class="mx-1">{{ formItem.phone }}</el-text>
                  </el-form-item>
                  <el-form-item label="地点">
                    <el-text class="mx-1"></el-text>
                  </el-form-item>
                  <el-form-item label="开户地址">
                    <el-text class="mx-1">{{ formItem.address }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">个人任务信息</span>
            </div>
            <div class="m-t-[20px]">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="任务名称">
                    <el-text class="mx-1">{{ formItem.task_name }}</el-text>
                  </el-form-item>
                  <el-form-item label="结算时间">
                    <el-text class="mx-1">{{
                      formItem.settlement_time
                    }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务状态">
                    <el-text class="mx-1">{{
                      proxy.$enumSet["statusEnum.TaskEnum"][formItem.status]
                    }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算金额">
                    <el-text class="mx-1">{{
                      formItem.settlement_amount
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">结算回单</span>
            </div>
            <div class="m-t-[20px]">
              <el-row :gutter="50">
                <el-col :span="8">
                  <el-form-item label="结算回单">
                    <a
                      target="_blank"
                      style="color: #356ff3"
                      :href="formItem.payment_receipt"
                      >查看</a
                    >
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getUserInfo } from "@/api/settlementCenter/enterpriseSettlement";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const imageList = ref([]) as any;
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "成员详情",
  },
];
// 查询重置
const pageInfo = reactive({
  page: 1,
  total: 0,
  limit: 20,
});
const handlePageChange = (cur: any) => {
  const { page, limit } = cur;
  pageInfo.page = page;
  pageInfo.limit = limit;
  // getTableData();
};
//表单信息
const formItem = ref({
  account: "",
  bank: "",
  real_name: "",
  idcard: "",
  bank_account: "",
  phone: "",
  address: "",
  task_name: "",
  settlement_time: "",
  status: "",
  settlement_amount: "",
  payment_receipt: [],
}) as any;

const getTableData = async () => {
  try {
    const { data } = await getUserInfo({ id: route.query.id });

    const {
      account,
      bank,
      real_nam,
      idcard,
      bank_account,
      phon,
      address,
      task_name,
      settlement_time,
      status,
      settlement_amount,
      payment_receipt,
    } = data.userInfo;
    formItem.value = {
      account,
      bank,
      real_nam,
      idcard,
      bank_account,
      phon,
      address,
      task_name,
      settlement_time,
      status,
      settlement_amount,
      payment_receipt,
    };
  } catch (error) {
    console.log(error);
  }
};
getTableData();

onMounted(() => {});
</script>
<style lang="scss" scoped>
.tabTop {
  display: flex;
  align-items: center;

  .box {
    width: 4px;
    height: 18px;
    margin-right: 18px;
    background: #356ff3;
    border-radius: 4px;
  }

  .title {
    font-size: 14px;
    font-weight: 500;
    color: #356ff3;
  }
}
</style>
