import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { taskList, taskStatus } from "./types";

/**
 * 任务列表
 */
export function getTaskIndex(params: taskList): AxiosPromise {
  return request({
    url: "/adminapi/task/task",
    method: "GET",
    params,
  });
}

/**
 * 删除任务
 * @param id:String 任务id
 */
export function removeTask(id: number): AxiosPromise {
  return request({
    url: `/adminapi/task/task/${id}`,
    method: "DELETE",
  });
}

/**
 * 修改任务状态
 * @param data
 */
export function setTaskStatus(data: taskStatus): AxiosPromise {
  return request({
    url: `/adminapi/task/set_status`,
    method: "PUT",
    data,
  });
}

/**
 * 获取任务详情
 * @param id Number
 */
export function getTaskView(id: number): AxiosPromise {
  return request({
    url: `/adminapi/task/task/${id}`,
    method: "GET",
  });
}
