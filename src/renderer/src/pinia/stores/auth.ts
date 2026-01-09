import { ref } from "vue";
import { pinia } from "@renderer/pinia";
import { defineStore } from "pinia";
import { login } from "@renderer/common/http/methods/login";
import { LoginParams, LoginResponse } from "@renderer/types/auth";
import { userInfoStoreHook } from "./user";
import { usePlatformStoreHook } from "./platform";
export const useAuthStore = defineStore(
  "Auth",
  () => {
    const token = ref();

    async function authLogin(params: LoginParams): Promise<void> {
      try {
        const usePlatform = usePlatformStoreHook();
        const loginParams: LoginParams = {
          username: params.username,
          password: params.password,
          code: params.code,
          uuid: params.uuid,
          loginType: usePlatform.platformType,
        };
        const response = await login({ ...loginParams });
        const responseData = response as LoginResponse;
        const accessToken = responseData?.access_token || responseData?.token;
        userInfoStoreHook().getInfo();
        token.value = accessToken as string;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }

    function clear(): void {
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("userInfo");
      token.value = "";
    }

    return { token, authLogin, clear };
  },
  {
    // 启用持久化
    persist: true,
  },
);
const authStore = useAuthStore(pinia);
export type AuthStore = typeof authStore;
export function useAuthStoreHook(): AuthStore {
  return authStore;
}
