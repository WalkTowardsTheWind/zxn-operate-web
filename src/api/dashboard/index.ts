import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 获取树状分类
 * type:String  0=行业类目，2=开票类目, 3=岗位类目
 */
export function workbench(): AxiosPromise {
  return request({
    url: "/adminapi/workbench",
    method: "GET",
  });
}
