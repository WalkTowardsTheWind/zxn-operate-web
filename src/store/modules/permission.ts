import { RouteRecordRaw } from "vue-router";
import { defineStore } from "pinia";
import { constantRoutes } from "@/router";
import { store } from "@/store";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];

  routes.forEach((route) => {
    const tmpRoute: any = {}; // ES6扩展运算符复制新对象
    tmpRoute.path = route.path;
    tmpRoute.meta = {
      title: route.title,
      icon: route.icon,
      hidden: !route.is_header,
      keepAlive: !route.c_cache,
    };
    if (route.c_path?.toString() === "Layout") {
      tmpRoute.component = Layout;
    } else {
      const component = modules[`../../views/${route.c_path}.vue`];
      if (component) {
        tmpRoute.component = component;
      } else {
        tmpRoute.component = modules[`../../views/error-page/404.vue`];
      }
    }
    if (route.children) {
      tmpRoute.children = filterAsyncRoutes(route.children);
    }
    asyncRoutes.push(tmpRoute);
  });
  return asyncRoutes;
};

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const hasRoles = ref(false);
  const routes = ref<RouteRecordRaw[]>(constantRoutes);

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes);
  }
  /**
   * 生成动态路由
   *
   * @returns
   */
  function generateRoutes(menuList: any) {
    const accessedRoutes = filterAsyncRoutes(menuList);
    console.log(accessedRoutes);
    // const accessedRoutes: any[] = [];
    // setRoutes(accessedRoutes);
    hasRoles.value = true;
    return accessedRoutes;
  }
  return { routes, hasRoles, setRoutes, generateRoutes };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
