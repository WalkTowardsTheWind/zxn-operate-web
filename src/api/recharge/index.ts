import request from "@/utils/request";

export function getRechargeTaskList(params: any) {
  return request({
    url: "/adminapi/finance/recharge/index",
    method: "get",
    params,
  });
}
export function getRechargeExcel(params: any) {
  return request({
    url: "/adminapi/finance/recharge/get_excel",
    method: "get",
    params,
    responseType: "arraybuffer",
  });
}
