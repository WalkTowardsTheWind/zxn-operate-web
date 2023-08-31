import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { stream } from "fast-glob";

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStoreHook();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(response);
    const { status, msg } = response.data;
    if (status === 200) {
      return response.data;
    }
    if (status === 410000 || status === 410002) {
      ElMessageBox.confirm("当前登录已失效，请重新登录", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        localStorage.clear();
        window.location.href = "/";
      });
      return Promise.reject(new Error(msg));
    }
    if (response.data instanceof ArrayBuffer) {
      return response;
    }

    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    if (error.response.data) {
      const { msg } = error.response.data;
      ElMessage.error(msg || "系统出错");
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
