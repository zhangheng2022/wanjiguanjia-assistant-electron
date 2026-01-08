<script lang="ts" setup>
import NavigationTop from "./components/NavigationTop.vue";
</script>

<template>
  <el-container>
    <el-header style="--el-header-padding: 0">
      <NavigationTop></NavigationTop>
    </el-header>
    <el-main class="bg-page-color" style="height: calc(100vh - 120px)">
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style lang="scss" scoped></style>
