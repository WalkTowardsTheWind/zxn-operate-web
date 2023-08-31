<template>
  <div class="role-select">
    <roleTypeTable
      :list="roleList"
      @on-choose="(rank) => handleChoose('first', rank)"
      @select-change="(val) => handleSelect('first', val)"
      @on-change="(rank) => handleChange('first', rank)"
    />
    <roleTypeTable
      floor="二"
      ref="second"
      :list="secondList"
      @on-choose="(rank) => handleChoose('second', rank)"
      @select-change="(val) => handleSelect('second', val)"
      @on-change="(rank) => handleChange('second', rank)"
    />
    <roleTypeTable
      floor="三"
      ref="third"
      :list="thirdList"
      @select-change="(val) => handleSelect('third', val)"
      @on-change="(rank) => handleChange('third', rank)"
    />
  </div>
</template>
<script lang="ts" setup>
import roleTypeTable from "./roleTypeTable.vue";
import { isNumber } from "@/utils/is";
const props = defineProps({
  modelValue: { type: Array<number>, default: () => [] },
  roleList: { type: Array, default: () => [] },
  labelField: { type: String, default: "label" },
  valueField: { type: String, default: "code" },
});
const emits = defineEmits(["select-change", "on-change"]);
const secondRank = ref(null);
const thirdRank = ref(null);
const secondList = computed(() => {
  return isNumber(secondRank.value)
    ? props.roleList[secondRank.value].children
    : [];
});
const thirdList = computed(() => {
  return isNumber(secondRank.value) && isNumber(thirdRank.value)
    ? props.roleList[secondRank.value].children[thirdRank.value].children
    : [];
});
const second = ref();
const third = ref();
const handleChoose = (type, rank) => {
  // console.log(type, rank, "2222");
  switch (type) {
    case "first":
      secondRank.value = rank;
      thirdRank.value = null;
      second.value.init();
      third.value.init();
      break;
    case "second":
      thirdRank.value = rank;
      third.value.init();
      break;
  }
};
const handleSelect = (type, val) => {
  emits("select-change", { type, val, secondRank, thirdRank });
};
const handleChange = (type, rank) => {
  emits("on-change", { type, rank, secondRank, thirdRank });
};
</script>
<style lang="scss" scoped>
.role-select {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  width: 100%;
  padding: 24px 24px 0 0;
}
</style>
