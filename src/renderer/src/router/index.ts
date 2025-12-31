import type { RouteRecordRaw } from "vue-router";
import { createRouter } from "vue-router";
import { routerConfig } from "@renderer/router/config";

const Layouts = (): Promise<Component> => import("@renderer/layouts/index.vue");

/**
 * @name 常驻路由
 * @description 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置唯一的 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/403",
    component: (): Promise<Component> => import("@renderer/pages/error/403.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: (): Promise<Component> => import("@renderer/pages/error/404.vue"),
    meta: {
      hidden: true,
    },
    alias: "/:pathMatch(.*)*",
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@renderer/pages/home/index.vue"),
        name: "Home",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true,
        },
      },
    ],
  },
];

/** 路由实例 */
export const router = createRouter({
  history: routerConfig.history,
  routes: constantRoutes,
});
