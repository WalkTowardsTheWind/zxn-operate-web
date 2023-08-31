<template>
  <el-scrollbar
    class="w-[auto] p-r-[16px]"
    @mousewheel="handleWheel"
    ref="scrollbar"
  >
    <!--		{{ curAreaList }}-->
    <div class="area-select">
      <div
        class="area-select-province"
        v-for="item in curAreaList"
        :key="item.id"
      >
        <div class="area-select-province-checkbox">
          <span>{{ item.label }}</span>
          <el-checkbox
            v-model="item.checked"
            :indeterminate="item.indeterminate"
            @change="handleCityAllChange(item)"
          />
        </div>
        <div class="area-select-province-box">
          <div
            class="area-select-province-city"
            :class="{ 'is-active': modelValue.includes(city.id) }"
            v-for="city in item.child"
            :key="city.id"
            @click="handleCityChange(city)"
          >
            {{ city.name }}
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import { useThrottleFn } from "@vueuse/core";

const props = defineProps({
  modelValue: { type: Array<number>, default: () => [] },
  areaList: { type: Array, default: () => [] },
  labelField: { type: String, default: "name" },
  valueField: { type: String, default: "id" },
});
const emit = defineEmits(["update:modelValue"]);
const { labelField, valueField } = toRefs(props);
const curAreaList = computed(() => {
  return props.areaList.map((it: any) => {
    const checkNum = it.child.filter((city: any) =>
      props.modelValue.includes(city[valueField.value])
    );
    return {
      id: it.id,
      label: it[labelField.value],
      checked: checkNum.length === it.child.length,
      indeterminate: Boolean(
        checkNum.length && checkNum.length !== it.child.length
      ),
      child: it.child,
    };
  });
});
const handleCityAllChange = (pro: any): void => {
  const cityCodes = pro.child.map((it: any) => it.id);
  let cur: any[] = [];
  if (!pro.checked) {
    cur = deleteCity(props.modelValue, cityCodes);
  } else {
    cur = Array.from(new Set([...props.modelValue, ...cityCodes]));
  }
  emitValue(cur);
};
const handleCityChange = (city: any): void => {
  const _modelValue = [...props.modelValue];
  const rank = _modelValue.findIndex((it) => it === city[valueField.value]);
  if (rank !== -1) {
    _modelValue.splice(rank, 1);
  } else {
    _modelValue.push(city[valueField.value]);
  }
  emitValue(_modelValue);
};
const deleteCity = (cur: number[], del: number[]): [] => {
  return [...cur].filter((it) => !del.includes(it)) as [];
};
const emitValue = (value: any) => {
  emit("update:modelValue", value);
};
const scrollbar = ref(ElScrollbar);
const handleWheel = useThrottleFn((e: MouseEvent) => {
  const { deltaY } = e as any;
  const left = scrollbar.value.wrapRef.scrollLeft;
  scrollbar.value.setScrollLeft(left + deltaY);
}, 100);
</script>
<style lang="scss" scoped>
.area-select {
  display: flex;
  white-space: nowrap;

  &-province {
    margin-right: 16px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;

    &-checkbox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 0 20px;
      background-color: #eff4fe;

      > span {
        font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #333;
      }
    }

    &-box {
      display: grid;
      grid-template-rows: repeat(1, 36px);
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 10px;
      padding: 16px 0 16px 20px;
    }

    &-city {
      padding: 0 10px;
      font-family: SourceHanSansSC-Medium, SourceHanSansSC, sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      text-align: center;
      cursor: pointer;
      border: 1px solid #e5e5e5;
      border-radius: 4px;

      &:hover,
      &.is-active {
        color: #366ff3;
        border-color: #366ff3;
      }
    }
  }
}
</style>
