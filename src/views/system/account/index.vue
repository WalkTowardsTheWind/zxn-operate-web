<template>
  <zxn-plan>
    <div class="system-account">
      <el-form ref="form" :model="formItem" :rules="rules" label-width="0">
        <el-form-item label="">
          <el-input :model-value="userStore.nickname" readonly />
        </el-form-item>
        <el-form-item label="" prop="pwd">
          <el-input
            v-model="formItem.pwd"
            type="password"
            placeholder="请输入旧密码"
          />
        </el-form-item>
        <el-form-item label="" prop="new_pwd">
          <el-input
            v-model="formItem.new_pwd"
            show-password
            type="password"
            placeholder="请输入密码"
            @change="handlePwdChange"
          />
        </el-form-item>
        <el-form-item label="" prop="conf_pwd">
          <el-input
            v-model="formItem.conf_pwd"
            show-password
            type="password"
            placeholder="确认新密码"
            @change="handlePwdChange"
          />
        </el-form-item>
        <el-button
          type="primary"
          class="w-[100%]"
          @click="handleSubmit"
          v-loading="loading"
          >确认</el-button
        >
      </el-form>
    </div>
  </zxn-plan>
</template>
<script setup lang="ts">
import { updateAdmin } from "@/api/system";
import { useUserStore } from "@/store/modules/user";
import { isPwd } from "@/utils/is";
const userStore = useUserStore();
const pwdValidate = (rule: any, value: any, cb: any) => {
  if (!isPwd(value)) {
    cb("密码长度为6-16位,必须由数字和字母组合");
  }
  if (
    formItem.new_pwd &&
    formItem.conf_pwd &&
    formItem.new_pwd !== formItem.conf_pwd
  ) {
    cb("两次密码输入不符");
  } else {
    cb();
  }
};
const rules = reactive({
  pwd: [{ required: true, message: "请输入旧密码", trigger: "change" }],
  new_pwd: [
    { required: true, message: "请输入新密码", trigger: "change" },
    { validator: pwdValidate, trigger: "change" },
  ],
  conf_pwd: [
    { required: true, message: "请确认新密码", trigger: "change" },
    { validator: pwdValidate, trigger: "change" },
  ],
});
const formItem = reactive({
  pwd: "",
  new_pwd: "",
  conf_pwd: "",
});
const loading = ref(false);
const form = ref();
const handlePwdChange = () => {
  form.value.validateField(["new_pwd", "conf_pwd"]);
};
const handleSubmit = () => {
  form.value.validate(async (valid: boolean) => {
    if (valid) {
      const params = { ...formItem };
      params.real_name = userStore.nickname;
      loading.value = true;
      try {
        await updateAdmin(params);
        loading.value = false;
        ElMessage.success("修改密码成功,请重新登录");
        await userStore.logout();
      } catch (e) {
        loading.value = false;
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.system-account {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :deep(.el-form) {
    .el-input {
      width: 300px;
      border-bottom: 1px solid #e5e5e5;

      .el-input__wrapper {
        box-shadow: none;

        .el-input__inner {
          height: 36px;
        }
      }
    }
  }
}
</style>
