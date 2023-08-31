<template>
  <div :class="'zxn-pagination ' + { hidden: hidden }">
    <div class="zxn-pagination-left">
      共{{ total }}条记录 第{{ currentPage }}/{{
        Math.ceil(total / pageSize)
      }}页
    </div>
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes as []"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { scrollTo } from "@/utils/scroll-to";

const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 30, 50];
    },
  },
  layout: {
    type: String,
    default: "slot, prev, pager, next, sizes, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["pagination"]);

const currentPage = useVModel(props, "page", emit);

const pageSize = useVModel(props, "limit", emit);

function handleSizeChange(val: number) {
  emit("pagination", { page: currentPage.value, limit: val });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}

function handleCurrentChange(val: number) {
  currentPage.value = val;
  emit("pagination", { page: val, limit: props.limit });
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}
</script>

<style lang="scss" scoped>
.zxn-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  &-left {
    flex: none;
    font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  :deep(.el-pagination) {
    .btn-prev,
    .btn-next {
      width: 36px;
      height: 36px;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;

      .el-icon {
        font-size: 14px;
        color: #333;
      }
    }

    .number {
      width: 36px;
      height: 36px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      opacity: 1;

      &.is-active {
        color: #366ff3;
        background: #fff;
        border-color: #366ff3;
      }
    }

    > .el-input {
      width: 100px;
    }

    .el-pagination__jump {
      color: #333;

      .el-input {
        width: 56px;
      }
    }
  }

  &.hidden {
    display: none;
  }
}
</style>
