import { alovaInstance } from "@renderer/common/http";

export const getUserInfo = (): Promise<unknown> => alovaInstance.Get("/user", {});
