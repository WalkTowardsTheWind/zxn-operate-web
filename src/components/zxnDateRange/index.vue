<template>
  <div class="zxn-date-range">
    <el-date-picker
      v-model="dateRange[0]"
      type="date"
      placeholder="开始日期"
      format="YYYY/MM/DD"
      :value-format="valueFormat"
      :disabled-date="(date) => disabledDate('start', date)"
      @change="handleDateChange"
    />
    <span>-</span>
    <el-date-picker
      v-model="dateRange[1]"
      type="date"
      placeholder="结束日期"
      format="YYYY/MM/DD"
      :value-format="valueFormat"
      :disabled-date="(date) => disabledDate('end', date)"
      @change="handleDateChange"
    />
    <el-icon size="14" color="#333"><i-ep-Calendar /></el-icon>
    <el-icon
      v-show="showClose"
      size="14"
      color="#E5E5E5"
      class="zxn-date-range-close"
      @click="handleClose"
    >
      <i-ep-CircleCloseFilled />
    </el-icon>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  valueFormat: { type: String, default: "YYYY-MM-DD" },
});
const emit = defineEmits(["update:modelValue"]);
const dateRange = computed(() => {
  const [startTime = "", endTime = ""] = props.modelValue;
  return reactive([startTime, endTime]);
});
let showClose = computed(() => {
  return dateRange.value.length && (dateRange.value[0] || dateRange.value[1]);
});
const handleClose = () => {
  dateRange.value[0] = "";
  dateRange.value[1] = "";
  handleDateChange();
};
const disabledDate = (type: string, date: Date) => {
  if (!dateRange.value[0] && !dateRange.value[1]) {
    return false;
  }
  if (type === "start") {
    return (
      dateRange.value[1] &&
      new Date(date).getTime() > new Date(dateRange.value[1] as Date).getTime()
    );
  }
  return (
    dateRange.value[0] &&
    new Date(date).getTime() < new Date(dateRange.value[0] as Date).getTime()
  );
};
const handleDateChange = () => {
  emit("update:modelValue", dateRange.value);
};
</script>
<style lang="scss" scoped>
.zxn-date-range {
  display: flex;
  align-items: center;
  padding-right: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;

  :deep(.el-date-editor) {
    .el-input__wrapper {
      padding: 0;
      box-shadow: none;

      > .el-input__prefix {
        display: none;
      }

      > .el-input__suffix {
        display: none;
      }

      .el-input__inner {
        text-align: center;
      }
    }
  }

  &-close {
    position: absolute;
    top: 50%;
    right: 4px;
    display: none;
    cursor: pointer;
    transform: translateY(-50%);
  }

  &:hover {
    .zxn-date-range-close {
      display: block;
    }
  }
}
</style>
