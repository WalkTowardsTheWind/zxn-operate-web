import request from "@/utils/request";
import {
  supplyContractAddType,
  supplyContractListType,
  supplyContractEditType,
} from "./types";

/**
 * 新建供应合同
 *
 * @param data {supplyContractAddType}
 * @returns
 */
export function supplyContractAdd(data: supplyContractAddType) {
  return request({
    url: "/adminapi/contract/supply_contract",
    method: "post",
    params: data,
  });
}

/**
 * 获取供应合同列表
 *
 *
 */
export function getSupplyContractList(data: supplyContractListType) {
  return request({
    url: "/adminapi/contract/supply_contract",
    method: "get",
    params: data,
  });
}

/**
 * 修改供应合同
 * @param data {supplyContractEdit}
 * @returns
 */
export function supplyContractEdit(id: number, data: supplyContractEditType) {
  return request({
    url: `/adminapi/contract/supply_contract/${id}`,
    method: "put",
    params: data,
  });
}
