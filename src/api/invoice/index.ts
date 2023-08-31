import request from "@/utils/request";
import { AxiosPromise } from "axios";
import {
  invoiceQuery,
  uploadQuery,
  invoiceStatus,
  invoiceExcel,
} from "./types";

/**
 * 企业发票列表
 * @param params
 */
export function getInvoiceInCompany(params: invoiceQuery): AxiosPromise {
  return request({
    url: "/adminapi/invoice/company",
    method: "GET",
    params,
  });
}

/**
 * 渠道发票列表
 * @param params
 */
export function getInvoiceInChannel(params: invoiceQuery): AxiosPromise {
  return request({
    url: "/adminapi/invoice/channel",
    method: "GET",
    params,
  });
}

/**
 * 企业发票详情
 * @param id
 */
export function getInvoiceCompanyView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/invoice/company/${id}`,
    method: "GET",
  });
}

/**
 * 企业发票详情
 * @param id
 */
export function getInvoiceChannelView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/invoice/channel/${id}`,
    method: "GET",
  });
}

/**
 * 获取物流公司
 */
export function getLogisticsCompany(): AxiosPromise {
  return request({
    url: `/adminapi/invoice/express`,
    method: "GET",
  });
}

/**
 * 上传发票
 */
export function uploadInvoice(id: number, data: uploadQuery): AxiosPromise {
  return request({
    url: `/adminapi/invoice/upload_invoice/${id}`,
    method: "PUT",
    data,
  });
}

/**
 * 查询发票物流信息
 */
export function getExpressDetail(id: number): AxiosPromise {
  return request({
    url: `/adminapi/invoice/get_express_detail/${id}`,
    method: "GET",
  });
}

/**
 *  修改渠道发票状态
 */
export function channelSetStatus(data: invoiceStatus): AxiosPromise {
  return request({
    url: `/adminapi/invoice/channel_set_status`,
    method: "PUT",
    data,
  });
}

/**
 *  修改企业发票状态
 */
export function setStatus(data: invoiceStatus): AxiosPromise {
  return request({
    url: `/adminapi/invoice/set_status`,
    method: "PUT",
    data,
  });
}

/**
 * 发票导出
 */

export function getInvoiceExcel(params: invoiceExcel): AxiosPromise {
  return request({
    url: `/adminapi/invoice/get_excel`,
    method: "GET",
    params,
    responseType: "arraybuffer",
  });
}
