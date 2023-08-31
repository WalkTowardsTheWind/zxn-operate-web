<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList">
      <template #1>
        <div class="p-x-[24px]">
          <div class="m-y-[30px]">
            <span>企业名称</span>
            <span class="m-x-[20px]"> {{ name }}</span>
            <span>企业账户ID</span>
            <span class="m-x-[20px]"> {{ id }}</span>
          </div>
          <div>
            <div class="title">
              <div class="line"></div>
              <div class="m-l-[10px]">充值明细</div>
            </div>
            <zxn-table
              :table-data="tableData1"
              :column-list="columnList1"
              :page-info="pageInfo1"
            >
              <template #certificate="scope">
                <el-image
                  v-if="scope.row.certificate.length"
                  style="width: 30px; height: 30px"
                  :src="scope.row.certificate[0]"
                  :zoom-rate="1.2"
                  :preview-src-list="scope.row.certificate"
                  fit="contain"
                  :z-index="999"
                  :preview-teleported="true"
                />
                <span v-else>--</span>
                <!-- <el-button link @click="toSee(scope.row.certificate)">查看</el-button> -->
              </template>
            </zxn-table>
          </div>
          <div>
            <div class="title">
              <div class="line"></div>
              <div class="m-l-[10px]">企业结算明细</div>
            </div>
            <zxn-table
              :table-data="tableData2"
              :column-list="columnList2"
              :page-info="pageInfo2"
            >
              <!-- <template #certificate="scope">
								<el-button link @click="toSee(scope.row.certificate)">查看</el-button>
							</template> -->
            </zxn-table>
          </div>
        </div>
      </template>
    </zxn-tabs>
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessDetail } from "@/api/money";
import { useRoute } from "vue-router";

const route = useRoute();

const id = ref();
const name = ref();

if (route.query.id) {
  id.value = route.query.id;
}
if (route.query.name) {
  name.value = route.query.name;
}

const tabsList = ref([
  {
    name: "1",
    label: "企业明细",
  },
]);

const activeName = ref("1");

const tableData1 = reactive([] as any);
const columnList1 = [
  { label: "充值单号", prop: "recharge_order_no" },
  { label: "企业名称", prop: "company_name" },
  { label: "行业", prop: "category" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "税地账户", prop: "bank_account" },
  { label: "充值额度", prop: "amount" },
  { label: "充值时间", prop: "add_time" },
  { label: "充值凭证", slot: "certificate" },
];
const tableData2 = reactive([] as any);

const columnList2 = [
  { label: "充值单号", prop: "recharge_order_no" },
  { label: "企业名称", prop: "company_name" },
  { label: "行业", prop: "category" },
  { label: "税源地", prop: "tax_land_name" },
  { label: "税地账户", prop: "bank_account" },
  { label: "充值额度", prop: "amount" },
  { label: "充值时间", prop: "add_time" },
  { label: "充值凭证", slot: "certificate" },
];

const pageInfo1 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const pageInfo2 = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const toSee = (url: string) => {
  console.log(url);
};

function getList() {
  getBusinessDetail({ id: id.value }).then((res) => {
    console.log(res);
    tableData1.length = 0;
    tableData1.push(...res.data.data);
    console.log(tableData1);
    pageInfo1.total = res.data.total;
  });
}

getList();
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #356ff3;

  .line {
    width: 4px;
    height: 14px;
    background: #356ff3;
    border-radius: 2px;
  }
}
</style>
