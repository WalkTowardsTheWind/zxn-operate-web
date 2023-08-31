<template>
  <zxn-plan>
    <el-form-item label="合同照片" label-width="120px">
      <PicturePreview v-if="license.length" :image-list="license" />
      <span v-else>--</span>
    </el-form-item>
    <!-- <zxn-table
      :table-data="tableData"
      :column-list="columnList"
      :page-info="pageInfo"
      @page-change="pageChange"
    >
      <template #contract_kind="scope" v-if="isEdit">
        <span>{{ contract_kind[scope.row.contract_kind] }}</span>
      </template>
      <template #status="scope">
        <span>{{ status[scope.row.status] }}</span>
      </template>
      <template #online_type="scope">
        <span>{{ online_type[scope.row.online_type] }}</span>
      </template>
      <template #operation="scope">
        <el-button v-if="scope" link type="primary">编辑</el-button>
        <el-button link type="primary">删除</el-button>
        <el-button link type="primary">下载</el-button>
        <el-button link type="primary">详情</el-button>
      </template>
    </zxn-table> -->
  </zxn-plan>
</template>

<script lang="ts" setup>
import { getBusinessAccountContractList } from "@/api/account/business";

enum status {
  "正常",
  "过期",
  "停用",
}

enum contract_kind {
  "业务拓展协议(个人)" = 1,
  "业务拓展协议(企业)",
  "共享经济服务协议",
  "自由职业者服务协议",
}

enum online_type {
  "线上",
  "线下",
}
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: () => false,
  },
  id: {
    default: () => "",
  },
});

const license = ref([] as any);

function pageChange(current: any) {
  const { page, limit } = current;
  pageInfo.limit = limit;
  pageInfo.page = page;
  getList();
}

const searchForm = reactive({
  company_id: "",
  keywords: "",
});

const pageInfo = reactive({
  page: 1,
  limit: 20,
  total: 0,
});
const tableData = ref([] as any);

const columnList = [
  { label: "合同编号", prop: "contract_no", width: 80 },
  {
    label: "合同类型",
    prop: "contract_kind",
    slot: "contract_kind",
    width: 200,
  },
  {
    label: "状态",
    prop: "status",
    slot: "status",
  },
  { label: "签署形式", prop: "online_type", slot: "online_type" },
  { label: "甲方", prop: "party_a" },
  { label: "乙方", prop: "party_b" },
  { label: "签约点位", prop: "tax_location" },
  { label: "签约时间", prop: "sign_time" },
  // { label: "操作", slot: "operation", fixed: "right", width: 250 },
];

/**
 * 获取列表
 */
async function getList() {
  if (props.id) {
    searchForm.company_id = props.id;
    let params = {
      ...searchForm,
    };
    const res = await getBusinessAccountContractList(params);
    console.log(res);
    license.value.length = 0;
    license.value.push(...res.data.data);
  }
}

getList();
</script>
