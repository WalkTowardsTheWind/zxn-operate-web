/**
 * 企业结算列表
 */
export interface keywords {
  keywords: string;
  start_time: string;
  end_time: string;
  status: string;
  page: string;
  limit: string;
}
/**
 *
 * 获取任务成员详情
 */
export interface getUserInfo {
  id: string;
}
/**
 *
 * 获取任务列表
 */
export interface getTaskList {
  settlement_id: string;
}
/**
 * 修改结算状态
 */
export interface updateStatus {
  id: string;
  status: string;
}
/**
 * 获取任务详情
 */
export interface taskId {
  id: string;
}
/**
 *
 * 导出结算列表
 */
export interface getEnterpriseExcel {
  ids: number[];
}
