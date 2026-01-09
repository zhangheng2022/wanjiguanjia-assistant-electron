import { computed, ref } from "vue";
import { pinia } from "@renderer/pinia";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePlatformStore = defineStore("platform", () => {
  const platformType = ref();
  const isLogin = computed(() => {
    return Boolean(useAuthStore().token);
  });

  function updatePlatformType(type): void {
    platformType.value = Number(type);
  }
  return { platformType, updatePlatformType, isLogin };
});
const platformStore = usePlatformStore(pinia);
export type PlatformStore = typeof platformStore;
export function usePlatformStoreHook(): PlatformStore {
  return platformStore;
}
