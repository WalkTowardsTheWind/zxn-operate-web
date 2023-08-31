import request from "@/utils/request";

export function getChannelAccountList(params: any) {
  return request({
    url: "/adminapi/account/channel/index",
    method: "get",
    params,
  });
}

export function addProduct() {
  return request({
    url: "/adminapi/account/channel/add_product",
    method: "post",
  });
}

export function delProduct(params: any) {
  return request({
    url: "/adminapi/account/channel/del_product",
    method: "delete",
    params,
  });
}

export function createExistAccount(data: any) {
  return request({
    url: "/adminapi/account/channel/create",
    method: "post",
    data,
  });
}
