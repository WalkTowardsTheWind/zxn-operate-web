import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 获取树状分类
 * type:String  0=行业类目，2=开票类目, 3=岗位类目
 */
export function getTreeList(params: { type: number }): AxiosPromise {
  return request({
    url: "/adminapi/category/get_tree_list",
    method: "GET",
    params,
  });
}

/**
 * 获取税地列表
 */
export function getLandList(): AxiosPromise {
  return request({
    url: "/adminapi/tax/taxLandList",
    method: "GET",
  });
}
