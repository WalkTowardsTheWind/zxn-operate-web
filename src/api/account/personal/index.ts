import request from "@/utils/request";
import { IEditPersonalAccount, IGetPersonalAccountList } from "./types";

/**
 * 获取个人账户列表
 * @param params
 * @returns
 */
export function getPersonalAccountList(params: IGetPersonalAccountList) {
  return request({
    url: "/adminapi/account/user/index",
    method: "get",
    params,
  });
}

/**
 * 个人账户编辑
 * @param data
 * @returns
 */
export function editPersonalAccount(data: IEditPersonalAccount) {
  return request({
    url: "/adminapi/account/user/update",
    method: "post",
    data,
  });
}

export function getPersonalAccountDetail(params: any) {
  return request({
    url: "/adminapi/account/user/read",
    method: "get",
    params,
  });
}

/**
 *
 * @param params
 * @returns
 */
export function setPersonalStatus(params: any) {
  return request({
    url: "/adminapi/account/user/set_status/" + params.id + "/" + params.status,
    method: "get",
  });
}

export function delPersonalAccount(id: string) {
  return request({
    url: "/adminapi/account/user/" + id,
    method: "delete",
  });
}

export function createPersonalAccount(data: any) {
  return request({
    url: "/adminapi/account/user/create",
    method: "post",
    data,
  });
}
