<script lang="ts" setup></script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style lang="scss" scoped></style>
