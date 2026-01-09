<template>
  <template v-if="showElement">
    <el-button v-if="!usePlatform.isLogin" size="large" round @click="handleLogin"
      >立即登录</el-button
    >
    <el-dropdown v-if="usePlatform.isLogin">
      <el-button size="large" round>
        <el-avatar
          :size="27"
          :src="
            computedUserinfo.avatar ||
            'https://image.wanjisaas.com/wanjilite/private/759f51d2-f473-4b89-a062-a4681bed84c6.jpg'
          "
        />
        <span class="ml-2" style="font-size: 13px">{{ computedUserinfo.name }}</span>
        <el-icon>
          <ArrowDown />
        </el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>

  <el-dialog
    v-model="dialogShow"
    width="450"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    class="bg-neutral-50!"
    custom-class="bg-neutral-50!"
  >
    <div class="flex flex-col flex-justify-center flex-items-center">
      <!-- <img src="@renderer/assets/imgs/roundlogo.png" width="100px" height="100px" /> -->
      <h2 class="text-black mt-0">欢迎使用万机助手</h2>
      <span class="text-size-sm text-neutral">请使用万机管家ERP账号登录</span>
    </div>
    <div class="mt-2 bg-white">
      <div class="grid grid-cols-2 bg-neutral-100">
        <div
          class="flex flex-justify-center flex-items-center h-12 cursor-pointer"
          :class="{ 'bg-white rt-tab-box': segtabActive === '2' }"
          @click="handleSegtabActive('2')"
        >
          <span
            class="text-size-base"
            :class="[segtabActive === '2' ? 'font-bold text-custom-yellow' : 'text-neutral']"
            >门店版</span
          >
        </div>
        <div
          class="flex flex-justify-center flex-items-center h-12 cursor-pointer"
          :class="{ 'bg-white lt-tab-box': segtabActive === '1' }"
          @click="handleSegtabActive('1')"
        >
          <span
            class="text-size-base"
            :class="[segtabActive === '1' ? 'font-bold text-blue' : 'text-neutral']"
            >企业版</span
          >
        </div>
      </div>
      <div>
        <FormLogin
          :type="segtabActive"
          @success="loginSuccess"
          @register="handleComputedRegister"
          @overlay="maskLayerChange"
        ></FormLogin>

        <!-- <StoreLogin
          v-if="segtabActive === '2'"
          @success="loginSuccess"
          @register="handleStoreRegister"
          @overlay="maskLayerChange"
        ></StoreLogin> -->
      </div>
    </div>
    <!-- 登陆遮罩 -->
    <div v-if="maskLayerShow" class="mask-layer"></div>
  </el-dialog>
  <ComputedRegister v-model:dialog-show="computedRegisterDialogShow"></ComputedRegister>
  <!-- <StoreRegister v-model:dialog-show="storeRegisterDialogShow"></StoreRegister> -->
</template>

<script lang="ts" setup>
import { ArrowDown } from "@element-plus/icons-vue";
import FormLogin from "./form-login.vue";
import ComputedRegister from "./computed-register.vue";
// import StoreRegister from "./components/store-register.vue";
// import StoreLogin from "./components/store-login.vue";
import { ref, computed } from "vue";
import { usePlatformStore } from "@renderer/pinia/stores/platform";
import { useAuthStore } from "@renderer/pinia/stores/auth";

defineProps({
  showElement: {
    type: Boolean,
    default: true,
  },
});
const dialogShow = defineModel("dialogShow", { type: Boolean, default: false });

const emit = defineEmits(["success"]);

const usePlatform = usePlatformStore();
const _useAuthStore = useAuthStore();

const computedUserinfo = computed(() => {
  console.log(_useAuthStore.UserInfo, usePlatform.platformType);

  let data = {
    name: "",
    avatar: "",
  };
  data = {
    name: _useAuthStore.UserInfo?.userName,
    avatar: _useAuthStore.UserInfo?.avatar,
  };
  return data;
});

function handleLogin(): void {
  dialogShow.value = true;
}

function handleLogout(): void {
  usePlatform.platformType = "";
  _useAuthStore.clear();
}

const segtabActive = ref("2");
function handleSegtabActive(val): void {
  segtabActive.value = val;
}

function loginSuccess(): void {
  dialogShow.value = false;
  emit("success");
}

const computedRegisterDialogShow = ref(false);
function handleComputedRegister(): void {
  computedRegisterDialogShow.value = true;
}

const maskLayerShow = ref(false);
function maskLayerChange(show): void {
  maskLayerShow.value = show;
}
</script>
<style lang="scss" scoped>
.lt-tab-box {
  position: relative;
}

.lt-tab-box::after {
  content: " ";
  position: absolute;
  top: -50px;
  left: -10px;
  border-width: 50px 10px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}

.lt-tab-box::before {
  content: " ";
  position: absolute;
  width: 40px;
  height: 4px;
  background: #116cca;
  top: 40px;
  left: 96px;
  border-radius: 60px;
}

.rt-tab-box {
  position: relative;
}

.rt-tab-box::after {
  content: " ";
  position: absolute;
  top: -50px;
  right: -10px;
  border-width: 50px 10px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}

.rt-tab-box::before {
  content: " ";
  position: absolute;
  width: 40px;
  height: 4px;
  background: #ffd736;
  top: 40px;
  left: 96px;
  border-radius: 60px;
}

.form-warp:deep(.el-input__wrapper) {
  background: #f5f5f5;
  border-radius: 200px;
}
// 遮罩
.mask-layer {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
