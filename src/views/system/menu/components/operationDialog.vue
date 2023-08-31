<template>
  <el-dialog
    v-model="visible"
    @close="handleClose"
    class="zxn-dialog"
    :title="id ? '编辑菜单' : '新增菜单'"
    width="452"
  >
    <el-form
      ref="form"
      :model="formItem"
      label-width="90"
      class="pr-40px"
      :rules="rules"
    >
      <el-form-item label="菜单名称" prop="menu_name">
        <el-input v-model="formItem.menu_name" />
      </el-form-item>
      <el-form-item label="上级分类" prop="pid">
        <el-tree-select
          v-model="formItem.pid"
          :data="treeMenu"
          check-strictly
          :render-after-expand="false"
          :props="{ label: 'menu_name' }"
          clearable
          class="w-100%"
        >
        </el-tree-select>
      </el-form-item>
      <el-form-item label="类型" prop="auth_type">
        <el-select v-model="formItem.auth_type" class="w-100%">
          <el-option
            v-for="item in proxy.$const['system.authType']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <template v-if="formItem.auth_type === '1'">
        <el-form-item label="节点路由" prop="menu_path">
          <el-input v-model="formItem.menu_path" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="formItem.path">
            <template #prepend>src/views/</template>
            <template #append>.vue</template>
          </el-input>
        </el-form-item>
        <el-form-item label="路由name" prop="module">
          <el-input v-model="formItem.module" />
        </el-form-item>
        <el-form-item label="是否菜单" prop="is_header">
          <zxn-button-group
            v-model="formItem.is_header"
            :options="proxy.$const['system.yesOrNo']"
          />
        </el-form-item>
        <el-form-item label="是否缓存" prop="cache">
          <zxn-button-group
            v-model="formItem.cache"
            :options="proxy.$const['system.yesOrNo']"
          />
        </el-form-item>
        <el-form-item
          label="图标"
          prop="icon"
          v-if="formItem.is_header === '1'"
        >
          <!-- 图标选择器 -->
          <icon-select v-model="formItem.icon" />
        </el-form-item>
      </template>
      <template v-if="formItem.auth_type === '2'">
        <el-form-item label="api" prop="api_url">
          <el-input v-model="formItem.api_url" />
        </el-form-item>
        <el-form-item label="请求类型" prop="methods">
          <el-input v-model="formItem.methods" />
        </el-form-item>
      </template>
      <el-form-item label="">
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          确定
        </el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import type { FormRules } from "element-plus";
import { setMenus, editMenus } from "@/api/system";
import { ElMessage } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
const { proxy } = getCurrentInstance() as any;
const emits = defineEmits(["on-update"]);
let visible = ref(false);
const rules = reactive<FormRules>({
  express_id: [
    { required: true, message: "请选择物流公司", trigger: "change" },
  ],
  express_no: [
    { required: true, message: "请输入物流单号", trigger: "change" },
  ],
});
const formItem = reactive({
  menu_name: "",
  pid: "",
  auth_type: "",
  menu_path: "",
  path: "",
  icon: "",
  module: "",
  is_header: "1",
  cache: "0",
  api_url: "",
  methods: "",
});
const treeMenu = reactive([]);
let id = null;
const init = (treeData: any, detail): void => {
  visible.value = true;
  nextTick(() => {
    treeMenu.length = 0;
    treeMenu.push(...treeData);
    if (detail) {
      id = detail.id;
      formItem.menu_name = detail.menu_name;
      formItem.pid = detail.pid || "";
      formItem.auth_type = detail.auth_type + "";
      formItem.menu_path = detail.menu_path;
      formItem.path = detail.path;
      formItem.is_header = detail.is_header + "";
      formItem.cache = detail.cache;
      formItem.api_url = detail.api_url;
      formItem.methods = detail.methods;
      formItem.module = detail.module;
      formItem.icon = detail.icon;
    }
  });
};
const loading = ref(false);
const form = ref();
const handleSubmit = async () => {
  const params = { ...formItem };
  loading.value = true;
  try {
    id ? await editMenus(params, id) : await setMenus(params);
    loading.value = false;
    ElMessage({
      type: "success",
      message: `新增成功`,
    });
    visible.value = false;
    emits("on-update");
  } catch (e) {
    loading.value = false;
  }
};
const handleCancel = () => {
  visible.value = false;
};
const handleClose = () => {
  id = null;
  console.log(2222);
  // formItem
  form.value.resetFields();
};
onMounted(() => {});
defineExpose({
  init,
});
</script>
