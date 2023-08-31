import request from "@/utils/request";
import { keywords, updateStatus } from "./types";

/**
 *渠道结算列表
 *
 * @param data {keywords}
 * @returns
 */
export function getChannelSettlementList(data: keywords) {
  return request({
    url: "/adminapi/finance/channel",
    method: "get",
    params: data,
  });
}

/**
 * 查看渠道结算详情
 *
 * @param data
 * @returns
 */
export function getChannelSettlementDetails(id: number) {
  return request({
    url: `/adminapi/finance/channel/${id}`,
    method: "get",
  });
}

/**
 * 修改渠道结算状态
 *
 * @param data {updateStatus}
 * @returns
 */
export function updateChannelSettlementStatus(data: updateStatus) {
  return request({
    url: "/adminapi/finance/channel/updateStatus",
    method: "post",
    params: data,
  });
}
/**
 * 删除渠道结算单
 *
 * @param data {updateStatus}
 * @returns
 */
export function deleteChannelSettlementDoc(id: number) {
  return request({
    url: `/adminapi/finance/channel/${id}`,
    method: "delete",
  });
}
