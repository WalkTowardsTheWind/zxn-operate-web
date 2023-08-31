<template>
  <zxn-plan>
    <zxn-tabs
      activeName="role"
      :tabsList="[{ label: '角色管理', name: 'role' }]"
      hasUpdate
    />
    <div class="p-[24px] p-b-[0]">
      <!--      <zxn-search-->
      <!--        :formItem="formItem"-->
      <!--        @on-search="handleSearch"-->
      <!--        @on-reset="handleSearch"-->
      <!--      >-->
      <!--        <el-form-item prop="role_name">-->
      <!--          <el-input v-model="formItem.role_name" placeholder="请输入关键字">-->
      <!--            <template #prefix>-->
      <!--              <el-icon><i-ep-Search /></el-icon>-->
      <!--            </template>-->
      <!--          </el-input>-->
      <!--        </el-form-item>-->
      <!--      </zxn-search>-->
      <zxn-table
        ref="table"
        :table-data="tableData"
        :column-list="columnList"
        hasSelect
        :loading="loading"
        :hasPagination="false"
      >
        <template #tableTop>
          <div class="flex justify-between">
            <div>
              <el-button type="primary" class="mr-[8px]" @click="handleAdd"
                >+ 新建</el-button
              >
              <el-dropdown
                trigger="click"
                @command="(instar) => handleCommand(instar)"
              >
                <el-button type="primary" plain>批量操作</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="reject">停用</el-dropdown-item>
                    <el-dropdown-item command="fulfill">启用</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="">
              <el-input
                v-model="formItem.role_name"
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
          <el-button
            link
            type="primary"
            @click="handleCommand(row.status ? 'reject' : 'fulfill', row.id)"
          >
            {{ row.status ? "停用" : "启用" }}
          </el-button>
          <el-button link type="primary" @click="handleEdit(row.id)"
            >编辑</el-button
          >
          <el-button link type="primary" @click="handleRemove(row.id)"
            >删除</el-button
          >
        </template>
      </zxn-table>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import { getRolePage, removeRole, setRoleStatus } from "@/api/system";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const formItem = reactive({
  role_name: "",
});
const tableData = reactive([]);
const columnList = [
  { label: "角色名称", prop: "role_name", minWidth: 120 },
  {
    label: "功能权限",
    prop: "rules",
    showOverflowTooltip: true,
    minWidth: 150,
  },
  { label: "账号数量", minWidth: 120 },
  {
    label: "状态",
    prop: "status",
    path: "system.roleType",
    type: "enum",
    minWidth: 120,
  },
  { label: "创建时间", prop: "update_time", width: 180 },
  { label: "操作", slot: "operation", fixed: "right", width: 150 },
];
const handleSearch = () => {
  getList();
};
const loading = ref(false);
const getList = async () => {
  const params = { ...formItem };
  loading.value = true;
  try {
    const { data } = await getRolePage(params);
    loading.value = false;
    tableData.length = 0;
    tableData.push(...data.list);
    console.log(tableData);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
const handleAdd = () => {
  router.push({ name: "addRole" });
};
const handleRemove = async (id) => {
  ElMessageBox({
    title: "",
    message: h("p", null, `确定删除该角色`),
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
          await removeRole(id);
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
const table = ref();
const handleCommand = async (instar: "reject" | "fulfill", id) => {
  const selected = table.value.getSelectionRows();
  const ids = id ? [id] : selected.map((it) => it.id);
  if (!ids.length) {
    return ElMessage({
      type: "error",
      message: `请选择数据`,
    });
  }
  ElMessageBox({
    title: "",
    message: h("p", null, `确定${instar === "reject" ? "停用" : "启用"}该任务`),
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
        const params = {
          ids,
          status: instar === "reject" ? 0 : 1,
        };
        await setRoleStatus(params);
        instance.confirmButtonLoading = false;
        done();
      } else {
        done();
      }
    },
  }).then(() => {
    ElMessage({
      type: "success",
      message: `${instar === "reject" ? "停用" : "启用"}成功`,
    });
    getList();
  });
};
const handleEdit = (id) => {
  router.push({ name: "editRole", params: { id } });
};
onMounted(() => {
  getList();
});
</script>
