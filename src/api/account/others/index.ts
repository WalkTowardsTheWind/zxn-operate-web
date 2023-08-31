import request from "@/utils/request";

export function getOtherAccountList(params: any) {
  return request({
    url: "/adminapi/setting/admin",
    method: "get",
    params,
  });
}

export function createOtherAccount(data: any) {
  return request({
    url: "/adminapi/setting/admin/createAdmin",
    method: "post",
    data,
  });
}

export function updateOtherAccount(data: any) {
  return request({
    url: `/adminapi/setting/admin/${data.id}`,
    method: "put",
    data,
  });
}

export function getRoleList(params?: any) {
  return request({
    url: "/adminapi/setting/role",
    method: "get",
    params,
  });
}

export function delOtherAccount(id: string) {
  return request({
    url: `/adminapi/setting/admin/${id}`,
    method: "delete",
  });
}

export function updateOtherAccountStatus(params: any) {
  return request({
    url: `/adminapi/setting/set_status/${params.id}/${params.status}`,
    method: "put",
  });
}

// 查省列表传0
export function getAreaIdList(parent_id = "0") {
  return request({
    url: `/adminapi/setting/city/list/${parent_id}`,
    method: "get",
  });
}

export function getOtherAccountDetail(id: string) {
  return request({
    url: `/adminapi/setting/admin/read/${id}`,
    method: "get",
  });
}
