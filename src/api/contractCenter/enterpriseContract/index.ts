import request from "@/utils/request";
import {
  enterpriseContractAddType,
  enterpriseContractListType,
  enterpriseContractEditType,
} from "./types";

/**
 * 新建企业合同
 *
 * @param data {enterpriseContractAddType}
 * @returns
 */
export function enterpriseContractAdd(data: enterpriseContractAddType) {
  return request({
    url: "/adminapi/contract/contract",
    method: "post",
    params: data,
  });
}

/**
 * 获取企业合同列表
 *
 *
 */
export function getEnterpriseContractList(data: enterpriseContractListType) {
  return request({
    url: "/adminapi/contract/contract",
    method: "get",
    params: data,
  });
}

/**
 * 修改企业合同
 * @param data {contractEdit}
 * @returns
 */
export function enterpriseContractEdit(
  id: number,
  data: enterpriseContractEditType
) {
  return request({
    url: `/adminapi/contract/contract/${id}`,
    method: "put",
    params: data,
  });
}
