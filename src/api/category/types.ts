export interface IGetCategoryList {
  /**
   * 类目名称
   */
  name?: string;
  /**
   * 类目类型 0=行业类目，2=开票类目, 3=岗位类目
   */
  type: string;
}

export interface IGetCategoryTreeList {
  /**
   * 类目类型 0=行业类目，2=开票类目, 3=岗位类目
   */
  type: string;
}

export interface ICreateCategory {
  /**
   * 类目名称
   */
  name: string;
  /**
   * 上级id 默认0是一级
   */
  pid: string;
  /**
   * 分类类型 0=行业类目，2=开票类目, 3=岗位类目
   */
  type: string;
}

export interface IUpdateCategory {
  /**
   * 类目名称
   */
  name: string;
  /**
   * 上级id
   */
  pid: string;
  /**
   * id
   */
  id: string;
}

export interface IUpdateCategoryStatus {
  /**
   * 类目id
   */
  id: string;
  /**
   * 类目状态 0=启用 1=暂停
   */
  status: string;
}
