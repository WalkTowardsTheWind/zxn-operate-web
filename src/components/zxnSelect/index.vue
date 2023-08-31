<template>
  <el-select v-bind="$attrs">
    <el-option label="全部" value="" />
    <slot />
  </el-select>
</template>
