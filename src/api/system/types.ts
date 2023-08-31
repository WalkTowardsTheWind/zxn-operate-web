/**
 * 角色查询参数
 */
export interface RoleQuery extends PageQuery {
  role_name?: string;
}

/**
 * 新增角色
 */
export interface SetRoleQuery {
  role_name: string;
  status: 0 | 1;
  checked_menu: number[];
  id?: number;
}

/**
 * 日志查询参数
 */
export interface LogQuery extends PageQuery {
  path?: string;
  ip?: string;
  admin_id?: string;
}

/**
 * 权限菜单
 */
export interface menusQuery extends PageQuery {
  keyword: "";
}
