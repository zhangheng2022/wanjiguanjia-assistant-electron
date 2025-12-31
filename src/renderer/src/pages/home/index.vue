<script lang="ts" setup>
const dialogVisible = ref(true);
</script>

<template>
  <div class="app-container">
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
  <SvgIcon name="search" />
  <el-dialog v-model="dialogVisible" title="Tips" width="500" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
