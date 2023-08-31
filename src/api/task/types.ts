/**
 * 任务列表
 */
export interface taskList extends PageQuery {
  task_name: string;
  status: number;
  start_time: number;
  end_time: number;
  category_id: number;
  task_type: number;
}

export interface taskStatus {
  ids: string[];
  status: number;
  reject_reason?: string;
}
