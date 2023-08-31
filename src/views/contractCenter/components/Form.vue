<template>
  <zxn-plan>
    <zxn-tabs
      :activeName="activeName"
      :tabsList="tabsList"
      :hasBack="true"
      :hasUpdate="false"
    >
      <template #1>
        <div class="p-[24px] p-b-[0]">
          <el-form
            class="zxn-box"
            ref="ruleFormRef"
            :model="formData"
            label-width="100px"
          >
            <div class="flex">
              <div class="w-[33%]">
                <template v-for="(item, index) in configData" :key="index">
                  <!-- <el-form-item v-if="item!.slot" v-bind="item">
                    <template #default>
                      <slot :name="item!.slot" v-bind="" />
                    </template>
                  </el-form-item> -->
                  <!-- option -->
                  <el-form-item v-if="item" :label="(item as any).label">
                    <template #default>
                      <el-text v-if="(item as any).type=='text'" class="mx-1">
                        {{ formData[(item as any).data] }}
                      </el-text>
                      <el-input
                        v-else-if="(item as any).type=='input'"
                        v-model="(formData as any)[(item as any)].data"
                        type="textarea"
                      />
                      <el-select
                        v-else-if="(item as any).type=='select'"
                        class="w-[100%]"
                        v-model="(formData as any)[(item as any)].data"
                        placeholder="Select"
                        @change="(val)=>changeOptions(val,(item as any).data)"
                      >
                        <el-option
                          v-for="optionsItem in (item as any).stateOptions"
                          :key="optionsItem.value"
                          :label="optionsItem.label"
                          :value="optionsItem.value"
                        />
                      </el-select>
                      <el-date-picker
                        v-else-if="(item as any).type=='date-picker'"
                        v-model="(formData as any)[(item as any)].data"
                        type="date"
                        unlink-panels
                        placeholder="请选择"
                      />
                      <el-input
                        v-else-if="(item as any).type=='textarea'"
                        v-model="(formData as any)[(item as any)].data"
                        type="textarea"
                      />
                      <multi-upload
                        v-else-if="(item as any).type=='multi-upload'"
                        v-model="(formData as any)[(item as any)].data"
                      ></multi-upload>
                    </template>
                  </el-form-item>
                </template>
              </div>
            </div>
          </el-form>
        </div>
      </template>
      >
    </zxn-tabs>
  </zxn-plan>
</template>
<script setup lang="ts">
const props = defineProps({
  // rules:{ type: Array,  default: () => ({})},
  configData: { type: Array, default: () => [] },
  // formData: { type: Array, default: () => ({})},
  hasPagination: { type: Boolean, default: true },
  pageInfo: { type: Object, default: () => ({}) },
});
const activeName = ref("1");
const tabsList = [
  {
    name: "1",
    label: "线下合同",
  },
  // {
  //   name: "2",
  //   label: "线下合同",
  // },
];
const formData = reactive({
  name: "zhangsan",
  region: 1,
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
} as any);

const emit = defineEmits(["sort-change", "selection-change", "page-change"]);
const changeOptions = (val: any, data: any) => {
  console.log(val, "value", data, props);
  emit("selection-change", val);
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
.zxn-box {
  :deep(.el-input) {
    width: 100%;

    .el-input__wrapper {
      width: 100%;
    }

    //  flex-grow: 1
  }
}

.but {
  :deep(.el-button) {
    min-width: 80px;
  }
}

.box {
  .top {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0 12px 0 0;
    font-size: 14px;
    line-height: 32px;
    color: rgb(96 98 102);
  }

  .bg {
    background-color: #eff4fe;
  }

  .tac {
    display: flex;
    align-items: center;
    height: 50px;
  }

  .close {
    line-height: 50px;
    text-align: center;

    .close-icon {
      cursor: pointer;
    }
  }
}
</style>
