import { ref } from "vue";
import { pinia } from "@renderer/pinia";
import { defineStore } from "pinia";
import { login } from "@renderer/common/http/methods/login";
import { LoginParams, LoginRequestParams, LoginResponse } from "@renderer/types/auth";

export const useAuthStore = defineStore(
  "Auth",
  () => {
    const token = ref(localStorage.getItem("AuthToken") || "");
    const UserInfo = ref(JSON.parse(localStorage.getItem("UserInfo") || "{}"));

    async function authLogin(params: LoginRequestParams): Promise<void> {
      try {
        const loginParams: LoginParams = {
          username: params.account,
          password: params.password,
          code: params.code,
          uuid: params.uuid,
        };
        const response = await login(loginParams);
        const responseData = response as LoginResponse;
        const accessToken = responseData.data?.access_token || responseData.data?.token;
        token.value = accessToken as string;
        await updateUserinfo();
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }

    async function updateUserinfo(): Promise<void> {
      try {
        // const { user } = await getUserInfo();
        // UserInfo.value = user;
        // localStorage.setItem("UserInfo", JSON.stringify(user));
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    }

    function clear(): void {
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("UserInfo");
      token.value = "";
      UserInfo.value = {};
    }

    return { token, UserInfo, authLogin, updateUserinfo, clear };
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
