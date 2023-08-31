<template>
  <div ref="noticeMessage" class="notice-message">
    <div class="notice-message-header">
      <span class="notice-message-header-title">系统通知</span>
      <span class="notice-message-header-more" @click="handleMore">更多></span>
    </div>
    <div :style="{ height: `${boxHeight}px` }">
      <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper">
        <TransitionGroup name="message-list" v-infinite-scroll="load" tag="div">
          <div
            class="notice-message-item"
            v-for="item in tableData"
            :key="item.id"
          >
            <div class="notice-message-item-type">
              <div class="notice-message-item-type-icon"></div>
              <div class="notice-message-item-type-text text-ellipsis">
                {{ item.title }}
              </div>
            </div>
            <div class="notice-message-item-content text-ellipsis-3">
              {{ item.content }}
            </div>
            <div class="notice-message-item-btn">
              <el-button plain type="primary" @click="handleGoRouter(item)"
                >立刻处理</el-button
              >
            </div>
          </div>
        </TransitionGroup>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts">
import { notifyIndex, notifyView } from "@/api/message";
import { useRouter } from "vue-router";
import { useRouteParams } from "@/store/modules/routeParams";

const noticeMessage = ref<HTMLDivElement>();
let boxHeight = ref(0);
const tableData = reactive([]);
const pageInfo = {
  page: 0,
  limit: 10,
  lastPage: 1,
};

const load = () => {
  console.log(pageInfo.page);
  if (pageInfo.page < pageInfo.lastPage) {
    pageInfo.page++;
    getList();
  }
};
const getList = async () => {
  const params = { status: 0 };
  params.page = pageInfo.page;
  params.limit = pageInfo.limit;
  try {
    const { data } = await notifyIndex(params);
    pageInfo.lastPage = data.last_page;
    tableData.push(...data.data);
  } catch (e) {
    console.log(e);
  }
};
const router = useRouter();
const handleMore = () => {
  router.push({ name: "messageManager" });
};

const { pushParams } = useRouteParams();
const routerName = {
  2: "taskManagerIndex",
};
const handleGoRouter = (item: { type: number; status: number }) => {
  pushParams(routerName[item.type], { status: item.status });
  router.push({ name: routerName[item.type] });
  notifyView(item.id);
};
onMounted(() => {
  setTimeout(() => {
    const parentHeight = noticeMessage.value.offsetParent.clientHeight;
    const offTop = noticeMessage.value.offsetTop;
    boxHeight.value = parentHeight - offTop - 20;
    load();
  });
});
</script>
<style lang="scss" scoped>
.message-list {
}
.message-list-enter-active,
.message-list-leave-active {
  transition: all 0.5s ease;
}
.message-list-enter-from,
.message-list-leave-to {
  opacity: 0;
  transform: translateX(340px);
}
.notice-message {
  margin-top: 30px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 500;
    color: #333;

    &-more {
      cursor: pointer;
    }
  }

  &-item {
    padding: 24px 14px 14px 24px;
    margin-bottom: 16px;
    background: #fff;
    border-radius: 4px;

    &-type {
      display: flex;

      &-icon {
        width: 24px;
        height: 24px;
        margin-right: 16px;
        background: #36c5f3;
        border-radius: 50%;
      }

      &-text {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }
    }

    &-content {
      padding-left: 40px;
      margin-top: 16px;
      overflow: hidden;
      font-size: 14px;
      font-weight: 500;
      color: #999;
    }

    &-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 16px;
    }
  }
}
</style>
