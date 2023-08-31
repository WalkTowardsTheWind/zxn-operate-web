<template>
  <div class="p-[24px]">
    <div class="top">
      <div class="left">
        <el-button type="primary" @click="add">+ 新建</el-button>
      </div>
      <div class="right">
        <el-input
          placeholder="请输入关键字"
          v-model="searchForm.name"
          clearable
        />
        <el-button type="primary" @click="searchClick">查询</el-button>
        <el-button type="info" @click="resetSearchForm">重置</el-button>
      </div>
    </div>
    <div class="">
      <el-table
        class="zxn-table"
        v-loading="loading"
        :data="tableData"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="编号" prop="id" width="150" />
        <el-table-column label="状态" width="180">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              inline-prompt
              style="--el-switch-on-color: #366ff4; --el-switch-off-color: #999"
              active-text="启用"
              inactive-text="关闭"
              size="large"
              @change="changeStatus(scope.row.id, scope.row.status)"
            />
          </template>
        </el-table-column>
        <el-table-column label="行业分类名称" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="add_time"></el-table-column>
        <el-table-column label="操作" fixed="right" align="left">
          <template #default="scope">
            <el-button
              v-if="scope.row.level !== 3"
              link
              small
              type="primary"
              @click="addSub(scope.row)"
              >添加下级</el-button
            >
            <el-button link small type="primary" @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button link small type="primary" @click="del(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <!-- 弹框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="452"
    :close-on-click-modal="false"
  >
    <!-- 新增 -->
    <el-form :form="addForm">
      <template v-if="dialogType === 'add'">
        <el-form-item label="类别名称">
          <el-input v-model="addForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="上级分类">
          <tree-select v-model.selecVal="addForm.parent" :options="options" />
        </el-form-item>
      </template>
      <!-- 编辑 -->
      <template v-if="dialogType === 'edit'">
        <el-form-item label="类别名称">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="上级分类">
          <tree-select v-model.selecVal="addForm.parent" :options="options" />
        </el-form-item>
      </template>

      <!-- 添加下级 -->
      <template v-if="dialogType === 'addSub'">
        <el-form-item label="类别名称">
          <el-input v-model="addForm.name" />
        </el-form-item>
      </template>
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="addSumbit">确认</el-button>
      <el-button type="info" @click="closeDialog">取消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  getCategoryList,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoryTreeList,
  updateCategoryStatus,
} from "@/api/category";

import treeSelect from "./tree-select.vue";

const loading = ref(false);
const tableData = reactive([] as any);
const dialogType = ref("");
const dialogVisible = ref(false);
const dialogTitle = ref("");
const addForm = ref({
  name: "",
  parent: "",
  pid: "",
  id: "",
});
const options = ref([] as any);

const searchForm = reactive({
  name: "",
  type: "0", // 0= 行业类目，2= 开票类目, 3= 岗位类目
  status: "",
});
/**
 * 新增
 */
function add() {
  dialogTitle.value = "新增分类";
  dialogVisible.value = true;
  dialogType.value = "add";
  resetForm();
}

/**
 * 添加下级
 */
function addSub(item: any) {
  // （添加下级的时候，pid直接是选中行的id）
  dialogTitle.value = "添加下级分类";
  dialogVisible.value = true;
  dialogType.value = "addSub";
  addForm.value.pid = item.id;
}

/**
 * 编辑
 */
function edit(item: any) {
  dialogTitle.value = "编辑分类";
  dialogVisible.value = true;
  dialogType.value = "edit";

  addForm.value.name = item.name;
  addForm.value.pid = item.pid;
  addForm.value.id = item.id;
}

function getOptions() {
  getCategoryTreeList({ type: "0" })
    .then((res) => {
      options.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * 删除
 */
function del(id: string) {
  ElMessageBox.confirm("是否删除?", "", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    center: true,
  })
    .then(() => {
      deleteCategory(id).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        searchClick();
        getOptions();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
}

/**
 * 关闭弹窗
 */
function closeDialog() {
  dialogVisible.value = false;
  resetForm();
}

/**
 * 重置表单
 */
function resetForm() {
  addForm.value.name = "";
  addForm.value.parent = "";
}

/**
 * 查询
 */
async function searchClick() {
  tableData.length = 0;
  const res = await getCategoryList({
    name: searchForm.name,
    type: searchForm.type,
  });
  tableData.push(...res.data);
}

/**
 * 清空查询
 */
function resetSearchForm() {
  searchForm.name = "";
  searchClick();
}

/**
 * 确认
 */
async function addSumbit() {
  if (dialogType.value == "add") {
    let params = {
      name: addForm.value.name,
      pid: "",
      type: "0",
      status: "1",
    };
    if (addForm.value.parent) {
      params.pid = addForm.value.parent;
    }
    // console.log(params);
    createCategory(params)
      .then((res) => {
        console.log(res);
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        dialogVisible.value = false;
        searchClick();
        getOptions();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (dialogType.value == "addSub") {
    console.log(addForm.value);
    let params = {
      name: addForm.value.name,
      pid: addForm.value.pid,
      type: "0",
      status: "1",
    };
    createCategory(params)
      .then((res) => {
        console.log(res);
        ElMessage({
          message: "添加成功",
          type: "success",
        });
        dialogVisible.value = false;
        searchClick();
        getOptions();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (dialogType.value == "edit") {
    let params = {
      name: addForm.value.name,
      pid: addForm.value.parent,
      id: addForm.value.id,
    };
    updateCategory(params)
      .then((res) => {
        console.log(res);
        ElMessage({
          type: "success",
          message: "编辑成功",
        });
        dialogVisible.value = false;
        searchClick();
        getOptions();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/**
 * 类目状态修改
 */
function changeStatus(id: string, status: string) {
  updateCategoryStatus({ id, status })
    .then(() => {
      ElMessage({
        message: "修改成功",
        type: "success",
      });
      searchClick();
    })
    .catch((err) => {
      return new Error(err);
    });
}

searchClick();
getOptions();
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  .right {
    display: flex;

    .el-input {
      width: 344px;
      margin-right: 16px;
    }
  }
}

.btn {
  display: flex;
  justify-content: center;
}
</style>
