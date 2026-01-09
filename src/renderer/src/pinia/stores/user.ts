export const useUserStore = defineStore("user", () => {
  const token = ref<string>("");

  // 设置 Token
  const setToken = (value: string): void => {
    token.value = value;
  };

  // 获取用户详情
  const getInfo = async (): Promise<void> => {};

  // 登出
  const logout = (): void => {};

  // 重置 Token
  const resetToken = (): void => {};

  return { token, setToken, getInfo, logout, resetToken };
});

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
// export function useUserStoreOutside() {
//   return useUserStore(pinia);
// }
export { useUserStore as useUserStoreOutside };
