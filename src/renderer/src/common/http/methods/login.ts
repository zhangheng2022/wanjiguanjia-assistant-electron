import { alovaInstance } from "@renderer/common/http";
import { LoginParams, RegisterType } from "@renderer/types/auth";
export const login = (params: LoginParams): Promise<unknown> =>
  alovaInstance.Post("/check-device/auth/login", { ...params }, { meta: { auth: false } });
export const register = (params: RegisterType): Promise<unknown> =>
  alovaInstance.Post("/system/api/user/register", { ...params });
