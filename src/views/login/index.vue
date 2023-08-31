<template>
  <div class="login-container">
    <div class="login">
      <el-form
        ref="loginFormRef"
        :model="loginData"
        :rules="loginRules"
        class="login-form"
      >
        <div class="loginLogo">
          <img class="imgs" src="@/assets/logo.png" alt="" />
        </div>
        <div class="flex text-black items-center py-4">
          <span class="text-2xl flex-1 text-center">欢迎登录</span>
        </div>

        <el-form-item class="mt-10" prop="account">
          <el-input
            class="flex-1"
            ref="username"
            size="large"
            v-model="loginData.account"
            placeholder="请输入用户名"
            name="username"
            clearable
          />
          <div class="underline"></div>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input
            class="flex-1"
            v-model="loginData.pwd"
            placeholder="请输入密码"
            type="password"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleLogin"
            clearable
          />
        </el-form-item>
        <el-form-item prop="imgcode">
          <el-input
            v-model="loginData.imgcode"
            autocomplete="off"
            placeholder="请输入验证码"
            size="large"
            class="w-[60%]"
            @keyup.enter="handleLogin"
            clearable
          />

          <div class="captcha1">
            <img :src="imgSrc" @click="getCaptchaImg" />
          </div>
        </el-form-item>

        <div
          class="mt-6"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div class="text-black text-sm" style="text-align: left">
            <!-- <el-checkbox v-model="checked1" label="记住密码" size="large" /> -->
          </div>
          <div class="text-black text-sm" style="text-align: right">
            <span style="cursor: pointer" @click="handle">忘记密码</span>
          </div>
        </div>

        <el-button
          size="default"
          :loading="loading"
          color="#366FF4"
          class="w-full mt-4 mb-4"
          @click.prevent="handleLogin"
          >登录
        </el-button>
      </el-form>
    </div>
    <div class="register"></div>

    <div class="dialog">
      <el-dialog
        v-model="registerVisible"
        title="重置密码"
        width="460px"
        :before-close="handle"
        :center="true"
      >
        <el-form
          ref="registerFormRef"
          :model="registerData"
          :rules="registerRules"
          class="register-form"
        >
          <el-form-item prop="mobile">
            <el-input
              class="flex-1"
              ref="phone"
              size="large"
              v-model="registerData.mobile"
              placeholder="请输入手机号"
              name="phone"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model="registerData.code"
              auto-complete="off"
              placeholder="请输入验证码"
              size="large"
              @keyup.enter="handleRegister"
            />

            <div class="captcha2 mr-5 text-centen mt-1">
              <span
                class="but"
                style="color: #356ff3"
                @click="getPhoneCaptcha"
                >{{ (countNum as number) > 0 ? countNum : "获取验证码" }}</span
              >
            </div>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input
              class="flex-1"
              v-model="registerData.pwd"
              placeholder="请输入新密码"
              :type="passwordVisible === false ? 'password' : 'input'"
              size="large"
              name="password"
              @keyup="checkCapslock"
              @keyup.enter="handleRegister"
            />
          </el-form-item>

          <el-form-item prop="conf_pwd">
            <el-input
              class="flex-1"
              v-model="registerData.conf_pwd"
              placeholder="确认新密码"
              :type="password2Visible === false ? 'password' : 'input'"
              size="large"
              name="password2"
              @keyup="checkCapslock"
              @keyup.enter="handleRegister"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button
              color="#356FF3"
              size="large"
              class="resetButton-cancel w-[35%]"
              @click="registerVisible = false"
              >取消
            </el-button>
            <el-button
              color="#356FF3"
              size="large"
              class="resetButton-confirm w-[35%]"
              @click="Register"
            >
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="loginBanquan">
      版权所有@copyRight中新能智能云平台有限公司 <br /><a
        target="_blank"
        class="urlA"
        href="http://beian.miit.gov.cn/"
      >
        京ICP备2022009613号-1</a
      >
      保留一切版权
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

// 状态管理依赖
import { useUserStore } from "@/store/modules/user";

// API依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { LoginData, RegisterData } from "@/api/login/types";
import { getPhone, getRegisterData } from "@/api/login";
const userStore = useUserStore();
const route = useRoute();
import DevicePixelRatio from "@/utils/devicePixelRatio";
const devicePixel = new DevicePixelRatio();
devicePixel.init();

/**
 * 按钮loading
 */
const loading = ref(false);
/**
 * 记住密码
 */
const imgSrc = ref(`${import.meta.env.VITE_APP_BASE_API}/adminapi/getCaptcha`);
/**
 * 记住密码
 */
// const checked1 = ref(false);
/**
 * 弹窗
 */
//  const registerVisible = ref(false);
/**
 * 验证码按钮loading
 */
const loading2 = ref(false);
/**
 * 是否大写锁定
 */
const isCapslock = ref(false);
/**
 * 密码是否可见
 */
const passwordVisible = ref(false);
/**
 * 确认密码是否可见
 */
const password2Visible = ref(false);
/**
 * 是否忘记密码
 */
const registerVisible = ref(false);
/**
 * 验证码倒计时
 */
const countNum = ref<number>();
/**
 * 验证码图片Base64字符串
 */
// const captchaBase64 = ref();
/**
 * 验证码图片Base64字符串
 */
// const captcha = ref();

/**
 * 登录表单引用
 */
const loginFormRef = ref(ElForm);

const loginData = ref<LoginData>({
  account: "",
  pwd: "",
  imgcode: "",
});

const loginRules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  pwd: [{ required: true, trigger: "blur", validator: passwordValidator }],
  imgcode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
/**
 * 忘记密码表单引用
 */
const registerFormRef = ref(ElForm);

const registerData = reactive<RegisterData>({
  mobile: "",
  pwd: "",
  conf_pwd: "",
  code: "",
});

const registerRules = {
  mobile: [{ required: true, validator: phoneValidator, trigger: "blur" }],
  pwd: [{ required: true, trigger: "blur", validator: passwordValidator }],
  conf_pwd: [
    { required: true, trigger: "blur", validator: password2Validator },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};
/**
 * 手机号校验器
 */
function phoneValidator(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error("手机号格式错误"));
  }
}
/**
 * 密码校验器
 */
function passwordValidator(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 6) {
    callback(new Error("密码长度应该等于或大于6"));
  } else {
    if (registerData.conf_pwd !== "") {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField("conf_pwd", () => null);
    }
    callback();
  }
}
function password2Validator(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("请确认密码"));
  } else if (value != registerData.pwd) {
    callback(new Error("二次密码输入不一致"));
  } else {
    callback();
  }
}

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}

/**
 *防抖
 */

let timer: any;
const debounce = (fn: () => void, time?: any) => {
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, time || 1000);
  };
};

/**
 * 获取验证码
 *
 */
const getCaptchaImg = () => {
  var num = Math.ceil(Math.random() * 10);
  imgSrc.value = `${
    import.meta.env.VITE_APP_BASE_API
  }/adminapi/getCaptcha?${num}`;
};
/**
 * 获取手机验证码
 */
function getPhoneCaptcha() {
  loading2.value = true;
  debounce(function () {
    var phone = registerData.mobile;
    getPhone({ phone })
      .then(() => {
        countNum.value = 60;
        let timer: any;
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
          countNum.value = (countNum.value as number) - 1;
          if (countNum.value == 0) {
            loading2.value = false;
            clearInterval(timer);
          }
        }, 1000);
      })
      .catch();
  }, 0)();
}

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log(1);
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          console.log("准备跳转了");
          const query: LocationQuery = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";
          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );

          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch((error) => {
          console.log(error);
          console.log("失败");
          // 验证失败，重新生成验证码
          getCaptchaImg();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}
/**
 * 重置密码
 */
function handleRegister() {
  registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
    }
  });
}
/**
 * 忘记密码/去登录
 */

function handle() {
  registerVisible.value = !registerVisible.value;
}

/**
 * 忘记密码
 */
function Register() {
  registerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log(1);
      loading.value = true;
      getRegisterData(registerData)
        .then(() => {
          console.log("成功了");
          registerVisible.value = false;
        })
        .catch((error) => {
          console.log(error);
          console.log("失败");
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}
onMounted(() => {
  getCaptchaImg();
});
onUnmounted(() => {
  devicePixel.clear();
});
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f6f6f6;

  .loginLogo {
    position: absolute;
    top: -25%;
    left: calc(50% - 133px);

    .imgs {
      width: 266px;
      height: 74px;
    }
  }

  .login {
    position: absolute;
    top: calc(50% - 230px);
    left: calc(50% - 230px);
    width: 460px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 36px 0 #ececec;

    .login-form {
      width: 520px;
      max-width: 100%;
      padding: 24px;
      margin: 0;
      overflow: hidden;
      // loginlogo

      .captcha1 {
        position: absolute;
        top: 0;
        right: 0;

        img {
          width: 120px;
          height: 38px;
          cursor: pointer;
        }
      }
    }
  }

  .dialog {
    :deep(.el-dialog) {
      position: absolute;
      top: calc(50% - 12px);
      left: 50%;
      display: flex;
      flex-direction: column;
      max-width: calc(100% - 30px);
      max-height: calc(100% - 30px);
      margin: 0 !important;
      transform: translate(-50%, -50%);
    }

    :deep(.el-dialog__title) {
      font-size: 1.5rem;
      font-weight: bold;
    }

    :deep(.el-dialog .el-dialog__body) {
      flex: 1;
      overflow: auto;
    }
  }

  .register-form {
    width: 520px;
    max-width: 100%;
    padding: 10px 0;
    margin: 0;
    overflow: hidden;

    .captcha2 {
      position: absolute;
      top: 0;
      right: 0;

      .but {
        width: 120px;
        height: 38px;
        cursor: pointer;
      }
    }
  }

  .loginBanquan {
    position: absolute;
    bottom: 50px;
    left: calc(50% - 450px);
    width: 900px;
    margin-top: 100px;
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    // flex: 1;
    text-align: center;

    .urlA {
      &:hover {
        color: blue;
      }
    }
  }
}

:deep(.el-input .el-input__wrapper) {
  // outline: none;
  border: none;
  border-radius: 0;
  box-shadow: 0 -1px 0 0 #e5e5e5 inset;
  // border-bottom: 2px solid red;
  // // border-bottom: 2px solid silver;
  &.is-focus {
    box-shadow: 0 -1px 0 0 #366ff4 inset;
  }
}

:deep(.el-input .el-input__clear) {
  color: black;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: 0 -1px 0 0 var(--el-color-danger) inset;
}
</style>
