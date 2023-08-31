import request from "@/utils/request";
import { AxiosPromise } from "axios";
import type { NotifyQuery } from "./types";

/**
 * 消息列表
 */
export function notifyIndex(params: NotifyQuery): AxiosPromise {
  return request({
    url: "/adminapi/notify/index",
    method: "GET",
    params,
  });
}

/**
 * 消息详情
 */
export function notifyView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/notify/read/${id}`,
    method: "GET",
  });
}
