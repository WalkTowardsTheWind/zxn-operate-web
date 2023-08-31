import request from "@/utils/request";

/**
 * 获取厂商列表
 *
 * @param data {}
 * @returns
 */
export function getManufacturer() {
  return request({
    url: "/adminapi/tax/manufacturer",
    method: "get",
  });
}
