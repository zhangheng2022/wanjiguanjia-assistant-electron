<template>
  <div
    class="h-full flex flex-row items-center justify-between bg-linear-to-b from-blue-200 to-white px-4"
  >
    <div class="basis-40 flex">
      <el-image style="width: 140px; height: auto" :src="Logo" fit="contain" />
    </div>
    <div class="flex space-x-4">
      <template v-for="item in noHiddenRoutes" :key="item.path">
        <router-link
          v-if="item.children"
          v-slot="{ navigate, isActive }"
          :to="resolvePath(item.path, item.children[0].path)"
          custom
        >
          <div
            class="flex flex-row items-center rounded-full px-4 py-2 cursor-pointer"
            :class="[isActive ? 'bg-primary' : 'bg-white']"
            @click="navigate"
          >
            <SvgIcon
              v-if="item.children[0].meta?.svgIcon"
              :name="item?.children[0].meta?.svgIcon"
              style="font-size: 24px"
            />
            <span class="text-sm ml-2" :class="[isActive ? 'text-white' : 'text-primary']">{{
              item?.children[0].meta?.title
            }}</span>
          </div>
        </router-link>
      </template>
    </div>
    <div class="basis-40 flex justify-end">
      <Login v-if="!usePlatform.isLogin" :show-element="true"></Login>
      <div v-else class="flex flex-row items-center rounded-full px-4 py-2 cursor-pointer user">
        <img class="img" src="" alt="" />
        {{ userInfoStore.userInfo.tenantName }}
        <el-dropdown>
          <el-icon class="el-icon--right">
            <el-icon><caret-bottom /></el-icon>
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!-- <el-button  type="danger" icon="UserFilled" circle /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import Logo from "@renderer/common/assets/images/logo.png";
import { constantRoutes } from "@renderer/router";
import { usePlatformStoreHook } from "@renderer/pinia/stores/platform";
import { userInfoStoreHook } from "@renderer/pinia/stores/user";
const route = useRoute();
const usePlatform = usePlatformStoreHook();
const userInfoStore = userInfoStoreHook();
console.log(userInfoStore);
const noHiddenRoutes = computed(() => constantRoutes.filter((item) => !item.meta?.hidden));
const activeMenu = computed(() => route.meta.activeMenu || route.path);
console.log(noHiddenRoutes, activeMenu);

const resolvePath = (parent: string, child: string): string => {
  if (child.startsWith("/")) return child;
  if (parent === "/") return `/${child}`;
  return `${parent.replace(/\/$/, "")}/${child.replace(/^\//, "")}`;
};
</script>

<style lang="scss" scoped>
.user {
  height: 37px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 113px 113px 113px 113px;
  font-size: 12px;
  .img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 4px;
  }
}
</style>
