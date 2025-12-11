import { pinia } from "@renderer/pinia"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>("")

  // 设置 Token
  const setToken = (value: string) => {
    token.value = value
  }

  // 获取用户详情
  const getInfo = async () => {

  }

  // 登出
  const logout = () => {

  }

  // 重置 Token
  const resetToken = () => {

  }

  return { token, setToken, getInfo, logout, resetToken }
})

/**
 * @description 在 SPA 应用中可用于在 pinia 实例被激活前使用 store
 * @description 在 SSR 应用中可用于在 setup 外使用 store
 */
export function useUserStoreOutside() {
  return useUserStore(pinia)
}
