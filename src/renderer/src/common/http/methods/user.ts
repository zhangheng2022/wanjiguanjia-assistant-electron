import { alovaInstance } from "@renderer/common/http";

export const getUserInfo = (): Promise<unknown> =>
  alovaInstance.Get("/check-device/auth/user/info", {});
