<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();
const logo = new URL(`@/assets/logo.png`, import.meta.url).href;
defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="w-full h-[56px] bg-white dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="h-full w-full flex items-center flex-start p-l-16px"
        to="/"
      >
        <span
          v-if="settingsStore.sidebarLogo"
          class="w-[24px] h-[24px] bg-#366ff4 b-rd-50%"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g>
              <line
                stroke-width="1"
                stroke="#ffffff"
                y1="18"
                x1="6"
                y2="8"
                x2="10"
                fill="none"
              />
              <line
                stroke-width="2"
                stroke="#ffffff"
                y2="16"
                x2="14"
                y1="8"
                x1="10"
                fill="none"
              />
              <line
                stroke-width="1"
                stroke="#ffffff"
                y2="6"
                x2="18"
                y1="16"
                x1="14"
                fill="none"
              />
            </g>
          </svg>
        </span>
      </router-link>

      <router-link
        v-else
        key="expand"
        class="h-full w-full flex items-center flex-start p-l-16px"
        to="/"
      >
        <img :src="logo" alt="" class="w-[102px] h-[28px]" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
