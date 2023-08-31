import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { RoleQuery, LogQuery, menusQuery, SetRoleQuery } from "./types";

/**
 * 获取角色数据
 * @param params
 */

export function getRolePage(params: RoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role",
    method: "GET",
    params,
  });
}

/**
 * 新增角色数据
 * @param data
 */
export function setRole(data: SetRoleQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/role",
    method: "POST",
    data,
  });
}

/**
 * 角色详情
 * @param id
 */
export function roleView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/role/${id}/edit`,
    method: "GET",
  });
}

/**
 * 删除角色
 * @param id
 */
export function removeRole(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/role/${id}`,
    method: "DELETE",
  });
}

/**
 * 修改角色状态
 * @param data
 */
export function setRoleStatus(data: any): AxiosPromise {
  return request({
    url: `/adminapi/setting/role/set_status`,
    method: "PUT",
    data,
  });
}

export function systemLog(params: LogQuery): AxiosPromise {
  return request({
    url: "/adminapi/system/log",
    method: "GET",
    params,
  });
}

/**
 * 菜单列表
 * @param params
 */
export function menusIndex(params: menusQuery): AxiosPromise {
  return request({
    url: "/adminapi/setting/menus",
    method: "GET",
    params,
  });
}

/**
 * 新增菜单
 * @param data
 */
export function setMenus(data: any): AxiosPromise {
  return request({
    url: "/adminapi/setting/menus",
    method: "POST",
    data,
  });
}

/**
 * 修改菜单
 * @param data
 * @param id
 */
export function editMenus(data: any, id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/menus/${id}`,
    method: "PUT",
    data,
  });
}

/**
 *  删除菜单
 * @param id
 */
export function removeMenu(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/menus/${id}`,
    method: "DELETE",
  });
}

/**
 *  菜单详情
 */
export function menusView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/setting/menus/${id}`,
    method: "GET",
  });
}

/**
 * 获取税地城市列表
 */
export function getAreaList(): AxiosPromise {
  return request({
    url: "/adminapi/tax/areaList",
    method: "GET",
  });
}

/**
 * 修改当前用户信息
 */
export function updateAdmin(data: any): AxiosPromise {
  return request({
    url: "/adminapi/setting/update_admin",
    method: "PUT",
    data,
  });
}

/**
 * 切换税地
 */
export function setTaxLand(params: any): AxiosPromise {
  return request({
    url: "/adminapi/setTaxLand",
    method: "GET",
    params,
  });
}
