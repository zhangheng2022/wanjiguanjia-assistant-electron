import { getUserInfo } from "@renderer/common/http/methods/user";
import { pinia } from "@renderer/pinia";
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref();
    // 获取用户详情
    const getInfo = async (): Promise<void> => {
      const data = await getUserInfo();
      userInfo.value = data;
    };

    return { userInfo, getInfo };
  },
  {
    // 启用持久化
    persist: true,
  },
);

// export function useUserStoreOutside() {
//   return useUserStore(pinia);
// }
const userStore = useUserStore(pinia);
export type UserInfoStore = typeof userStore;
export function userInfoStoreHook(): UserInfoStore {
  return userStore;
}
