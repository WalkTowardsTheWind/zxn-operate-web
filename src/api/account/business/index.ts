import request from "@/utils/request";
import {
  ICheckBusinessAccount,
  ICreateBusinessAccount,
  IEditBusinessAccount,
  IGetBusinessAccountList,
} from "./types";

/**
 * 获取企业账户列表
 * @param params
 * @returns
 */
export function getBusinessAccountList(params: IGetBusinessAccountList) {
  return request({
    url: "/adminapi/account/company/index",
    method: "get",
    params,
  });
}

/**
 * 企业账号新建
 * @param data
 * @returns
 */
export function createBusinessAccount(data: ICreateBusinessAccount) {
  return request({
    url: "/adminapi/account/company/create",
    method: "post",
    data,
  });
}

/**
 * 企业账号编辑
 * @param data
 * @returns
 */
export function editBusinessAccount(data: IEditBusinessAccount) {
  return request({
    url: "/adminapi/account/company/update",
    method: "post",
    data,
  });
}

/**
 * 企业详情
 * @param id
 * @returns
 */
export function getBusinessAccountDetail(id: number) {
  return request({
    url: "/adminapi/account/company/read?id=" + id,
    method: "get",
  });
}

/**
 * 企业账户审核
 * @param data
 * @returns
 */
export function checkBusinessAccount(data: ICheckBusinessAccount) {
  return request({
    url: "/adminapi/account/company/audit",
    method: "post",
    data,
  });
}

/**
 * 企业账户激活
 * @param id
 * @returns
 */
export function activateBusniessAccount(id: number) {
  return request({
    url: "/adminapi/account/company/activate/" + id,
    method: "get",
  });
}

/**
 * 企业账户删除
 * @param id
 * @returns
 */
export function deleteBusinessAccount(id: number) {
  return request({
    url: "/adminapi/account/company/" + id,
    method: "delete",
  });
}

/**
 * 获取行业id 0=行业类目，2=开票类目, 3=岗位类目
 * @param params
 * @returns
 */
export function getCategoryList(params = "0") {
  return request({
    url: "/adminapi/category/get_tree_list?type=" + params,
    method: "get",
  });
}

/**
 * 企业账户启用封停
 * @param params 状态  1解封 2封停
 * @returns
 */
export function businessAccountSetStatus(params: {
  id: string | number;
  status: string | number;
}) {
  return request({
    url:
      "/adminapi/account/company/set_status/" + params.id + "/" + params.status,
    method: "get",
  });
}

/**
 * 获取企业账号合同信息
 * @returns
 */
export function getBusinessAccountContractList(params: any) {
  return request({
    url: "/adminapi/contract/contract",
    method: "get",
    params,
  });
}

/**
 * 企业结算
 * @returns
 */
export function getBusinessAccountSettlementList(params: any) {
  return request({
    url: "/adminapi/finance/company",
    method: "get",
    params,
  });
}

/**
 * 企业充值
 * @param params
 * @returns
 */
export function getBusinessAccountRechargeList(params: any) {
  return request({
    url: "/adminapi/finance/company/recharge",
    method: "get",
    params,
  });
}

/**
 * 企业任务
 * @param params
 * @returns
 */
export function getBusinessAccountTaskList(params: any) {
  return request({
    url: "/adminapi/task/task",
    method: "get",
    params,
  });
}

/**
 * 企业渠道
 * @param params
 * @returns
 */
export function getBusinessChannelList(params: any) {
  return request({
    url: "/adminapi/account/channel/read/" + params.id + "/" + params.type,
    method: "get",
  });
}

/**
 * 税地详情
 * @param params
 * @returns
 */
export function getTaxlandDetail(params: any) {
  return request({
    url: `/adminapi/tax/taxLand/${params}`,
    method: "get",
  });
}

export function resetAccountPwd(id) {
  return request({
    url: `/adminapi/account/company/reset_pwd/${id}`,
    method: "post",
  });
}

// 启用 禁用 税地
export function setTaxLandStatus(id: string, status: string | number) {
  return request({
    url: `/adminapi/account/company/taxland/set_status/${id}/${status}`,
    method: "get",
  });
}

// 企业账户税地编辑
export function editAccountTaxLand(data: any) {
  return request({
    url: `/adminapi/account/company/taxland/update`,
    method: "post",
    data,
  });
}

// 企业账户税地新建
export function createAccountTaxLand(data: any) {
  return request({
    url: `/adminapi/account/company/taxland/create`,
    method: "post",
    data,
  });
}
