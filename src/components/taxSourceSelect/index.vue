<template>
  <el-select v-model="value" class="w-[272px]" clearable>
    <!--    <el-option label="全部税地" value="" />-->
    <el-option
      v-for="item in useUser.sourceList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script setup lang="ts">
import { useUserStoreHook } from "@/store/modules/user";
const useUser = useUserStoreHook();
const value = computed({
  get: () => (useUser.taxSource ? ((useUser.taxSource * 1) as any) : ""),
  set: useUser.taxSourceChange,
});
</script>
