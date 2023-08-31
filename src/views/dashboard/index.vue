<template>
  <div class="dashboard-container">
    <div class="dashboard-container-statistics">
      <div
        class="dashboard-container-statistics-item"
        v-for="item in statisticsList"
        :key="item.title"
        @click="handleView(item)"
      >
        <div class="dashboard-container-statistics-item-icon">
          <img :src="item.img" alt="" />
        </div>
        <div class="dashboard-container-statistics-item-info">
          <span class="dashboard-container-statistics-item-info-title">
            {{ item.title }}
          </span>
          <span class="dashboard-container-statistics-item-info-count">
            {{ item.count }}
          </span>
        </div>
      </div>
    </div>
    <el-row class="mt-30px" gutter="16">
      <el-col :span="16">
        <div class="flex">
          <risk-ring />
          <div class="w-16px"></div>
          <industry-ring :chartData="industryEcharts" />
        </div>
        <el-row class="w-100%">
          <bar-chart height="400px" width="100%" />
        </el-row>
      </el-col>
      <el-col :span="8">
        <convenient-entry />
        <notice-message />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import ConvenientEntry from "./components/ConvenientEntry.vue";
import RiskRing from "./components/RiskRing.vue";
import IndustryRing from "./components/IndustryRing.vue";
import BarChart from "./components/BarChart.vue";
import NoticeMessage from "./components/NoticeMessage.vue";
import { workbench } from "@/api/dashboard";
import { getPercentValue } from "@/utils";
import { useRouter } from "vue-router";
import { useRouteParams } from "@/store/modules/routeParams";
const router = useRouter();
const statisticsList: any[] = reactive([]);
const industryEcharts = ref([]);
const initData = async () => {
  const { data } = await workbench();
  console.log(data);
  statisticsList.push(
    {
      title: "待审核任务",
      count: data.task_count || 0,
      img: new URL(`@/assets/icons-jpg/banner2.png`, import.meta.url).href,
    },
    {
      title: "充值订单",
      count: data.finance_recharge_count || 0,
      img: new URL(`@/assets/icons-jpg/banner3.png`, import.meta.url).href,
    },
    {
      title: "结算订单",
      count: data.finance_settlement_company_count || 0,
      img: new URL(`@/assets/icons-jpg/banner4.png`, import.meta.url).href,
    },
    {
      title: "开票申请",
      count: data.invoice_count || 0,
      img: new URL(`@/assets/icons-jpg/banner5.png`, import.meta.url).href,
    },
    {
      title: "异常数据",
      count: 0,
      img: new URL(`@/assets/icons-jpg/banner1.png`, import.meta.url).href,
    }
  );
  const numList = data.company_category.map((it) => it.num);
  industryEcharts.value = data.company_category.map((it, index) => ({
    value: it.num,
    name: it.label || `ssss${index}`,
    rate: getPercentValue(numList, index, 2),
  }));
};
const handleView = (item) => {
  const routerMap = {
    待审核任务: "taskManagerIndex",
    充值订单: "recharge-center",
    结算订单: "settlementCenter",
    开票申请: "invoiceManager",
    异常数据: "Dashboard",
  };
  if (item.title === "开票申请") {
    const { pushParams } = useRouteParams();
    pushParams("invoiceManager", { status: 0 });
  }
  router.push({ name: routerMap[item.title] });
};
onMounted(() => {
  initData();
});
</script>
<style lang="scss">
.dashboard-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
</style>
<style lang="scss" scoped>
.dashboard-container {
  padding: 16px 24px;

  &-statistics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-item {
      display: flex;
      align-items: center;
      width: calc((100% - 64px) / 5);
      min-width: 192px;
      height: 104px;
      padding-left: 26px;
      cursor: pointer;
      background: #fff;
      border-radius: 4px;

      &-icon {
        width: 37px;
        height: 37px;
        overflow: hidden;
        background: #fff linear-gradient(#366ff3 0%, #36c5f3 0%);
        border-radius: 50%;

        > img {
          width: 37px;
          height: 37px;
        }
      }

      &-info {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        &-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        &-count {
          font-size: 28px;
          font-weight: bold;
          color: #356ff3;
        }
      }
    }
  }
}
</style>
