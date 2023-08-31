<template>
  <zxn-plan>
    <zxn-tabs v-model:activeName="activeName" :tabsList="tabsList" hasUpdate />
    <div class="p-[24px] p-b-[0]">
      <zxn-table
        ref="taskTable"
        :table-data="tableData"
        :column-list="columnList"
        :hasPagination="false"
        rowKey="id"
        :loading="loading"
      >
        <template #tableTop>
          <div class="menu-search">
            <el-button type="primary" @click="handleAdd">+ 新建</el-button>
            <div class="menu-search-input">
              <el-input
                v-model="formItem.keyword"
                class="w-344px mr-16px"
                placeholder="请输入关键字"
              >
                <template #prefix>
                  <el-icon><i-ep-Search /></el-icon>
                </template>
              </el-input>
              <el-button type="primary" @click="handleSearch">查询</el-button>
            </div>
          </div>
        </template>
        <template #operation="{ row }">
          <el-button link type="primary" @click="handleDetail(row.id)"
            >编辑</el-button
          >
          <el-button link type="primary" @click="handleRemove(row.id)"
            >删除</el-button
          >
        </template>
      </zxn-table>
    </div>
    <operation-dialog ref="operationDialogRef" @on-update="getList" />
  </zxn-plan>
</template>
<script lang="ts" setup>
import operationDialog from "./components/operationDialog.vue";
import { menusIndex, removeMenu, menusView } from "@/api/system";
import { ElMessage } from "element-plus";
const activeName = "menu";
const tabsList = [
  {
    name: "menu",
    label: "菜单管理",
  },
];
const columnList = [
  { label: "菜单名称", prop: "menu_name", minWidth: 140 },
  {
    label: "类型",
    prop: "auth_type",
    minWidth: 120,
    path: "system.authType",
    type: "enum",
  },
  { label: "节点路由", prop: "menu_path", minWidth: 140 },
  { label: "文件路径", prop: "path" },
  { label: "更新时间", prop: "category_name", minWidth: 80 },
  {
    label: "操作",
    slot: "operation",
    fixed: "right",
    width: 190,
    align: "right",
  },
];
const handleSearch = () => {
  getList();
};
const formItem = reactive({
  keyword: "",
});
const tableData = reactive([]);
const loading = ref(false);
const getList = async () => {
  const params = { ...formItem };
  loading.value = true;
  try {
    const { data } = await menusIndex(params);
    loading.value = false;
    tableData.length = 0;
    tableData.push(...data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
const operationDialogRef = ref();
const handleAdd = () => {
  const treeMenu = filterFatherMenu(tableData);
  operationDialogRef.value.init(treeMenu);
};

const handleDetail = async (id) => {
  const { data } = await menusView(id);
  const treeMenu = filterFatherMenu(tableData);
  operationDialogRef.value.init(treeMenu, data);
};
const filterFatherMenu = (menu) => {
  return menu.filter((it) => {
    it.value = it.id;
    if (it.children && it.children.length) {
      it.children = filterFatherMenu(it.children);
    } else {
      it.children = [];
    }
    return it.auth_type === 1;
  });
};
const handleRemove = async (id) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定删除该目录`),
    showCancelButton: true,
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    beforeClose: async (
      action: string,
      instance: { confirmButtonLoading: boolean },
      done: () => void
    ) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        try {
          await removeMenu(id);
          instance.confirmButtonLoading = false;
          done();
        } catch (e) {
          instance.confirmButtonLoading = false;
        }
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `删除成功`,
    });
    getList();
  });
};
onMounted(() => {
  getList();
});
</script>
<style lang="scss" scoped>
.menu-search {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-input {
    display: flex;
  }
}
</style>
