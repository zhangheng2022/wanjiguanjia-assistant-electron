<template>
  <div class="h-full flex items-center justify-between">
    <div class="basis-40">
      <el-image style="width: 140px; height: auto" :src="Logo" fit="contain" />
    </div>
    <div class="grid grid-cols-4 gap-x-8">
      <div class="flex flex-col items-center justify-center">
        <el-icon color="#409eff" size="30"><HomeFilled /></el-icon>
        <span class="text-sm">我的设备</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <el-icon color="#409eff" size="30"><HomeFilled /></el-icon>
        <span class="text-sm">我的设备</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <el-icon color="#409eff" size="30"><HomeFilled /></el-icon>
        <span class="text-sm">我的设备</span>
      </div>
      <div class="flex flex-col items-center justify-center">
        <el-icon color="#409eff" size="30"><HomeFilled /></el-icon>
        <span class="text-sm">我的设备</span>
      </div>
    </div>
    <div class="basis-40 flex justify-end">
      <el-button type="danger" icon="UserFilled" circle />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@renderer/common/assets/images/logo.png";
</script>

<style lang="scss" scoped></style>
