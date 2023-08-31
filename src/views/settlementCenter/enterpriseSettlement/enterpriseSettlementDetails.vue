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
          <div class="tabTop">
            <div class="box"></div>
            <span class="title">结算详情</span>
          </div>
          <div class="top m-t-[20px]">
            <!-- <span class="title">结算单号</span> -->
            <el-text
              >结算单号&nbsp;&nbsp;{{ formItem.settlement_order_no }}</el-text
            >
          </div>
          <div class="tabTop m-t-[20px]">
            <div class="box"></div>
            <span class="title">企业信息</span>
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
                  <el-form-item label="企业名称">
                    <el-text class="mx-1">{{ formItem.company_name }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="企业账户ID">
                    <el-text class="mx-1">{{ formItem.account }}</el-text>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="统一社会信用代码" label-width="140px">
                    <el-text class="mx-1">{{ formItem.credit_code }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="法人">
                    <el-text class="mx-1">{{ formItem.legal_person }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系人">
                    <el-text class="mx-1">{{ formItem.contacts }}</el-text>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系方式" label-width="140px">
                    <el-text class="mx-1">{{
                      formItem.contacts_mobile
                    }}</el-text>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="企业地址">
                    <el-text class="mx-1">{{
                      formItem.company_address
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
            <template #download="scope">
              <el-button link type="primary" @click="handleDownload(scope)"
                >下载</el-button
              >
            </template>
            <template #operation="scope">
              <el-button link type="primary" @click="handleInspect(scope)"
                >查看</el-button
              >
            </template>
          </zxn-table>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import {
  getTaskList,
  getEnterpriseSettlementDetails,
} from "@/api/settlementCenter/enterpriseSettlement";
const route = useRoute();
const router = useRouter();
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "结算详情",
  },
  {
    name: "2",
    label: "结算任务列表",
  },
];

const handleInspect = (scope: any) => {
  router.push({
    name: "enterpriseSettlementA",
    query: { activeName: "1", task_id: scope.row.id },
  });
};
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
  id: "",
  settlement_order_no: "",
  company_name: "",
  company_id: "",
  account: "",
  tax_land_id: "",
  credit_code: "",
  legal_person: "",
  contacts: "",
  contacts_mobile: "",
  company_address: "",
});
//
const tableData = reactive([] as any);
const columnList = [
  { label: "任务编号", prop: "task_no", width: 200 },
  { label: "任务名称", prop: "task_name" },
  { label: "需求人数", prop: "person_count" },
  { label: "预算", prop: "salary" },
  { label: "申请时间", prop: "apply_time" },
  // { label: "下载回单", slot: "download" },
  {
    label: "任务详情",
    slot: "operation",
    width: 80,
    headerAlign: "right",
    fixed: "right",
  },
];
/**
 * 批量选择
 */
//选中的数据
//返回id数组
const selectionData = ref([]);
const handleSelect = (data: any) => {
  selectionData.value = data.map((item: any) => item.id);
};

/**
 * 获取数据
 */
const getTableData = async () => {
  const ID = Number(route.query.id);
  await getEnterpriseSettlementDetails(ID)
    .then((response) => {
      const {
        id,
        settlement_order_no,
        company_name,
        company_id,
        account,
        tax_land_id,
        credit_code,
        legal_person,
        contacts,
        contacts_mobile,
        company_address,
      } = response.data.info;
      formItem.value = {
        id,
        settlement_order_no,
        company_name,
        company_id,
        account,
        tax_land_id,
        credit_code,
        legal_person,
        contacts,
        contacts_mobile,
        company_address,
      };
    })
    .catch();
  const params = {
    settlement_id: formItem.value.id,
  } as any;
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  console.log(params);

  try {
    const { data } = await getTaskList(params);
    tableData.length = 0;
    // pageInfo.page = data.list.current_page;
    // pageInfo.total = data.list.total;
    console.log(data, "wewewewewe");

    var newData = data.map((item: any) => {
      return {
        id: item.id,
        task_no: item.task_no,
        task_name: item.task_name,
        task_id: item.id,
        person_count: item.person_count,
        salary: item.salary_min + "-" + item.salary_max,
        apply_time: item.apply_time,
        task_user: item.task_user,
      };
    });
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
