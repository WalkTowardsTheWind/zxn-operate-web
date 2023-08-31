<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { useTagsViewStore } from "@/store/modules/tagsView";
import { useUserStore } from "@/store/modules/user";

const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const { device } = storeToRefs(appStore); // 设备类型：desktop-宽屏设备 || mobile-窄屏设备
const logo = ref(new URL(`../../assets/avatar.png`, import.meta.url).href);

function toggleSideBar() {
  appStore.toggleSidebar(true);
}

// 注销
function logout() {
  ElMessageBox.confirm("确定退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore
      .logout()
      .then(() => {
        tagsViewStore.delAllViews();
      })
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <hamburger
        :is-active="appStore.sidebar.opened"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb />
    </div>

    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 导航栏设置(窄屏隐藏)-->
      <div v-if="device !== 'mobile'" class="flex items-center">
        <!--        <el-icon size="16" color="#333333" class="m-r-[20px]"-->
        <!--          ><i-ep-search-->
        <!--        /></el-icon>-->
        <!--        <el-icon size="16" color="#333333" class="m-r-[20px]"-->
        <!--          ><i-ep-ChatDotRound-->
        <!--        /></el-icon>-->
        <tax-source-select />
      </div>

      <!-- 用户头像 -->
      <el-dropdown trigger="click">
        <div class="flex justify-center items-center mx-2 cursor-pointer">
          <img :src="logo" class="w-[24px] h-[24px] b-rd-50% scalc" />
          <span class="fs14 c-[#333] m-l-[8px] m-r-[8px]">{{
            userStore.nickname
          }}</span>
          <el-icon class="">
            <i-ep-arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t("navbar.dashboard") }}</el-dropdown-item>
            </router-link>
            <router-link to="/system/account">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logout">
              {{ $t("navbar.logout") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  background-color: #fff;
  //box-shadow: 0 0 1px #0003;

  .navbar-setting-item {
    display: inline-block;
    width: 30px;
    height: 50px;
    line-height: 50px;
    color: #5a5e66;
    text-align: center;
    cursor: pointer;

    &:hover {
      background: rgb(249 250 251 / 100%);
    }
  }
}
</style>
