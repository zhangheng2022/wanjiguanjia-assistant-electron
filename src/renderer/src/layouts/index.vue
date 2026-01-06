<script lang="ts" setup>
import NavigationTop from "./components/NavigationTop.vue";
</script>

<template>
  <el-container>
    <el-header style="--el-header-padding: 0 8px">
      <NavigationTop></NavigationTop>
    </el-header>
    <el-main>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style lang="scss" scoped></style>
