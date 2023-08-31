import request from "@/utils/request";
import {
  channelContractAddType,
  channelContractList,
  channelContractEditType,
} from "./types";

/**
 * 新建渠道合同
 *
 * @param data {channelContractAddType}
 * @returns
 */
export function channelContractAdd(data: channelContractAddType) {
  return request({
    url: "/adminapi/contract/channel_contract",
    method: "post",
    params: data,
  });
}

/**
 * 获取渠道合同列表
 *
 *
 */
export function getChannelContractList(data: channelContractList) {
  return request({
    url: "/adminapi/contract/channel_contract",
    method: "get",
    params: data,
  });
}

/**
 * 修改渠道合同
 * @param data {channelContractEditType}
 * @returns
 */
export function channelContractEdit(id: number, data: channelContractEditType) {
  return request({
    url: `/adminapi/contract/channel_contract/${id}`,
    method: "put",
    params: data,
  });
}
