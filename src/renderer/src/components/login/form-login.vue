<template>
  <div class="pa-4 login-warp">
    <el-form ref="formRef" :model="loginForm" size="large">
      <el-form-item prop="account">
        <el-input
          v-model="loginForm.account"
          placeholder="请输入账号"
          clearable
          :prefix-icon="Iphone"
        />
      </el-form-item>
      <el-form-item prop="password" class="mb-0">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          clearable
          type="password"
          show-password
          :prefix-icon="Lock"
        />
      </el-form-item>
      <div class="flex flex-justify-between flex-items-center">
        <el-checkbox
          v-model="storageAccountPassword"
          :class="type === '2' ? 'store-checkbox' : 'company-checkbox'"
          label="记住账号密码"
          size="large"
        />
      </div>
      <el-form-item>
        <el-button
          :class="type === '2' ? 'w-full store-button' : 'w-full company-button'"
          type="primary"
          round
          :loading="submitLoading"
          @click="onSubmit"
          >登录</el-button
        >
        <div class="flex flex-justify-center flex-1 cursor-pointer" @click="emit('register')">
          <span>我要注册</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { Iphone, Lock } from "@element-plus/icons-vue";
import { ref, onMounted, toRaw } from "vue";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@renderer/pinia/stores/auth";

const emit = defineEmits(["success", "register", "overlay"]);
defineProps({
  type: {
    type: String,
    default: "1",
  },
});
onMounted(() => {
  init();
});

function init(): void {
  const local = localStorage.getItem("companyAccountPassword");
  console.log(local);
  if (local) {
    loginForm.value = JSON.parse(local);
    storageAccountPassword.value = true;
  }
}

const loginForm = ref({
  account: "",
  password: "",
});
const storageAccountPassword = ref(false);
const submitLoading = ref(false);
async function onSubmit(): Promise<void> {
  const { account, password } = toRaw(loginForm.value);

  if (!account) {
    ElMessage({
      message: "请输入账号",
      type: "warning",
    });
    return;
  }
  if (!password) {
    ElMessage({
      message: "请输入密码",
      type: "warning",
    });
    return;
  }
  submitLoading.value = true;
  emit("overlay", true);
  useAuthStore()
    .authLogin(loginForm.value)
    .then(() => {
      if (storageAccountPassword.value) {
        localStorage.setItem("companyAccountPassword", JSON.stringify(loginForm.value));
      } else {
        localStorage.removeItem("companyAccountPassword");
      }
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      submitLoading.value = false;
      emit("overlay", false);
      emit("success");
    })
    .catch(() => {
      emit("overlay", false);
      submitLoading.value = false;
    });
}
</script>

<style lang="scss" scoped>
.login-warp:deep(.el-input__wrapper) {
  background: #f5f5f5;
  border-radius: 200px;
}
.store-checkbox {
  --el-color-primary: #ffd736;
}
.store-button {
  --el-button-bg-color: #ffd736; /* 覆盖背景颜色 */
  --el-button-border-color: #ffd736; /* 覆盖边框颜色 */
  --el-button-hover-bg-color: #ffd736;
  --el-button-hover-border-color: #ffd736;
  --el-button-active-bg-color: #ffd736;
  --el-button-active-border-color: #ffd736;
  --el-button-hover-text-color: #000;
  --el-button-text-color: #000;
  --el-button-active-text-color: #000;
}
// .el-input__wrapper {
//   --el-input-focus-border: #ffd736;
// }
</style>
