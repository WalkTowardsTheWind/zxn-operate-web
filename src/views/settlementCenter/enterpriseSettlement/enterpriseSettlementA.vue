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
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">任务信息</span>
          </div>
          <div class="m-t-[20px]">
            <el-form
              :model="formItem"
              inline
              label-width="90px"
              label-position="right"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="任务名称">
                    <el-text class="mx-1">{{ formItem.task_name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="行业">
                    <el-text class="mx-1">{{ formItem.name }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="需求人数">
                    <el-text class="mx-1">{{ formItem.person_count }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="公示周期">
                    <el-text v-if="formItem.open_type == 2" class="mx-1"
                      >{{ formItem.open_start_time }}-{{
                        formItem.open_end_time
                      }}</el-text
                    >
                    <el-text v-else class="mx-1">长期</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="负责人">
                    <el-text class="mx-1">{{ formItem.task_head }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电话">
                    <el-text class="mx-1">{{
                      formItem.task_head_phone
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="任务日期">
                    <el-text v-if="formItem.open_type == 2" class="mx-1">{{
                      formItem.task_date_type
                    }}</el-text>
                    <el-text v-else class="mx-1">--</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务时间">
                    <el-text class="mx-1"
                      >{{ formItem.task_start_time }}-{{
                        formItem.task_end_time
                      }}</el-text
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="薪资待遇">
                    <el-text class="mx-1"
                      >{{ formItem.salary_min }}-{{
                        formItem.salary_max
                      }}</el-text
                    >
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="人员要求">
                    <el-text class="mx-1"
                      >{{ formItem.age_min }}-{{ formItem.age_max }}</el-text
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务地点">
                    <el-text class="mx-1">{{ formItem.address }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="其他要求">
                    <el-text class="mx-1">{{ formItem.require_desc }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="任务描述">
                    <el-text class="mx-1">{{ formItem.task_desc }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">结算信息</span>
          </div>
          <div class="m-t-[20px]">
            <el-form
              :model="formItem"
              label-width="100px"
              label-position="right"
            >
              <el-row :gutter="50">
                <el-col :span="8">
                  <el-form-item label="任务人数">
                    <el-text class="mx-1">{{ formItem.total_people }}</el-text>
                  </el-form-item>
                  <el-form-item label="结算人数">
                    <el-text class="mx-1">{{ formItem.real_people }}</el-text>
                  </el-form-item>
                  <el-form-item label="结算公司">
                    <el-text class="mx-1">{{ formItem.bank }}</el-text>
                  </el-form-item>
                  <el-form-item label="打款账户">
                    <el-text class="mx-1">{{ formItem.bank_account }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算总额">
                    <el-text class="mx-1">{{ formItem.total_money }}</el-text>
                  </el-form-item>
                  <el-form-item label="实际打款">
                    <el-text class="mx-1">{{ formItem.real_money }}</el-text>
                  </el-form-item>
                  <el-form-item label="结算状态">
                    <el-text class="mx-1">{{
                      proxy.$enumSet[
                        "settlementCenterEnum.settlementCenterList"
                      ][formItem.settlement_status]
                    }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结算确认时间">
                    <el-text class="mx-1">{{ formItem.complete_date }}</el-text>
                  </el-form-item>
                  <el-form-item label="打款时间">
                    <el-text class="mx-1">{{
                      formItem.settlement_time
                    }}</el-text>
                  </el-form-item>
                  <el-form-item label="发票状态">
                    <el-text class="mx-1">{{
                      proxy.$enumSet["settlementCenterEnum.invoiceStatusEnum"][
                        formItem.invoice_status
                      ]
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </template>
      <template #2>
        <div class="p-[24px] p-b-[0]">
          <zxn-table
            :table-data="tableData"
            :column-list="columnList"
            :page-info="pageInfo"
            @page-change="handlePageChange"
            :hasSelect="false"
            @selection-change="handleSelect"
            :hasPagination="false"
          >
            <template #status="scope">
              <div
                v-if="scope.row.status == 0"
                v-text="
                  proxy.$enumSet[
                    'settlementCenterEnum.settlementCenterTaskEnum'
                  ][scope.row.status]
                "
                class="zxn-table-label"
                :style="color ? color[scope.row.status] : {}"
              />
              <div
                v-if="scope.row.status == 1"
                v-text="
                  proxy.$enumSet[
                    'settlementCenterEnum.settlementCenterTaskEnum'
                  ][scope.row.status]
                "
                class="zxn-table-label"
                :style="color ? color[scope.row.status] : {}"
              />
              <el-tooltip
                v-if="scope.row.status == 2"
                class="box-item"
                effect="dark"
                placement="top"
              >
                <template #content> {{ scope.row.reason }}</template>
                <div
                  v-text="
                    proxy.$enumSet[
                      'settlementCenterEnum.settlementCenterTaskEnum'
                    ][scope.row.status]
                  "
                  class="zxn-table-label"
                  :style="color ? color[scope.row.status] : {}"
                />
              </el-tooltip>
            </template>

            <template #reason="{ row }">
              {{ row.settlement_status === 2 ? row.reason : "" }}
            </template>
            <template #operation="scope">
              <el-button link type="primary" @click="handleInspect(scope)"
                >查看回单</el-button
              >
              <el-button link type="primary" @click="handleDetails(scope)"
                >详情</el-button
              >
            </template>
          </zxn-table>
        </div>
      </template>
      <template #3>
        <div class="p-[24px] p-b-[0]">
          <div class="p-[24px] p-l-[53px] p-b-[0]">
            <div class="tabTop m-t-[20px]">
              <div class="box"></div>
              <span class="title">验收凭证</span>
            </div>
            <div class="m-t-[20px]">
              <picture-preview
                :imageList="formItem.check_url"
              ></picture-preview>
            </div>
          </div>
        </div>
      </template>
    </zxn-tabs>
    <InspectDialog
      v-model:dialogVisible="dialogVisible"
      :imageList="imageList"
    />
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import InspectDialog from "../components/InspectDialog.vue";
import { getTaskDetails } from "@/api/settlementCenter/enterpriseSettlement";
const { proxy } = getCurrentInstance() as any;
const route = useRoute();
const router = useRouter();
const dialogVisible = ref(false);
const imageList = ref([]) as any;
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "任务详情",
  },
  {
    name: "2",
    label: "任务成员",
  },
  // {
  //   name: "3",
  //   label: "验收凭证",
  // },
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
  getTableData();
};
//表单信息
const formItem = ref({
  task_name: "",
  name: "",
  person_count: "",
  open_type: "",
  open_start_time: "",
  open_end_time: "",
  task_head: "",
  task_head_phone: "",
  task_date_type: "",
  task_start_time: "",
  task_end_time: "",
  salary_min: "",
  salary_max: "",
  age_min: "",
  age_max: "",
  address: "",
  require_desc: "",
  task_desc: "",
  total_people: "",
  real_people: "",
  bank: "",
  bank_account: "",
  total_money: "",
  real_money: "",
  settlement_status: "",
  complete_date: "",
  settlement_time: "",
  invoice_status: "",
  // check_url: [],
}) as any;
//

const tableData = reactive([]);
const color = {
  0: { color: "#1AB66B", backgroundColor: "#DAF3E7" },
  1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
  2: { color: "#333333", backgroundColor: "#DEDEDE" },
};
const columnList = [
  { label: "账户ID", prop: "account" },
  // { label: "结算状态", slot: "status", width: 100, headerAlign: "left" },
  {
    label: "结算状态",
    type: "enum",
    width: 100,
    path: "settlementCenterEnum.settlementCenterTaskEnum",
    prop: "settlement_status",
    // fixed: "left",
    color: {
      0: { color: "#1AB66B", backgroundColor: "#DAF3E7" },
      1: { color: "#366FF4", backgroundColor: "#DFE8FD" },
      2: { color: "#333333", backgroundColor: "#DEDEDE" },
    },
  },
  { label: "姓名", prop: "real_name" },
  { label: "联系号码", prop: "phone" },
  { label: "收款银行", prop: "bank" },
  { label: "银行账户", prop: "bank_account" },
  { label: "下发时间", prop: "settlement_time" },
  { label: "结算金额", prop: "settlement_amount" },
  { label: "失败原因", slot: "reason", minWidth: 200 },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 200,
    align: "right",
    headerAlign: "right",
  },
];
// 操作
const handleInspect = (scope: any) => {
  window.open(scope.row.payment_receipt, "_blank");
};
const handleDetails = (scope: any) => {
  router.push({
    name: "memberDetails",
    query: { id: scope.row.id },
  });
};

/**
 * 批量选择
 */
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};

const getTableData = async () => {
  try {
    const { data } = await getTaskDetails({ id: route.query.task_id });
    console.log(data, "getTaskDetails");

    const {
      task_name,
      name,
      person_count,
      open_type,
      open_start_time,
      open_end_time,
      task_head,
      task_head_phone,
      task_date_type,
      task_start_time,
      task_end_time,
      salary_min,
      salary_max,
      age_min,
      age_max,
      address,
      require_desc,
      task_desc,
      total_people,
      real_people,
      bank,
      bank_account,
      total_money,
      real_money,
      settlement_status,
      complete_date,
      settlement_time,
      invoice_status,
    } = data;
    formItem.value = {
      task_name,
      name,
      person_count,
      open_type,
      open_start_time,
      open_end_time,
      task_head,
      task_head_phone,
      task_date_type,
      task_start_time,
      task_end_time,
      salary_min,
      salary_max,
      age_min,
      age_max,
      address,
      require_desc,
      task_desc,
      total_people,
      real_people,
      bank,
      bank_account,
      total_money,
      real_money,
      settlement_status,
      complete_date,
      settlement_time,
      invoice_status,
    };
    const newData = data.userList.map((item: any) => {
      return {
        id: item.id,
        account: item.account,
        settlement_status: item.settlement_status,
        real_name: item.real_name,
        phone: item.phone,
        bank: item.bank,
        bank_account: item.bank_account,
        settlement_time: item.settlement_time,
        settlement_amount: item.settlement_amount,
        payment_receipt: item.payment_receipt,
        reason: item.reason,
      };
    });
    tableData.length = 0;

    tableData.push(...newData);
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
