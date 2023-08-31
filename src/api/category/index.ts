import request from "@/utils/request";
import {
  ICreateCategory,
  IGetCategoryList,
  IGetCategoryTreeList,
  IUpdateCategory,
  IUpdateCategoryStatus,
} from "./types";

/**
 * 获取类目列表
 * @param params
 * @returns
 */
export function getCategoryList(params: IGetCategoryList) {
  return request({
    url: "/adminapi/category/category",
    method: "get",
    params,
  });
}

/**
 * 获取下拉选择列表
 * @param params
 * @returns
 */
export function getCategoryTreeList(params: IGetCategoryTreeList) {
  return request({
    url: "/adminapi/category/get_tree_list",
    method: "get",
    params,
  });
}

/**
 * 新建类目
 * @param data
 * @returns
 */
export function createCategory(data: ICreateCategory) {
  return request({
    url: "/adminapi/category/category",
    method: "post",
    data,
  });
}

/**
 * 更新当前类目信息
 * @param data
 * @returns
 */
export function updateCategory(data: IUpdateCategory) {
  return request({
    url: "/adminapi/category/category/" + data.id,
    method: "put",
    data,
  });
}

/**
 * 更新当前类目状态
 * @param data
 * @returns
 */
export function updateCategoryStatus(data: IUpdateCategoryStatus) {
  return request({
    url: "/adminapi/category/set_status/" + data.id + "/" + data.status,
    method: "put",
  });
}

/**
 * 删除当前类目
 * @param id
 * @returns
 */
export function deleteCategory(id: string) {
  return request({
    url: "/adminapi/category/category/" + id,
    method: "delete",
  });
}
