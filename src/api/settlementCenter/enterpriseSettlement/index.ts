import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  keywords,
  getUserInfo,
  updateStatus,
  getTaskList,
  taskId,
  getEnterpriseExcel,
} from "./types";

/**
 *企业结算列表
 *
 * @param data {keywords}
 * @returns
 */
export function getEnterpriseSettlementList(data: keywords) {
  return request({
    url: "/adminapi/finance/company",
    method: "get",
    params: data,
  });
}

/**
 * 查看企业结算详情
 *
 * @param data
 * @returns
 */
export function getEnterpriseSettlementDetails(id: number) {
  return request({
    url: `/adminapi/finance/company/${id}`,
    method: "get",
  });
}
/**
 * 获取任务成员详情
 *
 * @param data {getUserInfo}
 * @returns
 */
export function getUserInfo(data: getUserInfo) {
  return request({
    url: "/adminapi/finance/company/getUserInfo",
    method: "get",
    params: data,
  });
}
/**
 * 获取任务成员详情
 *
 * @param data {getUserInfo}
 * @returns
 */
export function getTaskList(data: getTaskList) {
  return request({
    // url: "/adminapi/finance/company/getTaskList",
    url: "/adminapi/finance/company/getTaskList",
    method: "get",
    params: data,
  });
}
/**
 * 修改企业结算状态
 *
 * @param data {updateStatus}
 * @returns
 */
export function updateEnterpriseSettlementStatus(data: updateStatus) {
  return request({
    url: "/adminapi/finance/company/updateStatus",
    method: "post",
    params: data,
  });
}
/**
 * 删除企业结算单
 *
 * @param data {updateStatus}
 * @returns
 */
export function deleteEnterpriseSettlementDoc(id: number) {
  return request({
    url: `/adminapi/finance/company/${id}`,
    method: "delete",
  });
}
/**
 * 获取任务详情
 * @param id Number
 */
export function getTaskDetails(data: taskId): AxiosPromise {
  return request({
    url: "/adminapi/finance/company/getTaskInfo",
    method: "GET",
    params: data,
  });
}
/**
 * 获取任务详情
 * @param id Number
 */
export function getEnterpriseExcel(params: getEnterpriseExcel): AxiosPromise {
  return request({
    url: "/adminapi/finance/company/get_excel",
    method: "GET",
    params,
    responseType: "arraybuffer",
  });
}
