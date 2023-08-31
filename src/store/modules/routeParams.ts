import { defineStore } from "pinia";
import { store } from "@/store";

export const useRouteParams = defineStore("routeParams", () => {
  const paramsList: any = reactive({});
  const pushParams = (routerName: string, params: any) => {
    paramsList[routerName] = params;
  };
  const pullParams = (routerName: string): string | { sting: any } => {
    if (Object.prototype.hasOwnProperty.call(paramsList, routerName)) {
      const res = paramsList[routerName];
      delete paramsList[routerName];
      return res;
    }
    return "";
  };
  return {
    paramsList,
    pushParams,
    pullParams,
  };
});

// 非setup
export function useRouteParamsHook() {
  return useRouteParams(store);
}
