import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginData, LoginResult } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApis(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: "/api/v1/auth/login",
    method: "post",
    params: data,
  });
}

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: any) {
  return request({
    url: "/ly/adminapi/login",
    method: "post",
    params: data,
  });
}

/**
 * 注销API
 */
export function logoutApi() {
  return request({
    url: "/api/v1/auth/logout",
    method: "delete",
  });
}

/**
 * 获取验证码{CaptchaResult}
 */
export function getCaptcha(): AxiosPromise {
  return request({
    url: "/ly/adminapi/getCaptcha",
    method: "get",
  });
}
