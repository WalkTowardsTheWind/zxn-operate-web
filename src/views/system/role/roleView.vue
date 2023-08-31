<template>
  <zxn-plan has-bottom class="role-view">
    <zxn-tabs
      :tabsList="[{ name: 'role', label: '新增角色' }]"
      active-name="role"
      has-back
    />
    <div class="mt-10px pl-40px">
      <el-form
        ref="form"
        label-width="70px"
        hide-required-asterisk
        :model="formItem"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="角色名称" prop="role_name">
              <el-input v-model="formItem.role_name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--        <zxn-title>地区</zxn-title>-->
        <!--        <el-row class="mt-16px">-->
        <!--          <el-col :span="24">-->
        <!--            <el-form-item label="" label-width="0" prop="area">-->
        <!--              <area-select-->
        <!--                v-model="formItem.area"-->
        <!--                :area-list="areaList as []"-->
        <!--              />-->
        <!--            </el-form-item>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
        <zxn-title>功能权限</zxn-title>
        <el-row>
          <el-col :span="24">
            <el-form-item label="" prop="checked_menus" label-width="0">
              <role-select
                :role-list="roleList"
                @select-change="handleSelect"
                @on-change="handleSelectChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <zxn-bottom-btn>
      <el-button type="primary" :loading="loading" @click="handleSubmit"
        >保存</el-button
      >
      <el-button @click="handleCancel">取消</el-button>
    </zxn-bottom-btn>
  </zxn-plan>
</template>
<script setup lang="ts">
// import areaSelect from "./components/areaSelect.vue";
import roleSelect from "./components/roleSelect.vue";
import { menusIndex, getAreaList, setRole, roleView } from "@/api/system";
import type { FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const menusRule = (rule: any, value: any, callback: any) => {
  if (formItem.checked_menus.length) {
    callback();
  } else {
    callback("请选择权限");
  }
};
const rules = reactive<FormRules>({
  role_name: [{ required: true, message: "请输入角色名称", trigger: "change" }],
  checked_menus: [{ validator: menusRule, trigger: "change" }],
});
const formItem = reactive({
  id: null,
  role_name: "",
  area: [],
  checked_menus: [],
});
const areaList = reactive([]);
const roleList = reactive([]);
const form = ref();
watch(
  roleList,
  (newVal, oldVal) => {
    // upwardSelectedDeep(roleList);
    formItem.checked_menus.length = 0;
    getMenuChoose(roleList, false);
    if (oldVal && oldVal.length) {
      form.value.validateField("checked_menus");
    }
  },
  { deep: true }
);
const getRoleView = async (id: number) => {
  const { data } = await roleView(id);
  const { role } = data;
  formItem.id = id;
  formItem.role_name = role.role_name;
  formItem.checked_menus = role.rules.split(",").map(Number);
  await getMenu();
};
// const upwardSelectedDeep = (role) => {
//   role.forEach((it) => {
//     if (it.children && it.children.length) {
//       upwardSelectedDeep(it.children);
//       it.selected = it.children.reduce((acc, cur) => {
//         return acc && cur.selected;
//       }, true);
//     }
//   });
// };
const getMenuChoose = (role, reserve: boolean) => {
  role.forEach((it) => {
    if (it.children && it.children.length) {
      getMenuChoose(it.children, reserve);
    }
    if (it.selected || reserve) {
      formItem.checked_menus.push(it.id);
    }
  });
};
const getAllAreaList = async () => {
  const { data } = await getAreaList();
  areaList.length = 0;
  areaList.push(...data);
};
const getMenu = async () => {
  const { data } = await menusIndex();
  roleList.length = 0;
  roleList.push(...washMenu(data));
};
const washMenu = (menu) => {
  const list = [];
  menu.forEach((it) => {
    let children = [];
    if (it.children && it.children.length) {
      children = washMenu(it.children);
    }
    list.push({
      id: it.id,
      label: it.menu_name,
      selected: formItem.checked_menus.includes(it.id),
      children,
    });
  });
  return list;
};
const handleSelect = (obj) => {
  const { type, val, secondRank, thirdRank } = obj;
  switch (type) {
    case "first":
      changeSelect(roleList, val);
      break;
    case "second":
      changeSelect(roleList[secondRank.value].children, val);
      break;
    case "third":
      changeSelect(
        roleList[secondRank.value].children[thirdRank.value].children,
        val
      );
      break;
  }
};
const handleSelectChange = (obj) => {
  const { type, rank, secondRank, thirdRank } = obj;
  let val = false;
  switch (type) {
    case "first":
      val = roleList[rank].selected;
      changeSelect(roleList[rank].children, val);
      break;
    case "second":
      val = roleList[secondRank.value].children[rank].selected;
      roleList[secondRank.value].selected =
        roleList[secondRank.value].selected || val;
      changeSelect(roleList[secondRank.value].children[rank].children, val);
      break;
    case "third":
      val =
        roleList[secondRank.value].children[thirdRank.value].children[rank]
          .selected;
      roleList[secondRank.value].selected =
        roleList[secondRank.value].selected || val;
      roleList[secondRank.value].children[thirdRank.value].selected =
        roleList[secondRank.value].children[thirdRank.value].selected || val;
      break;
  }
};
const changeSelect = (role: any[], val: boolean) => {
  role.forEach((it) => {
    it.selected = val;
    if (it.children && it.children.length) {
      changeSelect(it.children, val);
    }
  });
};
const loading = ref(false);
const handleSubmit = () => {
  form.value.validate(async (value) => {
    if (value) {
      const params = {};
      params.role_name = formItem.role_name;
      params.status = 1;
      params.checked_menus = formItem.checked_menus;
      params.id = formItem.id;
      try {
        await setRole(params);
        loading.value = false;
        ElMessage({
          type: "success",
          message: `${params.id ? "编辑" : "新增"}成功`,
        });
        handleCancel();
      } catch (e) {
        loading.value = false;
      }
    }
  });
};
const handleCancel = () => {
  router.push({ name: "roleIndex" });
};
onMounted(() => {
  getAllAreaList();
  const { id } = route.params;
  if (id) {
    getRoleView(id * 1);
  } else {
    getMenu();
  }
});
</script>
<style lang="scss">
.role-view {
  .el-checkbox {
    .el-checkbox__inner {
      width: 16px;
      height: 16px;

      &::after {
        top: 2px;
        left: 5px;
      }
    }
  }
}
</style>
