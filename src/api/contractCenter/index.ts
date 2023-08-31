import request from "@/utils/request";
import { updateStatus } from "./types";

/**
 * 修改合同状态
 *
 * @param data {updateStatus}
 * @returns
 */
export function updateStatus(data: updateStatus) {
  return request({
    url: "/adminapi/contract/contract/updateStatus",
    method: "post",
    params: data,
  });
}

/**
 * 获取合同编号
 *
 *
 */
export function getContractNumber() {
  return request({
    url: "/adminapi/contract/contract/create",
    method: "get",
  });
}

/**
 * 查看合同详情
 * @param data {supplyContractEdit}
 * @returns
 */
export function getContractDetails(id: number) {
  return request({
    url: `/adminapi/contract/contract/${id}`,
    method: "get",
  });
}
