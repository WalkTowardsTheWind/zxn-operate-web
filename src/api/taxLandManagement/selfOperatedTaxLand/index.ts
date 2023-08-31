import request from "@/utils/request";
import {
  selfOperatedTaxLandList,
  selfOperatedTaxLandAdd,
  selfOperatedTaxLandEditType,
  selfOperatedTaxLandUpdateStatusType,
} from "./types";

/**
 * 获取税地列表
 *
 * @param data {selfOperatedTaxLandList}
 * @returns
 */
export function getSelfOperatedTaxLandList(data?: selfOperatedTaxLandList) {
  return request({
    url: "/adminapi/tax/taxLand",
    method: "get",
    params: data,
  });
}
/**
 * 新建税地
 *
 * @param data {selfOperatedTaxLandAdd}
 * @returns
 */
export function selfOperatedTaxLandAdd(data: selfOperatedTaxLandAdd) {
  return request({
    url: "/adminapi/tax/taxLand",
    method: "post",
    params: data,
  });
}
/**
 * 编辑税地
 *
 * @param data {selfOperatedTaxLandEditType}
 * @returns
 */
export function selfOperatedTaxLandEdit(
  id: number,
  data: selfOperatedTaxLandEditType
) {
  return request({
    url: `/adminapi/tax/taxLand/${id}`,
    method: "put",
    params: data,
  });
}
/**
 * 获取税地详情
 *
 * @param data {}
 * @returns
 */
export function selfOperatedTaxLandDetails(id: number) {
  return request({
    url: `/adminapi/tax/taxLand/${id}`,
    method: "get",
  });
}
/**
 * 获取税地详情
 *
 * @param data {}
 * @returns
 */
export function selfOperatedTaxLandDelete(id: number) {
  return request({
    url: `/adminapi/tax/taxLand/${id}`,
    method: "delete",
  });
}
/**
 * 修改税地状态
 *
 * @param data {}
 * @returns
 */
export function selfOperatedTaxLandUpdateStatus(
  data: selfOperatedTaxLandUpdateStatusType
) {
  return request({
    url: "/adminapi/tax/taxLand/updateStatus",
    method: "post",
    params: data,
  });
}
