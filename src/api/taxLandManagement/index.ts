import request from "@/utils/request";
/**
 * 获取税地列表
 *
 * @param data {selfOperatedTaxLandList}
 * @returns
 */
export function getAreaList(parent_id: number) {
  return request({
    url: `/adminapi/setting/city/list/${parent_id}`,
    method: "get",
  });
}
