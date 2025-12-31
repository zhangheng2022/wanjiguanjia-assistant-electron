import type { RouterHistory } from "vue-router";
import { createWebHashHistory, createWebHistory } from "vue-router";

/** 路由配置 */
interface RouterConfig {
  /**
   * @name 路由模式
   * @description hash 模式和 html5 模式
   */
  history: RouterHistory;
  /**
   * @name 是否开启三级及其以上路由缓存功能
   * @description 1. 开启后会进行路由降级（把三级及其以上的路由转化为二级路由）
   * @description 2. 由于都会转成二级路由，所以二级及其以上路由有内嵌子路由将会失效
   */
  thirdLevelRouteCache: boolean;
}

const VITE_ROUTER_HISTORY = import.meta.env.VITE_ROUTER_HISTORY;

const VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;

export const routerConfig: RouterConfig = {
  history:
    VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(VITE_PUBLIC_PATH)
      : createWebHistory(VITE_PUBLIC_PATH),
  thirdLevelRouteCache: false,
};
